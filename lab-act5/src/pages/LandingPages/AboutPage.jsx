import { Paper, Stack, Typography } from '@mui/material'

function AboutPage() {
  return (
    <Paper sx={{ p: 4, borderRadius: 4 }}>
      <Stack spacing={2}>
        <Typography variant="h4">About The Platform</Typography>
        <Typography color="text.secondary">
          This platform presents a compact public layer and a richer internal
          dashboard experience. The public pages introduce the product, explain
          the reporting model, and provide reference material for reviewers,
          collaborators, and first-time users.
        </Typography>
        <Typography color="text.secondary">
          Behind that layer, the dashboard is organized around practical
          operational questions: what changed, where attention is needed, and
          which records require follow-up. Material UI components were chosen to
          keep dense data views consistent, legible, and quick to navigate.
        </Typography>
        <Typography color="text.secondary">
          The result is a structured analytics workspace that balances overview,
          detail, and maintainability. Each route has a clear responsibility,
          the navigation remains lightweight, and the reporting screens stay
          focused on actionable information.
        </Typography>
      </Stack>
    </Paper>
  )
}

export default AboutPage
