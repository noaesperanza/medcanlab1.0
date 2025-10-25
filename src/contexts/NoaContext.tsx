import React, { createContext, useContext, useState, ReactNode } from 'react'
import { NoaEsperancaCore, noaEsperancaConfig, NoaInteraction } from '../lib/noaEsperancaCore'

export interface NoaMessage {
  id: string
  type: 'user' | 'noa'
  content: string
  timestamp: Date
  isTyping?: boolean
  audioUrl?: string
  videoUrl?: string
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
      // Criar interação para Nôa Esperança
      const interacao: NoaInteraction = {
        id: Date.now().toString(),
        timestamp: new Date(),
        tipo: 'consulta',
        modalidade: 'texto',
        conteudo: content,
        contexto: {
          paciente: null,
          sintomas: [],
          queixa: content,
          historia: ''
        },
        resposta: {
          empatia: 0,
          tecnicidade: 0,
          educacao: 0
        }
      }

      // Usar Nôa Esperança Core para gerar resposta
      const resposta = await noaCore.realizarEntrevistaClinica(interacao)
      
      const noaMessage: NoaMessage = {
        id: (Date.now() + 1).toString(),
        type: 'noa',
        content: resposta,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, noaMessage])
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
