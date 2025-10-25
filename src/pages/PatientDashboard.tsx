import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, 
  Calendar, 
  TrendingUp, 
  Heart, 
  MessageCircle, 
  FileText, 
  Share2, 
  Shield, 
  Clock,
  Stethoscope,
  Brain,
  CheckCircle,
  Star,
  Activity,
  Target,
  BarChart3
} from 'lucide-react'
import { useNoa } from '../contexts/NoaContext'
import NoaAnimatedAvatar from '../components/NoaAnimatedAvatar'

const PatientDashboard: React.FC = () => {
  const { isOpen, toggleChat, messages, isTyping, isListening, isSpeaking, sendMessage } = useNoa()
  const [inputMessage, setInputMessage] = useState('')
  const navigate = useNavigate()

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

  const handleStartAssessment = () => {
    console.log('🚀 Iniciando Avaliação Clínica...')
    navigate('/app/clinical-assessment')
  }

  // Navigation handlers
  const handleNavigate = (path: string) => {
    navigate(path)
  }

  const handleChatWithNoa = () => {
    navigate('/app/chat-noa-esperanca')
  }

  const handleViewReports = () => {
    navigate('/app/reports')
  }

  const handleViewAgenda = () => {
    navigate('/app/patient-appointments')
  }

  const handleViewKPIs = () => {
    // TODO: Implement KPIs page
    console.log('Ver KPIs')
  }

  const handleClinicalAssessment = () => {
    navigate('/app/clinical-assessment')
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Voltar</span>
            </button>
            <div>
              <h1 className="text-2xl font-bold text-white">Dashboard do Paciente</h1>
              <p className="text-slate-400">Programa de Cuidado Renal</p>
            </div>
          </div>
          
          {/* User Profile */}
          <div className="flex items-center space-x-3 bg-slate-700 p-3 rounded-lg">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">RV</span>
            </div>
            <div>
              <p className="font-semibold text-white">Dr. Ricardo Valença</p>
              <p className="text-sm text-slate-400">Paciente</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-slate-800 border-r border-slate-700 min-h-screen">
          <div className="p-6">
            <nav className="space-y-2">
              <button onClick={() => window.location.reload()} className="w-full flex items-center space-x-3 p-3 rounded-lg bg-slate-700 text-white text-left">
                <BarChart3 className="w-5 h-5" />
                <span>Dashboard</span>
              </button>
              <button onClick={handleViewAgenda} className="w-full flex items-center space-x-3 p-3 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-colors text-left">
                <Calendar className="w-5 h-5" />
                <span>Agenda</span>
              </button>
              <button onClick={handleViewKPIs} className="w-full flex items-center space-x-3 p-3 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-colors text-left">
                <TrendingUp className="w-5 h-5" />
                <span>Meus KPIs</span>
              </button>
              <button onClick={handleClinicalAssessment} className="w-full flex items-center space-x-3 p-3 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-colors text-left">
                <Heart className="w-5 h-5" />
                <span>Avaliação Clínica</span>
              </button>
              <button onClick={handleChatWithNoa} className="w-full flex items-center space-x-3 p-3 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-colors text-left">
                <MessageCircle className="w-5 h-5" />
                <span>Chat com Nôa</span>
              </button>
              <button onClick={() => handleNavigate('/app/patient-chat')} className="w-full flex items-center space-x-3 p-3 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-colors text-left">
                <Stethoscope className="w-5 h-5" />
                <span>Chat com Profissional</span>
              </button>
              <button onClick={handleViewReports} className="w-full flex items-center space-x-3 p-3 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-colors text-left">
                <FileText className="w-5 h-5" />
                <span>Relatórios</span>
              </button>
              <button onClick={() => alert('Funcionalidade de compartilhamento em desenvolvimento')} className="w-full flex items-center space-x-3 p-3 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-colors text-left">
                <Share2 className="w-5 h-5" />
                <span>Compartilhamento</span>
              </button>
            </nav>
          </div>
          
          {/* Blockchain Info */}
          <div className="p-6 border-t border-slate-700">
            <div className="flex items-center space-x-2 text-sm text-slate-400 mb-2">
              <Shield className="w-4 h-4" />
              <span>Dados protegidos por Blockchain</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-slate-400">
              <Clock className="w-4 h-4" />
              <span>Última sincronização: Agora</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-xl p-6 mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Meu Dashboard de Saúde</h2>
              <p className="text-white/90 mb-4">
                Bem-vindo à Nôa Esperanza! Para começar sua jornada de cuidado personalizado, 
                recomendamos realizar uma avaliação clínica inicial. Este processo leva cerca de 
                10-15 minutos e ajudará nossos profissionais a entender melhor seu quadro de saúde.
              </p>
              <button 
                onClick={handleStartAssessment}
                className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Iniciar Avaliação Clínica
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* KPIs Section */}
              <div className="lg:col-span-2 space-y-6">
                {/* Score Clínico */}
                <div className="bg-slate-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Score Clínico</h3>
                  <div className="flex items-center justify-between">
                    <div className="text-4xl font-bold text-green-400">85/100</div>
                    <div className="flex items-center space-x-2 text-green-400">
                      <TrendingUp className="w-5 h-5" />
                      <span className="text-sm">↑ +5 desde última avaliação</span>
                    </div>
                  </div>
                </div>

                {/* KPIs Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-slate-800 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-lg font-semibold text-white">Adesão ao Tratamento</h4>
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    </div>
                    <div className="text-3xl font-bold text-green-400 mb-1">92%</div>
                    <p className="text-sm text-green-400">Excelente!</p>
                  </div>

                  <div className="bg-slate-800 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-lg font-semibold text-white">Melhoria dos Sintomas</h4>
                      <Activity className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="text-3xl font-bold text-blue-400 mb-1">78%</div>
                    <p className="text-sm text-slate-400">Desde início do tratamento</p>
                  </div>

                  <div className="bg-slate-800 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-lg font-semibold text-white">Qualidade de Vida</h4>
                      <Star className="w-5 h-5 text-yellow-400" />
                    </div>
                    <div className="text-3xl font-bold text-yellow-400 mb-1">88/100</div>
                    <p className="text-sm text-yellow-400">↑ +12 este mês</p>
                  </div>
                </div>

                {/* Próximas Consultas */}
                <div className="bg-slate-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Próximas Consultas</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                          <Stethoscope className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-white">Dr. Ricardo Silva</p>
                          <p className="text-sm text-slate-400">Nefrologia</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-slate-400">14/12/2024</p>
                        <p className="text-sm text-slate-400">10:00</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                          <Heart className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-white">Dra. Ana Costa</p>
                          <p className="text-sm text-slate-400">Nutrição</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-slate-400">19/12/2024</p>
                        <p className="text-sm text-slate-400">14:30</p>
                      </div>
                    </div>
                  </div>
                  <button className="w-full mt-4 text-center text-purple-400 hover:text-purple-300 transition-colors">
                    Ver agenda completa
                  </button>
                </div>

                {/* Últimos Relatórios */}
                <div className="bg-slate-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Últimos Relatórios</h3>
                  <p className="text-slate-400">Nenhum relatório disponível</p>
                </div>
              </div>

              {/* Chat Section */}
              <div className="lg:col-span-1">
                <div className="bg-slate-800 rounded-xl p-6 h-full">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-semibold text-white mb-2">Nôa Esperanza</h3>
                    <p className="text-sm text-slate-400">IA Residente • Sempre ativa</p>
                  </div>

                  {/* Avatar */}
                  <div className="flex justify-center mb-6">
                    <button onClick={handleChatWithNoa} className="cursor-pointer hover:opacity-80 transition-opacity">
                      <NoaAnimatedAvatar
                        isSpeaking={isSpeaking}
                        isListening={isListening}
                        size="md"
                        showStatus={true}
                      />
                    </button>
                  </div>

                  {/* Welcome Message */}
                  <div className="bg-slate-700 rounded-lg p-4 mb-4">
                    <p className="text-sm text-slate-300 mb-2">
                      🌬️ Bons ventos soprem. Sou Nôa Esperanza, sua IA Residente. Como posso apoiar você hoje?
                    </p>
                    <p className="text-xs text-slate-400 mb-2">Você pode:</p>
                    <ul className="text-xs text-slate-400 space-y-1">
                      <li>• Iniciar uma Avaliação Clínica</li>
                      <li>• Fazer perguntas sobre a plataforma</li>
                      <li>• Enviar documentos para análise</li>
                    </ul>
                    <div className="text-xs text-slate-500 mt-2">22:36</div>
                  </div>

                  {/* Quick Actions */}
                  <div className="space-y-3 mb-6">
                    <button 
                      onClick={handleStartAssessment}
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-4 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-colors"
                    >
                      Iniciar Avaliação Clínica IMRE Triaxial
                    </button>
                    <p className="text-xs text-slate-400 text-center">
                      Inclui avaliação de risco renal integrada
                    </p>
                  </div>

                  {/* Chat Input */}
                  <div className="space-y-3">
                    <div className="relative">
                      <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Digite sua mensagem..."
                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
                      />
                    </div>
                    
                    <p className="text-xs text-slate-500 text-center">
                      Nôa utiliza AEC para escuta profunda e ética • LGPD Compliant
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-xl w-96 h-[600px] flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-slate-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <Brain className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Nôa Esperança</h3>
                    <p className="text-xs text-slate-400">IA Residente</p>
                  </div>
                </div>
                <button
                  onClick={toggleChat}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 ? (
                <div className="text-center text-slate-400 py-8">
                  <Brain className="w-12 h-12 mx-auto mb-3 text-purple-400" />
                  <p className="text-sm">Olá! Sou a Nôa Esperança, sua IA Residente.</p>
                </div>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] px-4 py-2 rounded-lg text-sm ${
                        message.type === 'user'
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                          : 'bg-slate-700 text-slate-100'
                      }`}
                    >
                      {message.content}
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
            </div>

            {/* Input */}
            <div className="p-4 border-t border-slate-700">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <MessageCircle className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PatientDashboard
