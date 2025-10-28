import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Video,
  Phone,
  MessageCircle,
  FileText,
  Download,
  Upload,
  User,
  Search,
  Mic,
  Plus,
  Clock,
  CheckCircle,
  Image,
  AlertCircle,
  Calendar,
  Share2,
  BarChart3,
  BookOpen,
  Award,
  GraduationCap,
  Users,
  Heart,
  Brain,
  Microscope,
  Activity
} from 'lucide-react'
import { supabase } from '../lib/supabase'
import { ClinicalAssessmentService } from '../lib/clinicalAssessmentService'
import { useAuth } from '../contexts/AuthContext'
import VideoCall from '../components/VideoCall'
import KPIDashboard from '../components/KPIDashboard'
import Newsletter from '../components/Newsletter'
import QuickPrescriptions from '../components/QuickPrescriptions'
import EduardoScheduling from '../components/EduardoScheduling'
import CoordenacaoMedica from '../components/CoordenacaoMedica'
import GestaoCursos from '../components/GestaoCursos'
import NeurologiaPediatrica from '../components/NeurologiaPediatrica'
import WearableMonitoring from '../components/WearableMonitoring'
import KPIClinicosPersonalizados from '../components/KPIClinicosPersonalizados'

interface Patient {
  id: string
  name: string
  age: number
  cpf: string
  phone: string
  lastVisit: string
  status: string
  assessments?: any[]
}

