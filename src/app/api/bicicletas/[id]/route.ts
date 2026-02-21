import { NextRequest, NextResponse } from 'next/server'
import { BicicletaServicio }         from '@/services/bike.service'

type Params = { params: Promise<{id: string}>}

// Retorna una bicicleta por su id
export async function GET(
  _request: NextRequest,
  { params }: Params
) {
  try {
    const { id } = await params
    const bicicleta = await BicicletaServicio.obtenerBicicletaPorId(Number(id))

    return NextResponse.json({
      data: bicicleta,
      error: null,
      mensaje: 'Bicicleta obtenida correctamente',
    })

  } catch (error: any) {
    return NextResponse.json({
      data: null,
      error: error.message,
      mensaje: 'No se encontró la bicicleta',
    }, { status: 404 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: Params
) {
  try {
    const { id } = await params
    const body = await request.json()
    const bicicleta = await BicicletaServicio.actualizarBicicleta(Number(id), body)

    return NextResponse.json({
      data: bicicleta,
      error: null,
      mensaje: 'Bicicleta actualizada correctamente',
    })

  } catch (error: any) {
    return NextResponse.json({
      data: null,
      error: error.message,
      mensaje: 'No se pudo actualizar la bicicleta',
    }, { status: 400 })
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: Params
) {
  try {
    const { id } = await params
    await BicicletaServicio.eliminarBicicleta(Number(id))

    return NextResponse.json({
      data: null,
      error: null,
      mensaje: 'Bicicleta eliminada correctamente',
    })

  } catch (error: any) {
    return NextResponse.json({
      data: null,
      error: error.message,
      mensaje: 'No se pudo eliminar la bicicleta',
    }, { status: 400 })
  }
}