import { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'

function Tooltip({ children, content, side = 'top', className }) {
  const [isVisible, setIsVisible] = useState(false)
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const triggerRef = useRef(null)
  const tooltipRef = useRef(null)

  useEffect(() => {
    if (isVisible && triggerRef.current && tooltipRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect()
      const tooltipRect = tooltipRef.current.getBoundingClientRect()

      let top, left

      switch (side) {
        case 'top':
          top = triggerRect.top - tooltipRect.height - 8
          left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2
          break
        case 'bottom':
          top = triggerRect.bottom + 8
          left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2
          break
        case 'left':
          top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2
          left = triggerRect.left - tooltipRect.width - 8
          break
        case 'right':
          top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2
          left = triggerRect.right + 8
          break
        default:
          top = triggerRect.top - tooltipRect.height - 8
          left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2
      }

      setPosition({ top, left })
    }
  }, [isVisible, side])

  return (
    <div className="relative inline-flex">
      <div
        ref={triggerRef}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
      >
        {children}
      </div>

      {isVisible && (
        <div
          ref={tooltipRef}
          role="tooltip"
          className={cn(
            'fixed z-50 px-3 py-1.5 text-xs font-medium',
            'rounded-[var(--radius-md)]',
            'bg-[hsl(var(--foreground))] text-[hsl(var(--background))]',
            'shadow-[var(--shadow-md)]',
            'animate-in',
            className
          )}
          style={{ top: position.top, left: position.left }}
        >
          {content}
        </div>
      )}
    </div>
  )
}

export { Tooltip }
