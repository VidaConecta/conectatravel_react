import type Cliente from './Cliente'
import type Usuario from './Usuario'

export type StatusApolice = 'ATIVA' | 'CANCELADA' | 'SINISTRADA'

export default interface Apolice {
  id?: number
  numeroApolice: string
  destino: string
  dataInicio: string
  dataFim: string
  valorPremio: number
  status: StatusApolice | string
  coberturas: string[]
  usuario: Usuario | { id: number }
  cliente: Cliente | { id: number }
}