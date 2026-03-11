import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

/**
 * PrivateRoute – rota privada
 * Se o usuário não estiver autenticado, redireciona para /login
 * preservando a rota de origem no state para redirecionamento pós-login
 */
export default function PrivateRoute() {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <Outlet />
}
