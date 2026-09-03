import { Link } from 'react-router-dom'
import {
  CaretRightIcon,
  ShieldCheckIcon,
  GlobeIcon,
  UserListIcon,
  FileTextIcon,
  PulseIcon,
  LightningIcon,
  LockKeyIcon,
  CheckCircleIcon
} from '@phosphor-icons/react'

function Home() {
  return (
    <section className="relative isolate flex min-h-full w-full flex-1 flex-col overflow-hidden bg-[#EDF5FF] px-4 pb-16 pt-24 md:px-8 md:pb-20 md:pt-28">
      {/* Luzes de Fundo (Glow Effect) */}
      <div className="pointer-events-none absolute -left-40 -top-28 h-96 w-96 rounded-full bg-[#1689F5]/20 blur-3xl animate-pulse" />
      <div className="pointer-events-none absolute -bottom-40 -right-32 h-96 w-96 rounded-full bg-[#7C3AED]/20 blur-3xl animate-pulse" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#38BDF8]/10 blur-3xl" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center gap-8">
        
        {/* Banner Hero Principal */}
        <section className="relative flex flex-col items-center justify-between gap-8 overflow-hidden rounded-2xl border border-white/70 bg-white/55 p-6 shadow-[0_20px_60px_rgba(37,99,235,0.14)] backdrop-blur-xl md:flex-row md:p-10">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#1689F5] via-[#2563EB] to-[#7C3AED]" />

          <div className="relative z-10 flex flex-1 flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#2563EB]/15 bg-[#EAF2FF]/80 px-3 py-1 text-xs font-semibold text-[#245CB2]">
                <ShieldCheckIcon size={16} weight="fill" className="text-[#2563EB]" />
                Gestão de seguro viagem
              </span>

              {/* Status ao vivo */}
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                </span>
                Sistema Ativo
              </span>
            </div>

            <h1 className="max-w-3xl bg-gradient-to-r from-[#126CC5] via-[#2563EB] to-[#6D28D9] bg-clip-text text-3xl font-bold text-transparent md:text-5xl">
              Bem-vinde à ConectaTravel
            </h1>

            <p className="max-w-xl text-base leading-7 text-[#526581]">
              Gerencie clientes, oportunidades e apólices de seguro viagem em um único lugar,
              com mais organização, agilidade e inteligência de dados.
            </p>

            <div className="mt-2 flex flex-wrap gap-3">
              <Link
                to="/sobre"
                className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-gradient-to-r from-[#1689F5] via-[#2563EB] to-[#6D28D9] px-6 py-3 text-base font-medium text-white shadow-[0_8px_20px_rgba(37,99,235,0.28)] transition-all hover:-translate-y-0.5 hover:brightness-110"
              >
                Sobre nós
                <CaretRightIcon size={18} weight="bold" />
              </Link>

              <Link
                to="/introducao"
                className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-white/80 bg-white/50 px-6 py-3 text-base font-medium text-[#245CB2] shadow-sm backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-[#2563EB]/25 hover:bg-[#EAF2FF]/80"
              >
                Introdução
              </Link>
            </div>
          </div>

          <div className="relative z-10 h-64 w-full flex-1 overflow-hidden rounded-xl border border-white/80 bg-white/30 shadow-lg backdrop-blur-sm md:h-80">
            <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-tr from-[#2563EB]/15 via-transparent to-[#7C3AED]/15" />
            <img
              className="h-full w-full object-contain object-center transition-transform duration-500 hover:scale-105"
              alt="Painel do ConectaTravel mostrando gestão de clientes e apólices de seguro viagem"
               src="https://ik.imagekit.io/lojagames/Seguro%20Viagem/Gemini_Generated_Image_z5acp5z5acp5z5ac.jpg" />
         
          </div>
        </section>

        {/* Métricas e Indicadores Animados */}
        <section className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="group relative overflow-hidden rounded-xl border border-white/70 bg-white/50 p-4 shadow-sm backdrop-blur-md transition-all hover:bg-white/70">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-extrabold text-[#2563EB]">100%</span>
              <PulseIcon size={20} className="text-[#2563EB] animate-pulse" weight="bold" />
            </div>
            <p className="mt-1 text-xs font-medium text-[#526581]">Digital & Integrado</p>
            {/* Barra Visual de Dados */}
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-blue-100">
              <div className="h-full w-full rounded-full bg-[#2563EB] animate-pulse" />
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-xl border border-white/70 bg-white/50 p-4 shadow-sm backdrop-blur-md transition-all hover:bg-white/70">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-extrabold text-[#6D28D9]">24/7</span>
              <GlobeIcon size={20} className="text-[#6D28D9] animate-spin" weight="duotone" style={{ animationDuration: '10s' }} />
            </div>
            <p className="mt-1 text-xs font-medium text-[#526581]">Disponibilidade em Tempo Real</p>
            {/* Barra Visual de Dados */}
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-purple-100">
              <div className="h-full w-[98%] rounded-full bg-[#6D28D9]" />
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-xl border border-white/70 bg-white/50 p-4 shadow-sm backdrop-blur-md transition-all hover:bg-white/70">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-extrabold text-[#1689F5]">Agilidade</span>
              <LightningIcon size={20} className="text-[#1689F5] animate-bounce" weight="fill" />
            </div>
            <p className="mt-1 text-xs font-medium text-[#526581]">Processamento de Apólices</p>
            {/* Barra Visual de Dados */}
            <div className="mt-3 flex gap-1">
              <span className="h-1.5 flex-1 rounded-full bg-[#1689F5]" />
              <span className="h-1.5 flex-1 rounded-full bg-[#1689F5]" />
              <span className="h-1.5 flex-1 rounded-full bg-[#1689F5]" />
              <span className="h-1.5 flex-1 rounded-full bg-[#1689F5]/30 animate-pulse" />
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-xl border border-white/70 bg-white/50 p-4 shadow-sm backdrop-blur-md transition-all hover:bg-white/70">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-extrabold text-[#10B981]">Segurança</span>
              <LockKeyIcon size={20} className="text-[#10B981]" weight="fill" />
            </div>
            <p className="mt-1 text-xs font-medium text-[#526581]">Proteção & Criptografia</p>
            {/* Barra Visual de Dados */}
            <div className="mt-3 flex items-center gap-1.5 text-[10px] font-semibold text-emerald-600">
              <CheckCircleIcon size={12} weight="fill" /> Dados Protegidos
            </div>
          </div>
        </section>

        {/* Cards de Funcionalidades Principais com Grafismo Inferior */}
        <section className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/70 bg-white/55 p-6 shadow-[0_10px_30px_rgba(37,99,235,0.08)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(37,99,235,0.15)]">
            <div>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#1689F5]/10 text-[#1689F5] transition-transform duration-300 group-hover:scale-110">
                <UserListIcon size={28} weight="duotone" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-[#172B4D]">Gestão de Clientes</h3>
              <p className="text-sm leading-6 text-[#526581]">
                Centralize o cadastro de clientes e tenha acesso rápido ao histórico de solicitações e viagens ativas.
              </p>
            </div>

            {/* Elemento gráfico dinâmico no rodape do card */}
            <div className="mt-6 pt-4 border-t border-blue-50 flex items-center justify-between text-xs text-[#1689F5] font-medium">
              <span>Sincronização Spring API</span>
              <span className="h-2 w-2 rounded-full bg-[#1689F5] animate-ping" />
            </div>
          </div>

          <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/70 bg-white/55 p-6 shadow-[0_10px_30px_rgba(37,99,235,0.08)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(37,99,235,0.15)]">
            <div>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#2563EB]/10 text-[#2563EB] transition-transform duration-300 group-hover:scale-110">
                <FileTextIcon size={28} weight="duotone" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-[#172B4D]">Controle de Apólices</h3>
              <p className="text-sm leading-6 text-[#526581]">
                Emita, acompanhe status e controle as renovações de seguro viagem com facilidade e sem burocracia.
              </p>
            </div>

            {/* Mini barra de progresso no rodape do card */}
            <div className="mt-6 pt-4 border-t border-blue-50">
              <div className="flex justify-between text-[11px] font-medium text-[#526581] mb-1">
                <span>Taxa de Emissão</span>
                <span className="text-[#2563EB] font-bold">99.4%</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-blue-100 overflow-hidden">
                <div className="h-full w-[99.4%] bg-[#2563EB] rounded-full" />
              </div>
            </div>
          </div>

          <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/70 bg-white/55 p-6 shadow-[0_10px_30px_rgba(37,99,235,0.08)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(37,99,235,0.15)]">
            <div>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#6D28D9]/10 text-[#6D28D9] transition-transform duration-300 group-hover:scale-110">
                <GlobeIcon size={28} weight="duotone" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-[#172B4D]">Atendimento Conectado</h3>
              <p className="text-sm leading-6 text-[#526581]">
                Suporte contínuo para garantir tranquilidade aos estudantes e nômades digitais em qualquer lugar do mundo.
              </p>
            </div>

            {/* Indicador de Conexão no rodape do card */}
            <div className="mt-6 pt-4 border-t border-purple-50 flex items-center justify-between text-xs text-[#6D28D9] font-medium">
              <span>Rede Global de Cobertura</span>
              <div className="flex gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-[#6D28D9]" />
                <span className="h-1.5 w-1.5 rounded-full bg-[#6D28D9]/60" />
                <span className="h-1.5 w-1.5 rounded-full bg-[#6D28D9]/30" />
              </div>
            </div>
          </div>
        </section>

      </div>
    </section>
  )
}

export default Home

