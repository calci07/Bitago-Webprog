import { Button, List, ListItem, ListItemText, Paper, Stack, Typography } from '@mui/material'
import { Link as RouterLink, useParams } from 'react-router-dom'
import { getPublicArticle } from './articles'

function ArticlePage() {
  const { name = '' } = useParams()
  const article = getPublicArticle(name)

  if (!article) {
    return (
      <Paper sx={{ p: 4, borderRadius: 4 }}>
        <Stack spacing={2}>
          <Typography variant="h5">Resource not found</Typography>
          <Typography color="text.secondary">
            The requested guide is not available in this section of the
            platform.
          </Typography>
          <Button component={RouterLink} to="/articles" variant="contained">
            Return to guides
          </Button>
        </Stack>
      </Paper>
    )
  }

  return (
    <Paper sx={{ p: 4, borderRadius: 4 }}>
      <Stack spacing={2.5}>
        <Typography variant="h4">{article.title}</Typography>
        {article.body.map((paragraph) => (
          <Typography key={paragraph} color="text.secondary">
            {paragraph}
          </Typography>
        ))}

        <Stack spacing={1}>
          <Typography variant="h6">Highlights</Typography>
          <List disablePadding>
            {article.takeaways.map((takeaway) => (
              <ListItem key={takeaway} disableGutters sx={{ py: 0.5 }}>
                <ListItemText primary={takeaway} />
              </ListItem>
            ))}
          </List>
        </Stack>

        <Button
          component={RouterLink}
          to="/articles"
          variant="outlined"
          sx={{ alignSelf: 'flex-start' }}
        >
          Return to guides
        </Button>
      </Stack>
    </Paper>
  )
}

export default ArticlePage
