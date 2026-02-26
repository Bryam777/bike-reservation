import { NextResponse } from "next/server";
import { EstacionServicio } from "@/services/station.service";

export async function GET() {
      try {
    console.log("ENTRÓ AL ENDPOINT /api/estaciones")
    const estaciones = await EstacionServicio.obtenerEstacionConBicicletasDisponibles();
    console.log("API estaciones ejecutandose")
    return NextResponse.json({
      data: estaciones,
      error: null,
      mensaje: "Estaciones obtenidas correctamente",
    })

  } catch (error) {
    console.error("enpoint estaciones", error)
    return NextResponse.json({
      url: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "undefined",
      data: null,
      error: "Error al obtener las estaciones",
      mensaje: "Ocurrió un error inesperado",
  
    }, { status: 500 })
  }
}