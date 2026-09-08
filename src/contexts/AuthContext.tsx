import axios from "axios";
import { createContext, useState, type ReactNode } from "react";

import type UsuarioLogin from "../models/UsuarioLogin";
import { configurarToken, login } from "../services/Service";
import { ToastAlerta } from "../utils/ToastAlerta";

interface AuthContextProps {
    usuario: UsuarioLogin;
    handleLogin(usuarioLogin: UsuarioLogin): Promise<void>;
    handleLogout(): void;
    isLoading: boolean;
}

interface AuthProviderProps {
    children: ReactNode;
}

const USUARIO_STORAGE_KEY = "conectatravel:usuario";

const USUARIO_INICIAL: UsuarioLogin = {
    id: 0,
    nome: "",
    usuario: "",
    senha: "",
    token: "",
    cargo: "",
};

function carregarUsuarioArmazenado(): UsuarioLogin {
    try {
        const usuarioArmazenado = localStorage.getItem(USUARIO_STORAGE_KEY);

        if (!usuarioArmazenado) {
            return { ...USUARIO_INICIAL };
        }

        const usuarioSalvo = JSON.parse(
            usuarioArmazenado,
        ) as Partial<UsuarioLogin>;

        if (!usuarioSalvo.token) {
            localStorage.removeItem(USUARIO_STORAGE_KEY);
            return { ...USUARIO_INICIAL };
        }

        return {
            ...USUARIO_INICIAL,
            ...usuarioSalvo,
            senha: "",
        };
    } catch {
        localStorage.removeItem(USUARIO_STORAGE_KEY);
        return { ...USUARIO_INICIAL };
    }
}

function armazenarUsuario(usuario: UsuarioLogin) {
    localStorage.setItem(USUARIO_STORAGE_KEY, JSON.stringify(usuario));
}

function removerUsuarioArmazenado() {
    localStorage.removeItem(USUARIO_STORAGE_KEY);
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: AuthProviderProps) {
    const [usuario, setUsuario] = useState<UsuarioLogin>(() => {
        const usuarioSalvo = carregarUsuarioArmazenado();

        configurarToken(usuarioSalvo.token);

        return usuarioSalvo;
    });

    const [isLoading, setIsLoading] = useState(false);

    async function handleLogin(usuarioLogin: UsuarioLogin) {
        setIsLoading(true);

        try {
            await login(
                "/usuarios/logar",
                usuarioLogin,
                (usuarioAutenticado: UsuarioLogin) => {
                    const usuarioPersistido: UsuarioLogin = {
                        ...USUARIO_INICIAL,
                        ...usuarioAutenticado,
                        senha: "",
                    };

                    configurarToken(usuarioPersistido.token);
                    armazenarUsuario(usuarioPersistido);
                    setUsuario(usuarioPersistido);
                },
            );

            ToastAlerta("Usuário autenticado com sucesso!", "sucesso");
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 401) {
                    ToastAlerta("Usuário ou senha inválidos!", "erro");
                } else {
                    ToastAlerta(
                        `Erro ao autenticar o usuário (${error.response?.status ?? "sem resposta"})`,
                        "erro",
                    );
                }
            } else {
                ToastAlerta("Não foi possível realizar o login!", "erro");
            }
        } finally {
            setIsLoading(false);
        }
    }

    function handleLogout() {
        configurarToken("");
        removerUsuarioArmazenado();
        setUsuario({ ...USUARIO_INICIAL });

        ToastAlerta("Usuário desconectado com sucesso!", "sucesso");
    }

    return (
        <AuthContext.Provider
            value={{
                usuario,
                handleLogin,
                handleLogout,
                isLoading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
