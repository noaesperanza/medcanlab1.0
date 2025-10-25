import React, { useState } from 'react'
import { 
  ArrowLeft, 
  GraduationCap, 
  BookOpen, 
  Heart, 
  Brain, 
  MessageCircle, 
  Calendar,
  TrendingUp,
  Clock,
  User,
  Star,
  CheckCircle,
  AlertCircle,
  Play,
  Download,
  Share2,
  Target,
  Award,
  BarChart3,
  Activity
} from 'lucide-react'
import { useNoa } from '../contexts/NoaContext'
import NoaAnimatedAvatar from '../components/NoaAnimatedAvatar'

const StudentDashboard: React.FC = () => {
  const { isOpen, toggleChat, messages, isTyping, isListening, isSpeaking, sendMessage } = useNoa()
  const [inputMessage, setInputMessage] = useState('')

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

  const courses = [
    {
      id: 1,
      title: 'Arte da Entrevista Clínica',
      description: 'Fundamentos da entrevista clínica aplicada à Cannabis Medicinal',
      progress: 75,
      status: 'Em Andamento',
      instructor: 'Dr. Eduardo Faveret',
      duration: '40 horas',
      nextClass: '2024-12-15',
      color: 'from-pink-500 to-purple-500'
    },
    {
      id: 2,
      title: 'Cannabis Medicinal - Pós-Graduação',
      description: 'Especialização em Cannabis Medicinal e Terapêutica',
      progress: 45,
      status: 'Em Andamento',
      instructor: 'Dr. Eduardo Faveret',
      duration: '360 horas',
      nextClass: '2024-12-18',
      color: 'from-green-500 to-teal-500'
    },
    {
      id: 3,
      title: 'Sistema IMRE Triaxial',
      description: 'Metodologia de avaliação clínica integrada',
      progress: 100,
      status: 'Concluído',
      instructor: 'Dr. Profissional',
      duration: '20 horas',
      nextClass: null,
      color: 'from-blue-500 to-cyan-500'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Em Andamento': return 'text-blue-400'
      case 'Concluído': return 'text-green-400'
      case 'Pendente': return 'text-yellow-400'
      default: return 'text-slate-400'
    }
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500'
    if (progress >= 50) return 'bg-blue-500'
    return 'bg-yellow-500'
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
              <h1 className="text-2xl font-bold text-white">Dashboard Acadêmico</h1>
              <p className="text-slate-400">Área de Ensino - Pós-Graduação Cannabis Medicinal</p>
            </div>
          </div>
          
          {/* Student Profile */}
          <div className="flex items-center space-x-3 bg-slate-700 p-3 rounded-lg">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-semibold text-white">Aluno</p>
              <p className="text-sm text-slate-400">Pós-Graduação</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-slate-800 border-r border-slate-700 min-h-screen">
          <div className="p-6">
            <nav className="space-y-2">
              <a href="#" className="flex items-center space-x-3 p-3 rounded-lg bg-slate-700 text-white">
                <BarChart3 className="w-5 h-5" />
                <span>Dashboard</span>
              </a>
              <a href="#" className="flex items-center space-x-3 p-3 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-colors">
                <BookOpen className="w-5 h-5" />
                <span>Cursos</span>
              </a>
              <a href="#" className="flex items-center space-x-3 p-3 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-colors">
                <Heart className="w-5 h-5" />
                <span>Arte da Entrevista</span>
              </a>
              <a href="#" className="flex items-center space-x-3 p-3 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-colors">
                <Brain className="w-5 h-5" />
                <span>Cannabis Medicinal</span>
              </a>
              <a href="#" className="flex items-center space-x-3 p-3 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-colors">
                <Calendar className="w-5 h-5" />
                <span>Agenda</span>
              </a>
              <a href="#" className="flex items-center space-x-3 p-3 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-colors">
                <Award className="w-5 h-5" />
                <span>Certificados</span>
              </a>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-green-600 to-teal-500 rounded-xl p-6 mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Bem-vindo à Pós-Graduação!</h2>
              <p className="text-white/90 mb-4">
                Continue sua jornada de aprendizado em Cannabis Medicinal com a Arte da Entrevista Clínica.
                Acesse seus cursos, acompanhe seu progresso e interaja com a Nôa Esperança.
              </p>
              <button className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Continuar Aprendizado
              </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-slate-800 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-green-500/10 rounded-lg">
                    <BookOpen className="w-6 h-6 text-green-400" />
                  </div>
                  <TrendingUp className="w-5 h-5 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">3</h3>
                <p className="text-sm text-slate-400">Cursos Ativos</p>
              </div>

              <div className="bg-slate-800 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-blue-500/10 rounded-lg">
                    <Target className="w-6 h-6 text-blue-400" />
                  </div>
                  <TrendingUp className="w-5 h-5 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">73%</h3>
                <p className="text-sm text-slate-400">Progresso Médio</p>
              </div>

              <div className="bg-slate-800 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-yellow-500/10 rounded-lg">
                    <Clock className="w-6 h-6 text-yellow-400" />
                  </div>
                  <TrendingUp className="w-5 h-5 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">120h</h3>
                <p className="text-sm text-slate-400">Horas Estudadas</p>
              </div>

              <div className="bg-slate-800 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-purple-500/10 rounded-lg">
                    <Award className="w-6 h-6 text-purple-400" />
                  </div>
                  <TrendingUp className="w-5 h-5 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">1</h3>
                <p className="text-sm text-slate-400">Certificados</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Courses Section */}
              <div className="lg:col-span-2">
                <div className="bg-slate-800 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-white">Meus Cursos</h3>
                    <button className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-4 py-2 rounded-lg font-semibold hover:from-green-600 hover:to-teal-600 transition-colors">
                      Ver Todos
                    </button>
                  </div>

                  <div className="space-y-6">
                    {courses.map((course) => (
                      <div key={course.id} className="bg-slate-700 rounded-lg p-6 hover:bg-slate-650 transition-colors">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h4 className="text-lg font-semibold text-white">{course.title}</h4>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(course.status)}`}>
                                {course.status}
                              </span>
                            </div>
                            <p className="text-sm text-slate-400 mb-3">{course.description}</p>
                            
                            <div className="flex items-center space-x-4 text-sm text-slate-500 mb-4">
                              <span>Instrutor: {course.instructor}</span>
                              <span>Duração: {course.duration}</span>
                              {course.nextClass && <span>Próxima aula: {course.nextClass}</span>}
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <button className="p-2 bg-slate-600 rounded-lg hover:bg-slate-500 transition-colors">
                              <Play className="w-4 h-4" />
                            </button>
                            <button className="p-2 bg-slate-600 rounded-lg hover:bg-slate-500 transition-colors">
                              <Download className="w-4 h-4" />
                            </button>
                            <button className="p-2 bg-slate-600 rounded-lg hover:bg-slate-500 transition-colors">
                              <Share2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="mb-2">
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="text-slate-400">Progresso</span>
                            <span className="text-white font-medium">{course.progress}%</span>
                          </div>
                          <div className="w-full bg-slate-600 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${getProgressColor(course.progress)}`}
                              style={{ width: `${course.progress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Upcoming Classes */}
                <div className="bg-slate-800 rounded-xl p-6 mt-6">
                  <h3 className="text-xl font-semibold text-white mb-6">Próximas Aulas</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center">
                          <Heart className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-white">Arte da Entrevista Clínica</p>
                          <p className="text-sm text-slate-400">15/12/2024 • 14:00</p>
                        </div>
                      </div>
                      <button className="p-2 bg-slate-600 rounded-lg hover:bg-slate-500 transition-colors">
                        <Play className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                          <Brain className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-white">Cannabis Medicinal</p>
                          <p className="text-sm text-slate-400">18/12/2024 • 10:00</p>
                        </div>
                      </div>
                      <button className="p-2 bg-slate-600 rounded-lg hover:bg-slate-500 transition-colors">
                        <Play className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chat Section */}
              <div className="lg:col-span-1">
                <div className="bg-slate-800 rounded-xl p-6 h-full">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-semibold text-white mb-2">Nôa Esperança</h3>
                    <p className="text-sm text-slate-400">IA Residente • Tutora Acadêmica</p>
                  </div>

                  {/* Avatar */}
                  <div className="flex justify-center mb-6">
                    <NoaAnimatedAvatar
                      isSpeaking={isSpeaking}
                      isListening={isListening}
                      size="md"
                      showStatus={true}
                    />
                  </div>

                  {/* Welcome Message */}
                  <div className="bg-slate-700 rounded-lg p-4 mb-4">
                    <p className="text-sm text-slate-300 mb-2">
                      🎓 Olá, estudante! Sou a Nôa Esperança, sua tutora acadêmica especializada.
                    </p>
                    <p className="text-xs text-slate-400 mb-2">Posso ajudar com:</p>
                    <ul className="text-xs text-slate-400 space-y-1">
                      <li>• Dúvidas sobre Cannabis Medicinal</li>
                      <li>• Prática da Arte da Entrevista</li>
                      <li>• Orientação nos estudos</li>
                    </ul>
                  </div>

                  {/* Quick Actions */}
                  <div className="space-y-3 mb-6">
                    <button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 px-4 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-600 transition-colors">
                      Arte da Entrevista Clínica
                    </button>
                    <button className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 px-4 rounded-lg font-semibold hover:from-green-600 hover:to-teal-600 transition-colors">
                      Cannabis Medicinal
                    </button>
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
                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-green-500"
                      />
                    </div>
                    
                    <p className="text-xs text-slate-500 text-center">
                      Nôa utiliza AEC para tutoria acadêmica • LGPD Compliant
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
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center">
                    <GraduationCap className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Nôa Esperança</h3>
                    <p className="text-xs text-slate-400">Tutora Acadêmica</p>
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
                  <GraduationCap className="w-12 h-12 mx-auto mb-3 text-green-400" />
                  <p className="text-sm">Olá! Sou a Nôa Esperança, sua tutora acadêmica.</p>
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
                          ? 'bg-gradient-to-r from-green-500 to-teal-500 text-white'
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
                  className="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-green-500"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className="p-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg hover:from-green-600 hover:to-teal-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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

export default StudentDashboard
