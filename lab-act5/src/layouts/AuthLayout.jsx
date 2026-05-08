import { Box, Container, Paper, Stack, Typography } from '@mui/material'
import { Outlet } from 'react-router-dom'

function AuthLayout() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        py: 4,
        background:
          'radial-gradient(circle at top left, rgba(25,118,210,0.15), transparent 32%), radial-gradient(circle at bottom right, rgba(255,179,0,0.2), transparent 28%), #eef3f8',
      }}
    >
      <Container maxWidth="sm">
        <Paper sx={{ p: { xs: 3, md: 4 }, borderRadius: 5 }}>
          <Stack spacing={1} sx={{ mb: 3 }}>
            <Typography variant="h4">Account Access</Typography>
            <Typography color="text.secondary">
              These forms validate required inputs before the user is allowed to
              continue to the dashboard. Submit only proceeds when the entered
              details satisfy the client-side checks.
            </Typography>
          </Stack>
          <Outlet />
        </Paper>
      </Container>
    </Box>
  )
}

export default AuthLayout
