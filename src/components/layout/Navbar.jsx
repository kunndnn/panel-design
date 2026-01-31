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
        'bg-background/80 backdrop-blur-md border-b border-border transition-all duration-(--transition-slow) ease-in-out',
        'left-0',
        isCollapsed
          ? 'lg:left-0'
          : 'lg:left-0'
      )}
    >
      <div className={cn(
        'flex h-full items-center justify-between px-4 lg:px-8 transition-all duration-(--transition-slow)',
        isCollapsed ? 'lg:pl-[calc(var(--sidebar-collapsed-width)+1.5rem)]' : 'lg:pl-[calc(var(--sidebar-width)+1.5rem)]'
      )}>
        <div className="flex items-center gap-4">
          <MobileMenuButton />

          <div className="hidden md:flex relative group max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-9 w-[240px] lg:w-[320px] bg-muted/50 border-transparent hover:border-border focus:bg-background transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 lg:gap-4">
          <ThemeToggle />

          <Dropdown>
            <DropdownTrigger asChild>
              <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-md">
                <Bell className="h-4.5 w-4.5" />
                <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-primary ring-2 ring-background" />
              </Button>
            </DropdownTrigger>
            <DropdownContent align="end" className="w-80 p-0">
              <div className="p-4 border-b border-border/40">
                <h3 className="font-semibold">Notifications</h3>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-4 flex gap-3 hover:bg-muted/40 transition-colors cursor-pointer border-b border-border/20 last:border-0">
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
              <button className="flex items-center gap-2 p-1 rounded-md hover:bg-muted transition-colors group focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ring-offset-background">
                <Avatar
                  src="https://i.pravatar.cc/150"
                  alt="User"
                  className="h-8 w-8 grayscale-[0.5] group-hover:grayscale-0 transition-all"
                />
                <div className="hidden sm:block text-left mr-1">
                  <p className="text-sm font-medium leading-none">John Doe</p>
                  <p className="text-[10px] uppercase font-semibold text-muted-foreground mt-1 tracking-wider">Admin</p>
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
