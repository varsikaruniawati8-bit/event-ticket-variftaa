// import tombol untuk membuka tutup sidebar
import {
  SidebarTrigger,
} from "../../components/ui/sidebar"
//komponen pemisah garis
import { Separator } from "../../components/ui/separator"
// heade untuk halaman admin
export default function AdminHeader() {
  return (
    //elemen header utama
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
        </header>
  )
}