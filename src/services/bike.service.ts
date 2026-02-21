import { obtenerBicicletaPorId, obtenerBicicletas, crearBicicleta, actualizarBicicleta, eliminarBicicleta } from "@/repositories/bike.repository";
import { Bicicleta, CrearBicicletaDTO, ActualizarBicicletaDTO } from "@/domain/bike";

export const BicicletaServicio = {
    // Obtener la lista de bicicletas para el administrador
    async obtenerBicicletas(): Promise<Bicicleta[]> {
        return await obtenerBicicletas();
    },

    // Obtener una bicicleta por id
    async obtenerBicicletaPorId(id: number): Promise<Bicicleta> {
        const bicicleta = await obtenerBicicletaPorId(id);
        if(!bicicleta) {
            throw new Error(`No existe una bicicleta con el id ${id}`);
        }
        return bicicleta;
    },

    // Crear una bicileta nueva
    async crearBicicleta(bicicleta: CrearBicicletaDTO): Promise<Bicicleta> {
        if (!bicicleta.nombre || bicicleta.nombre.trim() === '') {
        throw new Error('El nombre de la bicicleta es obligatorio')
        }
        return await crearBicicleta(bicicleta);
    },

    // Actualizar una bicicleta ya existente en la base de datos
  async actualizarBicicleta(id: number, datos: ActualizarBicicletaDTO): Promise<Bicicleta> {
    // Verificamos que la bicicleta exista antes de actualizarla
    await obtenerBicicletaPorId(id)

    return await actualizarBicicleta(id, datos)
  },

  // Eliminar una bicicleta
  async eliminarBicicleta(id: number): Promise<void> {
    // Verificamos que la bicicleta exista antes de eliminarla
    await this.obtenerBicicletaPorId(id)

    await eliminarBicicleta(id)
  },
}