//Layout khusus halaman user yang membungkus halaman Home dan Detail, biasanya berisi Navbar dan Footer agar tampil konsisten di semua halaman public.
import { Outlet } from "react-router-dom";
import Navbar from "../components/public/Navbar"
import Footer from "../components/public/Footer";

export default function PublicLayout() {
    return (
        <div className="flex min-h-screen flex-col">
            {/* Navbar */}
            <Navbar />

            {/* Page Content */}
            <main className="flex-1">
                <Outlet />
            </main>

            <Footer />
    </div>
    )
}