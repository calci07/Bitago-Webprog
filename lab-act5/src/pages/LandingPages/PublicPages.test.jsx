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
      screen.getByText(/unified analytics workspace for monitoring activity/i),
    ).toBeInTheDocument()
  })

  it('shows production article copy for a routed article page', () => {
    renderWithRouter(
      <Routes>
        <Route path="/articles/:name" element={<ArticlePage />} />
      </Routes>,
      '/articles/dashboard-overview',
    )

    expect(
      screen.getByRole('heading', { name: /executive dashboard design/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/top-line metrics, chart-driven reporting, tabular records, and geographic context/i),
    ).toBeInTheDocument()
  })

  it('lists article entries with non-placeholder summaries', () => {
    renderWithRouter(<ArticleListPage />)

    expect(
      screen.getByText(/editorial notes and product guides covering the dashboard architecture/i),
    ).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: /open article/i })).toHaveLength(3)
  })
})
