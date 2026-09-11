// Define as variações visuais do componente:
// 'desktop' -> estilo mais compacto, pra ficar ao lado do menu no header

import { CircleHalfIcon, MinusIcon, PlusIcon, TextTIcon } from "@phosphor-icons/react"
import { useAccessibility } from "../../contexts/acessibilidade/AcessibilidadeContext"

// 'mobile'  -> estilo com mais respiro, pra ficar dentro do menu hambúrguer
interface Props {
  variant?: 'desktop' | 'mobile'
}

function AccessibilityControls({ variant = 'desktop' }: Props) {
  // Puxa do contexto tudo que precisamos: estado atual e as funções de ação
  const { increaseFontSize, decreaseFontSize, resetFontSize, toggleHighContrast, highContrast } =
    useAccessibility()

  const isMobile = variant === 'mobile'

  return (
    // role="toolbar" + aria-label: avisa leitores de tela que isso é
    // um grupo de controles relacionados (boa prática de acessibilidade
    // pra quem vai USAR a própria barra de acessibilidade)
    <div
      role="toolbar"
      aria-label="Ferramentas de acessibilidade"
      className={
        isMobile
          // Versão mobile: borda, fundo semi-transparente, mais padding
          ? 'flex items-center gap-2 rounded-xl border border-white/70 bg-white/45 px-3 py-2 shadow-sm backdrop-blur-md'
          // Versão desktop: mais compacta, pra caber ao lado do menu
          : 'flex items-center gap-1 rounded-2xl border border-white/70 bg-white/35 p-1 shadow-sm backdrop-blur-md'
      }
    >
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

      {/* Linha divisória vertical, só separação visual entre os grupos de botões */}
      <div className="mx-1 h-5 w-px bg-[#274A73]/15" />

      {/* Botão ALTERNAR alto contraste */}
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
    </div>
  )
}

export default AccessibilityControls