import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowClockwiseIcon,
  ArrowSquareOutIcon,
  XIcon
} from '@phosphor-icons/react'
import { TOPICOS, type Topico } from './topicos'

const FOTO_PILOTO = 'https://ik.imagekit.io/zvv7puf6g/89e1fdae-57e0-4338-af8c-4ded3f358004.jpg'

function AvatarMini() {
  return (
    <img
      src={FOTO_PILOTO}
      alt="Piloto, assistente virtual do ConectaTravel"
      className="h-7 w-7 shrink-0 rounded-full border-2 border-white object-cover shadow-sm"
    />
  )
}

function ChatbotWidget() {
  const [aberto, setAberto] = useState(false)
  const [historico, setHistorico] = useState<Topico[]>([])
  const [mostrarConvite, setMostrarConvite] = useState(false)
  const fimDaConversaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const temporizador = setTimeout(() => setMostrarConvite(true), 2500)
    return () => clearTimeout(temporizador)
  }, [])

  useEffect(() => {
    fimDaConversaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [historico])

  function alternarPainel() {
    setAberto((estaAberto) => !estaAberto)
    setMostrarConvite(false)
  }

  function fecharPainel() {
    setAberto(false)
  }

  function selecionarTopico(topico: Topico) {
    setHistorico((atual) => [...atual, topico])
  }

  function reiniciarConversa() {
    setHistorico([])
  }

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {aberto && (
        <div className="flex max-h-[75vh] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-3xl border border-white/70 bg-white/95 shadow-[0_20px_60px_rgba(37,99,235,0.25)] backdrop-blur-xl">
          <header className="flex items-center justify-between gap-3 bg-gradient-to-r from-[#1689F5] via-[#2563EB] to-[#7C3AED] px-4 py-4">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 shrink-0">
                <img
                  src={FOTO_PILOTO}
                  alt="Piloto, assistente virtual do ConectaTravel"
                  className="h-10 w-10 rounded-full border-2 border-white/70 object-cover"
                />
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-400" />
              </div>

              <div>
                <p className="text-sm font-bold text-white">ConectaTravel</p>
                <p className="text-[11px] text-white/80">Assistente virtual</p>
              </div>
            </div>

            <button
              type="button"
              onClick={fecharPainel}
              aria-label="Fechar central de ajuda"
              className="rounded-lg p-1.5 text-white/90 transition-colors hover:bg-white/15"
            >
              <XIcon size={18} weight="bold" />
            </button>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto bg-[#F3F8FF] px-4 py-4">
            <div className="flex items-end gap-2">
              <AvatarMini />
              <div className="max-w-[85%] rounded-2xl rounded-bl-sm bg-white px-4 py-2.5 text-sm leading-6 text-[#30476A] shadow-sm">
                Oi! 👋🏼 Sou o assistente do ConectaTravel. Como eu posso te ajudar?
              </div>
            </div>

            {historico.map((topico, indice) => (
              <div key={`${topico.id}-${indice}`} className="flex flex-col gap-3">
                <div className="flex justify-end">
                  <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-gradient-to-r from-[#1689F5] to-[#7C3AED] px-4 py-2.5 text-sm text-white shadow-sm">
                    {topico.pergunta}
                  </div>
                </div>

                <div className="flex items-end gap-2">
                  <AvatarMini />
                  <div className="flex max-w-[85%] flex-col items-start gap-2 rounded-2xl rounded-bl-sm bg-white px-4 py-2.5 text-sm leading-6 text-[#30476A] shadow-sm">
                    <span>{topico.resposta}</span>

                    {topico.link?.tipo === 'interno' && (
                      <Link
                        to={topico.link.rota}
                        onClick={fecharPainel}
                        className="inline-flex items-center gap-1.5 rounded-full bg-[#EDF5FF] px-3 py-1.5 text-xs font-semibold text-[#2563EB] transition-colors hover:bg-[#DCEBFF]"
                      >
                        {topico.link.texto}
                      </Link>
                    )}

                    {topico.link?.tipo === 'externo' && (
                      <a
                        href={topico.link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 transition-colors hover:bg-emerald-100"
                      >
                        {topico.link.texto}
                        <ArrowSquareOutIcon size={13} weight="bold" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}

            <div ref={fimDaConversaRef} />
          </div>

          <div className="flex flex-wrap gap-2 border-t border-[#EDF5FF] bg-white px-4 py-3">
            {historico.length > 0 && (
              <button
                type="button"
                onClick={reiniciarConversa}
                aria-label="Reiniciar conversa"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#CFE1F5] text-[#526581] transition-colors hover:bg-[#EDF5FF]"
              >
                <ArrowClockwiseIcon size={14} weight="bold" />
              </button>
            )}

            {TOPICOS.map((topico) => {
              const Icone = topico.icone

              return (
                <button
                  key={topico.id}
                  type="button"
                  onClick={() => selecionarTopico(topico)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#CFE1F5] bg-white px-3 py-1.5 text-xs font-semibold text-[#30476A] transition-all hover:-translate-y-0.5 hover:border-[#1689F5]/50 hover:bg-[#EDF5FF] hover:text-[#2563EB]"
                >
                  <Icone size={14} weight="bold" className="text-[#1689F5]" />
                  {topico.rotulo}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {!aberto && mostrarConvite && (
        <div className="flex items-center gap-2 rounded-2xl border border-white/70 bg-white/95 px-4 py-2.5 text-sm font-medium text-[#172B4D] shadow-lg backdrop-blur-xl">
          Precisa de ajuda? 😊
          <button
            type="button"
            onClick={() => setMostrarConvite(false)}
            aria-label="Fechar aviso"
            className="text-[#8AA0BD] transition-colors hover:text-[#526581]"
          >
            <XIcon size={14} weight="bold" />
          </button>
        </div>
      )}

      <button
        type="button"
        onClick={alternarPainel}
        aria-label={aberto ? 'Fechar central de ajuda' : 'Abrir central de ajuda'}
        aria-expanded={aberto}
        className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-[#1689F5] via-[#2563EB] to-[#7C3AED] text-white shadow-[0_12px_30px_rgba(37,99,235,0.4)] transition-transform hover:scale-105 active:scale-95"
      >
        {!aberto && (
          <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#2563EB]/40" />
        )}

        {aberto ? (
          <XIcon size={26} weight="bold" />
        ) : (
          <img
            src={FOTO_PILOTO}
            alt="Abrir central de ajuda"
            className="h-full w-full object-cover"
          />
        )}
      </button>
    </div>
  )
}

export default ChatbotWidget
