import { motion } from 'framer-motion'
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  ShoppingCart,
  Activity,
  ArrowUpRight,
  MoreHorizontal,
  Plus,
  ArrowRight,
} from 'lucide-react'
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { cn, formatNumber, formatCurrency } from '../lib/utils'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  Button,
  Badge,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
} from '../components/ui'

// Mock Data for Charts
const revenueData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 2780 },
  { name: 'May', value: 1890 },
  { name: 'Jun', value: 2390 },
  { name: 'Jul', value: 3490 },
  { name: 'Aug', value: 4000 },
  { name: 'Sep', value: 3000 },
  { name: 'Oct', value: 5000 },
  { name: 'Nov', value: 6000 },
  { name: 'Dec', value: 7500 },
]

const salesData = [
  { name: 'Electronics', value: 2400 },
  { name: 'Fashion', value: 1398 },
  { name: 'Home', value: 9800 },
  { name: 'Beauty', value: 3908 },
  { name: 'Toys', value: 4800 },
]

const trafficData = [
  { name: 'Direct', value: 400 },
  { name: 'Organic', value: 300 },
  { name: 'Social', value: 300 },
  { name: 'Referral', value: 200 },
]

const COLORS = ['#0f172a', '#3f3f46', '#71717a', '#a1a1aa', '#d4d4d8']

const stats = [
  {
    title: 'Total Revenue',
    value: 45231.89,
    change: 20.1,
    trend: 'up',
    icon: DollarSign,
    format: 'currency',
    color: 'primary',
  },
  {
    title: 'Active Users',
    value: 2350,
    change: 180.1,
    trend: 'up',
    icon: Users,
    format: 'number',
    color: 'success',
  },
  {
    title: 'Total Sales',
    value: 12234,
    change: -4.5,
    trend: 'down',
    icon: ShoppingCart,
    format: 'number',
    color: 'warning',
  },
  {
    title: 'Conversion Rate',
    value: 12.5,
    change: 1.2,
    trend: 'up',
    icon: Activity,
    format: 'percent',
    color: 'destructive',
  },
]

