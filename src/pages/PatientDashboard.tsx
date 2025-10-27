import React, { useState, useRef, useEffect } from 'react'
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
  BarChart3,
  Send,
  Mic,
  MicOff
} from 'lucide-react'
import { useNoa } from '../contexts/NoaContext'
import NoaEsperancaAvatar from '../components/NoaEsperancaAvatar'

const PatientDashboard: React.FC = () => {
  const { isOpen, toggleChat, messages, isTyping, isListening, isSpeaking, sendMessage } = useNoa()
  const [inputMessage, setInputMessage] = useState('')
  const navigate = useNavigate()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Função para rolar para o final das mensagens
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  // Efeito para rolar automaticamente quando há novas mensagens ou quando está digitando
  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

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

  // Navigation handlers
  const handleNavigate = (path: string) => {
    navigate(path)
  }



  const handleViewReports = () => {
    navigate('/app/reports')
  }

  const handleViewAgenda = () => {
    navigate('/app/scheduling')
  }

  const handleViewKPIs = () => {
    // TODO: Implement KPIs page
    console.log('Ver KPIs')
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
              <button onClick={() => navigate('/app/subscription-plans')} className="w-full flex items-center space-x-3 p-3 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-colors text-left">
                <Heart className="w-5 h-5" />
                <span>Planos e Finanças</span>
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
                Bem-vindo à Nôa Esperanza! Aqui você pode acompanhar sua jornada de cuidado personalizado e acessar seus relatórios clínicos.
              </p>
            </div>


            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* KPIs Section */}
              <div className="lg:col-span-2 space-y-6">
                {/* Score Clínico */}
                <div className="bg-slate-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Score Clínico</h3>
                  <div className="flex items-center justify-between">
                    <div className="text-4xl font-bold text-slate-400">--/100</div>
                    <div className="flex items-center space-x-2 text-slate-400">
                      <TrendingUp className="w-5 h-5" />
                      <span className="text-sm">Aguardando avaliação</span>
                    </div>
                  </div>
                </div>

                {/* KPIs Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-slate-800 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-lg font-semibold text-white">Adesão ao Tratamento</h4>
                      <CheckCircle className="w-5 h-5 text-slate-400" />
                    </div>
                    <div className="text-3xl font-bold text-slate-400 mb-1">--%</div>
                    <p className="text-sm text-slate-400">Aguardando dados</p>
                  </div>

                  <div className="bg-slate-800 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-lg font-semibold text-white">Melhoria dos Sintomas</h4>
                      <Activity className="w-5 h-5 text-slate-400" />
                    </div>
                    <div className="text-3xl font-bold text-slate-400 mb-1">--%</div>
                    <p className="text-sm text-slate-400">Aguardando avaliação</p>
                  </div>

                  <div className="bg-slate-800 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-lg font-semibold text-white">Qualidade de Vida</h4>
                      <Star className="w-5 h-5 text-slate-400" />
                    </div>
                    <div className="text-3xl font-bold text-slate-400 mb-1">--/100</div>
                    <p className="text-sm text-slate-400">Aguardando dados</p>
                  </div>
                </div>

                {/* Próximas Consultas */}
                <div className="bg-slate-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Próximas Consultas</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold">RV</span>
                        </div>
                        <div>
                          <p className="font-semibold text-white">Dr. Ricardo Valença</p>
                          <p className="text-sm text-slate-400">Cannabis Medicinal & Nefrologia</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-slate-400">14/12/2024</p>
                        <p className="text-sm text-slate-400">10:00</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold">EF</span>
                        </div>
                        <div>
                          <p className="font-semibold text-white">Dr. Eduardo Faveret</p>
                          <p className="text-sm text-slate-400">Cannabis Medicinal & AEC</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-slate-400">19/12/2024</p>
                        <p className="text-sm text-slate-400">14:30</p>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleViewAgenda()}
                    className="w-full mt-4 text-center text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    Ver agenda completa
                  </button>
                </div>

                {/* Últimos Relatórios */}
                <div className="bg-slate-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Últimos Relatórios</h3>
                  <p className="text-slate-400">Nenhum relatório disponível</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default PatientDashboard
