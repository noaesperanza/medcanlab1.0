/**
 * INTEGRAÇÃO HÍBRIDA - NÔA ESPERANÇA
 * Combina OpenAI Assistant API com sistema local
 * Assistant ID: asst_fN2Fk9fQ7JEyyFUIe50Fo9QD
 */

interface AssistantConfig {
  assistantId: string
  apiKey: string
  timeout: number
}

interface MessageResponse {
  content: string
  from: 'assistant' | 'local'
  metadata?: {
    model?: string
    tokens?: number
    processingTime?: number
  }
}

export class NoaAssistantIntegration {
  private config: AssistantConfig
  private threadId: string | null = null

  constructor(config: Partial<AssistantConfig>) {
    this.config = {
      assistantId: config.assistantId || 'asst_fN2Fk9fQ7JEyyFUIe50Fo9QD',
      apiKey: config.apiKey || (import.meta as any).env?.VITE_OPENAI_API_KEY || '',
      timeout: config.timeout || 30000
    }
  }

  /**
   * Enviar mensagem ao Assistant ou fallback para sistema local
   */
  async sendMessage(
    message: string,
    userCode?: string,
    currentRoute?: string
  ): Promise<MessageResponse> {
    // Tentar usar Assistant API primeiro
    try {
      const assistantResponse = await this.tryAssistantAPI(message)
      return {
        content: assistantResponse,
        from: 'assistant',
        metadata: {
          model: 'gpt-4',
          processingTime: 0
        }
      }
    } catch (error) {
      console.warn('Assistant API não disponível, usando fallback local:', error)
      
      // Fallback para sistema local
      return this.useLocalFallback(message, userCode, currentRoute)
    }
  }

  /**
   * Tentar usar Assistant API
   */
  private async tryAssistantAPI(message: string): Promise<string> {
    if (!this.config.apiKey || this.config.apiKey === '') {
      throw new Error('API Key não configurada')
    }

    try {
      // Criar thread se não existir
      if (!this.threadId) {
        this.threadId = await this.createThread()
      }

      // Adicionar mensagem à thread
      await this.addMessageToThread(message)

      // Executar assistant
      const runId = await this.runAssistant()

      // Aguardar conclusão
      await this.waitForRunCompletion(runId)

      // Buscar resposta
      const response = await this.getLastMessage()
      
      return response
    } catch (error) {
      throw error
    }
  }

