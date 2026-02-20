export enum EstadoBicicleta{
    DISPONOBLE = "disponible",
    NO_DISPONIBLE = "no_disponible",
}

export interface Bicicleta{
    id: number
    nombre: string
    disponible: boolean
    estacionId: number
    creadoEn: Date
}

// DTO para transferir los datos necesarios para crear una bicicleta
// Omit es para omitir los campos que no son necesarios en la creacion,
// estos dos campos los asigna la base de datos automaticamente
export type CrearBicicletaDTO = Omit<Bicicleta, "id" | "creadoEn">;

// Es para actualizar una bicicleta existente
// Partial hace que todos los campos sean opcionales
// Esto es util para actualizar campos especificos
export type ActualizarBicicletaDTO = Partial<CrearBicicletaDTO>;