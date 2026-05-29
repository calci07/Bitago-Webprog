import { Button, Container, Paper, Stack, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

function NotFoundPage() {
  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper sx={{ p: 4, borderRadius: 4, textAlign: 'center' }}>
        <Stack spacing={2} alignItems="center">
          <Typography variant="h4">Page not found</Typography>
          <Typography color="text.secondary">
            The requested route does not exist in this activity project.
          </Typography>
          <Button component={RouterLink} to="/" variant="contained">
            Return home
          </Button>
        </Stack>
      </Paper>
    </Container>
  )
}

export default NotFoundPage
