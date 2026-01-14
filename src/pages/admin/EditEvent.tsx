"use client"

import * as React from "react"
// Hook routing untuk mengambil parameter URL dan navigasi halaman
import { useParams, useNavigate } from "react-router-dom"

// Komponen UI
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"

// Context untuk mengelola data event admin
import { useAdminEvents } from "../../context/AdminEventsContext"

// Tipe data event
import type { EventItem } from "../../lib/events"

// API mock untuk request data
import api from "../../services/mockapi"

export default function EditEvent() {
  // Mengambil parameter id dari URL
  const { id } = useParams<{ id: string }>()

  // Hook untuk navigasi halaman
  const navigate = useNavigate()

  // Mengambil data events dan setter dari context
  const { events, setEvents } = useAdminEvents()

  // State loading saat submit
  const [isLoading, setIsLoading] = React.useState(false)

  // State loading saat fetch data awal
  const [isFetching, setIsFetching] = React.useState(true)

  // State error
  const [error, setError] = React.useState<string | null>(null)

  // State form untuk menyimpan data event yang diedit
  const [form, setForm] = React.useState<EventItem>({
    id: "",
    name: "",
    category: "",
    date: "",
    price: 0,
    location: "",
    description: "",
    image: "",
  })

  // Mengambil data event dari API berdasarkan ID saat komponen pertama kali dirender
  React.useEffect(() => {
    const fetchEvent = async () => {
      if (!id) return

      setIsFetching(true)
      setError(null)

      try {
        console.log("Fetching event with id:", id)
        
        // Request GET ke endpoint /events/:id
        const responseData: any = await api.get(`/events/${id}`)
        
        console.log("Event data:", responseData)

        // Mengisi form dengan data dari API
        setForm({
          id: responseData.id,
          name: responseData.name,
          category: responseData.category,
          date: responseData.date,
          price: responseData.price,
          location: responseData.location,
          description: responseData.description,
          image: responseData.image,
        })
      } catch (err: any) {
        console.error("Error fetching event:", err)
        setError("Event tidak ditemukan")
      } finally {
        setIsFetching(false)
      }
    }

    fetchEvent()
  }, [id])

  // Handler perubahan input form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      // Konversi ke number jika field price
      [name]: name === "price" ? Number(value) : value,
    }))
  }

  // Handler submit form edit event
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!id) return

    setIsLoading(true)
    setError(null)

    console.log("Updating event:", form)

    try {
      // Data yang akan dikirim ke API
      const updateData = {
        name: form.name,
        category: form.category,
        date: form.date,
        price: form.price,
        location: form.location,
        description: form.description,
        image: form.image,
      }

      console.log("Sending update to API:", updateData)

      // Request PUT ke endpoint /events/:id
      const responseData: any = await api.put(`/events/${id}`, updateData)

      console.log("Response from API:", responseData)

      // Data event yang sudah diperbarui
      const updatedEvent = {
        id: responseData.id,
        name: responseData.name,
        category: responseData.category,
        date: responseData.date,
        price: responseData.price,
        location: responseData.location,
        description: responseData.description,
        image: responseData.image,
      }

      // Update data event di context
      setEvents((prev) =>
        prev.map((e) => (e.id === id ? updatedEvent : e))
      )

      console.log("Event updated successfully")

      // Kembali ke halaman daftar event
      navigate("/admin/events")
    } catch (err: any) {
      console.error("Error updating event:", err)
      setError(err.response?.data?.message || err.message || "Gagal mengupdate event. Silakan coba lagi.")
    } finally {
      setIsLoading(false)
    }
  }

  // Tampilan loading saat data event masih diambil
  if (isFetching) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">Memuat data event...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Tampilan error jika event tidak ditemukan
  if (error && !form.id) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <p className="text-center text-red-600 mb-4">{error}</p>
            <Button 
              className="w-full" 
              onClick={() => navigate("/admin/events")}
            >
              Kembali ke Events
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div>
      {/* Header halaman */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Edit Event</h1>
        <p className="text-muted-foreground">Ubah data event di bawah ini</p>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>{form.name}</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Menampilkan pesan error jika ada */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {/* Form edit event */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nama Event */}
            <div className="grid gap-2">
              <Label htmlFor="name">Nama Event</Label>
              <Input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Nama event"
                required
                disabled={isLoading}
              />
            </div>

            {/* Kategori */}
            <div className="grid gap-2">
              <Label htmlFor="category">Kategori</Label>
              <Input
                id="category"
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="Contoh: Music, Conference, Food"
                disabled={isLoading}
              />
            </div>

            {/* Tanggal */}
            <div className="grid gap-2">
              <Label htmlFor="date">Tanggal</Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>

            {/* Harga */}
            <div className="grid gap-2">
              <Label htmlFor="price">Harga (IDR)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                placeholder="0"
                disabled={isLoading}
              />
            </div>

            {/* Lokasi */}
            <div className="grid gap-2">
              <Label htmlFor="location">Lokasi</Label>
              <Input
                id="location"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Nama tempat event"
                disabled={isLoading}
              />
            </div>

            {/* URL Poster */}
            <div className="grid gap-2">
              <Label htmlFor="image">URL Poster</Label>
              <Input
                id="image"
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="https://..."
                disabled={isLoading}
              />
            </div>

            {/* Deskripsi */}
            <div className="grid gap-2">
              <Label htmlFor="description">Deskripsi</Label>
              <textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Deskripsi event"
                rows={4}
                disabled={isLoading}
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            {/* Tombol aksi */}
            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Menyimpan..." : "Simpan Perubahan"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/admin/events")}
                disabled={isLoading}
              >
                Batal
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
