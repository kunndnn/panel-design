import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

const Input = forwardRef(
  ({ className, type = 'text', icon: Icon, error, ...props }, ref) => {
    return (
      <div className="relative">
        {Icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Icon className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
          </div>
        )}
        <input
          type={type}
          className={cn(
            'flex h-10 w-full rounded-[var(--radius-md)]',
            'border border-[hsl(var(--input))]',
            'bg-[hsl(var(--background))] text-[hsl(var(--foreground))]',
            'px-3 py-2 text-sm',
            'placeholder:text-[hsl(var(--muted-foreground))]',
            'transition-colors duration-[var(--transition-normal)]',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))]',
            'disabled:cursor-not-allowed disabled:opacity-50',
            Icon && 'pl-10',
            error && 'border-[hsl(var(--destructive))] focus-visible:ring-[hsl(var(--destructive))]',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-xs text-[hsl(var(--destructive))]">{error}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

const Label = forwardRef(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn(
      'text-sm font-medium leading-none',
      'peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
      className
    )}
    {...props}
  />
))

Label.displayName = 'Label'

export { Input, Label }
