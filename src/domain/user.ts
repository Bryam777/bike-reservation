export interface Usuario{
    id: number
    nombre: string
    email: string
    creadoEn: Date
}

export type CrearUsuarioDTO = Omit<Usuario, "id" | "creadoEn">;

export type ActualizarUsuarioDTO = Partial<CrearUsuarioDTO>;