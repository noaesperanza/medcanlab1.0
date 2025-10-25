/**
 * NÔA ESPERANÇA - IA RESIDENTE
 * Sistema de Inteligência Artificial Residente baseado no repositório original
 * https://github.com/noaesperanza/noa-nova-esperanza-app.git
 */

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
  private conversationContext: string[] = []
  private isProcessing: boolean = false

  constructor(config: ResidentAIConfig) {
    this.config = config
    this.initializeAI()
  }

  private async initializeAI() {
    console.log('🧠 Inicializando IA Residente Nôa Esperança...')
    
    // Carregar memória persistente
    await this.loadMemory()
    
    // Inicializar contexto de conversa
    this.conversationContext = [
      "Sou a Nôa Esperança, sua assistente médica especializada em Cannabis Medicinal.",
      "Utilizo a Arte da Entrevista Clínica e o Sistema IMRE Triaxial.",
      "Estou aqui para te ajudar com empatia, técnica e educação."
    ]
    
    console.log('✅ IA Residente inicializada com sucesso')
  }

  /**
   * Processar mensagem do usuário
   */
  async processMessage(userMessage: string, context?: any): Promise<AIResponse> {
    if (this.isProcessing) {
      return this.createResponse("Estou processando sua mensagem anterior. Um momento, por favor...")
    }

    this.isProcessing = true

    try {
      // Adicionar ao contexto da conversa
      this.conversationContext.push(`Usuário: ${userMessage}`)

      // Analisar a mensagem
      const analysis = await this.analyzeMessage(userMessage, context)

      // Gerar resposta baseada na análise
      const response = await this.generateResponse(analysis, userMessage)

      // Adicionar resposta ao contexto
      this.conversationContext.push(`Nôa: ${response.content}`)

      // Salvar na memória
      await this.saveToMemory(userMessage, response)

      return response

    } catch (error) {
      console.error('❌ Erro no processamento da IA:', error)
      return this.createResponse("Desculpe, ocorreu um erro interno. Pode repetir sua pergunta?")
    } finally {
      this.isProcessing = false
    }
  }

  /**
   * Análise semântica da mensagem
   */
  private async analyzeMessage(message: string, context?: any) {
    const analysis = {
      intent: this.detectIntent(message),
      entities: this.extractEntities(message),
      emotions: this.analyzeEmotions(message),
      medicalContext: this.analyzeMedicalContext(message),
      urgency: this.assessUrgency(message),
      complexity: this.assessComplexity(message)
    }

    console.log('🔍 Análise da mensagem:', analysis)
    return analysis
  }

  /**
   * Detectar intenção do usuário
   */
  private detectIntent(message: string): string {
    const lowerMessage = message.toLowerCase()

    // Intenções médicas
    if (lowerMessage.includes('dor') || lowerMessage.includes('sintoma')) {
      return 'medical_symptom'
    }
    if (lowerMessage.includes('medicamento') || lowerMessage.includes('tratamento')) {
      return 'medical_treatment'
    }
    if (lowerMessage.includes('cannabis') || lowerMessage.includes('thc') || lowerMessage.includes('cbd')) {
      return 'cannabis_related'
    }
    if (lowerMessage.includes('ajuda') || lowerMessage.includes('orientação')) {
      return 'help_request'
    }
    if (lowerMessage.includes('obrigado') || lowerMessage.includes('obrigada')) {
      return 'gratitude'
    }

    return 'general_inquiry'
  }

  /**
   * Extrair entidades da mensagem
   */
  private extractEntities(message: string): string[] {
    const entities: string[] = []
    
    // Sintomas comuns
    const symptoms = ['dor', 'fadiga', 'nausea', 'ansiedade', 'depressão', 'insônia', 'inflamação']
    symptoms.forEach(symptom => {
      if (message.toLowerCase().includes(symptom)) {
        entities.push(symptom)
      }
    })

    // Partes do corpo
    const bodyParts = ['cabeça', 'pescoço', 'ombros', 'costas', 'peito', 'abdomen', 'pernas']
    bodyParts.forEach(part => {
      if (message.toLowerCase().includes(part)) {
        entities.push(part)
      }
    })

    return entities
  }

  /**
   * Analisar emoções na mensagem
   */
  private analyzeEmotions(message: string): string[] {
    const emotions: string[] = []
    
    const emotionWords = {
      'ansiedade': ['ansioso', 'ansiosa', 'nervoso', 'nervosa', 'preocupado', 'preocupada'],
      'tristeza': ['triste', 'deprimido', 'deprimida', 'melancólico', 'melancólica'],
      'alegria': ['feliz', 'alegre', 'contento', 'contente', 'satisfeito', 'satisfeita'],
      'medo': ['medo', 'assustado', 'assustada', 'receio', 'temor'],
      'raiva': ['raiva', 'irritado', 'irritada', 'furioso', 'furiosa']
    }

    Object.entries(emotionWords).forEach(([emotion, words]) => {
      if (words.some(word => message.toLowerCase().includes(word))) {
        emotions.push(emotion)
      }
    })

    return emotions
  }

  /**
   * Analisar contexto médico
   */
  private analyzeMedicalContext(message: string): any {
    return {
      hasSymptoms: this.extractEntities(message).length > 0,
      hasEmotions: this.analyzeEmotions(message).length > 0,
      mentionsCannabis: message.toLowerCase().includes('cannabis') || 
                       message.toLowerCase().includes('thc') || 
                       message.toLowerCase().includes('cbd'),
      mentionsMedication: message.toLowerCase().includes('medicamento') ||
                         message.toLowerCase().includes('remédio') ||
                         message.toLowerCase().includes('tratamento')
    }
  }

  /**
   * Avaliar urgência da mensagem
   */
  private assessUrgency(message: string): 'low' | 'medium' | 'high' {
    const urgentWords = ['urgente', 'emergência', 'grave', 'sério', 'crítico']
    const hasUrgentWords = urgentWords.some(word => 
      message.toLowerCase().includes(word)
    )

    if (hasUrgentWords) return 'high'
    
    const medicalWords = ['dor', 'sintoma', 'mal-estar', 'problema']
    const hasMedicalWords = medicalWords.some(word => 
      message.toLowerCase().includes(word)
    )

    return hasMedicalWords ? 'medium' : 'low'
  }

  /**
   * Avaliar complexidade da mensagem
   */
  private assessComplexity(message: string): 'simple' | 'moderate' | 'complex' {
    const wordCount = message.split(' ').length
    const hasMedicalTerms = this.extractEntities(message).length > 0
    const hasMultipleTopics = message.includes(' e ') || message.includes(' mas ')

    if (wordCount > 50 || hasMedicalTerms && hasMultipleTopics) {
      return 'complex'
    } else if (wordCount > 20 || hasMedicalTerms) {
      return 'moderate'
    } else {
      return 'simple'
    }
  }

  /**
   * Gerar resposta baseada na análise
   */
  private async generateResponse(analysis: any, originalMessage: string): Promise<AIResponse> {
    const { intent, emotions, medicalContext, urgency, complexity } = analysis

    let response = ""
    let reasoning = ""
    let suggestions: string[] = []
    let followUp: string[] = []

    // Resposta baseada na intenção
    switch (intent) {
      case 'medical_symptom':
        response = this.generateMedicalResponse(analysis)
        reasoning = "Detectei uma consulta sobre sintomas médicos"
        suggestions = [
          "Descreva melhor os sintomas",
          "Mencione há quanto tempo sente isso",
          "Informe se há outros sintomas associados"
        ]
        break

      case 'cannabis_related':
        response = this.generateCannabisResponse(analysis)
        reasoning = "Pergunta relacionada à Cannabis Medicinal"
        suggestions = [
          "Consulte um médico especialista",
          "Verifique a legislação local",
          "Considere o acompanhamento médico"
        ]
        break

      case 'help_request':
        response = this.generateHelpResponse(analysis)
        reasoning = "Solicitação de ajuda identificada"
        suggestions = [
          "Como posso te ajudar melhor?",
          "Precisa de orientação médica?",
          "Quer falar sobre seus sintomas?"
        ]
        break

      default:
        response = this.generateGeneralResponse(analysis)
        reasoning = "Consulta geral identificada"
        suggestions = [
          "Posso esclarecer alguma dúvida?",
          "Precisa de mais informações?",
          "Como posso te ajudar?"
        ]
    }

    // Adicionar empatia baseada nas emoções detectadas
    if (emotions.includes('ansiedade')) {
      response = `Entendo que você está se sentindo ansioso(a). ${response}`
    } else if (emotions.includes('tristeza')) {
      response = `Vejo que você está passando por um momento difícil. ${response}`
    }

    // Ajustar urgência
    if (urgency === 'high') {
      response = `⚠️ ${response} Recomendo procurar atendimento médico imediato.`
    }

    return {
      id: Date.now().toString(),
      content: response,
      confidence: this.calculateConfidence(analysis),
      reasoning,
      suggestions,
      followUp,
      timestamp: new Date()
    }
  }

  /**
   * Gerar resposta médica
   */
  private generateMedicalResponse(analysis: any): string {
    const entities = analysis.entities
    const emotions = analysis.emotions

    if (entities.length > 0) {
      return `Entendo que você está relatando ${entities.join(', ')}. É importante que você procure um médico para uma avaliação adequada. Enquanto isso, posso te orientar sobre algumas medidas gerais de cuidado.`
    }

    return "Para te ajudar melhor com questões médicas, preciso que você descreva seus sintomas com mais detalhes. Isso me permitirá dar orientações mais precisas."
  }

  /**
   * Gerar resposta sobre Cannabis
   */
  private generateCannabisResponse(analysis: any): string {
    return "Sobre Cannabis Medicinal, é fundamental que você tenha acompanhamento médico especializado. A Cannabis pode ter benefícios terapêuticos, mas deve ser usada com orientação profissional adequada e dentro da legalidade."
  }

  /**
   * Gerar resposta de ajuda
   */
  private generateHelpResponse(analysis: any): string {
    return "Estou aqui para te ajudar! Como sua assistente médica especializada, posso te orientar sobre sintomas, tratamentos e cuidados com a saúde. O que você gostaria de saber?"
  }

  /**
   * Gerar resposta geral
   */
  private generateGeneralResponse(analysis: any): string {
    return "Olá! Sou a Nôa Esperança, sua assistente médica especializada em Cannabis Medicinal. Como posso te ajudar hoje? Posso te orientar sobre sintomas, tratamentos e cuidados com a saúde."
  }

  /**
   * Calcular confiança da resposta
   */
  private calculateConfidence(analysis: any): number {
    let confidence = 0.5 // Base

    if (analysis.entities.length > 0) confidence += 0.2
    if (analysis.emotions.length > 0) confidence += 0.1
    if (analysis.medicalContext.hasSymptoms) confidence += 0.2

    return Math.min(confidence, 1.0)
  }

  /**
   * Salvar na memória
   */
  private async saveToMemory(userMessage: string, response: AIResponse) {
    const memory: AIMemory = {
      id: Date.now().toString(),
      type: 'conversation',
      content: `${userMessage} -> ${response.content}`,
      importance: response.confidence,
      timestamp: new Date(),
      tags: ['conversation', 'medical']
    }

    this.memory.push(memory)
    
    // Manter apenas as últimas 100 memórias
    if (this.memory.length > 100) {
      this.memory = this.memory.slice(-100)
    }
  }

  /**
   * Carregar memória persistente
   */
  private async loadMemory() {
    // Implementar carregamento de memória persistente
    // Por enquanto, inicializar vazio
    this.memory = []
  }

  /**
   * Criar resposta de fallback
   */
  private createResponse(content: string): AIResponse {
    return {
      id: Date.now().toString(),
      content,
      confidence: 0.5,
      reasoning: "Resposta de fallback",
      suggestions: [],
      followUp: [],
      timestamp: new Date()
    }
  }

  /**
   * Obter estatísticas da IA
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

// Configuração padrão da IA Residente
export const residentAIConfig: ResidentAIConfig = {
  model: "noa-esperanca-v1",
  temperature: 0.7,
  maxTokens: 1000,
  systemPrompt: "Você é a Nôa Esperança, uma assistente médica especializada em Cannabis Medicinal. Use a Arte da Entrevista Clínica e o Sistema IMRE Triaxial para fornecer respostas empáticas, técnicas e educativas.",
  capabilities: [
    "Análise de sintomas",
    "Orientação sobre Cannabis Medicinal",
    "Suporte emocional",
    "Educação médica",
    "Acompanhamento terapêutico"
  ],
  personality: {
    empathy: 0.9,
    technicality: 0.8,
    education: 0.9
  }
}
