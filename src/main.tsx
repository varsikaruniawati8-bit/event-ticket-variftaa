//Mengimpor StrictMode dari React
//StrictMode membantu mendeteksi potensi bug saat development
import { StrictMode } from 'react'
//Mengimpor ReactDOM untuk me-render React ke browser
import ReactDOM from "react-dom/client";
// Mengimpor BrowserRouter untuk kebutuhan routing (URL)
import { BrowserRouter } from "react-router-dom";
// Mengimpor file CSS utama (Tailwind + global style)
import './index.css'
// Mengimpor komponen utama aplikasi
import App from './App.tsx'

// Membuat root React dan menempelkannya ke div dengan id="root" di index.html
ReactDOM.createRoot(document.getElementById('root')!).render(
   // StrictMode hanya aktif di development
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
  
  
)

