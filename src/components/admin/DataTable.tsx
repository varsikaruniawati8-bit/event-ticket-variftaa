"use client"
// penanda komponen di jalankan di sisi klient
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
import { ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react"
// komponen ui
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"
// interface data event
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
// fungsi format ke harga rupiah
const fmtPrice = (p: number) =>
  p.toLocaleString("id-ID", { style: "currency", currency: "IDR" })

// columns are created inside the component so action callbacks can be captured

export function DataTable({
  events,
  onEdit,
  onDelete,
  isDeleting,
}: {
  events: EventItem[]
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
  isDeleting?: boolean
}) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false)
  const [selectedEventId, setSelectedEventId] = React.useState<string | null>(null)
  const selectedEvent = events.find((e) => e.id === selectedEventId)
// definnisi kolom tabel
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
              <Button 
                size="sm" 
                variant="destructive" 
                onClick={() => {
                  setSelectedEventId(e.id)
                  setDeleteDialogOpen(true)
                }}
              >
                Hapus
              </Button>
            </div>
          )
        },
      },
    ],
    [onEdit, onDelete]
  )
// inisialisai tabel
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
    <>
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
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((hg) => (
                  <TableRow key={hg.id}>
                    {hg.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between space-x-2 py-4">
            <div className="text-sm text-muted-foreground">
              {table.getFilteredRowModel().rows.length} hasil
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => table.previousPage()} 
                disabled={!table.getCanPreviousPage()}
                className="gap-1"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => table.nextPage()} 
                disabled={!table.getCanNextPage()}
                className="gap-1"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hapus Event</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus event <span className="font-semibold">"{selectedEvent?.name}"</span>? Tindakan ini tidak dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Batal
            </Button>
            <Button
              disabled={isDeleting}
              variant="destructive"
              onClick={() => {
                if (selectedEventId) {
                  onDelete?.(selectedEventId)
                  setDeleteDialogOpen(false)
                  setSelectedEventId(null)
                }
              }}
            >
              Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default DataTable