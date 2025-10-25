import React, { useState } from 'react'
import { 
  Stethoscope, 
  GraduationCap, 
  User, 
  ChevronDown,
  Users,
  BookOpen,
  Microscope,
  Heart,
  Brain,
  MessageCircle
} from 'lucide-react'

interface UserTypeNavigationProps {
  currentUserType: 'professional' | 'student' | 'patient' | 'admin'
  onUserTypeChange: (userType: 'professional' | 'student' | 'patient' | 'admin') => void
}

const UserTypeNavigation: React.FC<UserTypeNavigationProps> = ({
  currentUserType,
  onUserTypeChange
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const userTypes = [
    {
      id: 'professional',
      name: 'Profissional',
      description: 'Área Clínica',
      icon: Stethoscope,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
      href: '/app/professional-dashboard'
    },
    {
      id: 'student',
      name: 'Aluno',
      description: 'Área de Ensino',
      icon: GraduationCap,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20',
      href: '/app/student-dashboard'
    },
    {
      id: 'patient',
      name: 'Paciente',
      description: 'Área de Pesquisa',
      icon: User,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20',
      href: '/app/patient-dashboard'
    },
    {
      id: 'admin',
      name: 'Administrador',
      description: 'Gestão da Plataforma',
      icon: Users,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/20',
      href: '/app/dashboard'
    }
  ]

  const currentType = userTypes.find(type => type.id === currentUserType) || userTypes[3]

  const getServiceAreas = (userType: string) => {
    switch (userType) {
      case 'professional':
        return [
          { name: 'Dashboard Clínico', icon: Stethoscope, href: '/app/professional-dashboard' },
          { name: 'Pacientes', icon: Users, href: '/app/professional-patients' },
          { name: 'Avaliações', icon: Heart, href: '/app/professional-assessments' },
          { name: 'Chat com Pacientes', icon: MessageCircle, href: '/app/professional-chat' },
          { name: 'Relatórios', icon: BookOpen, href: '/app/professional-reports' }
        ]
      case 'student':
        return [
          { name: 'Dashboard Acadêmico', icon: GraduationCap, href: '/app/student-dashboard' },
          { name: 'Cursos', icon: BookOpen, href: '/app/student-courses' },
          { name: 'Arte da Entrevista Clínica', icon: Heart, href: '/app/arte-entrevista-clinica' },
          { name: 'Cannabis Medicinal', icon: Brain, href: '/app/cannabis-course' },
          { name: 'Avaliações', icon: Stethoscope, href: '/app/student-assessments' }
        ]
      case 'patient':
        return [
          { name: 'Dashboard do Paciente', icon: User, href: '/app/patient-dashboard' },
          { name: 'Minha Saúde', icon: Heart, href: '/app/patient-health' },
          { name: 'Chat com Nôa', icon: MessageCircle, href: '/app/chat-noa-esperanca' },
          { name: 'Relatórios', icon: BookOpen, href: '/app/patient-reports' },
          { name: 'Compartilhamento', icon: Users, href: '/app/patient-sharing' }
        ]
      default:
        return []
    }
  }

  const serviceAreas = getServiceAreas(currentUserType)

  return (
    <div className="relative">
      {/* User Type Selector */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 p-3 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors"
      >
        <div className={`p-2 rounded-lg ${currentType.bgColor} ${currentType.borderColor} border`}>
          <currentType.icon className={`w-5 h-5 ${currentType.color}`} />
        </div>
        <div className="text-left">
          <div className="text-white font-medium">{currentType.name}</div>
          <div className="text-sm text-slate-400">{currentType.description}</div>
        </div>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-80 bg-slate-800 rounded-xl shadow-xl border border-slate-700 z-50">
          <div className="p-4">
            <h3 className="text-lg font-semibold text-white mb-4">Selecionar Área de Atuação</h3>
            
            {/* User Types */}
            <div className="space-y-2 mb-6">
              {userTypes.map((type) => {
                const Icon = type.icon
                return (
                  <button
                    key={type.id}
                    onClick={() => {
                      onUserTypeChange(type.id as any)
                      setIsOpen(false)
                    }}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                      currentUserType === type.id 
                        ? 'bg-slate-700' 
                        : 'hover:bg-slate-700'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${type.bgColor} ${type.borderColor} border`}>
                      <Icon className={`w-5 h-5 ${type.color}`} />
                    </div>
                    <div className="text-left">
                      <div className="text-white font-medium">{type.name}</div>
                      <div className="text-sm text-slate-400">{type.description}</div>
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Service Areas for Current User Type */}
            {serviceAreas.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-slate-300 mb-3">
                  Áreas de Serviço - {currentType.name}
                </h4>
                <div className="space-y-1">
                  {serviceAreas.map((area, index) => {
                    const Icon = area.icon
                    return (
                      <a
                        key={index}
                        href={area.href}
                        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-700 transition-colors"
                      >
                        <Icon className="w-4 h-4 text-slate-400" />
                        <span className="text-sm text-slate-300">{area.name}</span>
                      </a>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Platform Backbone */}
            <div className="mt-6 pt-4 border-t border-slate-700">
              <div className="flex items-center space-x-2 mb-3">
                <Heart className="w-4 h-4 text-pink-400" />
                <span className="text-sm font-semibold text-pink-400">Espinha Dorsal da Plataforma</span>
              </div>
              <div className="space-y-1">
                <a
                  href="/app/arte-entrevista-clinica"
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-700 transition-colors"
                >
                  <BookOpen className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-slate-300">Arte da Entrevista Clínica</span>
                </a>
                <a
                  href="/app/cannabis-medicinal-course"
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-700 transition-colors"
                >
                  <Brain className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-slate-300">Pós-Graduação Cannabis Medicinal</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserTypeNavigation
