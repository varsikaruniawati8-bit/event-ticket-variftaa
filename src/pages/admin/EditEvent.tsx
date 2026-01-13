"use client"

import * as React from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { useAdminEvents } from "../../context/AdminEventsContext"
import type { EventItem } from "../../lib/events"
import api from "../../services/mockapi"

export default function EditEvent() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { events, setEvents } = useAdminEvents()
  const [isLoading, setIsLoading] = React.useState(false)
  const [isFetching, setIsFetching] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

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

  // Fetch event dari API saat component mount
  React.useEffect(() => {
    const fetchEvent = async () => {
      if (!id) return

      setIsFetching(true)
      setError(null)

      try {
        console.log("Fetching event with id:", id)
        
        // GET request ke /events/:id
        const responseData: any = await api.get(`/events/${id}`)
        
        console.log("Event data:", responseData)

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!id) return

    setIsLoading(true)
    setError(null)

    console.log("Updating event:", form)

    try {
      // Data yang akan diupdate
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

      // PUT request ke /events/:id
      const responseData: any = await api.put(`/events/${id}`, updateData)

      console.log("Response from API:", responseData)

      // Update event di state
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

      setEvents((prev) =>
        prev.map((e) => (e.id === id ? updatedEvent : e))
      )

      console.log("Event updated successfully")

      // Navigate back ke events
      navigate("/admin/events")
    } catch (err: any) {
      console.error("Error updating event:", err)
      setError(err.response?.data?.message || err.message || "Gagal mengupdate event. Silakan coba lagi.")
    } finally {
      setIsLoading(false)
    }
  }

  // Loading state saat fetch data
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

  // Error state
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
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Edit Event</h1>
        <p className="text-muted-foreground">Ubah data event di bawah ini</p>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>{form.name}</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Tampilkan error jika ada */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nama */}
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

            {/* Actions */}
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