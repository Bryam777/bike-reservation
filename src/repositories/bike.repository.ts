import {supabase} from "../lib/supabase";
import { Bicicleta, CrearBicicletaDTO, ActualizarBicicletaDTO } from "@/domain/bike";

// Funcion para obtener todas las bicicletas desde la base de datos
export const obtenerBicicletas = async(): Promise<Bicicleta[]> => {
    const { data, error} = await supabase
        .from("bicicletas") // Decirle a supabase que tabla bamos a consultar
        .select("*"); //Seleccionar todas las columnas de la tabla

    if (error) throw new Error(error.message);
    return data as Bicicleta[];
}

// Funcion para obtener las bicicletas disponibles
export const obtenerBicicletasDisponibles = async(): Promise<Bicicleta[]> => {
    const { data, error} = await supabase
        .from("bicicletas")
        .select("*")
        .eq("disponible", true); // Una consulta Where para filtar

    if (error) throw new Error(error.message);
    return data as Bicicleta[];
}

// Funcion para ontener una bicicleta por su ID
export const obtenerBicicletaPorId  = async(id: number): Promise<Bicicleta | null> => {
    const { data, error } = await supabase
        .from("bicicletas")
        .select("*")
        .eq("id", id)
        .single(); // Que solo regrese un resultado, si no encuentra nada retorna un null

    if (error) return null;
    return data as Bicicleta;
}

// Funcion para crear una bicicleta nueva
export const crearBicicleta = async(bicicleta: CrearBicicletaDTO): Promise<Bicicleta> => {
    const { data, error } = await supabase
        .from("bicicletas")
        .insert(bicicleta) // Para insertar un registro nuevo en la tabla
        .select("*")
        .single();

    if (error) throw new Error(error.message);
    return data as Bicicleta;
}

// Funcion para actualizar una bicicleta existente
export const actualizarBicicleta = async(id: number, bicicleta: ActualizarBicicletaDTO): Promise<Bicicleta> => {
    const { data, error } = await supabase
        .from("bicicletas")
        .update(bicicleta) // Para actualizar un registro existente en la tabla, se le pasa el objeto con los campos a actualizar
        .eq("id", id)
        .select()
        .single();

    if (error) throw new Error(error.message);
    return data as Bicicleta;
}

// Funcion para eliminar una bicicleta por su ID
export const eliminarBicicleta =  async(id: number): Promise<void> => {
    const { error } = await supabase
        .from("bicicletas")
        .delete()
        .eq("id", id);

    if (error) throw new Error(error.message);
}

// Funcion para cambiar el estado de una bicicleta de disponible a no disponible
export const cambiarEstadoBicicletaNoDisponible = async(id: number): Promise<void> => {
    const { error } = await supabase
        .from("bicicletas")
        .update({ disponible: false})
        .eq("id", id);

    if (error) throw new Error(error.message);
    
}

// Funcion para cambiar el estado de una bicicleta de no disponible a disponible
export const cambiarEstadoBicicletaDisponible = async(id: number): Promise<void> => {
    const { error } = await supabase
        .from("bicicletas")
        .update({ disponible: true})
        .eq("id", id);

    if (error) throw new Error(error.message);
}
