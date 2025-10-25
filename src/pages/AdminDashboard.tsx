import React from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  User, Stethoscope, GraduationCap, ChevronRight,
  Users, BookOpen, DollarSign, MessageCircle, Award,
  Upload, BarChart3, Activity, Settings, Brain
} from 'lucide-react'

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate()

  const areas = [
    {
      id: 'paciente',
      nome: 'Área do Paciente',
      descricao: 'Visualize e gerencie a experiência do paciente, incluindo avaliação clínica inicial com AEC e interação com o profissional',
      cor: 'from-blue-600 to-cyan-500',
      icone: User,
      rota: '/app/patient-dashboard',
      funcionalidades: [
        'Avaliação Clínica Inicial (AEC)',
        'Chat com Nôa Esperanza IA',
        'Interação com Profissional',
        'Compartilhamento de Documentos',
        'Relatórios Clínicos'
      ]
    },
    {
      id: 'profissional',
      nome: 'Área do Profissional',
      descricao: 'Gerencie prontuários, avaliacões clínicas e interações com pacientes utilizando a metodologia Arte da Entrevista Clínica',
      cor: 'from-green-600 to-teal-500',
      icone: Stethoscope,
      rota: '/app/professional-dashboard',
      funcionalidades: [
        'Prontuário do Paciente',
        'Avaliações Clínicas',
        'Chat com Pacientes',
        'Arte da Entrevista Clínica',
        'Análise de Casos'
      ]
    },
    {
      id: 'aluno',
      nome: 'Área do Aluno',
      descricao: 'Acesse cursos, incluindo Pós-Graduação em Cannabis Medicinal e Arte da Entrevista Clínica - Dr. Eduardo Faveret',
      cor: 'from-purple-600 to-pink-500',
      icone: GraduationCap,
      rota: '/app/student-dashboard',
      funcionalidades: [
        'Pós-Graduação Cannabis Medicinal',
        'Arte da Entrevista Clínica (AEC)',
        'Sistema IMRE Triaxial',
        'Biblioteca Médica',
        'Gamificação e Certificados'
      ]
    }
  ]

  const funcoes = [
    {
      id: 'users',
      nome: '👥 Usuários',
      descricao: 'Gestão de usuários do sistema',
      cor: 'from-blue-500 to-cyan-400',
      icone: Users,
      rota: '#'
    },
    {
      id: 'courses',
      nome: '🎓 Cursos',
      descricao: 'Gestão de cursos e materiais',
      cor: 'from-green-500 to-teal-400',
      icone: BookOpen,
      rota: '#'
    },
    {
      id: 'financial',
      nome: '💰 Financeiro',
      descricao: 'Controle financeiro e pagamentos',
      cor: 'from-emerald-500 to-green-400',
      icone: DollarSign,
      rota: '#'
    },
    {
      id: 'chat',
      nome: '💬 Chat Global + Moderação',
      descricao: 'Moderação de chats e conversas',
      cor: 'from-cyan-500 to-blue-400',
      icone: MessageCircle,
      rota: '#'
    },
    {
      id: 'forum',
      nome: '🏛️ Moderação Fórum',
      descricao: 'Gestão e moderação do fórum',
      cor: 'from-orange-500 to-red-400',
      icone: MessageCircle,
      rota: '#'
    },
    {
      id: 'gamification',
      nome: '🏆 Ranking & Gamificação',
      descricao: 'Sistema de pontos e rankings',
      cor: 'from-yellow-500 to-orange-400',
      icone: Award,
      rota: '#'
    },
    {
      id: 'upload',
      nome: '📁 Upload',
      descricao: 'Upload de documentos e arquivos',
      cor: 'from-indigo-500 to-purple-400',
      icone: Upload,
      rota: '#'
    },
    {
      id: 'analytics',
      nome: '📊 Analytics',
      descricao: 'Análise de dados e relatórios',
      cor: 'from-pink-500 to-rose-400',
      icone: BarChart3,
      rota: '#'
    },
    {
      id: 'renal',
      nome: '🫀 Função Renal',
      descricao: 'Monitoramento de função renal',
      cor: 'from-red-500 to-pink-400',
      icone: Activity,
      rota: '#'
    },
    {
      id: 'system',
      nome: '⚙️ Sistema',
      descricao: 'Configurações do sistema',
      cor: 'from-slate-500 to-gray-400',
      icone: Settings,
      rota: '#'
    },
    {
      id: 'library',
      nome: '📚 Biblioteca',
      descricao: 'Biblioteca médica e documentos',
      cor: 'from-teal-500 to-cyan-400',
      icone: BookOpen,
      rota: '#'
    },
    {
      id: 'ai-chat',
      nome: '🤖 Chat IA Documentos',
      descricao: 'IA para análise de documentos',
      cor: 'from-violet-500 to-purple-400',
      icone: Brain,
      rota: '#'
    }
  ]

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">🏥 MedCannLab 3.0</h1>
          <p className="text-xl text-slate-300">Sistema Integrado - Cidade Amiga dos Rins & Cannabis Medicinal</p>
          <p className="text-slate-400 mt-2">
            <strong>Espinha Dorsal:</strong> Arte da Entrevista Clínica (AEC) - Dr. Eduardo Faveret
          </p>
        </div>

        {/* Admin Profile */}
        <div className="flex items-center space-x-3 bg-slate-800 p-4 rounded-lg mb-8 w-fit">
          <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold">👑</span>
          </div>
          <div>
            <p className="font-semibold text-white">Administrador</p>
            <p className="text-sm text-slate-400">Visão completa do sistema</p>
          </div>
        </div>

        {/* Description */}
        <div className="bg-slate-800 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-3">Visão Administrativa Completa</h2>
          <p className="text-slate-300 mb-4">
            Como administrador, você tem acesso a todas as áreas do sistema. A <strong>Arte da Entrevista Clínica (AEC)</strong> é a metodologia que 
            permeia toda a plataforma, garantindo uma abordagem humanizada e ética no cuidado com Cannabis Medicinal.
          </p>
        </div>

        {/* Areas Section */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-4">Áreas do Sistema</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {areas.map((area) => {
              const Icon = area.icone
              return (
                <div
                  key={area.id}
                  onClick={() => navigate(area.rota)}
                  className="bg-slate-800 rounded-xl p-6 hover:bg-slate-700 transition-all cursor-pointer group border-2 border-slate-700 hover:border-slate-600"
                >
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${area.cor} flex items-center justify-center mb-4`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2">{area.nome}</h3>
                  <p className="text-slate-400 text-sm mb-4">{area.descricao}</p>
                  
                  <div className="mb-4">
                    <p className="text-xs text-slate-500 mb-2">Funcionalidades:</p>
                    <ul className="space-y-1">
                      {area.funcionalidades.map((func, idx) => (
                        <li key={idx} className="text-xs text-slate-300 flex items-center">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2" />
                          {func}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center text-blue-400 group-hover:text-blue-300 font-semibold">
                    <span>Ver área</span>
                    <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Functions Section */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-4">Funcionalidades Administrativas</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {funcoes.map((funcao) => {
              const Icon = funcao.icone
              return (
                <div
                  key={funcao.id}
                  className="bg-slate-800 rounded-lg p-4 hover:bg-slate-700 transition-all cursor-pointer border border-slate-700 hover:border-slate-600"
                >
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${funcao.cor} flex items-center justify-center mb-3`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-bold text-sm mb-1">{funcao.nome}</h4>
                  <p className="text-xs text-slate-400">{funcao.descricao}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* System Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-800 rounded-lg p-4">
            <p className="text-sm text-slate-400 mb-1">Sistema Online</p>
            <p className="text-2xl font-bold text-green-400">99.9%</p>
          </div>
          <div className="bg-slate-800 rounded-lg p-4">
            <p className="text-sm text-slate-400 mb-1">Usuários Ativos</p>
            <p className="text-2xl font-bold text-blue-400">1,234</p>
          </div>
          <div className="bg-slate-800 rounded-lg p-4">
            <p className="text-sm text-slate-400 mb-1">Avaliações Hoje</p>
            <p className="text-2xl font-bold text-purple-400">156</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
