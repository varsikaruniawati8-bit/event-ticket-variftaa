"use client"

import * as React from "react"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "../ui/dialog"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { useAdminEvents } from "../../context/AdminEventsContext"

export default function FormData() {
  const { setEvents } = useAdminEvents()
  const [open, setOpen] = React.useState(false)

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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const newEvent = {
      id: Date.now().toString(),
      name: form.name,
      category: form.category,
      date: form.date,
      price: Number(form.price) || 0,
      location: form.location,
      description: form.description,
      image: form.image,
    }

    setEvents((prev) => [newEvent, ...prev])
    setOpen(false)
    setForm({ name: "", category: "", date: "", price: "", location: "", description: "", image: "" })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form onSubmit={handleSubmit}>
        <DialogTrigger asChild>
          <Button>Buat Event</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Buat Event Baru</DialogTitle>
            <DialogDescription>Masukkan data event baru di form berikut lalu klik simpan.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-2">
            <div className="grid gap-2">
              <Label htmlFor="name">Nama</Label>
              <Input id="name" name="name" value={form.name} onChange={handleChange} required />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="category">Kategori</Label>
              <Input id="category" name="category" value={form.category} onChange={handleChange} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="date">Tanggal</Label>
              <Input id="date" name="date" type="date" value={form.date} onChange={handleChange} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="price">Harga</Label>
              <Input id="price" name="price" type="number" value={form.price} onChange={handleChange} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="location">Lokasi</Label>
              <Input id="location" name="location" value={form.location} onChange={handleChange} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="image">URL Poster</Label>
              <Input id="image" name="image" value={form.image} onChange={handleChange} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Deskripsi</Label>
              <Input id="description" name="description" value={form.description} onChange={handleChange} />
            </div>
          </div>

          <DialogFooter>
            <DialogTrigger asChild>
              <Button variant="outline">Batal</Button>
            </DialogTrigger>
            <Button type="submit">Simpan</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
