import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  CalendarBlankIcon,
  IdentificationCardIcon,
  EnvelopeSimpleIcon,
  UserIcon,
  BuildingsIcon
} from '@phosphor-icons/react'
import { ClipLoader } from 'react-spinners'
import type Cliente from '../../../models/Cliente'
import { clienteService } from '../../../services/ClienteService'

function FormCliente() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  const [cliente, setCliente] = useState<Cliente>({
    nome: '',
    dataNascimento: '',
    cpfCnpj: '',
    email: '',
    empresaTech: ''
  })

  const [erro, setErro] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    if (id !== undefined) {
      buscarClientePorId(id)
    }
  }, [id])

  async function buscarClientePorId(idCliente: string) {
    try {
      setIsLoading(true)
      setErro('')

      const clienteEncontrado = await clienteService.buscarPorId(
        Number(idCliente)
      )

      setCliente(clienteEncontrado)
    } catch (error) {
      console.error('Erro ao buscar cliente:', error)
      setErro('Erro ao carregar os dados do cliente.')
    } finally {
      setIsLoading(false)
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setCliente({
      ...cliente,
      [e.target.name]: e.target.value
    })
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErro('')

    const dadosCliente = {
      nome: cliente.nome.trim(),
      dataNascimento: cliente.dataNascimento,
      cpfCnpj: cliente.cpfCnpj.trim(),
      email: cliente.email.trim(),
      empresaTech: cliente.empresaTech.trim()
    }

    console.log('Payload enviado para /clientes:', dadosCliente)

    try {
      setIsLoading(true)

      if (id !== undefined) {
        const clienteAtualizado = await clienteService.atualizar(
          Number(id),
          dadosCliente
        )

        alert(`Cliente ${clienteAtualizado.nome} atualizado com sucesso!`)
      } else {
        const novoCliente = await clienteService.cadastrar(dadosCliente)

        alert(`Cliente ${novoCliente.nome} cadastrado com sucesso!`)
      }

      navigate('/clientes')
    } catch (error: any) {
      console.error('Erro ao salvar cliente:', error)
      console.error('Status retornado pela API:', error.response?.status)
      console.error('Detalhes retornados pela API:', error.response?.data)

      const resposta = error.response?.data

      if (typeof resposta === 'string') {
        setErro(resposta)
        return
      }

      if (resposta?.message) {
        setErro(resposta.message)
        return
      }

      if (resposta?.errors?.[0]?.defaultMessage) {
        setErro(resposta.errors[0].defaultMessage)
        return
      }

      if (resposta?.errors?.[0]?.message) {
        setErro(resposta.errors[0].message)
        return
      }

      if (error.response?.status === 400) {
        setErro(
          'Os dados enviados foram recusados. Verifique o console do navegador para ver o motivo retornado pela API.'
        )
        return
      }

      setErro('Erro ao salvar cliente na API.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#EDF5FF] px-4 pb-12 pt-24 sm:px-6 sm:pt-28 md:pb-16">
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#1689F5]/20 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-36 -right-32 h-96 w-96 rounded-full bg-[#7C3AED]/20 blur-3xl" />

      <div className="pointer-events-none absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-[#38BDF8]/10 blur-3xl" />

      <section className="relative z-10 mx-auto w-full max-w-xl">
        <header className="mb-8 text-center">
          <div className="mb-3 flex items-center justify-center gap-3">
            <div className="h-9 w-1 rounded-full bg-gradient-to-b from-[#1689F5] to-[#7C3AED]" />

            <h1 className="bg-gradient-to-r from-[#126CC5] via-[#2563EB] to-[#6D28D9] bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-4xl">
              {id === undefined ? 'Cadastrar Cliente' : 'Editar Cliente'}
            </h1>
          </div>

          <p className="mx-auto max-w-md text-sm leading-6 text-[#526581]">
            {id === undefined
              ? 'Preencha os dados abaixo para adicionar um novo cliente à base do ConectaTravel.'
              : 'Atualize os dados do cliente para manter sua base organizada e completa.'}
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="relative overflow-hidden rounded-2xl border border-white/70 bg-white/55 p-6 shadow-[0_20px_60px_rgba(37,99,235,0.14)] backdrop-blur-xl sm:p-8"
        >
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#1689F5] via-[#2563EB] to-[#7C3AED]" />

          <div className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-[#60A5FA]/15 blur-2xl" />

          <div className="pointer-events-none absolute -bottom-16 -left-12 h-28 w-28 rounded-full bg-[#A78BFA]/15 blur-2xl" />

          <div className="relative z-10 flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="nome"
                className="flex items-center gap-2 text-sm font-semibold text-[#30476A]"
              >
                <UserIcon
                  size={18}
                  weight="bold"
                  className="text-[#1689F5]"
                />
                Nome completo
              </label>

              <input
                type="text"
                name="nome"
                id="nome"
                value={cliente.nome}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/80 bg-white/65 px-4 py-3 text-base text-[#172B4D] outline-none shadow-sm transition-all placeholder:text-[#8AA0BD] focus:border-[#1689F5]/50 focus:bg-white focus:ring-4 focus:ring-[#1689F5]/10"
                placeholder="Digite o nome completo"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="dataNascimento"
                className="flex items-center gap-2 text-sm font-semibold text-[#30476A]"
              >
                <CalendarBlankIcon
                  size={18}
                  weight="bold"
                  className="text-[#1689F5]"
                />
                Data de nascimento
              </label>

              <input
                type="date"
                name="dataNascimento"
                id="dataNascimento"
                value={cliente.dataNascimento}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/80 bg-white/65 px-4 py-3 text-base text-[#172B4D] outline-none shadow-sm transition-all focus:border-[#1689F5]/50 focus:bg-white focus:ring-4 focus:ring-[#1689F5]/10"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="cpfCnpj"
                className="flex items-center gap-2 text-sm font-semibold text-[#30476A]"
              >
                <IdentificationCardIcon
                  size={18}
                  weight="bold"
                  className="text-[#1689F5]"
                />
                CPF ou CNPJ
              </label>

              <input
                type="text"
                name="cpfCnpj"
                id="cpfCnpj"
                value={cliente.cpfCnpj}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/80 bg-white/65 px-4 py-3 text-base text-[#172B4D] outline-none shadow-sm transition-all placeholder:text-[#8AA0BD] focus:border-[#1689F5]/50 focus:bg-white focus:ring-4 focus:ring-[#1689F5]/10"
                placeholder="Digite o CPF ou CNPJ"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="flex items-center gap-2 text-sm font-semibold text-[#30476A]"
              >
                <EnvelopeSimpleIcon
                  size={18}
                  weight="bold"
                  className="text-[#1689F5]"
                />
                E-mail
              </label>

              <input
                type="email"
                name="email"
                id="email"
                value={cliente.email}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/80 bg-white/65 px-4 py-3 text-base text-[#172B4D] outline-none shadow-sm transition-all placeholder:text-[#8AA0BD] focus:border-[#1689F5]/50 focus:bg-white focus:ring-4 focus:ring-[#1689F5]/10"
                placeholder="nome@exemplo.com"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="empresaTech"
                className="flex items-center gap-2 text-sm font-semibold text-[#30476A]"
              >
                <BuildingsIcon
                  size={18}
                  weight="bold"
                  className="text-[#1689F5]"
                />
                Empresa tech
              </label>

              <input
                type="text"
                name="empresaTech"
                id="empresaTech"
                value={cliente.empresaTech}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/80 bg-white/65 px-4 py-3 text-base text-[#172B4D] outline-none shadow-sm transition-all placeholder:text-[#8AA0BD] focus:border-[#1689F5]/50 focus:bg-white focus:ring-4 focus:ring-[#1689F5]/10"
                placeholder="Nome da empresa ou instituição de ensino"
                required
              />
            </div>

            {erro && (
              <p className="rounded-xl border border-rose-500/20 bg-rose-50/80 px-4 py-3 text-sm font-semibold text-rose-700">
                {erro}
              </p>
            )}

            <div className="mt-2 flex flex-col-reverse gap-3 border-t border-white/70 pt-5 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => navigate('/clientes')}
                disabled={isLoading}
                className="w-full rounded-xl border border-white/80 bg-white/60 px-6 py-3 text-base font-semibold text-[#526581] shadow-sm transition-all hover:-translate-y-0.5 hover:bg-white hover:text-[#172B4D] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                Cancelar
              </button>

              <button
                type="submit"
                disabled={isLoading}
                className="flex min-w-40 items-center justify-center rounded-xl bg-gradient-to-r from-[#1689F5] via-[#2563EB] to-[#6D28D9] px-6 py-3 text-base font-semibold text-white shadow-[0_8px_20px_rgba(37,99,235,0.28)] transition-all hover:-translate-y-0.5 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? (
                  <ClipLoader color="#ffffff" size={22} />
                ) : (
                  <span>
                    {id === undefined
                      ? 'Cadastrar Cliente'
                      : 'Atualizar Cliente'}
                  </span>
                )}
              </button>
            </div>
          </div>
        </form>
      </section>
    </main>
  )
}

export default FormCliente