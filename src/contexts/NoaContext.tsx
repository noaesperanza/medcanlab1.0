import React, { createContext, useContext, useState, ReactNode } from 'react'
import { NoaEsperancaCore, noaEsperancaConfig, NoaInteraction } from '../lib/noaEsperancaCore'
import { NoaResidentAI, residentAIConfig, AIResponse } from '../lib/noaResidentAI'

export interface NoaMessage {
  id: string
  type: 'user' | 'noa'
  content: string
  timestamp: Date
  isTyping?: boolean
  audioUrl?: string
  videoUrl?: string
  aiResponse?: AIResponse
  confidence?: number
  suggestions?: string[]
}

export interface NoaContextType {
  messages: NoaMessage[]
  isOpen: boolean
  isTyping: boolean
  isListening: boolean
  isSpeaking: boolean
  sendMessage: (content: string) => void
  toggleChat: () => void
  startListening: () => void
  stopListening: () => void
  clearMessages: () => void
  setTyping: (typing: boolean) => void
}

const NoaContext = createContext<NoaContextType | undefined>(undefined)

export const useNoa = () => {
  const context = useContext(NoaContext)
  if (context === undefined) {
    throw new Error('useNoa must be used within a NoaProvider')
  }
  return context
}

interface NoaProviderProps {
  children: ReactNode
}

export const NoaProvider: React.FC<NoaProviderProps> = ({ children }) => {
  const [messages, setMessages] = useState<NoaMessage[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  
  // Inicializar Nôa Esperança Core
  const noaCore = new NoaEsperancaCore(noaEsperancaConfig)
  
  // Inicializar IA Residente
  const residentAI = new NoaResidentAI(residentAIConfig)

  // Função para iniciar condução da avaliação IMRE pela IA
  const startIMREAssessment = async (): Promise<string> => {
    console.log('🎯 Nôa Esperança iniciando Avaliação Clínica IMRE Triaxial...')
    
    // Mensagem de boas-vindas e início da condução
    const welcomeMessage = `Olá! Sou a Nôa Esperança, sua IA Residente especializada em Cannabis Medicinal e Nefrologia. 🌬️

Vou conduzi-lo através da **Avaliação Clínica Inicial IMRE**, baseada na **Arte da Entrevista Clínica (AEC)** do Dr. Eduardo Faveret.

A metodologia IMRE é composta por **28 blocos semânticos** que seguem a estrutura da Arte da Entrevista Clínica:
• **Lista Indiciária** - Identificação de sintomas
• **Desenvolvimento da Queixa** - Anamnese detalhada
• **História Patológica** - Antecedentes médicos
• **História Familiar** - Antecedentes hereditários
• **Hábitos de Vida** - Alimentação e exercícios
• **Medicações** - Uso atual e histórico
• **Alergias** - Identificação de reações
• **Fechamento Consensual** - Síntese e validação
• **Monitoramento Renal** - Cidade Amiga dos Rins

Este processo leva cerca de 10-15 minutos e segue a metodologia AEC para escuta profunda e ética.

**Por favor, me conte: o que o trouxe aqui hoje?** 🎭

(Descreva livremente sua situação, sintomas ou preocupações de saúde)`

    return welcomeMessage
  }

  const sendMessage = async (content: string) => {
    const userMessage: NoaMessage = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setIsTyping(true)

    try {
      // Detectar se é comando para iniciar avaliação IMRE
      const isIMRECommand = content.toLowerCase().includes('iniciar avaliação') || 
                            content.toLowerCase().includes('imre') ||
                            content.toLowerCase().includes('avaliação clínica')
      
      if (isIMRECommand) {
        // Iniciar condução da avaliação IMRE pela IA
        console.log('🎯 Iniciando condução da Avaliação Clínica IMRE...')
        const imreResponse = await startIMREAssessment()
        
        const noaMessage: NoaMessage = {
          id: (Date.now() + 1).toString(),
          type: 'noa',
          content: imreResponse,
          timestamp: new Date(),
          confidence: 0.95
        }
        
        setMessages(prev => [...prev, noaMessage])
      } else {
        // Processamento normal com IA Residente
        console.log('🧠 Processando mensagem com IA Residente...')
        const aiResponse = await residentAI.processMessage(content)
        
        console.log('✅ Resposta da IA Residente:', aiResponse)
        
        const noaMessage: NoaMessage = {
          id: (Date.now() + 1).toString(),
          type: 'noa',
          content: aiResponse.content,
          timestamp: new Date(),
          aiResponse: aiResponse,
          confidence: aiResponse.confidence,
          suggestions: aiResponse.suggestions
        }

        setMessages(prev => [...prev, noaMessage])
      }
    } catch (error) {
      console.error('Erro ao processar mensagem com Nôa:', error)
      
      // Fallback para resposta simples
      const noaMessage: NoaMessage = {
        id: (Date.now() + 1).toString(),
        type: 'noa',
        content: `Olá! Sou a Nôa Esperança, sua assistente médica especializada em Cannabis Medicinal. Como posso ajudá-lo hoje?`,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, noaMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const toggleChat = () => {
    setIsOpen(prev => !prev)
  }

  const startListening = () => {
    setIsListening(true)
    // Implementar reconhecimento de voz
  }

  const stopListening = () => {
    setIsListening(false)
  }

  const clearMessages = () => {
    setMessages([])
  }

  const setTyping = (typing: boolean) => {
    setIsTyping(typing)
  }

  const value: NoaContextType = {
    messages,
    isOpen,
    isTyping,
    isListening,
    isSpeaking,
    sendMessage,
    toggleChat,
    startListening,
    stopListening,
    clearMessages,
    setTyping
  }

  return (
    <NoaContext.Provider value={value}>
      {children}
    </NoaContext.Provider>
  )
}
