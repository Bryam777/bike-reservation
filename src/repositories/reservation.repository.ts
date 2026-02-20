import { supabase } from "@/lib/supabase";
import { Reserva, CrearReservaDTO } from "@/domain/reservation";

// Funcion para obtener todas las reservas activas de un usuario
export const obtenerReservasActivasPorUsuario = async(userId: number): Promise<Reserva[]> => {
    const { data, error } = await supabase
        .from("reservas")
        .select(`*, bicicletas(*)`)
        .eq("usuario_id", userId)
        .eq("activa", true);

    if (error) throw new Error(error.message);
    return data as Reserva[];
}

// Funcion para crear una reserva nueva
export const crearReserva = async(reserva: CrearReservaDTO): Promise<Reserva> => {
    const { data, error} =  await supabase
        .from("reservas")
        .insert({
        usuario_id:    reserva.usuarioId,
        bicicleta_id:  reserva.bicicletaId,
        hora_inicio:   reserva.horaInicio,})
        .select()
        .single();

    if (error) throw new Error(error.message)
    return data as Reserva
}

// Funcion para finalizar una reserva
export const finalizarReserva =  async(id: number): Promise<void> => {
    const { data, error } = await supabase
        .from("reservas")
        .update({
            activa: false,
            hora_fin: new Date().toISOString(),})
        .eq("id", id);

        if (error) throw new Error(error.message)        
}