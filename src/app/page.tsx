"use client"

import { useEffect, useState } from 'react'
import { EstacionConBicicletas } from '@/domain/station'
import { Bicicleta } from '@/domain/bike'

export default function PaginaPrincipal() {
  // Gestionar los tres estados principales de la pagina
  const [estaciones, setEstaciones] = useState<EstacionConBicicletas[]>([])
  const [cargando, setCargando] = useState(true)
  const [mensaje, setMensaje] = useState('')

  // Al cargar la pagina se obtienen las estaciones
  // Se carga una sola vez cuando la pagina se monta o se carga por primera vez
  // Cuando carga llama al metodo cargar estaciones
  useEffect(() => {
    obtenerEstaciones()
  }, [])

  async function obtenerEstaciones() {
    try { // Manejo de errores para la llamada de la api
      setCargando(true)
      const respuesta = await fetch('/api/estaciones') //llamada a api para obtener las estaciones
      const resultado = await respuesta.json() //Convertir la respuesta a formato Json
      setEstaciones(resultado.data) //Actualizar el estado de las estaciones con los datos obtenidos
    } catch (error) {
      setMensaje('Error al cargar las estaciones')
    } finally {
      setCargando(false)
    }
  }

  if (cargando) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 text-lg">Cargando estaciones...</p>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Estaciones disponibles
      </h2>

      {mensaje && (
        <p className="text-red-500 mb-4">{mensaje}</p>
      )}

      {/* Lista de las estaciones */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {estaciones?.map((estacion) => (
          <div
            key={estacion.id}
            className="bg-white rounded-xl shadow p-6"
          >
            {/* Encabezado de la estacion */}
            <div className="mb-4">
              <h3 className="text-lg font-bold text-blue-600">
                {estacion.nombre}
              </h3>
              <p className="text-gray-500 text-sm">
                 {estacion.ubicacion}
              </p>
            </div>

            {/* Bicicletas que se encuentran disponibles */}
            {estacion.bicicletas.length === 0 ? (
              <p className="text-gray-400 text-sm">
                No hay bicicletas disponibles en esta estación
              </p>
            ) : (
              <div className="flex flex-col gap-2">
                {estacion.bicicletas.map((bici: Bicicleta) => (
                  <div
                    key={bici.id}
                    className="flex justify-between items-center
                               bg-green-50 border border-green-200
                               rounded-lg px-4 py-2"
                  >
                    <span className="text-gray-700 font-medium">
                       {bici.nombre}
                    </span>
                    <span className="text-green-600 text-sm font-semibold">
                      Disponible
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Contador de bicis disponibles */}
            <p className="text-gray-400 text-xs mt-3">
              {estacion.bicicletas.length} bicicleta(s) disponible(s)
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}