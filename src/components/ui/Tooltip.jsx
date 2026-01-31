import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../lib/utils'

export function Tooltip({ children, content, side = 'top', className }) {
  const [isVisible, setIsVisible] = useState(false)
  const timeoutRef = useRef(null)

  const showTooltip = () => {
    timeoutRef.current = setTimeout(() => setIsVisible(true), 200)
  }

  const hideTooltip = () => {
    clearTimeout(timeoutRef.current)
    setIsVisible(false)
  }

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current)
  }, [])

  const sideStyles = {
    top: '-translate-x-1/2 bottom-full mb-3 left-1/2',
    bottom: '-translate-x-1/2 top-full mt-3 left-1/2',
    left: '-translate-y-1/2 right-full mr-3 top-1/2',
    right: '-translate-y-1/2 left-full ml-3 top-1/2',
  }

  const animationVariants = {
    initial: {
      opacity: 0,
      scale: 0.9,
      y: side === 'top' ? 4 : side === 'bottom' ? -4 : 0,
      x: side === 'left' ? 4 : side === 'right' ? -4 : 0
    },
    animate: { opacity: 1, scale: 1, y: 0, x: 0 },
    exit: { opacity: 0, scale: 0.9 }
  }

  return (
    <div
      className="relative inline-flex items-center"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            variants={animationVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className={cn(
              'absolute z-50 whitespace-nowrap rounded-xl bg-[hsl(var(--foreground))] px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-[hsl(var(--background))] shadow-xl ring-1 ring-[hsl(var(--foreground)/0.1)]',
              sideStyles[side],
              className
            )}
            role="tooltip"
          >
            {content}
            {/* Arrow */}
            <div
              className={cn(
                'absolute h-2 w-2 rotate-45 bg-[hsl(var(--foreground))]',
                side === 'top' && 'bottom-[-4px] left-1/2 -translate-x-1/2',
                side === 'bottom' && 'top-[-4px] left-1/2 -translate-x-1/2',
                side === 'left' && 'right-[-4px] top-1/2 -translate-y-1/2',
                side === 'right' && 'left-[-4px] top-1/2 -translate-y-1/2'
              )}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
