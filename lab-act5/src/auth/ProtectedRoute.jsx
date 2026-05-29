import { Navigate, useLocation } from 'react-router-dom'
import { getLocalSession } from './localAuth'

function ProtectedRoute({ allowedRoles, children, redirectTo = '/dashboard' }) {
  const location = useLocation()
  const session = getLocalSession()

  if (!session) {
    return <Navigate to="/auth/signin" replace state={{ from: location }} />
  }

  if (allowedRoles?.length && !allowedRoles.includes(session.role)) {
    return <Navigate to={redirectTo} replace />
  }

  return children
}

export default ProtectedRoute
