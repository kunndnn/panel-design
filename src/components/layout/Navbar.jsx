import { Bell, Search, User, LogOut, Settings, HelpCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { useSidebar, MobileMenuButton } from './Sidebar'
import {
  Button,
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
  DropdownLabel,
  Avatar,
  Badge,
} from '../ui'
import { ThemeToggle } from '../ThemeToggle'
import { cn } from '../../lib/utils'

export function Navbar() {
  const { isCollapsed } = useSidebar()

  return (
    <header
      className={cn(
        'fixed top-0 right-0 z-30 h-(--navbar-height)',
        'glass-nav transition-all duration-(--transition-slow) ease-in-out',
        'left-0 lg:left-0',
        isCollapsed
          ? 'lg:left-0'
          : 'lg:left-0'
      )}
    >
      <div className={cn(
        'flex h-full items-center justify-between px-4 lg:px-8 transition-all duration-(--transition-slow)',
        isCollapsed ? 'lg:pl-[calc(var(--sidebar-collapsed-width)+2rem)]' : 'lg:pl-[calc(var(--sidebar-width)+2rem)]'
      )}>
        <div className="flex items-center gap-4">
          <MobileMenuButton />

          <div className="hidden md:flex relative group max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[hsl(var(--muted-foreground))] transition-colors group-focus-within:text-[hsl(var(--primary))]" />
            <Input
              type="search"
              placeholder="Search anything..."
              className="pl-10 w-[300px] lg:w-[400px] border-none bg-[hsl(var(--muted)/0.5)] rounded-xl focus-visible:ring-2 focus-visible:ring-[hsl(var(--primary)/0.3)] transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 lg:gap-4">
          <ThemeToggle />

          <Dropdown>
            <DropdownTrigger asChild>
              <Button variant="ghost" size="icon" className="relative h-10 w-10 rounded-xl hover:bg-[hsl(var(--accent))]">
                <Bell className="h-5 w-5" />
                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[hsl(var(--primary))] ring-2 ring-[hsl(var(--background))]" />
              </Button>
            </DropdownTrigger>
            <DropdownContent align="end" className="w-80 p-0">
              <div className="p-4 border-b border-[hsl(var(--border))]">
                <h3 className="font-semibold">Notifications</h3>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-4 flex gap-3 hover:bg-[hsl(var(--muted)/0.5)] transition-colors cursor-pointer border-b border-[hsl(var(--border)/0.5)] last:border-0">
                    <div className="h-10 w-10 rounded-full bg-[hsl(var(--primary)/0.1)] flex items-center justify-center shrink-0">
                      <Bell className="h-5 w-5 text-[hsl(var(--primary))]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">New sales report is ready</p>
                      <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">2 minutes ago</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-2">
                <Button variant="ghost" className="w-full text-xs h-8">View all notifications</Button>
              </div>
            </DropdownContent>
          </Dropdown>

          <Dropdown>
            <DropdownTrigger asChild>
              <button className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-[hsl(var(--accent))] transition-all group">
                <Avatar
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
                  alt="User"
                  className="h-9 w-9 border-2 border-[hsl(var(--primary)/0.2)] group-hover:border-[hsl(var(--primary)/0.5)] transition-all"
                />
                <div className="hidden sm:block text-left mr-2">
                  <p className="text-sm font-semibold leading-none">John Doe</p>
                  <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">Admin</p>
                </div>
              </button>
            </DropdownTrigger>
            <DropdownContent align="end" className="w-56 mt-2">
              <DropdownLabel>My Account</DropdownLabel>
              <DropdownSeparator />
              <DropdownItem className="gap-2">
                <User className="h-4 w-4" /> Profile
              </DropdownItem>
              <DropdownItem className="gap-2">
                <Settings className="h-4 w-4" /> Settings
              </DropdownItem>
              <DropdownItem className="gap-2">
                <HelpCircle className="h-4 w-4" /> Help Center
              </DropdownItem>
              <DropdownSeparator />
              <DropdownItem destructive className="gap-2">
                <LogOut className="h-4 w-4" /> Sign out
              </DropdownItem>
            </DropdownContent>
          </Dropdown>
        </div>
      </div>
    </header>
  )
}
