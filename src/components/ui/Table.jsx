import { useState, useMemo } from 'react'
import { ChevronUp, ChevronDown, ChevronsUpDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../lib/utils'
import { Button } from './Button'

function Table({ children, className }) {
  return (
    <div className="relative w-full overflow-hidden rounded-lg border border-border bg-card">
      <div className="overflow-auto">
        <table className={cn('w-full caption-bottom text-sm', className)}>
          {children}
        </table>
      </div>
    </div>
  )
}

function TableHeader({ children, className }) {
  return (
    <thead className={cn('bg-muted/30', className)}>
      {children}
    </thead>
  )
}

function TableBody({ children, className }) {
  return <tbody className={cn('[&_tr:last-child]:border-0', className)}>{children}</tbody>
}

function TableRow({ children, className, onClick, selected }) {
  return (
    <motion.tr
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      onClick={onClick}
      className={cn(
        'border-b border-border/50 transition-colors',
        'hover:bg-muted/30',
        onClick && 'cursor-pointer active:bg-muted/50',
        selected && 'bg-muted',
        className
      )}
    >
      {children}
    </motion.tr>
  )
}

function TableHead({ children, className, sortable, sorted, sortDirection, onSort }) {
  return (
    <th
      onClick={sortable ? onSort : undefined}
      className={cn(
        'h-12 px-4 text-left align-middle font-medium text-muted-foreground text-xs',
        sortable && 'cursor-pointer select-none hover:text-foreground transition-colors',
        className
      )}
    >
      <div className="flex items-center gap-2">
        {children}
        {sortable && (
          <span className="inline-flex transition-transform duration-300">
            {sorted ? (
              sortDirection === 'asc' ? (
                <ChevronUp className="h-3.5 w-3.5 text-[hsl(var(--primary))]" />
              ) : (
                  <ChevronDown className="h-3.5 w-3.5 text-[hsl(var(--primary))]" />
              )
            ) : (
                <ChevronsUpDown className="h-3.5 w-3.5 opacity-30" />
            )}
          </span>
        )}
      </div>
    </th>
  )
}

function TableCell({ children, className }) {
  return (
    <td className={cn('p-4 align-middle font-medium', className)}>
      {children}
    </td>
  )
}

function TableEmpty({ children, className, colSpan }) {
  return (
    <TableRow className="hover:bg-transparent">
      <td
        colSpan={colSpan}
        className={cn(
          'h-32 text-center text-muted-foreground font-medium',
          className
        )}
      >
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
            <ChevronsUpDown className="h-5 w-5 text-muted-foreground/50" />
          </div>
          {children || 'No results found.'}
        </div>
      </td>
    </TableRow>
  )
}

function TableSkeleton({ columns, rows = 5 }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <TableRow key={`skeleton-${i}`} className="hover:bg-transparent">
          {Array.from({ length: columns }).map((_, j) => (
            <TableCell key={`cell-${j}`}>
              <div className="h-4 w-full rounded-sm skeleton-shimmer" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  )
}

function TablePagination({
  currentPage,
  totalPages,
  onPageChange,
  pageSize,
  totalItems,
  className,
}) {
  const startItem = (currentPage - 1) * pageSize + 1
  const endItem = Math.min(currentPage * pageSize, totalItems)

  return (
    <div
      className={cn(
        'flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 bg-[hsl(var(--card))] border-t border-[hsl(var(--border)/0.5)]',
        className
      )}
    >
      <p className="text-xs font-bold text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
        Showing <span className="text-[hsl(var(--foreground))]">{startItem}</span> - <span className="text-[hsl(var(--foreground))]">{endItem}</span> of <span className="text-[hsl(var(--foreground))]">{totalItems}</span>
      </p>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-md"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="flex items-center gap-1">
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum
            if (totalPages <= 5) {
              pageNum = i + 1
            } else if (currentPage <= 3) {
              pageNum = i + 1
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i
            } else {
              pageNum = currentPage - 2 + i
            }
            return (
              <Button
                key={pageNum}
                variant={currentPage === pageNum ? 'default' : 'ghost'}
                size="sm"
                className={cn(
                  'h-8 w-8 rounded-md font-bold text-xs',
                  currentPage === pageNum ? 'shadow-sm' : ''
                )}
                onClick={() => onPageChange(pageNum)}
              >
                {pageNum}
              </Button>
            )
          })}
        </div>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-md"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

function DataTable({
  data,
  columns,
  pageSize = 10,
  className,
  onRowClick,
  emptyMessage,
}) {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' })
  const [currentPage, setCurrentPage] = useState(1)

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data

    return [...data].sort((a, b) => {
      const aVal = a[sortConfig.key]
      const bVal = b[sortConfig.key]

      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1
      return 0
    })
  }, [data, sortConfig])

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return sortedData.slice(start, start + pageSize)
  }, [sortedData, currentPage, pageSize])

  const totalPages = Math.ceil(data.length / pageSize)

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }))
  }

  return (
    <div className={cn('space-y-4', className)}>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            {columns.map((column) => (
              <TableHead
                key={column.key}
                sortable={column.sortable}
                sorted={sortConfig.key === column.key}
                sortDirection={sortConfig.direction}
                onSort={() => column.sortable && handleSort(column.key)}
                className={column.headerClassName}
              >
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          <AnimatePresence mode="popLayout">
            {paginatedData.length === 0 ? (
              <TableEmpty colSpan={columns.length}>{emptyMessage}</TableEmpty>
            ) : (
              paginatedData.map((row, rowIndex) => (
                <TableRow
                  key={row.id || rowIndex}
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                >
                  {columns.map((column) => (
                    <TableCell key={column.key} className={column.cellClassName}>
                      {column.render ? column.render(row) : row[column.key]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </AnimatePresence>
        </TableBody>
      </Table>
      {totalPages > 1 && (
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          pageSize={pageSize}
          totalItems={data.length}
          className="rounded-lg border border-border shadow-sm"
        />
      )}
    </div>
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableEmpty,
  TablePagination,
  TableSkeleton,
  DataTable,
}
