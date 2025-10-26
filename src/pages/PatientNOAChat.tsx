import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, 
  Send, 
  Bot, 
  User, 
  Loader2, 
  Stethoscope,
  FileText,
  Download,
  Share2
} from 'lucide-react'
import { useNoa } from '../contexts/NoaContext'
import NoaAnimatedAvatar from '../components/NoaAnimatedAvatar'

const PatientNOAChat: React.FC = () => {
  const { messages, isTyping, isListening, isSpeaking, sendMessage } = useNoa()
  const [inputMessage, setInputMessage] = useState('')
  const navigate = useNavigate()

  const handleSendMessage = async () => {
    if (inputMessage.trim()) {
      await sendMessage(inputMessage.trim())
      setInputMessage('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleStartAssessment = () => {
    navigate('/app/clinical-assessment')
  }

  return (
    <div className="bg-slate-900 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <button 
              onClick={() => navigate('/app/patient-dashboard')}
              className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Voltar</span>
            </button>
          <div className="text-center">
              <h1 className="text-3xl font-bold text-white mb-2">🤖 Nôa Esperança</h1>
              <p className="text-slate-300 text-lg">Sua IA Residente Multimodal</p>
            </div>
            <div className="w-20"></div> {/* Spacer */}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Avatar Section */}
            <div className="bg-slate-800 rounded-xl p-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-white mb-2">Avatar Multimodal</h3>
                <p className="text-sm text-slate-400">IA Residente • Sempre ativa</p>
              </div>

              {/* Avatar */}
              <div className="flex justify-center mb-6">
                <NoaAnimatedAvatar
                  isSpeaking={isSpeaking}
                  isListening={isListening}
                  size="xl"
                  showStatus={true}
                  showControls={true}
                />
              </div>

              {/* Status */}
              <div className="text-center">
                <div className="inline-flex items-center space-x-2 bg-slate-700 rounded-lg px-4 py-2">
                  <div className={`w-2 h-2 rounded-full ${isListening ? 'bg-green-400' : 'bg-slate-400'}`}></div>
                  <span className="text-sm text-slate-300">
                    {isListening ? 'Ouvindo' : 'Pronta'}
                  </span>
                </div>
              </div>
            </div>

            {/* Chat Section */}
            <div className="bg-slate-800 rounded-xl p-6 flex flex-col h-[600px]">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-white mb-2">Chat com Nôa</h3>
                <p className="text-sm text-slate-400">Conversa e Avaliação Clínica</p>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                {messages.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Bot className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-white font-semibold mb-2">Olá!</h4>
                    <p className="text-sm text-slate-400 mb-4">
                      Sou a Nôa Esperança, sua IA Residente. Como posso ajudar hoje?
                    </p>
                    <div className="space-y-2">
                      <button
                        onClick={handleStartAssessment}
                        className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg transition-colors font-semibold text-sm flex items-center justify-center space-x-2"
                      >
                        <Stethoscope className="w-4 h-4" />
                        <span>Iniciar Avaliação Clínica IMRE Triaxial</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex space-x-3 max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.role === 'user' 
                            ? 'bg-blue-500' 
                            : 'bg-gradient-to-br from-purple-500 to-pink-600'
                        }`}>
                          {message.role === 'user' ? (
                            <User className="w-4 h-4 text-white" />
                          ) : (
                            <Bot className="w-4 h-4 text-white" />
                          )}
                        </div>
                        <div className={`rounded-2xl px-4 py-3 ${
                          message.role === 'user'
                            ? 'bg-blue-500 text-white'
                            : 'bg-slate-700 text-slate-100'
                        }`}>
                          <div className="text-sm leading-relaxed whitespace-pre-wrap">
                            {message.content}
                          </div>
                          <div className={`text-xs mt-1 ${
                            message.role === 'user' ? 'text-blue-100' : 'text-slate-400'
                          }`}>
                            {message.timestamp.toLocaleTimeString('pt-BR', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex space-x-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-slate-700 rounded-2xl px-4 py-3">
                        <div className="flex items-center space-x-2">
                          <Loader2 className="w-4 h-4 text-purple-400 animate-spin" />
                          <span className="text-sm text-slate-300">Nôa está digitando...</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="flex space-x-3">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Digite sua mensagem..."
                    disabled={isTyping}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  {isTyping && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <Loader2 className="w-4 h-4 text-purple-400 animate-spin" />
                    </div>
                  )}
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isTyping}
                  className="px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-slate-600 disabled:to-slate-600 disabled:cursor-not-allowed text-white rounded-xl transition-all duration-200 flex items-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PatientNOAChat
