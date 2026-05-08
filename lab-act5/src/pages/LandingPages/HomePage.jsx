import { Paper, Stack, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'

const overviewSections = [
  {
    title: 'Platform Scope',
    body: 'The application combines public reference pages with an internal dashboard built for monitoring activity, reviewing performance signals, and exploring user records. Routing, navigation, and data presentation are organized to keep each workflow clear and predictable.',
  },
  {
    title: 'Primary Capabilities',
    body: 'The dashboard includes persistent navigation, executive summary cards, chart-based reporting, an interactive user directory, and a location panel. Each module is designed to support fast scanning first and deeper inspection second.',
  },
  {
    title: 'Experience Principles',
    body: 'The interface favors clarity, hierarchy, and low-friction navigation. Public pages provide context and product guidance, while the dashboard remains focused on day-to-day operational use.',
  },
]

function HomePage() {
  return (
    <Stack spacing={3}>
      <Paper sx={{ p: 4, borderRadius: 4 }}>
        <Stack spacing={1.5}>
          <Typography variant="h4">Operations Dashboard Overview</Typography>
          <Typography color="text.secondary">
            A unified analytics workspace for monitoring activity, reviewing key
            performance signals, and navigating user records through a structured
            reporting experience.
          </Typography>
        </Stack>
      </Paper>

      <Grid container spacing={3}>
        {overviewSections.map((section) => (
          <Grid key={section.title} size={{ xs: 12, md: 4 }}>
            <Paper sx={{ p: 3, borderRadius: 4, height: '100%' }}>
              <Stack spacing={1.5}>
                <Typography variant="h6">{section.title}</Typography>
                <Typography color="text.secondary">{section.body}</Typography>
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Stack>
  )
}

export default HomePage
