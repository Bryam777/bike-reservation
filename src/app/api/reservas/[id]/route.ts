import { NextRequest, NextResponse } from 'next/server'
import { ReservaService } from '@/services/reservation.service'

// PATCH /api/reservas/[id]
// Libera una bicicleta cerrando la reserva activa
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { bicicletaId } = body
    const reservaId = Number(id)

    if (!bicicletaId) {
      return NextResponse.json({
        data: null,
        error: 'bicicletaId es obligatorio',
        mensaje: 'Datos incompletos',
      }, { status: 400 })
    }

    await ReservaService.finalizarLaReserva(reservaId, Number(bicicletaId))

    return NextResponse.json({
      data: null,
      error: null,
      mensaje: 'Bicicleta liberada correctamente',
    })

  } catch (error: any) {
    return NextResponse.json({
      data: null,
      error: error.message,
      mensaje: 'No se pudo liberar la bicicleta',
    }, { status: 400 })
  }
}