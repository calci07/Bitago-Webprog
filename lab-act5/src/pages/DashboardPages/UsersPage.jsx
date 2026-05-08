import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { DataGrid } from '@mui/x-data-grid'
import { userRows } from './data'

const columns = [
  {
    field: 'fullName',
    headerName: 'Full name',
    width: 200,
    renderCell: (params) => (
      <Stack direction="row" spacing={1.5} alignItems="center">
        <Avatar sx={{ width: 32, height: 32 }}>
          {params.row.firstName[0]}
          {params.row.lastName?.[0] ?? ''}
        </Avatar>
        <Typography variant="body2" fontWeight={600}>
          {params.value}
        </Typography>
      </Stack>
    ),
  },
  { field: 'email', headerName: 'Email', width: 230 },
  { field: 'team', headerName: 'Team', width: 140 },
  { field: 'city', headerName: 'City', width: 140 },
  { field: 'age', headerName: 'Age', width: 90, type: 'number' },
  {
    field: 'status',
    headerName: 'Status',
    width: 140,
    renderCell: (params) => {
      const color =
        params.value === 'Active'
          ? 'success'
          : params.value === 'Inactive'
            ? 'default'
            : 'primary'

      return <Chip label={params.value} color={color} size="small" />
    },
  },
]

const activeUsers = userRows.filter((row) => row.status === 'Active').length
const teams = new Set(userRows.map((row) => row.team)).size

function UsersPage() {
  return (
    <Stack spacing={3}>
      <Typography variant="h4">Users</Typography>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
        <Card sx={{ flex: 1, borderRadius: 4 }}>
          <CardContent>
            <Typography variant="h6">Active Users</Typography>
            <Typography variant="h4">{activeUsers}</Typography>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1, borderRadius: 4 }}>
          <CardContent>
            <Typography variant="h6">Teams</Typography>
            <Typography variant="h4">{teams}</Typography>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1, borderRadius: 4 }}>
          <CardContent>
            <Typography variant="h6">Remote or Training</Typography>
            <Typography variant="h4">
              {
                userRows.filter(
                  (row) => row.status === 'Remote' || row.status === 'Training',
                ).length
              }
            </Typography>
          </CardContent>
        </Card>
      </Stack>

      <Card sx={{ borderRadius: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            User Directory
          </Typography>
          <Box sx={{ height: 520, width: '100%' }}>
            <DataGrid
              rows={userRows}
              columns={columns}
              disableRowSelectionOnClick
              pageSizeOptions={[5, 10]}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
            />
          </Box>
        </CardContent>
      </Card>
    </Stack>
  )
}

export default UsersPage
