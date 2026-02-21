import { NextRequest, NextResponse } from 'next/server'
import { BicicletaServicio }         from '@/services/bike.service'

// Retorna una bicicleta por su id
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const {id} = await params
    const bicicleta = await BicicletaServicio.obtenerBicicletaPorId(Number(id))
    console.log("SUPABASE URL:", process.env.NEXT_PUBLIC_SUPABASE_URL)
    return NextResponse.json({
      data:    bicicleta,
      error:   null,
      mensaje: 'Bicicleta obtenida correctamente',
    })

  } catch (error: any) {
    return NextResponse.json({
      data:    null,
      error:   error.message,
      mensaje: 'No se encontró la bicicleta',
    }, { status: 404 })
  }
}

// Actualiza una bicicleta existente
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body       = await request.json()
    const bicicleta  = await BicicletaServicio.actualizarBicicleta(Number(params.id), body)

    return NextResponse.json({
      data:    bicicleta,
      error:   null,
      mensaje: 'Bicicleta actualizada correctamente',
    })

  } catch (error: any) {
    return NextResponse.json({
      data:    null,
      error:   error.message,
      mensaje: 'No se pudo actualizar la bicicleta',
    }, { status: 400 })
  }
}

// Elimina una bicicleta
export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await BicicletaServicio.eliminarBicicleta(Number(params.id))

    return NextResponse.json({
      data:    null,
      error:   null,
      mensaje: 'Bicicleta eliminada correctamente',
    })

  } catch (error: any) {
    return NextResponse.json({
      data:    null,
      error:   error.message,
      mensaje: 'No se pudo eliminar la bicicleta',
    }, { status: 400 })
  }
}