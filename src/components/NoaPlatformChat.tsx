import React, { useState, useEffect, useRef } from 'react'
import { MessageCircle, X, Send, Loader2, Code, Route, Brain } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { getNoaTrainingSystem } from '../lib/noaTrainingSystem'
import { getNoaAssistantIntegration } from '../lib/noaAssistantIntegration'

interface NoaPlatformChatProps {
  userCode?: string
  userName?: string
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
}

export const NoaPlatformChat: React.FC<NoaPlatformChatProps> = ({
  userCode = 'DEV-001',
  userName = 'Dr. Ricardo Valença',
  position = 'bottom-right'
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [inputMessage, setInputMessage] = useState('')
  const [messages, setMessages] = useState<Array<{
    role: 'user' | 'noa'
    content: string
    timestamp: Date
  }>>([])
  const [isTyping, setIsTyping] = useState(false)
  
  const location = useLocation()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const trainingSystem = getNoaTrainingSystem()
  const assistantIntegration = getNoaAssistantIntegration()
  
  const [assistantAvailable, setAssistantAvailable] = useState(false)
  const [currentMode, setCurrentMode] = useState<'assistant' | 'local'>('local')

  // Registrar usuário no sistema de treinamento
  useEffect(() => {
    trainingSystem.registerUser(userCode, userName, 'developer', ['full'])
  }, [userCode, userName])

  // Atualizar rota atual
  useEffect(() => {
    trainingSystem.setCurrentRoute(location.pathname)
  }, [location.pathname])

  // Verificar disponibilidade do Assistant
  useEffect(() => {
    const checkAssistant = async () => {
      const available = await assistantIntegration.checkAvailability()
      setAssistantAvailable(available)
      setCurrentMode(available ? 'assistant' : 'local')
    }
    checkAssistant()
  }, [])

  // Scroll para última mensagem
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage = inputMessage.trim()
    setInputMessage('')

    // Adicionar mensagem do usuário
    const newUserMessage = {
      role: 'user' as const,
      content: userMessage,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, newUserMessage])

    // Registrar no sistema de treinamento
    trainingSystem.addConversationMessage({
      role: 'user',
      content: userMessage,
      context: {
        route: location.pathname,
        userCode,
        userId: userCode
      }
    })

    // Processar com IA (híbrido)
    setIsTyping(true)

    try {
      const response = await assistantIntegration.sendMessage(
        userMessage,
        userCode,
        location.pathname
      )

      const noaMessage = {
        role: 'noa' as const,
        content: response.content,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, noaMessage])

      // Registrar resposta da Nôa
      trainingSystem.addConversationMessage({
        role: 'noa',
        content: response.content,
        context: {
          route: location.pathname,
          userCode,
          userId: userCode
        }
      })

      // Atualizar modo atual
      if (response.from === 'assistant') {
        setCurrentMode('assistant')
      } else {
        setCurrentMode('local')
      }
    } catch (error) {
      console.error('Erro ao processar mensagem:', error)
    } finally {
      setIsTyping(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const getPositionClasses = () => {
    switch (position) {
      case 'bottom-right':
        return 'bottom-4 right-4'
      case 'bottom-left':
        return 'bottom-4 left-4'
      case 'top-right':
        return 'top-4 right-4'
      case 'top-left':
        return 'top-4 left-4'
      default:
        return 'bottom-4 right-4'
    }
  }

  return (
    <>
      {/* Botão Flutuante */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className={`fixed ${getPositionClasses()} z-50 w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 
            rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 
            transition-all duration-300 flex items-center justify-center text-white`}
          title="Chat com Nôa Esperança - Plataforma"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className={`fixed ${getPositionClasses()} z-50 w-96 h-[600px] bg-slate-800 rounded-xl shadow-2xl flex flex-col border border-slate-700`}>
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 rounded-t-xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-bold text-white">Nôa Esperança</h3>
                <p className="text-xs text-purple-100">IA Residente - Plataforma</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 rounded-full p-1 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Info Badge */}
          <div className="px-4 py-2 bg-slate-700/50 border-b border-slate-700 flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2 text-slate-300">
              <Code className="w-3 h-3" />
              <span>{userCode}</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-400">
              <Route className="w-3 h-3" />
              <span className="truncate max-w-[200px]">{location.pathname}</span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-slate-800 to-slate-900">
            {messages.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-white font-semibold mb-2">Olá, {userName}!</h4>
                <p className="text-sm text-slate-400 mb-4">
                  Sou a Nôa Esperança, IA Residente da plataforma.
                </p>
                <div className="bg-slate-700/50 rounded-lg p-3 text-left">
                  <p className="text-xs text-slate-300 mb-2">Posso ajudar com:</p>
                  <ul className="text-xs text-slate-400 space-y-1">
                    <li>• Status da plataforma</li>
                    <li>• Simulações de pacientes</li>
                    <li>• Informações sobre funcionalidades</li>
                    <li>• Histórico de conversas</li>
                  </ul>
                </div>
              </div>
            ) : (
              messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2 rounded-lg text-sm ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                        : 'bg-slate-700 text-slate-100'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{message.content}</div>
                    <div className={`text-xs mt-1 ${
                      message.role === 'user' ? 'text-purple-100' : 'text-slate-400'
                    }`}>
                      {message.timestamp.toLocaleTimeString('pt-BR', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </div>
                </div>
              ))
            )}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-slate-700 px-4 py-2 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-slate-700 bg-slate-800">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Pergunte sobre a plataforma..."
                className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="p-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isTyping ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </div>
            
            {/* Quick Commands */}
            <div className="mt-2 flex flex-wrap gap-2">
              <button
                onClick={() => setInputMessage('Status da plataforma')}
                className="text-xs px-2 py-1 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded transition-colors"
              >
                Status
              </button>
              <button
                onClick={() => setInputMessage('Simular paciente')}
                className="text-xs px-2 py-1 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded transition-colors"
              >
                Simular
              </button>
              <button
                onClick={() => setInputMessage('Avaliação clínica')}
                className="text-xs px-2 py-1 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded transition-colors"
              >
                Avaliação
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
