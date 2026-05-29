import { describe, expect, it } from 'vitest'
import { filterUserRows, validateUserForm } from './usersPageUtils'

const users = [
  {
    id: 1,
    firstName: 'Alicia',
    lastName: 'Reyes',
    email: 'alicia.reyes@example.com',
    username: 'aliciareyes',
    role: 'admin',
    gender: 'female',
    isActive: true,
  },
  {
    id: 2,
    firstName: 'Marco',
    lastName: 'Santos',
    email: 'marco.santos@example.com',
    username: 'marcosantos',
    role: 'viewer',
    gender: 'male',
    isActive: false,
  },
]

describe('validateUserForm', () => {
  it('returns beginner-friendly validation messages for invalid input', () => {
    const errors = validateUserForm({
      firstName: '',
      lastName: 'Reyes',
      age: '',
      gender: 'female',
      contactNumber: '123',
      email: 'bad-email',
      role: 'admin',
      username: 'bad user',
      password: 'short',
      address: '',
      isActive: true,
    })

    expect(errors.firstName).toBe('First name is required.')
    expect(errors.age).toBe('Age must be a number.')
    expect(errors.contactNumber).toBe('Contact number must be 11 digits.')
    expect(errors.email).toBe('Enter a valid email address.')
    expect(errors.username).toBe('Username must not contain spaces.')
    expect(errors.password).toBe('Password must be at least 8 characters.')
    expect(errors.address).toBe('Address is required.')
  })

  it('allows editing an existing user without changing the password', () => {
    const errors = validateUserForm(
      {
        firstName: 'Alicia',
        lastName: 'Reyes',
        age: '21',
        gender: 'female',
        contactNumber: '09123456789',
        email: 'alicia.reyes@example.com',
        role: 'admin',
        username: 'aliciareyes',
        password: '',
        address: 'Manila',
        isActive: true,
      },
      { requirePassword: false },
    )

    expect(errors.password).toBeUndefined()
  })
})

describe('filterUserRows', () => {
  it('filters by search text, role, gender, and active status', () => {
    const result = filterUserRows(users, {
      query: 'alicia',
      role: 'admin',
      gender: 'female',
      status: 'active',
    })

    expect(result).toHaveLength(1)
    expect(result[0].username).toBe('aliciareyes')
  })
})
