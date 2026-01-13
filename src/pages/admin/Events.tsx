import DataTable from "../../components/admin/DataTable"
import { useAdminEvents } from "../../context/AdminEventsContext"
import FormData from "../../components/admin/FormData"
import api from "../../services/mockapi"
import * as React from "react"
import type { EventItem } from "../../lib/events"

export default function Events() {
  const { events, onEdit, setEvents } = useAdminEvents()
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [isDeleting, setIsDeleting] = React.useState(false)

  React.useEffect(() => {
    async function fetchEvents() {
      try {
        setLoading(true)
        setError(null)
        const data = await api.get("/events") as unknown as EventItem[]
        console.log("Fetched events:", data)
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

  // Handler untuk delete event
  const handleDelete = async (id: string) => {
    setIsDeleting(true)
    
    try {
      console.log("Deleting event with id:", id)
      
      // DELETE request ke /events/:id
      await api.delete(`/events/${id}`)
      
      console.log("Event deleted successfully")
      
      // Update state - hapus event dari list
      setEvents((prev) => prev.filter((event) => event.id !== id))
      
    } catch (err: any) {
      console.error("Error deleting event:", err)
      alert(err.response?.data?.message || err.message || "Gagal menghapus event. Silakan coba lagi.")
    } finally {
      setIsDeleting(false)
    }
  }

  // Handler untuk retry
  const handleRetry = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const data = await api.get("/events") as unknown as EventItem[]
      setEvents(data)
    } catch (err) {
      console.error("Gagal memuat events:", err)
      setError("Gagal memuat data events. Silakan coba lagi.")
    } finally {
      setLoading(false)
    }
  }

  // Loading state
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

  // Error state
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

  // Main content
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-semibold">Manajemen Event</h1>
          <p className="text-muted-foreground">Kelola daftar event di sini.</p>
        </div>
        <FormData />
      </div>

      <DataTable 
        events={events} 
        onEdit={onEdit} 
        onDelete={handleDelete}
        isDeleting={isDeleting}
      />
    </div>
  )
}