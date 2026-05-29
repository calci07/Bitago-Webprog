import users from '../assets/users.json'

export const SESSION_KEY = 'roles-webapp-session'
export const USERS_KEY = 'roles-webapp-users'

function normalizeUser(user, index = 0) {
  return {
    id: Number(user.id) || index + 1,
    firstName: String(user.firstName ?? '').trim(),
    lastName: String(user.lastName ?? '').trim(),
    age: String(user.age ?? '').trim(),
    gender: String(user.gender ?? '').trim().toLowerCase(),
    contactNumber: String(user.contactNumber ?? '').trim(),
    email: String(user.email ?? '').trim().toLowerCase(),
    role: String(user.role ?? '').trim().toLowerCase(),
    username: String(user.username ?? '').trim().toLowerCase(),
    password: String(user.password ?? '').trim(),
    address: String(user.address ?? '').trim(),
    isActive: typeof user.isActive === 'boolean' ? user.isActive : true,
  }
}

function slugifyUsername(value) {
  return String(value ?? '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '')
}

function storedUsers() {
  try {
    const rawUsers = localStorage.getItem(USERS_KEY)
    return rawUsers ? JSON.parse(rawUsers).map(normalizeUser) : null
  } catch {
    localStorage.removeItem(USERS_KEY)
    return null
  }
}

export function getUserDirectory() {
  return storedUsers() ?? users.map(normalizeUser)
}

export function saveUserDirectory(nextUsers) {
  const normalizedUsers = nextUsers.map(normalizeUser)
  localStorage.setItem(USERS_KEY, JSON.stringify(normalizedUsers))
  return normalizedUsers
}

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

  const user = getUserDirectory().find((candidate) => {
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

  if (user.role === 'viewer') {
    return {
      ok: false,
      message: 'Viewer accounts do not have dashboard access.',
    }
  }

  return {
    ok: true,
    user: publicUser(user),
  }
}

export function registerLocalUser({ fullName, email, password }) {
  const normalizedEmail = String(email ?? '').trim().toLowerCase()
  const normalizedName = String(fullName ?? '').trim()
  const nameParts = normalizedName.split(/\s+/).filter(Boolean)
  const firstName = nameParts[0] ?? ''
  const lastName = nameParts.slice(1).join(' ') || 'User'
  const username = slugifyUsername(normalizedName || normalizedEmail.split('@')[0])
  const directory = getUserDirectory()
  const duplicate = directory.some(
    (user) => user.email === normalizedEmail || user.username === username,
  )

  if (duplicate) {
    return {
      ok: false,
      message: 'An account with this email or username already exists.',
    }
  }

  const nextId = Math.max(0, ...directory.map((user) => Number(user.id) || 0)) + 1
  const user = normalizeUser({
    id: nextId,
    firstName,
    lastName,
    age: '',
    gender: 'other',
    contactNumber: '',
    email: normalizedEmail,
    role: 'editor',
    username,
    password,
    address: '',
    isActive: true,
  })

  saveUserDirectory([...directory, user])

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
