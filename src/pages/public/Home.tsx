import { useNavigate } from "react-router-dom"
import { Button } from "../../components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card"

const events = [
  {
    id: 1,
    name: "Jazz Gunung 2025",
    category: "Music",
    date: "2025-08-12",
    price: 750000,
    location: "Bromo Amphitheater",
    description: "Konser jazz etnik di ketinggian 2000 mdpl.",
    image: "https://picsum.photos/400/250?random=1",
  },
  {
    id: 2,
    name: "We The Fest",
    category: "Festival",
    date: "2025-07-20",
    price: 650000,
    location: "Jakarta",
    description: "Festival musik tahunan terbesar di Indonesia.",
    image: "https://picsum.photos/400/250?random=2",
  },
  {
    id: 3,
    name: "Soundrenaline",
    category: "Music",
    date: "2025-09-10",
    price: 850000,
    location: "Bali",
    description: "Konser lintas genre dengan artis nasional.",
    image: "https://picsum.photos/400/250?random=3",
  },
  {
    id: 4,
    name: "Java Jazz Festival",
    category: "Jazz",
    date: "2025-03-05",
    price: 900000,
    location: "Jakarta",
    description: "Festival jazz internasional terbesar.",
    image: "https://picsum.photos/400/250?random=4",
  },
  {
    id: 5,
    name: "Synchronize Fest",
    category: "Music",
    date: "2025-10-01",
    price: 550000,
    location: "Jakarta",
    description: "Festival musik lintas generasi.",
    image: "https://picsum.photos/400/250?random=5",
  },
  {
    id: 6,
    name: "Prambanan Jazz",
    category: "Jazz",
    date: "2025-07-05",
    price: 700000,
    location: "Yogyakarta",
    description: "Jazz dengan latar Candi Prambanan.",
    image: "https://picsum.photos/400/250?random=6",
  },
  {
    id: 7,
    name: "DWP",
    category: "EDM",
    date: "2025-12-10",
    price: 1200000,
    location: "Jakarta",
    description: "Festival EDM kelas dunia.",
    image: "https://picsum.photos/400/250?random=7",
  },
  {
    id: 8,
    name: "Rock in Celebes",
    category: "Rock",
    date: "2025-06-18",
    price: 450000,
    location: "Makassar",
    description: "Konser rock terbesar di Indonesia Timur.",
    image: "https://picsum.photos/400/250?random=8",
  },
  {
    id: 9,
    name: "Indie Fest",
    category: "Indie",
    date: "2025-08-30",
    price: 300000,
    location: "Bandung",
    description: "Festival musik indie lokal.",
    image: "https://picsum.photos/400/250?random=9",
  },
  {
    id: 10,
    name: "Pop Nation",
    category: "Pop",
    date: "2025-11-15",
    price: 500000,
    location: "Surabaya",
    description: "Konser musik pop artis papan atas.",
    image: "https://picsum.photos/400/250?random=10",
  },
]

const WHATSAPP_NUMBER = "6282155985785"

export default function Home() {
  const navigate = useNavigate()

  const handleCheckout = (event: typeof events[0]) => {
    const message = `Halo, saya ingin memesan/booking ${event.name}`
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`)
  }

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
                src={event.image}
                alt={event.name}
                className="h-48 w-full object-cover"
              />

              <CardHeader>
                <CardTitle>{event.name}</CardTitle>
                <CardDescription>
                  {event.category} • {event.date}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  {event.description}
                </p>
                <p className="text-sm">
                  📍 {event.location}
                </p>
                <p className="font-semibold">
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
