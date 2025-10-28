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

  // Usar o novo sistema de rotas individualizadas
  const defaultRoute = getDefaultRoute(user.type)
  
  console.log('🎯 Redirecionando para rota individualizada:', defaultRoute)
  
  return <Navigate to={defaultRoute} replace />
}

export default SmartDashboardRedirect
