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

const COLORS = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444']

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
      <Card className="group relative overflow-hidden">
        <div className={cn(
          "absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 rounded-full opacity-5 transition-transform duration-500 group-hover:scale-125 bg-current",
          `text-[hsl(var(--primary))]`
        )} />
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className={cn(
              "flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-[hsl(var(--primary))] to-[hsl(var(--primary)/0.7)] shadow-lg glow-primary"
            )}>
              <Icon className="h-6 w-6 text-white" />
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
            <p className="text-sm font-medium text-[hsl(var(--muted-foreground))]">{title}</p>
            <h3 className="text-3xl font-bold tracking-tight mt-1">{formattedValue}</h3>
          </div>
          <div className="mt-4 flex items-center text-xs text-[hsl(var(--muted-foreground))] font-medium">
            <span className="text-[hsl(var(--primary))] font-bold mr-1">Snapshot:</span> last 30 days
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-[hsl(var(--border)/0.5)] bg-[hsl(var(--popover)/0.8)] backdrop-blur-md p-4 shadow-xl">
        <p className="text-sm font-bold border-b border-[hsl(var(--border)/0.5)] pb-2 mb-2">{label}</p>
        {payload.map((item, index) => (
          <div key={index} className="flex items-center justify-between gap-4 py-1">
            <span className="flex items-center gap-2 text-xs font-semibold">
              <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color || item.fill }} />
              {item.name}
            </span>
            <span className="text-sm font-bold">{item.value}</span>
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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight bg-linear-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary)/0.6)] bg-clip-text text-transparent">
            Overview Dashboard
          </h1>
          <p className="text-[hsl(var(--muted-foreground))] font-medium mt-1">
            Welcome back, <span className="text-[hsl(var(--foreground))] font-bold">John Doe</span>. Here's what's happening.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl">Export Report</Button>
          <Button className="rounded-xl shadow-lg glow-primary">
            <Plus className="h-4 w-4 mr-2" /> Action
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
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border)/0.3)" />
                  <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} stroke="hsl(var(--muted-foreground))" tick={{ fontWeight: 600 }} />
                  <YAxis fontSize={12} tickLine={false} axisLine={false} stroke="hsl(var(--muted-foreground))" tick={{ fontWeight: 600 }} tickFormatter={(value) => `$${value / 1000}k`} />
                  <RechartsTooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={4} fillOpacity={1} fill="url(#colorRevenue)" animationDuration={2000} />
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
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border)/0.3)" />
                  <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} stroke="hsl(var(--muted-foreground))" tick={{ fontWeight: 600 }} />
                  <YAxis fontSize={12} tickLine={false} axisLine={false} stroke="hsl(var(--muted-foreground))" tick={{ fontWeight: 600 }} />
                  <RechartsTooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--muted)/0.3)' }} />
                  <Bar dataKey="value" fill="hsl(var(--primary))" radius={[12, 12, 4, 4]} barSize={40} animationDuration={2500} />
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
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest system transactions and user actions</CardDescription>
              </div>
              <Button variant="ghost" className="text-sm font-bold">
                View History <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-[hsl(var(--border)/0.5)]">
                      <th className="pb-4 text-xs font-black uppercase tracking-widest text-[hsl(var(--muted-foreground))]">Order</th>
                      <th className="pb-4 text-xs font-black uppercase tracking-widest text-[hsl(var(--muted-foreground))]">Customer</th>
                      <th className="pb-4 text-xs font-black uppercase tracking-widest text-[hsl(var(--muted-foreground))]">Status</th>
                      <th className="pb-4 text-right text-xs font-black uppercase tracking-widest text-[hsl(var(--muted-foreground))]">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[hsl(var(--border)/0.3)]">
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="group hover:bg-[hsl(var(--accent)/0.3)] transition-colors">
                        <td className="py-4 font-mono text-sm font-bold text-[hsl(var(--primary))]">{order.id}</td>
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <Avatar alt={order.customer} size="sm" className="ring-2 ring-transparent group-hover:ring-[hsl(var(--primary)/0.2)] transition-all" />
                            <div>
                              <p className="text-sm font-bold">{order.customer}</p>
                              <p className="text-xs text-[hsl(var(--muted-foreground))]">{order.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4">
                          <Badge variant={order.status === 'completed' ? 'success' : order.status === 'pending' ? 'warning' : 'destructive'}>
                            {order.status}
                          </Badge>
                        </td>
                        <td className="py-4 text-right font-black text-sm">{formatCurrency(order.amount)}</td>
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
