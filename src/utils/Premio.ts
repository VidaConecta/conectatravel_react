export function calcularDias(dataInicio: string, dataFim: string): number {
  const inicio = new Date(`${dataInicio}T00:00:00`)
  const fim = new Date(`${dataFim}T00:00:00`)
  const diferenca = Math.ceil((fim.getTime() - inicio.getTime()) / 86400000)
  return diferenca >= 1 ? diferenca : 1
}

export function destinoInternacionalComAdicional(destino: string): boolean {
  const normalizado = destino.trim().toLocaleLowerCase('pt-BR')
  return (
    normalizado.includes('estados unidos') ||
    normalizado === 'eua' ||
    normalizado.includes('canadá') ||
    normalizado.includes('canada')
  )
}

export function calcularPremio(dataInicio: string, dataFim: string, destino: string): number {
  const diaria = destinoInternacionalComAdicional(destino) ? 60 : 50
  return calcularDias(dataInicio, dataFim) * diaria
}