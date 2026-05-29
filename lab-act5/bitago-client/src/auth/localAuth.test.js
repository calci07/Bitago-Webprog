import { beforeEach, describe, expect, it } from 'vitest'
import {
  authenticateLocalUser,
  clearLocalSession,
  getLocalSession,
  hasLocalSession,
  registerLocalUser,
  saveLocalSession,
} from './localAuth'

describe('local auth', () => {
  beforeEach(() => {
    sessionStorage.clear()
    localStorage.clear()
  })

  it('authenticates an active seeded user by username and password', () => {
    const result = authenticateLocalUser({
      login: 'aliciareyes',
      password: 'Alicia123!',
    })

    expect(result.ok).toBe(true)
    expect(result.user.username).toBe('aliciareyes')
    expect(result.user.password).toBeUndefined()
  })

  it('rejects invalid credentials without creating a session', () => {
    const result = authenticateLocalUser({
      login: 'aliciareyes',
      password: 'wrongpassword',
    })

    expect(result.ok).toBe(false)
    expect(result.message).toBe('Username/email or password is incorrect.')
    expect(hasLocalSession()).toBe(false)
  })

  it('rejects active viewer accounts because they do not have dashboard access', () => {
    const result = authenticateLocalUser({
      login: 'marcosantos',
      password: 'Marco123!',
    })

    expect(result.ok).toBe(false)
    expect(result.message).toBe('Viewer accounts do not have dashboard access.')
    expect(hasLocalSession()).toBe(false)
  })

  it('registers a new active editor account that can sign in', () => {
    const registered = registerLocalUser({
      fullName: 'Juan Dela Cruz',
      email: 'juan@example.com',
      password: 'SecurePass123',
    })

    expect(registered.ok).toBe(true)
    expect(registered.user.username).toBe('juandelacruz')

    const result = authenticateLocalUser({
      login: 'juan@example.com',
      password: 'SecurePass123',
    })

    expect(result.ok).toBe(true)
    expect(result.user).toMatchObject({
      email: 'juan@example.com',
      role: 'editor',
      isActive: true,
    })
    expect(result.user.password).toBeUndefined()
  })

  it('stores and clears the local session', () => {
    saveLocalSession({ username: 'aliciareyes', role: 'admin' })

    expect(hasLocalSession()).toBe(true)
    expect(getLocalSession()).toMatchObject({ username: 'aliciareyes', role: 'admin' })

    clearLocalSession()

    expect(hasLocalSession()).toBe(false)
  })
})
