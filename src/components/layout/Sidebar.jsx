import { useState, createContext, useContext } from 'react'
import { NavLink, useLocation, useResolvedPath, useMatch } from 'react-router-dom'
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
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'fixed left-0 top-0 z-50 flex h-screen flex-col',
          'border-r border-border bg-background',
          'transition-transform duration-(--transition-slow) lg:translate-x-0',
          !isMobileOpen && '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Logo Section */}
        <div
          className={cn(
            'flex h-(--navbar-height) items-center border-b border-[hsl(var(--border)/0.5)]',
            isCollapsed ? 'justify-center px-2' : 'px-4'
          )}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
              <span className="text-lg font-bold">A</span>
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
              const Icon = item.icon
              const resolvedPath = useResolvedPath(item.path)
              const match = useMatch({ path: resolvedPath.pathname, end: item.path === '/' })
              const isActive = !!match

              const link = (
                <NavLink
                  to={item.path}
                  onClick={closeMobile}
                  className={cn(
                    'group relative flex w-full items-center gap-3 rounded-md px-3 py-2',
                    'text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))] dark:bg-[hsl(var(--primary)/0.15)] shadow-[inset_0_0_0_1px_hsl(var(--primary)/0.1)]'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                    isCollapsed && 'justify-center px-0'
                  )}
                >
                  <Icon className={cn(
                    'h-5 w-5 shrink-0 transition-transform duration-200 group-active:scale-95',
                    isActive ? 'text-[hsl(var(--primary))]' : 'text-muted-foreground group-hover:text-foreground'
                  )} />

                  <AnimatePresence initial={false}>
                    {!isCollapsed && (
                      <motion.span
                        initial={{ opacity: 0, x: -4 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -4 }}
                        transition={{
                          duration: 0.2,
                          ease: 'easeOut',
                          delay: 0.05
                        }}
                        className="flex-1 truncate"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {!isCollapsed && (
                    <motion.div
                      initial={{ opacity: 0, scaleY: 0.5 }}
                      animate={{
                        opacity: isActive ? 1 : 0,
                        scaleY: isActive ? 1 : 0.5
                      }}
                      className="absolute left-0 w-1 h-5 bg-[hsl(var(--primary))] rounded-r-full shadow-[0_0_10px_hsl(var(--primary)/0.4)]"
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                    />
                  )}
                </NavLink>
              )

              return (
                <li key={item.path}>
                  {isCollapsed ? (
                    <Tooltip content={item.label} side="right" className="w-full">
                      {link}
                    </Tooltip>
                  ) : (
                      link
                  )}
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Footer Toggle */}
        <div className="border-t border-border p-4">
          <button
            onClick={toggle}
            className={cn(
              'flex w-full items-center gap-3 rounded-md px-3 py-2',
              'text-sm font-medium text-muted-foreground',
              'transition-colors hover:bg-muted hover:text-foreground',
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
        'inline-flex h-9 w-9 items-center justify-center rounded-md',
        'bg-background border border-border',
        'text-foreground shadow-sm transition-colors hover:bg-muted',
        'lg:hidden'
      )}
      aria-label="Toggle menu"
    >
      <Menu className="h-5 w-5" />
    </button>
  )
}
