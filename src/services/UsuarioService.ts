import type Usuario from "../models/Usuario"
import { api } from "./Service"

export const usuarioService = {
  // GET /usuarios/{id}
  buscarPorId: async (id: number): Promise<Usuario> => {
    const resposta = await api.get<Usuario>(`/usuarios/${id}`)
    return resposta.data
  },

  // PUT /usuarios/atualizar
  atualizar: async (dadosUsuario: Usuario): Promise<Usuario> => {
    const resposta = await api.put<Usuario>('/usuarios/atualizar', dadosUsuario)
    return resposta.data
  }
}
