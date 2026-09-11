import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ClipLoader } from 'react-spinners'
import {
  EnvelopeSimpleIcon,
  IdentificationCardIcon,
  LockKeyIcon,
  UserIcon
} from '@phosphor-icons/react'
import { AuthContext } from '../../contexts/AuthContext'
import type Usuario from '../../models/Usuario'
import { usuarioService } from '../../services/UsuarioService'
import { normalizarEmail } from '../../utils/normalizarEmail'
import { ToastAlerta } from '../../utils/ToastAlerta'

function AtualizarPerfil() {
  const navigate = useNavigate()
  const { usuario: usuarioLogado, handleLogout } = useContext(AuthContext)

  const [usuario, setUsuario] = useState<Usuario>({
    nome: '',
    usuario: '',
    senha: '',
    cargo: ''
  })
  const [confirmarSenha, setConfirmarSenha] = useState('')
  const [carregando, setCarregando] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function buscarUsuario() {
      try {
        const dados = await usuarioService.buscarPorId(usuarioLogado.id)
        setUsuario({ ...dados, senha: '' })
      } catch {
        ToastAlerta('Não foi possível carregar os seus dados.', 'erro')
        navigate('/perfil')
      } finally {
        setCarregando(false)
      }
    }

    buscarUsuario()
  }, [usuarioLogado.id, navigate])

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    const valorAtualizado = name === 'usuario' ? normalizarEmail(value) : value

    setUsuario((estadoAtual) => ({
      ...estadoAtual,
      [name]: valorAtualizado
    }))
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (usuario.senha.length < 6) {
      ToastAlerta('A senha precisa ter pelo menos 6 caracteres.', 'erro')
      return
    }

    if (confirmarSenha !== usuario.senha) {
      ToastAlerta('As senhas não conferem.', 'erro')
      return
    }

    setIsLoading(true)

    try {
      await usuarioService.atualizar({
        ...usuario,
        id: usuarioLogado.id,
        nome: usuario.nome.trim(),
        usuario: normalizarEmail(usuario.usuario),
        cargo: usuario.cargo.trim()
      })

      ToastAlerta('Perfil atualizado com sucesso! Faça login novamente.', 'sucesso')
      handleLogout()
      navigate('/')
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        ToastAlerta('Não foi possível atualizar. Verifique os dados informados.', 'erro')
      } else {
        ToastAlerta('Erro ao atualizar o perfil.', 'erro')
      }
    } finally {
      setIsLoading(false)
    }
  }

  if (carregando) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#EDF5FF] px-4 pt-24">
        <div className="rounded-2xl border border-white/70 bg-white/55 px-8 py-6 text-center text-[#526581] shadow-[0_20px_60px_rgba(37,99,235,0.14)] backdrop-blur-xl">
          Carregando seus dados...
        </div>
      </main>
    )
  }

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#EDF5FF] px-4 pb-12 pt-24 sm:px-6 sm:pt-28">
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#1689F5]/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-36 -right-32 h-96 w-96 rounded-full bg-[#7C3AED]/20 blur-3xl" />

      <section className="relative z-10 mx-auto w-full max-w-xl">
        <header className="mb-8 text-center">
          <div className="mb-3 flex items-center justify-center gap-3">
            <div className="h-9 w-1 rounded-full bg-gradient-to-b from-[#1689F5] to-[#7C3AED]" />
            <h1 className="bg-gradient-to-r from-[#126CC5] via-[#2563EB] to-[#6D28D9] bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-4xl">
              Editar perfil
            </h1>
          </div>

          <p className="mx-auto max-w-md text-sm leading-6 text-[#526581]">
            Atualize seus dados de acesso. Por segurança, é necessário
            informar uma senha para confirmar as alterações.
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="relative overflow-hidden rounded-2xl border border-white/70 bg-white/55 p-6 shadow-[0_20px_60px_rgba(37,99,235,0.14)] backdrop-blur-xl sm:p-8"
        >
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#1689F5] via-[#2563EB] to-[#6D28D9]" />

          <div className="relative z-10 flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="nome"
                className="flex items-center gap-2 text-sm font-semibold text-[#30476A]"
              >
                <UserIcon size={18} weight="bold" className="text-[#1689F5]" />
                Nome completo
              </label>

              <input
                type="text"
                name="nome"
                id="nome"
                value={usuario.nome}
                onChange={atualizarEstado}
                className="w-full rounded-xl border border-white/80 bg-white/65 px-4 py-3 text-base text-[#172B4D] outline-none shadow-sm transition-all focus:border-[#1689F5]/50 focus:bg-white focus:ring-4 focus:ring-[#1689F5]/10"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="usuario"
                className="flex items-center gap-2 text-sm font-semibold text-[#30476A]"
              >
                <EnvelopeSimpleIcon size={18} weight="bold" className="text-[#1689F5]" />
                E-mail
              </label>

              <input
                type="email"
                name="usuario"
                id="usuario"
                value={usuario.usuario}
                onChange={atualizarEstado}
                className="w-full rounded-xl border border-white/80 bg-white/65 px-4 py-3 text-base text-[#172B4D] outline-none shadow-sm transition-all focus:border-[#1689F5]/50 focus:bg-white focus:ring-4 focus:ring-[#1689F5]/10"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="cargo"
                className="flex items-center gap-2 text-sm font-semibold text-[#30476A]"
              >
                <IdentificationCardIcon size={18} weight="bold" className="text-[#1689F5]" />
                Cargo
              </label>

              <input
                type="text"
                name="cargo"
                id="cargo"
                value={usuario.cargo}
                onChange={atualizarEstado}
                minLength={3}
                maxLength={20}
                className="w-full rounded-xl border border-white/80 bg-white/65 px-4 py-3 text-base text-[#172B4D] outline-none shadow-sm transition-all focus:border-[#1689F5]/50 focus:bg-white focus:ring-4 focus:ring-[#1689F5]/10"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="senha"
                className="flex items-center gap-2 text-sm font-semibold text-[#30476A]"
              >
                <LockKeyIcon size={18} weight="bold" className="text-[#1689F5]" />
                Nova senha
              </label>

              <input
                type="password"
                name="senha"
                id="senha"
                placeholder="Mínimo de 6 caracteres"
                value={usuario.senha}
                onChange={atualizarEstado}
                minLength={6}
                autoComplete="new-password"
                className="w-full rounded-xl border border-white/80 bg-white/65 px-4 py-3 text-base text-[#172B4D] outline-none shadow-sm transition-all placeholder:text-[#8AA0BD] focus:border-[#1689F5]/50 focus:bg-white focus:ring-4 focus:ring-[#1689F5]/10"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="confirmarSenha"
                className="flex items-center gap-2 text-sm font-semibold text-[#30476A]"
              >
                <LockKeyIcon size={18} weight="bold" className="text-[#1689F5]" />
                Confirmar nova senha
              </label>

              <input
                type="password"
                name="confirmarSenha"
                id="confirmarSenha"
                placeholder="Digite novamente a nova senha"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                minLength={6}
                autoComplete="new-password"
                className="w-full rounded-xl border border-white/80 bg-white/65 px-4 py-3 text-base text-[#172B4D] outline-none shadow-sm transition-all placeholder:text-[#8AA0BD] focus:border-[#1689F5]/50 focus:bg-white focus:ring-4 focus:ring-[#1689F5]/10"
                required
              />
            </div>

            <div className="mt-2 flex flex-col-reverse gap-3 border-t border-white/70 pt-5 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => navigate('/perfil')}
                disabled={isLoading}
                className="w-full rounded-xl border border-white/80 bg-white/60 px-6 py-3 text-base font-semibold text-[#526581] shadow-sm transition-all hover:-translate-y-0.5 hover:bg-white hover:text-[#172B4D] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                Cancelar
              </button>

              <button
                type="submit"
                disabled={isLoading}
                className="flex min-w-40 items-center justify-center rounded-xl bg-gradient-to-r from-[#1689F5] via-[#2563EB] to-[#6D28D9] px-6 py-3 text-base font-semibold text-white shadow-[0_8px_20px_rgba(37,99,235,0.28)] transition-all hover:-translate-y-0.5 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? (
                  <ClipLoader color="#ffffff" size={22} />
                ) : (
                  <span>Salvar alterações</span>
                )}
              </button>
            </div>
          </div>
        </form>
      </section>
    </main>
  )
}

export default AtualizarPerfil
