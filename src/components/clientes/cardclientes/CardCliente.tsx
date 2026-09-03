import { Link } from 'react-router-dom'
import type Cliente from '../../../models/Cliente'

interface CardClienteProps {
  cliente: Cliente
}

function CardCliente({ cliente }: CardClienteProps) {
  return (
    <article className="relative w-full shrink-0 overflow-hidden rounded-2xl border border-white/70 bg-white/55 shadow-[0_18px_50px_rgba(37,99,235,0.12)] backdrop-blur-xl transition duration-200 hover:-translate-y-1 hover:shadow-[0_22px_60px_rgba(37,99,235,0.20)]">
      <div className="h-1.5 w-full bg-gradient-to-r from-[#1689F5] to-[#2563EB]" />

      <div className="relative p-6">
        <div className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-[#60A5FA]/15 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-12 h-28 w-28 rounded-full bg-[#A78BFA]/15 blur-2xl" />

        <div className="relative z-10 mb-4">
          <span className="inline-flex rounded-full border border-[#1689F5]/15 bg-[#EAF4FF]/75 px-3 py-1 text-xs font-semibold text-[#1864A8] backdrop-blur-sm">
            Cliente
          </span>
        </div>

        <h2 className="relative z-10 mb-4 text-xl font-bold text-[#172B4D]">
          {cliente.nome}
        </h2>

        <div className="relative z-10 space-y-4">
          <div>
            <p className="mb-1 text-xs font-medium uppercase tracking-wide text-[#6B82A3]">
              CPF/CNPJ
            </p>
            <p className="font-semibold text-[#30476A]">
              {cliente.cpfCnpj}
            </p>
          </div>

          <div>
            <p className="mb-1 text-xs font-medium uppercase tracking-wide text-[#6B82A3]">
              E-mail
            </p>
            <p className="text-sm leading-6 text-[#526581]">
              {cliente.email}
            </p>
          </div>

          <div>
            <p className="mb-1 text-xs font-medium uppercase tracking-wide text-[#6B82A3]">
              Empresa tech
            </p>
            <p className="text-sm leading-6 text-[#526581]">
              {cliente.empresaTech}
            </p>
          </div>
        </div>

        <div className="relative z-10 mt-6 flex items-center justify-between border-t border-white/70 pt-4">
          <span className="text-xs font-medium text-[#6B82A3]">
            Cliente ID: {cliente.id}
          </span>
        </div>

        <div className="relative z-10 mt-4 flex gap-2">
          <Link
            to={`/clientes/editar/${cliente.id}`}
            className="flex items-center justify-center flex-1 py-2 text-sm font-medium text-white rounded-lg bg-gradient-to-r from-[#1689F5] to-[#2563EB] shadow-[0_8px_20px_rgba(37,99,235,0.28)] transition-all hover:-translate-y-0.5 hover:brightness-110"
          >
            Editar
          </Link>

          <Link
            to={`/clientes/deletar/${cliente.id}`}
            className="flex flex-1 items-center justify-center rounded-lg border border-rose-500/20 bg-rose-500 px-3 py-2 text-sm font-medium text-white shadow-[0_8px_20px_rgba(225,29,72,0.20)] transition-all hover:-translate-y-0.5 hover:bg-rose-600 hover:shadow-[0_10px_24px_rgba(225,29,72,0.30)]"
          >
            Deletar
          </Link>
        </div>
      </div>
    </article>
  )
}

export default CardCliente