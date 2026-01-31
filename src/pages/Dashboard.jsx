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
import { cn, formatNumber, formatCurrency } from '@/lib/utils'
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
} from '@/components/ui'

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

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']

const stats = [
  {
    title: 'Total Revenue',
    value: 45231.89,
    change: 20.1,
    trend: 'up',
    icon: DollarSign,
    format: 'currency',
  },
  {
    title: 'Subscriptions',
    value: 2350,
    change: 180.1,
    trend: 'up',
    icon: Users,
    format: 'number',
  },
  {
    title: 'Sales',
    value: 12234,
    change: -19,
    trend: 'down',
    icon: ShoppingCart,
    format: 'number',
  },
  {
    title: 'Active Now',
    value: 573,
    change: 201,
    trend: 'up',
    icon: Activity,
    format: 'number',
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

function StatCard({ title, value, change, trend, icon: Icon, format }) {
  const formattedValue = format === 'currency' ? formatCurrency(value) : formatNumber(value)
  const isPositive = trend === 'up'

  return (
    <Card className="hover:shadow-md transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-[hsl(var(--muted-foreground))]">{title}</CardTitle>
        <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[hsl(var(--primary)/0.1)]">
          <Icon className="h-5 w-5 text-[hsl(var(--primary))]" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{formattedValue}</div>
        <div className="flex items-center gap-1 mt-1">
          {isPositive ? (
            <TrendingUp className="h-4 w-4 text-[hsl(var(--success))]" />
          ) : (
            <TrendingDown className="h-4 w-4 text-[hsl(var(--destructive))]" />
          )}
          <span className={cn('text-xs font-medium', isPositive ? 'text-[hsl(var(--success))]' : 'text-[hsl(var(--destructive))]')}>
            {isPositive ? '+' : ''}{change}%
          </span>
          <span className="text-xs text-[hsl(var(--muted-foreground))]">from last month</span>
        </div>
      </CardContent>
    </Card>
  )
}

function getStatusBadge(status) {
  const variants = { completed: 'success', pending: 'warning', failed: 'destructive' }
  return <Badge variant={variants[status]}>{status}</Badge>
}

// Custom Tooltip for Recharts that matches our theme
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--popover))] p-3 shadow-lg">
        <p className="text-sm font-semibold">{label}</p>
        {payload.map((item, index) => (
          <p key={index} className="text-xs" style={{ color: item.color || item.fill }}>
            {item.name}: {item.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export function Dashboard() {
  return (
    <div className="space-y-6 animate-in">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard Overview</h1>
          <p className="text-[hsl(var(--muted-foreground))]">Real-time performance metrics and business analytics.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Download CSV</Button>
          <Button><Plus className="h-4 w-4" /> New Report</Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Line Chart - Revenue */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Over Time</CardTitle>
            <CardDescription>Monthly growth and revenue patterns</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} stroke="hsl(var(--muted-foreground))" />
                <YAxis fontSize={12} tickLine={false} axisLine={false} stroke="hsl(var(--muted-foreground))" tickFormatter={(value) => `$${value}`} />
                <RechartsTooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={3} dot={{ fill: 'hsl(var(--primary))', r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Area Chart - Active Users */}
        <Card>
          <CardHeader>
            <CardTitle>Growth Analysis</CardTitle>
            <CardDescription>User acquisition and retention rates</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} stroke="hsl(var(--muted-foreground))" />
                <YAxis fontSize={12} tickLine={false} axisLine={false} stroke="hsl(var(--muted-foreground))" />
                <RechartsTooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Bar Chart - Sales by Category */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
            <CardDescription>Performance across different product departments</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} stroke="hsl(var(--muted-foreground))" />
                <YAxis fontSize={12} tickLine={false} axisLine={false} stroke="hsl(var(--muted-foreground))" />
                <RechartsTooltip content={<CustomTooltip />} />
                <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pie Chart - Traffic Sources */}
        <Card>
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
            <CardDescription>Where your visitors are coming from</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={trafficData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {trafficData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip content={<CustomTooltip />} />
                <Legend iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>A list of the most recent orders from your store.</CardDescription>
          </div>
          <Button variant="outline" size="sm">View All</Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[hsl(var(--border))]">
                  <th className="pb-3 text-left text-sm font-medium text-[hsl(var(--muted-foreground))]">Order ID</th>
                  <th className="pb-3 text-left text-sm font-medium text-[hsl(var(--muted-foreground))]">Customer</th>
                  <th className="pb-3 text-left text-sm font-medium text-[hsl(var(--muted-foreground))]">Status</th>
                  <th className="pb-3 text-right text-sm font-medium text-[hsl(var(--muted-foreground))]">Amount</th>
                  <th className="pb-3 text-right text-sm font-medium text-[hsl(var(--muted-foreground))]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-[hsl(var(--border))] last:border-0 hover:bg-[hsl(var(--muted)/0.3)] transition-colors">
                    <td className="py-4 font-mono text-sm">{order.id}</td>
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <Avatar alt={order.customer} size="sm" />
                        <div>
                          <p className="text-sm font-medium">{order.customer}</p>
                          <p className="text-xs text-[hsl(var(--muted-foreground))]">{order.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">{getStatusBadge(order.status)}</td>
                    <td className="py-4 text-right font-medium">{formatCurrency(order.amount)}</td>
                    <td className="py-4 text-right">
                      <Dropdown>
                        <DropdownTrigger asChild>
                          <button className="h-8 w-8 rounded-md hover:bg-[hsl(var(--accent))] flex items-center justify-center">
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                        </DropdownTrigger>
                        <DropdownContent align="end">
                          <DropdownItem>Order Details</DropdownItem>
                          <DropdownItem destructive>Refund</DropdownItem>
                        </DropdownContent>
                      </Dropdown>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
