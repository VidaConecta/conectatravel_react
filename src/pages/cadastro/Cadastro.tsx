import { useEffect, useState, type ChangeEvent, type SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ClipLoader } from "react-spinners";

import MalaViajante from "../../components/malaViajante/MalaViajante";
import type Usuario from "../../models/Usuario";
import { cadastrarUsuario } from "../../services/Service";
import { normalizarEmail } from "../../utils/normalizarEmail";
import { ToastAlerta } from "../../utils/ToastAlerta";

const hero = "https://ik.imagekit.io/lojagames/Seguro%20Viagem/Inicio.png";

function Cadastro() {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [olhosFechados, setOlhosFechados] = useState(false);
    const [temErro, setTemErro] = useState(false);

    const [usuario, setUsuario] = useState<Usuario>({
        id: 0,
        nome: "",
        usuario: "",
        senha: "",
        cargo: "",
    });

    useEffect(() => {
        if (!temErro) return;

        const timer = setTimeout(() => setTemErro(false), 3000);
        return () => clearTimeout(timer);
    }, [temErro]);

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
            setTemErro(true);
            return;
        }

        if (confirmarSenha !== usuario.senha) {
            ToastAlerta("As senhas não conferem.", "erro");
            setTemErro(true);
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
            setTemErro(true);

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
        <div className="relative min-h-screen overflow-hidden">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${hero})` }}
            />

            <div className="absolute inset-0 bg-gradient-to-r from-[#1689F5]/30 via-transparent to-white/10" />

            <div className="relative z-10 flex min-h-screen flex-col items-center justify-center gap-10 px-4 py-10 sm:px-8 lg:flex-row lg:gap-6 lg:px-16">
                <div className="hidden h-full lg:flex lg:w-1/2 lg:flex-col lg:items-center lg:justify-center lg:gap-6">
                    <MalaViajante olhosFechados={olhosFechados} triste={temErro} />

                    <div className="rounded-2xl bg-[#172B4D]/45 px-6 py-3 text-center backdrop-blur-sm">
                        <p className="text-lg font-semibold text-white">
                            ConectaTravel
                        </p>
                        <p className="mt-1 text-sm text-[#DDEEFF]">
                            Sua jornada de proteção começa aqui
                        </p>
                    </div>
                </div>

                <form
                    className="flex w-full max-w-xl flex-col gap-4 rounded-3xl border border-white/60 bg-white/40 p-6 shadow-[0_24px_60px_rgba(23,43,77,0.25)] backdrop-blur-md sm:p-8"
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
                            className="w-full rounded-xl border border-white/70 bg-white/70 px-4 py-3 text-[#172B4D] placeholder-[#8AA0BC] outline-none transition focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/10"
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
                            className="w-full rounded-xl border border-white/70 bg-white/70 px-4 py-3 text-[#172B4D] placeholder-[#8AA0BC] outline-none transition focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/10"
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
                            className="w-full rounded-xl border border-white/70 bg-white/70 px-4 py-3 text-[#172B4D] placeholder-[#8AA0BC] outline-none transition focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/10"
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
                            className="w-full rounded-xl border border-white/70 bg-white/70 px-4 py-3 text-[#172B4D] placeholder-[#8AA0BC] outline-none transition focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/10"
                            value={usuario.senha}
                            onChange={atualizarEstado}
                            onFocus={() => setOlhosFechados(true)}
                            onBlur={() => setOlhosFechados(false)}
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
                            className="w-full rounded-xl border border-white/70 bg-white/70 px-4 py-3 text-[#172B4D] placeholder-[#8AA0BC] outline-none transition focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/10"
                            value={confirmarSenha}
                            onChange={(e) => setConfirmarSenha(e.target.value)}
                            onFocus={() => setOlhosFechados(true)}
                            onBlur={() => setOlhosFechados(false)}
                            minLength={6}
                            autoComplete="new-password"
                            required
                        />
                    </div>

                    <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row">
                        <button
                            type="button"
                            className="min-h-12 w-full rounded-xl border border-white/70 bg-white/70 px-5 py-3 font-semibold text-[#172B4D] transition hover:bg-white"
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