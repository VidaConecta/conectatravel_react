import type Cliente from "../models/Cliente";
import { api } from "./Service";

 

export const clienteService = {
  // POST /clientes
  cadastrar: async (dadosCliente: Cliente): Promise<Cliente> => {
    const resposta = await api.post<Cliente>('/clientes', dadosCliente);
    return resposta.data;
  },

  // GET /clientes
  listarTodos: async (): Promise<Cliente[]> => {
    const resposta = await api.get<Cliente[]>('/clientes');
    return resposta.data;
  },

  // GET /clientes/{id}
  buscarPorId: async (id: number): Promise<Cliente> => {
    const resposta = await api.get<Cliente>(`/clientes/${id}`);
    return resposta.data;
  },

  // PUT /clientes/{id}
  atualizar: async (id: number, dadosCliente: Cliente): Promise<Cliente> => {
    const resposta = await api.put<Cliente>(`/clientes/${id}`, dadosCliente);
    return resposta.data;
  },

  // DELETE /clientes/{id}
  deletar: async (id: number): Promise<void> => {
    await api.delete(`/clientes/${id}`);
  }
};