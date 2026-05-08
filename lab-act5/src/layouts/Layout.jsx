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
                Product overview, reference material, and implementation notes
                for the analytics platform.
              </Typography>
              <Typography color="text.secondary" sx={{ maxWidth: 820 }}>
                This public section gives stakeholders a concise view of the
                platform, the reporting model, and the decisions behind the
                dashboard experience. It supports the main application without
                duplicating the interactive workflows inside the reporting
                interface.
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
