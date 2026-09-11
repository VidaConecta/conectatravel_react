// TypeScript não conhece a variável global "VLibras" que o script
// externo injeta no window. Esse bloco "declara" ela pro compilador

import { useEffect } from "react"

// não reclamar de tipo desconhecido quando usarmos window.VLibras.
declare global {
  interface Window {
    VLibras?: {
      Widget: new (url: string) => void
    }
  }
}

function VLibrasWidget() {
  // useEffect com array vazio [] = roda só UMA vez, quando o componente
  // é montado pela primeira vez (igual um componentDidMount)
  useEffect(() => {
    // Evita duplicar o script caso o componente seja remontado
    // (ex: navegação entre rotas se ele não estiver 100% no topo da árvore)
    if (document.getElementById('vlibras-script')) return

    // Cria a tag <script> dinamicamente e aponta pro CDN oficial do governo
    const script = document.createElement('script')
    script.id = 'vlibras-script'
    script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js'
    script.async = true // não bloqueia o carregamento da página

    // Quando o script terminar de carregar, inicializa o widget
    // passando a URL de onde ele deve buscar os recursos (avatar 3D, etc)
    script.onload = () => {
      if (window.VLibras) {
        new window.VLibras.Widget('https://vlibras.gov.br/app')
      }
    }

    // Insere o script no final do <body> pra ele começar a carregar
    document.body.appendChild(script)
  }, [])

  // Cast pra "any" só aqui: o VLibras exige atributos HTML customizados
  // (vw, vw-access-button, vw-plugin-wrapper) que não existem no
  // padrão HTML e o TypeScript não reconhece. Como é uma exigência
  // de uma biblioteca externa (não um erro nosso), isolamos o
  // "escape" do sistema de tipos só nesse componente específico.
  const vlibrasProps = {
    vw: 'true',
    className: 'enabled',
  } as React.HTMLAttributes<HTMLDivElement>

  return (
    <div>
      <div {...vlibrasProps}>
        <div
          {...({ 'vw-access-button': 'true', className: 'active' } as React.HTMLAttributes<HTMLDivElement>)}
        />
        <div
          {...({ 'vw-plugin-wrapper': 'true' } as React.HTMLAttributes<HTMLDivElement>)}
        >
          <div className="vw-plugin-top-wrapper" />
        </div>
      </div>
    </div>
  )
}

export default VLibrasWidget