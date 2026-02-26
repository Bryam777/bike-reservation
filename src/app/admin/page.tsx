"use client"

import { useEffect, useState } from "react"
import { Bicicleta, CrearBicicletaDTO } from "@/domain/bike"
import { Estacion } from "@/domain/station"

export default function PaginaAdmin() {
  const [bicicletas, setBicicletas] = useState<Bicicleta[]>([])
  const [estaciones, setEstaciones] = useState<Estacion[]>([])
  const [cargando, setCargando] = useState(true)
  const [enviando, setEnviando] = useState(false)
  const [mensaje, setMensaje] = useState("")
  const [tipoMensaje, setTipoMensaje] = useState<"exito" | "error">("exito")

  // Formulario para crear/editar
  const [modoEdicion, setModoEdicion] = useState(false)
  const [biciEditando, setBiciEditando] = useState<Bicicleta | null>(null)
  const [formulario, setFormulario] = useState({
    nombre: "",
    estacionId: "",
    disponible: true,
  })

  useEffect(() => {
    cargarDatos()
  }, [])

  async function cargarDatos() {
    try {
      setCargando(true)
      const [resBicis, resEstaciones] = await Promise.all([
        fetch("/api/bicicletas"),
        fetch("/api/estaciones"),
      ])
      const bicis = await resBicis.json()
      const estacions = await resEstaciones.json()
      setBicicletas(bicis.data)
      setEstaciones(estacions.data)
    } finally {
      setCargando(false)
    }
  }

  function iniciarEdicion(bici: Bicicleta) {
    setModoEdicion(true)
    setBiciEditando(bici)
    setFormulario({
      nombre: bici.nombre,
      estacionId: String(bici.estacionId),
      disponible: bici.disponible,
    })
  }

  function cancelarEdicion() {
    setModoEdicion(false)
    setBiciEditando(null)
    setFormulario({ nombre: "", estacionId: "", disponible: true })
  }

  async function guardarBicicleta() {
    if (!formulario.nombre || !formulario.estacionId) {
      mostrarMensaje("Nombre y estación son obligatorios", "error")
      return
    }

    try {
      setEnviando(true)

      if (modoEdicion && biciEditando) {
        // Actualizar bicicleta existente
        await fetch(`/api/bicicletas/${biciEditando.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nombre: formulario.nombre,
            estacionId: Number(formulario.estacionId),
            disponible: formulario.disponible,
          }),
        })
        mostrarMensaje("Bicicleta actualizada correctamente", "exito")
      } else {
        // Crear bicicleta nueva
        await fetch("/api/bicicletas", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nombre: formulario.nombre,
            estacionId: Number(formulario.estacionId),
          }),
        })
        mostrarMensaje("Bicicleta creada correctamente", "exito")
      }

      cancelarEdicion()
      await cargarDatos()

    } catch (error) {
      mostrarMensaje("Error al guardar la bicicleta", "error")
    } finally {
      setEnviando(false)
    }
  }

  async function eliminarBicicleta(id: number) {
    if (!confirm("Estas seguro de que deseas eliminar esta bicicleta?")) return

    try {
      await fetch(`/api/bicicletas/${id}`, { method: "DELETE" })
      mostrarMensaje("Bicicleta eliminada correctamente", "exito")
      await cargarDatos()
    } catch (error) {
      mostrarMensaje("Error al eliminar la bicicleta", "error")
    }
  }

  function mostrarMensaje(texto: string, tipo: "exito" | "error") {
    setMensaje(texto)
    setTipoMensaje(tipo)
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

      <h2 className="text-2xl font-bold text-gray-800">
        Panel de Administración
      </h2>

      {/* Mensaje de exito o error */}
      {mensaje && (
        <div className={`p-4 rounded-lg text-white font-medium ${
          tipoMensaje === "exito" ? "bg-green-500" : "bg-red-500"
        }`}>
          {mensaje}
        </div>
      )}

      {/* Formulario crear / editar */}
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-lg font-bold text-gray-700 mb-4">
          {modoEdicion ? "Editar Bicicleta" : "Crear Nueva Bicicleta"}
        </h3>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nombre de la bicicleta"
            value={formulario.nombre}
            onChange={(e) => setFormulario({ ...formulario, nombre: e.target.value })}
            className="border border-gray-300 rounded-lg px-4 py-2
                       focus:outline-none focus:border-blue-500"
          />

          <select
            value={formulario.estacionId}
            onChange={(e) => setFormulario({ ...formulario, estacionId: e.target.value })}
            className="border border-gray-300 rounded-lg px-4 py-2
                       focus:outline-none focus:border-blue-500"
          >
            <option value="">Selecciona una estacion</option>
            {estaciones.map((estacion: any) => (
              <option key={estacion.id} value={estacion.id}>
                {estacion.nombre}
              </option>
            ))}
          </select>

          {modoEdicion && (
            <label className="flex items-center gap-2 text-gray-700">
              <input
                type="checkbox"
                checked={formulario.disponible}
                onChange={(e) => setFormulario({ ...formulario, disponible: e.target.checked })}
                className="w-4 h-4"
              />
              Disponible
            </label>
          )}

          <div className="flex gap-3">
            <button
              onClick={guardarBicicleta}
              disabled={enviando}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300
                         text-white font-bold py-2 px-4 rounded-lg transition-all"
            >
              {enviando ? "Guardando..." : modoEdicion ? "Actualizar" : "Crear"}
            </button>

            {modoEdicion && (
              <button
                onClick={cancelarEdicion}
                className="flex-1 bg-gray-200 hover:bg-gray-300
                           text-gray-700 font-bold py-2 px-4 rounded-lg transition-all"
              >
                Cancelar
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Tabla de bicicletas */}
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-lg font-bold text-gray-700 mb-4">
          Todas las bicicletas
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="pb-3 text-gray-500 font-medium">ID</th>
                <th className="pb-3 text-gray-500 font-medium">Nombre</th>
                <th className="pb-3 text-gray-500 font-medium">Estacion</th>
                <th className="pb-3 text-gray-500 font-medium">Estado</th>
                <th className="pb-3 text-gray-500 font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {bicicletas.map((bici) => (
                <tr key={bici.id} className="border-b border-gray-100">
                  <td className="py-3 text-gray-500">{bici.id}</td>
                  <td className="py-3 font-medium text-gray-700">{bici.nombre}</td>
                  <td className="py-3 text-gray-500">{bici.estacionId}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      bici.disponible
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}>
                      {bici.disponible ? "Disponible" : "No disponible"}
                    </span>
                  </td>
                  <td className="py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => iniciarEdicion(bici)}
                        className="bg-yellow-400 hover:bg-yellow-500
                                   text-white text-sm font-medium
                                   px-3 py-1 rounded-lg transition-all"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => eliminarBicicleta(bici.id)}
                        className="bg-red-500 hover:bg-red-600
                                   text-white text-sm font-medium
                                   px-3 py-1 rounded-lg transition-all"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}