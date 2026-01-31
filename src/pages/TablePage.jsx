import { useState } from 'react'
import {
  Plus,
  Download,
  Filter,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  Button,
  Input,
  Badge,
  Avatar,
  DataTable,
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalFooter,
  ModalClose,
} from '@/components/ui'

// Sample users data
const usersData = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    status: 'active',
    department: 'Engineering',
    joinDate: '2023-01-15',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'Editor',
    status: 'active',
    department: 'Marketing',
    joinDate: '2023-02-20',
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'Viewer',
    status: 'inactive',
    department: 'Sales',
    joinDate: '2023-03-10',
  },
  {
    id: 4,
    name: 'Alice Williams',
    email: 'alice@example.com',
    role: 'Editor',
    status: 'active',
    department: 'Design',
    joinDate: '2023-04-05',
  },
  {
    id: 5,
    name: 'Charlie Brown',
    email: 'charlie@example.com',
    role: 'Admin',
    status: 'active',
    department: 'Engineering',
    joinDate: '2023-05-12',
  },
  {
    id: 6,
    name: 'Diana Ross',
    email: 'diana@example.com',
    role: 'Viewer',
    status: 'pending',
    department: 'HR',
    joinDate: '2023-06-18',
  },
  {
    id: 7,
    name: 'Edward Norton',
    email: 'edward@example.com',
    role: 'Editor',
    status: 'active',
    department: 'Marketing',
    joinDate: '2023-07-22',
  },
  {
    id: 8,
    name: 'Fiona Apple',
    email: 'fiona@example.com',
    role: 'Viewer',
    status: 'inactive',
    department: 'Finance',
    joinDate: '2023-08-30',
  },
  {
    id: 9,
    name: 'George Lucas',
    email: 'george@example.com',
    role: 'Admin',
    status: 'active',
    department: 'Engineering',
    joinDate: '2023-09-14',
  },
  {
    id: 10,
    name: 'Hannah Montana',
    email: 'hannah@example.com',
    role: 'Editor',
    status: 'active',
    department: 'Design',
    joinDate: '2023-10-08',
  },
  {
    id: 11,
    name: 'Ian Malcolm',
    email: 'ian@example.com',
    role: 'Viewer',
    status: 'pending',
    department: 'Research',
    joinDate: '2023-11-25',
  },
  {
    id: 12,
    name: 'Julia Roberts',
    email: 'julia@example.com',
    role: 'Editor',
    status: 'active',
    department: 'Marketing',
    joinDate: '2023-12-01',
  },
]

// Filter options
const statusOptions = ['all', 'active', 'inactive', 'pending']
const roleOptions = ['all', 'Admin', 'Editor', 'Viewer']
const departmentOptions = [
  'all',
  'Engineering',
  'Marketing',
  'Sales',
  'Design',
  'HR',
  'Finance',
  'Research',
]

function getStatusBadge(status) {
  const variants = {
    active: 'success',
    inactive: 'secondary',
    pending: 'warning',
  }
  return <Badge variant={variants[status]}>{status}</Badge>
}

function getRoleBadge(role) {
  const variants = {
    Admin: 'default',
    Editor: 'outline',
    Viewer: 'secondary',
  }
  return <Badge variant={variants[role]}>{role}</Badge>
}

