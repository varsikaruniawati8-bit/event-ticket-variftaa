"use client" 
// Menandakan ini adalah Client Component di Next.js (App Router)

import * as React from "react"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "../ui/dialog"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { useAdminEvents } from "../../context/AdminEventsContext"
import api from "../../services/mockapi"

export default function FormData() {
  // Mengambil fungsi setEvents dari context untuk menambahkan event baru
  const { setEvents } = useAdminEvents()

  // State untuk membuka / menutup dialog
  const [open, setOpen] = React.useState(false)

  // State loading saat submit data
  const [isLoading, setIsLoading] = React.useState(false)

  // State untuk menyimpan pesan error
  const [error, setError] = React.useState<string | null>(null)

  // State untuk menampung seluruh data form
  const [form, setForm] = React.useState({
    name: "",
    category: "",
    date: "",
    price: "",
    location: "",
    description: "",
    image: "",
  })

  // Fungsi untuk menangani perubahan input form
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setForm((s) => ({ ...s, [name]: value }))
  }

  // Fungsi submit data (bukan form submit bawaan HTML)
  async function handleSubmit() {
    // Validasi: nama event wajib diisi
    if (!form.name.trim()) {
      setError("Nama event harus diisi")
      return
    }

    setIsLoading(true)
    setError(null)

    console.log("Form submitted:", form)

    try {
      // Menyiapkan data event sebelum dikirim ke API
      const eventData = {
        name: form.name,
        category: form.category,
        date: form.date,
        price: Number(form.price) || 0,
        location: form.location,
        description: form.description,
        image: form.image,
      }

      console.log("Sending to API:", eventData)

      // Mengirim data ke endpoint /events
      const responseData: any = await api.post("/events", eventData)
      
      console.log("Response from API:", responseData)

      // Membentuk objek event baru dari response API
      const newEvent = {
        id: responseData.id,
        name: responseData.name,
        category: responseData.category,
        date: responseData.date,
        price: responseData.price,
        location: responseData.location,
        description: responseData.description,
        image: responseData.image,
      }

      console.log("New event:", newEvent)

      // Menambahkan event baru ke state global
      setEvents((prev) => [newEvent, ...prev])

      // Menutup dialog
      setOpen(false)

      // Mereset form ke kondisi awal
      setForm({ name: "", category: "", date: "", price: "", location: "", description: "", image: "" })
      
      console.log("Success!")
    } catch (err: any) {
      // Menangani error jika request gagal
      console.error("Error creating event:", err)
      setError(err.response?.data?.message || err.message || "Gagal membuat event. Silakan coba lagi.")
    } finally {
      // Menghentikan loading
      setIsLoading(false)
    }
  }

  return (
    // Komponen dialog utama
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {/* Tombol untuk membuka dialog */}
        <Button>Buat Event</Button>
      </DialogTrigger>
      
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Buat Event Baru</DialogTitle>
          <DialogDescription>
            Masukkan data event baru di form berikut lalu klik simpan.
          </DialogDescription>
        </DialogHeader>

        {/* Menampilkan pesan error jika ada */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {/* Form input data event */}
        <div className="grid gap-4 py-2">
          <div className="grid gap-2">
            <Label htmlFor="name">Nama</Label>
            <Input id="name" name="name" value={form.name} onChange={handleChange} disabled={isLoading} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="category">Kategori</Label>
            <Input id="category" name="category" value={form.category} onChange={handleChange} disabled={isLoading} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="date">Tanggal</Label>
            <Input id="date" name="date" type="date" value={form.date} onChange={handleChange} disabled={isLoading} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="price">Harga</Label>
            <Input id="price" name="price" type="number" value={form.price} onChange={handleChange} disabled={isLoading} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="location">Lokasi</Label>
            <Input id="location" name="location" value={form.location} onChange={handleChange} disabled={isLoading} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="image">URL Poster</Label>
            <Input id="image" name="image" value={form.image} onChange={handleChange} disabled={isLoading} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Deskripsi</Label>
            <Input id="description" name="description" value={form.description} onChange={handleChange} disabled={isLoading} />
          </div>
        </div>

        <DialogFooter>
          {/* Tombol batal untuk menutup dialog */}
          <Button variant="outline" type="button" onClick={() => setOpen(false)} disabled={isLoading}>
            Batal
          </Button>

          {/* Tombol simpan yang memanggil handleSubmit */}
          <Button type="button" onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "Menyimpan..." : "Simpan"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
