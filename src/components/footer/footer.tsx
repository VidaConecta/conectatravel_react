import { AirplaneTiltIcon, EnvelopeSimpleIcon, UsersIcon } from '@phosphor-icons/react'

function Footer() {
  const anoAtual = new Date().getFullYear()

  return (
    <footer className="relative mt-auto w-full overflow-hidden border-t border-[#4B8ED7]/35 bg-[#102A4C] text-[#D8E9FF]">
      <div className="pointer-events-none absolute -left-24 -top-24 h-56 w-56 rounded-full bg-[#1689F5]/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-56 w-56 rounded-full bg-[#7C3AED]/20 blur-3xl" />
      <div className="absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#48A9FF] to-[#A78BFA]" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 py-6 sm:grid-cols-2 md:grid-cols-3 md:px-12 md:py-7">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <AirplaneTiltIcon size={22} weight="fill" className="text-[#74C2FF]" />
            <p className="text-lg font-black tracking-tight">
              <span className="bg-gradient-to-r from-[#74C2FF] via-[#48A9FF] to-[#B69CFF] bg-clip-text text-transparent">
                Conecta
              </span>
              <span className="text-white">Travel</span>
            </p>
          </div>
          <p className="max-w-xs text-xs leading-relaxed text-[#BAD2EF]">
            Seguro viagem para estudantes de tecnologia e nômades digitais em qualquer lugar do mundo.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <p className="flex items-center gap-2 text-sm font-semibold text-[#D8E9FF]">
            <UsersIcon size={17} className="text-[#74C2FF]" />
            Nosso propósito
          </p>
          <p className="max-w-xs text-xs leading-relaxed text-[#BAD2EF]">
            Levar segurança e tranquilidade para cada viagem, em qualquer destino do mundo.
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:items-start md:items-end">
          <a
          
            href="mailto:java85.grupo4@gmail.com"
            className="flex w-fit items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-xs text-[#E9F3FF] shadow-lg backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-[#74C2FF]/60 hover:bg-white/20"
          >
            <EnvelopeSimpleIcon size={16} className="text-[#74C2FF]" />
            java85.grupo4@gmail.com
          </a>
          <p className="text-[11px] text-[#8EACD1]">
            © {anoAtual}{' '}
            <span className="font-medium text-[#D8E9FF]">
              ConectaTravel
            </span>
            . Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer