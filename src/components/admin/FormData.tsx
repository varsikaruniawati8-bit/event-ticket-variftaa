"use client"

import * as React from "react"
//import komponen dialog
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "../ui/dialog"
// import komponen ui tombol dan input
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
//import context admin event
import { useAdminEvents } from "../../context/AdminEventsContext"

export default function FormData() {
  //ambil fungsi set Events dari contect
  const { setEvents } = useAdminEvents()
  // sstate untk buka tutup dialog
  const [open, setOpen] = React.useState(false)
// state menyimpan data form
  const [form, setForm] = React.useState({
    name: "",
    category: "",
    date: "",
    price: "",
    location: "",
    description: "",
    image: "",
  })
// handler perubahan input
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setForm((s) => ({ ...s, [name]: value }))
  }
// handler submit form
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
// data event baru
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
//tambah data event baru ke daftar event  dan tutup dialog
    setEvents((prev) => [newEvent, ...prev])
    setOpen(false)
    // reset form
    setForm({ name: "", category: "", date: "", price: "", location: "", description: "", image: "" })
  }

  return (
    // komponen dialog buat event baru
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
