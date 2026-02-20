import { Bicicleta } from "./bike";

export interface Estacion{
    id: number
    nombre: string
    ubicacion: string
    creadoEn: Date
}

// Cuando listemos una estacion, queremos ver sus biciletas
// Al extender de la interfase Estacion, se heredan sus campos y se agrega el campo bicicletas que es un arreglo
export interface EstacionConBicicletas extends Estacion{
    bicicletas: Bicicleta[]
}

export type CrearEstacionDTO = Omit<Estacion, "id" | "creadoEn">;

export type ActualizarEstacionDTO = Partial<CrearEstacionDTO>;