//Halaman utama user yang menampilkan katalog event atau daftar produk tiket yang tersedia.
import * as React from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../../components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card"
import api from "../../services/mockapi"
import type { EventItem } from "../../lib/events"

const WHATSAPP_NUMBER = "6282155985785"

export default function Home() {
  const navigate = useNavigate()
  const [events, setEvents] = React.useState<EventItem[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  // Fetch events dari API saat component mount
  React.useEffect(() => {
    async function fetchEvents() {
      try {
        setLoading(true)
        setError(null)
        
        console.log("Fetching events from API...")
        
        // GET request ke /events
        const data = await api.get("/events") as unknown as EventItem[]
        
        console.log("Events fetched:", data)
        
        setEvents(data)
      } catch (err: any) {
        console.error("Error fetching events:", err)
        setError("Gagal memuat data event. Silakan coba lagi.")
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  const handleCheckout = (event: EventItem) => {
    const message = `Halo, saya ingin memesan/booking ${event.name}`
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`)
  }

  // Handler untuk retry
  const handleRetry = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const data = await api.get("/events") as unknown as EventItem[]
      setEvents(data)
    } catch (err) {
      console.error("Error fetching events:", err)
      setError("Gagal memuat data event. Silakan coba lagi.")
    } finally {
      setLoading(false)
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col items-center justify-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mb-4"></div>
            <p className="text-muted-foreground">Memuat event...</p>
          </div>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col items-center justify-center h-64 gap-4">
            <div className="text-center">
              <p className="text-destructive text-xl font-semibold mb-2">⚠️ Terjadi Kesalahan</p>
              <p className="text-muted-foreground">{error}</p>
            </div>
            <Button onClick={handleRetry}>
              Coba Lagi
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Empty state
  if (events.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              Pesan Tiket Konser Favoritmu 🎶
            </h1>
            <p className="text-xl text-muted-foreground">
              Temukan dan pesan tiket konser dengan mudah dan cepat
            </p>
          </div>
          
          <div className="flex flex-col items-center justify-center h-64">
            <p className="text-muted-foreground text-lg">Belum ada event tersedia saat ini.</p>
          </div>
        </div>
      </div>
    )
  }

  // Main content with events
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Pesan Tiket Konser Favoritmu 🎶
          </h1>
          <p className="text-xl text-muted-foreground">
            Temukan dan pesan tiket konser dengan mudah dan cepat
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            {events.length} event tersedia
          </p>
        </div>

        {/* Event Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Card 
              key={event.id} 
              className="overflow-hidden cursor-pointer transition-all hover:shadow-lg hover:scale-105"
              onClick={() => navigate(`/event/${event.id}`)}
            >
              <img
                src={event.image || "https://picsum.photos/400/250?random=" + event.id}
                alt={event.name}
                className="h-48 w-full object-cover"
              />

              <CardHeader>
                <CardTitle>{event.name}</CardTitle>
                <CardDescription>
                  {event.category} • {new Date(event.date).toLocaleDateString("id-ID", {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                  })}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {event.description || "Deskripsi tidak tersedia"}
                </p>
                <p className="text-sm">
                  📍 {event.location}
                </p>
                <p className="font-semibold text-lg">
                  Rp {event.price.toLocaleString("id-ID")}
                </p>

                <Button 
                  className="w-full mt-2"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleCheckout(event)
                  }}
                >
                  Pesan Tiket
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}