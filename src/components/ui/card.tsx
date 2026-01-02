import * as React from "react"

// cn = utility untuk menggabungkan class Tailwind secara aman
// (biasanya dari shadcn/ui)
import { cn } from "../../lib/utils"

/**
 * =========================
 * COMPONENT UTAMA: Card
 * =========================
 * Digunakan sebagai container utama (pembungkus)
 * untuk konten berbentuk kartu (card)
 */
function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      // Penanda slot card (konvensi shadcn)
      data-slot="card"
      // Styling utama card (background, border, shadow, dll)
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      )}
      // Props tambahan seperti onClick, id, dll
      {...props}
    />
  )
}

/**
 * =========================
 * CardHeader
 * =========================
 * Digunakan untuk bagian atas card
 * Biasanya berisi judul, deskripsi, atau tombol aksi
 */
function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      // Grid layout untuk header card
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  )
}

/**
 * =========================
 * CardTitle
 * =========================
 * Digunakan untuk judul utama card
 */
function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      // Styling teks judul
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  )
}

/**
 * =========================
 * CardDescription
 * =========================
 * Digunakan untuk teks deskripsi
 * Biasanya berada di bawah judul
 */
function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      // Warna teks lebih redup untuk deskripsi
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

/**
 * =========================
 * CardAction
 * =========================
 * Digunakan untuk tombol aksi
 * Contoh: Edit, Delete, Buy
 */
function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      // Posisi tombol di pojok kanan atas
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

/**
 * =========================
 * CardContent
 * =========================
 * Bagian isi utama card
 * Contoh: teks, gambar, list, dll
 */
function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      // Padding horizontal untuk isi
      className={cn("px-6", className)}
      {...props}
    />
  )
}

/**
 * =========================
 * CardFooter
 * =========================
 * Bagian bawah card
 * Biasanya berisi tombol atau info tambahan
 */
function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      // Layout horizontal + padding atas jika ada border
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  )
}

// Export semua komponen agar bisa digunakan terpisah
export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
