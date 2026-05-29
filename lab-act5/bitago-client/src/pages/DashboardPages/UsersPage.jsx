import { useMemo, useState } from 'react'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import Switch from '@mui/material/Switch'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { DataGrid } from '@mui/x-data-grid'
import { getUserDirectory, saveUserDirectory } from '../../auth/localAuth'
import {
  blankForm,
  filterUserRows,
  genders,
  labelize,
  loadUsersFromRaw,
  normalizeUser,
  roles,
  tableizeUser,
  validateUserForm,
} from './usersPageUtils'

function UsersPage() {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const [users, setUsers] = useState(() => loadUsersFromRaw(JSON.stringify(getUserDirectory())))
  const [query, setQuery] = useState('')
  const [filters, setFilters] = useState({ role: 'all', gender: 'all', status: 'all' })
  const [form, setForm] = useState(blankForm)
  const [errors, setErrors] = useState({})
  const [open, setOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [showPassword, setShowPassword] = useState(false)

  const visibleUsers = useMemo(
    () => filterUserRows(users, { query, ...filters }),
    [filters, query, users],
  )

  const rows = useMemo(() => visibleUsers.map(tableizeUser), [visibleUsers])

  const handleFilterChange = (field) => (event) => {
    setFilters((current) => ({ ...current, [field]: event.target.value }))
  }

  const handleFieldChange = (field) => (event) => {
    const value =
      field === 'isActive' ? event.target.checked : event.target.value

    setForm((current) => ({ ...current, [field]: value }))
    setErrors((current) => {
      const next = { ...current }
      delete next[field]
      return next
    })
  }

  const openAddDialog = () => {
    setForm(blankForm)
    setErrors({})
    setEditingId(null)
    setShowPassword(false)
    setOpen(true)
  }

  const openEditDialog = (user) => {
    setForm({
      firstName: user.firstName,
      lastName: user.lastName,
      age: user.age,
      gender: user.gender,
      contactNumber: user.contactNumber,
      email: user.email,
      role: user.role,
      username: user.username,
      password: user.password,
      address: user.address,
      isActive: user.isActive,
    })
    setErrors({})
    setEditingId(user.id)
    setShowPassword(false)
    setOpen(true)
  }

  const closeDialog = () => {
    setOpen(false)
    setErrors({})
  }

  const saveUser = () => {
    const nextErrors = validateUserForm(form)

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors)
      return
    }

    const nextUser = normalizeUser(form)

    if (editingId) {
      const nextUsers = users.map((user) =>
        user.id === editingId ? { ...nextUser, id: editingId } : user,
      )
      setUsers(saveUserDirectory(nextUsers))
    } else {
      const nextId = Math.max(0, ...users.map((user) => user.id)) + 1
      setUsers(saveUserDirectory([...users, { ...nextUser, id: nextId }]))
    }

    closeDialog()
  }

  const toggleStatus = (id) => {
    const nextUsers = users.map((user) =>
      user.id === id ? { ...user, isActive: !user.isActive } : user,
    )
    setUsers(saveUserDirectory(nextUsers))
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'fullName', headerName: 'Full Name', minWidth: 180, flex: 1 },
    { field: 'username', headerName: 'Username', minWidth: 150, flex: 1 },
    {
      field: 'role',
      headerName: 'Role',
      width: 130,
      renderCell: (params) => labelize(params.value),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={params.row.isActive ? 'success' : 'default'}
          size="small"
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      filterable: false,
      minWidth: 170,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Button size="small" variant="outlined" onClick={() => openEditDialog(params.row)}>
            Edit
          </Button>
          <Button
            size="small"
            variant="contained"
            color={params.row.isActive ? 'warning' : 'success'}
            onClick={() => toggleStatus(params.row.id)}
          >
            {params.row.isActive ? 'Disable' : 'Activate'}
          </Button>
        </Stack>
      ),
    },
  ]

  return (
    <Stack spacing={3}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        spacing={2}
      >
        <Typography variant="h4">Users</Typography>
        <Button variant="contained" onClick={openAddDialog}>
          Add User
        </Button>
      </Stack>

      <Card sx={{ borderRadius: 4 }}>
        <CardContent>
          <Stack direction={{ xs: 'column', lg: 'row' }} spacing={2} sx={{ mb: 2 }}>
            <TextField
              label="Search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Name, email, or username"
              sx={{ flex: 1 }}
            />
            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel id="role-filter-label">Role</InputLabel>
              <Select
                labelId="role-filter-label"
                label="Role"
                value={filters.role}
                onChange={handleFilterChange('role')}
              >
                <MenuItem value="all">All roles</MenuItem>
                {roles.map((role) => (
                  <MenuItem key={role} value={role}>
                    {labelize(role)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel id="gender-filter-label">Gender</InputLabel>
              <Select
                labelId="gender-filter-label"
                label="Gender"
                value={filters.gender}
                onChange={handleFilterChange('gender')}
              >
                <MenuItem value="all">All genders</MenuItem>
                {genders.map((gender) => (
                  <MenuItem key={gender} value={gender}>
                    {labelize(gender)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel id="status-filter-label">Status</InputLabel>
              <Select
                labelId="status-filter-label"
                label="Status"
                value={filters.status}
                onChange={handleFilterChange('status')}
              >
                <MenuItem value="all">All statuses</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          </Stack>

          <Box sx={{ height: 520, width: '100%' }}>
            <DataGrid
              rows={rows}
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
          {rows.length === 0 ? (
            <Alert severity="info" sx={{ mt: 2 }}>
              No users found. Adjust the search or filters.
            </Alert>
          ) : null}
        </CardContent>
      </Card>

      <Dialog open={open} onClose={closeDialog} fullWidth maxWidth="md" fullScreen={fullScreen}>
        <DialogTitle>{editingId ? 'Edit User' : 'Add User'}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
              <TextField
                label="First Name"
                value={form.firstName}
                onChange={handleFieldChange('firstName')}
                error={Boolean(errors.firstName)}
                helperText={errors.firstName}
                fullWidth
              />
              <TextField
                label="Last Name"
                value={form.lastName}
                onChange={handleFieldChange('lastName')}
                error={Boolean(errors.lastName)}
                helperText={errors.lastName}
                fullWidth
              />
            </Stack>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
              <TextField
                label="Age"
                value={form.age}
                onChange={handleFieldChange('age')}
                error={Boolean(errors.age)}
                helperText={errors.age}
                fullWidth
              />
              <FormControl fullWidth error={Boolean(errors.gender)}>
                <InputLabel id="gender-label">Gender</InputLabel>
                <Select
                  labelId="gender-label"
                  label="Gender"
                  value={form.gender}
                  onChange={handleFieldChange('gender')}
                >
                  {genders.map((gender) => (
                    <MenuItem key={gender} value={gender}>
                      {labelize(gender)}
                    </MenuItem>
                  ))}
                </Select>
                {errors.gender ? (
                  <Typography variant="caption" color="error" sx={{ mx: 1.75, mt: 0.5 }}>
                    {errors.gender}
                  </Typography>
                ) : null}
              </FormControl>
            </Stack>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
              <TextField
                label="Contact Number"
                value={form.contactNumber}
                onChange={handleFieldChange('contactNumber')}
                error={Boolean(errors.contactNumber)}
                helperText={errors.contactNumber}
                fullWidth
              />
              <TextField
                label="Email"
                value={form.email}
                onChange={handleFieldChange('email')}
                error={Boolean(errors.email)}
                helperText={errors.email}
                fullWidth
              />
            </Stack>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
              <FormControl fullWidth error={Boolean(errors.role)}>
                <InputLabel id="role-label">Role</InputLabel>
                <Select
                  labelId="role-label"
                  label="Role"
                  value={form.role}
                  onChange={handleFieldChange('role')}
                >
                  {roles.map((role) => (
                    <MenuItem key={role} value={role}>
                      {labelize(role)}
                    </MenuItem>
                  ))}
                </Select>
                {errors.role ? (
                  <Typography variant="caption" color="error" sx={{ mx: 1.75, mt: 0.5 }}>
                    {errors.role}
                  </Typography>
                ) : null}
              </FormControl>
              <TextField
                label="Username"
                value={form.username}
                onChange={handleFieldChange('username')}
                error={Boolean(errors.username)}
                helperText={errors.username}
                fullWidth
              />
            </Stack>
            <TextField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={form.password}
              onChange={handleFieldChange('password')}
              error={Boolean(errors.password)}
              helperText={errors.password}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword((current) => !current)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Address"
              value={form.address}
              onChange={handleFieldChange('address')}
              error={Boolean(errors.address)}
              helperText={errors.address}
              multiline
              minRows={2}
              fullWidth
            />
            <FormControlLabel
              control={
                <Switch
                  checked={form.isActive}
                  onChange={handleFieldChange('isActive')}
                />
              }
              label={form.isActive ? 'User status: Active' : 'User status: Inactive'}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button variant="contained" onClick={saveUser}>
            {editingId ? 'Save User' : 'Add User'}
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  )
}

export default UsersPage
