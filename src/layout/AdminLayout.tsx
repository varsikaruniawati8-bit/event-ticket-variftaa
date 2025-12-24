import { Outlet } from "react-router-dom"
import { SidebarInset, SidebarProvider } from "../components/ui/sidebar"
import { AppSidebar } from "../components/admin/Sidebar"
import AdminHeader from "../components/admin/AdminHeader"
import { AdminEventsProvider } from "../context/AdminEventsContext"

export default function AdminLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AdminHeader />
        <AdminEventsProvider>
          <div className="flex flex-1 flex-col gap-4 p-4">
            <Outlet />
          </div>
        </AdminEventsProvider>
      </SidebarInset>
    </SidebarProvider>
  )
}