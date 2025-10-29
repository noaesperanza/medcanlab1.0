import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  Home, 
  BookOpen, 
  Stethoscope, 
  Users, 
  BarChart3,
  User,
  FileText,
  Brain,
  Clock,
  Award,
  Menu,
  Heart,
  MessageCircle,
  Calendar,
  Settings,
  Activity,
  UserPlus
} from 'lucide-react'

// Use BanknoteIcon as an alias for financial operations
const BanknoteIcon = (props: any) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="6" width="20" height="12" rx="2"></rect>
    <circle cx="12" cy="12" r="2"></circle>
    <path d="M6 12h.01M18 12h.01"></path>
  </svg>
)

interface SidebarProps {
  userType?: 'patient' | 'professional' | 'student' | 'admin' | 'unconfirmed'
  isMobile?: boolean
  isOpen?: boolean
  onClose?: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ 
  userType = 'patient', 
  isMobile = false, 
  isOpen = false, 
  onClose 
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const location = useLocation()

  // Usar props do Layout quando disponíveis
  const mobileOpen = isMobile ? isOpen : isMobileOpen
  const setMobileOpen = isMobile ? onClose : setIsMobileOpen

  const getNavigationItems = () => {
    const adminItems = [
      { 
        name: '📅 Agendamentos', 
        href: '/app/professional-scheduling', 
        icon: Calendar,
        section: 'ehr'
      },
      { 
        name: '👥 Meus Pacientes', 
        href: '/app/patients', 
        icon: Users,
        section: 'ehr'
      },
      { 
        name: '🎓 Preparação de Aulas', 
        href: '/app/lesson-prep', 
        icon: BookOpen,
        section: 'ehr'
      },
      { 
        name: '💰 Gestão Financeira', 
        href: '/app/professional-financial', 
        icon: BanknoteIcon,
        section: 'ehr'
      },
      { 
        name: 'Atendimento', 
        href: '/app/professional-dashboard', 
        icon: MessageCircle,
        section: 'quick'
      },
      { 
        name: '📝 Nova Avaliação', 
        href: '/app/patient-onboarding', 
        icon: Stethoscope,
        section: 'quick'
      },
      { 
        name: '📚 Biblioteca', 
        href: '/app/library', 
        icon: BookOpen,
        section: 'quick'
      },
      { 
        name: '👤 Meu Perfil', 
        href: '/app/profile', 
        icon: User,
        section: 'profile'
      },
    ]

    const patientItems = [
      { name: 'Início', href: '/app/dashboard', icon: Home, section: 'main' },
      { name: '🤖 Chat NOA', href: '/app/patient-noa-chat', icon: Brain, section: 'quick' },
      { name: '📅 Agendamentos', href: '/app/patient-appointments', icon: Clock, section: 'quick' },
      { name: '💬 Chat com Meu Médico', href: '/app/patient-chat', icon: Users, section: 'quick' },
      { name: '👤 Meu Perfil', href: '/app/profile', icon: User, section: 'profile' },
    ]

    const professionalItems = [
      { 
        name: '📅 Agendamentos', 
        href: '/app/professional-scheduling', 
        icon: Calendar,
        section: 'quick'
      },
      { 
        name: 'Atendimento', 
        href: '/app/professional-dashboard', 
        icon: MessageCircle,
        section: 'quick'
      },
      { 
        name: '👥 Chat com Profissionais', 
        href: '/app/chat', 
        icon: Users,
        section: 'quick'
      },
      { 
        name: '📚 Biblioteca', 
        href: '/app/library', 
        icon: BookOpen,
        section: 'quick'
      },
      { 
        name: '👤 Meu Perfil', 
        href: '/app/profile', 
        icon: User,
        section: 'profile'
      },
      // Itens do EHR
      { 
        name: '👥 Meus Pacientes', 
        href: '/app/patients', 
        icon: Users,
        section: 'ehr'
      },
      { 
        name: '🎓 Preparação de Aulas', 
        href: '/app/lesson-prep', 
        icon: BookOpen,
        section: 'ehr'
      },
      { 
        name: '💰 Gestão Financeira', 
        href: '/app/professional-financial', 
        icon: BanknoteIcon,
        section: 'ehr'
      },
    ]

    const studentItems = [
      { name: 'Início', href: '/app/dashboard', icon: Home },
      { name: '🎓 Meus Cursos', href: '/app/courses', icon: BookOpen },
      { name: '🏆 Gamificação', href: '/app/gamificacao', icon: Users },
      { name: '📊 Meu Progresso', href: '/app/progress', icon: BarChart3 },
      { name: '👤 Meu Perfil', href: '/app/profile', icon: User },
    ]

    let specificItems = []
    switch (userType) {
      case 'patient':
        specificItems = patientItems
        break
      case 'professional':
        specificItems = professionalItems
        break
      case 'student':
        specificItems = studentItems
        break
      case 'admin':
        specificItems = adminItems
        break
      default:
        specificItems = patientItems
    }

    return specificItems
  }

