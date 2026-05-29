import { Navigate, useLocation } from 'react-router-dom'
import { hasLocalSession } from './localAuth'

function ProtectedRoute({ children }) {
  const location = useLocation()

  if (!hasLocalSession()) {
    return <Navigate to="/auth/signin" replace state={{ from: location }} />
  }

  return children
}

export default ProtectedRoute
