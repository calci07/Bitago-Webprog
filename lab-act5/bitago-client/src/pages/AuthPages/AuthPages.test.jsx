import { ThemeProvider } from '@mui/material/styles'
import { cleanup, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import SignInPage from './SignInPage'
import SignUpPage from './SignUpPage'
import theme from '../../theme'

const navigateMock = vi.fn()

function mockSuccessfulRegistration(responseUser = {
  id: '665f5f1e0b5f97a75d000001',
  firstName: 'Juan',
  lastName: 'Dela Cruz',
  email: 'juan@example.com',
  role: 'editor',
  username: 'juandelacruz',
  isActive: true,
}) {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(responseUser),
    }),
  )
}

function mockSuccessfulLogin(responseUser = {
  id: '665f5f1e0b5f97a75d000001',
  firstName: 'Gerald',
  lastName: 'Bitago',
  email: 'geraldb2417@gmail.com',
  role: 'editor',
  username: 'geraldbitago',
  isActive: true,
}) {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          message: 'Login successful.',
          token: 'test-token',
          user: responseUser,
        }),
    }),
  )
}

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')

  return {
    ...actual,
    useNavigate: () => navigateMock,
  }
})

function renderWithProviders(ui) {
  return render(
    <ThemeProvider theme={theme}>
      <MemoryRouter>{ui}</MemoryRouter>
    </ThemeProvider>,
  )
}

describe('auth forms', () => {
  beforeEach(() => {
    navigateMock.mockReset()
    sessionStorage.clear()
    localStorage.clear()
    vi.unstubAllGlobals()
    cleanup()
  })

  it('blocks sign in when required fields are empty', async () => {
    const user = userEvent.setup()

    renderWithProviders(<SignInPage />)

    await user.click(screen.getByRole('button', { name: /sign in/i }))

    expect(
      screen.getByText(/enter your username\/email and password to continue/i),
    ).toBeInTheDocument()
    expect(navigateMock).not.toHaveBeenCalled()
  })

  it('blocks sign in when credentials do not match a seeded user', async () => {
    const user = userEvent.setup()

    renderWithProviders(<SignInPage />)

    await user.type(screen.getByLabelText(/username or email/i), 'aliciareyes')
    await user.type(screen.getByLabelText(/^password$/i), 'WrongPass123')
    await user.click(screen.getByRole('button', { name: /sign in/i }))

    expect(await screen.findByRole('alert')).toHaveTextContent(
      /username\/email or password is incorrect|user not found/i,
    )
    expect(navigateMock).not.toHaveBeenCalled()
  })

  it('redirects to the dashboard after valid seeded sign in credentials', async () => {
    const user = userEvent.setup()

    renderWithProviders(<SignInPage />)

    await user.type(screen.getByLabelText(/username or email/i), 'aliciareyes')
    await user.type(screen.getByLabelText(/^password$/i), 'Alicia123!')
    await user.click(screen.getByRole('button', { name: /sign in/i }))

    expect(sessionStorage.getItem('roles-webapp-session')).toContain('aliciareyes')
    expect(navigateMock).toHaveBeenCalledWith('/dashboard')
  })

  it('logs in with credentials saved in MongoDB', async () => {
    const user = userEvent.setup()
    mockSuccessfulLogin()

    renderWithProviders(<SignInPage />)

    await user.type(screen.getByLabelText(/username or email/i), 'geraldb2417@gmail.com')
    await user.type(screen.getByLabelText(/^password$/i), 'SecurePass123')
    await user.click(screen.getByRole('button', { name: /sign in/i }))

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith('/dashboard')
    })
    expect(sessionStorage.getItem('roles-webapp-session')).toContain(
      'geraldb2417@gmail.com',
    )
  })

  it('blocks sign up when passwords do not match', async () => {
    const user = userEvent.setup()

    renderWithProviders(<SignUpPage />)

    await user.type(screen.getByLabelText(/full name/i), 'Juan Dela Cruz')
    await user.type(screen.getByLabelText(/email/i), 'juan@example.com')
    await user.type(screen.getByLabelText(/^password$/i), 'SecurePass123')
    await user.type(
      screen.getByLabelText(/confirm password/i),
      'SecurePass124',
    )
    await user.click(screen.getByRole('button', { name: /create account/i }))

    expect(
      screen.getByRole('alert'),
    ).toBeInTheDocument()
    expect(screen.getByRole('alert')).toHaveTextContent(
      /password and confirm password must match/i,
    )
    expect(navigateMock).not.toHaveBeenCalled()
  })

  it('logs in with the MongoDB user returned by sign up', async () => {
    const user = userEvent.setup()
    mockSuccessfulRegistration({
      id: '665f5f1e0b5f97a75d000001',
      firstName: 'Gerald',
      lastName: 'Bitago',
      email: 'geraldb2417@gmail.com',
      role: 'editor',
      username: 'geraldbitago',
      isActive: true,
    })

    renderWithProviders(<SignUpPage />)

    localStorage.setItem(
      'roles-webapp-users',
      JSON.stringify([
        {
          id: 1,
          firstName: 'Gerald',
          lastName: 'Bitago',
          email: 'geraldb2417@gmail.com',
          username: 'geraldbitago',
          password: 'SecurePass123',
          role: 'editor',
          isActive: true,
        },
      ]),
    )

    await user.type(screen.getByLabelText(/full name/i), 'Gerald Bitago')
    await user.type(screen.getByLabelText(/email/i), 'geraldb2417@gmail.com')
    await user.type(screen.getByLabelText(/^password$/i), 'SecurePass123')
    await user.type(
      screen.getByLabelText(/confirm password/i),
      'SecurePass123',
    )
    await user.click(screen.getByRole('button', { name: /create account/i }))

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith('/dashboard')
    })
    expect(sessionStorage.getItem('roles-webapp-session')).toContain(
      'geraldb2417@gmail.com',
    )
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('creates a usable editor account from sign up input', async () => {
    const user = userEvent.setup()
    mockSuccessfulRegistration({
      id: '665f5f1e0b5f97a75d000002',
      firstName: 'Maria',
      lastName: 'Santos',
      email: 'maria@example.com',
      role: 'editor',
      username: 'mariasantos',
      isActive: true,
    })

    renderWithProviders(<SignUpPage />)

    await user.type(screen.getByLabelText(/full name/i), 'Maria Santos')
    await user.type(screen.getByLabelText(/email/i), 'maria@example.com')
    await user.type(screen.getByLabelText(/^password$/i), 'SecurePass123')
    await user.type(
      screen.getByLabelText(/confirm password/i),
      'SecurePass123',
    )
    await user.click(screen.getByRole('button', { name: /create account/i }))

    await waitFor(() => {
      expect(navigateMock).toHaveBeenLastCalledWith('/dashboard')
    })
    expect(sessionStorage.getItem('roles-webapp-session')).toContain('maria@example.com')
  })
})
