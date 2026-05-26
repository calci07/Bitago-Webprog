import { beforeEach, describe, expect, it } from 'vitest'
import {
  authenticateLocalUser,
  clearLocalSession,
  getLocalSession,
  hasLocalSession,
  saveLocalSession,
} from './localAuth'

describe('local auth', () => {
  beforeEach(() => {
    sessionStorage.clear()
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

  it('stores and clears the local session', () => {
    saveLocalSession({ username: 'aliciareyes', role: 'admin' })

    expect(hasLocalSession()).toBe(true)
    expect(getLocalSession()).toMatchObject({ username: 'aliciareyes', role: 'admin' })

    clearLocalSession()

    expect(hasLocalSession()).toBe(false)
  })
})
