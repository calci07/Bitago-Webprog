import { alpha, createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      dark: '#115293',
      light: '#42a5f5',
    },
    secondary: {
      main: '#ffb300',
      dark: '#ef6c00',
      light: '#ffd54f',
    },
    background: {
      default: '#eef3f8',
      paper: '#ffffff',
    },
    success: {
      main: '#2e7d32',
    },
  },
  shape: {
    borderRadius: 16,
  },
  typography: {
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 700,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          border: '1px solid #dce5f0',
          boxShadow: '0 16px 40px rgba(15, 23, 42, 0.08)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderColor: alpha('#0f172a', 0.08),
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          borderColor: '#dce5f0',
          backgroundColor: '#fff',
        },
      },
    },
  },
})

export default theme
