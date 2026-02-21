import { NextRequest, NextResponse } from "next/server";
import { ReservaService } from "@/services/reservation.service";

// Retorna todas las reservas activas de un usuario
export async function GET(request: NextRequest) {
  try {
    // Leemos el parámetro usuarioId de la URL
    const { searchParams } = new URL(request.url);
    const usuarioId = searchParams.get('usuarioId');

    if (!usuarioId) {
      return NextResponse.json({
        data: null,
        error: 'El parametro usuarioId es obligatorio',
        mensaje: 'Parametro faltante',
      }, { status: 400 });
    }

    const reservas = await ReservaService.obtenerReservasActivas(Number(usuarioId));

    return NextResponse.json({
      data: reservas,
      error: null,
      mensaje: 'Reservas obtenidas correctamente',
    });

  } catch (error) {
    return NextResponse.json({
      data: null,
      error: 'Error al obtener las reservas',
      mensaje: 'Ocurrio un error inesperado',
    }, { status: 500 });
  }
}

// POST /api/reservas
// Crea una reserva nueva
export async function POST(request: NextRequest) {
  try {
    // Leemos el cuerpo de la petición
    const body = await request.json();
    const { usuarioId, bicicletaId } = body;

    // Validamos que lleguen los datos necesarios
    if (!usuarioId || !bicicletaId) {
      return NextResponse.json({
        data:    null,
        error:   'usuarioId y bicicletaId son campos obligatorios',
        mensaje: 'Los datos estan incompletos',
      }, { status: 400 });
    }

    const reserva = await ReservaService.crearReserva({
      usuarioId:   Number(usuarioId),
      bicicletaId: Number(bicicletaId),
      horaInicio:  new Date(),
    });

    return NextResponse.json({
      data:    reserva,
      error:   null,
      mensaje: 'Reserva creada satisfactoriamente',
    }, { status: 201 });

  } catch (error: any) {
    return NextResponse.json({
      data:    null,
      error:   error.message,
      mensaje: 'No se pudo crear la reserva',
    }, { status: 400 });
  }
}