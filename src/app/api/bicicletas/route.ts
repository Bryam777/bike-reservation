import { NextRequest, NextResponse } from 'next/server'
import { BicicletaServicio }         from '@/services/bike.service'


// Retorna todas las bicicletas
export async function GET() {
  try {
    const bicicletas = await BicicletaServicio.obtenerBicicletas()

    return NextResponse.json({
      data:    bicicletas,
      error:   null,
      mensaje: 'Bicicletas obtenidas correctamente',
    })

  } catch (error) {
    return NextResponse.json({
      data:    null,
      error:   'Error al obtener las bicicletas',
      mensaje: 'Ocurrió un error inesperado',
    }, { status: 500 })
  }
}

// Crea una bicicleta nueva
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { nombre, estacionId } = body

    if (!nombre || !estacionId) {
      return NextResponse.json({
        data:    null,
        error:   'nombre y estacionId son obligatorios',
        mensaje: 'Datos incompletos',
      }, { status: 400 })
    }

    const bicicleta = await BicicletaServicio.crearBicicleta({
      nombre,
      disponible: true,
      estacionId: Number(estacionId),
    })

    return NextResponse.json({
      data:    bicicleta,
      error:   null,
      mensaje: 'Bicicleta creada correctamente',
    }, { status: 201 })

  } catch (error: any) {
    return NextResponse.json({
      data:    null,
      error:   error.message,
      mensaje: 'No se pudo crear la bicicleta',
    }, { status: 400 })
  }
}