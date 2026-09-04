import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import { toast } from "react-toastify";
import type Usuario from "../models/Usuario";
import type UsuarioLogin from "../models/UsuarioLogin";

const TIMEOUT_PADRAO_MS = 15000;
const TIMEOUT_RETENTATIVA_MS = 60000;

type ConfiguracaoComRetentativa = InternalAxiosRequestConfig & {
    _tentativaDeReconexao?: boolean;
};

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL ?? "https://conectatravel.onrender.com",
    timeout: TIMEOUT_PADRAO_MS,
});

// O backend gratuito do Render "dorme" após um tempo sem uso: a primeira
// requisição depois disso pode demorar bem mais que o normal para responder.
api.interceptors.response.use(
    (resposta) => resposta,
    (erro: AxiosError) => {
        const configuracaoOriginal = erro.config as
            | ConfiguracaoComRetentativa
            | undefined;

        const foiTimeout = erro.code === "ECONNABORTED";

        if (!foiTimeout || !configuracaoOriginal || configuracaoOriginal._tentativaDeReconexao) {
            return Promise.reject(erro);
        }

        configuracaoOriginal._tentativaDeReconexao = true;
        configuracaoOriginal.timeout = TIMEOUT_RETENTATIVA_MS;

        toast.info(
            "Iniciando servidor, isso pode levar até 1 minuto na primeira requisição...",
            { position: "top-right", autoClose: 8000 }
        );

        return api(configuracaoOriginal);
    }
);

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