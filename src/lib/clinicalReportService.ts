/**
 * SERVIÇO COMPLETO DE RELATÓRIOS CLÍNICOS
 * Geração, NFT e Integração com Prontuários
 */

import { supabase } from './supabase'
import { UnifiedAssessmentSystem } from './unifiedAssessment'

export interface ClinicalReport {
  id: string
  patientId: string
  professionalId: string
  assessmentId: string
  reportData: {
    imreData: any
    clinicalData: any
    correlations: any
    recommendations: any
  }
  nftMetadata: {
    tokenId: string
    contractAddress: string
    transactionHash: string
    ipfsHash: string
  }
  status: 'generated' | 'nft_minted' | 'saved_to_records'
  createdAt: string
  updatedAt: string
}

export interface NFTMetadata {
  name: string
  description: string
  image: string
  attributes: Array<{
    trait_type: string
    value: string | number
  }>
  external_url: string
}

export class ClinicalReportService {
  private static instance: ClinicalReportService

  static getInstance(): ClinicalReportService {
    if (!ClinicalReportService.instance) {
      ClinicalReportService.instance = new ClinicalReportService()
    }
    return ClinicalReportService.instance
  }

  /**
   * GERAR RELATÓRIO CLÍNICO COMPLETO
   */
  async generateClinicalReport(
    patientId: string,
    professionalId: string,
    assessmentData: any
  ): Promise<ClinicalReport> {
    try {
      console.log('📋 Gerando relatório clínico completo...')

      // 1. Processar dados da avaliação
      const processedData = await this.processAssessmentData(assessmentData)

      // 2. Gerar relatório estruturado
      const reportData = await this.generateStructuredReport(processedData)

      // 3. Salvar relatório no banco
      const { data: report, error } = await supabase
        .from('clinical_reports')
        .insert({
          patient_id: patientId,
          professional_id: professionalId,
          assessment_id: assessmentData.id,
          report_data: reportData,
          status: 'generated',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()
        .single()

      if (error) throw error

      console.log('✅ Relatório clínico gerado:', report.id)
      return report
    } catch (error) {
      console.error('❌ Erro ao gerar relatório:', error)
      throw error
    }
  }

  /**
   * MINTAR NFT DO RELATÓRIO
   */
  async mintReportNFT(reportId: string): Promise<string> {
    try {
      console.log('🎨 Mintando NFT do relatório...')

      // 1. Buscar dados do relatório
      const { data: report, error: reportError } = await supabase
        .from('clinical_reports')
        .select('*')
        .eq('id', reportId)
        .single()

      if (reportError) throw reportError

      // 2. Gerar metadados NFT
      const nftMetadata = await this.generateNFTMetadata(report)

      // 3. Upload para IPFS
      const ipfsHash = await this.uploadToIPFS(nftMetadata)

      // 4. Mintar NFT (simulação - em produção seria blockchain real)
      const nftData = await this.mintNFT(ipfsHash, report.patient_id)

      // 5. Atualizar relatório com dados NFT
      const { error: updateError } = await supabase
        .from('clinical_reports')
        .update({
          nft_metadata: nftData,
          status: 'nft_minted',
          updated_at: new Date().toISOString()
        })
        .eq('id', reportId)

      if (updateError) throw updateError

      console.log('✅ NFT mintado com sucesso:', nftData.tokenId)
      return nftData.tokenId
    } catch (error) {
      console.error('❌ Erro ao mintar NFT:', error)
      throw error
    }
  }

  /**
   * SALVAR NO PRONTUÁRIO DO PACIENTE
   */
  async saveToPatientRecord(reportId: string): Promise<void> {
    try {
      console.log('📁 Salvando no prontuário do paciente...')

      const { data: report, error: reportError } = await supabase
        .from('clinical_reports')
        .select('*')
        .eq('id', reportId)
        .single()

      if (reportError) throw reportError

      // Salvar no prontuário do paciente
      const { error: patientError } = await supabase
        .from('patient_medical_records')
        .insert({
          patient_id: report.patient_id,
          report_id: report.id,
          record_type: 'clinical_assessment',
          record_data: report.report_data,
          nft_token_id: report.nft_metadata?.tokenId,
          created_at: new Date().toISOString()
        })

      if (patientError) throw patientError

      console.log('✅ Salvo no prontuário do paciente')
    } catch (error) {
      console.error('❌ Erro ao salvar no prontuário do paciente:', error)
      throw error
    }
  }

  /**
   * SALVAR NO PRONTUÁRIO DO PROFISSIONAL
   */
  async saveToProfessionalRecord(reportId: string): Promise<void> {
    try {
      console.log('📁 Salvando no prontuário do profissional...')

      const { data: report, error: reportError } = await supabase
        .from('clinical_reports')
        .select('*')
        .eq('id', reportId)
        .single()

      if (reportError) throw reportError

      // Salvar no prontuário do profissional
      const { error: professionalError } = await supabase
        .from('professional_medical_records')
        .insert({
          professional_id: report.professional_id,
          patient_id: report.patient_id,
          report_id: report.id,
          record_type: 'clinical_assessment',
          record_data: report.report_data,
          nft_token_id: report.nft_metadata?.tokenId,
          created_at: new Date().toISOString()
        })

      if (professionalError) throw professionalError

      console.log('✅ Salvo no prontuário do profissional')
    } catch (error) {
      console.error('❌ Erro ao salvar no prontuário do profissional:', error)
      throw error
    }
  }

  /**
   * PROCESSO COMPLETO: RELATÓRIO → NFT → PRONTUÁRIOS
   */
  async completeReportProcess(
    patientId: string,
    professionalId: string,
    assessmentData: any
  ): Promise<{
    reportId: string
    nftTokenId: string
    patientRecordId: string
    professionalRecordId: string
  }> {
    try {
      console.log('🚀 Iniciando processo completo de relatório...')

      // 1. Gerar relatório
      const report = await this.generateClinicalReport(patientId, professionalId, assessmentData)

      // 2. Mintar NFT
      const nftTokenId = await this.mintReportNFT(report.id)

      // 3. Salvar no prontuário do paciente
      await this.saveToPatientRecord(report.id)

      // 4. Salvar no prontuário do profissional
      await this.saveToProfessionalRecord(report.id)

      // 5. Atualizar status final
      await supabase
        .from('clinical_reports')
        .update({
          status: 'saved_to_records',
          updated_at: new Date().toISOString()
        })
        .eq('id', report.id)

      console.log('🎉 Processo completo finalizado!')
      
      return {
        reportId: report.id,
        nftTokenId,
        patientRecordId: report.id, // Simplificado para demo
        professionalRecordId: report.id // Simplificado para demo
      }
    } catch (error) {
      console.error('❌ Erro no processo completo:', error)
      throw error
    }
  }

  // Métodos auxiliares
  private async processAssessmentData(assessmentData: any): Promise<any> {
    // Processar dados da avaliação IMRE
    return {
      imreData: assessmentData.imreData || {},
      clinicalData: assessmentData.clinicalData || {},
      correlations: assessmentData.correlations || {},
      timestamp: new Date().toISOString()
    }
  }

  private async generateStructuredReport(data: any): Promise<any> {
    return {
      summary: 'Relatório clínico IMRE Triaxial completo',
      imreAnalysis: data.imreData,
      clinicalFindings: data.clinicalData,
      correlations: data.correlations,
      recommendations: [
        'Acompanhamento médico regular',
        'Monitoramento de função renal',
        'Avaliação de fatores de risco',
        'Orientação sobre cannabis medicinal'
      ],
      followUp: 'Retorno em 30 dias',
      generatedAt: new Date().toISOString()
    }
  }

  private async generateNFTMetadata(report: any): Promise<NFTMetadata> {
    return {
      name: `Relatório Clínico IMRE #${report.id.slice(-6)}`,
      description: 'Relatório clínico completo gerado pelo sistema IMRE Triaxial',
      image: 'https://medcannlab.com/nft-images/clinical-report.png',
      attributes: [
        { trait_type: 'Tipo', value: 'Relatório Clínico' },
        { trait_type: 'Método', value: 'IMRE Triaxial' },
        { trait_type: 'Data', value: new Date(report.created_at).toLocaleDateString('pt-BR') },
        { trait_type: 'Raridade', value: 'Comum' }
      ],
      external_url: `https://medcannlab.com/reports/${report.id}`
    }
  }

  private async uploadToIPFS(metadata: NFTMetadata): Promise<string> {
    // Simulação de upload para IPFS
    // Em produção, usar Pinata ou Infura
    return `Qm${Math.random().toString(36).substring(2, 15)}`
  }

  private async mintNFT(ipfsHash: string, patientId: string): Promise<any> {
    // Simulação de mint NFT
    // Em produção, integrar com contrato inteligente
    return {
      tokenId: `#${Math.floor(Math.random() * 10000)}`,
      contractAddress: '0x1234567890123456789012345678901234567890',
      transactionHash: `0x${Math.random().toString(36).substring(2, 66)}`,
      ipfsHash
    }
  }
}

export const clinicalReportService = ClinicalReportService.getInstance()
