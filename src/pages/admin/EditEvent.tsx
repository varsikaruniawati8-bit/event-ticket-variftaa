"use client"

import * as React from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { useAdminEvents } from "../../context/AdminEventsContext"
import type { EventItem } from "../../lib/events"

export default function EditEvent() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { events, setEvents } = useAdminEvents()
  const [isLoading, setIsLoading] = React.useState(false)

  // Cari event berdasarkan id
  const event = React.useMemo(() => events.find((e) => e.id === id), [events, id])

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

  // Populate form dengan data event saat di load
  React.useEffect(() => {
    if (event) {
      setForm(event)
    }
  }, [event])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Update event
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? form : e))
    )

    // Navigate back ke events
    setTimeout(() => {
      setIsLoading(false)
      navigate("/admin/events")
    }, 500)
  }

  if (!event) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">Event tidak ditemukan</p>
            <Button 
              className="w-full mt-4" 
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
