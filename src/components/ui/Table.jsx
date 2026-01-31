import { useState, useMemo } from 'react'
import { ChevronUp, ChevronDown, ChevronsUpDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from './Button'

function Table({ children, className }) {
  return (
    <div className="relative w-full overflow-auto rounded-[var(--radius-lg)] border border-[hsl(var(--border))]">
      <table className={cn('w-full caption-bottom text-sm', className)}>
        {children}
      </table>
    </div>
  )
}

function TableHeader({ children, className }) {
  return (
    <thead className={cn('bg-[hsl(var(--muted))]', className)}>
      {children}
    </thead>
  )
}

function TableBody({ children, className }) {
  return <tbody className={cn('[&_tr:last-child]:border-0', className)}>{children}</tbody>
}

function TableRow({ children, className, onClick, selected }) {
  return (
    <tr
      onClick={onClick}
      className={cn(
        'border-b border-[hsl(var(--border))] transition-colors',
        'hover:bg-[hsl(var(--muted)/0.5)]',
        onClick && 'cursor-pointer',
        selected && 'bg-[hsl(var(--muted))]',
        className
      )}
    >
      {children}
    </tr>
  )
}

function TableHead({ children, className, sortable, sorted, sortDirection, onSort }) {
  return (
    <th
      onClick={sortable ? onSort : undefined}
      className={cn(
        'h-12 px-4 text-left align-middle font-medium text-[hsl(var(--muted-foreground))]',
        sortable && 'cursor-pointer select-none hover:text-[hsl(var(--foreground))]',
        className
      )}
    >
      <div className="flex items-center gap-2">
        {children}
        {sortable && (
          <span className="inline-flex">
            {sorted ? (
              sortDirection === 'asc' ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )
            ) : (
              <ChevronsUpDown className="h-4 w-4 opacity-50" />
            )}
          </span>
        )}
      </div>
    </th>
  )
}

function TableCell({ children, className }) {
  return (
    <td className={cn('p-4 align-middle', className)}>
      {children}
    </td>
  )
}

function TableEmpty({ children, className, colSpan }) {
  return (
    <tr>
      <td
        colSpan={colSpan}
        className={cn(
          'h-24 text-center text-[hsl(var(--muted-foreground))]',
          className
        )}
      >
        {children || 'No results found.'}
      </td>
    </tr>
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
        'flex items-center justify-between border-t border-[hsl(var(--border))] px-4 py-3',
        className
      )}
    >
      <p className="text-sm text-[hsl(var(--muted-foreground))]">
        Showing <span className="font-medium">{startItem}</span> to{' '}
        <span className="font-medium">{endItem}</span> of{' '}
        <span className="font-medium">{totalItems}</span> results
      </p>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
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
                size="icon"
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
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

// Higher-order component for sortable/paginated tables
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
    <div className={className}>
      <Table>
        <TableHeader>
          <TableRow>
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
        </TableBody>
      </Table>
      {totalPages > 1 && (
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          pageSize={pageSize}
          totalItems={data.length}
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
  DataTable,
}
