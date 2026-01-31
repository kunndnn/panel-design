import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'
import { cn } from '@/lib/utils'

export function ThemeToggle({ className }) {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        'relative inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius-md)]',
        'bg-[hsl(var(--muted))] hover:bg-[hsl(var(--muted-foreground)/0.1)]',
        'text-[hsl(var(--foreground))]',
        'transition-all duration-[var(--transition-normal)]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))]',
        className
      )}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <Sun
        className={cn(
          'h-5 w-5 transition-all duration-[var(--transition-normal)]',
          theme === 'dark' ? 'rotate-90 scale-0' : 'rotate-0 scale-100'
        )}
      />
      <Moon
        className={cn(
          'absolute h-5 w-5 transition-all duration-[var(--transition-normal)]',
          theme === 'dark' ? 'rotate-0 scale-100' : '-rotate-90 scale-0'
        )}
      />
    </button>
  )
}
