// Define os tamanhos de fonte possíveis.
// Usamos porcentagem em vez de valores fixos em px pra escalar

import { createContext, type ReactNode, useState, useEffect, useContext } from "react"

// proporcionalmente TUDO que usa rem no Tailwind (a maioria das classes).
type FontSize = 'sm' | 'base' | 'lg' | 'xl'

// Formato dos dados/funções que o contexto vai expor pros componentes
interface AccessibilityContextType {
  fontSize: FontSize
  increaseFontSize: () => void
  decreaseFontSize: () => void
  resetFontSize: () => void
  highContrast: boolean
  toggleHighContrast: () => void
}

// Array ordenado dos tamanhos, usado pra navegar (índice - 1 / índice + 1)
const sizes: FontSize[] = ['sm', 'base', 'lg', 'xl']

// Mapeia cada tamanho para uma porcentagem que será aplicada
// no font-size do elemento <html>. Como o Tailwind usa rem por padrão,
// mudar o font-size do html reescala toda a aplicação de uma vez,
// sem precisar mexer em nenhuma classe individual do projeto.
const sizeMap: Record<FontSize, string> = {
  sm: '87.5%',   // fonte reduzida
  base: '100%',  // tamanho padrão (default do navegador)
  lg: '112.5%',  // fonte aumentada
  xl: '125%',    // fonte bem aumentada
}

// Cria o contexto React. Inicia como null porque só terá valor
// real quando estiver dentro do <AccessibilityProvider>.
const AccessibilityContext = createContext<AccessibilityContextType | null>(null)

// Provider: componente que "envolve" a aplicação (ou parte dela)
// e disponibiliza o estado de acessibilidade pra todos os filhos.
export function AccessibilityProvider({ children }: { children: ReactNode }) {
  // Estado do tamanho da fonte.
  // O valor inicial tenta recuperar do localStorage (preferência salva
  // de visitas anteriores); se não existir, usa 'base' como padrão.
  const [fontSize, setFontSize] = useState<FontSize>(
    () => (localStorage.getItem('fontSize') as FontSize) || 'base'
  )

  // Estado do modo alto contraste (true/false), também persistido.
  const [highContrast, setHighContrast] = useState(
    () => localStorage.getItem('highContrast') === 'true'
  )

  // Sempre que 'fontSize' mudar:
  // 1. Aplica o font-size correspondente no <html> (afeta o site inteiro)
  // 2. Salva a escolha no localStorage pra lembrar na próxima visita
  useEffect(() => {
    document.documentElement.style.fontSize = sizeMap[fontSize]
    localStorage.setItem('fontSize', fontSize)
  }, [fontSize])

  // Sempre que 'highContrast' mudar:
  // 1. Adiciona ou remove a classe CSS "high-contrast" no <html>
  //    (essa classe é definida no index.css com o filtro visual)
  // 2. Salva a preferência no localStorage
  useEffect(() => {
    document.documentElement.classList.toggle('high-contrast', highContrast)
    localStorage.setItem('highContrast', String(highContrast))
  }, [highContrast])

  // Função auxiliar que avança ou volta um "degrau" no array de tamanhos.
  // dir = 1  -> aumenta a fonte (próximo tamanho)
  // dir = -1 -> diminui a fonte (tamanho anterior)
  // Math.min/max garante que não passe dos limites do array (não quebra
  // se o usuário clicar muitas vezes seguidas em A+ ou A-).
  function changeSize(dir: 1 | -1) {
    const idx = sizes.indexOf(fontSize)
    const next = sizes[Math.min(Math.max(idx + dir, 0), sizes.length - 1)]
    setFontSize(next)
  }

  // Disponibiliza o estado e as funções pra qualquer componente
  // descendente que usar o hook useAccessibility()
  return (
    <AccessibilityContext.Provider
      value={{
        fontSize,
        increaseFontSize: () => changeSize(1),
        decreaseFontSize: () => changeSize(-1),
        resetFontSize: () => setFontSize('base'), // volta direto pro padrão
        highContrast,
        toggleHighContrast: () => setHighContrast((v) => !v), // inverte true/false
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  )
}

// Hook customizado que os componentes vão usar pra acessar o contexto.
// Em vez de importar useContext + AccessibilityContext toda vez,
// os componentes só chamam useAccessibility().
export function useAccessibility() {
  const ctx = useContext(AccessibilityContext)

  // Proteção: se alguém tentar usar o hook fora do Provider,
  // lança um erro claro em vez de um bug silencioso (ctx undefined).
  if (!ctx) throw new Error('useAccessibility deve estar dentro de AccessibilityProvider')

  return ctx
}