import { forwardRef } from 'react'
import { cva } from 'class-variance-authority'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

export const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2 whitespace-nowrap',
    'rounded-xl font-semibold transition-all duration-300',
    'disabled:pointer-events-none disabled:opacity-50 active:scale-95',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2',
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]',
          'hover:bg-[hsl(var(--primary)/0.9)] hover:shadow-lg hover:shadow-[hsl(var(--primary)/0.25)]',
          'glow-primary',
        ],
        secondary: [
          'bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))]',
          'hover:bg-[hsl(var(--secondary)/0.8)]',
        ],
        outline: [
          'border border-[hsl(var(--border))] bg-transparent',
          'hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))] hover:border-[hsl(var(--primary)/0.3)]',
        ],
        ghost: [
          'bg-transparent hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))]',
        ],
        destructive: [
          'bg-[hsl(var(--destructive))] text-[hsl(var(--destructive-foreground))]',
          'hover:bg-[hsl(var(--destructive)/0.9)] hover:shadow-lg hover:shadow-[hsl(var(--destructive)/0.2)]',
        ],
        success: [
          'bg-[hsl(var(--success))] text-[hsl(var(--success-foreground))]',
          'hover:bg-[hsl(var(--success)/0.9)] hover:shadow-lg hover:shadow-[hsl(var(--success)/0.2)]',
        ],
        link: [
          'text-[hsl(var(--primary))] underline-offset-4 hover:underline',
        ],
      },
      size: {
        sm: 'h-9 px-4 text-xs',
        md: 'h-11 px-6 text-sm',
        lg: 'h-13 px-8 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

export const Button = forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = 'button'

  return (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      ref={ref}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
})

Button.displayName = 'Button'
