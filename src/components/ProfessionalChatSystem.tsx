import React, { useState, useEffect } from 'react'
import { Send, Users, Search, Lock, MessageCircle, Building2, Phone, Mail, Calendar, Video, Mic, FileText, User, GraduationCap, Heart } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

interface Consultorio {
  id: string
  name: string
  doctor: string
  email: string
  specialty: string
  crm: string
  cro?: string
  status: 'online' | 'offline' | 'busy'
  lastSeen?: Date
  type: 'professional' | 'student' | 'patient'
}

interface Message {
  id: string
  senderId: string
  senderName: string
  senderEmail: string
  content: string
  timestamp: Date
  encrypted: boolean
  read: boolean
  consultorioId: string
  type: 'text' | 'audio' | 'video' | 'file'
  fileUrl?: string
}

interface ProfessionalChatSystemProps {
  className?: string
}

const ProfessionalChatSystem: React.FC<ProfessionalChatSystemProps> = ({ className = '' }) => {
  const { user } = useAuth()
  const [selectedConsultorio, setSelectedConsultorio] = useState<Consultorio | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [chatType, setChatType] = useState<'professional-professional' | 'professional-student' | 'professional-patient'>('professional-professional')
  const [isVideoCallActive, setIsVideoCallActive] = useState(false)
  const [isAudioCallActive, setIsAudioCallActive] = useState(false)

  // Dados dos consultórios e usuários
  const consultorios: Consultorio[] = [
    {
      id: 'consultorio-ricardo',
      name: 'Consultório Escola Ricardo Valença',
      doctor: 'Dr. Ricardo Valença',
      email: 'rrvalenca@gmail.com',
      specialty: 'Cannabis Medicinal Integrativa',
      crm: 'CRM-RJ 123456',
      cro: 'CRO-RJ 789012',
      status: 'online',
      lastSeen: new Date(),
      type: 'professional'
    },
    {
      id: 'consultorio-eduardo',
      name: 'Consultório Escola Eduardo Faveret',
      doctor: 'Dr. Eduardo Faveret',
      email: 'eduardoscfaveret@gmail.com',
      specialty: 'Neurologia Pediátrica • Epilepsia e Cannabis Medicinal',
      crm: 'CRM-RJ 123456',
      cro: 'CRO-RJ 654321',
      status: 'online',
      lastSeen: new Date(),
      type: 'professional'
    },
    {
      id: 'aluno-joao',
      name: 'João Silva',
      doctor: 'João Silva',
      email: 'joao.silva@medcannlab.com',
      specialty: 'Estudante de Medicina',
      crm: 'Em formação',
      status: 'online',
      lastSeen: new Date(),
      type: 'student'
    },
    {
      id: 'paciente-maria',
      name: 'Maria Santos',
      doctor: 'Maria Santos',
      email: 'maria.santos@email.com',
      specialty: 'Paciente',
      crm: 'N/A',
      status: 'online',
      lastSeen: new Date(),
      type: 'patient'
    }
  ]

  // Mensagens mockadas para demonstração
  const mockMessages: Message[] = [
    {
      id: '1',
      senderId: 'consultorio-eduardo',
      senderName: 'Dr. Eduardo Faveret',
      senderEmail: 'eduardoscfaveret@gmail.com',
      content: 'Olá Ricardo! Como está o protocolo IMRE com os pacientes de epilepsia?',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 horas atrás
      encrypted: true,
      read: true,
      consultorioId: 'consultorio-ricardo',
      type: 'text'
    },
    {
      id: '2',
      senderId: 'consultorio-ricardo',
      senderName: 'Dr. Ricardo Valença',
      senderEmail: 'rrvalenca@gmail.com',
      content: 'Eduardo, está funcionando muito bem! Temos 8 respondedores TEZ até agora. E você, como estão os casos de TEA?',
      timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000), // 1.5 horas atrás
      encrypted: true,
      read: true,
      consultorioId: 'consultorio-eduardo',
      type: 'text'
    },
    {
      id: '3',
      senderId: 'consultorio-eduardo',
      senderName: 'Dr. Eduardo Faveret',
      senderEmail: 'eduardoscfaveret@gmail.com',
      content: 'Excelente! Nos casos de TEA estamos vendo melhoras significativas na comunicação e interação social. Quer que compartilhe alguns protocolos específicos?',
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutos atrás
      encrypted: true,
      read: false,
      consultorioId: 'consultorio-ricardo',
      type: 'text'
    },
    {
      id: '4',
      senderId: 'consultorio-eduardo',
      senderName: 'Dr. Eduardo Faveret',
      senderEmail: 'eduardoscfaveret@gmail.com',
      content: 'Protocolo_TEA_2024.pdf',
      timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutos atrás
      encrypted: true,
      read: false,
      consultorioId: 'consultorio-ricardo',
      type: 'file',
      fileUrl: '#'
    }
  ]

  useEffect(() => {
    setMessages(mockMessages)
  }, [])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputMessage.trim() && selectedConsultorio) {
      const newMessage: Message = {
        id: Date.now().toString(),
        senderId: user?.id || 'current-user',
        senderName: user?.name || 'Usuário',
        senderEmail: user?.email || '',
        content: inputMessage.trim(),
        timestamp: new Date(),
        encrypted: true,
        read: false,
        consultorioId: selectedConsultorio.id,
        type: 'text'
      }
      
      setMessages(prev => [...prev, newMessage])
      setInputMessage('')
      
      // Simular resposta automática
      setTimeout(() => {
        const autoReply: Message = {
          id: (Date.now() + 1).toString(),
          senderId: selectedConsultorio.id,
          senderName: selectedConsultorio.doctor,
          senderEmail: selectedConsultorio.email,
          content: `Obrigado pela mensagem, ${user?.name?.split(' ')[1] || 'colega'}! Vou analisar e responder em breve.`,
          timestamp: new Date(),
          encrypted: true,
          read: false,
          consultorioId: user?.id || 'current-user',
          type: 'text'
        }
        setMessages(prev => [...prev, autoReply])
      }, 2000)
    }
  }

  const handleVideoCall = () => {
    if (selectedConsultorio) {
      setIsVideoCallActive(true)
      // Aqui você integraria com o sistema de vídeo chamada existente
      console.log(`Iniciando vídeo chamada com ${selectedConsultorio.doctor}`)
    }
  }

  const handleAudioCall = () => {
    if (selectedConsultorio) {
      setIsAudioCallActive(true)
      // Aqui você integraria com o sistema de áudio chamada existente
      console.log(`Iniciando áudio chamada com ${selectedConsultorio.doctor}`)
    }
  }

  const handleFileUpload = () => {
    // Simular upload de arquivo
    const fileMessage: Message = {
      id: Date.now().toString(),
      senderId: user?.id || 'current-user',
      senderName: user?.name || 'Usuário',
      senderEmail: user?.email || '',
      content: 'documento_compartilhado.pdf',
      timestamp: new Date(),
      encrypted: true,
      read: false,
      consultorioId: selectedConsultorio?.id || '',
      type: 'file',
      fileUrl: '#'
    }
    setMessages(prev => [...prev, fileMessage])
  }

  const getConsultorioMessages = (consultorioId: string) => {
    return messages.filter(msg => 
      msg.consultorioId === consultorioId || 
      msg.senderId === consultorioId
    ).sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())
  }

  const getUnreadCount = (consultorioId: string) => {
    return messages.filter(msg => 
      msg.senderId === consultorioId && 
      !msg.read && 
      msg.consultorioId === (user?.id || 'current-user')
    ).length
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  const formatDate = (date: Date) => {
    const now = new Date()
    const diffTime = now.getTime() - date.getTime()
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) {
      return 'Hoje'
    } else if (diffDays === 1) {
      return 'Ontem'
    } else {
      return date.toLocaleDateString('pt-BR')
    }
  }

  return (
    <div className={`flex h-[calc(100vh-200px)] bg-slate-900 rounded-lg overflow-hidden ${className}`}>
      {/* Lista de Consultórios */}
      <div className="w-1/3 bg-slate-800 border-r border-slate-700 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-slate-700">
          <h2 className="text-xl font-bold text-white mb-2 flex items-center space-x-2">
            <Building2 className="w-5 h-5" />
            <span>Consultórios</span>
          </h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar consultórios..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-700 text-white px-10 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        {/* Lista */}
        <div className="flex-1 overflow-y-auto">
          {consultorios
            .filter(consultorio => 
              consultorio.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              consultorio.doctor.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((consultorio) => {
              const consultorioMessages = getConsultorioMessages(consultorio.id)
              const lastMessage = consultorioMessages[consultorioMessages.length - 1]
              const unreadCount = getUnreadCount(consultorio.id)
              
              return (
                <div
                  key={consultorio.id}
                  onClick={() => setSelectedConsultorio(consultorio)}
                  className={`p-4 border-b border-slate-700 cursor-pointer hover:bg-slate-700 transition-colors ${
                    selectedConsultorio?.id === consultorio.id ? 'bg-slate-700' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        consultorio.status === 'online' ? 'bg-green-500' :
                        consultorio.status === 'busy' ? 'bg-yellow-500' : 'bg-slate-500'
                      }`} />
                      <h3 className="font-semibold text-white">{consultorio.doctor}</h3>
                    </div>
                    {unreadCount > 0 && (
                      <span className="bg-primary-600 text-white text-xs px-2 py-1 rounded-full">
                        {unreadCount}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-sm text-slate-400 mb-1">{consultorio.specialty}</p>
                  
                  {lastMessage && (
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-slate-300 truncate max-w-[200px]">
                        {lastMessage.content}
                      </p>
                      <span className="text-xs text-slate-500">
                        {formatTime(lastMessage.timestamp)}
                      </span>
                    </div>
                  )}
                </div>
              )
            })}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedConsultorio ? (
          <>
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-primary-600 to-accent-600 p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold">{selectedConsultorio.doctor}</h3>
                    <p className="text-sm opacity-90">{selectedConsultorio.specialty}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 bg-white/20 px-3 py-1 rounded-full">
                    <div className={`w-2 h-2 rounded-full ${
                      selectedConsultorio.status === 'online' ? 'bg-green-400' :
                      selectedConsultorio.status === 'busy' ? 'bg-yellow-400' : 'bg-slate-400'
                    }`} />
                    <span className="text-sm">
                      {selectedConsultorio.status === 'online' ? 'Online' :
                       selectedConsultorio.status === 'busy' ? 'Ocupado' : 'Offline'}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white/20 px-3 py-1 rounded-full">
                    <Lock className="w-4 h-4" />
                    <span className="text-sm font-medium">Criptografado</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {getConsultorioMessages(selectedConsultorio.id).map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.senderId === (user?.id || 'current-user') ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-md rounded-lg p-3 ${
                      msg.senderId === (user?.id || 'current-user')
                        ? 'bg-primary-600 text-white'
                        : 'bg-slate-700 text-white'
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-semibold text-sm">{msg.senderName}</span>
                      {msg.encrypted && (
                        <Lock className="w-3 h-3 opacity-70" />
                      )}
                    </div>
                    <p className="text-sm">{msg.content}</p>
                    <span className="text-xs opacity-70 mt-1 block">
                      {formatTime(msg.timestamp)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <form onSubmit={handleSendMessage} className="p-4 bg-slate-800 border-t border-slate-700">
              <div className="flex items-center space-x-3">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder={`Enviar mensagem para ${selectedConsultorio.doctor}...`}
                  className="flex-1 bg-slate-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button
                  type="submit"
                  className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>Enviar</span>
                </button>
              </div>
              <p className="text-xs text-slate-400 mt-2 flex items-center space-x-1">
                <Lock className="w-3 h-3" />
                <span>Suas mensagens são criptografadas e seguras</span>
              </p>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-slate-800">
            <div className="text-center">
              <MessageCircle className="w-16 h-16 text-slate-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Selecione um Consultório</h3>
              <p className="text-slate-400">Escolha um consultório da lista para iniciar a conversa</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProfessionalChatSystem
