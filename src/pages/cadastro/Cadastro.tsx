import { useState, type ChangeEvent, type SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ClipLoader } from "react-spinners";

import hero from "../../assets/hero.png";
import type Usuario from "../../models/Usuario";
import { cadastrarUsuario } from "../../services/Service";
import { normalizarEmail } from "../../utils/normalizarEmail";
import { ToastAlerta } from "../../utils/ToastAlerta";

function Cadastro() {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [confirmarSenha, setConfirmarSenha] = useState("");

    const [usuario, setUsuario] = useState<Usuario>({
        id: 0,
        nome: "",
        usuario: "",
        senha: "",
        cargo: "",
    });

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;

        const valorAtualizado =
            name === "usuario" ? normalizarEmail(value) : value;

        setUsuario((estadoAtual) => ({
            ...estadoAtual,
            [name]: valorAtualizado,
        }));
    }

    async function cadastrarNovoUsuario(e: SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();

        if (usuario.senha.length < 6) {
            ToastAlerta("A senha precisa ter pelo menos 6 caracteres.", "erro");
            return;
        }

        if (confirmarSenha !== usuario.senha) {
            ToastAlerta("As senhas não conferem.", "erro");
            setUsuario((estadoAtual) => ({
                ...estadoAtual,
                senha: "",
            }));
            setConfirmarSenha("");
            return;
        }

        const usuarioNormalizado: Usuario = {
            ...usuario,
            nome: usuario.nome.trim(),
            usuario: normalizarEmail(usuario.usuario),
            cargo: usuario.cargo.trim(),
        };

        setIsLoading(true);

        try {
            await cadastrarUsuario(
                "/usuarios/cadastrar",
                usuarioNormalizado,
                setUsuario,
            );

            ToastAlerta("Usuário cadastrado com sucesso!", "sucesso");
            navigate("/");
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 400) {
                    ToastAlerta(
                        "Não foi possível cadastrar. Verifique os dados ou se o e-mail já está cadastrado.",
                        "erro",
                    );
                } else {
                    ToastAlerta(
                        `Erro ao cadastrar o usuário (${error.response?.status ?? "sem resposta"}).`,
                        "erro",
                    );
                }
            } else {
                ToastAlerta("Não foi possível conectar com a API.", "erro");
            }
        } finally {
            setIsLoading(false);
        }
    }

    function retornarParaLogin() {
        navigate("/");
    }

    return (
        <div className="grid min-h-screen grid-cols-1 bg-[#EDF5FF] lg:grid-cols-2">
            <div className="relative hidden overflow-hidden bg-gradient-to-br from-[#1689F5] via-[#2563EB] to-[#6D28D9] lg:flex lg:items-center lg:justify-center">
                <div className="absolute inset-0 bg-black/10" />

                <img
                    src={hero}
                    alt="Seguro viagem ConectaTravel"
                    className="relative z-10 max-h-[80vh] w-full object-contain p-12"
                />
            </div>

            <div className="flex items-center justify-center px-4 py-10 sm:px-8">
                <form
                    className="flex w-full max-w-xl flex-col gap-4 rounded-3xl border border-white/80 bg-white/70 p-6 shadow-[0_24px_60px_rgba(37,99,235,0.18)] backdrop-blur-xl sm:p-8"
                    onSubmit={cadastrarNovoUsuario}
                >
                    <div className="mb-2 text-center">
                        <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-[#2563EB]">
                            ConectaTravel
                        </p>

                        <h1 className="text-4xl font-bold tracking-tight text-[#172B4D]">
                            Criar conta
                        </h1>

                        <p className="mt-3 text-[#526581]">
                            Cadastre-se para acessar o sistema.
                        </p>
                    </div>

                    <div>
                        <label
                            className="mb-2 block text-sm font-semibold text-[#172B4D]"
                            htmlFor="nome"
                        >
                            Nome
                        </label>

                        <input
                            type="text"
                            id="nome"
                            name="nome"
                            placeholder="Digite seu nome"
                            className="w-full rounded-xl border border-[#CFE1F5] bg-white px-4 py-3 text-[#172B4D] outline-none transition focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/10"
                            value={usuario.nome}
                            onChange={atualizarEstado}
                            autoComplete="name"
                            required
                        />
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
                            value={usuario.usuario}
                            onChange={atualizarEstado}
                            autoComplete="email"
                            required
                        />
                    </div>

                    <div>
                        <label
                            className="mb-2 block text-sm font-semibold text-[#172B4D]"
                            htmlFor="cargo"
                        >
                            Cargo
                        </label>

                        <input
                            type="text"
                            id="cargo"
                            name="cargo"
                            placeholder="Ex.: Corretor"
                            className="w-full rounded-xl border border-[#CFE1F5] bg-white px-4 py-3 text-[#172B4D] outline-none transition focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/10"
                            value={usuario.cargo}
                            onChange={atualizarEstado}
                            minLength={3}
                            maxLength={20}
                            autoComplete="organization-title"
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
                            placeholder="Mínimo de 6 caracteres"
                            className="w-full rounded-xl border border-[#CFE1F5] bg-white px-4 py-3 text-[#172B4D] outline-none transition focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/10"
                            value={usuario.senha}
                            onChange={atualizarEstado}
                            minLength={6}
                            autoComplete="new-password"
                            required
                        />
                    </div>

                    <div>
                        <label
                            className="mb-2 block text-sm font-semibold text-[#172B4D]"
                            htmlFor="confirmarSenha"
                        >
                            Confirmar senha
                        </label>

                        <input
                            type="password"
                            id="confirmarSenha"
                            name="confirmarSenha"
                            placeholder="Digite novamente sua senha"
                            className="w-full rounded-xl border border-[#CFE1F5] bg-white px-4 py-3 text-[#172B4D] outline-none transition focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/10"
                            value={confirmarSenha}
                            onChange={(e) => setConfirmarSenha(e.target.value)}
                            minLength={6}
                            autoComplete="new-password"
                            required
                        />
                    </div>

                    <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row">
                        <button
                            type="button"
                            className="min-h-12 w-full rounded-xl border border-[#CFE1F5] bg-white px-5 py-3 font-semibold text-[#172B4D] transition hover:bg-[#EDF5FF]"
                            onClick={retornarParaLogin}
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            className="flex min-h-12 w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#1689F5] via-[#2563EB] to-[#6D28D9] px-5 py-3 font-semibold text-white shadow-lg transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <ClipLoader color="#ffffff" size={22} />
                            ) : (
                                "Cadastrar"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Cadastro;
