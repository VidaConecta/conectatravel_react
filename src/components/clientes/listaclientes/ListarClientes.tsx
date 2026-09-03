import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SyncLoader } from 'react-spinners'
import type Cliente from '../../../models/Cliente'
import { clienteService } from '../../../services/ClienteService'
import CardCliente from '../cardclientes/CardCliente'
import { HeartbeatIcon } from '@phosphor-icons/react'

function ListarClientes() {
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [erro, setErro] = useState('')

  useEffect(() => {
    buscarClientes()
  }, [])

  async function buscarClientes() {
    try {
      setIsLoading(true)
      setErro('')

      const dados = await clienteService.listarTodos()
      setClientes(dados)
    } catch (error) {
      console.error('Erro ao buscar clientes:', error)
      setErro('Erro ao carregar os clientes.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-[#EDF5FF] px-4 pb-12 pt-24 sm:px-6 sm:pt-28 lg:px-16">
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#1689F5]/20 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-36 -right-32 h-96 w-96 rounded-full bg-[#7C3AED]/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <header className="mb-8">
          <div className="mb-3 flex items-center gap-3">
            <div className="h-9 w-1 rounded-full bg-gradient-to-b from-[#1689F5] to-[#7C3AED]" />

            <h1 className="bg-gradient-to-r from-[#126CC5] via-[#2563EB] to-[#6D28D9] bg-clip-text text-3xl font-bold tracking-tight text-transparent">
              Clientes
            </h1>
          </div>

          <p className="max-w-2xl text-sm leading-6 text-[#526581]">
            Gerencie sua base de clientes de forma organizada e centralizada.
          </p>
        </header>

        <div className="mb-6 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => navigate('/clientes/cadastrar')}
            className="cursor-pointer rounded-lg bg-gradient-to-r from-[#1689F5] via-[#2563EB] to-[#6D28D9] px-6 py-3 text-base font-medium text-white shadow-[0_8px_20px_rgba(37,99,235,0.28)] transition-all hover:-translate-y-0.5 hover:brightness-110"
          >
            Cadastrar Cliente
          </button>
        </div>

        {isLoading && (
          <div className="flex flex-col items-center justify-center gap-3 py-12">
            <div className="relative flex h-16 w-64 items-center justify-center overflow-hidden rounded-2xl border border-white/70 bg-white/45 shadow-[0_12px_35px_rgba(37,99,235,0.14)] backdrop-blur-md">
              <div className="absolute inset-x-0 top-1/2 h-px bg-[#1689F5]/20" />

              <HeartbeatIcon
                size={42}
                weight="duotone"
                className="relative z-10 animate-pulse text-[#2563EB]"
              />

              <div className="absolute inset-y-0 left-0 w-20 animate-[loadingPulse_1.8s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-[#1689F5]/20 to-transparent" />
            </div>

            <span className="text-sm font-medium text-[#526581]">
              Carregando clientes...
            </span>
          </div>
        )}

        {!isLoading && erro && (
          <p className="my-8 font-bold text-center text-rose-600">
            {erro}
          </p>
        )}

        {!isLoading && !erro && clientes.length === 0 && (
          <p className="block my-8 text-3xl text-center text-[#526581]">
            Nenhum cliente foi encontrado!
          </p>
        )}

        <div className="grid grid-cols-1 gap-6 mb-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-8 md:mb-0">
          {clientes.map((cliente) => (
            <CardCliente key={cliente.id} cliente={cliente} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ListarClientes