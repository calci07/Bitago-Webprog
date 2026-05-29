import users from '../assets/users.json'

export const SESSION_KEY = 'roles-webapp-session'

function publicUser(user) {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    username: user.username,
    isActive: user.isActive,
  }
}

export function authenticateLocalUser({ login, password }) {
  const normalizedLogin = String(login ?? '').trim().toLowerCase()
  const normalizedPassword = String(password ?? '')

  const user = users.find((candidate) => {
    const username = String(candidate.username ?? '').trim().toLowerCase()
    const email = String(candidate.email ?? '').trim().toLowerCase()

    return (
      candidate.isActive &&
      (username === normalizedLogin || email === normalizedLogin) &&
      candidate.password === normalizedPassword
    )
  })

  if (!user) {
    return {
      ok: false,
      message: 'Username/email or password is incorrect.',
    }
  }

  return {
    ok: true,
    user: publicUser(user),
  }
}

export function saveLocalSession(user) {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(user))
}

export function getLocalSession() {
  try {
    const rawSession = sessionStorage.getItem(SESSION_KEY)
    return rawSession ? JSON.parse(rawSession) : null
  } catch {
    clearLocalSession()
    return null
  }
}

export function hasLocalSession() {
  return Boolean(getLocalSession())
}

export function clearLocalSession() {
  sessionStorage.removeItem(SESSION_KEY)
}
