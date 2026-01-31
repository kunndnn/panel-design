import { useState } from 'react'
import { Search, Bell, LogOut, User, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ThemeToggle } from '@/components/ThemeToggle'
import { MobileMenuButton, useSidebar } from './Sidebar'
import {
  Avatar,
  Badge,
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
  DropdownLabel,
} from '@/components/ui'

// Sample notifications
const notifications = [
  { id: 1, title: 'New user registered', time: '5 min ago', unread: true },
  { id: 2, title: 'Server backup completed', time: '1 hour ago', unread: true },
  { id: 3, title: 'Payment received', time: '2 hours ago', unread: false },
]

export function Navbar() {
  const { isCollapsed } = useSidebar()
  const [searchQuery, setSearchQuery] = useState('')

  const unreadCount = notifications.filter((n) => n.unread).length

  return (
    <header
      className={cn(
        'fixed right-0 top-0 z-30 flex h-[var(--navbar-height)] items-center justify-between',
        'border-b border-[hsl(var(--border))]',
        'bg-[hsl(var(--background))/0.95] backdrop-blur-md',
        'px-4 lg:px-6',
        'transition-all duration-[var(--transition-slow)]',
        isCollapsed
          ? 'left-0 lg:left-[var(--sidebar-collapsed-width)]'
          : 'left-0 lg:left-[var(--sidebar-width)]'
      )}
    >
      {/* Left side - Mobile menu + Search */}
      <div className="flex items-center gap-4">
        <MobileMenuButton />

        <div className="hidden sm:block">
          <Input
            type="search"
            placeholder="Search..."
            icon={Search}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64 lg:w-80"
          />
        </div>
      </div>

      {/* Right side - Actions */}
      <div className="flex items-center gap-2">
        {/* Mobile Search Button */}
        <button
          className={cn(
            'inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius-md)]',
            'text-[hsl(var(--foreground))]',
            'transition-colors hover:bg-[hsl(var(--accent))]',
            'sm:hidden'
          )}
        >
          <Search className="h-5 w-5" />
        </button>

        {/* Notifications */}
        <Dropdown>
          <DropdownTrigger asChild>
            <button
              className={cn(
                'relative inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius-md)]',
                'text-[hsl(var(--foreground))]',
                'transition-colors hover:bg-[hsl(var(--accent))]'
              )}
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span
                  className={cn(
                    'absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center',
                    'rounded-full bg-[hsl(var(--destructive))] text-[10px] font-medium text-white'
                  )}
                >
                  {unreadCount}
                </span>
              )}
            </button>
          </DropdownTrigger>
          <DropdownContent align="end" className="w-80">
            <DropdownLabel>Notifications</DropdownLabel>
            <DropdownSeparator />
            {notifications.map((notification) => (
              <DropdownItem key={notification.id} className="flex flex-col items-start gap-1">
                <div className="flex w-full items-center justify-between">
                  <span className="font-medium">{notification.title}</span>
                  {notification.unread && (
                    <span className="h-2 w-2 rounded-full bg-[hsl(var(--primary))]" />
                  )}
                </div>
                <span className="text-xs text-[hsl(var(--muted-foreground))]">
                  {notification.time}
                </span>
              </DropdownItem>
            ))}
            <DropdownSeparator />
            <DropdownItem className="justify-center text-[hsl(var(--primary))]">
              View all notifications
            </DropdownItem>
          </DropdownContent>
        </Dropdown>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* User Menu */}
        <Dropdown>
          <DropdownTrigger asChild>
            <button
              className={cn(
                'flex items-center gap-3 rounded-[var(--radius-md)] p-1.5',
                'transition-colors hover:bg-[hsl(var(--accent))]'
              )}
            >
              <Avatar
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                alt="John Doe"
                size="sm"
              />
              <div className="hidden text-left lg:block">
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-[hsl(var(--muted-foreground))]">Admin</p>
              </div>
            </button>
          </DropdownTrigger>
          <DropdownContent align="end" className="w-56">
            <DropdownLabel>My Account</DropdownLabel>
            <DropdownSeparator />
            <DropdownItem>
              <User className="h-4 w-4" />
              <span>Profile</span>
            </DropdownItem>
            <DropdownItem>
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </DropdownItem>
            <DropdownSeparator />
            <DropdownItem destructive>
              <LogOut className="h-4 w-4" />
              <span>Log out</span>
            </DropdownItem>
          </DropdownContent>
        </Dropdown>
      </div>
    </header>
  )
}
