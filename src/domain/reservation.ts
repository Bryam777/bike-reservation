export interface Reserva{
    id: number
    usuarioId: number
    bicicletaId: number
    horaInicio: Date
    horaFin: Date | null // null porque cuando se crea la reserva, no hay hora de fin
    activa: boolean
    creadoEn: Date
}

// Pick es para seleccionar solo los campos necesarios para crear una reserva
// Se crea una copia de la interfaz Reserva pero solo con los campos deseados
// Esto sirve para reutilizar la interfaz Reserva pero con un enfoque especifico para la creacion de reservas
export type CrearReservaDTO = Pick<Reserva, "id" | "bicicletaId" | "horaInicio">;