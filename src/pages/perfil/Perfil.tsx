import { useContext } from 'react'
import { Link } from 'react-router-dom'
import {
  EnvelopeSimpleIcon,
  IdentificationCardIcon,
  PencilSimpleIcon
} from '@phosphor-icons/react'
import { AuthContext } from '../../contexts/AuthContext'
import { obterIniciais } from '../../utils/obterIniciais'

function Perfil() {
  const { usuario } = useContext(AuthContext)

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#EDF5FF] px-4 pb-12 pt-24 sm:px-6 sm:pt-28">
      <div className="pointer-events-none absolute -left-32 -top-40 h-96 w-96 rounded-full bg-[#1689F5]/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-32 h-96 w-96 rounded-full bg-[#7C3AED]/25 blur-3xl" />

      <section className="relative mx-auto flex w-full max-w-2xl flex-col items-center">
        <header className="mb-8 text-center">
          <div className="mb-3 flex items-center justify-center gap-3">
            <div className="h-9 w-1 rounded-full bg-gradient-to-b from-[#1689F5] to-[#7C3AED]" />
            <h1 className="bg-gradient-to-r from-[#126CC5] via-[#2563EB] to-[#6D28D9] bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-4xl">
              Meu perfil
            </h1>
          </div>

          <p className="text-sm leading-6 text-[#526581] md:text-base">
            Veja e gerencie os seus dados de acesso ao ConectaTravel.
          </p>
        </header>

        <article className="relative w-full overflow-hidden rounded-2xl border border-white/70 bg-white/55 p-6 text-center shadow-[0_20px_60px_rgba(37,99,235,0.16)] backdrop-blur-xl sm:p-8">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#1689F5] via-[#2563EB] to-[#7C3AED]" />

          <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-[#60A5FA]/20 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-12 -left-10 h-24 w-24 rounded-full bg-[#A78BFA]/20 blur-2xl" />

          <div className="relative z-10 mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-[#1689F5] via-[#2563EB] to-[#7C3AED] text-3xl font-bold text-white shadow-lg">
            {obterIniciais(usuario.nome)}
          </div>

          <h2 className="relative z-10 mt-5 text-xl font-bold text-[#172B4D]">
            {usuario.nome}
          </h2>

          <div className="relative z-10 mx-auto mt-4 flex max-w-sm flex-col gap-2 text-left">
            <div className="flex items-center gap-2 rounded-xl border border-white/80 bg-white/60 px-4 py-3 text-sm text-[#30476A]">
              <EnvelopeSimpleIcon size={18} weight="bold" className="text-[#1689F5]" />
              {usuario.usuario}
            </div>

            {usuario.cargo && (
              <div className="flex items-center gap-2 rounded-xl border border-white/80 bg-white/60 px-4 py-3 text-sm text-[#30476A]">
                <IdentificationCardIcon size={18} weight="bold" className="text-[#1689F5]" />
                {usuario.cargo}
              </div>
            )}
          </div>

          <Link
            to="/perfil/editar"
            className="relative z-10 mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#1689F5] via-[#2563EB] to-[#6D28D9] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(37,99,235,0.28)] transition-all hover:-translate-y-0.5 hover:brightness-110"
          >
            <PencilSimpleIcon size={18} weight="bold" />
            Editar perfil
          </Link>
        </article>
      </section>
    </main>
  )
}

export default Perfil
