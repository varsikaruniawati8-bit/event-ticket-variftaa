import * as React from "react"
import { initialEvents, type EventItem } from "../lib/events"

type AdminEventsContextValue = {
  events: EventItem[]
  setEvents: React.Dispatch<React.SetStateAction<EventItem[]>>
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
}

const AdminEventsContext = React.createContext<AdminEventsContextValue | undefined>(undefined)

export function AdminEventsProvider({ children }: { children: React.ReactNode }) {
  const [events, setEvents] = React.useState<EventItem[]>(initialEvents)

  const onEdit = (id: string) => {
    // placeholder
    alert(`Edit event: ${id}`)
  }

  const onDelete = (id: string) => {
    if (!confirm("Hapus event ini?")) return
    setEvents((prev) => prev.filter((e) => e.id !== id))
  }

  return (
    <AdminEventsContext.Provider value={{ events, setEvents, onEdit, onDelete }}>
      {children}
    </AdminEventsContext.Provider>
  )
}

export function useAdminEvents() {
  const ctx = React.useContext(AdminEventsContext)
  if (!ctx) throw new Error("useAdminEvents must be used within AdminEventsProvider")
  return ctx
}
