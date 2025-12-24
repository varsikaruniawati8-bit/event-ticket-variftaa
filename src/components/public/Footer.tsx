import { Link } from "react-router-dom"
import { Music, Facebook, Instagram, Twitter, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="flex justify-center">
          {/* Brand centered */}
          <div className="text-center">
            <div className="flex items-center gap-2 justify-center mb-3">
              <Music className="h-6 w-6 text-primary" />
              <h3 className="text-lg font-bold tracking-tight">varifta</h3>
            </div>
            <p className="text-muted-foreground text-sm">
              Platform terpercaya untuk memesan tiket konser dan festival musik terbaik di Indonesia.
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} varifta. Semua hak dilindungi undang-undang.</p>
        </div>
      </div>
    </footer>
  )
}
