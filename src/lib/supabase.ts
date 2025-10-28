import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://itdjkfubfzmvmuxxjoae.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0ZGprZnViZnptdm11eHhqb2FlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjExNjUyOTAsImV4cCI6MjA3Njc0MTI5MH0.j9Kfff56O2cWs5ocInVHaUFcaNTS7lrUNwsKBh2KIFM'

console.log('🔧 Supabase Config:', {
  url: supabaseUrl ? '✅ Configurado' : '❌ Não configurado',
  key: supabaseAnonKey ? '✅ Configurado' : '❌ Não configurado',
  env: import.meta.env.MODE
})

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
