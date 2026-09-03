import type Cliente from './Cliente'

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
  cliente: Cliente | { id: number }
}