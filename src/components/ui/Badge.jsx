import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  [
    'inline-flex items-center rounded-[var(--radius-full)]',
    'px-2.5 py-0.5 text-xs font-medium',
    'transition-colors duration-[var(--transition-normal)]',
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]',
        ],
        secondary: [
          'bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))]',
        ],
        outline: [
          'border border-[hsl(var(--border))]',
          'text-[hsl(var(--foreground))]',
        ],
        destructive: [
          'bg-[hsl(var(--destructive))] text-[hsl(var(--destructive-foreground))]',
        ],
        success: [
          'bg-[hsl(var(--success))] text-[hsl(var(--success-foreground))]',
        ],
        warning: [
          'bg-[hsl(var(--warning))] text-[hsl(var(--warning-foreground))]',
        ],
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

function Badge({ className, variant, ...props }) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
