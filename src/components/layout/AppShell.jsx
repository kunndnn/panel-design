import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { cn } from '../../lib/utils'
import { Sidebar, SidebarProvider, useSidebar } from './Sidebar'
import { Navbar } from './Navbar'

function AppShellContent({ children }) {
  const { isCollapsed } = useSidebar()
  const location = useLocation()

  return (
    <div className="relative min-h-screen bg-[hsl(var(--background))] overflow-hidden">
      {/* Background Mesh */}
      <div className="mesh-bg" />

      <Sidebar />
      <Navbar />

      <main
        className={cn(
          'min-h-screen pt-(--navbar-height) transition-all duration-(--transition-slow) ease-in-out',
          isCollapsed
            ? 'lg:pl-(--sidebar-collapsed-width)'
            : 'lg:pl-(--sidebar-width)'
        )}
      >
        <div className="mx-auto w-full max-w-[1600px] p-4 lg:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.99 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}

export function AppShell({ children }) {
  return (
    <SidebarProvider>
      <AppShellContent>{children}</AppShellContent>
    </SidebarProvider>
  )
}
