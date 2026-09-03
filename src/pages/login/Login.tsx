import {
    useContext,
    useEffect,
    useState,
    type ChangeEvent,
    type SyntheticEvent,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

import hero from "../../assets/hero.png";
import { AuthContext } from "../../contexts/AuthContext";
import type UsuarioLogin from "../../models/UsuarioLogin";
import { normalizarEmail } from "../../utils/normalizarEmail";

function Login() {
    const navigate = useNavigate();
    const { usuario, handleLogin, isLoading } = useContext(AuthContext);

    const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>({
        id: 0,
        nome: "",
        usuario: "",
        senha: "",
        cargo: "",
        token: "",
    });

    useEffect(() => {
        if (usuario.token) {
            navigate("/home");
        }
    }, [usuario.token, navigate]);

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;

        setUsuarioLogin({
            ...usuarioLogin,
            [name]: name === "usuario" ? normalizarEmail(value) : value,
        });
    }

    async function entrar(e: SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();

        await handleLogin({
            ...usuarioLogin,
            usuario: normalizarEmail(usuarioLogin.usuario),
        });
    }

    return (
        <div className="grid min-h-screen grid-cols-1 bg-[#EDF5FF] lg:grid-cols-2">
            <div className="flex items-center justify-center px-4 py-10 sm:px-8">
                <form
                    className="flex w-full max-w-md flex-col gap-5 rounded-3xl border border-white/80 bg-white/70 p-6 shadow-[0_24px_60px_rgba(37,99,235,0.18)] backdrop-blur-xl sm:p-8"
                    onSubmit={entrar}
                >
                    <div className="mb-2 text-center">
                        <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-[#2563EB]">
                            ConectaTravel
                        </p>

                        <h1 className="text-4xl font-bold tracking-tight text-[#172B4D]">
                            Entrar
                        </h1>

                        <p className="mt-3 text-[#526581]">
                            Acesse sua conta para gerenciar clientes e apólices.
                        </p>
                    </div>

                    <div>
                        <label
                            className="mb-2 block text-sm font-semibold text-[#172B4D]"
                            htmlFor="usuario"
                        >
                            E-mail
                        </label>

                        <input
                            type="email"
                            id="usuario"
                            name="usuario"
                            placeholder="email@exemplo.com"
                            className="w-full rounded-xl border border-[#CFE1F5] bg-white px-4 py-3 text-[#172B4D] outline-none transition focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/10"
                            value={usuarioLogin.usuario}
                            onChange={atualizarEstado}
                            autoComplete="email"
                            required
                        />
                    </div>

                    <div>
                        <label
                            className="mb-2 block text-sm font-semibold text-[#172B4D]"
                            htmlFor="senha"
                        >
                            Senha
                        </label>

                        <input
                            type="password"
                            id="senha"
                            name="senha"
                            placeholder="Digite sua senha"
                            className="w-full rounded-xl border border-[#CFE1F5] bg-white px-4 py-3 text-[#172B4D] outline-none transition focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/10"
                            value={usuarioLogin.senha}
                            onChange={atualizarEstado}
                            autoComplete="current-password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="flex min-h-12 w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#1689F5] via-[#2563EB] to-[#6D28D9] px-5 py-3 font-semibold text-white shadow-lg transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <ClipLoader color="#ffffff" size={22} />
                        ) : (
                            "Entrar"
                        )}
                    </button>

                    <hr className="border-[#CFE1F5]" />

                    <p className="text-center text-[#526581]">
                        Ainda não possui uma conta?{" "}
                        <Link
                            to="/cadastro"
                            className="font-semibold text-[#2563EB] hover:underline"
                        >
                            Cadastre-se
                        </Link>
                    </p>
                </form>
            </div>

            <div className="relative hidden overflow-hidden bg-gradient-to-br from-[#1689F5] via-[#2563EB] to-[#6D28D9] lg:flex lg:items-center lg:justify-center">
                <div className="absolute inset-0 bg-black/10" />

                <img
                    src={hero}
                    alt="Seguro viagem ConectaTravel"
                    className="relative z-10 max-h-[80vh] w-full object-contain p-12"
                />
            </div>
        </div>
    );
}

export default Login;
