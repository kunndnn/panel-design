import { forwardRef } from 'react'
import { cn } from '../../lib/utils'

export const Input = forwardRef(({ className, type, icon: Icon, error, ...props }, ref) => {
  return (
    <div className="relative group w-full">
      {Icon && (
        <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-[hsl(var(--muted-foreground))] transition-colors group-focus-within:text-[hsl(var(--primary))]" />
      )}
      <input
        type={type}
        className={cn(
          'flex h-12 w-full rounded-xl border border-[hsl(var(--border)/0.8)] bg-[hsl(var(--background))] px-4 py-2 text-sm ring-offset-[hsl(var(--background))] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[hsl(var(--muted-foreground))] transition-all',
          'hover:border-[hsl(var(--primary)/0.3)]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--primary)/0.3)] focus-visible:border-[hsl(var(--primary)/0.5)]',
          'disabled:cursor-not-allowed disabled:opacity-50',
          Icon && 'pl-11',
          error && 'border-[hsl(var(--destructive))] focus-visible:ring-[hsl(var(--destructive)/0.3)]',
          className
        )}
        ref={ref}
        {...props}
      />
      {error && (
        <p className="mt-1.5 text-xs font-semibold text-[hsl(var(--destructive))] animate-in">
          {error}
        </p>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export function Label({ className, ...props }) {
  return (
    <label
      className={cn(
        'text-xs font-black uppercase tracking-widest text-[hsl(var(--muted-foreground))] mb-2 block',
        className
      )}
      {...props}
    />
  )
}
