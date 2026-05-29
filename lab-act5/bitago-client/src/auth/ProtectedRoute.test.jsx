import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import { saveLocalSession } from './localAuth'

function renderProtectedDashboard(routeElement = (
  <ProtectedRoute>
    <h1>Dashboard Area</h1>
  </ProtectedRoute>
)) {
  return render(
    <MemoryRouter initialEntries={['/dashboard']}>
      <Routes>
        <Route path="/dashboard" element={routeElement} />
        <Route path="/auth/signin" element={<h1>Sign In Page</h1>} />
        <Route path="/dashboard-home" element={<h1>Dashboard Home</h1>} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('ProtectedRoute', () => {
  beforeEach(() => {
    sessionStorage.clear()
  })

  it('redirects dashboard visitors to sign in when no local session exists', () => {
    renderProtectedDashboard()

    expect(screen.getByRole('heading', { name: /sign in page/i })).toBeInTheDocument()
  })

  it('renders the dashboard when a local session exists', () => {
    saveLocalSession({ username: 'aliciareyes', role: 'admin' })

    renderProtectedDashboard()

    expect(screen.getByRole('heading', { name: /dashboard area/i })).toBeInTheDocument()
  })

  it('redirects signed-in users when their role is not allowed', () => {
    saveLocalSession({ username: 'biancacruz', role: 'editor' })

    renderProtectedDashboard(
      <ProtectedRoute allowedRoles={['admin']} redirectTo="/dashboard-home">
        <h1>User Management</h1>
      </ProtectedRoute>,
    )

    expect(screen.getByRole('heading', { name: /dashboard home/i })).toBeInTheDocument()
  })
})
