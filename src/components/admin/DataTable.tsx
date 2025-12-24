"use client"

import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

export interface EventItem {
  id: string
  name: string
  category: string
  date: string
  price: number
  location: string
  description?: string
  image?: string
}

const fmtPrice = (p: number) =>
  p.toLocaleString("id-ID", { style: "currency", currency: "IDR" })

// columns are created inside the component so action callbacks can be captured

export function DataTable({
  events,
  onEdit,
  onDelete,
}: {
  events: EventItem[]
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
}) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})

  const columns = React.useMemo<ColumnDef<EventItem>[]>(
    () => [
      {
        accessorKey: "name",
        header: () => (
          <div className="flex items-center gap-2">
            Nama
            <ArrowUpDown className="opacity-60" />
          </div>
        ),
        cell: (info) => <div className="font-medium">{info.getValue() as string}</div>,
      },
      { accessorKey: "category", header: "Kategori" },
      {
        accessorKey: "date",
        header: "Tanggal",
        cell: (info) => new Date(info.getValue() as string).toLocaleDateString(),
      },
      {
        accessorKey: "price",
        header: "Harga",
        cell: (info) => <div className="text-right">{fmtPrice(Number(info.getValue()))}</div>,
      },
      { accessorKey: "location", header: "Lokasi" },
      {
        id: "actions",
        header: "",
        cell: ({ row }) => {
          const e = row.original
          return (
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => onEdit?.(e.id)}>
                Edit
              </Button>
              <Button size="sm" variant="destructive" onClick={() => onDelete?.(e.id)}>
                Hapus
              </Button>
            </div>
          )
        },
      },
    ],
    [onEdit, onDelete]
  )

  const table = useReactTable({
    data: events,
    columns,
    state: { sorting, columnFilters, columnVisibility },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Daftar Event</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-4">
          <Input
            placeholder="Filter nama..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(e) => table.getColumn("name")?.setFilterValue(e.target.value)}
            className="max-w-sm"
          />
          <div className="ml-auto text-sm text-muted-foreground">
            {table.getFilteredRowModel().rows.length} hasil
          </div>
        </div>

        <div className="overflow-hidden rounded-md border">
          <table className="w-full table-auto">
            <thead className="bg-background">
              {table.getHeaderGroups().map((hg) => (
                <tr key={hg.id}>
                  {hg.headers.map((header) => (
                    <th key={header.id} className="p-2 text-left text-sm font-medium">
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="border-t">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="p-2 align-top">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="p-6 text-center text-sm text-muted-foreground">
                    No results.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-end space-x-2 py-4">
          <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default DataTable
