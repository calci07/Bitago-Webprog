import { ThemeProvider } from '@mui/material/styles'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import SignInPage from './SignInPage'
import SignUpPage from './SignUpPage'
import theme from '../../theme'

const navigateMock = vi.fn()

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
  })

  it('blocks sign in when required fields are empty', async () => {
    const user = userEvent.setup()

    renderWithProviders(<SignInPage />)

    await user.click(screen.getByRole('button', { name: /sign in/i }))

    expect(
      screen.getByText(/enter your email and password to continue/i),
    ).toBeInTheDocument()
    expect(navigateMock).not.toHaveBeenCalled()
  })

  it('redirects to the dashboard after valid sign in input', async () => {
    const user = userEvent.setup()

    renderWithProviders(<SignInPage />)

    await user.type(screen.getByLabelText(/email/i), 'student@example.com')
    await user.type(screen.getByLabelText(/^password$/i), 'SecurePass123')
    await user.click(screen.getByRole('button', { name: /sign in/i }))

    expect(navigateMock).toHaveBeenCalledWith('/dashboard')
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

  it('redirects to the dashboard after valid sign up input', async () => {
    const user = userEvent.setup()

    renderWithProviders(<SignUpPage />)

    await user.type(screen.getByLabelText(/full name/i), 'Juan Dela Cruz')
    await user.type(screen.getByLabelText(/email/i), 'juan@example.com')
    await user.type(screen.getByLabelText(/^password$/i), 'SecurePass123')
    await user.type(
      screen.getByLabelText(/confirm password/i),
      'SecurePass123',
    )
    await user.click(screen.getByRole('button', { name: /create account/i }))

    expect(navigateMock).toHaveBeenCalledWith('/dashboard')
  })
})
