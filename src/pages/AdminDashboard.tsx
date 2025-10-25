import React from 'react'
import { useLocation } from 'react-router-dom'
import { 
  Users, ChevronRight,
  BookOpen
} from 'lucide-react'

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
  const location = useLocation()

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

  // Determine which content to show based on current route
  const getCurrentPageContent = () => {
    const path = location.pathname

    if (path.includes('users')) {
      return (
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
      )
    }

    if (path.includes('courses')) {
      return (
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
      )
    }

    if (path.includes('financial')) {
      return (
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
      )
    }

    // Default dashboard view
    return (
      <div className="space-y-6">
        <div className="bg-slate-800 rounded-xl p-6">
          <h5 className="text-lg font-semibold text-white mb-4">🏥 MedCannLab 3.0 - Dashboard Administrativo</h5>
          <p className="text-slate-300 mb-4">
            Sistema Integrado - Cidade Amiga dos Rins & Cannabis Medicinal
          </p>
          <p className="text-slate-400 text-sm">
            Use o menu lateral para navegar entre as diferentes áreas do sistema.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="flex-1 p-6 overflow-y-auto">
        {getCurrentPageContent()}
      </div>
    </div>
  )
}

export default AdminDashboard
