import { useState, useRef, useEffect, createContext, useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { cn } from '../../lib/utils'

const DropdownContext = createContext(undefined)

function Dropdown({ children, className }) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  return (
    <DropdownContext.Provider value={{ isOpen, setIsOpen }}>
      <div ref={dropdownRef} className={cn('relative inline-block', className)}>
        {children}
      </div>
    </DropdownContext.Provider>
  )
}

function DropdownTrigger({ children, className, asChild }) {
  const { isOpen, setIsOpen } = useContext(DropdownContext)

  const handleClick = () => setIsOpen(!isOpen)
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setIsOpen(!isOpen)
    }
  }

  if (asChild) {
    return (
      <div onClick={handleClick} onKeyDown={handleKeyDown}>
        {children}
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={cn(
        'inline-flex items-center justify-center gap-2',
        'rounded-md px-4 py-2 text-sm font-medium',
        'border border-[hsl(var(--border))]',
        'bg-[hsl(var(--background))] text-[hsl(var(--foreground))]',
        'hover:bg-[hsl(var(--accent))]',
        'transition-colors duration-(--transition-normal)',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))]',
        className
      )}
      aria-expanded={isOpen}
      aria-haspopup="menu"
    >
      {children}
      <ChevronDown
        className={cn(
          'h-4 w-4 transition-transform duration-(--transition-normal)',
          isOpen && 'rotate-180'
        )}
      />
    </button>
  )
}

function DropdownContent({ children, className, align = 'start' }) {
  const { isOpen } = useContext(DropdownContext)

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="menu"
          initial={{ opacity: 0, y: 8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.98 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            'absolute z-50 mt-2 min-w-32 overflow-hidden',
            'rounded-md border border-border',
            'bg-popover text-popover-foreground',
            'shadow-lg',
            align === 'start' && 'left-0',
            align === 'end' && 'right-0',
            align === 'center' && 'left-1/2 -translate-x-1/2',
            className
          )}
        >
          <div className="p-1">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function DropdownItem({ children, className, onClick, disabled, destructive }) {
  const { setIsOpen } = useContext(DropdownContext)

  const handleClick = () => {
    if (!disabled) {
      onClick?.()
      setIsOpen(false)
    }
  }

  return (
    <button
      type="button"
      role="menuitem"
      onClick={handleClick}
      disabled={disabled}
      className={cn(
        'relative flex w-full cursor-pointer select-none items-center gap-2',
        'rounded-sm px-2 py-1.5 text-sm',
        'outline-none transition-colors duration-(--transition-fast)',
        'hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))]',
        'focus:bg-[hsl(var(--accent))] focus:text-[hsl(var(--accent-foreground))]',
        disabled && 'pointer-events-none opacity-50',
        destructive && 'text-[hsl(var(--destructive))] hover:bg-[hsl(var(--destructive)/0.1)]',
        className
      )}
    >
      {children}
    </button>
  )
}

function DropdownSeparator({ className }) {
  return (
    <div
      className={cn('my-1 h-px bg-[hsl(var(--border))]', className)}
      role="separator"
    />
  )
}

function DropdownLabel({ children, className }) {
  return (
    <div
      className={cn(
        'px-2 py-1.5 text-xs font-semibold text-[hsl(var(--muted-foreground))]',
        className
      )}
    >
      {children}
    </div>
  )
}

export {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
  DropdownLabel,
}
