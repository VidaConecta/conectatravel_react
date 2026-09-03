import { Link } from 'react-router-dom'

function Introducao() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#EDF5FF] px-4 pb-12 pt-24 sm:px-6 sm:pt-28 md:px-8 md:pb-16">
      <div className="pointer-events-none absolute -left-40 -top-28 h-96 w-96 rounded-full bg-[#1689F5]/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-32 h-96 w-96 rounded-full bg-[#7C3AED]/20 blur-3xl" />

      <section className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="relative overflow-hidden rounded-2xl border border-white/70 bg-white/55 p-8 shadow-[0_20px_60px_rgba(37,99,235,0.14)] backdrop-blur-xl md:p-12">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#1689F5] via-[#2563EB] to-[#7C3AED]" />
          <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-[#60A5FA]/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 left-1/3 h-44 w-44 rounded-full bg-[#A78BFA]/15 blur-3xl" />

          <div className="relative z-10">
            <p className="mb-3 text-sm font-semibold tracking-widest uppercase text-[#1689F5]">
              ConectaTravel
            </p>

            <h1 className="max-w-3xl bg-gradient-to-r from-[#126CC5] via-[#2563EB] to-[#6D28D9] bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
              Sua jornada de proteção começa aqui
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-relaxed text-[#526581] md:text-lg">
              Gerencie clientes e apólices de seguro viagem de maneira simples, centralizada e
              segura. Siga as etapas abaixo.
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

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
          <article className="relative overflow-hidden rounded-2xl border border-white/70 bg-white/55 p-6 shadow-[0_18px_50px_rgba(37,99,235,0.12)] backdrop-blur-xl transition-all hover:-translate-y-1 hover:shadow-[0_22px_60px_rgba(37,99,235,0.20)]">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#1689F5] to-[#2563EB]" />
            <span className="relative z-10 mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-[#1689F5] to-[#2563EB] font-bold text-white shadow-[0_8px_20px_rgba(37,99,235,0.28)]">
              1
            </span>
            <h2 className="relative z-10 mb-3 text-xl font-bold text-[#172B4D]">
              Cadastre o cliente
            </h2>
            <p className="relative z-10 leading-relaxed text-[#526581]">
              Registre os dados necessários para manter sua base de clientes
              completa, atualizada e organizada.
            </p>
          </article>

          <article className="relative overflow-hidden rounded-2xl border border-white/70 bg-white/55 p-6 shadow-[0_18px_50px_rgba(37,99,235,0.12)] backdrop-blur-xl transition-all hover:-translate-y-1 hover:shadow-[0_22px_60px_rgba(37,99,235,0.20)]">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#2563EB] to-[#7C3AED]" />
            <span className="relative z-10 mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-[#2563EB] to-[#7C3AED] font-bold text-white shadow-[0_8px_20px_rgba(37,99,235,0.28)]">
              2
            </span>
            <h2 className="relative z-10 mb-3 text-xl font-bold text-[#172B4D]">
              Registre a apólice
            </h2>
            <p className="relative z-10 leading-relaxed text-[#526581]">
              Vincule uma apólice de seguro viagem ao cliente e registre as principais
              informações sobre a proteção contratada.
            </p>
          </article>

          <article className="relative overflow-hidden rounded-2xl border border-white/70 bg-white/55 p-6 shadow-[0_18px_50px_rgba(37,99,235,0.12)] backdrop-blur-xl transition-all hover:-translate-y-1 hover:shadow-[0_22px_60px_rgba(37,99,235,0.20)]">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#7C3AED] to-[#1689F5]" />
            <span className="relative z-10 mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-[#7C3AED] to-[#1689F5] font-bold text-white shadow-[0_8px_20px_rgba(37,99,235,0.28)]">
              3
            </span>
            <h2 className="relative z-10 mb-3 text-xl font-bold text-[#172B4D]">
              Acompanhe os registros
            </h2>
            <p className="relative z-10 leading-relaxed text-[#526581]">
              Consulte e atualize clientes e apólices sempre que necessário,
              mantendo todas as informações centralizadas.
            </p>
          </article>
        </div>

        <section className="relative mt-8 overflow-hidden rounded-2xl border border-white/70 bg-white/55 p-8 shadow-[0_20px_60px_rgba(37,99,235,0.14)] backdrop-blur-xl md:p-10">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#1689F5] via-[#2563EB] to-[#7C3AED]" />
          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-[#172B4D]">
              Comece a utilizar a plataforma
            </h2>
            <p className="mt-4 leading-relaxed text-[#526581]">
              O primeiro passo é cadastrar o cliente. Depois, você poderá
              registrar as apólices relacionadas a ele e acompanhar todas as
              informações em um único lugar.
            </p>
            <p className="mt-4 leading-relaxed text-[#526581]">
              Utilize o menu de navegação ou os botões acima para acessar os
              recursos disponíveis na ConectaTravel.
            </p>
          </div>
        </section>
      </section>
    </main>
  )
}

export default Introducao