import { useParams, useNavigate } from "react-router-dom"
// useParams untuk mengambil parameter id dari URL
// useNavigate untuk navigasi halaman

import { Button } from "../../components/ui/button"
// Komponen Button UI

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card"
// Komponen Card untuk layout tampilan

import { ArrowLeft } from "lucide-react"
// Icon panah kiri

import * as React from "react"
// React hooks (useState, useEffect)

import api from "../../services/mockapi"
// API mock untuk mengambil data event

import type { EventItem } from "../../lib/events"
// Tipe data event

const WHATSAPP_NUMBER = "6282155985785"
// Nomor WhatsApp tujuan pemesanan

export default function Detail() {
  const { id } = useParams<{ id: string }>()
  // Mengambil id event dari URL

  const navigate = useNavigate()
  // Hook untuk berpindah halaman
  
  const [event, setEvent] = React.useState<EventItem | null>(null)
  // State untuk menyimpan data event

  const [loading, setLoading] = React.useState(true)
  // State loading saat data diambil

  const [error, setError] = React.useState<string | null>(null)
  // State untuk menyimpan pesan error

  const [ticketCount, setTicketCount] = React.useState(1)
  // State jumlah tiket

  // Fetch event detail by ID
  React.useEffect(() => {
    async function fetchEventDetail() {
      try {
        setLoading(true)
        setError(null)
        
        // GET single event by ID
        const data = await api.get(`/events/${id}`) as unknown as EventItem
        setEvent(data)
        // Simpan data event ke state
      } catch (err) {
        console.error("Gagal memuat detail event:", err)
        setError("Event tidak ditemukan atau gagal dimuat.")
      } finally {
        setLoading(false)
        // Matikan loading setelah proses selesai
      }
    }

    if (id) {
      fetchEventDetail()
      // Jalankan fetch jika id tersedia
    }
  }, [id])

  const handleCheckout = () => {
    if (!event) return
    // Hentikan fungsi jika event belum ada

    const total = event.price * ticketCount * 1.1
    // Hitung total harga + biaya admin 10%

    const message = `Halo, saya ingin memesan/booking ${event.name}.
Jumlah Tiket: ${ticketCount}
Harga: Rp ${event.price.toLocaleString("id-ID")} x ${ticketCount}
Total: Rp ${total.toLocaleString("id-ID")}`
    // Pesan WhatsApp otomatis
    
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
    )
    // Membuka WhatsApp dengan pesan
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Memuat detail event...</p>
        </div>
      </div>
    )
  }

  // Error or event not found
  if (error || !event) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">
            {error || "Event Tidak Ditemukan"}
          </h1>
          <Button onClick={() => navigate("/")}>
            Kembali ke Beranda
          </Button>
        </div>
      </div>
    )
  }

  const subtotal = event.price * ticketCount
  // Harga total tiket tanpa biaya admin

  const adminFee = subtotal * 0.1
  // Biaya admin 10%

  const total = subtotal + adminFee
  // Total akhir pembayaran

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6 flex items-center gap-2"
        >
          <ArrowLeft size={20} />
          Kembali
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden">
              {/* Event Image */}
              <img
                src={event.image}
                alt={event.name}
                className="h-96 w-full object-cover"
              />

              {/* Event Info */}
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-3xl">
                      {event.name}
                    </CardTitle>
                    <CardDescription className="text-lg mt-2">
                      {event.category}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Description */}
                <div>
                  <h3 className="font-semibold text-lg mb-2">Deskripsi</h3>
                  <p className="text-muted-foreground">
                    {event.fullDescription || event.description}
                  </p>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Tanggal</p>
                    <p className="font-semibold">
                      {new Date(event.date).toLocaleDateString("id-ID", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>

                  {event.startTime && (
                    <div>
                      <p className="text-sm text-muted-foreground">Waktu Mulai</p>
                      <p className="font-semibold">
                        {event.startTime} WIB
                      </p>
                    </div>
                  )}

                  <div>
                    <p className="text-sm text-muted-foreground">Lokasi</p>
                    <p className="font-semibold">{event.location}</p>
                  </div>

                  {event.endTime && (
                    <div>
                      <p className="text-sm text-muted-foreground">Waktu Selesai</p>
                      <p className="font-semibold">
                        {event.endTime} WIB
                      </p>
                    </div>
                  )}

                  {event.capacity && (
                    <div>
                      <p className="text-sm text-muted-foreground">Kapasitas</p>
                      <p className="font-semibold">
                        {event.capacity.toLocaleString("id-ID")} orang
                      </p>
                    </div>
                  )}

                  {event.ageRestriction && (
                    <div>
                      <p className="text-sm text-muted-foreground">Batasan Umur</p>
                      <p className="font-semibold">
                        {event.ageRestriction}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Card */}
          <div>
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Detail Pemesanan</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <Button
                  className="w-full"
                  size="lg"
                  onClick={handleCheckout}
                >
                  Lanjutkan Pembayaran
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
