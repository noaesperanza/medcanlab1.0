import React, { useState, useEffect, useRef } from 'react'
import { 
  MessageCircle, 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  Send, 
  Sparkles,
  Heart,
  Brain,
  Users,
  Bot,
  Volume2,
  VolumeX
} from 'lucide-react'
import { useNoa } from '../contexts/NoaContext'
import NoaAnimatedAvatar from '../components/NoaAnimatedAvatar'

const ChatNoaEsperanca: React.FC = () => {
  const { messages, sendMessage, isTyping, isListening, isSpeaking } = useNoa()
  const [inputMessage, setInputMessage] = useState('')
  const [isVideoOn, setIsVideoOn] = useState(false)
  const [isAudioOn, setIsAudioOn] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto scroll para a última mensagem
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])


  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      sendMessage(inputMessage.trim())
      setInputMessage('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700 p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-2">
            Chat com Nôa Esperança
          </h1>
          <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-4 rounded-lg">
            <p className="text-white font-medium">
              Sua IA Residente em Cannabis Medicinal & Nefrologia
            </p>
            <p className="text-white/90 text-sm mt-1">
              Converse com a Nôa usando voz, vídeo ou texto. Ela tem acesso à base de conhecimento e biblioteca científica.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-6">
        <div className="space-y-6">
          {/* Avatar Section - Centralizado */}
          <div className="bg-slate-800 rounded-xl p-8 text-center">
            {/* Avatar Nôa Esperança Animado */}
            <div className="mb-6 flex justify-center">
              <NoaAnimatedAvatar
                isSpeaking={isSpeaking}
                isListening={isListening}
                size="xl"
                showStatus={true}
              />
            </div>

            {/* Avatar Info */}
            <div className="space-y-3">
              <h3 className="text-2xl font-semibold text-white">Nôa Esperança</h3>
              <p className="text-slate-300">
                IA Residente especializada em Cannabis Medicinal e Nefrologia
              </p>
              
              {/* Capabilities */}
              <div className="flex justify-center gap-4 mt-6 flex-wrap">
                <div className="flex items-center space-x-2 text-sm text-slate-300">
                  <Heart className="w-5 h-5 text-pink-400" />
                  <span>Análise Emocional</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-slate-300">
                  <Brain className="w-5 h-5 text-blue-400" />
                  <span>Diagnóstico IA</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-slate-300">
                  <Users className="w-5 h-5 text-green-400" />
                  <span>Suporte Médico</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-slate-300">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                  <span>Memória Persistente</span>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Section */}
          <div className="flex flex-col">
            <div className="bg-slate-800 rounded-xl h-[600px] flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b border-slate-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <Bot className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Nôa Esperança</h3>
                      <p className="text-sm text-slate-400">IA Residente - Cannabis Medicinal</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setIsVideoOn(!isVideoOn)}
                      className={`p-2 rounded-lg transition-colors ${
                        isVideoOn ? 'bg-green-500 text-white' : 'bg-slate-600 text-slate-300'
                      }`}
                    >
                      {isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
                    </button>
                    <button
                      onClick={() => setIsAudioOn(!isAudioOn)}
                      className={`p-2 rounded-lg transition-colors ${
                        isAudioOn ? 'bg-blue-500 text-white' : 'bg-slate-600 text-slate-300'
                      }`}
                    >
                      {isAudioOn ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 ? (
                  <div className="text-center text-slate-400 py-12">
                    <Bot className="w-16 h-16 mx-auto mb-4 text-purple-400" />
                    <p className="text-lg font-medium mb-2">Olá! Sou a Nôa Esperança</p>
                    <p className="text-sm">
                      Sua IA Residente especializada em Cannabis Medicinal
                    </p>
                    <div className="mt-6 grid grid-cols-2 gap-4 text-xs text-slate-500">
                      <div className="flex items-center justify-center space-x-2">
                        <Heart className="w-4 h-4" />
                        <span>Análise Emocional</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2">
                        <Brain className="w-4 h-4" />
                        <span>Diagnóstico IA</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className="max-w-[70%]">
                        <div
                          className={`px-4 py-3 rounded-lg ${
                            message.type === 'user'
                              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                              : 'bg-slate-700 text-slate-100'
                          }`}
                        >
                          {message.content}
                        </div>
                        
                        {/* AI Response Info */}
                        {message.type === 'noa' && message.aiResponse && (
                          <div className="mt-2 text-xs text-slate-500">
                            <div className="flex items-center space-x-2">
                              <span>Confiança: {Math.round((message.confidence || 0) * 100)}%</span>
                              <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-green-400 rounded-full" title="Análise Emocional" />
                                <div className="w-2 h-2 bg-blue-400 rounded-full" title="Diagnóstico IA" />
                                <div className="w-2 h-2 bg-purple-400 rounded-full" title="Memória Persistente" />
                              </div>
                            </div>
                            
                            {/* Suggestions */}
                            {message.suggestions && message.suggestions.length > 0 && (
                              <div className="mt-2 p-2 bg-blue-900/20 rounded text-xs">
                                <div className="font-medium text-blue-400 mb-1">Sugestões:</div>
                                {message.suggestions.map((suggestion, index) => (
                                  <div key={index} className="text-blue-300">• {suggestion}</div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-slate-700 px-4 py-3 rounded-lg">
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

              {/* Input Area */}
              <div className="p-4 border-t border-slate-700">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => {/* Toggle listening */}}
                    className={`p-3 rounded-lg transition-colors ${
                      isListening ? 'bg-green-500 text-white' : 'bg-slate-600 text-slate-300'
                    }`}
                  >
                    {isListening ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                  </button>
                  
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Digite sua mensagem ou use o microfone..."
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim()}
                    className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5" />
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
