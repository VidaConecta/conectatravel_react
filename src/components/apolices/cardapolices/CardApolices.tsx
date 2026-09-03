import { PencilSimpleIcon, TrashSimpleIcon } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import type Apolice from '../../../models/Apolice'

interface CardApolicesProps {
  apolice: Apolice
}

function corDaBarra(status: Apolice['status']) {
  if (status === 'ATIVA') {
    return 'bg-gradient-to-r from-[#1689F5] to-[#2563EB]'
  }
  if (status === 'SINISTRADA') {
    return 'bg-gradient-to-r from-amber-500 to-amber-600'
  }
  if (status === 'CANCELADA') {
    return 'bg-gradient-to-r from-rose-500 to-rose-600'
  }
  return 'bg-gradient-to-r from-emerald-500 to-emerald-600'
}

function obterCorStatus(status: Apolice['status']) {
  if (status === 'ATIVA') {
    return {
      cor: 'border-[#1689F5]/15 bg-[#EAF4FF]/75 text-[#1864A8]',
      nome: 'Ativa'
    }
  }
  if (status === 'SINISTRADA') {
    return {
      cor: 'border-amber-500/15 bg-amber-50/75 text-amber-700',
      nome: 'Sinistrada'
    }
  }
  if (status === 'CANCELADA') {
    return {
      cor: 'border-rose-500/15 bg-rose-50/75 text-rose-700',
      nome: 'Cancelada'
    }
  }
  return {
    cor: 'border-emerald-500/15 bg-emerald-50/75 text-emerald-700',
    nome: 'Finalizada'
  }
}

function CardApolices({ apolice }: CardApolicesProps) {
  const statusInfo = obterCorStatus(apolice.status)

  return (
    <article className="relative w-full shrink-0 overflow-hidden rounded-2xl border border-white/70 bg-white/55 shadow-[0_18px_50px_rgba(37,99,235,0.12)] backdrop-blur-xl transition duration-200 hover:-translate-y-1 hover:shadow-[0_22px_60px_rgba(37,99,235,0.20)]">
      <div className={`h-1.5 w-full ${corDaBarra(apolice.status)}`} />

      <div className="relative p-6">
        <div className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-[#60A5FA]/15 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-12 h-28 w-28 rounded-full bg-[#A78BFA]/15 blur-2xl" />

        <div className="relative z-10 mb-4">
          <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold backdrop-blur-sm ${statusInfo.cor}`}>
            {statusInfo.nome}
          </span>
        </div>

        <h2 className="relative z-10 mb-4 text-xl font-bold text-[#172B4D]">
          Apólice Nº {apolice.numeroApolice}
        </h2>

        <div className="relative z-10 space-y-4">
          <div>
            <p className="mb-1 text-xs font-medium uppercase tracking-wide text-[#6B82A3]">
              Destino
            </p>
            <p className="font-semibold text-[#30476A]">
              {apolice.destino || '—'}
            </p>
          </div>

          <div>
            <p className="mb-1 text-xs font-medium uppercase tracking-wide text-[#6B82A3]">
              Cliente
            </p>
            <p className="font-semibold text-[#30476A]">
              {typeof apolice.cliente === 'object' && apolice.cliente !== null && 'nome' in apolice.cliente
                ? apolice.cliente.nome
                : 'Cliente não vinculado'}
            </p>
          </div>

          <div>
            <p className="mb-1 text-xs font-medium uppercase tracking-wide text-[#6B82A3]">
              Valor do prêmio
            </p>
            <p className="text-2xl font-bold text-[#172B4D]">
              {typeof apolice.valorPremio === 'number'
                ? apolice.valorPremio.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  })
                : 'R$ 0,00'}
            </p>
          </div>

          <div className="border-t border-white/70 pt-4">
            <p className="mb-1 text-xs font-medium uppercase tracking-wide text-[#6B82A3]">
              Período
            </p>
            <p className="text-sm leading-6 text-[#526581]">
              {apolice.dataInicio ? new Date(apolice.dataInicio).toLocaleDateString('pt-BR') : '—'} até{' '}
              {apolice.dataFim ? new Date(apolice.dataFim).toLocaleDateString('pt-BR') : '—'}
            </p>
          </div>
        </div>

        <div className="relative z-10 mt-6 flex items-center justify-between border-t border-white/70 pt-4">
          <span className="text-xs font-medium text-[#6B82A3]">
            Apólice ID: {apolice.id ?? '—'}
          </span>
        </div>

        <div className="relative z-10 mt-4 flex gap-2">
          <Link
            to={`/editarapolice/${apolice.id}`}
            className="flex items-center justify-center flex-1 py-2 text-sm font-medium text-white rounded-lg bg-gradient-to-r from-[#1689F5] to-[#2563EB] shadow-[0_8px_20px_rgba(37,99,235,0.28)] transition-all hover:-translate-y-0.5 hover:brightness-110"
          >
            Editar
          </Link>

          <Link
            to={`/deletarapolice/${apolice.id}`}
            className="flex flex-1 items-center justify-center gap-1 rounded-lg border border-rose-500/20 bg-rose-500 px-3 py-2 text-sm font-medium text-white shadow-[0_8px_20px_rgba(225,29,72,0.20)] transition-all hover:-translate-y-0.5 hover:bg-rose-600 hover:shadow-[0_10px_24px_rgba(225,29,72,0.30)]"
          >
            <TrashSimpleIcon size={18} />
            Excluir
          </Link>
        </div>
      </div>
    </article>
  )
}

export default CardApolices