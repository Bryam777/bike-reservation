import { supabase } from "@/lib/supabase";
import { Estacion, EstacionConBicicletas, CrearEstacionDTO } from "@/domain/station";

// Funcion para obtener todas las estaciones  con bicicletas
export const obtenerEstacionesConBicicletas = async(): Promise<EstacionConBicicletas[]> => {
    const { data, error } = await supabase
        .from("estaciones")
        .select(`*, bicicletas(*)`);

    if (error) throw new Error(error.message);
    return data as EstacionConBicicletas[];
}

// Funcion para obtener una estacion por su ID
export const obtenerEstacionPorId = async(id: number): Promise<Estacion | null> => {
    const { data, error } = await supabase
        .from("estaciones")
        .select("*")
        .eq("id", id)
        .single();

    if (error) return null;
    return data as Estacion;
}

// Funcion para crear una estacion nueva
export const crearEstacion = async(estacion: CrearEstacionDTO): Promise<Estacion> => {
    const { data, error } = await supabase
        .from("estaciones")
        .insert(estacion)
        .select()
        .single();

    if (error) throw new Error(error.message);
    return data as Estacion;
}

// Funcion para eliminar una etacion por su ID
export const eliminarEstacion = async(id: number): Promise<void> => {
    const { error } = await supabase
        .from("estaciones")
        .delete()
        .eq("id", id);

    if (error) throw new Error(error.message);
}