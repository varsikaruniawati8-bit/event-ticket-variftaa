import type { RouteObject } from "react-router-dom"
import AdminLayout from "../layout/AdminLayout"
import Dashboard from "../pages/admin/Dashboard"
import Events from "../pages/admin/Events"
import EditEvent from "../pages/admin/EditEvent"


export const adminRoutes: RouteObject[] = [
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "events", element: <Events /> },
      { path: "events/:id/edit", element: <EditEvent /> },
    ],
  },
]
