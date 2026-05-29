import { Button, Paper, Stack, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { getPublicArticles } from './articles'

function ArticleListPage() {
  const articles = getPublicArticles()

  return (
    <Stack spacing={3}>
      <Paper sx={{ p: 4, borderRadius: 4 }}>
        <Stack spacing={1.5}>
          <Typography variant="h4">Insights & Guides</Typography>
          <Typography color="text.secondary">
            Practical guidance for reading operational data, spotting patterns,
            and turning team records into clearer follow-up decisions.
          </Typography>
        </Stack>
      </Paper>

      {articles.map((article) => (
        <Paper key={article.name} sx={{ p: 3, borderRadius: 4 }}>
          <Stack spacing={1.5}>
            <Typography variant="h6">{article.title}</Typography>
            <Typography color="text.secondary">{article.summary}</Typography>
            <Button
              component={RouterLink}
              to={`/articles/${article.name}`}
              variant="text"
              sx={{ alignSelf: 'flex-start' }}
            >
              Open article
            </Button>
          </Stack>
        </Paper>
      ))}
    </Stack>
  )
}

export default ArticleListPage
