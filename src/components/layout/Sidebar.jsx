import { useState, createContext, useContext } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
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
import { cn } from '../../lib/utils'
import { Tooltip } from '../ui'

const SidebarContext = createContext(undefined)

const navItems = [
  { path: '/', label: 'Overview', icon: LayoutDashboard },
  { path: '/table', label: 'Analytics', icon: Table2 },
  { path: '/users', label: 'Community', icon: Users },
  { path: '/profile', label: 'My Account', icon: User },
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
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={closeMobile}
          />
        )}
      </AnimatePresence>

      <motion.aside
        animate={{
          width: isCollapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)',
          x: isMobileOpen || !isCollapsed ? 0 : (window.innerWidth < 1024 ? -300 : 0)
        }}
        className={cn(
          'fixed left-0 top-0 z-50 flex h-screen flex-col',
          'border-r border-[hsl(var(--border)/0.5)]',
          'glass',
          'transition-transform duration-(--transition-slow) lg:translate-x-0',
          !isMobileOpen && '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Logo Section */}
        <div
          className={cn(
            'flex h-(--navbar-height) items-center border-b border-[hsl(var(--border)/0.5)]',
            isCollapsed ? 'justify-center px-2' : 'px-6'
          )}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-[hsl(var(--primary))] to-[hsl(var(--primary)/0.8)] shadow-lg glow-primary">
              <span className="text-xl font-bold text-white">A</span>
            </div>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-xl font-bold tracking-tight text-[hsl(var(--foreground))]"
              >
                Horizon
              </motion.span>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-6">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path
              const Icon = item.icon

              const linkContent = (
                <NavLink
                  to={item.path}
                  onClick={closeMobile}
                  className={cn(
                    'group relative flex items-center gap-3 rounded-xl px-3 py-3',
                    'text-sm font-medium transition-all duration-300',
                    isActive
                      ? 'bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] shadow-lg glow-primary'
                      : 'text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--primary))]',
                    isCollapsed && 'justify-center px-0'
                  )}
                >
                  <Icon className={cn('h-5 w-5 shrink-0 transition-transform duration-300 group-hover:scale-110')} />

                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="truncate"
                    >
                      {item.label}
                    </motion.span>
                  )}

                  {isActive && !isCollapsed && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute right-2 h-1.5 w-1.5 rounded-full bg-white shadow-sm"
                    />
                  )}
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

        {/* Footer Toggle */}
        <div className="border-t border-[hsl(var(--border)/0.5)] p-4">
          <button
            onClick={toggle}
            className={cn(
              'flex w-full items-center gap-3 rounded-xl px-3 py-3',
              'text-sm font-medium text-[hsl(var(--muted-foreground))]',
              'transition-all duration-300 hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--primary))]',
              isCollapsed && 'justify-center px-0'
            )}
          >
            <motion.div
              animate={{ rotate: isCollapsed ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronLeft className="h-5 w-5" />
            </motion.div>
            {!isCollapsed && <span>Minimize View</span>}
          </button>
        </div>
      </motion.aside>
    </>
  )
}

export function MobileMenuButton() {
  const { toggleMobile } = useSidebar()

  return (
    <button
      onClick={toggleMobile}
      className={cn(
        'inline-flex h-10 w-10 items-center justify-center rounded-xl',
        'bg-[hsl(var(--card)/0.5)] border border-[hsl(var(--border)/0.5)]',
        'text-[hsl(var(--foreground))] shadow-sm transition-all hover:bg-[hsl(var(--accent))]',
        'lg:hidden'
      )}
      aria-label="Toggle menu"
    >
      <Menu className="h-5 w-5" />
    </button>
  )
}
