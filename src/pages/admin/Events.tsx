import DataTable from "../../components/admin/DataTable"
import { useAdminEvents } from "../../context/AdminEventsContext"
import FormData from "../../components/admin/FormData"

export default function Events() {
  const { events, onEdit, onDelete } = useAdminEvents()

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-semibold">Manajemen Event</h1>
          <p className="text-muted-foreground">Kelola daftar event di sini.</p>
        </div>
        <FormData />
      </div>

      <DataTable events={events} onEdit={onEdit} onDelete={onDelete} />
    </div>
  )
}
