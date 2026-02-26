"use client"

import { useEffect, useState } from 'react'
import { EstacionConBicicletas } from '@/domain/station'
import { Reserva } from '@/domain/reservation'
import { Bicicleta } from '@/domain/bike'

// Por el momento se usara un usuariode prueba
const USUARIO_ID = 1

export default function PaginaReservas() {
  const [estaciones, setEstaciones] = useState<EstacionConBicicletas[]>([])
  const [reservas, setReservas] = useState<Reserva[]>([])
  const [biciIdSel, setBiciIdSel] = useState<number | null>(null)
  const [cargando, setCargando] = useState(true)
  const [enviando, setEnviando] = useState(false)
  const [mensaje, setMensaje] = useState('')
  const [tipoMensaje, setTipoMensaje] = useState<'exito' | 'error'>('exito')

  useEffect(() => {
    cargarDatos()
  }, [])

  async function cargarDatos() {
    try {
      setCargando(true)
      await Promise.all([obtenerEstaciones(), obtenerReservas()])
    } finally {
      setCargando(false)
    }
  }

  async function obtenerEstaciones() {
    const respuesta = await fetch("/api/estaciones")
    const resultado = await respuesta.json()
    setEstaciones(resultado.data)
  }

  async function obtenerReservas() {
    const respuesta = await fetch(`/api/reservas?usuarioId=${USUARIO_ID}`)
    const resultado = await respuesta.json()
    setReservas(resultado.data)
  }

  async function crearReserva() {
    if (!biciIdSel) {
      mostrarMensaje("Por favor selecciona una bicicleta", "error")
      return
    }

    try {
      setEnviando(true)
      const respuesta = await fetch("/api/reservas", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          usuarioId:   USUARIO_ID,
          bicicletaId: biciIdSel,
        }),
      })

      const resultado = await respuesta.json()

      if (!respuesta.ok) {
        mostrarMensaje(resultado.error, "error")
        return
      }

      mostrarMensaje("Bicicleta reservada exitosamente", "exito")
      setBiciIdSel(null)
      // Recargamos los datos para reflejar los cambios
      await cargarDatos()

    } catch (error) {
      mostrarMensaje("Error al crear la reserva", "error")
    } finally {
      setEnviando(false)
    }
  }

  async function liberarBicicleta(reservaId: number, bicicletaId: number) {
    try {
      const respuesta = await fetch(`/api/reservas/${reservaId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bicicletaId }),
      })

      const resultado = await respuesta.json()

      if (!respuesta.ok) {
        mostrarMensaje(resultado.error, "error")
        return
      }

      mostrarMensaje("Bicicleta liberada exitosamente", "exito")
      // Se recargan los datos para reflejar los cambios
      await cargarDatos()

    } catch (error) {
      mostrarMensaje("Error al liberar la bicicleta", "error")
    }
  }

  function mostrarMensaje(texto: string, tipo: "exito" | "error") {
    setMensaje(texto)
    setTipoMensaje(tipo)
    // Es para que el mensaje desaparesca despues de 4 segundos
    setTimeout(() => setMensaje(""), 4000)
  }

  if (cargando) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 text-lg">Cargando...</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8">

      {/* Mensaje de exito o error */}
      {mensaje && (
        <div className={`p-4 rounded-lg text-white font-medium ${
          tipoMensaje === "exito" ? "bg-green-500" : "bg-red-500"
        }`}>
          {mensaje}
        </div>
      )}

      {/* Formulario de reserva */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Reservar una bicicleta
        </h2>

        {/* Lista de bicicletas disponibles agrupadas por estacion */}
        <div className="flex flex-col gap-4 mb-6">
          {estaciones?.map((estacion) => (
            <div key={estacion.id}>
              <p className="text-sm font-semibold text-gray-500 mb-2">
                {estacion.nombre} — {estacion.ubicacion}
              </p>

              {estacion.bicicletas.length === 0 ? (
                <p className="text-gray-400 text-sm pl-2">
                  Sin bicicletas disponibles
                </p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {estacion.bicicletas.map((bici: Bicicleta) => (
                    <button
                      key={bici.id}
                      onClick={() => setBiciIdSel(bici.id)}
                      className={`px-4 py-2 rounded-lg border-2 font-medium transition-all ${
                        biciIdSel === bici.id
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-gray-700 border-gray-300 hover:border-blue-400"
                      }`}
                    >
                    {bici.nombre}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={crearReserva}
          disabled={enviando || !biciIdSel}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300
                     text-white font-bold py-3 px-6 rounded-lg transition-all"
        >
          {enviando ? "Reservando..." : "Confirmar Reserva"}
        </button>
      </div>

      {/* Reservas activas */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Mis reservas activas
        </h2>

        {(reservas && reservas.length === 0) ? (
          <p className="text-gray-400">No tienes reservas activas en este momento.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {reservas?.map((reserva: any) => (
              <div
                key={reserva.id}
                className="flex justify-between items-center
                           bg-blue-50 border border-blue-200
                           rounded-lg px-4 py-3"
              >
                <div>
                  <p className="font-semibold text-gray-700">
                    {reserva.bicicletas?.nombre}
                  </p>
                  <p className="text-gray-400 text-sm">
                    Desde: {new Date(reserva.hora_inicio).toLocaleString("es-CO")}
                  </p>
                </div>

                <button
                  onClick={() => liberarBicicleta(reserva.id, reserva.bicicleta_id)}
                  className="bg-red-500 hover:bg-red-600 text-white
                             font-medium px-4 py-2 rounded-lg transition-all"
                >
                  Liberar
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}