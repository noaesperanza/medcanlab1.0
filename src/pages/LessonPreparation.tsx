import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import { BookOpen, FileText, Users, Clock, Search, Plus, Video, Presentation } from 'lucide-react'

interface Case {
  id: string
  patient_name: string
  diagnosis: string
  created_at: string
  clinical_report: string
}

interface Lesson {
  id: string
  title: string
  description: string
  case_id?: string
  duration_minutes: number
  created_at: string
  status: 'draft' | 'published' | 'archived'
}

export function LessonPreparation() {
  const { user } = useAuth()
  const [cases, setCases] = useState<Case[]>([])
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showNewLesson, setShowNewLesson] = useState(false)

  useEffect(() => {
    loadCases()
    loadLessons()
  }, [])

  const loadCases = async () => {
    try {
      const { data } = await supabase
        .from('clinical_assessments')
        .select('*')
        .limit(20)
      
      if (data) {
        setCases(data.map(assessment => ({
          id: assessment.id,
          patient_name: assessment.patient_name || 'Paciente',
          diagnosis: assessment.diagnosis || 'Não especificado',
          created_at: assessment.created_at,
          clinical_report: assessment.clinical_report || ''
        })))
      }
    } catch (error) {
      console.error('Erro ao carregar casos:', error)
    }
  }

  const loadLessons = async () => {
    try {
      // Mock data para aulas
      const mockLessons: Lesson[] = [
        {
          id: '1',
          title: 'Cannabis Medicinal em Dor Crônica',
          description: 'Análise de caso clínico de paciente com dor crônica tratada com cannabis',
          case_id: 'case-1',
          duration_minutes: 45,
          created_at: new Date().toISOString(),
          status: 'published'
        },
        {
          id: '2',
          title: 'Sistema IMRE em Prática',
          description: 'Aplicação do método IMRE em caso de ansiedade',
          duration_minutes: 30,
          created_at: new Date().toISOString(),
          status: 'draft'
        }
      ]
      setLessons(mockLessons)
    } catch (error) {
      console.error('Erro ao carregar aulas:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredCases = cases.filter(caseItem =>
    caseItem.patient_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    caseItem.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredLessons = lessons.filter(lesson =>
    lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lesson.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              🎓 Preparação de Aulas
            </h1>
            <p className="text-gray-300">
              Crie aulas a partir de casos clínicos reais
            </p>
          </div>
          <button
            onClick={() => setShowNewLesson(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2"
          >
            <Plus size={20} />
            Nova Aula
          </button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar casos ou aulas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex gap-4 border-b border-slate-700">
            <button className="pb-3 px-4 text-blue-400 font-semibold border-b-2 border-blue-400">
              Casos Clínicos ({cases.length})
            </button>
            <button className="pb-3 px-4 text-gray-400 hover:text-white">
              Minhas Aulas ({lessons.length})
            </button>
          </div>
        </div>

        {/* Cases Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {loading ? (
            <div className="col-span-full text-center text-gray-400">Carregando casos...</div>
          ) : filteredCases.length > 0 ? (
            filteredCases.map((caseItem) => (
              <div
                key={caseItem.id}
                className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-blue-500 transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">
                      {caseItem.patient_name}
                    </h3>
                    <p className="text-sm text-gray-400">{caseItem.diagnosis}</p>
                  </div>
                  <FileText className="text-blue-400" size={24} />
                </div>
                
                <p className="text-sm text-gray-300 mb-4 line-clamp-3">
                  {caseItem.clinical_report || 'Sem descrição disponível'}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>Jan 2025</span>
                  </div>
                  <button className="text-blue-400 hover:text-blue-300 font-semibold">
                    Criar Aula →
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-400">
              Nenhum caso encontrado
            </div>
          )}
        </div>

        {/* Lessons */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Minhas Aulas</h2>
          <div className="space-y-4">
            {filteredLessons.map((lesson) => (
              <div
                key={lesson.id}
                className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-blue-500 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                      <Presentation className="text-white" size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">{lesson.title}</h3>
                      <p className="text-sm text-gray-300">{lesson.description}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    lesson.status === 'published' 
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {lesson.status === 'published' ? 'Publicada' : 'Rascunho'}
                  </span>
                </div>

                <div className="flex items-center gap-6 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span>{lesson.duration_minutes} min</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Video size={16} />
                    <span>Com vídeo</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={16} />
                    <span>0 alunos</span>
                  </div>
                </div>

                <div className="flex gap-3 mt-4">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold text-sm">
                    Editar
                  </button>
                  <button className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-lg font-semibold text-sm">
                    Visualizar
                  </button>
                  <button className="px-4 bg-slate-700 hover:bg-red-600 text-white py-2 rounded-lg text-sm">
                    Deletar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
