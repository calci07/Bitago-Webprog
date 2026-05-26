import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import { saveLocalSession } from './localAuth'

function renderProtectedDashboard() {
  return render(
    <MemoryRouter initialEntries={['/dashboard']}>
      <Routes>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <h1>Dashboard Area</h1>
            </ProtectedRoute>
          }
        />
        <Route path="/auth/signin" element={<h1>Sign In Page</h1>} />
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
})
