// Define as variações visuais do componente:
// 'desktop' -> estilo mais compacto, pra ficar ao lado do menu no header
// 'mobile'  -> estilo com mais respiro, pra ficar dentro do menu hambúrguer

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { CircleHalfIcon, MinusIcon, PlusIcon, TextTIcon } from '@phosphor-icons/react'
import { useAccessibility } from '../../contexts/acessibilidade/AcessibilidadeContext'

interface Props {
  variant?: 'desktop' | 'mobile'
}

function AccessibilityControls({ variant = 'desktop' }: Props) {
  // Puxa do contexto tudo que precisamos: estado atual e as funções de ação
  const { increaseFontSize, decreaseFontSize, resetFontSize, toggleHighContrast, highContrast } =
    useAccessibility()

  const isMobile = variant === 'mobile'

  const [painelAberto, setPainelAberto] = useState(false)
  const botaoRef = useRef<HTMLButtonElement>(null)
  const painelRef = useRef<HTMLDivElement>(null)
  const [posicaoPainel, setPosicaoPainel] = useState({ top: 0, right: 0 })

  useEffect(() => {
    function fecharAoClicarFora(evento: MouseEvent) {
      const clicouNoBotao = botaoRef.current?.contains(evento.target as Node)
      const clicouNoPainel = painelRef.current?.contains(evento.target as Node)
      if (!clicouNoBotao && !clicouNoPainel) {
        setPainelAberto(false)
      }
    }

    function fecharComEsc(evento: KeyboardEvent) {
      if (evento.key === 'Escape') setPainelAberto(false)
    }

    document.addEventListener('mousedown', fecharAoClicarFora)
    document.addEventListener('keydown', fecharComEsc)

    return () => {
      document.removeEventListener('mousedown', fecharAoClicarFora)
      document.removeEventListener('keydown', fecharComEsc)
    }
  }, [])

  // backdrop-blur no header cria um novo containing block, então até um
  // position: fixed normal fica preso (e cortado) dentro do overflow-hidden
  // dele. Por isso o painel vai por portal direto pro body.
  function abrirPainel() {
    if (botaoRef.current) {
      const rect = botaoRef.current.getBoundingClientRect()
      setPosicaoPainel({
        top: rect.bottom + 8,
        right: window.innerWidth - rect.right
      })
    }
    setPainelAberto((aberto) => !aberto)
  }

  // Só os 3 controles de FONTE — o de contraste ficou fora do painel do
  // botão T porque ele não é sobre fonte, é um botão à parte
  const botoesFonte = (
    <>
      {/* Botão DIMINUIR fonte */}
      <button
        type="button"
        onClick={decreaseFontSize}
        aria-label="Diminuir tamanho da letra" // texto lido pelo leitor de tela (não há texto visível no botão)
        className="flex items-center gap-1 rounded-xl px-2.5 py-2 text-[#274A73] transition-all hover:bg-white/65 hover:text-[#2563EB]"
      >
        <MinusIcon size={14} weight="bold" />
        <TextTIcon size={15} weight="bold" />
      </button>

      {/* Botão RESTAURAR tamanho padrão (ícone médio, sem +/-) */}
      <button
        type="button"
        onClick={resetFontSize}
        aria-label="Restaurar tamanho padrão da letra"
        className="rounded-xl px-2.5 py-2 text-[#274A73] transition-all hover:bg-white/65 hover:text-[#2563EB]"
      >
        <TextTIcon size={17} weight="bold" />
      </button>

      {/* Botão AUMENTAR fonte */}
      <button
        type="button"
        onClick={increaseFontSize}
        aria-label="Aumentar tamanho da letra"
        className="flex items-center gap-1 rounded-xl px-2.5 py-2 text-[#274A73] transition-all hover:bg-white/65 hover:text-[#2563EB]"
      >
        <PlusIcon size={14} weight="bold" />
        <TextTIcon size={19} weight="bold" />
      </button>
    </>
  )

  // Botão ALTERNAR alto contraste, separado dos de fonte
  const botaoContraste = (
    <button
      type="button"
      onClick={toggleHighContrast}
      // aria-pressed: informa ao leitor de tela se o botão está "ativado"
      // (é o equivalente semântico de um toggle/switch)
      aria-pressed={highContrast}
      aria-label="Alternar alto contraste"
      // Classe condicional: quando highContrast está ativo, deixa o botão
      // com fundo/cor destacados pra dar feedback visual de que está ligado
      className={`flex items-center gap-1 rounded-xl px-2.5 py-2 transition-all hover:bg-white/65 ${
        highContrast ? 'bg-white/75 text-[#7C3AED]' : 'text-[#274A73] hover:text-[#2563EB]'
      }`}
    >
      <CircleHalfIcon size={17} weight="fill" />
    </button>
  )

  if (isMobile) {
    return (
      // role="toolbar" + aria-label: avisa leitores de tela que isso é
      // um grupo de controles relacionados (boa prática de acessibilidade
      // pra quem vai USAR a própria barra de acessibilidade)
      <div
        role="toolbar"
        aria-label="Ferramentas de acessibilidade"
        className="flex items-center gap-2 rounded-xl border border-white/70 bg-white/45 px-3 py-2 shadow-sm backdrop-blur-md"
      >
        {botoesFonte}
        <div className="mx-1 h-5 w-px bg-[#274A73]/15" />
        {botaoContraste}
      </div>
    )
  }

  return (
    <div className="flex items-center gap-1.5">
      <div className="relative">
        <button
          ref={botaoRef}
          type="button"
          onClick={abrirPainel}
          aria-label="Abrir controles de tamanho da letra"
          aria-expanded={painelAberto}
          aria-haspopup="true"
          className="flex items-center gap-1 rounded-xl border border-white/80 bg-white/45 p-2 text-[#274A73] shadow-md backdrop-blur-md transition-all hover:scale-105 hover:border-[#1689F5]/35 hover:bg-white/75 active:scale-95 xl:hidden"
        >
          <TextTIcon size={20} weight="bold" />
        </button>

        {painelAberto &&
          createPortal(
            <div
              ref={painelRef}
              role="toolbar"
              aria-label="Controles de tamanho da letra"
              style={{ top: posicaoPainel.top, right: posicaoPainel.right }}
              className="fixed z-[9999] flex items-center gap-1 rounded-2xl border border-white/70 bg-white/95 p-1 shadow-[0_10px_30px_rgba(21,93,173,0.25)] backdrop-blur-2xl xl:hidden"
            >
              {botoesFonte}
            </div>,
            document.body
          )}
      </div>

      {/* Contraste fica sempre visível, fora do botão T, em qualquer tamanho de tela */}
      <div className="rounded-xl border border-white/80 bg-white/45 p-1 shadow-md backdrop-blur-md xl:hidden">
        {botaoContraste}
      </div>

      {/* Barra completa antiga, intocada — só aparece em xl+ */}
      <div
        role="toolbar"
        aria-label="Ferramentas de acessibilidade"
        className="hidden items-center gap-1 rounded-2xl border border-white/70 bg-white/35 p-1 shadow-sm backdrop-blur-md xl:flex"
      >
        {botoesFonte}
        <div className="mx-1 h-5 w-px bg-[#274A73]/15" />
        {botaoContraste}
      </div>
    </div>
  )
}

export default AccessibilityControls