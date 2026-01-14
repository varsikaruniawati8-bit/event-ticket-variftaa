//Berisi data dummy event (hardcode) yang digunakan sementara untuk menampilkan katalog event pada halaman Home dan Detail.
export type EventItem = {
  id: string
  name: string
  category: string
  date: string
  price: number
  location: string
  description?: string
  image?: string
  fullDescription?: string
  capacity?: number
  startTime?: string
  endTime?: string
  ageRestriction?: string
}

export const initialEvents: EventItem[] = [
  {
    id: "1",
    name: "Jazz Gunung 2025",
    category: "Music",
    date: "2025-08-12",
    price: 750000,
    location: "Bromo Amphitheater",
    description: "Konser jazz etnik di ketinggian 2000mdpl.",
    image: "https://via.placeholder.com/320x180.png?text=Jazz+Gunung",
  },
  {
    id: "2",
    name: "Tech Summit 2025",
    category: "Conference",
    date: "2025-06-20",
    price: 1250000,
    location: "Jakarta Convention Center",
    description: "Konferensi teknologi dan startup.",
    image: "https://via.placeholder.com/320x180.png?text=Tech+Summit",
  },
  {
    id: "3",
    name: "Festival Kuliner Malang",
    category: "Food",
    date: "2025-09-05",
    price: 50000,
    location: "Alun-Alun Malang",
    description: "Pesta kuliner lokal dan internasional.",
    image: "https://via.placeholder.com/320x180.png?text=Kuliner",
  },
  {
    id: "4",
    name: "Indie Film Night",
    category: "Film",
    date: "2025-05-15",
    price: 80000,
    location: "Lawang Sewu",
    description: "Pemutaran film pendek indie.",
    image: "https://via.placeholder.com/320x180.png?text=Film+Night",
  },
]
