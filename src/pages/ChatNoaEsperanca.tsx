import React, { useState, useEffect, useRef } from 'react'
import { Brain, Sparkles, Database, Zap, Heart } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { getNoaTrainingSystem } from '../lib/noaTrainingSystem'
import { getNoaAssistantIntegration } from '../lib/noaAssistantIntegration'

const ChatNoaEsperanca: React.FC = () => {
  const location = useLocation()
  const [isOpen] = useState(true)
  const [inputMessage, setInputMessage] = useState('')
  const [messages, setMessages] = useState<Array<{
    id: string
    text: string
    sender: 'user' | 'noa'
    timestamp: Date
  }>>([])
  const [isTyping, setIsTyping] = useState(false)
  const [assistantAvailable, setAssistantAvailable] = useState(false)
  const [currentMode, setCurrentMode] = useState<'assistant' | 'local'>('local')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Carregar integração com a IA
  const assistantIntegration = getNoaAssistantIntegration()
  
  useEffect(() => {
    // Verificar se o Assistant está disponível
    const checkAvailability = async () => {
      const available = await assistantIntegration.checkAvailability()
      setAssistantAvailable(available)
    }
    checkAvailability()
  }, [])

  // Auto scroll para a última mensagem
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Atualizar rota no sistema de treinamento
  useEffect(() => {
    const trainingSystem = getNoaTrainingSystem()
    trainingSystem.setCurrentRoute(location.pathname)
  }, [location])

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    // Adicionar mensagem do usuário
    const userMessage = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user' as const,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMessage])
    
    const messageText = inputMessage
    setInputMessage('')
    setIsTyping(true)

    try {
      let response = ''

      // Tentar usar Assistant API se disponível
      if (assistantAvailable) {
        try {
          const assistantResponse = await assistantIntegration.sendMessage(messageText, {
            userCode: 'USER-001',
            userName: 'Usuário',
            currentRoute: location.pathname
          })
          
          if (assistantResponse.source === 'assistant') {
            response = assistantResponse.message
            setCurrentMode('assistant')
          } else {
            response = assistantResponse.message
            setCurrentMode('local')
          }
        } catch (error) {
          console.error('Erro com Assistant API:', error)
          // Fallback para sistema local
          const trainingSystem = getNoaTrainingSystem()
          response = await trainingSystem.generateContextualResponse(messageText)
          setCurrentMode('local')
        }
      } else {
        // Usar sistema local
        const trainingSystem = getNoaTrainingSystem()
        response = await trainingSystem.generateContextualResponse(messageText)
        setCurrentMode('local')
      }

      // Adicionar resposta da Nôa
      const noaMessage = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'noa' as const,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, noaMessage])
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error)
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        text: 'Desculpe, ocorreu um erro. Pode repetir?',
        sender: 'noa' as const,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Header */}
      <div className="bg-slate-800/80 backdrop-blur-sm border-b border-purple-500/30 p-6 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">
                Nôa Esperança
              </h1>
              <p className="text-purple-300 font-medium">
                IA Residente | Cannabis Medicinal & Nefrologia
              </p>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-600/80 to-pink-500/80 backdrop-blur-sm p-4 rounded-xl border border-purple-400/30">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2 text-sm">
                <Database className="w-4 h-4" />
                <span>Acesso à Base de Conhecimento</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Sparkles className="w-4 h-4" />
                <span>Biblioteca Científica Integrada</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Zap className="w-4 h-4" />
                <span>Memória Persistente</span>
              </div>
              {assistantAvailable && (
                <div className="flex items-center gap-2 text-sm bg-green-500/20 px-3 py-1 rounded-full">
                  <Heart className="w-4 h-4 text-green-400" />
                  <span className="text-green-400">Assistant API Ativo</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <div className="space-y-6">
          {/* Info Section */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30 text-center">
            <div className="space-y-3">
              <h3 className="text-2xl font-semibold text-white">Sua IA Residente Especializada</h3>
              <p className="text-slate-300">
                Nôa Esperança tem acesso completo à biblioteca científica, protocolos IMRE, 
                e pode ajudar com análises clínicas, diagnósticos e pesquisas.
              </p>
              
              {/* Capabilities */}
              <div className="flex justify-center gap-4 mt-6 flex-wrap">
                <div className="flex items-center space-x-2 text-sm text-slate-300 bg-slate-700/50 px-3 py-2 rounded-lg">
                  <Heart className="w-4 h-4 text-pink-400" />
                  <span>Análise Clínica</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-slate-300 bg-slate-700/50 px-3 py-2 rounded-lg">
                  <Brain className="w-4 h-4 text-blue-400" />
                  <span>Diagnóstico IA</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-slate-300 bg-slate-700/50 px-3 py-2 rounded-lg">
                  <Database className="w-4 h-4 text-green-400" />
                  <span>Base de Conhecimento</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-slate-300 bg-slate-700/50 px-3 py-2 rounded-lg">
                  <Zap className="w-4 h-4 text-purple-400" />
                  <span>Memória Persistente</span>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Section */}
          <div className="flex flex-col">
            <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl h-[600px] flex flex-col border border-purple-500/30 shadow-2xl">
              {/* Chat Header */}
              <div className="p-4 border-b border-purple-500/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                      <Brain className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Nôa Esperança</h3>
                      <p className="text-sm text-purple-300">
                        {currentMode === 'assistant' ? 'Assistant API' : 'Sistema Local'} • Base de Conhecimento Ativa
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {currentMode === 'assistant' && (
                      <div className="bg-green-500/20 px-3 py-1 rounded-full">
                        <span className="text-green-400 text-xs font-semibold">GPT-4</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.length === 0 ? (
                  <div className="text-center text-slate-400 py-12">
                    <Brain className="w-16 h-16 mx-auto mb-4 text-purple-400" />
                    <p className="text-lg font-medium mb-2 text-white">Olá! Sou a Nôa Esperança</p>
                    <p className="text-sm">
                      Sua IA Residente especializada em Cannabis Medicinal & Nefrologia
                    </p>
                    <div className="mt-6 grid grid-cols-2 gap-4 text-xs text-slate-400">
                      <div className="flex items-center justify-center space-x-2">
                        <Heart className="w-4 h-4 text-pink-400" />
                        <span>Análise Clínica</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2">
                        <Brain className="w-4 h-4 text-blue-400" />
                        <span>Diagnóstico IA</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2">
                        <Database className="w-4 h-4 text-green-400" />
                        <span>Base de Conhecimento</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2">
                        <Zap className="w-4 h-4 text-purple-400" />
                        <span>Memória Persistente</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[75%] ${message.sender === 'user' ? 'flex flex-col items-end' : ''}`}>
                        <div
                          className={`px-4 py-3 rounded-2xl shadow-lg ${
                            message.sender === 'user'
                              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                              : 'bg-slate-700/80 backdrop-blur-sm text-slate-100 border border-purple-500/20'
                          }`}
                        >
                          {message.text}
                        </div>
                        <span className="text-xs text-slate-500 mt-1 px-2">
                          {message.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  ))
                )}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-slate-700/80 px-4 py-3 rounded-2xl">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-purple-500/30">
                <div className="flex items-center space-x-3">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Pergunte à Nôa sobre protocolos, diagnósticos, ou pesquisas..."
                      className="w-full px-4 py-3 bg-slate-700/80 backdrop-blur-sm border border-purple-500/30 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50"
                    />
                  </div>
                  
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isTyping}
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg hover:shadow-purple-500/50"
                  >
                    Enviar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatNoaEsperanca
