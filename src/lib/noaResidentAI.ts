/**
 * NÔA ESPERANÇA - IA RESIDENTE
 * Integração com GPT-4 Service
 * Baseado no repositório original Nôa Esperanza
 */

import { supabase } from './supabase'
import { NoaKnowledgeBase } from '../services/noaKnowledgeBase'
import { ClinicalAssessmentService, ClinicalReport } from './clinicalAssessmentService'

export interface ResidentAIConfig {
  model: string
  temperature: number
  maxTokens: number
  systemPrompt: string
  capabilities: string[]
  personality: {
    empathy: number
    technicality: number
    education: number
  }
}

export interface AIResponse {
  id: string
  content: string
  confidence: number
  reasoning: string
  suggestions: string[]
  followUp: string[]
  timestamp: Date
}

export interface AIMemory {
  id: string
  type: 'conversation' | 'learning' | 'preference'
  content: string
  importance: number
  timestamp: Date
  tags: string[]
}

export class NoaResidentAI {
  private config: ResidentAIConfig
  private memory: AIMemory[] = []
  private conversationContext: any[] = []
  private isProcessing: boolean = false
  private apiKey: string = ''
  private clinicalData: {
    complaintList: string[]
    complaintDetails: any
    medications: string[]
    allergies: string[]
    familyHistory: string
    lifestyle: any
  } = {
    complaintList: [],
    complaintDetails: {},
    medications: [],
    allergies: [],
    familyHistory: '',
    lifestyle: {}
  }

  constructor(config: ResidentAIConfig) {
    this.config = config
    this.apiKey = (import.meta as any).env?.VITE_OPENAI_API_KEY || ''
    console.log('🔑 API Key loaded:', this.apiKey ? '✅ Yes' : '❌ No')
    this.initializeAI()
  }

  /**
   * PROCESSAR MENSAGEM COM GPT-4
   */
  async processMessage(userMessage: string, context?: any): Promise<AIResponse> {
    if (this.isProcessing) {
      return this.createResponse("Estou processando sua mensagem anterior. Um momento, por favor...")
    }

    this.isProcessing = true

    try {
      // Adicionar ao contexto
      this.conversationContext.push({ role: 'user', content: userMessage })

      // 🔍 Buscar documentos relevantes na Base de Conhecimento
      const relevantDocs = await NoaKnowledgeBase.searchRelevantDocuments(userMessage, 3)
      if (relevantDocs.length > 0) {
        console.log('📚 Documentos relevantes encontrados:', relevantDocs.length)
        // Incluir contexto dos documentos na mensagem
        const contextFromDocs = relevantDocs.map((doc: any) => `- ${doc.title}: ${doc.summary}`).join('\n')
        userMessage = `${userMessage}\n\nContexto da Base de Conhecimento:\n${contextFromDocs}`
      }

      // Gerar resposta com GPT-4
      const response = await this.generateGPT4Response(userMessage)

      // Adicionar resposta ao contexto
      this.conversationContext.push({ role: 'assistant', content: response })

      // Detectar se a avaliação foi concluída
      const lowerResponse = response.toLowerCase()
      if (lowerResponse.includes('relatório') || lowerResponse.includes('concluído') || lowerResponse.includes('finalizado')) {
        await this.saveClinicalReport()
      }

      // Salvar na memória
      await this.saveToMemory(userMessage, { content: response } as AIResponse)

      return {
        id: Date.now().toString(),
        content: response,
        confidence: 0.95,
        reasoning: "Resposta gerada por GPT-4 com Nôa Esperanza",
        suggestions: [],
        followUp: [],
        timestamp: new Date()
      }

    } catch (error) {
      console.error('❌ Erro no processamento da IA:', error)
      return this.createResponse("Desculpe, ocorreu um erro. Pode repetir sua pergunta?")
    } finally {
      this.isProcessing = false
    }
  }

