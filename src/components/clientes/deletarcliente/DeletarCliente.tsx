import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { WarningCircleIcon } from '@phosphor-icons/react'
import { ClipLoader } from 'react-spinners'
import type Cliente from '../../../models/Cliente'
import { clienteService } from '../../../services/ClienteService'

// Página de confirmação de exclusão de um Cliente
function DeletarCliente() {
  const navigate = useNavigate()

  const [cliente, setCliente] = useState<Cliente>({} as Cliente)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { id } = useParams<{ id: string }>()

  async function buscarPorId(id: string) {
    try {
      const dados = await clienteService.buscarPorId(Number(id))
      setCliente(dados)
    } catch (error) {
      alert('Erro ao buscar o cliente.')
    }
  }

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id)
    }
  }, [id])

  async function deletarCliente() {
    setIsLoading(true)

    try {
      await clienteService.deletar(Number(id))
      alert('Cliente apagado com sucesso')
    } catch (error) {
      alert('Erro ao deletar o cliente.')
    }

    setIsLoading(false)
    retornar()
  }

  function retornar() {
    navigate('/clientes')
  }

  return (
    <main className="grow mx-auto flex w-full max-w-xl flex-col gap-8 px-4 py-24 md:px-8 md:py-28">
      <div className="flex flex-col items-center gap-3 rounded-lg border border-slate-200 bg-white p-8 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600">
          <WarningCircleIcon size={32} />
        </div>

        <h1 className="text-2xl font-semibold text-slate-800">
          Excluir Cliente
        </h1>

        <p className="text-base text-slate-600">
          Tem certeza que deseja excluir o cliente{' '}
          <span className="font-semibold text-slate-800">
            {cliente.nome}
          </span>
          ?
        </p>

        <div className="mt-4 flex items-center justify-center gap-3">
          <button
            onClick={deletarCliente}
            disabled={isLoading}
            className="flex min-w-16 items-center justify-center rounded-lg bg-green-600 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-green-800 disabled:opacity-60"
          >
            {isLoading ? (
              <ClipLoader color="#ffffff" size={24} />
            ) : (
              <span>Sim</span>
            )}
          </button>

          <button
            onClick={retornar}
            className="rounded-lg border border-slate-300 bg-red-600 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-red-700"
          >
            Não
          </button>
        </div>
      </div>
    </main>
  )
}

export default DeletarCliente