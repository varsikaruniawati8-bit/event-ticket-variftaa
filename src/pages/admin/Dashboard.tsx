import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card"
import { useAdminEvents } from "../../context/AdminEventsContext"

export default function Dashboard() {
  const { events } = useAdminEvents()

  const totalRevenue = events.reduce((s, e) => s + (e.price || 0), 0)
  const upcoming = events.filter((e) => new Date(e.date) >= new Date()).length

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Event</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{events.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{upcoming}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">
              {totalRevenue.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
