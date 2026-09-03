import { Link } from 'react-router-dom'
import { useState } from 'react'
import { BookOpenIcon, InfoIcon, ListIcon, XIcon } from '@phosphor-icons/react'

function Navbar() {
  const [menuAberto, setMenuAberto] = useState(false)

  function fecharMenu() {
    setMenuAberto(false)
  }

  return (
    <header className="fixed left-0 top-0 z-50 w-full overflow-hidden border-b border-white/70 bg-[#DDEEFF]/65 shadow-[0_10px_35px_rgba(21,93,173,0.16)] backdrop-blur-2xl">
      <div className="pointer-events-none absolute -left-20 -top-20 h-36 w-36 rounded-full bg-[#1689F5]/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 -top-20 h-36 w-36 rounded-full bg-[#7C3AED]/25 blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#1689F5]/70 to-[#7C3AED]/60" />

      <nav className="relative mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 md:px-12 md:py-4">
        <Link
          to="/"
          onClick={fecharMenu}
          className="group flex min-w-0 items-center gap-2 transition-transform active:scale-95 sm:gap-3"
          aria-label="Ir para a página inicial"
        >
          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/80 bg-white/60 shadow-md backdrop-blur-md transition-all group-hover:scale-105 group-hover:shadow-[0_8px_20px_rgba(37,99,235,0.24)] sm:h-11 sm:w-11">
            <div className="absolute inset-0 bg-gradient-to-br from-[#1689F5]/25 via-[#2563EB]/10 to-[#7C3AED]/25" />
            <div className="relative h-7 w-7 sm:h-8 sm:w-8 bg-gradient-to-r from-[#1689F5] to-[#7C3AED] rounded" />
          </div>
          <div className="min-w-0">
            <p className="bg-gradient-to-r from-[#1689F5] via-[#2563EB] to-[#7C3AED] bg-clip-text text-lg font-black tracking-tight text-transparent sm:text-xl">
              ConectaTravel
            </p>
            <p className="hidden truncate text-[11px] font-medium text-[#526581] sm:block">
              Seguro viagem conectado a você
            </p>
          </div>
        </Link>

        <div
          className="hidden items-center gap-1 rounded-2xl border border-white/70 bg-white/35 p-1 text-sm font-semibold text-[#274A73] shadow-sm backdrop-blur-md xl:flex"
          aria-label="Navegação principal"
        >
          <Link to="/" className="rounded-xl px-3 py-2 transition-all hover:bg-white/65 hover:text-[#2563EB]">
            Início
          </Link>
          <Link to="/clientes" className="rounded-xl px-3 py-2 transition-all hover:bg-white/65 hover:text-[#2563EB]">
            Clientes
          </Link>
          <Link to="/apolices" className="rounded-xl px-3 py-2 transition-all hover:bg-white/65 hover:text-[#2563EB]">
            Apólices
          </Link>
          <Link to="/introducao" className="flex items-center gap-1 rounded-xl px-3 py-2 transition-all hover:bg-white/65 hover:text-[#2563EB]">
            <BookOpenIcon size={17} weight="bold" />
            Introdução
          </Link>
          <Link to="/sobre" className="flex items-center gap-1 rounded-xl px-3 py-2 transition-all hover:bg-white/65 hover:text-[#2563EB]">
            <InfoIcon size={17} weight="bold" />
            Sobre
          </Link>
        </div>

        <button
          type="button"
          className="rounded-xl border border-white/80 bg-white/45 p-2 text-[#172B4D] shadow-md backdrop-blur-md transition-all hover:scale-105 hover:border-[#1689F5]/35 hover:bg-white/75 active:scale-95 xl:hidden"
          aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuAberto}
          onClick={() => setMenuAberto((aberto) => !aberto)}
        >
          {menuAberto ? (
            <XIcon size={25} weight="bold" className="text-[#2563EB]" />
          ) : (
            <ListIcon size={25} weight="bold" />
          )}
        </button>
      </nav>

      {menuAberto && (
        <nav
          className="relative flex max-h-[calc(100vh-76px)] flex-col gap-2 overflow-y-auto border-t border-white/70 bg-[#EAF4FF]/90 px-4 py-4 text-base font-semibold text-[#172B4D] shadow-xl backdrop-blur-2xl sm:px-6 xl:hidden"
          aria-label="Navegação mobile"
        >
          <Link to="/" onClick={fecharMenu} className="rounded-xl px-4 py-3 transition-all hover:bg-white/75 hover:text-[#2563EB]">
            Início
          </Link>
          <Link to="/clientes" onClick={fecharMenu} className="rounded-xl px-4 py-3 transition-all hover:bg-white/75 hover:text-[#2563EB]">
            Clientes
          </Link>
          <Link to="/clientes/cadastrar" onClick={fecharMenu} className="rounded-xl px-4 py-3 transition-all hover:bg-white/75 hover:text-[#2563EB]">
            Cadastrar cliente
          </Link>
          <Link to="/apolices" onClick={fecharMenu} className="rounded-xl px-4 py-3 transition-all hover:bg-white/75 hover:text-[#2563EB]">
            Apólices
          </Link>
          <Link to="/introducao" onClick={fecharMenu} className="flex items-center gap-2 rounded-xl px-4 py-3 transition-all hover:bg-white/75 hover:text-[#2563EB]">
            <BookOpenIcon size={20} weight="bold" />
            Introdução
          </Link>
          <Link to="/sobre" onClick={fecharMenu} className="flex items-center gap-2 rounded-xl px-4 py-3 transition-all hover:bg-white/75 hover:text-[#2563EB]">
            <InfoIcon size={20} weight="bold" />
            Sobre o projeto
          </Link>
        </nav>
      )}
    </header>
  )
}

export default Navbar