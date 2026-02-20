import { obtenerReservasActivasPorUsuario, crearReserva, finalizarReserva } from "@/repositories/reservation.repository";
import { obtenerBicicletaPorId, cambiarEstadoBicicletaNoDisponible, cambiarEstadoBicicletaDisponible } from "@/repositories/bike.repository";
import { Reserva, CrearReservaDTO } from "@/domain/reservation";


export const ReservaService = {

    async obtenerReservasActivas(userId: number): Promise<Reserva[]> {
        return await obtenerReservasActivasPorUsuario(userId);
    },

    // Logica para crear una nueva reserva
    // Se verifica que la bicileta si este disponible
    // Despues si la bicicleta se encuentra disponible se crea la reserva
    // Por ultimo como se reservo se debe cambiar el estado de la bicicleta
    async crearReserva(datos: CrearReservaDTO): Promise<Reserva> {
        const bicicleta = await obtenerBicicletaPorId(datos.bicicletaId);
        // Verificar si existe en la base de datos
        if(!bicicleta){
            throw new Error("Bicileta no encontrada");
        }
        // Verificar si esta disponible
        if(!bicicleta.disponible){
            throw new Error("Bicicleta no dispobible, vuelva mas tarde");
        }
        // Se crea la reserva
        const reserva = await crearReserva(datos);

        // Cambiar el estado de la bicicleta
        await cambiarEstadoBicicletaNoDisponible(datos.bicicletaId);

        return reserva;
    },

    // Logica despues de que termina reserva de una bicleta
    // Se termina la reserva
    // Se cambia el estado de la bicleta
    async finalizarLaReserva(reservaId: number, bicicletaId: number): Promise<void> {
        await finalizarReserva(reservaId);
        await cambiarEstadoBicicletaDisponible(bicicletaId);
    }
}
