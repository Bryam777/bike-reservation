import { createClient } from "@supabase/supabase-js";

// Se obtiene las variables de entorno para la URL y la clave de supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY!;

// Se exporta el cliente de supabase para ser utilizado en otras pastes de la aplicacion
export const supabase = createClient(supabaseUrl, supabaseKey);