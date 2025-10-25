import React, { useState } from 'react'
import { 
  User, Stethoscope, MessageCircle, FileText, Share2, 
  Brain, Users, ChevronRight, Download, Send,
  BookOpen, Clock, Star, Play, CheckCircle,
  TrendingUp, PieChart, DollarSign,
  Home, Upload, BarChart3, Activity, Settings,
  Book
} from 'lucide-react'
import NoaAnimatedAvatar from '../components/NoaAnimatedAvatar'
import { useNoa } from '../contexts/NoaContext'

interface FunctionButton {
  id: string
  name: string
  description: string
  icon: React.ElementType
  color: string
  bgColor: string
}

interface Page {
  id: string
  name: string
  description: string
  icon: React.ElementType
  color: string
  bgColor: string
}

interface Course {
  id: string
  title: string
  description: string
  instructor: string
  duration: string
  level: string
  price: string
  originalPrice?: string
  rating: number
  students: number
  progress?: number
  isCompleted?: boolean
  badges: string[]
  category: string
}

const AdminDashboard: React.FC = () => {
  const [activeFunction, setActiveFunction] = useState<string>('users')
  const { messages, sendMessage, isTyping, isListening, isSpeaking } = useNoa()
  const [inputMessage, setInputMessage] = useState('')
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: 'patient',
      message: 'Olá Dr. Eduardo, estou sentindo uma melhora significativa na dor após iniciar o tratamento com CBD.',
      timestamp: '2 horas atrás'
    },
    {
      id: 2,
      sender: 'professional',
      message: 'Excelente! Continue com a dosagem atual. Vamos agendar uma reavaliação em 2 semanas.',
      timestamp: '1 hora atrás'
    }
  ])

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage = {
        id: chatMessages.length + 1,
        sender: 'patient' as const,
        message: inputMessage.trim(),
        timestamp: 'Agora'
      }
      setChatMessages([...chatMessages, newMessage])
      setInputMessage('')
    }
  }

  const functions: FunctionButton[] = [
    {
      id: 'users',
      name: '👥 Usuários',
      description: 'Gestão de Usuários',
      icon: Users,
      color: 'from-blue-600 to-cyan-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      id: 'courses',
      name: '🎓 Cursos',
      description: 'Cursos de Cannabis Medicinal',
      icon: BookOpen,
      color: 'from-green-600 to-teal-500',
      bgColor: 'bg-green-500/10',
    },
    {
      id: 'financial',
      name: '💰 Financeiro',
      description: 'Controle Financeiro',
      icon: DollarSign,
      color: 'from-emerald-600 to-green-500',
      bgColor: 'bg-emerald-500/10',
    },
    {
      id: 'chat',
      name: '💬 Chat Global + Moderação',
      description: 'Chat e Moderação',
      icon: MessageCircle,
      color: 'from-cyan-600 to-blue-500',
      bgColor: 'bg-cyan-500/10',
    },
    {
      id: 'forum',
      name: '🏛️ Moderação Fórum',
      description: 'Gestão do Fórum',
      icon: MessageCircle,
      color: 'from-orange-600 to-red-500',
      bgColor: 'bg-orange-500/10',
    },
    {
      id: 'gamification',
      name: '🏆 Ranking & Gamificação',
      description: 'Sistema de Pontos',
      icon: Star,
      color: 'from-yellow-600 to-orange-500',
      bgColor: 'bg-yellow-500/10',
    },
    {
      id: 'upload',
      name: '📁 Upload',
      description: 'Upload de Documentos',
      icon: Upload,
      color: 'from-indigo-600 to-purple-500',
      bgColor: 'bg-indigo-500/10',
    },
    {
      id: 'analytics',
      name: '📊 Analytics',
      description: 'Análise de Dados',
      icon: BarChart3,
      color: 'from-pink-600 to-rose-500',
      bgColor: 'bg-pink-500/10',
    },
    {
      id: 'renal',
      name: '🫀 Função Renal',
      description: 'Monitoramento Renal',
      icon: Activity,
      color: 'from-red-600 to-pink-500',
      bgColor: 'bg-red-500/10',
    },
    {
      id: 'settings',
      name: '⚙️ Sistema',
      description: 'Configurações',
      icon: Settings,
      color: 'from-slate-600 to-gray-500',
      bgColor: 'bg-slate-500/10',
    },
    {
      id: 'library',
      name: '📚 Biblioteca',
      description: 'Biblioteca Médica',
      icon: Book,
      color: 'from-teal-600 to-cyan-500',
      bgColor: 'bg-teal-500/10',
    },
    {
      id: 'ai-chat',
      name: '🤖 Chat IA Documentos',
      description: 'IA para Documentos',
      icon: Brain,
      color: 'from-violet-600 to-purple-500',
      bgColor: 'bg-violet-500/10',
    },
  ]

  const courses: Course[] = [
    {
      id: '1',
      title: 'Pós-Graduação Cannabis Medicinal',
      description: 'Especialização completa de 520 horas em cannabis medicinal e terapêutica com Dr. Eduardo Faveret',
      instructor: 'Dr. Eduardo Faveret',
      duration: '520h',
      level: 'Avançado',
      price: 'R$ 2.999',
      originalPrice: 'R$ 3.999',
      rating: 4.8,
      students: 856,
      progress: 75,
      isCompleted: false,
      badges: ['Cannabis', 'Pós-Graduação', 'Certificação'],
      category: 'Especialização'
    },
    {
      id: '2',
      title: 'Arte da Entrevista Clínica (AEC)',
      description: 'Metodologia AEC completa para entrevistas clínicas humanizadas em Cannabis Medicinal',
      instructor: 'Dr. Eduardo Faveret',
      duration: '40h',
      level: 'Intermediário',
      price: 'R$ 299',
      originalPrice: 'R$ 399',
      rating: 4.9,
      students: 1247,
      progress: 100,
      isCompleted: true,
      badges: ['AEC', 'Entrevista', 'Humanização'],
      category: 'Metodologia'
    },
    {
      id: '3',
      title: 'Sistema IMRE Triaxial',
      description: 'Avaliação clínica com 28 blocos semânticos para Cannabis Medicinal',
      instructor: 'Dr. Eduardo Faveret',
      duration: '20h',
      level: 'Iniciante',
      price: 'R$ 199',
      originalPrice: 'R$ 299',
      rating: 4.7,
      students: 634,
      progress: 80,
      isCompleted: false,
      badges: ['IMRE', 'Avaliação', 'Clínica'],
      category: 'Avaliação'
    },
    {
      id: '4',
      title: 'Neurofarmacologia da Cannabis',
      description: 'Fundamentos neurofarmacológicos dos canabinoides e sistema endocanabinoide',
      instructor: 'Dr. Eduardo Faveret',
      duration: '30h',
      level: 'Avançado',
      price: 'R$ 399',
      originalPrice: 'R$ 499',
      rating: 4.6,
      students: 423,
      progress: 40,
      isCompleted: false,
      badges: ['Neurofarmacologia', 'Cannabis', 'Farmacologia'],
      category: 'Farmacologia'
    },
    {
      id: '5',
      title: 'LGPD na Medicina',
      description: 'Privacidade e proteção de dados na prática médica com Cannabis',
      instructor: 'Dr. Eduardo Faveret',
      duration: '15h',
      level: 'Iniciante',
      price: 'R$ 149',
      originalPrice: 'R$ 199',
      rating: 4.5,
      students: 312,
      progress: 0,
      isCompleted: false,
      badges: ['LGPD', 'Privacidade', 'Direito'],
      category: 'Direito'
    }
  ]

  const users = [
    {
      id: '1',
      name: 'Dr. Eduardo Faveret',
      email: 'eduardo.faveret@medcannlab.com',
      type: 'professional',
      status: 'active',
      lastLogin: 'Hoje',
      courses: 5,
      patients: 24,
      avatar: 'EF'
    },
    {
      id: '2',
      name: 'Dr. Ricardo Valença',
      email: 'ricardo.valenca@medcannlab.com',
      type: 'patient',
      status: 'active',
      lastLogin: '2 horas atrás',
      courses: 0,
      patients: 0,
      avatar: 'RV'
    },
    {
      id: '3',
      name: 'Dra. Maria Santos',
      email: 'maria.santos@medcannlab.com',
      type: 'professional',
      status: 'active',
      lastLogin: 'Ontem',
      courses: 3,
      patients: 18,
      avatar: 'MS'
    },
    {
      id: '4',
      name: 'João Silva',
      email: 'joao.silva@medcannlab.com',
      type: 'student',
      status: 'active',
      lastLogin: '3 dias atrás',
      courses: 2,
      patients: 0,
      avatar: 'JS'
    }
  ]

  const financialData = {
    totalRevenue: 125000,
    monthlyRevenue: 25000,
    activeSubscriptions: 156,
    pendingPayments: 12,
    transactions: [
      { id: 1, user: 'Dr. Eduardo Faveret', amount: 2999, type: 'course', status: 'completed', date: '2025-01-15' },
      { id: 2, user: 'Dra. Maria Santos', amount: 299, type: 'course', status: 'completed', date: '2025-01-14' },
      { id: 3, user: 'João Silva', amount: 199, type: 'course', status: 'pending', date: '2025-01-13' },
      { id: 4, user: 'Dr. Pedro Costa', amount: 399, type: 'course', status: 'completed', date: '2025-01-12' }
    ]
  }

  const currentFunction = functions.find(func => func.id === activeFunction) || functions[0]

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">🏥 MedCannLab 3.0</h1>
            <p className="text-slate-400">Sistema Integrado - Cidade Amiga dos Rins & Cannabis Medicinal</p>
          </div>
          
          {/* Admin Profile */}
          <div className="flex items-center space-x-3 bg-slate-700 p-3 rounded-lg">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-semibold text-white">👑 Administrador</p>
              <p className="text-sm text-slate-400">Dr. Eduardo Faveret</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-screen">
        {/* Sidebar - Functions */}
        <div className="w-80 bg-slate-800 border-r border-slate-700 flex flex-col">
          {/* Functions Selection */}
          <div className="p-4 border-b border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">Funções Principais</h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {functions.map((func) => {
                const Icon = func.icon
                return (
                  <button
                    key={func.id}
                    onClick={() => setActiveFunction(func.id)}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all ${
                      activeFunction === func.id
                        ? `bg-gradient-to-r ${func.color} text-white shadow-lg`
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white'
                    }`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <div className="text-left flex-1 min-w-0">
                      <div className="font-semibold text-sm">{func.name}</div>
                      <div className="text-xs opacity-80 truncate">{func.description}</div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Chat Nôa Esperança */}
          <div className="flex-1 p-4 border-t border-slate-700">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold text-white mb-2">Nôa Esperança</h3>
              <p className="text-sm text-slate-400">
                IA Residente • {currentFunction.name}
              </p>
            </div>

            {/* Avatar */}
            <div className="flex justify-center mb-4">
              <NoaAnimatedAvatar
                isSpeaking={isSpeaking}
                isListening={isListening}
                size="md"
                showStatus={true}
              />
            </div>

            {/* Chat Input */}
            <div className="space-y-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Digite sua mensagem..."
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 text-sm"
              />
              <p className="text-xs text-slate-500 text-center">
                Nôa utiliza AEC • LGPD Compliant
              </p>
            </div>
          </div>
        </div>

        {/* Main Content - Dynamic Function Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Welcome Section */}
          <div className={`bg-gradient-to-r ${currentFunction.color} p-6`}>
            <h2 className="text-2xl font-bold text-white mb-2">
              {currentFunction.name}
            </h2>
            <p className="text-white/90 mb-4">
              {currentFunction.description}
            </p>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 p-6 overflow-y-auto">
            {/* Users Content */}
            {activeFunction === 'users' && (
              <div className="space-y-6">
                <div className="bg-slate-800 rounded-xl p-6">
                  <h5 className="text-lg font-semibold text-white mb-4">👥 Gestão de Usuários</h5>
                  <div className="space-y-4">
                    {users.map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-sm">{user.avatar}</span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-white">{user.name}</h4>
                            <p className="text-sm text-slate-400">{user.email}</p>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-400" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Courses Content */}
            {activeFunction === 'courses' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.map((course) => (
                    <div key={course.id} className="bg-slate-800 rounded-xl p-6">
                      <h5 className="text-lg font-semibold text-white mb-2">{course.title}</h5>
                      <p className="text-sm text-slate-400 mb-4">{course.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-white font-bold">{course.price}</span>
                        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm">
                          Ver Curso
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Financial Content */}
            {activeFunction === 'financial' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-slate-800 rounded-xl p-6">
                    <h3 className="text-2xl font-bold text-white mb-1">R$ 125k</h3>
                    <p className="text-sm text-slate-400">Receita Total</p>
                  </div>
                  <div className="bg-slate-800 rounded-xl p-6">
                    <h3 className="text-2xl font-bold text-white mb-1">R$ 25k</h3>
                    <p className="text-sm text-slate-400">Receita Mensal</p>
                  </div>
                  <div className="bg-slate-800 rounded-xl p-6">
                    <h3 className="text-2xl font-bold text-white mb-1">156</h3>
                    <p className="text-sm text-slate-400">Assinaturas</p>
                  </div>
                  <div className="bg-slate-800 rounded-xl p-6">
                    <h3 className="text-2xl font-bold text-white mb-1">85%</h3>
                    <p className="text-sm text-slate-400">Conversão</p>
                  </div>
                </div>
              </div>
            )}

            {/* Other Functions - Placeholder */}
            {!['users', 'courses', 'financial'].includes(activeFunction) && (
              <div className="space-y-6">
                <div className="bg-slate-800 rounded-xl p-6">
                  <h5 className="text-lg font-semibold text-white mb-4">{currentFunction.name}</h5>
                  <p className="text-slate-300">
                    Esta função está integrada ao sistema. Todos os botões funcionam e controlam a área central.
                  </p>
                  <p className="text-slate-400 text-sm mt-4">
                    {currentFunction.description}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
