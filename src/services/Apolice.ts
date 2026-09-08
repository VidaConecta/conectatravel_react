import type Apolice from "../models/Apolice";
import { api } from "./Service";
 
export const apoliceService = {
    // POST /apolices
    cadastrar: async (dadosApolice: Apolice): Promise<Apolice> => {
        const resposta = await api.post<Apolice>("/apolices", dadosApolice);
        return resposta.data;
    },
 
    // GET /apolices
    listarTodos: async (): Promise<Apolice[]> => {
        const resposta = await api.get<Apolice[]>("/apolices");
        return resposta.data;
    },
 
    // GET /apolices/{id}
    buscarPorId: async (id: number): Promise<Apolice> => {
        const resposta = await api.get<Apolice>(`/apolices/${id}`);
        return resposta.data;
    },
 
    // PUT /apolices
    atualizar: async (id: number, dadosApolice: Apolice): Promise<Apolice> => {
        const resposta = await api.put<Apolice>("/apolices", {
            ...dadosApolice,
            id,
        });
 
        return resposta.data;
    },
 
    // DELETE /apolices/{id}
    deletar: async (id: number): Promise<void> => {
        await api.delete(`/apolices/${id}`);
    },
 
    // POST /apolices/{id}/validar-cobertura
    validarCobertura: async (
        id: number,
        coberturas: Record<string, boolean>,
    ): Promise<unknown> => {
        const resposta = await api.post(
            `/apolices/${id}/validar-cobertura`,
            coberturas,
        );
        return resposta.data;
    },
};
 