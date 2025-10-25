import React, { useState } from 'react'
import { 
  Stethoscope, 
  BookOpen, 
  Microscope, 
  Users, 
  Heart, 
  MessageCircle, 
  FileText,
  BarChart3,
  TrendingUp,
  Clock,
  Star,
  CheckCircle,
  AlertCircle,
  Download,
  Share2,
  Eye,
  Target,
  Award,
  Activity,
  Brain,
  Calendar,
  Settings,
  User,
  ChevronRight,
  Plus,
  Search,
  Filter
} from 'lucide-react'
import { useNoa } from '../contexts/NoaContext'
import NoaAnimatedAvatar from '../components/NoaAnimatedAvatar'

const AdminDashboard: React.FC = () => {
  const { isOpen, toggleChat, messages, isTyping, isListening, isSpeaking, sendMessage } = useNoa()
  const [inputMessage, setInputMessage] = useState('')
  const [activeArea, setActiveArea] = useState<'clinica' | 'ensino' | 'pesquisa'>('clinica')

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

  const areas = [
    {
      id: 'clinica',
      name: 'Clínica',
      icon: Stethoscope,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
      description: 'Gestão de Pacientes e Avaliações Clínicas',
      stats: [
        { label: 'Pacientes Ativos', value: '24', trend: '+5' },
        { label: 'Avaliações Hoje', value: '18', trend: '+3' },
        { label: 'Consultas Agendadas', value: '12', trend: '+2' },
        { label: 'Satisfação Média', value: '4.8', trend: '+0.2' }
      ]
    },
    {
      id: 'ensino',
      name: 'Ensino',
      icon: BookOpen,
      color: 'from-green-500 to-teal-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20',
      description: 'Pós-Graduação Cannabis Medicinal',
      stats: [
        { label: 'Cursos Ativos', value: '3', trend: '+1' },
        { label: 'Progresso Médio', value: '73%', trend: '+8%' },
        { label: 'Horas Estudadas', value: '120h', trend: '+15h' },
        { label: 'Certificados', value: '1', trend: '+1' }
      ]
    },
    {
      id: 'pesquisa',
      name: 'Pesquisa',
      icon: Microscope,
      color: 'from-pink-500 to-purple-500',
      bgColor: 'bg-pink-500/10',
      borderColor: 'border-pink-500/20',
      description: 'Estudos e Análises Científicas',
      stats: [
        { label: 'Estudos Ativos', value: '3', trend: '+1' },
        { label: 'Progresso Médio', value: '83%', trend: '+12%' },
        { label: 'Participantes', value: '192', trend: '+24' },
        { label: 'Publicações', value: '1', trend: '+1' }
      ]
    }
  ]

  const currentArea = areas.find(area => area.id === activeArea) || areas[0]

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">👑 MedCannLab 3.0</h1>
            <p className="text-slate-400">Sistema Integrado de Cannabis Medicinal</p>
          </div>
          
          {/* Admin Profile */}
          <div className="flex items-center space-x-3 bg-slate-700 p-3 rounded-lg">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-semibold text-white">👑 Administrador</p>
              <p className="text-sm text-slate-400">Desenvolvedor</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-screen">
        {/* Sidebar - Simple Navigation */}
        <div className="w-80 bg-slate-800 border-r border-slate-700 flex flex-col">
          {/* Area Selection */}
          <div className="p-4 border-b border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">Áreas Principais</h3>
            <div className="space-y-2">
              {areas.map((area) => {
                const Icon = area.icon
                return (
                  <button
                    key={area.id}
                    onClick={() => setActiveArea(area.id as any)}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all ${
                      activeArea === area.id
                        ? `bg-gradient-to-r ${area.color} text-white shadow-lg`
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <div className="text-left flex-1">
                      <div className="font-semibold">{area.name}</div>
                      <div className="text-xs opacity-80">{area.description}</div>
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
                {activeArea === 'clinica' && 'IA Residente • Suporte Clínico'}
                {activeArea === 'ensino' && 'IA Residente • Tutora Acadêmica'}
                {activeArea === 'pesquisa' && 'IA Residente • Suporte em Pesquisa'}
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

        {/* Main Content - Direct Dashboard */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Welcome Section */}
          <div className={`bg-gradient-to-r ${currentArea.color} p-6`}>
            <h2 className="text-2xl font-bold text-white mb-2">
              {currentArea.name}
            </h2>
            <p className="text-white/90 mb-4">
              {currentArea.description}
            </p>
          </div>

          {/* Stats Cards */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {currentArea.stats.map((stat, index) => (
                <div key={index} className="bg-slate-800 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 ${currentArea.bgColor} rounded-lg`}>
                      {activeArea === 'clinica' && <Users className="w-6 h-6 text-blue-400" />}
                      {activeArea === 'ensino' && <BookOpen className="w-6 h-6 text-green-400" />}
                      {activeArea === 'pesquisa' && <Microscope className="w-6 h-6 text-pink-400" />}
                    </div>
                    <TrendingUp className="w-5 h-5 text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
                  <p className="text-sm text-slate-400">{stat.label}</p>
                  <p className="text-xs text-green-400 mt-1">{stat.trend}</p>
                </div>
              ))}
            </div>

            {/* Main Content Area */}
            <div className="bg-slate-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">
                  {activeArea === 'clinica' && '👤 Prontuário do Paciente - Dr. Ricardo Valença'}
                  {activeArea === 'ensino' && '📚 Meus Cursos'}
                  {activeArea === 'pesquisa' && '🔬 Meus Estudos'}
                </h3>
                <button className={`bg-gradient-to-r ${currentArea.color} text-white px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity`}>
                  {activeArea === 'clinica' && 'Ver Prontuário Completo'}
                  {activeArea === 'ensino' && 'Ver Todos'}
                  {activeArea === 'pesquisa' && 'Ver Todos'}
                </button>
              </div>

              <div className="space-y-4">
                {activeArea === 'clinica' && (
                  <>
                    {/* Patient Header */}
                    <div className="bg-slate-700 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-lg">RV</span>
                          </div>
                          <div>
                            <h4 className="text-xl font-semibold text-white">Dr. Ricardo Valença</h4>
                            <p className="text-sm text-slate-400">Paciente - Insuficiência Renal Crônica</p>
                            <p className="text-xs text-slate-500">ID: #12345 | Última atualização: Hoje</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-400">85/100</div>
                          <div className="text-sm text-slate-400">Score Clínico</div>
                        </div>
                      </div>
                    </div>

                    {/* Clinical Assessment Section */}
                    <div className="bg-slate-700 rounded-lg p-6">
                      <h5 className="text-lg font-semibold text-white mb-4">📊 Avaliação Clínica Inicial</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="bg-slate-600 rounded-lg p-4">
                          <h6 className="font-semibold text-white mb-2">Sintomas Principais</h6>
                          <ul className="text-sm text-slate-300 space-y-1">
                            <li>• Dor crônica (8/10)</li>
                            <li>• Insônia persistente</li>
                            <li>• Ansiedade moderada</li>
                            <li>• Fadiga crônica</li>
                          </ul>
                        </div>
                        <div className="bg-slate-600 rounded-lg p-4">
                          <h6 className="font-semibold text-white mb-2">Histórico Médico</h6>
                          <ul className="text-sm text-slate-300 space-y-1">
                            <li>• Insuficiência Renal Crônica</li>
                            <li>• Hipertensão arterial</li>
                            <li>• Diabetes tipo 2</li>
                            <li>• Sem alergias conhecidas</li>
                          </ul>
                        </div>
                      </div>
                      <button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 px-4 rounded-lg font-semibold hover:opacity-90 transition-opacity">
                        Iniciar Nova Avaliação Clínica
                      </button>
                    </div>

                    {/* Patient-Professional Interaction */}
                    <div className="bg-slate-700 rounded-lg p-6">
                      <h5 className="text-lg font-semibold text-white mb-4">💬 Interação Paciente-Profissional</h5>
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">P</span>
                          </div>
                          <div className="flex-1">
                            <div className="bg-slate-600 rounded-lg p-3">
                              <p className="text-sm text-white">"Estou sentindo uma melhora significativa na dor após iniciar o tratamento com CBD. A qualidade do sono também melhorou."</p>
                              <p className="text-xs text-slate-400 mt-1">Dr. Ricardo Valença • 2 horas atrás</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">M</span>
                          </div>
                          <div className="flex-1">
                            <div className="bg-slate-600 rounded-lg p-3">
                              <p className="text-sm text-white">"Excelente! Continue com a dosagem atual. Vamos agendar uma reavaliação em 2 semanas para ajustar se necessário."</p>
                              <p className="text-xs text-slate-400 mt-1">Dr. Profissional • 1 hora atrás</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 flex space-x-2">
                        <input
                          type="text"
                          placeholder="Digite sua mensagem..."
                          className="flex-1 px-3 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                        />
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                          Enviar
                        </button>
                      </div>
                    </div>

                    {/* IA Residente Integration */}
                    <div className="bg-slate-700 rounded-lg p-6">
                      <h5 className="text-lg font-semibold text-white mb-4">🤖 IA Residente - Análise do Caso</h5>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="bg-slate-600 rounded-lg p-4 text-center">
                          <div className="text-2xl font-bold text-green-400 mb-1">94%</div>
                          <div className="text-sm text-slate-400">Precisão do Diagnóstico</div>
                        </div>
                        <div className="bg-slate-600 rounded-lg p-4 text-center">
                          <div className="text-2xl font-bold text-blue-400 mb-1">87%</div>
                          <div className="text-sm text-slate-400">Eficácia do Tratamento</div>
                        </div>
                        <div className="bg-slate-600 rounded-lg p-4 text-center">
                          <div className="text-2xl font-bold text-purple-400 mb-1">92%</div>
                          <div className="text-sm text-slate-400">Satisfação do Paciente</div>
                        </div>
                      </div>
                      <div className="bg-slate-600 rounded-lg p-4">
                        <h6 className="font-semibold text-white mb-2">Recomendações da IA:</h6>
                        <ul className="text-sm text-slate-300 space-y-1">
                          <li>• Manter dosagem atual de CBD (25mg/dia)</li>
                          <li>• Monitorar função renal semanalmente</li>
                          <li>• Considerar ajuste de medicação em 2 semanas</li>
                          <li>• Continuar acompanhamento psicológico</li>
                        </ul>
                      </div>
                    </div>
                  </>
                )}

                {activeArea === 'ensino' && (
                  <>
                    <div className="bg-slate-700 rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-white">Arte da Entrevista Clínica</h4>
                          <p className="text-sm text-slate-400 mb-3">Fundamentos da entrevista clínica aplicada à Cannabis Medicinal</p>
                          <div className="flex items-center space-x-4 text-sm text-slate-500 mb-4">
                            <span>Progresso: 75%</span>
                            <span>Instrutor: Dr. Eduardo Faveret</span>
                          </div>
                        </div>
                      </div>
                      <div className="w-full bg-slate-600 rounded-full h-2">
                        <div className="h-2 rounded-full bg-blue-500" style={{ width: '75%' }} />
                      </div>
                    </div>
                  </>
                )}

                {activeArea === 'pesquisa' && (
                  <>
                    <div className="bg-slate-700 rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-white">Eficácia do CBD na Insuficiência Renal</h4>
                          <p className="text-sm text-slate-400 mb-3">Estudo longitudinal sobre os efeitos do CBD em pacientes com IRC</p>
                          <div className="flex items-center space-x-4 text-sm text-slate-500 mb-4">
                            <span>Progresso: 65%</span>
                            <span>Participantes: 24</span>
                          </div>
                        </div>
                      </div>
                      <div className="w-full bg-slate-600 rounded-full h-2">
                        <div className="h-2 rounded-full bg-pink-500" style={{ width: '65%' }} />
                      </div>
                    </div>
                  </>
                )}
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
                  <div className={`w-8 h-8 bg-gradient-to-r ${currentArea.color} rounded-full flex items-center justify-center`}>
                    {activeArea === 'clinica' && <Stethoscope className="w-4 h-4 text-white" />}
                    {activeArea === 'ensino' && <BookOpen className="w-4 h-4 text-white" />}
                    {activeArea === 'pesquisa' && <Microscope className="w-4 h-4 text-white" />}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Nôa Esperança</h3>
                    <p className="text-xs text-slate-400">
                      {activeArea === 'clinica' && 'Suporte Clínico'}
                      {activeArea === 'ensino' && 'Tutora Acadêmica'}
                      {activeArea === 'pesquisa' && 'Suporte em Pesquisa'}
                    </p>
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
                  {activeArea === 'clinica' && <Stethoscope className="w-12 h-12 mx-auto mb-3 text-blue-400" />}
                  {activeArea === 'ensino' && <BookOpen className="w-12 h-12 mx-auto mb-3 text-green-400" />}
                  {activeArea === 'pesquisa' && <Microscope className="w-12 h-12 mx-auto mb-3 text-pink-400" />}
                  <p className="text-sm">Olá! Sou a Nôa Esperança, sua assistente especializada.</p>
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
                          ? `bg-gradient-to-r ${currentArea.color} text-white`
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
                  className="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className={`p-2 bg-gradient-to-r ${currentArea.color} text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed`}
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

export default AdminDashboard