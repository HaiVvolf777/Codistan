import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart, Bar, 
  LineChart, Line, 
  PieChart, Pie, Cell, 
  XAxis, YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ScatterChart,
  Scatter,
  FunnelChart,
  Funnel,
  RadialBarChart,
  RadialBar
} from 'recharts';

const mockData = {
  monthlyStats: [
    { month: 'Jan', users: 400, revenue: 2400, active: 40, churn: 20, sessions: 1200 },
    { month: 'Feb', users: 300, revenue: 1398, active: 210, churn: 35, sessions: 900 },
    { month: 'Mar', users: 500, revenue: 9800, active: 229, churn: 12, sessions: 1500 },
    { month: 'Apr', users: 780, revenue: 3908, active: 20, churn: 45, sessions: 2100 },
    { month: 'May', users: 890, revenue: 4800, active: 280, churn: 30, sessions: 2500 },
    { month: 'Jun', users: 1200, revenue: 3800, active: 250, churn: 42, sessions: 3200 },
  ],
  userTypes: [
    { name: 'Admin', value: 12, color: '#8884d8' },
    { name: 'User', value: 45, color: '#82ca9d' },
    { name: 'Guest', value: 23, color: '#ffc658' },
    { name: 'Premium', value: 20, color: '#ff8042' },
  ],
  performanceData: [
    { subject: 'Speed', A: 120, B: 110, fullMark: 150 },
    { subject: 'Reliability', A: 98, B: 130, fullMark: 150 },
    { subject: 'UX', A: 86, B: 130, fullMark: 150 },
    { subject: 'Features', A: 99, B: 100, fullMark: 150 },
    { subject: 'Support', A: 85, B: 90, fullMark: 150 },
  ],
  funnelData: [
    { value: 100, name: 'Visits', fill: '#8884d8' },
    { value: 80, name: 'Signups', fill: '#83a6ed' },
    { value: 50, name: 'Purchases', fill: '#8dd1e1' },
    { value: 40, name: 'Repeat', fill: '#82ca9d' },
    { value: 26, name: 'VIP', fill: '#a4de6c' },
  ],
  scatterData: [
    { x: 100, y: 200, z: 200 },
    { x: 120, y: 100, z: 260 },
    { x: 170, y: 300, z: 400 },
    { x: 140, y: 250, z: 280 },
    { x: 150, y: 400, z: 500 },
    { x: 110, y: 280, z: 200 },
  ],
  radialData: [
    { name: '18-24', uv: 31.47, pv: 2400, fill: '#8884d8' },
    { name: '25-29', uv: 26.69, pv: 4567, fill: '#83a6ed' },
    { name: '30-34', uv: 15.69, pv: 1398, fill: '#8dd1e1' },
    { name: '35-39', uv: 8.22, pv: 9800, fill: '#82ca9d' },
  ],
  kpis: {
    totalUsers: 1245,
    revenue: 45678,
    activeUsers: 892,
    growth: 12.5,
  }
};

const chartConfigs = [
  {
    id: 'bar-chart',
    title: 'Monthly Statistics',
    description: 'User growth and revenue trends over the last 6 months',
    chart: (
      <BarChart data={mockData.monthlyStats}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="users" fill="#8884d8" name="New Users" />
        <Bar dataKey="revenue" fill="#82ca9d" name="Revenue ($)" />
      </BarChart>
    )
  },
  {
    id: 'pie-chart',
    title: 'User Distribution',
    description: 'Breakdown of users by role and type',
    chart: (
      <PieChart>
        <Pie
          data={mockData.userTypes}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {mockData.userTypes.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    )
  },
  {
    id: 'line-chart',
    title: 'Active Users Trend',
    description: 'Daily active users over the past 6 months',
    chart: (
      <LineChart data={mockData.monthlyStats}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="active" 
          stroke="#8884d8" 
          strokeWidth={2}
          name="Active Users"
          dot={{ fill: '#433f90', strokeWidth: 2, r: 8 }}
        />
      </LineChart>
    )
  },
  {
    id: 'area-chart',
    title: 'Sessions Overview',
    description: 'User sessions with churn rate overlay',
    chart: (
      <AreaChart data={mockData.monthlyStats}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area type="monotone" dataKey="sessions" stroke="#8884d8" fill="#8884d8" fillOpacity={0.2} />
        <Area type="monotone" dataKey="churn" stroke="#ff8042" fill="#ff8042" fillOpacity={0.2} />
      </AreaChart>
    )
  },
  {
    id: 'radar-chart',
    title: 'Performance Metrics',
    description: 'Comparison of key performance indicators',
    chart: (
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={mockData.performanceData}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis />
        <Radar name="Current" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        <Radar name="Target" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
        <Legend />
      </RadarChart>
    )
  },
  {
    id: 'scatter-chart',
    title: 'User Engagement',
    description: 'Correlation between different engagement metrics',
    chart: (
      <ScatterChart>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="x" name="Page Views" unit="views" />
        <YAxis dataKey="y" name="Time Spent" unit="min" />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Legend />
        <Scatter name="Engagement" data={mockData.scatterData} fill="#8884d8" />
      </ScatterChart>
    )
  },
  {
    id: 'funnel-chart',
    title: 'Conversion Funnel',
    description: 'User journey from visits to VIP customers',
    chart: (
      <FunnelChart>
        <Tooltip />
        <Funnel
          dataKey="value"
          data={mockData.funnelData}
          isAnimationActive
        >
          {mockData.funnelData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Funnel>
      </FunnelChart>
    )
  },
  {
    id: 'radial-chart',
    title: 'Demographic Distribution',
    description: 'User age groups as percentage of total',
    chart: (
      <RadialBarChart
        innerRadius="20%"
        outerRadius="100%"
        data={mockData.radialData}
        startAngle={180}
        endAngle={0}
      >
        <RadialBar label={{ fill: '#666', position: 'insideStart' }} background dataKey="uv" />
        <Legend iconSize={10} layout="vertical" verticalAlign="middle" align="right" />
        <Tooltip />
      </RadialBarChart>
    )
  }
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {chartConfigs.map((config) => (
          <Card key={config.id} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle>{config.title}</CardTitle>
              <CardDescription>{config.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                {config.chart}
              </ResponsiveContainer>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;