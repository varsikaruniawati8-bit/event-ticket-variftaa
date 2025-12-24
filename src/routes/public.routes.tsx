import type { RouteObject } from "react-router-dom"
import PublicLayout from "../layout/PublicLayout"
import Home from "../pages/public/Home"
import Detail from "../pages/public/Detail"

export const publicRoutes: RouteObject[] = [
  {
    element: <PublicLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/event/:id", element: <Detail /> },
    ],
  },
]
