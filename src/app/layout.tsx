import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Reserva de Bicicletas',
  description: 'Sistema de reserva de bicicletas por hora',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="bg-gray-100 min-h-screen">

        {/* Barra de navegación */}
        <nav className="bg-blue-600 text-white p-4 shadow-md">
          <div className="max-w-5xl mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold">Reserva de Bicicletas</h1>
            <div className="flex gap-4">
              <a href="/" className="hover:underline">Inicio</a>
              <a href="/reservations" className="hover:underline">Mis Reservas</a>
              <a href="/admin" className="hover:underline">Admin</a>
            </div>
          </div>
        </nav>

        {/* Contenido de cada página */}
        <main className="max-w-5xl mx-auto p-6">
          {children}
        </main>

      </body>
    </html>
  )
}