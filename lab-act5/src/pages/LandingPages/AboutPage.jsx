import { Paper, Stack, Typography } from '@mui/material'

function AboutPage() {
  return (
    <Paper sx={{ p: 4, borderRadius: 4 }}>
      <Stack spacing={2}>
        <Typography variant="h4">About The Workspace</Typography>
        <Typography color="text.secondary">
          This workspace helps operations teams understand what is happening
          across people, activity, and performance data. It brings the everyday
          signals of a team into one clear view, making it easier to notice
          change, prioritize follow-up, and keep decisions grounded in current
          information.
        </Typography>
        <Typography color="text.secondary">
          The dashboard is shaped around practical questions: which numbers moved,
          where attention is needed, and which records deserve a closer review.
          Summaries provide a quick read of the day, while reports and directory
          details support deeper investigation when a trend or person needs more
          context.
        </Typography>
        <Typography color="text.secondary">
          The result is an analytics workspace that turns routine reporting into
          a steadier decision process. Instead of treating data as separate
          tables, charts, and records, it connects those pieces into a picture
          teams can use to understand progress, risk, and next steps.
        </Typography>
      </Stack>
    </Paper>
  )
}

export default AboutPage
