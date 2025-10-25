import React, { createContext, useContext, useState, useEffect, useRef } from 'react'
import { supabase } from '../lib/supabase'

interface User {
  id: string
  email: string
  type: 'patient' | 'professional' | 'student' | 'admin' | 'unconfirmed'
  name: string
  crm?: string
  cro?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  register: (email: string, password: string, userType: string, name: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    console.warn('useAuth must be used within an AuthProvider - returning default values')
    return {
      user: null,
      isLoading: true,
      login: async () => {},
      logout: async () => {},
      register: async () => {}
    }
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>({
    id: 'dev-user',
    email: 'dev@medcannlab.com',
    type: 'admin',
    name: 'Desenvolvedor',
    crm: undefined,
    cro: undefined
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingProfile, setIsLoadingProfile] = useState(false)

  // --- REFS for concurrency control & caching ---
  // Map userId -> Promise that resolves to profile (so concurrent calls reuse same promise)
  const profilePromisesRef = useRef<Map<string, Promise<User | null>>>(new Map())
  // which userId already had profile loaded successfully this session
  const profileLoadedForUserRef = useRef<string | null>(null)
  // Optional flag just for debug/logging
  const profileLoadingRef = useRef<boolean>(false)

  // Verificar se o usuário já está logado
  useEffect(() => {
    let isMounted = true
    let timeoutId: NodeJS.Timeout

    // Timeout de segurança para evitar loading infinito (aumentado para 20 segundos)
    timeoutId = setTimeout(() => {
      if (isMounted) {
        console.log('⏰ Timeout de segurança - definindo isLoading como false')
        setIsLoading(false)
      }
    }, 20000) // 20 segundos

    // Escutar mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('🔄 Auth state change:', event, 'Session:', !!session, 'User:', session?.user?.id)
      if (isMounted) {
        // Limpar timeout se o auth state change funcionar
        clearTimeout(timeoutId)
        
        if (session?.user) {
          console.log('👤 Usuário no auth state change:', session.user.id)
          // Verificar se não é um evento de logout
          if (event === 'SIGNED_OUT') {
            console.log('🚪 Evento de logout detectado - definindo user como null')
            setUser(null)
          } else {
            await loadUserProfile(session.user.id)
            console.log('🔄 Após loadUserProfile - user state:', user)
          }
        } else {
          console.log('❌ Nenhum usuário no auth state change - fazendo logout')
          setUser(null)
        }
        console.log('🔄 Auth state change - definindo isLoading como false')
        setIsLoading(false)
      }
    })

    return () => {
      isMounted = false
      clearTimeout(timeoutId)
      subscription.unsubscribe()
    }
  }, [])

  // Debug: verificar mudanças no user
  useEffect(() => {
    console.log('🔍 Estado do usuário atualizado:', user)
  }, [user])

  const loadUserProfile = async (userId: string) => {
    console.log('🔄 Iniciando carregamento do perfil...')
    
    // Sempre executar, mas controlar o estado
    setIsLoadingProfile(true)
    setIsLoading(true)
    
    // Removido timeout de segurança - sistema está configurado para sempre ter usuário
    
    // Timeout global REMOVIDO para evitar auto login
    // const globalTimeout = setTimeout(() => {
    //   console.log('⏰ Timeout global do loadUserProfile - criando usuário de emergência')
    //   const emergencyUser = {
    //     id: userId,
    //     email: 'admin@medcannlab.com',
    //     type: 'admin' as any,
    //     name: 'Administrador',
    //     crm: undefined,
    //     cro: undefined
    //   }
    //   setUser(emergencyUser)
    //   setIsLoading(false)
    //   setIsLoadingProfile(false)
    //   console.log('✅ Usuário de emergência criado por timeout global')
    // }, 10000) // 10 segundos para toda a função
    
    try {
      console.log('🔍 [loadUserProfile] Iniciando busca de perfil para userId:', userId)
      
      // Pegar usuário diretamente (mais rápido e simples)
      console.log('🔍 [loadUserProfile] Obtendo usuário do auth...')
      const { data: { user: authUser }, error: userError } = await supabase.auth.getUser()
      
      if (userError) {
        console.log('❌ [loadUserProfile] Erro ao obter usuário:', userError)
        setIsLoading(false)
        setIsLoadingProfile(false)
        return
      }
      
      console.log('✅ [loadUserProfile] Usuário obtido:', authUser.id, authUser.email)
      
      // Determinar tipo de usuário baseado nos metadados
      let userType: 'patient' | 'professional' | 'student' | 'admin' = 'patient'
      let userName = authUser.user_metadata?.name || authUser.email?.split('@')[0] || 'Usuário'
      
      // Verificar se há metadados que indiquem o tipo de usuário
      if (authUser.user_metadata?.user_type) {
        userType = authUser.user_metadata.user_type
      } else if (authUser.user_metadata?.role) {
        userType = authUser.user_metadata.role
      } else if (authUser.email?.includes('admin') || authUser.email?.includes('philip')) {
        userType = 'admin'
      }
      
      const userData = {
        id: authUser.id,
        email: authUser.email || '',
        type: userType,
        name: userName,
        crm: authUser.user_metadata?.crm,
        cro: authUser.user_metadata?.cro
      }
      
      console.log('✅ [loadUserProfile] Usuário configurado:', userData)
      setUser(userData)
    } catch (error) {
      console.error('❌ [loadUserProfile] Erro ao carregar perfil:', error)
      setIsLoading(false)
      setIsLoadingProfile(false)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) {
        throw new Error(error.message)
      }

      // Não chamar loadUserProfile aqui - o onAuthStateChange já vai chamar
      console.log('✅ Login realizado com sucesso, aguardando onAuthStateChange...')
    } catch (error) {
      console.error('Erro no login:', error)
      throw error
    }
  }

  const logout = async () => {
    try {
      console.log('🔄 Iniciando logout...')
      // Forçar logout no Supabase
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error('❌ Erro no signOut do Supabase:', error)
      }
      // Forçar limpeza do usuário
      setUser(null)
      console.log('✅ Logout realizado com sucesso')
    } catch (error) {
      console.error('❌ Erro no logout:', error)
      // Mesmo com erro, limpar o usuário
      setUser(null)
    }
  }

  const register = async (email: string, password: string, userType: string, name: string) => {
    try {
      console.log('🔄 Iniciando registro para:', email, 'tipo:', userType)
      
      // Registrar no Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/app/dashboard`
        }
      })

      if (authError) {
        console.error('❌ Erro no Supabase Auth:', authError.message)
        throw new Error(authError.message)
      }

      if (authData.user) {
        console.log('✅ Usuário criado no Supabase Auth:', authData.user.id)
        console.log('📧 Email de confirmação enviado para:', email)
        
        // Para desenvolvimento: criar usuário temporário sem confirmação
        if (process.env.NODE_ENV === 'development') {
          console.log('🔧 Modo desenvolvimento: criando usuário temporário')
          const tempUser = {
            id: authData.user.id,
            email: email,
            type: userType as any,
            name: name,
            crm: undefined,
            cro: undefined
          }
          setUser(tempUser)
          setIsLoading(false)
          return
        }
        
        // Carregar perfil do usuário (sem inserir na tabela usuarios)
        await loadUserProfile(authData.user.id)
        console.log('✅ Perfil carregado com sucesso')
      }
    } catch (error) {
      console.error('❌ Erro no registro:', error)
      throw error
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  )
}