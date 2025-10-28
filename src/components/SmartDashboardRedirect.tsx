import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { getDefaultRoute } from '../lib/rotasIndividualizadas'

const SmartDashboardRedirect: React.FC = () => {
  const { user } = useAuth()

  // Debug temporário
  console.log('🔍 SmartDashboardRedirect - User type:', user?.type, 'User name:', user?.name)

  if (!user) {
    return <Navigate to="/" replace />
  }

  // Redirecionamento especial para Dr. Eduardo Faveret
  if (user.email === 'eduardoscfaveret@gmail.com' || user.name === 'Dr. Eduardo Faveret') {
    console.log('🎯 Redirecionando Dr. Eduardo Faveret para dashboard personalizado')
    return <Navigate to="/app/eduardo-faveret-dashboard" replace />
  }

  // Usar o novo sistema de rotas individualizadas para outros usuários
  const defaultRoute = getDefaultRoute(user.type)
  
  console.log('🎯 Redirecionando para rota individualizada:', defaultRoute)
  
  return <Navigate to={defaultRoute} replace />
}

export default SmartDashboardRedirect
