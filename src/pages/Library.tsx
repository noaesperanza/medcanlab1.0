import React, { useState, useEffect } from 'react'
import { 
  Search, 
  Eye, 
  FileText, 
  Star,
  Upload,
  X,
  Image as ImageIcon,
  BookOpen,
  FileText as ReportIcon,
  Brain,
  Users,
  GraduationCap,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import { supabase } from '../lib/supabase'

const Library: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedType, setSelectedType] = useState('all')
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [uploadCategory, setUploadCategory] = useState('ai-residente')
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [realDocuments, setRealDocuments] = useState<any[]>([])
  const [isLoadingDocuments, setIsLoadingDocuments] = useState(true)
  const [totalDocs, setTotalDocs] = useState(0)

  const categories = [
    { id: 'all', name: 'Todos', count: totalDocs },
    { id: 'methodology', name: 'Metodologia', count: 0 },
    { id: 'research', name: 'Pesquisa', count: 0 },
    { id: 'protocols', name: 'Protocolos', count: 0 },
    { id: 'guidelines', name: 'Diretrizes', count: 0 },
    { id: 'case-studies', name: 'Casos Clínicos', count: 0 }
  ]

  const documentTypes = [
    { id: 'all', name: 'Todos os Tipos', icon: '📁' },
    { id: 'pdf', name: 'PDF', icon: '📄' },
    { id: 'video', name: 'Vídeo', icon: '🎥' },
    { id: 'image', name: 'Imagem', icon: '🖼️' },
    { id: 'book', name: 'Livro', icon: '📚' }
  ]

  const documents = [
    {
      id: 1,
      title: 'Metodologia AEC - Arte da Entrevista Clínica',
      description: 'Guia completo sobre a metodologia AEC para entrevistas clínicas humanizadas',
      category: 'methodology',
      type: 'pdf',
      size: '2.4 MB',
      uploadDate: '2025-01-10',
      author: 'Dr. Eduardo Faveret',
      downloads: 1247,
      rating: 4.9,
      tags: ['AEC', 'Entrevista', 'Humanização'],
      isLinkedToAI: true,
      thumbnail: '/api/placeholder/200/150'
    },
    {
      id: 2,
      title: 'Protocolo de Avaliação IMRE Triaxial',
      description: 'Protocolo completo para avaliação clínica com sistema IMRE de 28 blocos',
      category: 'protocols',
      type: 'pdf',
      size: '1.8 MB',
      uploadDate: '2025-01-08',
      author: 'Dra. Maria Santos',
      downloads: 892,
      rating: 4.8,
      tags: ['IMRE', 'Avaliação', 'Protocolo'],
      isLinkedToAI: true,
      thumbnail: '/api/placeholder/200/150'
    },
    {
      id: 3,
      title: 'Cannabis Medicinal - Evidências Científicas',
      description: 'Revisão sistemática das evidências científicas sobre cannabis medicinal',
      category: 'research',
      type: 'pdf',
      size: '3.2 MB',
      uploadDate: '2025-01-05',
      author: 'Dr. Carlos Oliveira',
      downloads: 634,
      rating: 4.7,
      tags: ['Cannabis', 'Pesquisa', 'Evidências'],
      isLinkedToAI: false,
      thumbnail: '/api/placeholder/200/150'
    },
    {
      id: 4,
      title: 'Aula 1: Introdução à Entrevista Clínica',
      description: 'Vídeo-aula introdutória sobre técnicas de entrevista clínica',
      category: 'methodology',
      type: 'video',
      size: '45 MB',
      uploadDate: '2025-01-03',
      author: 'Dra. Ana Costa',
      downloads: 456,
      rating: 4.6,
      tags: ['Vídeo', 'Aula', 'Entrevista'],
      isLinkedToAI: true,
      thumbnail: '/api/placeholder/200/150'
    },
    {
      id: 5,
      title: 'Diretrizes de Prescrição de Cannabis',
      description: 'Diretrizes oficiais para prescrição de cannabis medicinal no Brasil',
      category: 'guidelines',
      type: 'pdf',
      size: '1.5 MB',
      uploadDate: '2025-01-01',
      author: 'ANVISA',
      downloads: 789,
      rating: 4.9,
      tags: ['Diretrizes', 'Cannabis', 'Prescrição'],
      isLinkedToAI: true,
      thumbnail: '/api/placeholder/200/150'
    },
    {
      id: 6,
      title: 'Atlas de Anatomia Renal',
      description: 'Atlas completo com imagens detalhadas da anatomia renal',
      category: 'research',
      type: 'image',
      size: '8.7 MB',
      uploadDate: '2024-12-28',
      author: 'Dr. Pedro Lima',
      downloads: 234,
      rating: 4.5,
      tags: ['Anatomia', 'Rim', 'Atlas'],
      isLinkedToAI: false,
      thumbnail: '/api/placeholder/200/150'
    }
  ]

  // Usar documentos reais se existirem, senão usar mock data
  const displayDocuments = realDocuments.length > 0 ? realDocuments : documents

  const filteredDocuments = displayDocuments.filter((doc: any) => {
    // Filtro de busca
    const matchesSearch = searchTerm === '' || 
                         doc.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.summary?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.keywords?.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    // Filtro de categoria - documentos reais não têm category, então sempre retorna true se não for mock
    const matchesCategory = selectedCategory === 'all' || !doc.category || doc.category === selectedCategory
    
    // Filtro de tipo
    const matchesType = selectedType === 'all' || doc.file_type === selectedType || doc.type === selectedType
    
    return matchesSearch && matchesCategory && matchesType
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <span className="text-red-500 text-xl">📄</span>
      case 'video':
        return <span className="text-blue-500 text-xl">🎥</span>
      case 'image':
        return <span className="text-green-500 text-xl">🖼️</span>
      case 'book':
        return <span className="text-purple-500 text-xl">📚</span>
      default:
        return <span className="text-gray-500 text-xl">📁</span>
    }
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Data não disponível'
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR')
  }

  const formatFileSize = (bytes: number) => {
    if (!bytes) return 'Tamanho não disponível'
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
  }

  const handleUpload = async () => {
    if (!uploadedFile) return

    setIsUploading(true)
    setUploadProgress(0)

    try {
      // Simular progresso de upload
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 200)

      // Aqui você pode adicionar a lógica de upload para Supabase Storage
      // Por exemplo, upload para bucket específico baseado na categoria
      const fileExt = uploadedFile.name.split('.').pop()
      const fileName = `${Date.now()}.${fileExt}`
      const bucketName = uploadCategory === 'ai-avatar' ? 'avatar' : 'documents'

      // Upload para Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(fileName, uploadedFile)

      if (uploadError) throw uploadError

      // Se for o avatar da IA, atualizar a referência e emitir evento
      if (uploadCategory === 'ai-avatar') {
        const { data: { publicUrl } } = supabase.storage
          .from('avatar')
          .getPublicUrl(fileName)
        
        console.log('✅ Avatar enviado com sucesso!')
        console.log('Nome do arquivo:', fileName)
        console.log('URL pública:', publicUrl)
        
        // Emitir evento personalizado para notificar outros componentes
        const event = new CustomEvent('avatarUpdated', { 
          detail: { url: publicUrl } 
        })
        console.log('📢 Disparando evento avatarUpdated com URL:', publicUrl)
        window.dispatchEvent(event)
        
        // Aviso visual
        setTimeout(() => {
          alert('Avatar atualizado! A página de chat será atualizada automaticamente.')
        }, 500)
      }

      clearInterval(progressInterval)
      setUploadProgress(100)
      setUploadSuccess(true)

      setTimeout(() => {
        setShowUploadModal(false)
        setUploadedFile(null)
        setUploadProgress(0)
        setUploadSuccess(false)
      }, 2000)
    } catch (error) {
      console.error('Erro ao fazer upload:', error)
      alert('Erro ao fazer upload. Tente novamente.')
    } finally {
      setIsUploading(false)
    }
  }

  const uploadCategories = [
    {
      id: 'ai-avatar',
      name: 'Avatar IA Residente',
      description: 'Imagem do avatar da Nôa Esperança',
      icon: <Brain className="w-5 h-5" />,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'ai-documents',
      name: 'Documentos IA Residente',
      description: 'Documentos vinculados à base de conhecimento da IA',
      icon: <Brain className="w-5 h-5" />,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'student',
      name: 'Materiais para Alunos',
      description: 'Aulas, cursos e material didático',
      icon: <GraduationCap className="w-5 h-5" />,
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'professional',
      name: 'Prescrições e Protocolos',
      description: 'Documentos para profissionais de saúde',
      icon: <FileText className="w-5 h-5" />,
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'reports',
      name: 'Relatórios e Análises',
      description: 'Relatórios clínicos e análises',
      icon: <ReportIcon className="w-5 h-5" />,
      color: 'from-indigo-500 to-purple-500'
    },
    {
      id: 'research',
      name: 'Artigos Científicos',
      description: 'Pesquisas e evidências científicas',
      icon: <BookOpen className="w-5 h-5" />,
      color: 'from-amber-500 to-yellow-500'
    }
  ]

  // Carregar documentos reais do Supabase
  useEffect(() => {
    const loadDocuments = async () => {
      try {
        const { data, error, count } = await supabase
          .from('documents')
          .select('*', { count: 'exact' })
          .order('created_at', { ascending: false })
        
        if (error) {
          console.error('Erro ao carregar documentos:', error)
          return
        }
        
        if (data && data.length > 0) {
          // Remover duplicatas baseado no título
          const uniqueDocuments = data.filter((doc, index, self) =>
            index === self.findIndex(d => d.title === doc.title)
          )
          
          setRealDocuments(uniqueDocuments)
          setTotalDocs(uniqueDocuments.length)
          const totalCount = count || data.length
          console.log(`✅ ${uniqueDocuments.length} documentos únicos carregados do Supabase (${totalCount} totais, ${totalCount - uniqueDocuments.length} duplicatas removidas)`)
        }
      } catch (error) {
        console.error('Erro:', error)
      } finally {
        setIsLoadingDocuments(false)
      }
    }
    
    loadDocuments()
  }, [])

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white dark:text-slate-100 mb-2">
            Biblioteca Geral
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Acesse documentos, protocolos, pesquisas e recursos educacionais
          </p>
        </div>

        {/* Search and Filters */}
        <div className="card p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar documentos..."
                  value={searchTerm}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-slate-200/50 dark:bg-slate-700/80 text-slate-900 dark:text-white dark:text-slate-100"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="lg:w-64">
              <select
                value={selectedCategory}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-slate-200/50 dark:bg-slate-700/80 text-slate-900 dark:text-white dark:text-slate-100"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name} ({category.count})
                  </option>
                ))}
              </select>
            </div>

            {/* Type Filter */}
            <div className="lg:w-48">
              <select
                value={selectedType}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-slate-200/50 dark:bg-slate-700/80 text-slate-900 dark:text-white dark:text-slate-100"
              >
                {documentTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Upload Button */}
            <button 
              onClick={() => setShowUploadModal(true)}
              className="btn-primary flex items-center justify-center"
            >
              <Upload className="w-5 h-5 mr-2" />
              Upload
            </button>
          </div>
        </div>

        {/* Documents Grid - Compact Version */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredDocuments.map((doc) => (
            <div key={doc.id} className="card card-hover overflow-hidden">
              {/* Document Thumbnail - Compact */}
              <div className="relative h-24 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-3xl">
                    {getTypeIcon(doc.file_type || doc.type)}
                  </div>
                </div>
                {doc.isLinkedToAI === true && (
                  <div className="absolute top-1 right-1">
                    <div className="bg-primary-500 text-slate-900 dark:text-white px-1.5 py-0.5 rounded-full text-xs font-medium">
                      IA
                    </div>
                  </div>
                )}
              </div>

              {/* Document Content - Compact */}
              <div className="p-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
                {/* Title - Single line */}
                <h3 className="text-sm font-semibold text-slate-800 dark:text-white mb-1 line-clamp-1">
                  {doc.title}
                </h3>
                
                {/* Author and Date in one line */}
                <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 mb-2">
                  <span>{doc.author || 'Autor não disponível'}</span>
                  <span>{formatDate(doc.created_at || doc.uploadDate)}</span>
                </div>

                {/* Tags - Compact */}
                <div className="flex flex-wrap gap-1 mb-2">
                  {(doc.tags || doc.keywords || []).slice(0, 2).map((tag: string, index: number) => (
                    <span
                      key={index}
                      className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Stats - Compact */}
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
                  <span>{formatFileSize(doc.file_size || doc.size)}</span>
                  <span className="flex items-center">
                    <span className="mr-1">⬇️</span>
                    {doc.downloads || '0'}
                  </span>
                  <span className="flex items-center">
                    <Star className="w-3 h-3 mr-0.5 text-yellow-500 fill-yellow-500" />
                    {doc.rating || '4.8'}
                  </span>
                </div>

                {/* Actions - Compact */}
                <div className="flex space-x-1">
                  <button className="flex-1 bg-primary-600 hover:bg-primary-700 text-slate-900 dark:text-white py-1.5 px-2 rounded text-xs transition-colors duration-200">
                    Baixar
                  </button>
                  <button className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 py-1.5 px-2 rounded transition-colors duration-200">
                    <Eye className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredDocuments.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 text-gray-400 mx-auto mb-4 text-4xl">📁</div>
            <h3 className="text-lg font-medium text-slate-900 dark:text-white dark:text-slate-100 mb-2">
              Nenhum documento encontrado
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Tente ajustar os filtros ou fazer uma nova busca
            </p>
          </div>
        )}

        {/* Quick Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="card p-6 text-center">
            <FileText className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-slate-900 dark:text-white dark:text-slate-100">
              {totalDocs > 0 ? totalDocs : '1,247'}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              {totalDocs > 0 ? 'Documentos Reais' : 'Documentos (Fictício)'}
            </div>
          </div>
          <div className="card p-6 text-center">
            <div className="w-8 h-8 text-green-600 mx-auto mb-2 text-2xl">⬇️</div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white dark:text-slate-100">15,234</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Downloads (Fictício)</div>
          </div>
          <div className="card p-6 text-center">
            <div className="w-8 h-8 text-purple-600 mx-auto mb-2 text-2xl">#</div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white dark:text-slate-100">
              {realDocuments.filter((d: any) => d.isLinkedToAI).length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              {realDocuments.length > 0 ? 'Vinculados à IA' : 'Vinculados à IA (Fictício)'}
            </div>
          </div>
          <div className="card p-6 text-center">
            <Star className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-slate-900 dark:text-white dark:text-slate-100">4.8</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Avaliação Média (Fictício)</div>
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-700">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Upload de Documentos</h2>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Upload Categories */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-300 mb-3">
                  Selecione a Categoria do Upload
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {uploadCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setUploadCategory(category.id)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        uploadCategory === category.id
                          ? 'border-purple-500 bg-purple-500/10'
                          : 'border-slate-600 hover:border-slate-500 bg-slate-700/50'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center mb-3 text-white`}>
                        {category.icon}
                      </div>
                      <h3 className="font-semibold text-white text-sm mb-1">
                        {category.name}
                      </h3>
                      <p className="text-xs text-slate-400">
                        {category.description}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* File Upload Area */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-300 mb-3">
                  Selecione o Arquivo
                </label>
                <div className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center hover:border-purple-500 transition-colors">
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) setUploadedFile(file)
                    }}
                    accept={uploadCategory === 'ai-avatar' ? 'image/*' : '*'}
                  />
                  {uploadedFile ? (
                    <div className="space-y-3">
                      <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                      <div>
                        <p className="text-white font-medium">{uploadedFile.name}</p>
                        <p className="text-sm text-slate-400">
                          {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      <button
                        onClick={() => setUploadedFile(null)}
                        className="text-sm text-red-400 hover:text-red-300"
                      >
                        Remover arquivo
                      </button>
                    </div>
                  ) : (
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer"
                    >
                      <Upload className="w-16 h-16 text-slate-400 mx-auto mb-3" />
                      <p className="text-white font-medium mb-1">
                        Clique para selecionar ou arraste o arquivo
                      </p>
                      <p className="text-sm text-slate-400">
                        {uploadCategory === 'ai-avatar' ? 'PNG, JPG ou SVG (recomendado: PNG, 512x512px)' : 'PDF, DOCX, MP4, Imagens, etc.'}
                      </p>
                    </label>
                  )}
                </div>
              </div>

              {/* Upload Progress */}
              {isUploading && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-300">Enviando...</span>
                    <span className="text-sm text-slate-300">{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Success Message */}
              {uploadSuccess && (
                <div className="mb-6 p-4 bg-green-500/10 border border-green-500 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                    <div>
                      <p className="font-medium text-green-400">Upload concluído com sucesso!</p>
                      <p className="text-sm text-slate-300">
                        {uploadCategory === 'ai-avatar' 
                          ? 'O avatar da IA residente foi atualizado.' 
                          : 'O documento foi adicionado à biblioteca.'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Modal Actions */}
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleUpload}
                  disabled={!uploadedFile || isUploading}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isUploading ? 'Enviando...' : 'Fazer Upload'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Library