// Recent orders data
const recentOrders = [
  { id: 'ORD-001', customer: 'Olivia Martin', email: 'olivia@example.com', amount: 1999.0, status: 'completed' },
  { id: 'ORD-002', customer: 'Jackson Lee', email: 'jackson@example.com', amount: 39.0, status: 'pending' },
  { id: 'ORD-003', customer: 'Isabella Nguyen', email: 'isabella@example.com', amount: 299.0, status: 'completed' },
  { id: 'ORD-004', customer: 'William Kim', email: 'will@example.com', amount: 99.0, status: 'failed' },
  { id: 'ORD-005', customer: 'Sofia Davis', email: 'sofia@example.com', amount: 39.0, status: 'completed' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
}

function StatCard({ title, value, change, trend, icon: Icon, format, color }) {
  const formattedValue = format === 'currency'
    ? formatCurrency(value)
    : format === 'percent'
      ? `${value}%`
      : formatNumber(value)
  const isPositive = trend === 'up'

  return (
    <motion.div variants={itemVariants}>
      <Card className="surface-hover">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-foreground">
              <Icon className="h-5 w-5" />
            </div>
            <div className={cn(
              'flex items-center gap-1 rounded-full px-2 py-1 text-xs font-bold',
              isPositive
                ? 'bg-[hsl(var(--success)/0.1)] text-[hsl(var(--success))]'
                : 'bg-[hsl(var(--destructive)/0.1)] text-[hsl(var(--destructive))]'
            )}>
              {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              {isPositive ? '+' : ''}{change}%
            </div>
          </div>
          <div className="mt-4">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{title}</p>
            <h3 className="text-2xl font-semibold tracking-tight mt-1">{formattedValue}</h3>
          </div>
          <div className="mt-4 flex items-center text-[10px] text-muted-foreground font-semibold uppercase tracking-widest">
            <span className={cn('mr-1.5', isPositive ? 'text-success' : 'text-destructive')}>
              {isPositive ? '↑' : '↓'} {change}%
            </span>
            vs last month
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-border bg-popover/90 backdrop-blur-md p-3 shadow-lg">
        <p className="text-xs font-bold text-muted-foreground mb-2 px-1">{label}</p>
        {payload.map((item, index) => (
          <div key={index} className="flex items-center justify-between gap-6 py-1 px-1">
            <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-foreground">
              <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: item.color || item.fill }} />
              {item.name}
            </span>
            <span className="text-xs font-bold">{item.value}</span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

export function Dashboard() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-8"
    >
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard Overview</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Performance metrics and analytical insights for <span className="text-foreground font-medium">Q1 2026</span>.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Download Report</Button>
          <Button size="sm">
            <Plus className="h-3.5 w-3.5 mr-1.5" /> New Action
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid gap-8 grid-cols-1 lg:grid-cols-2">
        {/* Line Chart - Revenue */}
        <motion.div variants={itemVariants}>
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Revenue Insights</CardTitle>
                <CardDescription>Performance trends over the fiscal year</CardDescription>
              </div>
              <Badge variant="outline" className="font-bold">LIVE</Badge>
            </CardHeader>
            <CardContent className="h-[350px] pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border) / 0.5)" />
                  <XAxis dataKey="name" fontSize={11} tickLine={false} axisLine={false} stroke="hsl(var(--muted-foreground))" tick={{ fontWeight: 500 }} dy={10} />
                  <YAxis fontSize={11} tickLine={false} axisLine={false} stroke="hsl(var(--muted-foreground))" tick={{ fontWeight: 500 }} tickFormatter={(value) => `$${value / 1000}k`} dx={-10} />
                  <RechartsTooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRevenue)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Bar Chart - Sales */}
        <motion.div variants={itemVariants}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Category Analysis</CardTitle>
              <CardDescription>Market share across core product departments</CardDescription>
            </CardHeader>
            <CardContent className="h-[350px] pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesData} barGap={8}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border) / 0.5)" />
                  <XAxis dataKey="name" fontSize={11} tickLine={false} axisLine={false} stroke="hsl(var(--muted-foreground))" tick={{ fontWeight: 500 }} dy={10} />
                  <YAxis fontSize={11} tickLine={false} axisLine={false} stroke="hsl(var(--muted-foreground))" tick={{ fontWeight: 500 }} dx={-10} />
                  <RechartsTooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--muted)/0.3)' }} />
                  <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} barSize={32} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid gap-8 grid-cols-1 lg:grid-cols-3">
        {/* Pie Chart */}
        <motion.div variants={itemVariants}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Traffic Mix</CardTitle>
              <CardDescription>Acquisition source distribution</CardDescription>
            </CardHeader>
            <CardContent className="h-[320px] flex flex-col justify-center">
              <ResponsiveContainer width="100%" height="80%">
                <PieChart>
                  <Pie data={trafficData} cx="50%" cy="50%" innerRadius={70} outerRadius={95} paddingAngle={8} dataKey="value" cornerRadius={10} animationDuration={1500}>
                    {trafficData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-2 mt-4 px-4">
                {trafficData.map((item, i) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full" style={{ background: COLORS[i] }} />
                    <span className="text-xs font-bold text-[hsl(var(--muted-foreground))] uppercase tracking-wider">{item.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Transactions */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest system transactions</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="text-xs font-semibold">
                View All <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="table-minimal">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Status</th>
                      <th className="text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order.id}>
                        <td className="font-medium text-xs text-muted-foreground">{order.id}</td>
                        <td>
                          <div className="flex items-center gap-2.5">
                            <Avatar alt={order.customer} size="xs" />
                            <div className="flex flex-col">
                              <span className="font-medium text-sm leading-tight">{order.customer}</span>
                              <span className="text-[10px] text-muted-foreground">{order.email}</span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <Badge variant={order.status === 'completed' ? 'success' : order.status === 'pending' ? 'warning' : 'destructive'} size="sm">
                            {order.status}
                          </Badge>
                        </td>
                        <td className="text-right font-medium">{formatCurrency(order.amount)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