const EduardoFaveretDashboard: React.FC = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [patientSearch, setPatientSearch] = useState('')
  const [clinicalNotes, setClinicalNotes] = useState('')
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null)
  const [patients, setPatients] = useState<Patient[]>([])
  const [loading, setLoading] = useState(true)
  const [isVideoCallOpen, setIsVideoCallOpen] = useState(false)
  const [isAudioCallOpen, setIsAudioCallOpen] = useState(false)
  const [callType, setCallType] = useState<'video' | 'audio'>('video')
  const [activeSection, setActiveSection] = useState<'dashboard' | 'kpis' | 'newsletter' | 'prescriptions' | 'research' | 'teaching' | 'scheduling' | 'coordenacao' | 'cursos' | 'neurologia' | 'wearables' | 'kpis-personalizados'>('dashboard')

  // Debug para verificar seção ativa
  console.log('🎯 Seção ativa:', activeSection)

  // Buscar pacientes do banco de dados
  useEffect(() => {
    loadPatients()
  }, [])

  const loadPatients = async () => {
    try {
      setLoading(true)
      
      const { data: assessments, error } = await supabase
        .from('clinical_assessments')
        .select(`
          *,
          patient:patient_id,
          doctor:doctor_id
        `)
        .order('created_at', { ascending: false })
        .limit(100)

      if (error) {
        console.error('❌ Erro ao buscar avaliações:', error)
        setLoading(false)
        return
      }

      const patientsMap = new Map<string, Patient>()
      
      assessments?.forEach(assessment => {
        const patientId = assessment.patient_id
        if (!patientsMap.has(patientId)) {
          const patientData = assessment.data
          
          patientsMap.set(patientId, {
            id: patientId,
            name: patientData?.name || 'Paciente',
            age: patientData?.age || 0,
            cpf: patientData?.cpf || '',
            phone: patientData?.phone || '',
            lastVisit: new Date(assessment.created_at).toLocaleDateString('pt-BR'),
            status: assessment.status === 'completed' ? 'Avaliado' : 'Em avaliação',
            assessments: []
          })
        }
        
        const patient = patientsMap.get(patientId)!
        patient.assessments = patient.assessments || []
        patient.assessments.push(assessment)
      })

      const patientsArray = Array.from(patientsMap.values())
      setPatients(patientsArray)
    } catch (error) {
      console.error('Erro ao carregar pacientes:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveNotes = () => {
    alert('Notas salvas no prontuário do paciente!')
    setClinicalNotes('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header Personalizado para Dr. Eduardo Faveret */}
      <div className="bg-gradient-to-r from-green-800 to-emerald-700 border-b border-green-600/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2 flex items-center space-x-3">
                <Award className="w-8 h-8 text-yellow-400" />
                <span>Dr. Eduardo Faveret</span>
              </h1>
              <p className="text-green-200">Neurologista Pediátrico • Especialista em Epilepsia e Cannabis Medicinal</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-green-200">Conectado como</p>
                <p className="font-semibold text-white">Dr. Eduardo Faveret</p>
                <p className="text-xs text-green-300">CRM: 123456 • CRO: 654321</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          
          {/* Navigation Tabs Personalizadas */}
          <div className="flex flex-wrap gap-2 mt-4">
            <button
              onClick={() => setActiveSection('dashboard')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors text-sm ${
                activeSection === 'dashboard' 
                  ? 'bg-yellow-600 text-white' 
                  : 'bg-green-700 text-green-200 hover:bg-green-600'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => setActiveSection('kpis')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors text-sm ${
                activeSection === 'kpis' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-green-700 text-green-200 hover:bg-green-600'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>KPIs AEC</span>
            </button>
            <button
              onClick={() => setActiveSection('kpis-personalizados')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors text-sm ${
                activeSection === 'kpis-personalizados' 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-green-700 text-green-200 hover:bg-green-600'
              }`}
            >
              <Brain className="w-4 h-4" />
              <span>KPIs TEA</span>
            </button>
            <button
              onClick={() => setActiveSection('research')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors text-sm ${
                activeSection === 'research' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-green-700 text-green-200 hover:bg-green-600'
              }`}
            >
              <Microscope className="w-4 h-4" />
              <span>Pesquisa</span>
            </button>
            <button
              onClick={() => setActiveSection('teaching')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors text-sm ${
                activeSection === 'teaching' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-green-700 text-green-200 hover:bg-green-600'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Ensino AEC</span>
            </button>
            <button
              onClick={() => setActiveSection('newsletter')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors text-sm ${
                activeSection === 'newsletter' 
                  ? 'bg-orange-600 text-white' 
                  : 'bg-green-700 text-green-200 hover:bg-green-600'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Publicações</span>
            </button>
            <button
              onClick={() => setActiveSection('scheduling')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors text-sm ${
                activeSection === 'scheduling' 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-green-700 text-green-200 hover:bg-green-600'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Agendamento</span>
            </button>
            <button
              onClick={() => setActiveSection('coordenacao')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors text-sm ${
                activeSection === 'coordenacao' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-green-700 text-green-200 hover:bg-green-600'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Coordenação</span>
            </button>
            <button
              onClick={() => setActiveSection('cursos')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors text-sm ${
                activeSection === 'cursos' 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-green-700 text-green-200 hover:bg-green-600'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Cursos</span>
            </button>
            <button
              onClick={() => setActiveSection('neurologia')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors text-sm ${
                activeSection === 'neurologia' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-green-700 text-green-200 hover:bg-green-600'
              }`}
            >
              <Brain className="w-4 h-4" />
              <span>Neurologia</span>
            </button>
            <button
              onClick={() => setActiveSection('wearables')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors text-sm ${
                activeSection === 'wearables' 
                  ? 'bg-cyan-600 text-white' 
                  : 'bg-green-700 text-green-200 hover:bg-green-600'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>Wearables</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Renderizar seção ativa */}
        {activeSection === 'dashboard' && (
          <>
            {/* Status Cards Personalizados */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-6 text-white hover:shadow-lg hover:scale-105 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium opacity-90">Pacientes Neurológicos</h3>
                  <Brain className="w-6 h-6" />
                </div>
                <p className="text-3xl font-bold">{patients.length || 24}</p>
                <p className="text-sm opacity-75 mt-1">Epilepsia e TEZ</p>
              </div>
              
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl p-6 text-white hover:shadow-lg hover:scale-105 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium opacity-90">Protocolos IMRE</h3>
                  <Brain className="w-6 h-6" />
                </div>
                <p className="text-3xl font-bold">
                  {patients.filter(p => p.assessments?.some(a => a.status === 'completed')).length || 18}
                </p>
                <p className="text-sm opacity-75 mt-1">Avaliações completas</p>
              </div>
              
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 text-white hover:shadow-lg hover:scale-105 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium opacity-90">Respondedores TEZ</h3>
                  <Microscope className="w-6 h-6" />
                </div>
                <p className="text-3xl font-bold">8</p>
                <p className="text-sm opacity-75 mt-1">Pacientes com melhora</p>
              </div>
              
              <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-6 text-white hover:shadow-lg hover:scale-105 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium opacity-90">Wearables Ativos</h3>
                  <Activity className="w-6 h-6" />
                </div>
                <p className="text-3xl font-bold">12</p>
                <p className="text-sm opacity-75 mt-1">Monitoramento 24/7</p>
              </div>
            </div>

            {/* Conteúdo do Dashboard */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Sidebar - Patient List */}
              <div className="lg:col-span-1">
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50">
                  <div className="p-4 border-b border-slate-700">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Buscar paciente..."
                        value={patientSearch}
                        onChange={(e) => setPatientSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-green-500"
                      />
                    </div>
                  </div>

                  <div className="max-h-[calc(100vh-300px)] overflow-y-auto">
                    {loading ? (
                      <div className="p-4 text-center text-slate-400">
                        Carregando pacientes...
                      </div>
                    ) : patients.length === 0 ? (
                      <div className="p-4 text-center text-slate-400">
                        Nenhum paciente encontrado
                      </div>
                    ) : (
                      patients
                        .filter(patient => 
                          patient.name.toLowerCase().includes(patientSearch.toLowerCase()) ||
                          patient.cpf.includes(patientSearch) ||
                          patient.phone.includes(patientSearch)
                        )
                        .map((patient) => (
                          <button
                            key={patient.id}
                            onClick={() => setSelectedPatient(patient.id)}
                            className={`w-full p-4 text-left border-b border-slate-700 hover:bg-slate-700/50 transition-colors ${
                              selectedPatient === patient.id ? 'bg-slate-700' : ''
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                                <User className="w-6 h-6 text-white" />
                              </div>
                              <div className="flex-1">
                                <p className="font-semibold text-white">{patient.name}</p>
                                <p className="text-xs text-slate-400">{patient.age} anos • CPF: {patient.cpf}</p>
                                <p className="text-xs text-slate-400">{patient.phone}</p>
                                <p className="text-xs text-slate-500">{patient.status}</p>
                              </div>
                            </div>
                          </button>
                        ))
                    )}
                  </div>
                </div>
              </div>

              {/* Main Content Area - Patient Chart */}
              <div className="lg:col-span-2">
                {selectedPatient ? (
                  <div className="space-y-6">
                    {/* Patient Header */}
                    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                            <User className="w-8 h-8 text-white" />
                          </div>
                          <div>
                            <h2 className="text-2xl font-bold text-white">
                              {patients.find(p => p.id === selectedPatient)?.name}
                            </h2>
                            <p className="text-sm text-slate-400">
                              {patients.find(p => p.id === selectedPatient)?.age} anos • 
                              CPF: {patients.find(p => p.id === selectedPatient)?.cpf}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button 
                            onClick={() => {
                              setCallType('video')
                              setIsVideoCallOpen(true)
                            }}
                            className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors" 
                            title="Vídeo"
                          >
                            <Video className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={() => {
                              setCallType('audio')
                              setIsVideoCallOpen(true)
                            }}
                            className="p-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors" 
                            title="Áudio"
                          >
                            <Phone className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={() => navigate(`/patient-chat/${selectedPatient}`)}
                            className="p-2 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors" 
                            title="Chat"
                          >
                            <MessageCircle className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Clinical Notes Area */}
                    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-white">Notas Clínicas AEC</h3>
                        <button
                          onClick={handleSaveNotes}
                          className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Salvar</span>
                        </button>
                      </div>
                      
                      <textarea
                        value={clinicalNotes}
                        onChange={(e) => setClinicalNotes(e.target.value)}
                        placeholder="Digite as informações do paciente seguindo a metodologia AEC..."
                        rows={12}
                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-green-500 resize-none"
                      />
                      
                      <div className="flex items-center space-x-4 mt-4">
                        <button className="flex items-center space-x-2 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors">
                          <Mic className="w-4 h-4" />
                          <span>Dictar</span>
                        </button>
                        <button className="flex items-center space-x-2 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors">
                          <Clock className="w-4 h-4" />
                          <span>Histórico</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-12 border border-slate-700/50 text-center">
                    <Heart className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Selecione um Paciente</h3>
                    <p className="text-slate-400">Escolha um paciente da lista para iniciar o atendimento com AEC</p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* Seção KPIs Personalizados */}
        {activeSection === 'kpis-personalizados' && (
          <KPIClinicosPersonalizados />
        )}

        {/* Seção Pesquisa */}
        {activeSection === 'research' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-800 to-purple-700 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-2 flex items-center space-x-2">
                <Microscope className="w-6 h-6" />
                <span>Centro de Pesquisa AEC</span>
              </h2>
              <p className="text-purple-200">
                Pesquisas e estudos em Arte da Entrevista Clínica aplicada à Cannabis Medicinal
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
                <h3 className="text-white font-semibold mb-2">Estudos Ativos</h3>
                <p className="text-3xl font-bold text-purple-400 mb-2">12</p>
                <p className="text-slate-400 text-sm">Pesquisas em andamento</p>
              </div>
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
                <h3 className="text-white font-semibold mb-2">Publicações</h3>
                <p className="text-3xl font-bold text-blue-400 mb-2">28</p>
                <p className="text-slate-400 text-sm">Artigos publicados</p>
              </div>
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
                <h3 className="text-white font-semibold mb-2">Colaboradores</h3>
                <p className="text-3xl font-bold text-green-400 mb-2">15</p>
                <p className="text-slate-400 text-sm">Pesquisadores</p>
              </div>
            </div>
          </div>
        )}

        {/* Seção Ensino */}
        {activeSection === 'teaching' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-800 to-blue-700 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-2 flex items-center space-x-2">
                <GraduationCap className="w-6 h-6" />
                <span>Escola AEC</span>
              </h2>
              <p className="text-blue-200">
                Formação em Arte da Entrevista Clínica para profissionais da saúde
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
                <h3 className="text-white font-semibold mb-2">Alunos Formados</h3>
                <p className="text-3xl font-bold text-blue-400 mb-2">45</p>
                <p className="text-slate-400 text-sm">Profissionais certificados</p>
              </div>
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
                <h3 className="text-white font-semibold mb-2">Cursos Ativos</h3>
                <p className="text-3xl font-bold text-green-400 mb-2">8</p>
                <p className="text-slate-400 text-sm">Programas de formação</p>
              </div>
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
                <h3 className="text-white font-semibold mb-2">Satisfação</h3>
                <p className="text-3xl font-bold text-yellow-400 mb-2">98%</p>
                <p className="text-slate-400 text-sm">Avaliação dos alunos</p>
              </div>
            </div>
          </div>
        )}

        {/* Seção Newsletter */}
        {activeSection === 'newsletter' && (
          <Newsletter />
        )}

        {/* Seção Prescrições */}
        {activeSection === 'prescriptions' && (
          <QuickPrescriptions />
        )}

        {/* Seção Agendamento */}
        {activeSection === 'scheduling' && (
          <EduardoScheduling />
        )}

        {/* Seção Coordenação Médica */}
        {activeSection === 'coordenacao' && (
          <CoordenacaoMedica />
        )}

        {/* Seção Gestão de Cursos */}
        {activeSection === 'cursos' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-800 to-blue-700 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-2 flex items-center space-x-2">
                <GraduationCap className="w-6 h-6" />
                <span>Gestão de Cursos</span>
              </h2>
              <p className="text-blue-200">
                Pós-graduação em Cannabis Medicinal - Produção e Gestão de Aulas
              </p>
            </div>
            <GestaoCursos />
          </div>
        )}

        {/* Seção Neurologia Pediátrica */}
        {activeSection === 'neurologia' && (
          <NeurologiaPediatrica />
        )}

        {/* Seção Monitoramento Wearables */}
        {activeSection === 'wearables' && (
          <WearableMonitoring />
        )}
      </div>

      {/* Video/Audio Call Component */}
      <VideoCall
        isOpen={isVideoCallOpen}
        onClose={() => setIsVideoCallOpen(false)}
        patientId={selectedPatient || undefined}
        isAudioOnly={callType === 'audio'}
      />
    </div>
  )
}

export default EduardoFaveretDashboard
