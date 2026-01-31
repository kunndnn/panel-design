import { useState, useMemo } from 'react'
import {
  Search,
  Plus,
  MoreHorizontal,
  Mail,
  Trash2,
  Edit,
} from 'lucide-react'
import {
  DataTable,
  Button,
  Input,
  Badge,
  Card,
  CardContent,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
  Modal,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalFooter,
} from '../components/ui'
import { cn, formatCurrency } from '../lib/utils'

// Mock Data
const userData = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', department: 'Engineering', status: 'active', spend: 1200.50, joinDate: '2023-01-15' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', department: 'Marketing', status: 'active', spend: 450.00, joinDate: '2023-02-20' },
  { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'Viewer', department: 'Sales', status: 'inactive', spend: 0.00, joinDate: '2023-03-10' },
  { id: 4, name: 'Diana Ross', email: 'diana@example.com', role: 'Admin', department: 'Engineering', status: 'active', spend: 2500.75, joinDate: '2023-01-05' },
  { id: 5, name: 'Edward Norton', email: 'edward@example.com', role: 'Editor', department: 'Product', status: 'pending', spend: 120.00, joinDate: '2023-04-12' },
  { id: 6, name: 'Fiona Apple', email: 'fiona@example.com', role: 'Viewer', department: 'Marketing', status: 'active', spend: 890.20, joinDate: '2023-02-28' },
  { id: 7, name: 'George Clooney', email: 'george@example.com', role: 'Admin', department: 'Sales', status: 'inactive', spend: 3400.00, joinDate: '2022-12-15' },
  { id: 8, name: 'Hannah Abbott', email: 'hannah@example.com', role: 'Editor', department: 'Engineering', status: 'active', spend: 670.50, joinDate: '2023-05-01' },
  { id: 9, name: 'Ian Wright', email: 'ian@example.com', role: 'Viewer', department: 'Product', status: 'pending', spend: 45.00, joinDate: '2023-05-15' },
  { id: 10, name: 'Jenny Slate', email: 'jenny@example.com', role: 'Admin', department: 'Marketing', status: 'active', spend: 1560.00, joinDate: '2023-03-25' },
  { id: 11, name: 'Kevin Hart', email: 'kevin@example.com', role: 'Editor', department: 'Sales', status: 'active', spend: 2100.00, joinDate: '2023-02-10' },
  { id: 12, name: 'Laura Palmer', email: 'laura@example.com', role: 'Viewer', department: 'Engineering', status: 'inactive', spend: 0.00, joinDate: '2023-06-01' },
]

export function TablePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)

  const columns = [
    {
      key: 'name',
      header: 'User',
      sortable: true,
      render: (row) => (
        <div className="flex items-center gap-3">
          <Avatar alt={row.name} size="sm" />
          <div>
            <div className="font-bold text-sm">{row.name}</div>
            <div className="text-xs text-[hsl(var(--muted-foreground))]">{row.email}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'role',
      header: 'Role',
      sortable: true,
      render: (row) => (
        <span className="text-xs font-semibold px-2 py-1 rounded-lg bg-[hsl(var(--muted)/0.5)]">
          {row.role}
        </span>
      ),
    },
    { key: 'department', header: 'Department', sortable: true },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (row) => (
        <Badge variant={row.status === 'active' ? 'success' : row.status === 'pending' ? 'warning' : 'destructive'}>
          {row.status}
        </Badge>
      ),
    },
    {
      key: 'spend',
      header: 'Total Spend',
      sortable: true,
      headerClassName: 'text-right',
      cellClassName: 'text-right font-black',
      render: (row) => formatCurrency(row.spend),
    },
    {
      key: 'actions',
      header: '',
      headerClassName: 'w-[50px]',
      render: (row) => (
        <div className="flex justify-end">
          <Dropdown>
            <DropdownTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownTrigger>
            <DropdownContent align="end" className="w-40">
              <DropdownItem className="gap-2">
                <Edit className="h-3.5 w-3.5" /> Edit User
              </DropdownItem>
              <DropdownItem className="gap-2">
                <Mail className="h-3.5 w-3.5" /> Message
              </DropdownItem>
              <DropdownSeparator />
              <DropdownItem
                destructive
                className="gap-2"
                onClick={() => {
                  setSelectedUser(row)
                  setIsDeleteModalOpen(true)
                }}
              >
                <Trash2 className="h-3.5 w-3.5" /> Delete
              </DropdownItem>
            </DropdownContent>
          </Dropdown>
        </div>
      ),
    },
  ]

  const filteredData = useMemo(() => {
    return userData.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === 'all' || user.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [searchTerm, statusFilter])

  return (
    <div className="space-y-8 animate-in">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">User Directory</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage platform members and access permissions.</p>
        </div>
        <Button size="sm">
          <Plus className="h-3.5 w-3.5 mr-1.5" /> Invite Member
        </Button>
      </div>

      <Card className="border-none shadow-none bg-transparent">
        <CardContent className="p-0">
          <div className="flex flex-col gap-4 md:flex-row md:items-center justify-between pb-6">
            <div className="relative group max-w-xs w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-foreground" />
              <Input
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 w-full h-9 bg-background focus:bg-background"
              />
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 p-1 bg-muted/50 rounded-lg border border-border">
                {['all', 'active', 'pending', 'inactive'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={cn(
                      'px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md transition-all',
                      statusFilter === status
                        ? 'bg-card text-foreground shadow-sm border border-border'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="table-container animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            <DataTable
              data={filteredData}
              columns={columns}
              pageSize={8}
              emptyMessage="We couldn't find any users matching your criteria."
            />
          </div>
        </CardContent>
      </Card>

      <Modal open={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
        <ModalHeader>
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[hsl(var(--destructive)/0.1)] mb-4">
            <Trash2 className="h-7 w-7 text-[hsl(var(--destructive))]" />
          </div>
          <ModalTitle className="text-center">Confirm Deletion</ModalTitle>
          <ModalDescription className="text-center max-w-[280px] mx-auto">
            Are you sure you want to delete <span className="font-bold text-[hsl(var(--foreground))]">{selectedUser?.name}</span>? This action is permanent.
          </ModalDescription>
        </ModalHeader>
        <ModalFooter>
          <div className="grid grid-cols-2 gap-3 w-full">
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                // Handle delete logic
                setIsDeleteModalOpen(false)
              }}
            >
              Confirm Delete
            </Button>
          </div>
        </ModalFooter>
      </Modal>
    </div>
  )
}
