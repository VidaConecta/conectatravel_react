import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import type Cliente from '../../../models/Cliente'
import { clienteService } from '../../../services/ClienteService'

function DeletarCliente() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  const [cliente, setCliente] = useState<Cliente | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [erro, setErro] = useState('')

  useEffect(() => {
    if (!id) {
      setErro('ID do cliente não informado.')
      return
    }

    async function carregarCliente() {
      try {
        setIsLoading(true)
        setErro('')

        const dados = await clienteService.buscarPorId(Number(id))
        setCliente(dados)
      } catch (error) {
        console.error('Erro ao buscar cliente:', error)
        setErro('Erro ao carregar os dados do cliente.')
      } finally {
        setIsLoading(false)
      }
    }

    carregarCliente()
  }, [id])

  async function confirmarExclusao() {
    if (!id) {
      setErro('ID do cliente não informado.')
      return
    }

    try {
      setIsLoading(true)
      setErro('')

      await clienteService.deletar(Number(id))

      alert('Cliente excluído com sucesso!')
      navigate('/clientes')
    } catch (error) {
      console.error('Erro ao excluir cliente:', error)
      setErro('Erro ao excluir o cliente.')
    } finally {
      setIsLoading(false)
    }
  }

  function cancelar() {
    navigate('/clientes')
  }

  if (isLoading && !cliente) {
    return (
      <main className="flex justify-center w-full px-4 py-24">
        <p>Carregando cliente...</p>
      </main>
    )
  }

  return (
    <main className="flex justify-center w-full px-4 py-24">
      <section className="w-full max-w-md p-8 bg-white border rounded-lg">
        <h1 className="mb-6 text-3xl text-center">
          Excluir Cliente
        </h1>

        {erro && (
          <p className="mb-4 font-bold text-center text-red-600">
            {erro}
          </p>
        )}

        {cliente && (
          <p className="mb-6 text-center text-slate-700">
            Tem certeza que deseja excluir o cliente{' '}
            <span className="font-bold">{cliente.nome}</span>?
          </p>
        )}

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={cancelar}
            disabled={isLoading}
            className="w-full py-2 text-white bg-slate-500 rounded hover:bg-slate-700 disabled:opacity-60"
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={confirmarExclusao}
            disabled={isLoading || !cliente}
            className="w-full py-2 text-white bg-red-600 rounded hover:bg-red-800 disabled:opacity-60"
          >
            {isLoading ? 'Excluindo...' : 'Excluir'}
          </button>
        </div>
      </section>
    </main>
  )
}

export default DeletarCliente