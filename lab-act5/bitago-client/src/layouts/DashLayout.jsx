import { useState } from 'react'
import MuiAppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import InputBase from '@mui/material/InputBase'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { alpha, styled, useTheme } from '@mui/material/styles'
import AssessmentIcon from '@mui/icons-material/Assessment'
import ArticleIcon from '@mui/icons-material/Article'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import DashboardIcon from '@mui/icons-material/Dashboard'
import MenuIcon from '@mui/icons-material/Menu'
import PeopleIcon from '@mui/icons-material/People'
import SearchIcon from '@mui/icons-material/Search'
import { Link as RouterLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { clearLocalSession, getLocalSession } from '../auth/localAuth'

const drawerWidth = 240

const dashboardNavItems = [
  {
    label: 'Dashboard',
    title: 'Dashboard',
    to: '/dashboard',
    icon: DashboardIcon,
  },
  {
    label: 'Reports',
    title: 'Reports',
    to: '/dashboard/reports',
    icon: AssessmentIcon,
  },
  {
    label: 'Articles',
    title: 'Articles',
    to: '/dashboard/articles',
    icon: ArticleIcon,
    allowedRoles: ['admin', 'editor'],
  },
  {
    label: 'Users',
    title: 'Users',
    to: '/dashboard/users',
    icon: PeopleIcon,
    allowedRoles: ['admin'],
  },
]

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
})

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}))

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const StyledDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}))

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.16),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.24),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('md')]: {
    width: 260,
  },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  },
}))

function getPageTitle(pathname) {
  return (
    dashboardNavItems.find(
      ({ to }) => pathname === to || pathname.startsWith(`${to}/`),
    )?.title ?? 'Dashboard'
  )
}

function DashLayout() {
  const theme = useTheme()
  const [open, setOpen] = useState(true)
  const location = useLocation()
  const navigate = useNavigate()
  const session = getLocalSession()
  const visibleNavItems = dashboardNavItems.filter(
    (item) => !item.allowedRoles || item.allowedRoles.includes(session?.role),
  )
  const pageTitle = getPageTitle(location.pathname)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const handleLogout = () => {
    clearLocalSession()
    navigate('/auth/signin')
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ gap: 2 }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={open ? handleDrawerClose : handleDrawerOpen}
            edge="start"
            sx={{ marginRight: 0.5 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {pageTitle}
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search..." inputProps={{ 'aria-label': 'search' }} />
          </Search>
          <Button color="inherit" variant="outlined" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <StyledDrawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {visibleNavItems.map(({ label, to, icon: Icon }) => (
            <ListItem key={label} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                component={RouterLink}
                to={to}
                selected={
                  location.pathname === to ||
                  (to !== '/dashboard' && location.pathname.startsWith(`${to}/`))
                }
                sx={{
                  minHeight: 52,
                  px: 2.5,
                  justifyContent: open ? 'initial' : 'center',
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <Icon />
                </ListItemIcon>
                <ListItemText primary={label} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </StyledDrawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: '100%',
          p: { xs: 2, md: 3 },
          background:
            'linear-gradient(180deg, rgba(25,118,210,0.08) 0%, rgba(238,243,248,1) 22%)',
        }}
      >
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  )
}

export default DashLayout
