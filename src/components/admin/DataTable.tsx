"use client"
// Penanda bahwa komponen ini dijalankan di sisi client (Next.js App Router)

import * as React from "react"

// Import fungsi dan tipe dari TanStack React Table
import {
  flexRender, // Untuk me-render header dan cell secara fleksibel
  getCoreRowModel, // Model dasar tabel
  getFilteredRowModel, // Model untuk fitur filter
  getPaginationRowModel, // Model untuk pagination
  getSortedRowModel, // Model untuk sorting
  useReactTable, // Hook utama React Table
  type ColumnDef, // Tipe definisi kolom
  type ColumnFiltersState, // Tipe state filter kolom
  type SortingState, // Tipe state sorting
  type VisibilityState, // Tipe state visibilitas kolom
} from "@tanstack/react-table"

import { ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react"
// Icon untuk sorting dan pagination

// Import komponen UI
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

// Interface untuk struktur data event
export interface EventItem {
  id: string
  name: string
  category: string
  date: string
  price: number
  location: string
  description?: string // Optional
  image?: string // Optional
}

// Fungsi untuk memformat harga ke format Rupiah (IDR)
const fmtPrice = (p: number) =>
  p.toLocaleString("id-ID", { style: "currency", currency: "IDR" })

// Kolom dibuat di dalam komponen supaya fungsi aksi (callback) bisa dijalankan

export function DataTable({
  events,
  onEdit,
  onDelete,
  isDeleting,
}: {
  events: EventItem[] // Data event yang ditampilkan
  onEdit?: (id: string) => void // Callback edit event
  onDelete?: (id: string) => void // Callback hapus event
  isDeleting?: boolean // Status loading saat menghapus
}) {
  // State untuk sorting kolom
  const [sorting, setSorting] = React.useState<SortingState>([])

  // State untuk filter kolom
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])

  // State untuk mengatur kolom yang tampil / disembunyikan
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})

  // State untuk dialog konfirmasi hapus
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false)

  // Menyimpan ID event yang dipilih untuk dihapus
  const [selectedEventId, setSelectedEventId] = React.useState<string | null>(null)

  // Mengambil data event yang sedang dipilih
  const selectedEvent = events.find((e) => e.id === selectedEventId)

  // Definisi kolom tabel
  const columns = React.useMemo<ColumnDef<EventItem>[]>(
    () => [
      {
        accessorKey: "name", // Mengambil data dari field name
        header: () => (
          <div className="flex items-center gap-2">
            Nama
            <ArrowUpDown className="opacity-60" />
          </div>
        ),
        cell: (info) => (
          <div className="font-medium">
            {info.getValue() as string}
          </div>
        ),
      },
      {
        accessorKey: "category",
        header: "Kategori",
      },
      {
        accessorKey: "date",
        header: "Tanggal",
        cell: (info) =>
          new Date(info.getValue() as string).toLocaleDateString(),
      },
      {
        accessorKey: "price",
        header: "Harga",
        cell: (info) => (
          <div className="text-right">
            {fmtPrice(Number(info.getValue()))}
          </div>
        ),
      },
      {
        accessorKey: "location",
        header: "Lokasi",
      },
      {
        id: "actions", // Kolom khusus aksi
        header: "",
        cell: ({ row }) => {
          const e = row.original // Data asli baris
          return (
            <div className="flex gap-2">
              {/* Tombol Edit */}
              <Button
                size="sm"
                variant="outline"
                onClick={() => onEdit?.(e.id)}
              >
                Edit
              </Button>

              {/* Tombol Hapus */}
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

  // Inisialisasi tabel menggunakan React Table
  const table = useReactTable({
    data: events,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
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
      {/* Card utama tabel */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Event</CardTitle>
        </CardHeader>

        <CardContent>
          {/* Input filter nama */}
          <div className="flex items-center gap-4 mb-4">
            <Input
              placeholder="Filter nama..."
              value={
                (table.getColumn("name")?.getFilterValue() as string) ?? ""
              }
              onChange={(e) =>
                table.getColumn("name")?.setFilterValue(e.target.value)
              }
              className="max-w-sm"
            />

            {/* Jumlah hasil */}
            <div className="ml-auto text-sm text-muted-foreground">
              {table.getFilteredRowModel().rows.length} hasil
            </div>
          </div>

          {/* Tabel */}
          <div className="overflow-hidden rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((hg) => (
                  <TableRow key={hg.id}>
                    {hg.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
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
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
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

      {/* Dialog konfirmasi hapus */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hapus Event</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus event{" "}
              <span className="font-semibold">
                "{selectedEvent?.name}"
              </span>
              ? Tindakan ini tidak dapat dibatalkan.
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
