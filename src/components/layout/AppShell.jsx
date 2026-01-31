import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { cn } from '../../lib/utils'
import { Sidebar, SidebarProvider, useSidebar } from './Sidebar'
import { Navbar } from './Navbar'

function AppShellContent({ children }) {
  const { isCollapsed } = useSidebar()
  const location = useLocation()

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">

      <Sidebar />
      <Navbar />

      <main
        className={cn(
          'min-h-screen pt-(--navbar-height) transition-all duration-300 ease-in-out',
          isCollapsed
            ? 'lg:pl-(--sidebar-collapsed-width)'
            : 'lg:pl-(--sidebar-width)'
        )}
      >
        <div className="mx-auto w-full max-w-[1600px] p-4 lg:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{
                duration: 0.24,
                ease: [0.16, 1, 0.3, 1] // easeOutExpo equivalent
              }}
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
