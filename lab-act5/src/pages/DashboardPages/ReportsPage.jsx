import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { BarChart } from '@mui/x-charts/BarChart'
import { Gauge } from '@mui/x-charts/Gauge'
import { LineChart } from '@mui/x-charts/LineChart'
import { PieChart } from '@mui/x-charts/PieChart'
import {
  departmentMix,
  reportBarSeries,
  reportLineSeries,
  reportMonths,
} from './data'

const insights = [
  {
    title: 'Revenue trend is positive',
    body: 'Monthly revenue remained above the target baseline and closed the half-year at its highest point.',
  },
  {
    title: 'Marketing output improved',
    body: 'Conversions in Q3 and Q4 outpaced campaigns launched, signaling stronger asset performance.',
  },
  {
    title: 'Department balance is healthy',
    body: 'Operations still leads the team distribution, but product and analytics continue to expand.',
  },
]

function ReportsPage() {
  return (
    <Stack spacing={3}>
      <Typography variant="h4">Reports</Typography>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
        <Card sx={{ flex: 1, borderRadius: 4 }}>
          <CardContent>
            <Typography variant="h6">Forecast Accuracy</Typography>
            <Gauge width={190} height={130} value={86} valueMin={0} valueMax={100} />
          </CardContent>
        </Card>
        <Card sx={{ flex: 1, borderRadius: 4 }}>
          <CardContent>
            <Typography variant="h6">Pipeline Completion</Typography>
            <Gauge width={190} height={130} value={72} valueMin={0} valueMax={100} />
          </CardContent>
        </Card>
        <Card sx={{ flex: 1, borderRadius: 4 }}>
          <CardContent>
            <Typography variant="h6">Review Status</Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mt: 2 }}>
              <Chip label="Board ready" color="success" />
              <Chip label="Updated today" color="primary" variant="outlined" />
            </Stack>
          </CardContent>
        </Card>
      </Stack>

      <Stack direction={{ xs: 'column', xl: 'row' }} spacing={3}>
        <Card sx={{ flex: 2, borderRadius: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Monthly Revenue
            </Typography>
            <LineChart
              xAxis={[{ scaleType: 'point', data: reportMonths }]}
              series={[{ data: reportLineSeries, label: 'Revenue' }]}
              height={300}
            />
          </CardContent>
        </Card>

        <Card sx={{ flex: 1, borderRadius: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Department Mix
            </Typography>
            <PieChart
              series={[
                {
                  data: departmentMix,
                  innerRadius: 30,
                  paddingAngle: 3,
                  cornerRadius: 4,
                },
              ]}
              width={250}
              height={260}
            />
          </CardContent>
        </Card>
      </Stack>

      <Stack direction={{ xs: 'column', xl: 'row' }} spacing={3}>
        <Card sx={{ flex: 2, borderRadius: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Campaign Performance
            </Typography>
            <BarChart
              xAxis={[{ scaleType: 'band', data: ['Q1', 'Q2', 'Q3', 'Q4'] }]}
              series={reportBarSeries}
              height={280}
            />
          </CardContent>
        </Card>
        <Card sx={{ flex: 1, borderRadius: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Key Insights
            </Typography>
            <List disablePadding>
              {insights.map((insight) => (
                <ListItem key={insight.title} disableGutters sx={{ alignItems: 'flex-start', py: 1 }}>
                  <ListItemText
                    primary={insight.title}
                    secondary={insight.body}
                    primaryTypographyProps={{ fontWeight: 600 }}
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Stack>
    </Stack>
  )
}

export default ReportsPage
