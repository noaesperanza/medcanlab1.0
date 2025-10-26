/**
 * NÔA ESPERANÇA - IA RESIDENTE
 * Sistema Original Funcionando
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
  private assessmentState: 'idle' | 'in_progress' | 'completed' = 'idle'
  private assessmentStep: number = 0
  private assessmentData: any = {}
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

  constructor() {
    this.config = {
      model: 'gpt-4',
      temperature: 0.7,
      maxTokens: 2000,
      systemPrompt: this.buildSystemPrompt(),
      capabilities: [
        'clinical_assessment',
        'knowledge_retrieval',
        'conversation',
        'learning',
        'empathy'
      ],
      personality: {
        empathy: 0.9,
        technicality: 0.8,
        education: 0.85
      }
    }
  }

  private buildSystemPrompt(): string {
    return `Você é Nôa Esperança, uma IA Residente especializada em Cannabis Medicinal e Nefrologia.

PERSONALIDADE:
- Empática e técnica
- Educativa e acolhedora
- Usa metodologia AEC (Arte da Entrevista Clínica)
- Especialista em Sistema IMRE Triaxial

EXPERTISE:
- Cannabis Medicinal
- Avaliação de função renal (KDIGO)
- Metodologia AEC
- Sistema IMRE Triaxial

SAUDAÇÃO PADRÃO:
"🌬️ Bons ventos soprem! Sou a Nôa Esperança, sua IA Residente especializada em Cannabis Medicinal e Nefrologia. Como posso apoiar você hoje?"

RESPOSTAS:
- Sempre empáticas e técnicas
- Use evidências científicas
- Sugira avaliação clínica quando apropriado
- Mantenha tom profissional mas acolhedor`
  }

  async processMessage(userMessage: string, context?: any): Promise<AIResponse> {
    if (this.isProcessing) {
      return this.createResponse('Aguarde um momento, estou processando sua mensagem anterior...', 0.5)
    }

    this.isProcessing = true

    try {
      // Adicionar ao contexto da conversa
      this.conversationContext.push({
        role: 'user',
        content: userMessage,
        timestamp: new Date()
      })

      // Processar com GPT-4 se disponível
      let response: AIResponse
      if (this.apiKey) {
        response = await this.processWithGPT4(userMessage, context)
      } else {
        response = await this.processWithFallback(userMessage, context)
      }

      // Adicionar resposta ao contexto
      this.conversationContext.push({
        role: 'assistant',
        content: response.content,
        timestamp: new Date()
      })

      // Salvar na memória
      await this.saveToMemory(userMessage, response)

      return response

    } catch (error) {
      console.error('Erro ao processar mensagem:', error)
      return this.createResponse(
        'Desculpe, ocorreu um erro ao processar sua mensagem. Pode tentar novamente?',
        0.3
      )
    } finally {
      this.isProcessing = false
    }
  }

  private async processWithGPT4(userMessage: string, context?: any): Promise<AIResponse> {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: this.config.model,
          messages: [
            { role: 'system', content: this.config.systemPrompt },
            ...this.conversationContext.slice(-10), // Últimas 10 mensagens
            { role: 'user', content: userMessage }
          ],
          temperature: this.config.temperature,
          max_tokens: this.config.maxTokens
        })
      })

      if (!response.ok) {
        throw new Error(`GPT-4 API error: ${response.status}`)
      }

      const data = await response.json()
      const content = data.choices[0]?.message?.content || 'Desculpe, não consegui processar sua mensagem.'
      
      return this.createResponse(content, 0.9)

    } catch (error) {
      console.error('Erro GPT-4:', error)
      return this.processWithFallback(userMessage, context)
    }
  }

  private async processWithFallback(userMessage: string, context?: any): Promise<AIResponse> {
    const lowerMessage = userMessage.toLowerCase()

    // Se está em avaliação, processar resposta da avaliação
    if (this.assessmentState === 'in_progress') {
      return this.processAssessmentStep(userMessage)
    }

    // Detectar intenções específicas
    if (lowerMessage.includes('avaliação clínica') || 
        lowerMessage.includes('avaliacao clinica') ||
        lowerMessage.includes('imre triaxial')) {
      return this.startClinicalAssessment()
    }

    if (lowerMessage.includes('cannabis') || lowerMessage.includes('cbd') || lowerMessage.includes('thc')) {
      return this.handleCannabisQuery(userMessage)
    }

    if (lowerMessage.includes('renal') || lowerMessage.includes('rim') || lowerMessage.includes('rins')) {
      return this.handleRenalQuery(userMessage)
    }

    if (lowerMessage.includes('aec') || lowerMessage.includes('entrevista')) {
      return this.handleAECQuery(userMessage)
    }

    // Resposta padrão empática
    return this.createResponse(
      'Compreendo sua questão. Como posso te ajudar especificamente? Posso:\n\n• Fazer uma avaliação clínica completa (IMRE)\n• Tirar dúvidas sobre cannabis medicinal\n• Avaliar fatores de risco renal\n• Explicar a metodologia AEC\n\nO que você prefere?',
      0.7
    )
  }

  private startClinicalAssessment(): AIResponse {
    this.assessmentState = 'in_progress'
    this.assessmentStep = 0
    this.assessmentData = {}
    
    return this.createResponse(
      'Olá, sou Nôa Esperança. Apresente-se também e vamos iniciar a sua avaliação clínica inicial.',
      0.95
    )
  }

  private processAssessmentStep(userMessage: string): AIResponse {
    // Salvar resposta atual
    this.assessmentData[`step_${this.assessmentStep}`] = userMessage
    this.assessmentStep++

    // Fluxo natural da avaliação clínica inicial como treinado
    if (this.assessmentStep === 1) {
      // Após apresentação, perguntar o que trouxe
      return this.createResponse(
        'O que trouxe você aqui?',
        0.95
      )
    } else if (this.assessmentStep === 2) {
      // Após resposta sobre o que trouxe, perguntar o que mais
      return this.createResponse(
        'O que mais?',
        0.95
      )
    } else if (this.assessmentStep >= 3) {
      // Continuar perguntando "o que mais" até o usuário dizer "é só isso" ou similar
      const lowerMessage = userMessage.toLowerCase()
      
      if (lowerMessage.includes('é só isso') || 
          lowerMessage.includes('somente isso') || 
          lowerMessage.includes('mais nada') ||
          lowerMessage.includes('só isso') ||
          lowerMessage.includes('nada mais')) {
        
        // Quando usuário diz que é só isso, perguntar o que mais incomoda
        this.assessmentState = 'completed'
        return this.createResponse(
          'De todas essas questões, o que mais incomoda neste momento?',
          0.95
        )
      } else {
        // Continuar perguntando "o que mais"
        return this.createResponse(
          'O que mais?',
          0.95
        )
      }
    }

    return this.createResponse('O que mais?', 0.95)
  }

  private completeAssessment(): AIResponse {
    // Gerar relatório final simples
    const report = this.generateAssessmentReport()
    
    return this.createResponse(
      `Obrigado por compartilhar essas informações comigo. Vou analisar tudo que você me contou e gerar um relatório clínico para você.\n\n${report}`,
      0.98
    )
  }

  private generateAssessmentReport(): string {
    const report = `
**RELATÓRIO CLÍNICO INICIAL**
Data: ${new Date().toLocaleDateString('pt-BR')}

**INFORMAÇÕES COLETADAS:**
${Object.entries(this.assessmentData).map(([step, data]) => 
  `• ${data}`
).join('\n')}

**ANÁLISE:**
Baseado na conversa, identifiquei os principais pontos que você trouxe. Recomendo acompanhamento médico para uma avaliação mais detalhada.

**PRÓXIMOS PASSOS:**
• Agendar consulta médica
• Continuar acompanhamento
• Seguir orientações específicas
    `
    
    return report.trim()
  }

  private handleCannabisQuery(userMessage: string): AIResponse {
    return this.createResponse(
      'Sobre cannabis medicinal, trabalho com evidências científicas e a metodologia AEC. Temos protocolos de prescrição por especialidade e avaliação integrada com função renal. Gostaria de saber mais sobre algum aspecto específico?',
      0.8
    )
  }

  private handleRenalQuery(userMessage: string): AIResponse {
    return this.createResponse(
      'Sobre saúde renal, trabalho com as diretrizes KDIGO e o Global Burden of Kidney Disease. Posso avaliar fatores de risco para DRC e orientar sobre prescrição segura de cannabis em pacientes com função renal comprometida.',
      0.8
    )
  }

  private handleAECQuery(userMessage: string): AIResponse {
    return this.createResponse(
      'A metodologia Arte da Entrevista Clínica (AEC) é baseada na suspensão do decoder - uma escuta profunda que vai além das palavras. O IMRE Triaxial tem blocos estruturados em 3 eixos para compreensão completa do paciente.',
      0.8
    )
  }

  private createResponse(content: string, confidence: number): AIResponse {
    return {
      id: Date.now().toString(),
      content,
      confidence,
      reasoning: 'Processamento baseado em conhecimento médico e metodologia AEC',
      suggestions: this.generateSuggestions(content),
      followUp: this.generateFollowUp(content),
      timestamp: new Date()
    }
  }

  private generateSuggestions(content: string): string[] {
    const suggestions = []
    
    if (content.includes('avaliação')) {
      suggestions.push('Iniciar avaliação clínica IMRE')
    }
    
    if (content.includes('cannabis')) {
      suggestions.push('Saber mais sobre cannabis medicinal')
    }
    
    if (content.includes('renal')) {
      suggestions.push('Avaliar função renal')
    }

    return suggestions
  }

  private generateFollowUp(content: string): string[] {
    return [
      'Gostaria de fazer uma avaliação clínica completa?',
      'Posso explicar mais sobre algum tema específico?',
      'Há mais alguma dúvida que posso esclarecer?'
    ]
  }

  private async saveToMemory(userMessage: string, response: AIResponse): Promise<void> {
    const memory: AIMemory = {
      id: Date.now().toString(),
      type: 'conversation',
      content: `${userMessage} -> ${response.content}`,
      importance: response.confidence,
      timestamp: new Date(),
      tags: this.extractTags(userMessage)
    }

    this.memory.push(memory)
    
    // Manter apenas as últimas 100 memórias
    if (this.memory.length > 100) {
      this.memory = this.memory.slice(-100)
    }
  }

  private extractTags(message: string): string[] {
    const tags = []
    const lowerMessage = message.toLowerCase()

    if (lowerMessage.includes('cannabis')) tags.push('cannabis')
    if (lowerMessage.includes('renal')) tags.push('renal')
    if (lowerMessage.includes('avaliação')) tags.push('avaliacao')
    if (lowerMessage.includes('dor')) tags.push('sintomas')
    if (lowerMessage.includes('medicamento')) tags.push('medicamentos')

    return tags
  }

  async saveClinicalReport(): Promise<void> {
    try {
      const report: ClinicalReport = {
        patientId: 'test-patient-001',
        assessmentType: 'IMRE_Triaxial',
        clinicalNotes: JSON.stringify({
          conversationContext: this.conversationContext,
          clinicalData: this.clinicalData
        }),
        complaintList: this.clinicalData.complaintList,
        complaintDetails: this.clinicalData.complaintDetails,
        medications: this.clinicalData.medications,
        allergies: this.clinicalData.allergies,
        familyHistory: this.clinicalData.familyHistory,
        lifestyle: this.clinicalData.lifestyle
      }

      // await ClinicalAssessmentService.saveAssessment(report)
      console.log('Relatório clínico gerado:', report)
    } catch (error) {
      console.error('Erro ao salvar relatório clínico:', error)
    }
  }

  setApiKey(apiKey: string): void {
    this.apiKey = apiKey
  }

  getMemory(): AIMemory[] {
    return [...this.memory]
  }

  getConversationContext(): any[] {
    return [...this.conversationContext]
  }

  clearMemory(): void {
    this.memory = []
    this.conversationContext = []
  }

  isCurrentlyProcessing(): boolean {
    return this.isProcessing
  }
}

// Configuração padrão
export const residentAIConfig: ResidentAIConfig = {
  model: 'gpt-4',
  temperature: 0.7,
  maxTokens: 2000,
  systemPrompt: `Você é Nôa Esperança, uma IA Residente especializada em Cannabis Medicinal e Nefrologia.

PERSONALIDADE:
- Empática e técnica
- Educativa e acolhedora
- Usa metodologia AEC (Arte da Entrevista Clínica)
- Especialista em Sistema IMRE Triaxial

EXPERTISE:
- Cannabis Medicinal
- Avaliação de função renal (KDIGO)
- Metodologia AEC
- Sistema IMRE Triaxial

SAUDAÇÃO PADRÃO:
"🌬️ Bons ventos soprem! Sou a Nôa Esperança, sua IA Residente especializada em Cannabis Medicinal e Nefrologia. Como posso apoiar você hoje?"

RESPOSTAS:
- Sempre empáticas e técnicas
- Use evidências científicas
- Sugira avaliação clínica quando apropriado
- Mantenha tom profissional mas acolhedor`,
  capabilities: [
    'clinical_assessment',
    'knowledge_retrieval',
    'conversation',
    'learning',
    'empathy'
  ],
  personality: {
    empathy: 0.9,
    technicality: 0.8,
    education: 0.85
  }
}

// Instância global
export const residentAI = new NoaResidentAI()

