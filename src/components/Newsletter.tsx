import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { 
  BookOpen, 
  Calendar, 
  ExternalLink, 
  Star,
  TrendingUp,
  Users,
  FileText,
  Microscope,
  Heart,
  Brain
} from 'lucide-react'

interface NewsItem {
  id: string
  title: string
  summary: string
  author: string
  date: string
  category: 'pesquisa' | 'clinica' | 'farmacologia' | 'nefrologia'
  readTime: string
  impact: 'high' | 'medium' | 'low'
  source: string
  url: string
  tags: string[]
}

interface NewsletterProps {
  className?: string
}

const Newsletter: React.FC<NewsletterProps> = ({ className = '' }) => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [isLoading, setIsLoading] = useState(true)

  // Dados mockados para demonstração
  const mockNewsItems: NewsItem[] = [
    {
      id: '1',
      title: 'Novos Protocolos de Cannabis Medicinal para Pacientes Renais',
      summary: 'Estudo multicêntrico demonstra eficácia de protocolos personalizados de cannabis medicinal em pacientes com doença renal crônica, mostrando redução de 40% nos sintomas de dor e melhora na qualidade de vida.',
      author: 'Dr. Eduardo Faveret et al.',
      date: '2024-01-15',
      category: 'nefrologia',
      readTime: '8 min',
      impact: 'high',
      source: 'Journal of Nephrology & Cannabis Medicine',
      url: '#',
      tags: ['cannabis', 'nefrologia', 'protocolos', 'dor crônica']
    },
    {
      id: '2',
      title: 'Análise Semântica de Relatórios Clínicos com IA',
      summary: 'Pesquisa inovadora utiliza processamento de linguagem natural para extrair insights clínicos de relatórios médicos, aumentando a precisão diagnóstica em 25%.',
      author: 'Dr. Maria Silva et al.',
      date: '2024-01-12',
      category: 'pesquisa',
      readTime: '6 min',
      impact: 'high',
      source: 'Nature Medicine AI',
      url: '#',
      tags: ['IA', 'NLP', 'diagnóstico', 'semântica']
    },
    {
      id: '3',
      title: 'Farmacocinética do CBD em Pacientes com Insuficiência Renal',
      summary: 'Estudo farmacológico detalhado sobre a metabolização do CBD em pacientes renais, estabelecendo diretrizes para dosagem segura e eficaz.',
      author: 'Dr. João Santos et al.',
      date: '2024-01-10',
      category: 'farmacologia',
      readTime: '10 min',
      impact: 'medium',
      source: 'Clinical Pharmacology & Therapeutics',
      url: '#',
      tags: ['CBD', 'farmacocinética', 'dosagem', 'segurança']
    },
    {
      id: '4',
      title: 'Arte da Entrevista Clínica: Metodologia Aplicada à Cannabis',
      summary: 'Desenvolvimento de protocolo específico para entrevistas clínicas em cannabis medicinal, integrando abordagem humanizada com evidências científicas.',
      author: 'Dr. Ricardo Valença et al.',
      date: '2024-01-08',
      category: 'clinica',
      readTime: '7 min',
      impact: 'high',
      source: 'Cannabis Clinical Practice',
      url: '#',
      tags: ['entrevista clínica', 'metodologia', 'humanização', 'AEC']
    },
    {
      id: '5',
      title: 'Biomarcadores de Resposta ao Tratamento com Cannabis',
      summary: 'Identificação de biomarcadores específicos que predizem resposta positiva ao tratamento com cannabis medicinal, personalizando abordagens terapêuticas.',
      author: 'Dr. Ana Costa et al.',
      date: '2024-01-05',
      category: 'pesquisa',
      readTime: '9 min',
      impact: 'medium',
      source: 'Biomarkers in Medicine',
      url: '#',
      tags: ['biomarcadores', 'personalização', 'terapia', 'predição']
    },
    {
      id: '6',
      title: 'Qualidade de Vida em Pacientes Renais: Impacto da Cannabis',
      summary: 'Avaliação longitudinal da qualidade de vida em pacientes renais utilizando cannabis medicinal, com follow-up de 12 meses.',
      author: 'Dr. Pedro Oliveira et al.',
      date: '2024-01-03',
      category: 'clinica',
      readTime: '5 min',
      impact: 'medium',
      source: 'Quality of Life Research',
      url: '#',
      tags: ['qualidade de vida', 'longitudinal', 'follow-up', 'avaliação']
    }
  ]

  useEffect(() => {
    loadNewsItems()
  }, [selectedCategory])

  const loadNewsItems = async () => {
    setIsLoading(true)
    try {
      // Simular carregamento
      await new Promise(resolve => setTimeout(resolve, 1000))
      const filteredItems = selectedCategory === 'all' 
        ? mockNewsItems 
        : mockNewsItems.filter(item => item.category === selectedCategory)
      setNewsItems(filteredItems)
    } catch (error) {
      console.error('Erro ao carregar newsletter:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'pesquisa': return <Microscope className="w-4 h-4" />
      case 'clinica': return <Heart className="w-4 h-4" />
      case 'farmacologia': return <Brain className="w-4 h-4" />
      case 'nefrologia': return <Users className="w-4 h-4" />
      default: return <FileText className="w-4 h-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'pesquisa': return 'bg-purple-600'
      case 'clinica': return 'bg-green-600'
      case 'farmacologia': return 'bg-blue-600'
      case 'nefrologia': return 'bg-orange-600'
      default: return 'bg-gray-600'
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-500'
      case 'medium': return 'text-yellow-500'
      case 'low': return 'text-green-500'
      default: return 'text-gray-500'
    }
  }

  const categories = [
    { key: 'all', label: 'Todos', icon: <FileText className="w-4 h-4" /> },
    { key: 'pesquisa', label: 'Pesquisa', icon: <Microscope className="w-4 h-4" /> },
    { key: 'clinica', label: 'Clínica', icon: <Heart className="w-4 h-4" /> },
    { key: 'farmacologia', label: 'Farmacologia', icon: <Brain className="w-4 h-4" /> },
    { key: 'nefrologia', label: 'Nefrologia', icon: <Users className="w-4 h-4" /> }
  ]

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center space-x-2">
              <BookOpen className="w-6 h-6" />
              <span>Newsletter Científico</span>
            </h2>
            <p className="text-slate-300">
              Últimas pesquisas e descobertas em Cannabis Medicinal e Nefrologia
            </p>
          </div>
          <Badge variant="outline" className="text-slate-300 border-slate-500">
            <TrendingUp className="w-3 h-3 mr-1" />
            Atualizado hoje
          </Badge>
        </div>

        {/* Filtros por categoria */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category.key}
              onClick={() => setSelectedCategory(category.key)}
              variant={selectedCategory === category.key ? 'default' : 'outline'}
              size="sm"
              className={`flex items-center space-x-1 ${
                selectedCategory === category.key 
                  ? 'bg-green-600 hover:bg-green-700' 
                  : 'text-slate-300 border-slate-600 hover:bg-slate-700'
              }`}
            >
              {category.icon}
              <span>{category.label}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Lista de artigos */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="bg-slate-800 border-slate-700 animate-pulse">
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="h-4 bg-slate-700 rounded w-3/4"></div>
                  <div className="h-3 bg-slate-700 rounded w-1/2"></div>
                  <div className="h-3 bg-slate-700 rounded w-2/3"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {newsItems.map((item) => (
            <Card key={item.id} className="bg-slate-800 border-slate-700 hover:border-slate-600 transition-colors">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-white text-lg mb-2 hover:text-green-400 transition-colors cursor-pointer">
                      {item.title}
                    </CardTitle>
                    <div className="flex items-center space-x-4 text-sm text-slate-400">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(item.date).toLocaleDateString('pt-BR')}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FileText className="w-3 h-3" />
                        <span>{item.readTime}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className={`w-3 h-3 ${getImpactColor(item.impact)}`} />
                        <span className={getImpactColor(item.impact)}>
                          {item.impact === 'high' ? 'Alto Impacto' : 
                           item.impact === 'medium' ? 'Médio Impacto' : 'Baixo Impacto'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Badge className={`${getCategoryColor(item.category)} text-white`}>
                    {getCategoryIcon(item.category)}
                    <span className="ml-1 capitalize">{item.category}</span>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 mb-4 leading-relaxed">
                  {item.summary}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs text-slate-400 border-slate-600">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-slate-400 text-sm">{item.author}</span>
                    <Button size="sm" variant="outline" className="text-slate-300 border-slate-600 hover:bg-slate-700">
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Ler
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Footer com estatísticas */}
      <Card className="bg-slate-800 border-slate-700">
        <CardContent className="p-4">
          <div className="flex items-center justify-between text-sm text-slate-400">
            <div className="flex items-center space-x-4">
              <span>📚 {newsItems.length} artigos disponíveis</span>
              <span>🔬 Cobertura: Pesquisa, Clínica, Farmacologia, Nefrologia</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>Atualização automática a cada 24h</span>
              <Badge variant="outline" className="text-xs text-green-400 border-green-600">
                Ativo
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Newsletter
