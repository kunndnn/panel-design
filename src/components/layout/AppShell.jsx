import { cn } from '@/lib/utils'
import { Sidebar, SidebarProvider, useSidebar } from './Sidebar'
import { Navbar } from './Navbar'

function AppShellContent({ children }) {
  const { isCollapsed } = useSidebar()

  return (
    <div className="min-h-screen bg-[hsl(var(--background))]">
      <Sidebar />
      <Navbar />

      <main
        className={cn(
          'min-h-screen pt-[var(--navbar-height)]',
          'transition-all duration-[var(--transition-slow)]',
          isCollapsed
            ? 'lg:pl-[var(--sidebar-collapsed-width)]'
            : 'lg:pl-[var(--sidebar-width)]'
        )}
      >
        <div className="p-4 lg:p-6">{children}</div>
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
