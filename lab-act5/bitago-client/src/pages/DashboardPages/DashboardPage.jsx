import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { DataGrid } from '@mui/x-data-grid'
import { BarChart } from '@mui/x-charts/BarChart'
import { Gauge } from '@mui/x-charts/Gauge'
import { PieChart } from '@mui/x-charts/PieChart'
import L from 'leaflet'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { barSeries, pieSeries, quarterlyLabels, userRows } from './data'

const defaultIcon = L.icon({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

const columns = [
  { field: 'id', headerName: 'ID', width: 80 },
  { field: 'firstName', headerName: 'First name', width: 140, editable: true },
  { field: 'lastName', headerName: 'Last name', width: 140, editable: true },
  { field: 'age', headerName: 'Age', type: 'number', width: 90, editable: true },
  { field: 'fullName', headerName: 'Full name', width: 180 },
]

const totalUsers = userRows.length
const averageAge = (
  userRows.reduce((sum, row) => sum + row.age, 0) / userRows.length
).toFixed(1)
const remoteUsers = userRows.filter((row) => row.status === 'Remote').length

function DashboardPage() {
  return (
    <Stack spacing={3}>
      <Typography variant="h4">Dashboard</Typography>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
        <Card sx={{ flex: 1, borderRadius: 4 }}>
          <CardContent>
            <Typography variant="h6">Total Users</Typography>
            <Typography variant="h4">{totalUsers}</Typography>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1, borderRadius: 4 }}>
          <CardContent>
            <Typography variant="h6">Average Age</Typography>
            <Typography variant="h4">{averageAge}</Typography>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1, borderRadius: 4 }}>
          <CardContent>
            <Typography variant="h6">Remote Users</Typography>
            <Typography variant="h4">{remoteUsers}</Typography>
          </CardContent>
        </Card>
      </Stack>

      <Stack direction={{ xs: 'column', lg: 'row' }} spacing={3}>
        <Card sx={{ flex: 2, borderRadius: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Quarterly Sales
            </Typography>
            <BarChart
              xAxis={[{ scaleType: 'band', data: quarterlyLabels, label: 'Quarters' }]}
              series={barSeries}
              height={280}
            />
          </CardContent>
        </Card>
        <Card sx={{ flex: 1, borderRadius: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Distribution
            </Typography>
            <Stack
              direction={{ xs: 'column', sm: 'row', lg: 'column' }}
              spacing={2}
              alignItems="center"
              justifyContent="space-between"
            >
              <PieChart
                series={[
                  {
                    data: pieSeries,
                    innerRadius: 32,
                    paddingAngle: 4,
                    cornerRadius: 4,
                  },
                ]}
                width={240}
                height={220}
              />
              <Stack spacing={1}>
                <Gauge width={180} height={120} value={59} valueMin={0} valueMax={100} />
                <Gauge width={180} height={120} value={80} valueMin={10} valueMax={60} />
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Stack>

      <Card sx={{ borderRadius: 4 }}>
        <CardContent>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1.5}
            justifyContent="space-between"
            sx={{ mb: 2 }}
          >
            <Typography variant="h6">Users Overview</Typography>
            <Chip label="Community Data Grid" color="primary" variant="outlined" />
          </Stack>
          <Box sx={{ height: 400, width: '100%' }}>
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

      <Card sx={{ borderRadius: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Location Map
          </Typography>
          <Box sx={{ height: 360, width: '100%' }}>
            <MapContainer center={[14.6042, 120.9822]} zoom={13} scrollWheelZoom={false}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[14.6042, 120.9822]} icon={defaultIcon}>
                <Popup>
                  National University - Manila
                  <br />
                  551 F. Jhocson St, Sampaloc, Manila
                </Popup>
              </Marker>
            </MapContainer>
          </Box>
        </CardContent>
      </Card>
    </Stack>
  )
}

export default DashboardPage
