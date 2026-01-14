import { useParams, useNavigate } from "react-router-dom"
import { Button } from "../../components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card"
import { ArrowLeft } from "lucide-react"
import * as React from "react"
import api from "../../services/mockapi"
import type { EventItem } from "../../lib/events"

const WHATSAPP_NUMBER = "6282155985785"

export default function Detail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [event, setEvent] = React.useState<EventItem | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [ticketCount, setTicketCount] = React.useState(1)

  // === FETCH DETAIL EVENT ===
  React.useEffect(() => {
    async function fetchEventDetail() {
      try {
        setLoading(true)
        setError(null)

        const data = (await api.get(`/events/${id}`)) as unknown as EventItem
        setEvent(data)
      } catch (err) {
        console.error(err)
        setError("Event tidak ditemukan atau gagal dimuat.")
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchEventDetail()
  }, [id])

  // === CHECKOUT WA ===
  const handleCheckout = () => {
    if (!event) return

    const total = event.price * ticketCount * 1.1

    const message = `Halo, saya ingin memesan/booking ${event.name}.
Jumlah Tiket: ${ticketCount}
Harga: Rp ${event.price.toLocaleString("id-ID")} x ${ticketCount}
Total: Rp ${total.toLocaleString("id-ID")}`

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
    )
  }

  // === LOADING ===
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Memuat detail event...</p>
      </div>
    )
  }

  // === ERROR ===
  if (error || !event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">
            {error || "Event Tidak Ditemukan"}
          </h1>
          <Button onClick={() => navigate("/")}>Kembali</Button>
        </div>
      </div>
    )
  }

  const subtotal = event.price * ticketCount
  const adminFee = subtotal * 0.1
  const total = subtotal + adminFee

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4 py-8">

        {/* BACK */}
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6 flex items-center gap-2"
        >
          <ArrowLeft size={20} />
          Kembali
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* KIRI - DETAIL EVENT */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden">
              <img
                src={event.image}
                alt={event.name}
                className="h-96 w-full object-cover"
              />

              <CardHeader>
                <CardTitle className="text-3xl">{event.name}</CardTitle>
                <CardDescription>{event.category}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <p>{event.description}</p>

                <div>
                  <b>Tanggal:</b>{" "}
                  {new Date(event.date).toLocaleDateString("id-ID")}
                </div>
                <div>
                  <b>Lokasi:</b> {event.location}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* KANAN - PEMESANAN */}
          <div>
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Detail Pemesanan</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm">Harga per tiket</p>
                  <p className="text-xl font-bold">
                    Rp {event.price.toLocaleString("id-ID")}
                  </p>
                </div>

                <div>
                  <label>Jumlah Tiket</label>
                  <select
                    className="w-full border p-2 rounded"
                    value={ticketCount}
                    onChange={(e) => setTicketCount(Number(e.target.value))}
                  >
                    {[1,2,3,4,5].map(n => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>

                <div className="border-t pt-3 space-y-1">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>Rp {subtotal.toLocaleString("id-ID")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Admin (10%)</span>
                    <span>Rp {adminFee.toLocaleString("id-ID")}</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>Rp {total.toLocaleString("id-ID")}</span>
                  </div>
                </div>

                <Button className="w-full" onClick={handleCheckout}>
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