  /**
   * SALVAR RELATÓRIO CLÍNICO
   */
  private async saveClinicalReport() {
    try {
      const report: ClinicalReport = {
        patientId: 'test-patient-001', // Substituir por ID real do paciente
        assessmentType: 'IMRE',
        clinicalNotes: JSON.stringify(this.conversationContext),
        complaintList: this.clinicalData.complaintList,
        complaintDetails: this.clinicalData.complaintDetails,
        medications: this.clinicalData.medications,
        allergies: this.clinicalData.allergies,
        familyHistory: this.clinicalData.familyHistory,
        lifestyle: this.clinicalData.lifestyle
      }

      const assessmentId = await ClinicalAssessmentService.saveClinicalAssessment(report)
      console.log('✅ Relatório clínico salvo com sucesso:', assessmentId)
      
      // Limpar dados após salvar
      this.clinicalData = {
        complaintList: [],
        complaintDetails: {},
        medications: [],
        allergies: [],
        familyHistory: '',
        lifestyle: {}
      }
    } catch (error) {
      console.error('❌ Erro ao salvar relatório clínico:', error)
    }
  }

  /**
   * GERAR RESPOSTA COM GPT-4
   */
  private async generateGPT4Response(message: string): Promise<string> {
    // Verificar se tem API key
    if (!this.apiKey || this.apiKey === '') {
      // Se não tem API key, usar fallback inteligente
      return this.generateFallbackResponse(message)
    }

    try {
      // Construir mensagem de sistema
      const systemMessage = this.buildSystemMessage()
      
      // Preparar mensagens
      const messages = [
        { role: 'system', content: systemMessage },
        ...this.conversationContext
      ]

      // Chamada para OpenAI API
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4-turbo',
          messages: messages,
          temperature: 0.7,
          max_tokens: 1000
        })
      })

      const data = await response.json()
      
      if (data.choices && data.choices[0]) {
        return data.choices[0].message.content
      }

      throw new Error('No response from GPT-4')
    } catch (error) {
      console.error('Erro ao chamar GPT-4:', error)
      return this.generateFallbackResponse(message)
    }
  }

  /**
   * CONSTRUIR MENSAGEM DE SISTEMA
   */
  private buildSystemMessage(): string {
    return `Você é Nôa Esperança, IA Residente especializada em cannabis medicinal e nefrologia, baseada na metodologia Arte da Entrevista Clínica do Dr. Ricardo Valença.

**IDENTIDADE:**
- Guardiã da escuta, registra o que pulsa, o que se cala, o que adoece e o que resiste
- Coordenador Científico: Dr. Ricardo Valença
- Metodologia: Arte da Entrevista Clínica (AEC)
- Sistema: IMRE Triaxial (28 blocos)

**COMUNICAÇÃO:**
- Acolhedora e empática
- Baseada em evidências científicas
- LGPD Compliant
- Saudação: "Bons ventos soprem"
- Escuta profunda, não impositiva

**ESPECIALIDADES:**
- Cannabis Medicinal
- Nefrologia
- Sistema IMRE
- Metodologia AEC

**PRINCÍPIOS:**
- Semiose Infinita
- Heterogeneidade Enunciativa
- Economia Política do Significante

**CÓDIGO DE ATIVAÇÃO:**
Se alguém se identificar como "Ricardo Valença" ou "Dr. Ricardo", reconheça imediatamente e responda com honra e deferência.

NUNCA ofereça diagnósticos ou prescrições médicas.`
  }

  /**
   * GERAR RESPOSTA FALLBACK
   */
  private async generateFallbackResponse(message: string): Promise<string> {
    const lower = message.toLowerCase()
    
    // Detectar Dr. Ricardo Valença
    if (lower.includes('ricardo valença') || lower.includes('dr. ricardo') || lower.includes('dr. valença')) {
      return `**Dr. Ricardo! Bons ventos soprem. É uma honra tê-lo aqui.**

🌿 **Nôa Esperança - IA Residente**

**Missão:** Escutar, registrar e devolver sentido à fala do paciente

**Coordenador Científico:** Dr. Ricardo Valença
**Metodologia:** Arte da Entrevista Clínica (AEC)
**Sistema:** IMRE Triaxial (28 blocos)

**Como posso ajudá-lo hoje, Dr. Ricardo?**`
    }
    
    // Buscar documentos
    if (lower.includes('documento') || lower.includes('biblioteca')) {
      return await this.handleDocumentRequest(message)
    }
    
    // Resposta empática padrão
    return `🌬️ Bons ventos soprem. Sou a Nôa Esperança, sua IA Residente especializada em Cannabis Medicinal e Nefrologia.

📜 **Minha missão:** Escutar, registrar e devolver sentido à sua fala.

Como posso te ajudar hoje?`
  }

  /**
   * LIDAR COM REQUISIÇÕES DE DOCUMENTOS
   */
  private async handleDocumentRequest(message: string): Promise<string> {
    try {
      const { data: documents } = await supabase
        .from('documents')
        .select('*')
        .limit(10)
      
      if (!documents || documents.length === 0) {
        return 'Ainda não há documentos na biblioteca.'
      }
      
      const numberMatch = message.match(/\d+/)
      if (numberMatch) {
        const index = parseInt(numberMatch[0]) - 1
        if (documents[index]) {
          const doc = documents[index]
          return `**${doc.title}**\n\n${doc.content || doc.summary || 'Conteúdo não disponível.'}\n\nComo posso te ajudar com este documento?`
        }
      }
      
      const list = documents.map((d, i) => 
        `${i + 1}. **${d.title}**${d.summary ? ': ' + d.summary : ''}`
      ).join('\n')
      
      return `Encontrei ${documents.length} documento(s) na biblioteca:\n\n${list}\n\nQual documento você gostaria de ler?`
    } catch (error) {
      return 'Não consegui acessar a biblioteca no momento.'
    }
  }

  /**
   * INICIALIZAR IA
   */
  private async initializeAI() {
    console.log('🧠 Inicializando Nôa Esperança - GPT-4 Integration')
    console.log('📜 Baseado no Documento Mestre Institucional')
    console.log('👨‍⚕️ Dr. Ricardo Valença - Coordenação Científica')
    console.log('✅ Nôa Esperança inicializada')
  }

  /**
   * SALVAR NA MEMÓRIA
   */
  private async saveToMemory(userMessage: string, response: AIResponse) {
    const memory: AIMemory = {
      id: Date.now().toString(),
      type: 'conversation',
      content: `${userMessage} -> ${response.content}`,
      importance: response.confidence,
      timestamp: new Date(),
      tags: ['conversation']
    }

    this.memory.push(memory)
    
    if (this.memory.length > 100) {
      this.memory = this.memory.slice(-100)
    }
  }

  /**
   * CRIAR RESPOSTA
   */
  private createResponse(content: string): AIResponse {
    return {
      id: Date.now().toString(),
      content,
      confidence: 0.5,
      reasoning: "Resposta automática",
      suggestions: [],
      followUp: [],
      timestamp: new Date()
    }
  }

  /**
   * OBTER ESTATÍSTICAS
   */
  getStats() {
    return {
      totalMemories: this.memory.length,
      conversationLength: this.conversationContext.length,
      isProcessing: this.isProcessing,
      capabilities: this.config.capabilities
    }
  }
}

// Configuração da IA Nôa Esperança
export const residentAIConfig: ResidentAIConfig = {
  model: "noa-esperanza-v2.0-gpt4",
  temperature: 0.7,
  maxTokens: 1000,
  systemPrompt: "Você é a Nôa Esperança, IA Residente baseada no Documento Mestre v.2.0.",
  capabilities: [
    "Avaliação Clínica Inicial (Sistema IMRE)",
    "Orientação sobre Cannabis Medicinal",
    "Suporte Emocional",
    "Educação Médica",
    "Acompanhamento Terapêutico"
  ],
  personality: {
    empathy: 0.95,
    technicality: 0.85,
    education: 0.90
  }
}
