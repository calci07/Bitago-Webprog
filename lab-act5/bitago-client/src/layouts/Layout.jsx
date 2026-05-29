import {
  AppBar,
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material'
import { Link as RouterLink, Outlet } from 'react-router-dom'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Articles', to: '/articles' },
]

function Layout() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="static" elevation={0} color="transparent">
        <Toolbar sx={{ py: 1.5, gap: 1.5 }}>
          <Typography variant="h6" sx={{ flexGrow: 1, color: 'text.primary' }}>
            Lab Activity 5
          </Typography>
          {navItems.map((item) => (
            <Button key={item.to} component={RouterLink} to={item.to} color="inherit">
              {item.label}
            </Button>
          ))}
          <Button component={RouterLink} to="/dashboard" variant="contained">
            Dashboard
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 5 } }}>
        <Stack spacing={3}>
          <Paper sx={{ p: { xs: 3, md: 4 }, borderRadius: 4 }}>
            <Stack spacing={1.5}>
              <Typography variant="overline" color="primary.main" sx={{ fontWeight: 700 }}>
                Operations Analytics Workspace
              </Typography>
              <Typography variant="h5">
                A practical view of team activity, performance movement, and
                the records that need attention.
              </Typography>
              <Typography color="text.secondary" sx={{ maxWidth: 820 }}>
                Use the workspace to move from broad operational signals to
                specific follow-up decisions. Summaries, reports, directory
                records, and location context work together so teams can see what
                changed and decide what to do next.
              </Typography>
            </Stack>
          </Paper>

          <Outlet />
        </Stack>
      </Container>
    </Box>
  )
}

export default Layout
