import React, { useState } from 'react'
import { 
  User, Stethoscope, MessageCircle, FileText, Share2, 
  Heart, Brain, Users, ChevronRight, Download, Send,
  BookOpen, Award, Clock, Star, Play, CheckCircle,
  DollarSign, CreditCard, TrendingUp, PieChart, Wallet
} from 'lucide-react'
import NoaAnimatedAvatar from '../components/NoaAnimatedAvatar'
import { useNoa } from '../contexts/NoaContext'

interface Page {
  id: 'patient' | 'professional' | 'courses' | 'users' | 'financial'
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
  const [activePage, setActivePage] = useState<Page['id']>('patient')
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

  const pages: Page[] = [
    {
      id: 'patient',
      name: 'Paciente',
      description: 'Avaliação Clínica Inicial e Interação',
      icon: User,
      color: 'from-blue-600 to-cyan-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      id: 'professional',
      name: 'Profissional',
      description: 'Prontuário e Acompanhamento do Paciente',
      icon: Stethoscope,
      color: 'from-green-600 to-teal-500',
      bgColor: 'bg-green-500/10',
    },
    {
      id: 'courses',
      name: 'Cursos',
      description: 'MedCannLab - Cursos de Cannabis Medicinal',
      icon: BookOpen,
      color: 'from-purple-600 to-pink-500',
      bgColor: 'bg-purple-500/10',
    },
    {
      id: 'users',
      name: 'Usuários',
      description: 'Gestão de Usuários e Perfis',
      icon: Users,
      color: 'from-orange-600 to-red-500',
      bgColor: 'bg-orange-500/10',
    },
    {
      id: 'financial',
      name: 'Financeiro',
      description: 'Controle Financeiro e Pagamentos',
      icon: DollarSign,
      color: 'from-emerald-600 to-green-500',
      bgColor: 'bg-emerald-500/10',
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

  const currentPage = pages.find(page => page.id === activePage) || pages[0]

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
        {/* Sidebar - Page Selection */}
        <div className="w-80 bg-slate-800 border-r border-slate-700 flex flex-col">
          {/* Page Selection */}
          <div className="p-4 border-b border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">Páginas Principais</h3>
            <div className="space-y-2">
              {pages.map((page) => {
                const Icon = page.icon
                return (
                  <button
                    key={page.id}
                    onClick={() => setActivePage(page.id as any)}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all ${
                      activePage === page.id
                        ? `bg-gradient-to-r ${page.color} text-white shadow-lg`
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <div className="text-left flex-1">
                      <div className="font-semibold">{page.name}</div>
                      <div className="text-xs opacity-80">{page.description}</div>
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
                {activePage === 'patient' && 'IA Residente • Suporte ao Paciente'}
                {activePage === 'professional' && 'IA Residente • Suporte Clínico'}
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

        {/* Main Content - Patient or Professional Page */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Welcome Section */}
          <div className={`bg-gradient-to-r ${currentPage.color} p-6`}>
            <h2 className="text-2xl font-bold text-white mb-2">
              {currentPage.name}
            </h2>
            <p className="text-white/90 mb-4">
              {currentPage.description}
            </p>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 p-6 overflow-y-auto">
            {activePage === 'patient' && (
              <div className="space-y-6">
                {/* Patient Header */}
                <div className="bg-slate-800 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-lg">P</span>
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold text-white">Paciente - Cidade Amiga dos Rins</h4>
                        <p className="text-sm text-slate-400">Projeto Cannabis Medicinal - Dr. Eduardo Faveret</p>
                        <p className="text-xs text-slate-500">ID: #001 | Última atualização: Hoje</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-400">Avaliação Pendente</div>
                      <div className="text-sm text-slate-400">Status</div>
                    </div>
                  </div>
                </div>

                {/* Clinical Assessment Section */}
                <div className="bg-slate-800 rounded-xl p-6">
                  <h5 className="text-lg font-semibold text-white mb-4">📊 Avaliação Clínica Inicial</h5>
                  <div className="bg-slate-700 rounded-lg p-4 mb-4">
                    <h6 className="font-semibold text-white mb-2">Arte da Entrevista Clínica (AEC)</h6>
                    <p className="text-sm text-slate-300 mb-4">
                      Metodologia estruturada em 5 etapas para avaliação clínica inicial em Cannabis Medicinal
                    </p>
                    <button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 px-4 rounded-lg font-semibold hover:opacity-90 transition-opacity">
                      Iniciar Avaliação Clínica Inicial
                    </button>
                  </div>
                </div>

                {/* Report Generation */}
                <div className="bg-slate-800 rounded-xl p-6">
                  <h5 className="text-lg font-semibold text-white mb-4">📄 Geração do Relatório</h5>
                  <div className="bg-slate-700 rounded-lg p-4">
                    <p className="text-sm text-slate-300 mb-4">
                      Após a avaliação clínica, o relatório será gerado automaticamente e compartilhado com seu profissional.
                    </p>
                    <div className="flex space-x-2">
                      <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                        <FileText className="w-4 h-4" />
                        <span>Gerar Relatório</span>
                      </button>
                      <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        <Share2 className="w-4 h-4" />
                        <span>Compartilhar</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Chat with Professional */}
                <div className="bg-slate-800 rounded-xl p-6">
                  <h5 className="text-lg font-semibold text-white mb-4">💬 Chat com Profissional</h5>
                  <div className="space-y-3 mb-4">
                    {chatMessages.map((msg) => (
                      <div key={msg.id} className={`flex items-start space-x-3 ${
                        msg.sender === 'patient' ? 'justify-end' : 'justify-start'
                      }`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          msg.sender === 'patient' ? 'bg-blue-500' : 'bg-green-500'
                        }`}>
                          <span className="text-white text-xs font-bold">
                            {msg.sender === 'patient' ? 'P' : 'M'}
                          </span>
                        </div>
                        <div className={`max-w-xs ${
                          msg.sender === 'patient' ? 'bg-blue-600' : 'bg-slate-600'
                        } rounded-lg p-3`}>
                          <p className="text-sm text-white">{msg.message}</p>
                          <p className="text-xs text-slate-400 mt-1">{msg.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Digite sua mensagem..."
                      className="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                    />
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activePage === 'professional' && (
              <div className="space-y-6">
                {/* Professional Header */}
                <div className="bg-slate-800 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-lg">M</span>
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold text-white">Dr. Eduardo Faveret</h4>
                        <p className="text-sm text-slate-400">Profissional - Cidade Amiga dos Rins</p>
                        <p className="text-xs text-slate-500">Pós-Graduação Cannabis Medicinal</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-400">1</div>
                      <div className="text-sm text-slate-400">Paciente Ativo</div>
                    </div>
                  </div>
                </div>

                {/* Patient Medical Record */}
                <div className="bg-slate-800 rounded-xl p-6">
                  <h5 className="text-lg font-semibold text-white mb-4">📋 Prontuário do Paciente</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-slate-700 rounded-lg p-4">
                      <h6 className="font-semibold text-white mb-2">Dados do Paciente</h6>
                      <ul className="text-sm text-slate-300 space-y-1">
                        <li>• Projeto: Cidade Amiga dos Rins</li>
                        <li>• Condição: Insuficiência Renal Crônica</li>
                        <li>• Tratamento: Cannabis Medicinal</li>
                        <li>• Acompanhamento: Dr. Eduardo Faveret</li>
                      </ul>
                    </div>
                    <div className="bg-slate-700 rounded-lg p-4">
                      <h6 className="font-semibold text-white mb-2">Status do Tratamento</h6>
                      <ul className="text-sm text-slate-300 space-y-1">
                        <li>• Avaliação: Pendente</li>
                        <li>• Relatório: Não gerado</li>
                        <li>• Próxima consulta: A definir</li>
                        <li>• Adesão: Monitorando</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Chat with Patient */}
                <div className="bg-slate-800 rounded-xl p-6">
                  <h5 className="text-lg font-semibold text-white mb-4">💬 Chat com Paciente</h5>
                  <div className="space-y-3 mb-4">
                    {chatMessages.map((msg) => (
                      <div key={msg.id} className={`flex items-start space-x-3 ${
                        msg.sender === 'professional' ? 'justify-end' : 'justify-start'
                      }`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          msg.sender === 'professional' ? 'bg-green-500' : 'bg-blue-500'
                        }`}>
                          <span className="text-white text-xs font-bold">
                            {msg.sender === 'professional' ? 'M' : 'P'}
                          </span>
                        </div>
                        <div className={`max-w-xs ${
                          msg.sender === 'professional' ? 'bg-green-600' : 'bg-slate-600'
                        } rounded-lg p-3`}>
                          <p className="text-sm text-white">{msg.message}</p>
                          <p className="text-xs text-slate-400 mt-1">{msg.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Digite sua mensagem..."
                      className="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-green-500"
                    />
                    <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Document Sharing */}
                <div className="bg-slate-800 rounded-xl p-6">
                  <h5 className="text-lg font-semibold text-white mb-4">📄 Compartilhamento de Documentos</h5>
                  <div className="bg-slate-700 rounded-lg p-4">
                    <p className="text-sm text-slate-300 mb-4">
                      Compartilhe relatórios, exames e documentos com o paciente de forma segura.
                    </p>
                    <div className="flex space-x-2">
                      <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        <FileText className="w-4 h-4" />
                        <span>Enviar Documento</span>
                      </button>
                      <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                        <Download className="w-4 h-4" />
                        <span>Baixar Relatório</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activePage === 'courses' && (
              <div className="space-y-6">
                {/* Courses Header */}
                <div className="bg-slate-800 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <BookOpen className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold text-white">MedCannLab - Cursos</h4>
                        <p className="text-sm text-slate-400">Cursos de Cannabis Medicinal</p>
                        <p className="text-xs text-slate-500">Dr. Eduardo Faveret - Pós-Graduação</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-purple-400">5</div>
                      <div className="text-sm text-slate-400">Cursos Disponíveis</div>
                    </div>
                  </div>
                </div>

                {/* Courses Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.map((course) => (
                    <div key={course.id} className="bg-slate-800 rounded-xl p-6 hover:bg-slate-700 transition-colors">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h5 className="text-lg font-semibold text-white mb-2">{course.title}</h5>
                          <p className="text-sm text-slate-400 mb-3">{course.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-slate-500 mb-4">
                            <span className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{course.duration}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Users className="w-4 h-4" />
                              <span>{course.students}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-400" />
                              <span>{course.rating}</span>
                            </span>
                          </div>
                        </div>
                        {course.isCompleted && (
                          <CheckCircle className="w-6 h-6 text-green-400" />
                        )}
                      </div>

                      {/* Progress Bar */}
                      {course.progress !== undefined && course.progress > 0 && (
                        <div className="mb-4">
                          <div className="flex justify-between text-sm text-slate-400 mb-1">
                            <span>Progresso</span>
                            <span>{course.progress}%</span>
                          </div>
                          <div className="w-full bg-slate-600 rounded-full h-2">
                            <div 
                              className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" 
                              style={{ width: `${course.progress}%` }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Badges */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {course.badges.map((badge, index) => (
                          <span key={index} className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full">
                            {badge}
                          </span>
                        ))}
                      </div>

                      {/* Price and Action */}
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-lg font-bold text-white">{course.price}</div>
                          {course.originalPrice && (
                            <div className="text-sm text-slate-400 line-through">{course.originalPrice}</div>
                          )}
                        </div>
                        <button className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
                          course.isCompleted 
                            ? 'bg-green-600 text-white hover:bg-green-700' 
                            : 'bg-purple-600 text-white hover:bg-purple-700'
                        }`}>
                          {course.isCompleted ? (
                            <>
                              <CheckCircle className="w-4 h-4" />
                              <span>Concluído</span>
                            </>
                          ) : (
                            <>
                              <Play className="w-4 h-4" />
                              <span>Iniciar</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Course Categories */}
                <div className="bg-slate-800 rounded-xl p-6">
                  <h5 className="text-lg font-semibold text-white mb-4">📚 Categorias de Cursos</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-slate-700 rounded-lg p-4">
                      <h6 className="font-semibold text-white mb-2">Especialização</h6>
                      <p className="text-sm text-slate-400 mb-2">Pós-Graduação Cannabis Medicinal</p>
                      <div className="text-xs text-slate-500">520h • Avançado</div>
                    </div>
                    <div className="bg-slate-700 rounded-lg p-4">
                      <h6 className="font-semibold text-white mb-2">Metodologia</h6>
                      <p className="text-sm text-slate-400 mb-2">Arte da Entrevista Clínica (AEC)</p>
                      <div className="text-xs text-slate-500">40h • Intermediário</div>
                    </div>
                    <div className="bg-slate-700 rounded-lg p-4">
                      <h6 className="font-semibold text-white mb-2">Avaliação</h6>
                      <p className="text-sm text-slate-400 mb-2">Sistema IMRE Triaxial</p>
                      <div className="text-xs text-slate-500">20h • Iniciante</div>
                    </div>
                    <div className="bg-slate-700 rounded-lg p-4">
                      <h6 className="font-semibold text-white mb-2">Farmacologia</h6>
                      <p className="text-sm text-slate-400 mb-2">Neurofarmacologia da Cannabis</p>
                      <div className="text-xs text-slate-500">30h • Avançado</div>
                    </div>
                    <div className="bg-slate-700 rounded-lg p-4">
                      <h6 className="font-semibold text-white mb-2">Direito</h6>
                      <p className="text-sm text-slate-400 mb-2">LGPD na Medicina</p>
                      <div className="text-xs text-slate-500">15h • Iniciante</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activePage === 'users' && (
              <div className="space-y-6">
                {/* Users Header */}
                <div className="bg-slate-800 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                        <Users className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold text-white">Gestão de Usuários</h4>
                        <p className="text-sm text-slate-400">MedCannLab - Usuários e Perfis</p>
                        <p className="text-xs text-slate-500">Dr. Eduardo Faveret - Administração</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-orange-400">4</div>
                      <div className="text-sm text-slate-400">Usuários Ativos</div>
                    </div>
                  </div>
                </div>

                {/* Users Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-slate-800 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-orange-500/10 rounded-lg">
                        <Users className="w-6 h-6 text-orange-400" />
                      </div>
                      <TrendingUp className="w-5 h-5 text-green-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1">4</h3>
                    <p className="text-sm text-slate-400">Total de Usuários</p>
                    <p className="text-xs text-green-400 mt-1">+1 este mês</p>
                  </div>
                  <div className="bg-slate-800 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-green-500/10 rounded-lg">
                        <Stethoscope className="w-6 h-6 text-green-400" />
                      </div>
                      <TrendingUp className="w-5 h-5 text-green-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1">2</h3>
                    <p className="text-sm text-slate-400">Profissionais</p>
                    <p className="text-xs text-green-400 mt-1">Ativos</p>
                  </div>
                  <div className="bg-slate-800 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-blue-500/10 rounded-lg">
                        <User className="w-6 h-6 text-blue-400" />
                      </div>
                      <TrendingUp className="w-5 h-5 text-green-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1">1</h3>
                    <p className="text-sm text-slate-400">Pacientes</p>
                    <p className="text-xs text-green-400 mt-1">Ativos</p>
                  </div>
                  <div className="bg-slate-800 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-purple-500/10 rounded-lg">
                        <BookOpen className="w-6 h-6 text-purple-400" />
                      </div>
                      <TrendingUp className="w-5 h-5 text-green-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1">1</h3>
                    <p className="text-sm text-slate-400">Estudantes</p>
                    <p className="text-xs text-green-400 mt-1">Ativos</p>
                  </div>
                </div>

                {/* Users List */}
                <div className="bg-slate-800 rounded-xl p-6">
                  <h5 className="text-lg font-semibold text-white mb-4">👥 Lista de Usuários</h5>
                  <div className="space-y-4">
                    {users.map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-sm">{user.avatar}</span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-white">{user.name}</h4>
                            <p className="text-sm text-slate-400">{user.email}</p>
                            <div className="flex items-center space-x-4 text-xs text-slate-500 mt-1">
                              <span className={`px-2 py-1 rounded-full ${
                                user.type === 'professional' ? 'bg-green-500/20 text-green-300' :
                                user.type === 'patient' ? 'bg-blue-500/20 text-blue-300' :
                                'bg-purple-500/20 text-purple-300'
                              }`}>
                                {user.type === 'professional' ? 'Profissional' :
                                 user.type === 'patient' ? 'Paciente' : 'Estudante'}
                              </span>
                              <span>Último login: {user.lastLogin}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <div className="text-sm text-slate-400">
                              {user.courses > 0 && `${user.courses} cursos`}
                              {user.patients > 0 && ` • ${user.patients} pacientes`}
                            </div>
                            <div className={`text-xs ${
                              user.status === 'active' ? 'text-green-400' : 'text-red-400'
                            }`}>
                              {user.status === 'active' ? 'Ativo' : 'Inativo'}
                            </div>
                          </div>
                          <button className="p-2 bg-slate-600 rounded-lg hover:bg-slate-500 transition-colors">
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activePage === 'financial' && (
              <div className="space-y-6">
                {/* Financial Header */}
                <div className="bg-slate-800 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center">
                        <DollarSign className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold text-white">Controle Financeiro</h4>
                        <p className="text-sm text-slate-400">MedCannLab - Receitas e Pagamentos</p>
                        <p className="text-xs text-slate-500">Dr. Eduardo Faveret - Administração</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-emerald-400">R$ 125.000</div>
                      <div className="text-sm text-slate-400">Receita Total</div>
                    </div>
                  </div>
                </div>

                {/* Financial Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-slate-800 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-emerald-500/10 rounded-lg">
                        <DollarSign className="w-6 h-6 text-emerald-400" />
                      </div>
                      <TrendingUp className="w-5 h-5 text-green-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1">R$ 25.000</h3>
                    <p className="text-sm text-slate-400">Receita Mensal</p>
                    <p className="text-xs text-green-400 mt-1">+15% este mês</p>
                  </div>
                  <div className="bg-slate-800 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-blue-500/10 rounded-lg">
                        <CreditCard className="w-6 h-6 text-blue-400" />
                      </div>
                      <TrendingUp className="w-5 h-5 text-green-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1">156</h3>
                    <p className="text-sm text-slate-400">Assinaturas Ativas</p>
                    <p className="text-xs text-green-400 mt-1">+8 este mês</p>
                  </div>
                  <div className="bg-slate-800 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-yellow-500/10 rounded-lg">
                        <Clock className="w-6 h-6 text-yellow-400" />
                      </div>
                      <TrendingUp className="w-5 h-5 text-green-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1">12</h3>
                    <p className="text-sm text-slate-400">Pagamentos Pendentes</p>
                    <p className="text-xs text-yellow-400 mt-1">R$ 2.400</p>
                  </div>
                  <div className="bg-slate-800 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-purple-500/10 rounded-lg">
                        <PieChart className="w-6 h-6 text-purple-400" />
                      </div>
                      <TrendingUp className="w-5 h-5 text-green-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1">85%</h3>
                    <p className="text-sm text-slate-400">Taxa de Conversão</p>
                    <p className="text-xs text-green-400 mt-1">+5% este mês</p>
                  </div>
                </div>

                {/* Recent Transactions */}
                <div className="bg-slate-800 rounded-xl p-6">
                  <h5 className="text-lg font-semibold text-white mb-4">💰 Transações Recentes</h5>
                  <div className="space-y-4">
                    {financialData.transactions.map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            transaction.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'
                          }`}>
                            <CreditCard className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-white">{transaction.user}</h4>
                            <p className="text-sm text-slate-400">
                              {transaction.type === 'course' ? 'Curso' : 'Assinatura'} • {transaction.date}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-white">R$ {transaction.amount.toLocaleString()}</div>
                          <div className={`text-xs ${
                            transaction.status === 'completed' ? 'text-green-400' : 'text-yellow-400'
                          }`}>
                            {transaction.status === 'completed' ? 'Concluído' : 'Pendente'}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Financial Charts Placeholder */}
                <div className="bg-slate-800 rounded-xl p-6">
                  <h5 className="text-lg font-semibold text-white mb-4">📊 Análise Financeira</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-slate-700 rounded-lg p-4">
                      <h6 className="font-semibold text-white mb-2">Receita por Categoria</h6>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">Cursos</span>
                          <span className="text-white">R$ 18.000</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">Assinaturas</span>
                          <span className="text-white">R$ 5.000</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">Consultorias</span>
                          <span className="text-white">R$ 2.000</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-slate-700 rounded-lg p-4">
                      <h6 className="font-semibold text-white mb-2">Crescimento Mensal</h6>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">Janeiro 2025</span>
                          <span className="text-green-400">+15%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">Dezembro 2024</span>
                          <span className="text-green-400">+8%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">Novembro 2024</span>
                          <span className="text-green-400">+12%</span>
                        </div>
                      </div>
                    </div>
                  </div>
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