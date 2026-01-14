import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card"
// Komponen Card digunakan untuk menampilkan informasi ringkas berbentuk kartu

import { useAdminEvents } from "../../context/AdminEventsContext"
// Context untuk mengambil data event yang tersimpan secara global

export default function Dashboard() {
  // Mengambil data events dari context
  const { events } = useAdminEvents()

  // Menghitung total pendapatan dari seluruh event
  // Jika harga tidak ada, dianggap 0
  const totalRevenue = events.reduce((s, e) => s + (e.price || 0), 0)

  // Menghitung jumlah event yang tanggalnya masih akan datang
  const upcoming = events.filter((e) => new Date(e.date) >= new Date()).length

  return (
    <div className="space-y-6">
      {/* Grid untuk menampilkan ringkasan dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Card Total Event */}
        <Card>
          <CardHeader>
            <CardTitle>Total Event</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Menampilkan jumlah total event */}
            <div className="text-2xl font-semibold">{events.length}</div>
          </CardContent>
        </Card>

        {/* Card Upcoming Event */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Menampilkan jumlah event yang akan datang */}
            <div className="text-2xl font-semibold">{upcoming}</div>
          </CardContent>
        </Card>

        {/* Card Total Revenue */}
        <Card>
          <CardHeader>
            <CardTitle>Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Menampilkan total pendapatan dalam format Rupiah */}
            <div className="text-2xl font-semibold">
              {totalRevenue.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}
