import { Link } from 'react-router-dom'
import { AirplaneTiltIcon, MagnifyingGlassIcon, UserPlusIcon } from '@phosphor-icons/react'

function Introducao() {
  return (
    <>
      <style>{`
        @keyframes voarRota {
          0% { left: 0%; opacity: 0; }
          8% { opacity: 1; }
          92% { opacity: 1; }
          100% { left: calc(100% - 20px); opacity: 0; }
        }
      `}</style>

      <main className="relative min-h-screen w-full overflow-hidden bg-[#EDF5FF] px-4 pb-12 pt-24 sm:px-6 sm:pt-28 md:px-8 md:pb-16">
        <div className="pointer-events-none absolute -left-40 -top-28 h-96 w-96 rounded-full bg-[#1689F5]/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -right-32 h-96 w-96 rounded-full bg-[#7C3AED]/20 blur-3xl" />

        <section className="relative z-10 mx-auto w-full max-w-6xl">
          <div className="relative overflow-hidden rounded-2xl border border-white/70 bg-white/55 p-8 shadow-[0_20px_60px_rgba(37,99,235,0.14)] backdrop-blur-xl md:p-12">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#1689F5] via-[#2563EB] to-[#7C3AED]" />
            <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-[#60A5FA]/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 left-1/3 h-44 w-44 rounded-full bg-[#A78BFA]/15 blur-3xl" />

            <div className="relative z-10">
              <p className="mb-3 flex items-center gap-2 text-sm font-semibold tracking-widest uppercase text-[#1689F5]">
                <AirplaneTiltIcon size={16} weight="fill" />
                ConectaTravel
              </p>

              <h1 className="max-w-3xl bg-gradient-to-r from-[#126CC5] via-[#2563EB] to-[#6D28D9] bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
                Sua jornada de proteção começa aqui
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-relaxed text-[#526581] md:text-lg">
                Gerencie clientes e apólices de seguro viagem de maneira simples, centralizada e
                segura. Siga o roteiro de embarque abaixo.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/clientes/cadastrar"
                  className="rounded-lg bg-gradient-to-r from-[#1689F5] via-[#2563EB] to-[#6D28D9] px-6 py-3 text-center font-medium text-white shadow-[0_8px_20px_rgba(37,99,235,0.28)] transition-all hover:-translate-y-0.5 hover:brightness-110"
                >
                  Cadastrar cliente
                </Link>

                <Link
                  to="/cadastrarapolice"
                  className="rounded-lg border border-white/80 bg-white/50 px-6 py-3 text-center font-medium text-[#245CB2] shadow-sm backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-[#2563EB]/25 hover:bg-[#EAF2FF]/80"
                >
                  Cadastrar apólice
                </Link>
              </div>
            </div>
          </div>

          <div className="relative mt-10 hidden items-center px-6 md:flex">
            <span className="z-10 h-3 w-3 shrink-0 rounded-full bg-[#1689F5] shadow-[0_0_0_4px_rgba(22,137,245,0.18)]" />
            <div className="relative mx-2 h-px flex-1 border-t-2 border-dashed border-[#8EACD1]">
              <AirplaneTiltIcon
                size={20}
                weight="fill"
                className="absolute top-1/2 -translate-y-1/2 rotate-45 text-[#2563EB] [animation:voarRota_16s_linear_infinite]"
              />
            </div>
            <span className="z-10 h-3 w-3 shrink-0 rounded-full bg-[#7C3AED] shadow-[0_0_0_4px_rgba(124,58,237,0.18)]" />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 md:mt-4 md:grid-cols-3">
            <article className="relative flex overflow-hidden rounded-2xl border border-white/70 bg-white/55 shadow-[0_18px_50px_rgba(37,99,235,0.12)] backdrop-blur-xl transition-all hover:-translate-y-1 hover:shadow-[0_22px_60px_rgba(37,99,235,0.20)]">
              <div className="flex w-16 shrink-0 items-center justify-center bg-gradient-to-b from-[#1689F5] to-[#2563EB] py-4 text-white">
                <span className="text-2xl font-black">1</span>
              </div>
              <div className="relative flex-1 border-l border-dashed border-[#B9D3F0] p-6">
                <span className="absolute -left-[7px] -top-3 h-4 w-4 rounded-full bg-[#EDF5FF]" />
                <span className="absolute -left-[7px] -bottom-3 h-4 w-4 rounded-full bg-[#EDF5FF]" />
                <UserPlusIcon size={24} weight="bold" className="mb-3 text-[#1689F5]" />
                <h2 className="mb-2 text-xl font-bold text-[#172B4D]">Cadastre o cliente</h2>
                <p className="leading-relaxed text-[#526581]">
                  Registre os dados necessários para manter sua base de clientes
                  completa, atualizada e organizada.
                </p>
              </div>
            </article>

            <article className="relative flex overflow-hidden rounded-2xl border border-white/70 bg-white/55 shadow-[0_18px_50px_rgba(37,99,235,0.12)] backdrop-blur-xl transition-all hover:-translate-y-1 hover:shadow-[0_22px_60px_rgba(37,99,235,0.20)]">
              <div className="flex w-16 shrink-0 items-center justify-center bg-gradient-to-b from-[#2563EB] to-[#7C3AED] py-4 text-white">
                <span className="text-2xl font-black">2</span>
              </div>
              <div className="relative flex-1 border-l border-dashed border-[#B9D3F0] p-6">
                <span className="absolute -left-[7px] -top-3 h-4 w-4 rounded-full bg-[#EDF5FF]" />
                <span className="absolute -left-[7px] -bottom-3 h-4 w-4 rounded-full bg-[#EDF5FF]" />
                <AirplaneTiltIcon size={24} weight="bold" className="mb-3 rotate-45 text-[#2563EB]" />
                <h2 className="mb-2 text-xl font-bold text-[#172B4D]">Registre a apólice</h2>
                <p className="leading-relaxed text-[#526581]">
                  Vincule uma apólice de seguro viagem ao cliente e registre as
                  principais informações sobre a proteção contratada.
                </p>
              </div>
            </article>

            <article className="relative flex overflow-hidden rounded-2xl border border-white/70 bg-white/55 shadow-[0_18px_50px_rgba(37,99,235,0.12)] backdrop-blur-xl transition-all hover:-translate-y-1 hover:shadow-[0_22px_60px_rgba(37,99,235,0.20)]">
              <div className="flex w-16 shrink-0 items-center justify-center bg-gradient-to-b from-[#7C3AED] to-[#1689F5] py-4 text-white">
                <span className="text-2xl font-black">3</span>
              </div>
              <div className="relative flex-1 border-l border-dashed border-[#B9D3F0] p-6">
                <span className="absolute -left-[7px] -top-3 h-4 w-4 rounded-full bg-[#EDF5FF]" />
                <span className="absolute -left-[7px] -bottom-3 h-4 w-4 rounded-full bg-[#EDF5FF]" />
                <MagnifyingGlassIcon size={24} weight="bold" className="mb-3 text-[#7C3AED]" />
                <h2 className="mb-2 text-xl font-bold text-[#172B4D]">Acompanhe os registros</h2>
                <p className="leading-relaxed text-[#526581]">
                  Consulte e atualize clientes e apólices sempre que necessário,
                  mantendo todas as informações centralizadas.
                </p>
              </div>
            </article>
          </div>

          <section className="relative mt-10 overflow-hidden rounded-2xl border border-white/70 bg-gradient-to-r from-[#102A4C] via-[#15355F] to-[#1B2B57] p-8 shadow-[0_20px_60px_rgba(16,42,76,0.35)] md:p-10">
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#1689F5]/25 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 left-10 h-40 w-40 rounded-full bg-[#7C3AED]/25 blur-3xl" />
            <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#74C2FF]">
                  <AirplaneTiltIcon size={16} weight="fill" />
                  Embarque liberado
                </p>
                <h2 className="text-2xl font-bold text-white">
                  Comece a utilizar a plataforma
                </h2>
                <p className="mt-3 max-w-xl leading-relaxed text-[#BAD2EF]">
                  O primeiro passo é cadastrar o cliente. Depois, registre as
                  apólices relacionadas a ele e acompanhe tudo em um só lugar,
                  usando o menu de navegação ou os botões acima.
                </p>
              </div>
              <Link
                to="/clientes/cadastrar"
                className="shrink-0 rounded-lg bg-gradient-to-r from-[#1689F5] via-[#2563EB] to-[#6D28D9] px-6 py-3 text-center font-medium text-white shadow-[0_8px_20px_rgba(37,99,235,0.35)] transition-all hover:-translate-y-0.5 hover:brightness-110"
              >
                Começar agora
              </Link>
            </div>
          </section>
        </section>
      </main>
    </>
  )
}

export default Introducao