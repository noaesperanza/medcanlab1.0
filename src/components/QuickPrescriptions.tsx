import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { 
  Prescription, 
  Plus, 
  Search, 
  Filter,
  FileText,
  Clock,
  User,
  Pill,
  Droplets,
  Zap,
  CheckCircle,
  AlertCircle
} from 'lucide-react'

interface PrescriptionTemplate {
  id: string
  name: string
  category: 'cannabis' | 'nefrologia' | 'sintomatico' | 'suporte'
  description: string
  dosage: string
  frequency: string
  duration: string
  indications: string[]
  contraindications: string[]
  monitoring: string[]
  lastUsed: string
  usageCount: number
}

interface QuickPrescriptionsProps {
  className?: string
}

const QuickPrescriptions: React.FC<QuickPrescriptionsProps> = ({ className = '' }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTemplate, setSelectedTemplate] = useState<PrescriptionTemplate | null>(null)

  // Templates de prescrição mockados
  const prescriptionTemplates: PrescriptionTemplate[] = [
    {
      id: '1',
      name: 'CBD para Dor Crônica Renal',
      category: 'cannabis',
      description: 'Protocolo de CBD para controle de dor em pacientes com doença renal crônica',
      dosage: '10-20mg',
      frequency: '2x ao dia',
      duration: '30 dias',
      indications: ['Dor crônica', 'Insônia', 'Ansiedade', 'Inflamação'],
      contraindications: ['Hipotensão', 'Interação com anticoagulantes'],
      monitoring: ['Pressão arterial', 'Função renal', 'Sintomas neurológicos'],
      lastUsed: '2024-01-10',
      usageCount: 15
    },
    {
      id: '2',
      name: 'THC para Náusea e Vômito',
      category: 'cannabis',
      description: 'Protocolo de THC para controle de náusea e vômito em pacientes renais',
      dosage: '2.5-5mg',
      frequency: 'Conforme necessário',
      duration: '15 dias',
      indications: ['Náusea', 'Vômito', 'Perda de apetite'],
      contraindications: ['Psicose', 'Ansiedade severa'],
      monitoring: ['Estado mental', 'Apetite', 'Náusea'],
      lastUsed: '2024-01-08',
      usageCount: 8
    },
    {
      id: '3',
      name: 'Cannabis para Espasmos Musculares',
      category: 'cannabis',
      description: 'Protocolo combinado CBD/THC para espasmos musculares em pacientes renais',
      dosage: 'CBD 15mg + THC 2.5mg',
      frequency: '3x ao dia',
      duration: '45 dias',
      indications: ['Espasmos musculares', 'Rigidez', 'Dor muscular'],
      contraindications: ['Sedação excessiva'],
      monitoring: ['Função motora', 'Sedação', 'Qualidade do sono'],
      lastUsed: '2024-01-05',
      usageCount: 12
    },
    {
      id: '4',
      name: 'Suporte Nutricional Renal',
      category: 'nefrologia',
      description: 'Protocolo nutricional para pacientes com doença renal crônica',
      dosage: 'Conforme prescrição',
      frequency: 'Diário',
      duration: 'Contínuo',
      indications: ['Desnutrição', 'Perda de peso', 'Fadiga'],
      contraindications: ['Hiperfosfatemia'],
      monitoring: ['Peso', 'Albuminemia', 'Fósforo'],
      lastUsed: '2024-01-12',
      usageCount: 25
    },
    {
      id: '5',
      name: 'Controle de Pressão Arterial',
      category: 'nefrologia',
      description: 'Protocolo para controle de pressão arterial em pacientes renais',
      dosage: 'Conforme prescrição',
      frequency: 'Conforme prescrição',
      duration: 'Contínuo',
      indications: ['Hipertensão', 'Proteinúria'],
      contraindications: ['Hipotensão'],
      monitoring: ['Pressão arterial', 'Função renal', 'Eletrólitos'],
      lastUsed: '2024-01-14',
      usageCount: 30
    },
    {
      id: '6',
      name: 'CBD para Ansiedade',
      category: 'sintomatico',
      description: 'Protocolo de CBD para controle de ansiedade em pacientes renais',
      dosage: '5-15mg',
      frequency: '2x ao dia',
      duration: '30 dias',
      indications: ['Ansiedade', 'Estresse', 'Insônia'],
      contraindications: ['Sedação excessiva'],
      monitoring: ['Estado mental', 'Sono', 'Ansiedade'],
      lastUsed: '2024-01-09',
      usageCount: 18
    }
  ]

  const filteredTemplates = prescriptionTemplates.filter(template => {
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'cannabis': return <Pill className="w-4 h-4" />
      case 'nefrologia': return <Droplets className="w-4 h-4" />
      case 'sintomatico': return <Zap className="w-4 h-4" />
      case 'suporte': return <CheckCircle className="w-4 h-4" />
      default: return <Prescription className="w-4 h-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'cannabis': return 'bg-green-600'
      case 'nefrologia': return 'bg-blue-600'
      case 'sintomatico': return 'bg-yellow-600'
      case 'suporte': return 'bg-purple-600'
      default: return 'bg-gray-600'
    }
  }

  const categories = [
    { key: 'all', label: 'Todos', icon: <Prescription className="w-4 h-4" /> },
    { key: 'cannabis', label: 'Cannabis', icon: <Pill className="w-4 h-4" /> },
    { key: 'nefrologia', label: 'Nefrologia', icon: <Droplets className="w-4 h-4" /> },
    { key: 'sintomatico', label: 'Sintomático', icon: <Zap className="w-4 h-4" /> },
    { key: 'suporte', label: 'Suporte', icon: <CheckCircle className="w-4 h-4" /> }
  ]

  const handlePrescribe = (template: PrescriptionTemplate) => {
    // Aqui você implementaria a lógica para gerar a prescrição
    console.log('Prescrevendo:', template.name)
    // Por exemplo, abrir um modal de prescrição ou navegar para uma página específica
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center space-x-2">
              <Prescription className="w-6 h-6" />
              <span>Prescrições Rápidas</span>
            </h2>
            <p className="text-slate-300">
              Templates de prescrição para Cannabis Medicinal e Nefrologia
            </p>
          </div>
          <Button className="bg-green-600 hover:bg-green-700">
            <Plus className="w-4 h-4 mr-2" />
            Nova Prescrição
          </Button>
        </div>

        {/* Filtros e busca */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Buscar prescrições..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-700 text-white px-10 py-2 rounded-md border border-slate-600 focus:border-green-500 focus:outline-none"
              />
            </div>
          </div>
          <div className="flex space-x-2">
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
      </div>

      {/* Grid de templates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="bg-slate-800 border-slate-700 hover:border-slate-600 transition-colors">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-white text-lg mb-2">
                    {template.name}
                  </CardTitle>
                  <p className="text-slate-400 text-sm">
                    {template.description}
                  </p>
                </div>
                <Badge className={`${getCategoryColor(template.category)} text-white`}>
                  {getCategoryIcon(template.category)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Informações básicas */}
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center space-x-2 text-slate-300">
                    <Pill className="w-3 h-3" />
                    <span>{template.dosage}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-300">
                    <Clock className="w-3 h-3" />
                    <span>{template.frequency}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-300">
                    <FileText className="w-3 h-3" />
                    <span>{template.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-300">
                    <User className="w-3 h-3" />
                    <span>{template.usageCount}x usado</span>
                  </div>
                </div>

                {/* Indicações */}
                <div>
                  <h4 className="text-slate-300 text-sm font-medium mb-2">Indicações:</h4>
                  <div className="flex flex-wrap gap-1">
                    {template.indications.slice(0, 3).map((indication) => (
                      <Badge key={indication} variant="outline" className="text-xs text-green-400 border-green-600">
                        {indication}
                      </Badge>
                    ))}
                    {template.indications.length > 3 && (
                      <Badge variant="outline" className="text-xs text-slate-400 border-slate-600">
                        +{template.indications.length - 3} mais
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Ações */}
                <div className="flex space-x-2 pt-2">
                  <Button 
                    onClick={() => handlePrescribe(template)}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    <Prescription className="w-4 h-4 mr-1" />
                    Prescrever
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-slate-300 border-slate-600 hover:bg-slate-700"
                  >
                    <FileText className="w-4 h-4" />
                  </Button>
                </div>

                {/* Último uso */}
                <div className="text-xs text-slate-500 pt-2 border-t border-slate-700">
                  Último uso: {new Date(template.lastUsed).toLocaleDateString('pt-BR')}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Estatísticas */}
      <Card className="bg-slate-800 border-slate-700">
        <CardContent className="p-4">
          <div className="flex items-center justify-between text-sm text-slate-400">
            <div className="flex items-center space-x-4">
              <span>📋 {filteredTemplates.length} templates disponíveis</span>
              <span>💊 Cobertura: Cannabis, Nefrologia, Sintomático</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>Atualização automática</span>
              <Badge variant="outline" className="text-xs text-green-400 border-green-600">
                <CheckCircle className="w-3 h-3 mr-1" />
                Ativo
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default QuickPrescriptions
