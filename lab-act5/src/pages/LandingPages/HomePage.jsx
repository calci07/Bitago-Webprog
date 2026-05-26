import { Paper, Stack, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'

const overviewSections = [
  {
    title: 'Know What Needs Attention',
    body: 'See activity levels, team signals, flexible work patterns, and location context in one place so emerging issues are easier to spot before they become recurring problems.',
  },
  {
    title: 'Move From Summary To Detail',
    body: 'Start with the numbers that frame the day, then review trends, compare records, and follow up with the people or teams that need a closer look.',
  },
  {
    title: 'Make Decisions With Context',
    body: 'Reports, directory records, and geographic views work together to turn scattered operational data into a practical picture of what is changing and why it matters.',
  },
]

function HomePage() {
  return (
    <Stack spacing={3}>
      <Paper sx={{ p: 4, borderRadius: 4 }}>
        <Stack spacing={1.5}>
          <Typography variant="h4">Operations Dashboard Overview</Typography>
          <Typography color="text.secondary">
            A focused workspace for keeping track of team activity, performance
            movement, user records, and location signals without losing the story
            behind the numbers.
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
