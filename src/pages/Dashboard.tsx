import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'
import { 
  BookOpen, 
  Stethoscope, 
  BarChart3, 
  Users, 
  Award,
  Clock,
  CheckCircle,
  AlertCircle,
  MessageCircle,
  Phone
} from 'lucide-react'
import PatientDashboard from './PatientDashboard'
import ProfessionalDashboard from './ProfessionalDashboard'
import AlunoDashboard from './AlunoDashboard'
import AdminDashboard from './AdminDashboard'

const Dashboard: React.FC = () => {
  const { user } = useAuth()

  const getDashboardContent = () => {
    switch (user?.type) {
      case 'patient':
        return <PatientDashboard />
      case 'professional':
        return <ProfessionalDashboard />
      case 'aluno':
        return <AlunoDashboard />
      case 'admin':
        return <AdminDashboard />
      default:
        return <DefaultDashboard />
    }
  }

  return (
    <div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {getDashboardContent()}
      </div>
    </div>
  )
}


const ProfessionalDashboard: React.FC = () => {
  const kpis = [
    { 
      label: 'Pacientes Ativos', 
      value: '24', 
      change: '+12%', 
      icon: <Users className="w-6 h-6" />, 
      color: 'text-primary-400',
      bgColor: 'bg-primary-500/20'
    },
    { 
      label: 'Avaliações Hoje', 
      value: '8', 
      change: '+3', 
      icon: <Stethoscope className="w-6 h-6" />, 
      color: 'text-green-400',
      bgColor: 'bg-green-500/20'
    },
    { 
      label: 'Relatórios Pendentes', 
      value: '3', 
      change: '-2', 
      icon: <AlertCircle className="w-6 h-6" />, 
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/20'
    },
    { 
      label: 'Receita Mensal', 
      value: 'R$ 12.450', 
      change: '+8.5%', 
      icon: <BarChart3 className="w-6 h-6" />, 
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/20'
    }
  ]

  const recentPatients = [
    { id: 1, name: 'Maria Silva', lastVisit: '2 dias', status: 'Avaliação Pendente', priority: 'high' },
    { id: 2, name: 'João Santos', lastVisit: '5 dias', status: 'Relatório Pronto', priority: 'medium' },
    { id: 3, name: 'Ana Costa', lastVisit: '1 semana', status: 'Consulta Agendada', priority: 'low' },
    { id: 4, name: 'Carlos Lima', lastVisit: '3 dias', status: 'Aguardando Resultados', priority: 'high' },
  ]

  const upcomingAppointments = [
    { time: '09:00', patient: 'Maria Silva', type: 'Avaliação IMRE' },
    { time: '10:30', patient: 'João Santos', type: 'Consulta de Retorno' },
    { time: '14:00', patient: 'Ana Costa', type: 'Avaliação Inicial' },
    { time: '15:30', patient: 'Carlos Lima', type: 'Discussão de Resultados' },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          🏥 Dashboard Profissional
        </h1>
        <p className="text-slate-300 text-lg">
          Gerencie seus pacientes e acesse ferramentas clínicas avançadas
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => (
          <div key={index} className="bg-slate-800/80 rounded-lg p-6 border border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${kpi.bgColor}`}>
                <div className={`${kpi.color}`}>
                  {kpi.icon}
                </div>
              </div>
              <span className="text-sm text-green-400 font-medium">{kpi.change}</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-white mb-1">{kpi.value}</p>
              <p className="text-slate-400 text-sm">{kpi.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Pacientes Recentes */}
        <div className="lg:col-span-2 bg-slate-800/80 rounded-lg p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">👥 Meus Pacientes</h3>
            <Link 
              to="/patients" 
              className="text-primary-400 hover:text-blue-300 text-sm font-medium"
            >
              Ver Todos →
            </Link>
          </div>
          <div className="space-y-4">
            {recentPatients.map((patient) => (
              <div key={patient.id} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700/70 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {patient.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-white">{patient.name}</p>
                    <p className="text-slate-400 text-sm">{patient.lastVisit} atrás</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    patient.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                    patient.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-green-500/20 text-green-400'
                  }`}>
                    {patient.status}
                  </span>
                  <Link
                    to={`/patient/${patient.id}`}
                    className="text-primary-400 hover:text-blue-300 text-sm font-medium"
                  >
                    Ver →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Agenda e Ferramentas */}
        <div className="space-y-6">
          {/* Próximas Consultas */}
          <div className="bg-slate-800/80 rounded-lg p-6 border border-slate-700">
            <h3 className="text-lg font-bold text-white mb-4">📅 Agenda de Hoje</h3>
            <div className="space-y-3">
              {upcomingAppointments.map((appointment, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-slate-700/50 rounded-lg">
                  <div className="text-primary-400 font-mono text-sm">{appointment.time}</div>
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">{appointment.patient}</p>
                    <p className="text-slate-400 text-xs">{appointment.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ferramentas Clínicas */}
          <div className="bg-slate-800/80 rounded-lg p-6 border border-slate-700">
            <h3 className="text-lg font-bold text-white mb-4">🛠️ Ferramentas Clínicas</h3>
            <div className="space-y-3">
              <Link
                to="/clinical-assessment"
                className="flex items-center space-x-3 p-3 bg-primary-500/20 hover:bg-blue-500/30 rounded-lg transition-colors"
              >
                <Stethoscope className="w-5 h-5 text-primary-400" />
                <span className="text-white font-medium">Avaliação IMRE</span>
              </Link>
              <Link
                to="/chat"
                className="flex items-center space-x-3 p-3 bg-purple-500/20 hover:bg-purple-500/30 rounded-lg transition-colors"
              >
                <Users className="w-5 h-5 text-purple-400" />
                <span className="text-white font-medium">Fórum de Conselheiros em IA na Saúde</span>
              </Link>
              <Link
                to="/reports"
                className="flex items-center space-x-3 p-3 bg-orange-500/20 hover:bg-orange-500/30 rounded-lg transition-colors"
              >
                <BarChart3 className="w-5 h-5 text-orange-400" />
                <span className="text-white font-medium">Relatórios</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Avaliações e Pacientes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Avaliações Recentes */}
        <div className="bg-slate-800/80 rounded-lg p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">📋 Avaliações Recentes</h3>
            <Link 
              to="/evaluations" 
              className="text-primary-400 hover:text-blue-300 text-sm font-medium"
            >
              Ver Todas →
            </Link>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center">
                  <Stethoscope className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-medium">Maria Silva - IMRE</p>
                  <p className="text-slate-400 text-sm">15/01/2024 - 14:30</p>
                  <span className="inline-block px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full mt-1">
                    Concluída
                  </span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="text-primary-400 hover:text-blue-300 text-sm px-3 py-1 bg-primary-500/20 rounded-lg">
                  👁️ Ver
                </button>
                <button className="text-green-400 hover:text-green-300 text-sm px-3 py-1 bg-green-500/20 rounded-lg">
                  📥 PDF
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-medium">João Santos - AEC</p>
                  <p className="text-slate-400 text-sm">14/01/2024 - 10:15</p>
                  <span className="inline-block px-2 py-1 bg-orange-500/20 text-orange-400 text-xs rounded-full mt-1">
                    Em Andamento
                  </span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="text-primary-400 hover:text-blue-300 text-sm px-3 py-1 bg-primary-500/20 rounded-lg">
                  👁️ Ver
                </button>
                <button className="text-yellow-400 hover:text-yellow-300 text-sm px-3 py-1 bg-yellow-500/20 rounded-lg">
                  ✏️ Editar
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-medium">Ana Costa - Retorno</p>
                  <p className="text-slate-400 text-sm">13/01/2024 - 16:45</p>
                  <span className="inline-block px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full mt-1">
                    Concluída
                  </span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="text-primary-400 hover:text-blue-300 text-sm px-3 py-1 bg-primary-500/20 rounded-lg">
                  👁️ Ver
                </button>
                <button className="text-green-400 hover:text-green-300 text-sm px-3 py-1 bg-green-500/20 rounded-lg">
                  📥 PDF
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Pacientes Detalhados */}
        <div className="bg-slate-800/80 rounded-lg p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">👥 Meus Pacientes</h3>
            <Link 
              to="/patients" 
              className="text-primary-400 hover:text-blue-300 text-sm font-medium"
            >
              Ver Todos →
            </Link>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-slate-700/50 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">MS</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold">Maria Silva</p>
                    <p className="text-slate-400 text-sm">45 anos • Feminino</p>
                  </div>
                </div>
                <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                  Ativo
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-slate-400">Última consulta:</span>
                  <p className="text-white">15/01/2024</p>
                </div>
                <div>
                  <span className="text-slate-400">Próxima consulta:</span>
                  <p className="text-white">22/01/2024</p>
                </div>
                <div>
                  <span className="text-slate-400">Diagnóstico:</span>
                  <p className="text-white">Hipertensão</p>
                </div>
                <div>
                  <span className="text-slate-400">Status:</span>
                  <p className="text-green-400">Estável</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-700/50 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">JS</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold">João Santos</p>
                    <p className="text-slate-400 text-sm">52 anos • Masculino</p>
                  </div>
                </div>
                <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded-full">
                  Pendente
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-slate-400">Última consulta:</span>
                  <p className="text-white">10/01/2024</p>
                </div>
                <div>
                  <span className="text-slate-400">Próxima consulta:</span>
                  <p className="text-white">20/01/2024</p>
                </div>
                <div>
                  <span className="text-slate-400">Diagnóstico:</span>
                  <p className="text-white">Diabetes Tipo 2</p>
                </div>
                <div>
                  <span className="text-slate-400">Status:</span>
                  <p className="text-yellow-400">Aguardando</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-700/50 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">AC</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold">Ana Costa</p>
                    <p className="text-slate-400 text-sm">38 anos • Feminino</p>
                  </div>
                </div>
                <span className="px-2 py-1 bg-primary-500/20 text-primary-400 text-xs rounded-full">
                  Nova
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-slate-400">Última consulta:</span>
                  <p className="text-white">Hoje</p>
                </div>
                <div>
                  <span className="text-slate-400">Próxima consulta:</span>
                  <p className="text-white">28/01/2024</p>
                </div>
                <div>
                  <span className="text-slate-400">Diagnóstico:</span>
                  <p className="text-white">Avaliação Inicial</p>
                </div>
                <div>
                  <span className="text-slate-400">Status:</span>
                  <p className="text-primary-400">Em Análise</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const StudentDashboard: React.FC = () => {
  const stats = [
    { label: 'Cursos Inscritos', value: '3', icon: <BookOpen className="w-5 h-5" />, color: 'text-blue-600' },
    { label: 'Aulas Concluídas', value: '45', icon: <CheckCircle className="w-5 h-5" />, color: 'text-green-600' },
    { label: 'Certificados', value: '2', icon: <Award className="w-5 h-5" />, color: 'text-purple-600' },
    { label: 'Horas de Estudo', value: '120h', icon: <Clock className="w-5 h-5" />, color: 'text-orange-600' }
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white dark:text-slate-900 dark:text-white mb-2">
          Dashboard do Estudante
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Acompanhe seu progresso nos cursos e certificações
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-slate-100/50 dark:bg-slate-800/80 rounded-lg shadow-sm border border-slate-300/50 dark:border-slate-600/50 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white dark:text-slate-900 dark:text-white">{stat.value}</p>
              </div>
              <div className={`${stat.color}`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-100/50 dark:bg-slate-800/80 rounded-lg shadow-sm border border-slate-300/50 dark:border-slate-600/50 p-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white dark:text-slate-900 dark:text-white mb-4">
            Cursos em Andamento
          </h3>
          <div className="space-y-4">
            {[
              { name: 'Arte da Entrevista Clínica', progress: 75, total: 8 },
              { name: 'Pós-Graduação Cannabis', progress: 30, total: 520 }
            ].map((course, index) => (
              <div key={index} className="p-4 bg-slate-100/30 dark:bg-slate-700/50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium text-slate-900 dark:text-white dark:text-slate-900 dark:text-white">{course.name}</h4>
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    {course.progress}%
                  </span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-2">
                  <div
                    className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {course.total}h total
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-100/50 dark:bg-slate-800/80 rounded-lg shadow-sm border border-slate-300/50 dark:border-slate-600/50 p-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white dark:text-slate-900 dark:text-white mb-4">
            Próximas Aulas
          </h3>
          <div className="space-y-3">
            {[
              { title: 'Metodologia AEC', time: 'Hoje, 14:00', type: 'live' },
              { title: 'Sistema IMRE', time: 'Amanhã, 10:00', type: 'video' },
              { title: 'Cannabis Medicinal', time: 'Quarta, 16:00', type: 'live' }
            ].map((class_, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-100/30 dark:bg-slate-700/50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white dark:text-slate-900 dark:text-white">
                    {class_.title}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {class_.time}
                  </p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  class_.type === 'live' 
                    ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                    : 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-primary-400'
                }`}>
                  {class_.type === 'live' ? 'Ao Vivo' : 'Gravada'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const AdminDashboard: React.FC = () => {
  const stats = [
    { label: 'Usuários Ativos', value: '1,234', icon: <Users className="w-5 h-5" />, color: 'text-blue-600' },
    { label: 'Cursos Disponíveis', value: '12', icon: <BookOpen className="w-5 h-5" />, color: 'text-green-600' },
    { label: 'Avaliações Hoje', value: '156', icon: <Stethoscope className="w-5 h-5" />, color: 'text-purple-600' },
    { label: 'Sistema Status', value: 'Online', icon: <CheckCircle className="w-5 h-5" />, color: 'text-green-600' }
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white dark:text-slate-900 dark:text-white mb-2">
          Dashboard Administrativo
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Gerencie a plataforma e monitore métricas em tempo real
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-slate-100/50 dark:bg-slate-800/80 rounded-lg shadow-sm border border-slate-300/50 dark:border-slate-600/50 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white dark:text-slate-900 dark:text-white">{stat.value}</p>
              </div>
              <div className={`${stat.color}`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 card p-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white dark:text-slate-900 dark:text-white mb-4">
            Métricas do Sistema
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-300">Uptime do Servidor</span>
              <span className="text-sm font-medium text-green-600">99.9%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-300">Tempo de Resposta</span>
              <span className="text-sm font-medium text-blue-600">120ms</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-300">Armazenamento</span>
              <span className="text-sm font-medium text-orange-600">75%</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-100/50 dark:bg-slate-800/80 rounded-lg shadow-sm border border-slate-300/50 dark:border-slate-600/50 p-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white dark:text-slate-900 dark:text-white mb-4">
            Ações Rápidas
          </h3>
          <div className="space-y-3">
            <Link
              to="/admin/users"
              className="flex items-center space-x-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors duration-200"
            >
              <Users className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
                Gerenciar Usuários
              </span>
            </Link>
            <Link
              to="/admin/courses"
              className="flex items-center space-x-3 p-3 rounded-lg bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors duration-200"
            >
              <BookOpen className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-green-900 dark:text-green-100">
                Gerenciar Cursos
              </span>
            </Link>
            <Link
              to="/admin/analytics"
              className="flex items-center space-x-3 p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors duration-200"
            >
              <BarChart3 className="w-5 h-5 text-purple-600" />
              <span className="text-sm font-medium text-purple-900 dark:text-purple-100">
                Ver Analytics
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

const DefaultDashboard: React.FC = () => {
  return (
    <div className="text-center py-12">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white dark:text-slate-900 dark:text-white mb-4">
        Bem-vindo ao MedCannLab 3.0
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Faça login para acessar seu dashboard personalizado
      </p>
      <Link
        to="/login"
        className="btn-primary"
      >
        Fazer Login
      </Link>
    </div>
  )
}

export default Dashboard