  const quickActions = [
    { name: 'Arte da Entrevista', href: '/app/arte-entrevista-clinica', icon: Heart, color: 'bg-pink-500' },
    { name: 'Chat Nôa', href: '/app/chat', icon: Brain, color: 'bg-purple-500' },
    { name: 'Chat Nôa Esperança', href: '/app/chat-noa-esperanca', icon: MessageCircle, color: 'bg-purple-600' },
    { name: 'Dashboard Paciente', href: '/app/patient-dashboard', icon: BarChart3, color: 'bg-indigo-500' },
    { name: 'Biblioteca', href: '/app/library', icon: BookOpen, color: 'bg-green-500' },
    { name: 'Relatórios', href: '/app/reports', icon: FileText, color: 'bg-orange-500' },
  ]

  const systemStats = [
    { label: 'Sistema Online', value: '99.9%', color: 'text-green-500' },
    { label: 'Usuários Ativos', value: '1,234', color: 'text-blue-500' },
    { label: 'Avaliações Hoje', value: '156', color: 'text-purple-500' },
  ]

  const navigationItems = getNavigationItems()

  const isActive = (path: string) => location.pathname === path

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setMobileOpen?.()}
        />
      )}
      
      {/* Sidebar */}
      <div className={`bg-slate-800 text-white transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-80'
      } flex flex-col fixed left-0 top-0 z-50 ${
        mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      } ${isMobile ? 'w-80' : ''}`} style={{ top: '0.1%', height: '99.9%' }}>
      {/* Header */}
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-accent-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <div>
                <span className="text-xl font-bold">MedCannLab</span>
                <div className="text-sm text-slate-400">3.0</div>
              </div>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-md hover:bg-slate-700 transition-colors duration-200"
          >
            {isCollapsed ? <span className="text-white">→</span> : <span className="text-white">←</span>}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {(userType === 'professional' || userType === 'admin') ? (
          <>
            {/* Dashboard */}
            <div className="mb-2">
              {navigationItems
                .filter(item => (item as any).section === 'main')
                .map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors duration-200 mb-2 ${
                        isActive(item.href)
                          ? 'bg-primary-600 text-white'
                          : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                      }`}
                      onClick={() => isMobile && setMobileOpen?.()}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      {!isCollapsed && <span className="text-sm font-medium">{item.name}</span>}
                    </Link>
                  )
                })}
            </div>

            {/* Prontuário Eletrônico */}
            {!isCollapsed && (
              <div className="mb-4">
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-3">
                  Prontuário Eletrônico
                </h3>
              </div>
            )}
            <div className="space-y-1 mb-4">
              {navigationItems
                .filter(item => (item as any).section === 'ehr')
                .map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
                        isActive(item.href)
                          ? 'bg-primary-600 text-white'
                          : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                      }`}
                      onClick={() => isMobile && setMobileOpen?.()}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      {!isCollapsed && <span className="text-sm font-medium">{item.name}</span>}
                    </Link>
                  )
                })}
            </div>

            <div className="space-y-1 mb-4">
              {navigationItems
                .filter(item => (item as any).section === 'quick')
                .map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
                        isActive(item.href)
                          ? 'bg-primary-600 text-white'
                          : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                      }`}
                      onClick={() => isMobile && setMobileOpen?.()}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      {!isCollapsed && <span className="text-sm font-medium">{item.name}</span>}
                    </Link>
                  )
                })}
            </div>

            {/* Profile */}
            <div className="space-y-1">
              {navigationItems
                .filter(item => (item as any).section === 'profile')
                .map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
                        isActive(item.href)
                          ? 'bg-primary-600 text-white'
                          : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                      }`}
                      onClick={() => isMobile && setMobileOpen?.()}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      {!isCollapsed && <span className="text-sm font-medium">{item.name}</span>}
                    </Link>
                  )
                })}
            </div>
          </>
        ) : (
          // Other user types (patient, student, admin) - default navigation
          <>
            {navigationItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
                    isActive(item.href)
                      ? 'bg-primary-600 text-white'
                      : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                  onClick={() => isMobile && setMobileOpen?.()}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!isCollapsed && <span className="text-sm font-medium">{item.name}</span>}
                </Link>
              )
            })}
          </>
        )}
      </nav>


      {/* System Stats */}
      {!isCollapsed && userType === 'admin' && (
        <div className="p-4 border-t border-slate-700">
          <h3 className="text-base font-semibold text-slate-400 mb-4">Status do Sistema</h3>
          <div className="space-y-3">
            {systemStats.map((stat, index) => (
              <div key={index} className="flex justify-between items-center text-sm">
                <span className="text-slate-400">{stat.label}</span>
                <span className={`font-medium ${stat.color}`}>{stat.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* User Profile - Only for non-professional users */}
      {userType !== 'professional' && userType !== 'admin' && (
        <div className="p-6 border-t border-slate-700">
          <Link
            to="/app/profile"
            className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-slate-700 transition-colors duration-200"
          >
            <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            {!isCollapsed && (
              <div>
                <p className="text-sm font-medium text-white">Perfil</p>
                <p className="text-xs text-slate-400">Configurações</p>
              </div>
            )}
          </Link>
        </div>
      )}
      </div>
      
      {/* Mobile Toggle Button - apenas quando não controlado pelo Layout */}
      {!isMobile && (
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="fixed top-4 left-4 z-50 lg:hidden bg-slate-800 text-white p-2 rounded-md"
        >
          <Menu className="w-6 h-6" />
        </button>
      )}
    </>
  )
}

export default Sidebar
