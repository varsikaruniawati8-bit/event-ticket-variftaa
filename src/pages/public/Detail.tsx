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
    fullDescription: "Rasakan pengalaman konser jazz yang tak terlupakan dengan latar belakang keindahan alam Gunung Bromo. Acara ini menghadirkan musisi-musisi jazz terbaik dari dalam dan luar negeri dengan suara yang jernih di ketinggian 2000 meter di atas permukaan laut.",
    capacity: 2000,
    startTime: "19:00",
    endTime: "23:00",
    ageRestriction: "Umum",
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
    fullDescription: "We The Fest adalah festival musik tahunan terbesar di Indonesia yang menghadirkan berbagai genre musik dari artis-artis ternama lokal dan internasional.",
    capacity: 10000,
    startTime: "16:00",
    endTime: "23:59",
    ageRestriction: "Umum",
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
    fullDescription: "Soundrenaline menghadirkan konser lintas genre terbesar di Asia Tenggara dengan ratusan artis nasional dan internasional yang memukau.",
    capacity: 8000,
    startTime: "17:00",
    endTime: "01:00",
    ageRestriction: "18+",
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
    fullDescription: "Java Jazz Festival adalah festival jazz internasional terbesar di Asia dengan menghadirkan musisi-musisi jazz kaliber dunia.",
    capacity: 5000,
    startTime: "18:00",
    endTime: "23:00",
    ageRestriction: "Umum",
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
    fullDescription: "Synchronize Fest adalah festival musik yang menghadirkan berbagai artis dari berbagai generasi, menciptakan pengalaman musik yang unik dan berkesan.",
    capacity: 12000,
    startTime: "15:00",
    endTime: "23:30",
    ageRestriction: "Umum",
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
    fullDescription: "Konser jazz eksklusif dengan latar belakang yang memukau, Candi Prambanan. Suasana magis akan tercipta dengan musik jazz yang menenangkan.",
    capacity: 3000,
    startTime: "18:00",
    endTime: "22:00",
    ageRestriction: "Umum",
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
    fullDescription: "Dengan harga tiket tertinggi, DWP menghadirkan pengalaman EDM terbaik dengan produksi kelas dunia dan DJ-DJ internasional terkemuka.",
    capacity: 15000,
    startTime: "20:00",
    endTime: "06:00",
    ageRestriction: "18+",
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
    fullDescription: "Rock in Celebes adalah konser rock terbesar yang pernah diselenggarakan di Indonesia Timur, menghadirkan band-band rock legendaris.",
    capacity: 6000,
    startTime: "19:00",
    endTime: "23:30",
    ageRestriction: "Umum",
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
    fullDescription: "Indie Fest adalah festival musik indie lokal yang mengangkat musisi-musisi indie berbakat dari seluruh Indonesia.",
    capacity: 4000,
    startTime: "16:00",
    endTime: "22:00",
    ageRestriction: "Umum",
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
    fullDescription: "Pop Nation menghadirkan konser musik pop dengan artis-artis papan atas Indonesia yang paling dicintai oleh jutaan penggemar.",
    capacity: 7000,
    startTime: "18:00",
    endTime: "22:30",
    ageRestriction: "Umum",
  },
]

const WHATSAPP_NUMBER = "6282155985785"

export default function Detail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  
  const event = events.find((e) => e.id === Number(id))

  const handleCheckout = () => {
    if (!event) return
    const message = `Halo, saya ingin memesan/booking ${event.name}. Harga: Rp ${event.price.toLocaleString("id-ID")}`
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`)
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Event Tidak Ditemukan</h1>
          <Button onClick={() => navigate("/")}>Kembali ke Beranda</Button>
        </div>
      </div>
    )
  }

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
                    <CardTitle className="text-3xl">{event.name}</CardTitle>
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
                  <p className="text-muted-foreground">{event.fullDescription}</p>
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
                  <div>
                    <p className="text-sm text-muted-foreground">Waktu Mulai</p>
                    <p className="font-semibold">{event.startTime} WIB</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Lokasi</p>
                    <p className="font-semibold">{event.location}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Waktu Selesai</p>
                    <p className="font-semibold">{event.endTime} WIB</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Kapasitas</p>
                    <p className="font-semibold">
                      {event.capacity.toLocaleString("id-ID")} orang
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Batasan Umur</p>
                    <p className="font-semibold">{event.ageRestriction}</p>
                  </div>
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
                <div>
                  <p className="text-sm text-muted-foreground">Harga Per Tiket</p>
                  <p className="text-2xl font-bold text-primary">
                    Rp {event.price.toLocaleString("id-ID")}
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Jumlah Tiket</label>
                  <select className="w-full px-3 py-2 border rounded-lg bg-background">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <option key={num} value={num}>
                        {num} Tiket
                      </option>
                    ))}
                  </select>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold">
                      Rp {event.price.toLocaleString("id-ID")}
                    </span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-muted-foreground">Biaya Admin</span>
                    <span className="font-semibold">
                      Rp {(event.price * 0.1).toLocaleString("id-ID")}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t pt-2">
                    <span>Total</span>
                    <span className="text-primary">
                      Rp {(event.price * 1.1).toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>

                <Button className="w-full" size="lg" onClick={handleCheckout}>
                  Lanjutkan Pembayaran
                </Button>
                <Button variant="outline" className="w-full">
                  Bagikan Event
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
