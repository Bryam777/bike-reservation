import { NextResponse } from "next/server";
import { EstacionServicio } from "@/services/station.service";

export async function GET() {
      try {
    const estaciones = await EstacionServicio.obtenerEstacionConBicicletasDisponibles();

    return NextResponse.json({
      data:    estaciones,
      error:   null,
      mensaje: 'Estaciones obtenidas correctamente',
    })

  } catch (error) {
    return NextResponse.json({
      data:    null,
      error:   'Error al obtener las estaciones',
      mensaje: 'Ocurrió un error inesperado',
    }, { status: 500 })
  }
}