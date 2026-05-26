import { ThemeProvider } from '@mui/material/styles'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import ArticleListPage from './ArticleListPage'
import ArticlePage from './ArticlePage'
import HomePage from './HomePage'
import theme from '../../theme'

function renderWithRouter(ui, route = '/') {
  return render(
    <ThemeProvider theme={theme}>
      <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
    </ThemeProvider>,
  )
}

describe('public pages', () => {
  it('shows the simplified project overview home content', () => {
    renderWithRouter(<HomePage />)

    expect(
      screen.getByRole('heading', { name: /operations dashboard overview/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/focused workspace for keeping track of team activity/i),
    ).toBeInTheDocument()
    expect(screen.getByText(/know what needs attention/i)).toBeInTheDocument()
  })

  it('shows production article copy for a routed article page', () => {
    renderWithRouter(
      <Routes>
        <Route path="/articles/:name" element={<ArticlePage />} />
      </Routes>,
      '/articles/dashboard-overview',
    )

    expect(
      screen.getByRole('heading', { name: /reading the daily picture/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/total users, average profile details, flexible work patterns/i),
    ).toBeInTheDocument()
  })

  it('lists article entries with non-placeholder summaries', () => {
    renderWithRouter(<ArticleListPage />)

    expect(
      screen.getByText(/practical guidance for reading operational data/i),
    ).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: /open article/i })).toHaveLength(3)
  })
})
