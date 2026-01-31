import { useState, createContext, useContext } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  User,
  Table2,
  Settings,
  ChevronLeft,
  ChevronRight,
  Menu,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Tooltip } from '@/components/ui'

const SidebarContext = createContext(undefined)

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/table', label: 'Table', icon: Table2 },
  { path: '/users', label: 'Users', icon: Users },
  { path: '/profile', label: 'Profile', icon: User },
  { path: '/settings', label: 'Settings', icon: Settings },
]

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebar must be used within SidebarProvider')
  }
  return context
}

export function SidebarProvider({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const toggle = () => setIsCollapsed((prev) => !prev)
  const closeMobile = () => setIsMobileOpen(false)
  const toggleMobile = () => setIsMobileOpen((prev) => !prev)

  return (
    <SidebarContext.Provider
      value={{ isCollapsed, isMobileOpen, toggle, closeMobile, toggleMobile }}
    >
      {children}
    </SidebarContext.Provider>
  )
}

export function Sidebar() {
  const { isCollapsed, isMobileOpen, toggle, closeMobile } = useSidebar()
  const location = useLocation()

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={closeMobile}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-50 flex h-screen flex-col',
          'border-r border-[hsl(var(--border))]',
          'bg-[hsl(var(--card))]',
          'transition-all duration-[var(--transition-slow)]',
          isCollapsed ? 'w-[var(--sidebar-collapsed-width)]' : 'w-[var(--sidebar-width)]',
          // Mobile styles
          'lg:translate-x-0',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Logo */}
        <div
          className={cn(
            'flex h-[var(--navbar-height)] items-center border-b border-[hsl(var(--border))]',
            isCollapsed ? 'justify-center px-2' : 'px-6'
          )}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-md)] bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--primary)/0.7)]">
              <span className="text-lg font-bold text-white">A</span>
            </div>
            {!isCollapsed && (
              <span className="text-lg font-semibold tracking-tight text-[hsl(var(--foreground))]">
                AdminPanel
              </span>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-1.5">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path
              const Icon = item.icon

              const linkContent = (
                <NavLink
                  to={item.path}
                  onClick={closeMobile}
                  className={cn(
                    'flex items-center gap-3 rounded-[var(--radius-md)] px-3 py-2.5',
                    'text-sm font-medium',
                    'transition-all duration-[var(--transition-normal)]',
                    'mx-1', // Added horizontal margin to make it less "wide"
                    isActive
                      ? 'bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] shadow-[var(--shadow-sm)]'
                      : 'text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))]',
                    isCollapsed && 'justify-center mx-0 px-2'
                  )}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  {!isCollapsed && <span className="truncate">{item.label}</span>}
                </NavLink>
              )

              return (
                <li key={item.path}>
                  {isCollapsed ? (
                    <Tooltip content={item.label} side="right">
                      {linkContent}
                    </Tooltip>
                  ) : (
                    linkContent
                  )}
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Collapse Toggle */}
        <div className="hidden border-t border-[hsl(var(--border))] p-3 lg:block">
          <button
            onClick={toggle}
            className={cn(
              'flex w-full items-center gap-3 rounded-[var(--radius-md)] px-3 py-2',
              'text-sm font-medium text-[hsl(var(--muted-foreground))]',
              'transition-colors hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--foreground))]',
              isCollapsed && 'justify-center px-2'
            )}
          >
            {isCollapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <>
                <ChevronLeft className="h-5 w-5" />
                <span>Collapse</span>
              </>
            )}
          </button>
        </div>
      </aside>
    </>
  )
}

export function MobileMenuButton() {
  const { toggleMobile } = useSidebar()

  return (
    <button
      onClick={toggleMobile}
      className={cn(
        'inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius-md)]',
        'text-[hsl(var(--foreground))]',
        'transition-colors hover:bg-[hsl(var(--accent))]',
        'lg:hidden'
      )}
      aria-label="Toggle menu"
    >
      <Menu className="h-5 w-5" />
    </button>
  )
}