export function TablePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [roleFilter, setRoleFilter] = useState('all')
  const [departmentFilter, setDepartmentFilter] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  const [deleteModal, setDeleteModal] = useState({ open: false, user: null })

  // Filter data
  const filteredData = usersData.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter
    const matchesRole = roleFilter === 'all' || user.role === roleFilter
    const matchesDepartment =
      departmentFilter === 'all' || user.department === departmentFilter

    return matchesSearch && matchesStatus && matchesRole && matchesDepartment
  })

  // Active filters count
  const activeFiltersCount =
    (statusFilter !== 'all' ? 1 : 0) +
    (roleFilter !== 'all' ? 1 : 0) +
    (departmentFilter !== 'all' ? 1 : 0)

  const clearFilters = () => {
    setStatusFilter('all')
    setRoleFilter('all')
    setDepartmentFilter('all')
  }

  // Table columns
  const columns = [
    {
      key: 'name',
      header: 'User',
      sortable: true,
      render: (row) => (
        <div className="flex items-center gap-3">
          <Avatar alt={row.name} size="sm" />
          <div>
            <p className="font-medium">{row.name}</p>
            <p className="text-xs text-[hsl(var(--muted-foreground))]">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'role',
      header: 'Role',
      sortable: true,
      render: (row) => getRoleBadge(row.role),
    },
    {
      key: 'department',
      header: 'Department',
      sortable: true,
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (row) => getStatusBadge(row.status),
    },
    {
      key: 'joinDate',
      header: 'Join Date',
      sortable: true,
      render: (row) => new Date(row.joinDate).toLocaleDateString(),
    },
    {
      key: 'actions',
      header: '',
      cellClassName: 'text-right',
      render: (row) => (
        <Dropdown>
          <DropdownTrigger asChild>
            <button className="inline-flex h-8 w-8 items-center justify-center rounded-[var(--radius-md)] hover:bg-[hsl(var(--accent))]">
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </DropdownTrigger>
          <DropdownContent align="end">
            <DropdownItem>
              <Eye className="h-4 w-4" />
              <span>View</span>
            </DropdownItem>
            <DropdownItem>
              <Edit className="h-4 w-4" />
              <span>Edit</span>
            </DropdownItem>
            <DropdownSeparator />
            <DropdownItem
              destructive
              onClick={() => setDeleteModal({ open: true, user: row })}
            >
              <Trash2 className="h-4 w-4" />
              <span>Delete</span>
            </DropdownItem>
          </DropdownContent>
        </Dropdown>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Users</h1>
          <p className="text-[hsl(var(--muted-foreground))]">
            Manage your team members and their permissions.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button>
            <Plus className="h-4 w-4" />
            Add User
          </Button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 gap-2">
          <div className="w-full sm:w-80">
            <Input
              type="search"
              placeholder="Search users..."
              icon={Search}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className={cn(showFilters && 'bg-[hsl(var(--accent))]')}
          >
            <Filter className="h-4 w-4" />
            Filters
            {activeFiltersCount > 0 && (
              <Badge variant="default" className="ml-1 h-5 w-5 rounded-full p-0">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>
        </div>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">
          {filteredData.length} of {usersData.length} users
        </p>
      </div>

      {/* Expanded Filters */}
      {showFilters && (
        <div className="animate-in flex flex-wrap items-center gap-4 rounded-[var(--radius-lg)] border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Status:</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={cn(
                'h-9 rounded-[var(--radius-md)] border border-[hsl(var(--input))]',
                'bg-[hsl(var(--background))] px-3 text-sm',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))]'
              )}
            >
              {statusOptions.map((option) => (
                <option key={option} value={option}>
                  {option === 'all' ? 'All Status' : option}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Role:</label>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className={cn(
                'h-9 rounded-[var(--radius-md)] border border-[hsl(var(--input))]',
                'bg-[hsl(var(--background))] px-3 text-sm',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))]'
              )}
            >
              {roleOptions.map((option) => (
                <option key={option} value={option}>
                  {option === 'all' ? 'All Roles' : option}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Department:</label>
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className={cn(
                'h-9 rounded-[var(--radius-md)] border border-[hsl(var(--input))]',
                'bg-[hsl(var(--background))] px-3 text-sm',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))]'
              )}
            >
              {departmentOptions.map((option) => (
                <option key={option} value={option}>
                  {option === 'all' ? 'All Departments' : option}
                </option>
              ))}
            </select>
          </div>

          {activeFiltersCount > 0 && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <X className="h-4 w-4" />
              Clear all
            </Button>
          )}
        </div>
      )}

      {/* Data Table */}
      <DataTable
        data={filteredData}
        columns={columns}
        pageSize={8}
        emptyMessage="No users found matching your filters."
      />

      {/* Delete Confirmation Modal */}
      <Modal open={deleteModal.open} onOpenChange={(open) => setDeleteModal({ open, user: null })}>
        <ModalOverlay />
        <ModalContent>
          <ModalClose />
          <ModalHeader>
            <ModalTitle>Delete User</ModalTitle>
            <ModalDescription>
              Are you sure you want to delete {deleteModal.user?.name}? This action cannot be
              undone.
            </ModalDescription>
          </ModalHeader>
          <ModalFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteModal({ open: false, user: null })}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => setDeleteModal({ open: false, user: null })}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
