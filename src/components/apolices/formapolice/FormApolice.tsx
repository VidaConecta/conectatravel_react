import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CalendarBlankIcon, FileTextIcon, UserIcon, MapPinIcon, ShieldCheckIcon, CurrencyCircleDollarIcon } from '@phosphor-icons/react'
import { ClipLoader } from 'react-spinners'
import type Apolice from '../../../models/Apolice'
import type Cliente from '../../../models/Cliente'
import type Usuario from '../../../models/Usuario'
import { apoliceService } from '../../../services/Apolice'
import { clienteService } from '../../../services/ClienteService'
import { calcularDias, calcularPremio, destinoInternacionalComAdicional } from '../../../utils/Premio'


const COBERTURAS = [
  'Despesas médicas',
  'Extravio de bagagem',
  'Extravio de equipamentos tecnológicos',
  'Telemedicina 24h',
  'Assistência jurídica',
  'Sala VIP',
  'Internet aérea'
]

// Usuário fixo para primeiro commit (substituir depois por autenticação real)
const USUARIO_FIXO: Usuario = {
  id: 1,
  nome: 'Administrador',
  usuario: 'admin@conectatravel.com.br',
  cargo: 'Corretor'
}

function FormApolice() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  const [clientes, setClientes] = useState<Cliente[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [erro, setErro] = useState('')
  const [apolice, setApolice] = useState<Apolice>({
    numeroApolice: '',
    destino: '',
    dataInicio: '',
    dataFim: '',
    valorPremio: 0,
    status: 'ATIVA',
    coberturas: [],
    usuario: USUARIO_FIXO,
    cliente: { id: 0 }
  })

  useEffect(() => {
    clienteService.listarTodos()
      .then(setClientes)
      .catch(() => setErro('Erro ao buscar clientes.'))
  }, [])

  useEffect(() => {
    if (id) {
      apoliceService.buscarPorId(Number(id))
        .then(setApolice)
        .catch(() => setErro('Erro ao buscar a apólice.'))
    }
  }, [id])

  function atualizarEstado(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const novo = { ...apolice, [e.target.name]: e.target.value }
    
    // Recalcular prêmio automaticamente quando destino ou datas mudarem
    if (e.target.name === 'destino' || e.target.name === 'dataInicio' || e.target.name === 'dataFim') {
      const dataInicioVal = e.target.name === 'dataInicio' ? e.target.value : apolice.dataInicio
      const dataFimVal = e.target.name === 'dataFim' ? e.target.value : apolice.dataFim
      const destinoVal = e.target.name === 'destino' ? e.target.value : apolice.destino
      
      if (dataInicioVal && dataFimVal && destinoVal) {
        novo.valorPremio = calcularPremio(dataInicioVal, dataFimVal, destinoVal)
      }
    }
    
    setApolice(novo)
  }

  function alternarCobertura(cobertura: string) {
    setApolice({
      ...apolice,
      coberturas: apolice.coberturas.includes(cobertura)
        ? apolice.coberturas.filter(item => item !== cobertura)
        : [...apolice.coberturas, cobertura]
    })
  }

  function atualizarCliente(e: ChangeEvent<HTMLSelectElement>) {
    setApolice({ ...apolice, cliente: { id: Number(e.target.value) } })
  }

  async function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErro('')

    if (!apolice.dataInicio || !apolice.dataFim || new Date(apolice.dataFim) < new Date(apolice.dataInicio)) {
      setErro('A data final deve ser igual ou posterior à data inicial.')
      return
    }

    if (!apolice.cliente || !('id' in apolice.cliente) || !apolice.cliente.id) {
      setErro('Selecione um cliente.')
      return
    }

    try {
      setIsLoading(true)
      const dados = {
        ...apolice,
        valorPremio: calcularPremio(apolice.dataInicio, apolice.dataFim, apolice.destino)
      }

      if (id) {
        await apoliceService.atualizar(Number(id), dados)
        alert('Apólice atualizada com sucesso!')
      } else {
        await apoliceService.cadastrar(dados)
        alert('Apólice cadastrada com sucesso!')
      }

      navigate('/apolices')
    } catch {
      setErro('Erro ao salvar a apólice na API.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#EDF5FF] px-4 pb-12 pt-24 sm:px-6 sm:pt-28 md:pb-16">
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#1689F5]/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-36 -right-32 h-96 w-96 rounded-full bg-[#7C3AED]/20 blur-3xl" />

      <section className="relative z-10 mx-auto w-full max-w-xl">
        <header className="mb-8 text-center">
          <div className="mb-3 flex items-center justify-center gap-3">
            <div className="h-9 w-1 rounded-full bg-gradient-to-b from-[#1689F5] to-[#7C3AED]" />
            <h1 className="bg-gradient-to-r from-[#126CC5] via-[#2563EB] to-[#6D28D9] bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-4xl">
              {id ? 'Editar Apólice de Viagem' : 'Cadastrar Apólice de Viagem'}
            </h1>
          </div>
          <p className="mx-auto max-w-md text-sm leading-6 text-[#526581]">
            Informe destino, período, coberturas e cliente. O prêmio é calculado automaticamente.
          </p>
        </header>

        <form
          onSubmit={enviar}
          className="relative overflow-hidden rounded-2xl border border-white/70 bg-white/55 p-6 shadow-[0_20px_60px_rgba(37,99,235,0.14)] backdrop-blur-xl sm:p-8"
        >
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#1689F5] via-[#2563EB] to-[#7C3AED]" />

          <div className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-[#60A5FA]/15 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-12 h-28 w-28 rounded-full bg-[#A78BFA]/15 blur-2xl" />

          <div className="relative z-10 flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-[#30476A]">
                <FileTextIcon size={18} className="text-[#1689F5]" />
                Número da apólice
              </label>
              <input
                name="numeroApolice"
                required
                value={apolice.numeroApolice}
                onChange={atualizarEstado}
                className="w-full rounded-xl border border-white/80 bg-white/65 px-4 py-3 text-base text-[#172B4D]"
                placeholder="Digite o número da apólice"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-[#30476A]">
                <MapPinIcon size={18} className="text-[#1689F5]" />
                Destino
              </label>
              <input
                name="destino"
                required
                value={apolice.destino}
                onChange={atualizarEstado}
                className="w-full rounded-xl border border-white/80 bg-white/65 px-4 py-3 text-base text-[#172B4D]"
                placeholder="Ex.: Canadá, Portugal ou São Paulo"
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-[#30476A]">
                  <CalendarBlankIcon size={18} className="text-[#1689F5]" />
                  Data inicial
                </label>
                <input
                  type="date"
                  name="dataInicio"
                  required
                  value={apolice.dataInicio}
                  onChange={atualizarEstado}
                  className="w-full rounded-xl border border-white/80 bg-white/65 px-4 py-3 text-base text-[#172B4D]"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-[#30476A]">
                  <CalendarBlankIcon size={18} className="text-[#1689F5]" />
                  Data final
                </label>
                <input
                  type="date"
                  name="dataFim"
                  required
                  value={apolice.dataFim}
                  onChange={atualizarEstado}
                  className="w-full rounded-xl border border-white/80 bg-white/65 px-4 py-3 text-base text-[#172B4D]"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-[#30476A]">
                <UserIcon size={18} className="text-[#1689F5]" />
                Cliente
              </label>
              <select
                required
                value={'id' in apolice.cliente ? apolice.cliente.id : ''}
                onChange={atualizarCliente}
                className="w-full rounded-xl border border-white/80 bg-white/65 px-4 py-3 text-base text-[#172B4D]"
              >
                <option value="">Selecione um cliente</option>
                {clientes.map(cliente => (
                  <option key={cliente.id} value={cliente.id}>
                    {cliente.nome}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-[#30476A]">
                <ShieldCheckIcon size={18} className="text-[#1689F5]" />
                Status
              </label>
              <select
                name="status"
                value={apolice.status}
                onChange={atualizarEstado}
                className="w-full rounded-xl border border-white/80 bg-white/65 px-4 py-3 text-base text-[#172B4D]"
              >
                <option value="ATIVA">Ativa</option>
                <option value="CANCELADA">Cancelada</option>
                <option value="SINISTRADA">Sinistrada</option>
              </select>
            </div>

            <div>
              <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#30476A]">
                <ShieldCheckIcon size={18} className="text-[#1689F5]" />
                Coberturas
              </p>
              <div className="grid gap-2 sm:grid-cols-2">
                {COBERTURAS.map(cobertura => (
                  <label
                    key={cobertura}
                    className="flex cursor-pointer items-center gap-2 rounded-xl border border-white/80 bg-white/55 p-3 text-sm text-[#526581]"
                  >
                    <input
                      type="checkbox"
                      checked={apolice.coberturas.includes(cobertura)}
                      onChange={() => alternarCobertura(cobertura)}
                    />
                    {cobertura}
                  </label>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-[#1689F5]/15 bg-[#EAF4FF]/75 p-4">
              <p className="flex items-center gap-2 text-sm font-semibold text-[#30476A]">
                <CurrencyCircleDollarIcon size={18} className="text-[#1689F5]" />
                Prêmio calculado
              </p>
              <p className="mt-1 text-2xl font-bold text-[#172B4D]">
                {apolice.valorPremio.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                })}
              </p>
              <p className="text-xs text-[#526581]">
                {calcularDias(apolice.dataInicio, apolice.dataFim)} dia(s) de viagem
                {destinoInternacionalComAdicional(apolice.destino) && (
                  <span className="ml-1 font-semibold text-[#1689F5]">
                    (R$ 60/dia - destino internacional)
                  </span>
                )}
                {!destinoInternacionalComAdicional(apolice.destino) && (
                  <span className="ml-1 font-semibold text-[#1689F5]">
                    (R$ 50/dia)
                  </span>
                )}
              </p>
            </div>

            {erro && (
              <p className="rounded-xl border border-rose-500/20 bg-rose-50/80 px-4 py-3 text-sm font-semibold text-rose-700">
                {erro}
              </p>
            )}

            <div className="mt-2 flex flex-col-reverse gap-3 border-t border-white/70 pt-5 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => navigate('/apolices')}
                disabled={isLoading}
                className="w-full rounded-xl border border-white/80 bg-white/60 px-6 py-3 text-base font-semibold text-[#526581] sm:w-auto"
              >
                Cancelar
              </button>

              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#1689F5] via-[#2563EB] to-[#6D28D9] px-6 py-3 text-base font-semibold text-white sm:w-auto"
              >
                {isLoading ? (
                  <ClipLoader color="#fff" size={22} />
                ) : (
                  <span>{id ? 'Atualizar Apólice' : 'Cadastrar Apólice'}</span>
                )}
              </button>
            </div>
          </div>
        </form>
      </section>
    </main>
  )
}

export default FormApolice