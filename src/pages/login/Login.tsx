import {
    useContext,
    useEffect,
    useState,
    type ChangeEvent,
    type SyntheticEvent,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

import { AuthContext } from "../../contexts/AuthContext";
import type UsuarioLogin from "../../models/UsuarioLogin";
import { normalizarEmail } from "../../utils/normalizarEmail";

const hero = "https://ik.imagekit.io/lojagames/Seguro%20Viagem/travel.jpg";

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
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10 lg:justify-start lg:px-24">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${hero})` }}
            />

            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/10 lg:bg-gradient-to-l" />

            <form
                className="relative z-10 flex w-full max-w-md flex-col gap-5 rounded-3xl border border-white/60 bg-white/60 p-6 shadow-[0_24px_60px_rgba(23,43,77,0.25)] backdrop-blur-md sm:p-8"
                onSubmit={entrar}
            >
                <div className="mb-2 flex flex-col items-center text-center">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1689F5] via-[#2563EB] to-[#6D28D9] shadow-lg">
                        <svg
                            width="28"
                            height="28"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M12 2L4 5v6c0 5 3.5 8.5 8 9 4.5-.5 8-4 8-9V5l-8-3z"
                                stroke="#ffffff"
                                strokeWidth="1.5"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M8.5 12.5l2 2 5-5"
                                stroke="#ffffff"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>

                    <h1 className="text-3xl font-bold tracking-tight text-[#172B4D]">
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
                        className="w-full rounded-xl border border-white/70 bg-white/70 px-4 py-3 text-[#172B4D] placeholder-[#8AA0BC] outline-none transition focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/10"
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
                        className="w-full rounded-xl border border-white/70 bg-white/70 px-4 py-3 text-[#172B4D] placeholder-[#8AA0BC] outline-none transition focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/10"
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
    );
}

export default Login;