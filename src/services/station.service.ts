import {obtenerEstacionesConBicicletas} from '@/repositories/station.repository'
import { EstacionConBicicletas }  from '@/domain/station'

export const EstacionServicio = {
    // Obtener todas las bicicletas con sus bicicletas disponibles
    async obtenerEstacionConBicicletasDisponibles(): Promise<EstacionConBicicletas[]> {

        //Se llama a la funcion del repositorio para obtener las estaciones con biciletas
        const estaciones =  await obtenerEstacionesConBicicletas();

        // Se Realiza un filtro para mostrar solo las estaciones que tengan bicletas disponibles
        const resultado = estaciones.map((estacion) => ({
            ...estacion,
            bicicletas: estacion.bicicletas.filter((bicicleta) => bicicleta.disponible === true),
        }));
        return resultado;
    },

    // Obtener las estaciones con sus bicicletas para el administrador
    async obtenerEstacionConBicicletas(): Promise<EstacionConBicicletas[]> {
        //Se llama a la funcion del repositorio para obtener las estaciones con biciletas
        const estaciones =  await obtenerEstacionesConBicicletas();
        return estaciones;
    },
}