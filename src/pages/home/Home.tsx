import { Link } from 'react-router-dom'

function Home() {
  return (
    <section className="relative isolate flex min-h-full w-full flex-1 overflow-hidden bg-[#EDF5FF] px-4 pb-16 pt-24 md:px-8 md:pb-20 md:pt-28">
      <div className="pointer-events-none absolute -left-40 -top-28 h-96 w-96 rounded-full bg-[#1689F5]/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-32 h-96 w-96 rounded-full bg-[#7C3AED]/20 blur-3xl" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#38BDF8]/10 blur-3xl" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center">
        <section className="relative flex flex-col items-center justify-between gap-8 overflow-hidden rounded-2xl border border-white/70 bg-white/55 p-6 shadow-[0_20px_60px_rgba(37,99,235,0.14)] backdrop-blur-xl md:flex-row md:p-12">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#1689F5] via-[#2563EB] to-[#7C3AED]" />
          <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-[#60A5FA]/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 left-1/3 h-44 w-44 rounded-full bg-[#A78BFA]/15 blur-3xl" />

          <div className="relative z-10 flex flex-1 flex-col gap-4">
            <span className="w-fit rounded-full border border-[#2563EB]/15 bg-[#EAF2FF]/70 px-3 py-1 text-xs font-semibold text-[#245CB2] backdrop-blur-sm">
              Gestão de seguro viagem
            </span>

            <h1 className="max-w-3xl bg-gradient-to-r from-[#126CC5] via-[#2563EB] to-[#6D28D9] bg-clip-text text-3xl font-bold text-transparent md:text-5xl">
              Bem-vinde à ConectaTravel
            </h1>

            <p className="max-w-xl text-base leading-7 text-[#526581]">
              Gerencie clientes, oportunidades e apólices de seguro viagem em um único lugar,
              com mais organização e agilidade.
            </p>

            <div className="mt-2 flex flex-wrap gap-3">
              <Link
                to="/sobre"
                className="cursor-pointer rounded-lg bg-gradient-to-r from-[#1689F5] via-[#2563EB] to-[#6D28D9] px-6 py-3 text-base font-medium text-white shadow-[0_8px_20px_rgba(37,99,235,0.28)] transition-all hover:-translate-y-0.5 hover:brightness-110"
              >
                Sobre nós
              </Link>

              <Link
                to="/introducao"
                className="cursor-pointer rounded-lg border border-white/80 bg-white/50 px-6 py-3 text-base font-medium text-[#245CB2] shadow-sm backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-[#2563EB]/25 hover:bg-[#EAF2FF]/80"
              >
                Introdução
              </Link>
            </div>
          </div>

          <div className="relative z-10 h-64 w-full flex-1 overflow-hidden rounded-xl border border-white/80 bg-white/30 shadow-lg backdrop-blur-sm md:h-80">
            <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-tr from-[#2563EB]/15 via-transparent to-[#7C3AED]/15" />
            <img
              className="h-full w-full object-contain object-center"
              alt="Painel do ConectaTravel mostrando gestão de clientes e apólices de seguro viagem"
              src="https://ik.imagekit.io/vpgms/VidaConecta/ConectaLife/ConectaLife-home.png"
            />
          </div>
        </section>
      </div>
    </section>
  )
}

export default Home