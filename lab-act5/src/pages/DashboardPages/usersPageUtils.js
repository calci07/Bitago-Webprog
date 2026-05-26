export const roles = ['admin', 'editor', 'viewer']
export const genders = ['male', 'female', 'other']

export const blankForm = {
  firstName: '',
  lastName: '',
  age: '',
  gender: '',
  contactNumber: '',
  email: '',
  role: '',
  username: '',
  password: '',
  address: '',
  isActive: true,
}

export function labelize(value) {
  return value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : ''
}

export function normalizeUser(user, index = 0) {
  const firstName = String(user.firstName ?? '').trim()
  const lastName = String(user.lastName ?? '').trim()

  return {
    id: Number(user.id) || index + 1,
    firstName,
    lastName,
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

export function tableizeUser(user) {
  return {
    ...user,
    fullName: `${user.firstName} ${user.lastName}`.trim(),
    status: user.isActive ? 'Active' : 'Inactive',
  }
}

export function loadUsersFromRaw(rawUsers) {
  try {
    return JSON.parse(rawUsers).map((user, index) => normalizeUser(user, index))
  } catch {
    return []
  }
}

export function validateUserForm(form) {
  const nextErrors = {}
  const ageNumber = Number(form.age)

  if (!String(form.firstName).trim()) nextErrors.firstName = 'First name is required.'
  if (!String(form.lastName).trim()) nextErrors.lastName = 'Last name is required.'
  if (!String(form.age).trim() || !Number.isFinite(ageNumber)) {
    nextErrors.age = 'Age must be a number.'
  }
  if (!form.gender) nextErrors.gender = 'Select a gender.'
  if (!/^\d{11}$/.test(String(form.contactNumber).trim())) {
    nextErrors.contactNumber = 'Contact number must be 11 digits.'
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(form.email).trim())) {
    nextErrors.email = 'Enter a valid email address.'
  }
  if (!form.role) nextErrors.role = 'Select a role.'
  if (!String(form.username).trim()) {
    nextErrors.username = 'Username is required.'
  } else if (/\s/.test(String(form.username))) {
    nextErrors.username = 'Username must not contain spaces.'
  }
  if (String(form.password).length < 8) {
    nextErrors.password = 'Password must be at least 8 characters.'
  }
  if (!String(form.address).trim()) nextErrors.address = 'Address is required.'

  return nextErrors
}

export function filterUserRows(users, filters) {
  const query = String(filters.query ?? '').trim().toLowerCase()

  return users.filter((user) => {
    const searchable = [
      user.firstName,
      user.lastName,
      user.email,
      user.username,
    ]
      .join(' ')
      .toLowerCase()

    const matchesQuery = !query || searchable.includes(query)
    const matchesRole = filters.role === 'all' || !filters.role || user.role === filters.role
    const matchesGender =
      filters.gender === 'all' || !filters.gender || user.gender === filters.gender
    const matchesStatus =
      filters.status === 'all' ||
      !filters.status ||
      (filters.status === 'active' ? user.isActive : !user.isActive)

    return matchesQuery && matchesRole && matchesGender && matchesStatus
  })
}
