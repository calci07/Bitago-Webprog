import { describe, expect, it } from 'vitest'
import {
  filterArticleRows,
  normalizeArticle,
  publicArticleRows,
  validateArticleForm,
} from './articleDashboardUtils'

const articles = [
  {
    id: 1,
    name: 'daily-picture',
    title: 'Daily Picture',
    summary: 'A clear summary for leaders.',
    body: ['A useful first paragraph.'],
    takeaways: ['Review the signal.'],
    isAvailable: true,
  },
  {
    id: 2,
    name: 'draft-report',
    title: 'Draft Report',
    summary: 'Internal draft.',
    body: ['Draft content.'],
    takeaways: ['Hold before publishing.'],
    isAvailable: false,
  },
]

describe('article dashboard utilities', () => {
  it('keeps unavailable articles out of the public article list', () => {
    const result = publicArticleRows(articles)

    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('daily-picture')
  })

  it('filters dashboard articles by search and availability', () => {
    const result = filterArticleRows(articles, {
      query: 'draft',
      availability: 'unavailable',
    })

    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('draft-report')
  })

  it('normalizes article form content into production-ready records', () => {
    const result = normalizeArticle({
      title: '  Cash Flow Basics  ',
      summary: '  Know the money moving through the business. ',
      body: 'Track incoming funds.\n\nPlan outgoing payments.',
      takeaways: 'Review weekly\nKeep records current',
      isAvailable: true,
    })

    expect(result).toMatchObject({
      name: 'cash-flow-basics',
      title: 'Cash Flow Basics',
      summary: 'Know the money moving through the business.',
      body: ['Track incoming funds.', 'Plan outgoing payments.'],
      takeaways: ['Review weekly', 'Keep records current'],
      isAvailable: true,
    })
  })

  it('validates required article fields before saving', () => {
    const errors = validateArticleForm({
      title: '',
      summary: 'Too short',
      body: '',
      takeaways: '',
      isAvailable: true,
    })

    expect(errors.title).toBe('Title is required.')
    expect(errors.summary).toBe('Summary must be at least 24 characters.')
    expect(errors.body).toBe('Add at least one article paragraph.')
    expect(errors.takeaways).toBe('Add at least one takeaway.')
  })
})
