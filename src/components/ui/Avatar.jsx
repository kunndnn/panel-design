import { forwardRef } from 'react'
import { cva } from 'class-variance-authority'
import { cn, getInitials } from '@/lib/utils'

const avatarVariants = cva(
  [
    'relative flex shrink-0 items-center justify-center overflow-hidden rounded-full',
    'bg-[hsl(var(--muted))]',
  ],
  {
    variants: {
      size: {
        sm: 'h-8 w-8 text-xs',
        md: 'h-10 w-10 text-sm',
        lg: 'h-12 w-12 text-base',
        xl: 'h-16 w-16 text-lg',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

const Avatar = forwardRef(
  ({ className, size, src, alt, fallback, ...props }, ref) => {
    const initials = fallback || (alt ? getInitials(alt) : '?')

    return (
      <div
        ref={ref}
        className={cn(avatarVariants({ size }), className)}
        {...props}
      >
        {src ? (
          <img
            src={src}
            alt={alt}
            className="aspect-square h-full w-full object-cover"
          />
        ) : (
          <span className="font-medium text-[hsl(var(--muted-foreground))]">
            {initials}
          </span>
        )}
      </div>
    )
  }
)

Avatar.displayName = 'Avatar'

const AvatarGroup = forwardRef(({ className, children, max = 4, ...props }, ref) => {
  const childArray = Array.isArray(children) ? children : [children]
  const visibleChildren = childArray.slice(0, max)
  const remainingCount = childArray.length - max

  return (
    <div
      ref={ref}
      className={cn('flex -space-x-3', className)}
      {...props}
    >
      {visibleChildren.map((child, index) => (
        <div
          key={index}
          className="ring-2 ring-[hsl(var(--background))] rounded-full"
        >
          {child}
        </div>
      ))}
      {remainingCount > 0 && (
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[hsl(var(--muted))] ring-2 ring-[hsl(var(--background))]">
          <span className="text-sm font-medium text-[hsl(var(--muted-foreground))]">
            +{remainingCount}
          </span>
        </div>
      )}
    </div>
  )
})

AvatarGroup.displayName = 'AvatarGroup'

export { Avatar, AvatarGroup, avatarVariants }
