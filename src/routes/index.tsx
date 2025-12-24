import { useRoutes } from "react-router-dom"
import { publicRoutes } from "./public.routes"
import { adminRoutes } from "./admin.routes"

export default function AppRoutes() {
  return useRoutes([
    ...publicRoutes,
    ...adminRoutes,
  ])
}