  /**
   * Criar thread para conversa
   */
  private async createThread(): Promise<string> {
    const response = await fetch('https://api.openai.com/v1/threads', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.config.apiKey}`,
        'Content-Type': 'application/json',
        'OpenAI-Beta': 'assistants=v2'
      }
    })

    if (!response.ok) {
      throw new Error(`Erro ao criar thread: ${response.statusText}`)
    }

    const data = await response.json()
    return data.id
  }

  /**
   * Adicionar mensagem à thread
   */
  private async addMessageToThread(message: string): Promise<void> {
    const response = await fetch(
      `https://api.openai.com/v1/threads/${this.threadId}/messages`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json',
          'OpenAI-Beta': 'assistants=v2'
        },
        body: JSON.stringify({
          role: 'user',
          content: message
        })
      }
    )

    if (!response.ok) {
      throw new Error(`Erro ao adicionar mensagem: ${response.statusText}`)
    }
  }

  /**
   * Executar assistant na thread
   */
  private async runAssistant(): Promise<string> {
    const response = await fetch(
      `https://api.openai.com/v1/threads/${this.threadId}/runs`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json',
          'OpenAI-Beta': 'assistants=v2'
        },
        body: JSON.stringify({
          assistant_id: this.config.assistantId,
          tools: [{ type: 'file_search' }] // Habilitar File Search
        })
      }
    )

    if (!response.ok) {
      throw new Error(`Erro ao executar assistant: ${response.statusText}`)
    }

    const data = await response.json()
    return data.id
  }

  /**
   * Aguardar conclusão da execução
   */
  private async waitForRunCompletion(runId: string): Promise<void> {
    const startTime = Date.now()

    while (true) {
      if (Date.now() - startTime > this.config.timeout) {
        throw new Error('Timeout esperando conclusão')
      }

      const response = await fetch(
        `https://api.openai.com/v1/threads/${this.threadId}/runs/${runId}`,
        {
          headers: {
            'Authorization': `Bearer ${this.config.apiKey}`,
            'OpenAI-Beta': 'assistants=v2'
          }
        }
      )

      const data = await response.json()

      if (data.status === 'completed') {
        return
      }

      if (data.status === 'failed' || data.status === 'cancelled' || data.status === 'expired') {
        throw new Error(`Execução falhou: ${data.status}`)
      }

      // Aguardar antes de tentar novamente
      await new Promise(resolve => setTimeout(resolve, 500))
    }
  }

  /**
   * Buscar última mensagem da thread
   */
  private async getLastMessage(): Promise<string> {
    const response = await fetch(
      `https://api.openai.com/v1/threads/${this.threadId}/messages`,
      {
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'OpenAI-Beta': 'assistants=v2'
        }
      }
    )

    const data = await response.json()
    const messages = data.data

    if (messages.length === 0) {
      throw new Error('Nenhuma mensagem encontrada')
    }

    // Buscar primeira mensagem do assistant
    const assistantMessage = messages.find((msg: any) => msg.role === 'assistant')

    if (!assistantMessage) {
      throw new Error('Resposta do assistant não encontrada')
    }

    // Extrair texto da resposta
    const content = assistantMessage.content[0]
    
    if (content.type === 'text') {
      let text = content.text.value
      
      // Limpar estrutura interna de raciocínio
      // Remove "Raciocínio:" e "Orientação/Resposta:" para deixar só a resposta
      text = this.cleanReasoningStructure(text)
      
      return text
    }

    throw new Error('Formato de resposta não suportado')
  }

  /**
   * Limpar estrutura interna de raciocínio
   */
  private cleanReasoningStructure(text: string): string {
    // Remove "Raciocínio:" e seu conteúdo
    text = text.replace(/Raciocínio:\s*[^\n]*(?:\n(?!Orientação\/Resposta:).*)*/gi, '')
    
    // Remove "Orientação/Resposta:" mantendo apenas o conteúdo após
    text = text.replace(/Orientação\/Resposta:\s*/gi, '')
    
    // Limpa linhas vazias extras
    text = text.replace(/\n{3,}/g, '\n\n')
    
    // Remove espaços em branco no início e fim
    return text.trim()
  }

  /**
   * Fallback para sistema local
   */
  private async useLocalFallback(
    message: string,
    userCode?: string,
    currentRoute?: string
  ): Promise<MessageResponse> {
    // Importar sistema local
    const { getNoaTrainingSystem } = await import('./noaTrainingSystem')
    const trainingSystem = getNoaTrainingSystem()

    // Gerar resposta local
    const startTime = Date.now()
    const response = trainingSystem.generateContextualResponse(message, userCode, currentRoute)
    const processingTime = Date.now() - startTime

    return {
      content: response,
      from: 'local',
      metadata: {
        model: 'local',
        processingTime
      }
    }
  }

  /**
   * Resetar thread (iniciar nova conversa)
   */
  resetThread(): void {
    this.threadId = null
  }

  /**
   * Obter configuração atual
   */
  getConfig(): AssistantConfig {
    return { ...this.config }
  }

  /**
   * Verificar se Assistant está disponível
   */
  async checkAvailability(): Promise<boolean> {
    try {
      if (!this.config.apiKey || this.config.apiKey === '') {
        return false
      }

      // Tentar criar uma thread para verificar
      await this.createThread()
      return true
    } catch {
      return false
    }
  }
}

// Instância singleton
let noaAssistantIntegration: NoaAssistantIntegration | null = null

export const getNoaAssistantIntegration = (): NoaAssistantIntegration => {
  if (!noaAssistantIntegration) {
    noaAssistantIntegration = new NoaAssistantIntegration({
      assistantId: 'asst_fN2Fk9fQ7JEyyFUIe50Fo9QD'
    })
  }
  return noaAssistantIntegration
}
