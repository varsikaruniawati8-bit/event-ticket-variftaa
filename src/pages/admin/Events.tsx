// Komponen tabel data event
import DataTable from "../../components/admin/DataTable"

// Context untuk mengelola data event admin
import { useAdminEvents } from "../../context/AdminEventsContext"

// Form untuk menambah event baru
import FormData from "../../components/admin/FormData"

// API mock untuk request data
import api from "../../services/mockapi"

// React
import * as React from "react"

// Tipe data event
import type { EventItem } from "../../lib/events"

export default function Events() {
  // Mengambil data events, fungsi edit, dan setter dari context
  const { events, onEdit, setEvents } = useAdminEvents()

  // State loading saat mengambil data
  const [loading, setLoading] = React.useState(true)

  // State error
  const [error, setError] = React.useState<string | null>(null)

  // State loading khusus saat delete
  const [isDeleting, setIsDeleting] = React.useState(false)

  // Mengambil data event saat halaman pertama kali dibuka
  React.useEffect(() => {
    async function fetchEvents() {
      try {
        setLoading(true)
        setError(null)

        // GET request ke endpoint /events
        const data = await api.get("/events") as unknown as EventItem[]
        console.log("Fetched events:", data)

        // Simpan data ke state global
        setEvents(data)
      } catch (err) {
        console.error("Gagal memuat events:", err)
        setError("Gagal memuat data events. Silakan coba lagi.")
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [setEvents])

  // Handler untuk menghapus event
  const handleDelete = async (id: string) => {
    setIsDeleting(true)
    
    try {
      console.log("Deleting event with id:", id)
      
      // DELETE request ke endpoint /events/:id
      await api.delete(`/events/${id}`)
      
      console.log("Event deleted successfully")
      
      // Update state dengan menghapus event yang dipilih
      setEvents((prev) => prev.filter((event) => event.id !== id))
      
    } catch (err: any) {
      console.error("Error deleting event:", err)
      alert(err.response?.data?.message || err.message || "Gagal menghapus event. Silakan coba lagi.")
    } finally {
      setIsDeleting(false)
    }
  }

  // Handler untuk mencoba ulang fetch data jika error
  const handleRetry = async () => {
    setLoading(true)
    setError(null)
    
    try {
      // Ambil ulang data events
      const data = await api.get("/events") as unknown as EventItem[]
      setEvents(data)
    } catch (err) {
      console.error("Gagal memuat events:", err)
      setError("Gagal memuat data events. Silakan coba lagi.")
    } finally {
      setLoading(false)
    }
  }

  // Tampilan loading
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Memuat data events...</p>
        </div>
      </div>
    )
  }

  // Tampilan error
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <div className="text-center">
          <p className="text-destructive text-lg font-semibold mb-2">⚠️ Terjadi Kesalahan</p>
          <p className="text-muted-foreground">{error}</p>
        </div>
        <button 
          onClick={handleRetry}
          className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
        >
          Coba Lagi
        </button>
      </div>
    )
  }

  // Tampilan utama halaman events
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-semibold">Manajemen Event</h1>
          <p className="text-muted-foreground">Kelola daftar event di sini.</p>
        </div>
        {/* Tombol dan dialog untuk menambah event */}
        <FormData />
      </div>

      {/* Tabel data event */}
      <DataTable 
        events={events} 
        onEdit={onEdit} 
        onDelete={handleDelete}
        isDeleting={isDeleting}
      />
    </div>
  )
}
