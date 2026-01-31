import { forwardRef } from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2 whitespace-nowrap',
    'rounded-[var(--radius-md)] font-medium',
    'transition-all duration-[var(--transition-normal)]',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'active:scale-[0.98]',
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]',
          'hover:bg-[hsl(var(--primary)/0.9)]',
          'shadow-[var(--shadow-sm)]',
        ],
        secondary: [
          'bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))]',
          'hover:bg-[hsl(var(--secondary)/0.8)]',
        ],
        outline: [
          'border border-[hsl(var(--border))]',
          'bg-transparent text-[hsl(var(--foreground))]',
          'hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))]',
        ],
        ghost: [
          'bg-transparent text-[hsl(var(--foreground))]',
          'hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))]',
        ],
        destructive: [
          'bg-[hsl(var(--destructive))] text-[hsl(var(--destructive-foreground))]',
          'hover:bg-[hsl(var(--destructive)/0.9)]',
          'shadow-[var(--shadow-sm)]',
        ],
        success: [
          'bg-[hsl(var(--success))] text-[hsl(var(--success-foreground))]',
          'hover:bg-[hsl(var(--success)/0.9)]',
          'shadow-[var(--shadow-sm)]',
        ],
        link: [
          'text-[hsl(var(--primary))] underline-offset-4',
          'hover:underline',
        ],
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 text-sm',
        lg: 'h-11 px-6 text-base',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

const Button = forwardRef(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button, buttonVariants }
