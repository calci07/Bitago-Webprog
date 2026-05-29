import { describe, expect, it } from 'vitest'
import {
  buildArticlePayload,
  buildRegistrationPayload,
  normalizeApiArticle,
} from './client'

describe('api client payloads', () => {
  it('builds a backend-ready user payload from the signup form', () => {
    const result = buildRegistrationPayload({
      fullName: '  Maria Santos Cruz  ',
      email: '  MARIA@example.com ',
      password: 'SecurePass123',
    })

    expect(result).toMatchObject({
      firstName: 'Maria',
      lastName: 'Santos Cruz',
      age: 'N/A',
      gender: 'other',
      contactNumber: 'N/A',
      email: 'maria@example.com',
      role: 'editor',
      username: 'mariasantoscruz',
      password: 'SecurePass123',
      address: 'N/A',
      isActive: true,
    })
  })

  it('builds an article payload with paragraph and takeaway arrays', () => {
    const result = buildArticlePayload({
      title: ' MongoDB Compass Guide ',
      summary: 'A clear summary for the public article page.',
      body: 'Create the database.\n\nCheck the collection.',
      takeaways: 'Use Compass\nRestart the server',
      isAvailable: true,
    })

    expect(result).toMatchObject({
      title: 'MongoDB Compass Guide',
      summary: 'A clear summary for the public article page.',
      body: ['Create the database.', 'Check the collection.'],
      takeaways: ['Use Compass', 'Restart the server'],
      isAvailable: true,
    })
  })

  it('normalizes MongoDB articles with their _id as the grid id', () => {
    const result = normalizeApiArticle({
      _id: '665f5f1e0b5f97a75d000001',
      name: 'mongodb-compass-guide',
      title: 'MongoDB Compass Guide',
      summary: 'A clear summary for the public article page.',
      body: ['Create the database.'],
      takeaways: ['Use Compass'],
      isAvailable: true,
    })

    expect(result.id).toBe('665f5f1e0b5f97a75d000001')
    expect(result.name).toBe('mongodb-compass-guide')
  })
})
