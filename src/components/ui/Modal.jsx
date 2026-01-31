import { useEffect, useRef, createContext, useContext } from 'react'
import { X } from 'lucide-react'
import { cn } from '../../lib/utils'

const ModalContext = createContext(undefined)

function Modal({ children, open, onOpenChange }) {
  const previousActiveElement = useRef(null)

  useEffect(() => {
    if (open) {
      previousActiveElement.current = document.activeElement
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      if (previousActiveElement.current) {
        previousActiveElement.current.focus()
      }
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && open) {
        onOpenChange(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [open, onOpenChange])

  if (!open) return null

  return (
    <ModalContext.Provider value={{ onOpenChange }}>
      {children}
    </ModalContext.Provider>
  )
}

function ModalOverlay({ className }) {
  const { onOpenChange } = useContext(ModalContext)

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 bg-black/50 backdrop-blur-sm',
        'animate-in',
        className
      )}
      onClick={() => onOpenChange(false)}
      aria-hidden="true"
    />
  )
}

function ModalContent({ children, className }) {
  const contentRef = useRef(null)

  // Focus trap
  useEffect(() => {
    const focusableElements = contentRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const firstElement = focusableElements?.[0]
    const lastElement = focusableElements?.[focusableElements.length - 1]

    const handleTab = (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault()
          lastElement?.focus()
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault()
          firstElement?.focus()
        }
      }
    }

    document.addEventListener('keydown', handleTab)
    firstElement?.focus()

    return () => document.removeEventListener('keydown', handleTab)
  }, [])

  return (
    <div
      ref={contentRef}
      role="dialog"
      aria-modal="true"
      className={cn(
        'fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2',
        'rounded-lg border border-[hsl(var(--border))]',
        'bg-[hsl(var(--background))] p-6',
        'shadow-(--shadow-xl)',
        'animate-scale-in',
        className
      )}
    >
      {children}
    </div>
  )
}

function ModalHeader({ children, className }) {
  return (
    <div className={cn('mb-4 flex flex-col space-y-1.5', className)}>
      {children}
    </div>
  )
}

function ModalTitle({ children, className }) {
  return (
    <h2
      className={cn('text-lg font-semibold leading-none tracking-tight', className)}
    >
      {children}
    </h2>
  )
}

function ModalDescription({ children, className }) {
  return (
    <p className={cn('text-sm text-[hsl(var(--muted-foreground))]', className)}>
      {children}
    </p>
  )
}

function ModalFooter({ children, className }) {
  return (
    <div
      className={cn(
        'mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end',
        className
      )}
    >
      {children}
    </div>
  )
}

function ModalClose({ children, className }) {
  const { onOpenChange } = useContext(ModalContext)

  if (children) {
    return (
      <div onClick={() => onOpenChange(false)} className={className}>
        {children}
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={() => onOpenChange(false)}
      className={cn(
        'absolute right-4 top-4 rounded-sm p-1',
        'opacity-70 transition-opacity hover:opacity-100',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))]',
        className
      )}
    >
      <X className="h-4 w-4" />
      <span className="sr-only">Close</span>
    </button>
  )
}

export {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalFooter,
  ModalClose,
}
