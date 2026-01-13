"use client"

import * as React from "react"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "../ui/dialog"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { useAdminEvents } from "../../context/AdminEventsContext"
import api from "../../services/mockapi"

export default function FormData() {
  const { setEvents } = useAdminEvents()
  const [open, setOpen] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const [form, setForm] = React.useState({
    name: "",
    category: "",
    date: "",
    price: "",
    location: "",
    description: "",
    image: "",
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setForm((s) => ({ ...s, [name]: value }))
  }

  // Ubah menjadi function biasa, bukan form handler
  async function handleSubmit() {
    // Validasi form
    if (!form.name.trim()) {
      setError("Nama event harus diisi")
      return
    }

    setIsLoading(true)
    setError(null)

    console.log("Form submitted:", form)

    try {
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

      const responseData: any = await api.post("/events", eventData)
      
      console.log("Response from API:", responseData)

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

      setEvents((prev) => [newEvent, ...prev])
      setOpen(false)
      setForm({ name: "", category: "", date: "", price: "", location: "", description: "", image: "" })
      
      console.log("Success!")
    } catch (err: any) {
      console.error("Error creating event:", err)
      setError(err.response?.data?.message || err.message || "Gagal membuat event. Silakan coba lagi.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Buat Event</Button>
      </DialogTrigger>
      
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Buat Event Baru</DialogTitle>
          <DialogDescription>Masukkan data event baru di form berikut lalu klik simpan.</DialogDescription>
        </DialogHeader>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

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
          <Button variant="outline" type="button" onClick={() => setOpen(false)} disabled={isLoading}>
            Batal
          </Button>
          {/* Gunakan onClick langsung di button */}
          <Button type="button" onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "Menyimpan..." : "Simpan"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}