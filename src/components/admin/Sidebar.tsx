import * as React from "react"
import { useLocation, NavLink } from "react-router-dom"
// Hook useLocation digunakan untuk mengetahui URL (route) yang sedang aktif
// NavLink digunakan untuk navigasi sekaligus mendeteksi status aktif

// komponen sidebar
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "../../components/ui/sidebar"

// sample datanya
// Data statis untuk menu sidebar
const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Admin Even Ticket",
      url: "/admin",
      items: [
        {
          title: "Dashboard",
          url: "/admin/dashboard",
        },
        {
          title: "Events",
          url: "/admin/events",
        },
      ],
    },
  ],
}

// komponen sidebar aplikasi 
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // lokasi route saat ini
  const location = useLocation()

  return (
    // struktur utama sidebar
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              {/* Judul / logo sidebar */}
              <a href="#">
                <span className="text-base font-semibold">Varifta Even Tickets.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {/* Mapping menu utama dari data.navMain */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {/* Mapping submenu */}
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    {
                      /* menandai menu sebagai aktif ketika pathname saat ini
                         sama atau diawali dengan URL item
                         NavLink digunakan untuk navigasi
                         dan status aktif diterapkan pada SidebarMenuButton */
                    }
                    <SidebarMenuButton
                      asChild
                      isActive={
                        location.pathname === item.url ||
                        location.pathname.startsWith(item.url)
                      }
                    >
                      <NavLink to={item.url} className="block w-full">
                        {item.title}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      {/* SidebarRail digunakan untuk tampilan sidebar versi ringkas */}
      <SidebarRail />
    </Sidebar>
  )
}
