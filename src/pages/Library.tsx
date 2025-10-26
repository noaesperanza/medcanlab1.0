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
  AlertCircle,
  User,
  Heart
} from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

const Library: React.FC = () => {
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedUserType, setSelectedUserType] = useState('all') // Novo filtro
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [uploadCategory, setUploadCategory] = useState('ai-residente')
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [realDocuments, setRealDocuments] = useState<any[]>([])
  const [isLoadingDocuments, setIsLoadingDocuments] = useState(true)
  const [totalDocs, setTotalDocs] = useState(0)

  // Tipos de usuário
  const userTypes = [
    { id: 'all', name: 'Todos os Usuários', icon: Users, color: 'blue' },
    { id: 'student', name: 'Alunos', icon: GraduationCap, color: 'green' },
    { id: 'professional', name: 'Profissionais', icon: User, color: 'purple' },
    { id: 'patient', name: 'Pacientes', icon: Heart, color: 'red' }
  ]

  // Categorias: IA, Protocolos, Pesquisa, Casos, Multimídia
  const categories = [
    { id: 'all', name: 'Todos', icon: '📚', count: totalDocs },
    { id: 'ai-documents', name: 'IA Residente', icon: '🧠', count: 0 },
    { id: 'protocols', name: 'Protocolos', icon: '📖', count: 0 },
    { id: 'research', name: 'Pesquisa', icon: '🔬', count: 0 },
    { id: 'cases', name: 'Casos', icon: '📊', count: 0 },
    { id: 'multimedia', name: 'Multimídia', icon: '🎥', count: 0 }
  ]

  // Áreas: Cannabis, IMRE, Clínica, Gestão
  const knowledgeAreas = [
    { id: 'all', name: 'Todas', icon: '🌐', color: 'slate' },
    { id: 'cannabis', name: 'Cannabis', icon: '🌿', color: 'green' },
    { id: 'imre', name: 'IMRE', icon: '🧬', color: 'purple' },
    { id: 'clinical', name: 'Clínica', icon: '🏥', color: 'blue' },
    { id: 'research', name: 'Gestão', icon: '📈', color: 'orange' }
  ]

  const [selectedArea, setSelectedArea] = useState('all')

  const documentTypes = [
    { id: 'all', name: 'Todos os Tipos', icon: '📁' },
    { id: 'pdf', name: 'PDF', icon: '📄' },
    { id: 'video', name: 'Vídeo', icon: '🎥' },
    { id: 'image', name: 'Imagem', icon: '🖼️' },
    { id: 'book', name: 'Livro', icon: '📚' }
  ]

  // Contar documentos por categoria
  const getCategoryCount = (categoryId: string) => {
    if (categoryId === 'all') return realDocuments.length
    const filtered = realDocuments.filter((doc: any) => {
      // Verificar se o documento pertence à categoria
      if (categoryId === 'ai-documents') {
        // IA Residente: incluir todos os documentos que estão vinculados à IA OU têm categoria ai-documents
        const isAILinked = doc.isLinkedToAI === true
        const isAICategory = doc.category === 'ai-documents'
        const hasAITags = doc.tags && (doc.tags.includes('ai-documents') || doc.tags.includes('upload'))
        const hasAIKeywords = doc.keywords && doc.keywords.some((k: string) => k === 'ai-documents')
        
        const matches = isAILinked || isAICategory || hasAITags || hasAIKeywords
        return matches
      }
      // Para outras categorias, verificar category OU tags/keywords
      return doc.category === categoryId || 
             (doc.tags && doc.tags.includes(categoryId)) ||
             (doc.keywords && doc.keywords.some((k: string) => k === categoryId))
          })
    return filtered.length
  }

  // Atualizar contadores das categorias
  const categoriesWithCount = categories.map(cat => ({
    ...cat,
    count: getCategoryCount(cat.id)
  }))

  // Debug logs comentados
  // console.log('📊 Contadores de categorias:', categoriesWithCount)
  // console.log('📚 Documentos reais completos:', realDocuments)

  // Usar apenas documentos reais do banco de dados
  const filteredDocuments = realDocuments.filter((doc: any) => {
    // Filtro de busca
    const matchesSearch = searchTerm === '' || 
                         doc.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.summary?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.keywords?.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    // Filtro de categoria - verificar category, isLinkedToAI, tags ou keywords
    let matchesCategory = true
    if (selectedCategory !== 'all') {
      if (selectedCategory === 'ai-documents') {
        // Para IA Residente, verificar múltiplos critérios
        matchesCategory = doc.isLinkedToAI === true || 
                         doc.category === 'ai-documents' ||
                         (doc.tags && doc.tags.includes('ai-documents')) ||
                         (doc.keywords && doc.keywords.some((k: string) => k === 'ai-documents')) ||
                         (doc.tags && doc.tags.includes('upload')) // Documentos enviados via upload
      } else {
        // Para outras categorias, verificar category OU tags/keywords
        matchesCategory = doc.category === selectedCategory ||
                         (doc.tags && doc.tags.includes(selectedCategory)) ||
                         (doc.keywords && doc.keywords.some((k: string) => k === selectedCategory))
      }
    }
    
    // Filtro de tipo de arquivo
    const matchesType = selectedType === 'all' || doc.file_type === selectedType || doc.type === selectedType
    
    // Filtro de tipo de usuário - procurar no target_audience, user_type ou tags
    const docUserType = doc.target_audience || doc.user_type || doc.tags
    const matchesUserType = selectedUserType === 'all' || 
                          (docUserType && (
                            Array.isArray(docUserType) && docUserType.includes(selectedUserType) ||
                            docUserType === selectedUserType ||
                            doc.tags?.includes(selectedUserType)
                          ))
    
    // Filtro de área de conhecimento - procurar em keywords, tags ou título
    const matchesArea = selectedArea === 'all' || 
                       doc.keywords?.some((k: string) => k.toLowerCase().includes(selectedArea)) ||
                       doc.tags?.some((tag: string) => tag.toLowerCase().includes(selectedArea)) ||
                       doc.title?.toLowerCase().includes(selectedArea) ||
                       doc.summary?.toLowerCase().includes(selectedArea)
    
    return matchesSearch && matchesCategory && matchesType && matchesUserType && matchesArea
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



  // Função unificada de upload
  const handleUploadFile = async (file: File, category: string = 'ai-documents') => {
    console.log('🚀 Iniciando upload:', file.name, 'Categoria:', category)
    setIsUploading(true)
    setUploadProgress(0)

    let progressInterval: NodeJS.Timeout | null = null

    try {
      progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            if (progressInterval) clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 200)

      const fileExt = file.name.split('.').pop()?.toLowerCase()
      const fileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
      const bucketName = category === 'ai-avatar' ? 'avatar' : 'documents'

      console.log('📤 Enviando para Storage:', fileName, 'Bucket:', bucketName)

      // Upload para Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(fileName, file)

      if (uploadError) {
        console.error('❌ Erro no upload:', uploadError)
        throw uploadError
      }

      console.log('✅ Arquivo enviado:', uploadData)

      // Se for avatar, não salvar no banco
      if (category === 'ai-avatar') {
        const { data: { publicUrl } } = supabase.storage
          .from('avatar')
          .getPublicUrl(fileName)
        
        // Emitir evento para atualizar avatar
        const event = new CustomEvent('avatarUpdated', { detail: { url: publicUrl } })
        window.dispatchEvent(event)
        
        alert('✅ Avatar atualizado!')
        if (progressInterval) clearInterval(progressInterval)
        setUploadProgress(100)
        setTimeout(() => {
          setIsUploading(false)
          setUploadProgress(0)
        }, 1000)
        return
      }

      // Para documentos, salvar metadata no banco
      const { data: { publicUrl } } = supabase.storage
        .from('documents')
        .getPublicUrl(fileName)

      // Mapear categoria para dados do documento
      let documentCategory = 'research'
      let targetAudience = ['professional']
      
      if (category === 'ai-documents') {
        documentCategory = 'ai-documents'
        targetAudience = ['professional', 'student']
      } else if (category === 'student') {
        documentCategory = 'multimedia'
        targetAudience = ['student']
      } else if (category === 'professional') {
        documentCategory = 'protocols'
        targetAudience = ['professional']
      } else if (category === 'reports') {
        documentCategory = 'reports'
        targetAudience = ['professional']
      } else if (category === 'research') {
        documentCategory = 'research'
        targetAudience = ['professional', 'student']
      }

      const documentMetadata = {
        title: file.name,
        file_type: fileExt || 'unknown',
        file_url: publicUrl, // Usando file_url em vez de file_path
        file_size: file.size,
        author: user?.name || 'Usuário',
        category: documentCategory,
        target_audience: targetAudience,
        tags: ['upload', category],
        isLinkedToAI: category === 'ai-documents' || category === 'research',
        summary: `Documento enviado em ${new Date().toLocaleDateString('pt-BR')} - Categoria: ${category}`,
        keywords: [fileExt || 'document', category]
      }

      console.log('💾 Salvando metadata:', documentMetadata)

      // Salvar metadata no banco
      const { data: documentData, error: docError } = await supabase
        .from('documents')
        .insert(documentMetadata)
        .select()

      if (docError) {
        console.error('❌ Erro ao salvar metadata:', docError)
        throw docError
      }

      console.log('✅ Metadata salva!', documentData)

      // Aguardar um pouco para garantir que o banco foi atualizado
      await new Promise(resolve => setTimeout(resolve, 500))

      // Recarregar lista de documentos
      await loadDocuments()

      if (progressInterval) clearInterval(progressInterval)
      setUploadProgress(100)
      setUploadSuccess(true)

      console.log('🎉 Upload concluído!')
      alert('✅ Upload realizado com sucesso!')

      setTimeout(() => {
        setUploadSuccess(false)
        setUploadProgress(0)
        setIsUploading(false)
        setShowUploadModal(false)
        setUploadedFile(null)
      }, 2000)
    } catch (error: any) {
      console.error('❌ Erro no upload:', error)
      if (progressInterval) clearInterval(progressInterval)
      setUploadProgress(0)
      alert(`Erro ao fazer upload: ${error.message || 'Erro desconhecido'}`)
      setIsUploading(false)
    }
  }



  const handleUpload = async () => {
    if (!uploadedFile) return
    await handleUploadFile(uploadedFile, uploadCategory)
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

  // Função para carregar documentos
  const loadDocuments = async () => {
    setIsLoadingDocuments(true)
    try {
      console.log('🔄 Recarregando documentos...')
      const { data, error, count } = await supabase
        .from('documents')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
      
      if (error) {
        console.error('❌ Erro ao carregar documentos:', error)
        alert('Erro ao carregar documentos: ' + error.message)
        return
      }
      
      console.log('📚 Documentos carregados:', data?.length || 0)
      
      if (data && data.length > 0) {
        // Remover duplicatas baseado no título E no ID (para garantir que sejam realmente diferentes)
        const uniqueDocuments = data.filter((doc, index, self) => {
          // Procurar se já existe um documento com o mesmo título
          const foundIndex = self.findIndex(d => d.title === doc.title)
          // Se o índice encontrado é o índice atual, é único
          // OU se é a primeira ocorrência desse título
          return foundIndex === index
        })
        
        console.log('📋 Documentos únicos filtrados:', uniqueDocuments.map(d => ({
          id: d.id,
          title: d.title,
          category: d.category,
          isLinkedToAI: d.isLinkedToAI
        })))
        
        setRealDocuments(uniqueDocuments)
        setTotalDocs(uniqueDocuments.length)
        const totalCount = count || data.length
        console.log(`✅ ${uniqueDocuments.length} documentos únicos carregados do Supabase (${totalCount} totais, ${totalCount - uniqueDocuments.length} duplicatas removidas)`)
      } else {
        console.log('⚠️ Nenhum documento encontrado')
        setRealDocuments([])
        setTotalDocs(0)
      }
    } catch (error) {
      console.error('❌ Erro ao carregar documentos:', error)
      alert('Erro ao carregar documentos')
    } finally {
      setIsLoadingDocuments(false)
    }
  }

  // Carregar documentos reais do Supabase
  useEffect(() => {
    loadDocuments()
  }, [])

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white dark:text-slate-100">
                Base de Conhecimento
              </h1>
              <p className="text-sm text-purple-600 dark:text-purple-400 font-medium">
                Nôa Esperança IA • Educação • Pesquisa
              </p>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            Treinamento da IA • Recursos educacionais • Referências científicas • Protocolos clínicos
          </p>
        </div>

        {/* Filters - 3 Columns: User Types, Categories, Areas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* 1. Tipos de Usuário */}
          <div>
            <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">👥 Tipo de Usuário</h3>
            <div className="flex flex-wrap gap-2">
              {userTypes.map((ut) => {
                const Icon = ut.icon
                const isActive = selectedUserType === ut.id
                return (
                  <button
                    key={ut.id}
                    onClick={() => setSelectedUserType(ut.id)}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      isActive
                        ? `bg-${ut.color}-600 text-white shadow-md`
                        : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 border border-gray-300 dark:border-slate-600'
                    }`}
                  >
                    <Icon size={14} />
                    {ut.name}
                  </button>
                )
              })}
            </div>
          </div>

          {/* 2. Categorias */}
          <div>
            <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">📚 Categoria</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.id
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-purple-600 text-white shadow-md'
                        : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 border border-gray-300 dark:border-slate-600'
                    }`}
                  >
                    <span>{cat.icon}</span>
                    {cat.name}
                    <span className="text-xs opacity-75">({cat.count})</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* 3. Áreas de Conhecimento */}
          <div>
            <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">🎯 Área</h3>
            <div className="flex flex-wrap gap-2">
              {knowledgeAreas.map((area) => {
                const isActive = selectedArea === area.id
                return (
                  <button
                    key={area.id}
                    onClick={() => setSelectedArea(area.id)}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      isActive
                        ? `bg-${area.color}-600 text-white shadow-md`
                        : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 border border-gray-300 dark:border-slate-600'
                    }`}
                  >
                    <span>{area.icon}</span>
                    {area.name}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Upload Hint - Unified system */}
        {filteredDocuments.length === 0 && (
          <div className="mb-8 text-center py-8 border-2 border-dashed border-purple-300 dark:border-purple-700 rounded-xl bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
            <Brain className="w-12 h-12 mx-auto mb-3 text-purple-600" />
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">
              Base de Conhecimento da Nôa Esperança
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Faça upload de documentos para treinar a IA e expandir a base de conhecimento
            </p>
            <button
              onClick={() => setShowUploadModal(true)}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-lg transition-all"
            >
              <Upload className="w-5 h-5 inline mr-2" />
              Fazer Upload
            </button>
          </div>
        )}

        {/* Search and Filters */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 mb-8 border-2 border-gray-200 dark:border-slate-700">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar documentos..."
                  value={searchTerm}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-gray-50 dark:bg-slate-700 text-slate-900 dark:text-white font-medium"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="lg:w-64">
              <select
                value={selectedCategory}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-gray-50 dark:bg-slate-700 text-slate-900 dark:text-white font-semibold"
              >
                {categoriesWithCount.map((category) => (
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
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-gray-50 dark:bg-slate-700 text-slate-900 dark:text-white font-semibold"
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
              className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              <Upload className="w-5 h-5 mr-2" />
              Upload
            </button>
          </div>
        </div>

        {/* Documents Count with Refresh Button */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-lg font-bold text-gray-800 dark:text-gray-200">
            {filteredDocuments.length} {filteredDocuments.length === 1 ? 'documento encontrado' : 'documentos encontrados'}
          </p>
          <button
            onClick={loadDocuments}
            disabled={isLoadingDocuments || isUploading}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoadingDocuments ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Carregando...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Atualizar Lista
              </>
            )}
          </button>
        </div>

        {/* Documents List - Dynamic and Intelligent */}
        <div className="space-y-4">
          {filteredDocuments.map((doc) => (
            <div 
              key={doc.id} 
              className="bg-white dark:bg-slate-800 rounded-xl border-2 border-gray-200 dark:border-slate-700 p-6 hover:shadow-2xl hover:border-purple-400 dark:hover:border-purple-500 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                  <div className="text-3xl">
                    {getTypeIcon(doc.file_type || doc.type)}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex-1">
                      <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400">
                        {doc.title}
                      </h3>
                      <div className="flex items-center gap-3 text-xs text-gray-600 dark:text-gray-400 font-medium mb-3">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {doc.author || 'Autor não disponível'}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <FileText className="w-3 h-3" />
                          {formatFileSize(doc.file_size || doc.size)}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          📅 {formatDate(doc.created_at || doc.uploadDate)}
                        </span>
                      </div>
                    </div>
                    
                    {/* AI Badge */}
                    {doc.isLinkedToAI === true && (
                      <div className="flex-shrink-0">
                        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                          <Brain className="w-3 h-3" />
                          IA Ativa
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Summary */}
                  {doc.summary && (
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 line-clamp-2 italic">
                      {doc.summary}
                    </p>
                  )}

                  {/* Tags */}
                  {(doc.tags?.length > 0 || doc.keywords?.length > 0) && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {doc.tags && doc.tags.length > 0 && doc.tags.map((tag: string, index: number) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs rounded-full font-semibold shadow-md"
                        >
                          {tag}
                        </span>
                      ))}
                      {doc.keywords && doc.keywords.map((keyword: string, index: number) => (
                        <span
                          key={`kw-${index}`}
                          className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs rounded-full font-semibold shadow-md"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-between mt-3 pt-3 border-t-2 border-gray-200 dark:border-slate-700">
                    <div className="flex items-center gap-4 text-xs text-gray-600 dark:text-gray-400 font-medium">
                      <span className="flex items-center gap-1 bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded">
                        ⬇️ {doc.downloads || 0} downloads
                      </span>
                      {doc.aiRelevance && doc.aiRelevance > 0 && (
                        <span className="flex items-center gap-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 px-2 py-1 rounded">
                          <Brain className="w-3 h-3" />
                          Relevância IA: {doc.aiRelevance}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => window.open(doc.file_url, '_blank')}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm rounded-lg font-bold transition-all shadow-lg hover:shadow-xl"
                      >
                        <Eye className="w-4 h-4" />
                        Visualizar
                      </button>
                      <button 
                        onClick={() => {
                          if (doc.file_url) {
                            const link = document.createElement('a')
                            link.href = doc.file_url
                            link.download = doc.title
                            link.click()
                          } else {
                            alert('URL do arquivo não disponível')
                          }
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white text-sm rounded-lg font-bold transition-all shadow-lg hover:shadow-xl"
                      >
                        ⬇️ Baixar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredDocuments.length === 0 && (
          <div className="text-center py-12 border-2 border-dashed border-gray-300 dark:border-slate-700 rounded-lg">
            <div className="w-16 h-16 text-gray-400 mx-auto mb-4 text-5xl">📁</div>
            <h3 className="text-lg font-medium text-slate-900 dark:text-white dark:text-slate-100 mb-2">
              Nenhum documento encontrado
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Tente ajustar os filtros ou fazer uma nova busca
            </p>
            <p className="text-xs text-purple-600 dark:text-purple-400 mt-2">
              Ou faça upload de um novo documento para a base de conhecimento
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
            <div className="text-2xl font-bold text-slate-900 dark:text-white dark:text-slate-100">
              {realDocuments.reduce((sum, doc: any) => sum + (doc.downloads || 0), 0)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Total de Downloads</div>
          </div>
          <div className="card p-6 text-center">
            <div className="w-8 h-8 text-purple-600 mx-auto mb-2 text-2xl">#</div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white dark:text-slate-100">
              {realDocuments.filter((d: any) => d.isLinkedToAI === true).length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Vinculados à IA
            </div>
          </div>
          <div className="card p-6 text-center">
            <Star className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-slate-900 dark:text-white dark:text-slate-100">
              {realDocuments.length > 0 
                ? (realDocuments.reduce((sum: number, doc: any) => sum + (doc.aiRelevance || 0), 0) / realDocuments.length).toFixed(1)
                : '0'
              }
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Relevância IA Média</div>
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
