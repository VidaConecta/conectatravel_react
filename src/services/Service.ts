import axios from "axios";
import type Usuario from "../models/Usuario";
import type UsuarioLogin from "../models/UsuarioLogin";

export const api = axios.create({
    baseURL: "https://conectatravel.onrender.com",
});

type AtualizarDados<T> = (dados: T) => void;

export async function cadastrarUsuario(
    url: string,
    dados: Usuario,
    setDados: AtualizarDados<Usuario>,
) {
    const resposta = await api.post<Usuario>(url, dados);
    setDados(resposta.data);
}

export async function login(
    url: string,
    dados: UsuarioLogin,
    setDados: AtualizarDados<UsuarioLogin>,
) {
    const resposta = await api.post<UsuarioLogin>(url, dados);
    setDados(resposta.data);
}

export function configurarToken(token: string) {
    if (!token) {
        delete api.defaults.headers.common.Authorization;
        return;
    }

    const tokenFormatado = token.toLowerCase().startsWith("bearer ")
        ? token
        : `Bearer ${token}`;

    api.defaults.headers.common.Authorization = tokenFormatado;
}