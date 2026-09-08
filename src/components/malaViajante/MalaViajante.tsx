import { useEffect, useRef, useState } from 'react'

interface MalaViajanteProps {
  olhosFechados?: boolean
  triste?: boolean
}

function MalaViajante({ olhosFechados = false, triste = false }: MalaViajanteProps) {
  const malaRef = useRef<HTMLDivElement>(null)
  const [pupila, setPupila] = useState({ x: 0, y: 0 })

  useEffect(() => {
    function seguirCursor(e: MouseEvent) {
      const elemento = malaRef.current
      if (!elemento) return

      const rect = elemento.getBoundingClientRect()
      const centroX = rect.left + rect.width / 2
      const centroY = rect.top + rect.height / 2

      const deltaX = e.clientX - centroX
      const deltaY = e.clientY - centroY

      const distanciaMaxima = 6
      const distancia = Math.min(distanciaMaxima, Math.hypot(deltaX, deltaY) / 30)
      const angulo = Math.atan2(deltaY, deltaX)

      setPupila({
        x: Math.cos(angulo) * distancia,
        y: Math.sin(angulo) * distancia,
      })
    }

    window.addEventListener('mousemove', seguirCursor)
    return () => window.removeEventListener('mousemove', seguirCursor)
  }, [])

  return (
    <div ref={malaRef} className="pointer-events-none w-full max-w-sm select-none drop-shadow-[0_30px_50px_rgba(0,0,0,0.3)]">
      <svg viewBox="0 0 300 420" xmlns="http://www.w3.org/2000/svg" className="w-full">
        <defs>
          <linearGradient id="malaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F4F8FF" stopOpacity="0.92" />
            <stop offset="55%" stopColor="#C9DDF5" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#93B8E8" stopOpacity="0.88" />
          </linearGradient>
          <linearGradient id="malaSombra" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0F3E82" stopOpacity="0" />
            <stop offset="100%" stopColor="#0F3E82" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        <ellipse cx="150" cy="398" rx="95" ry="14" fill="#0B1F3A" opacity="0.16" />

        <rect x="124" y="14" width="14" height="50" rx="7" fill="#8FA8C9" />
        <rect x="162" y="14" width="14" height="50" rx="7" fill="#8FA8C9" />
        <path
          d="M 122 26 Q 150 6 178 26"
          fill="none"
          stroke="#5B7BA8"
          strokeWidth="14"
          strokeLinecap="round"
        />
        <path
          d="M 122 26 Q 150 6 178 26"
          fill="none"
          stroke="#8FA8C9"
          strokeWidth="8"
          strokeLinecap="round"
        />

        <rect x="10" y="150" width="18" height="46" rx="9" fill="#8FA8C9" />
        <rect x="14" y="158" width="10" height="30" rx="5" fill="#5B7BA8" />

        <rect x="48" y="66" width="204" height="300" rx="34" fill="url(#malaGrad)" />
        <rect x="48" y="270" width="204" height="96" rx="34" fill="url(#malaSombra)" />
        <rect x="48" y="66" width="204" height="300" rx="34" fill="none" stroke="#ffffff" strokeOpacity="0.7" strokeWidth="2.5" />

        <circle cx="74" cy="92" r="12" fill="#5B7BA8" opacity="0.35" />
        <circle cx="226" cy="92" r="12" fill="#5B7BA8" opacity="0.35" />
        <circle cx="74" cy="340" r="12" fill="#5B7BA8" opacity="0.35" />
        <circle cx="226" cy="340" r="12" fill="#5B7BA8" opacity="0.35" />

        <rect x="60" y="330" width="30" height="30" rx="9" fill="#172B4D" opacity="0.85" />
        <circle cx="75" cy="362" r="14" fill="#0B1F3A" />
        <circle cx="75" cy="362" r="6" fill="#3A4E6E" />

        <rect x="210" y="330" width="30" height="30" rx="9" fill="#172B4D" opacity="0.85" />
        <circle cx="225" cy="362" r="14" fill="#0B1F3A" />
        <circle cx="225" cy="362" r="6" fill="#3A4E6E" />

        {triste ? (
          <g>
            <path d="M 90 148 Q 105 140 122 148" stroke="#172B4D" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.6" />
            <path d="M 178 148 Q 195 140 210 148" stroke="#172B4D" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.6" />
            <path d="M 96 182 Q 106 194 116 182" stroke="#172B4D" strokeWidth="8" fill="none" strokeLinecap="round" />
            <path d="M 184 182 Q 194 194 204 182" stroke="#172B4D" strokeWidth="8" fill="none" strokeLinecap="round" />
            <path d="M 98 190 L 90 197 M 104 194 L 98 202" stroke="#172B4D" strokeWidth="3" strokeLinecap="round" />
            <path d="M 202 190 L 210 197 M 196 194 L 202 202" stroke="#172B4D" strokeWidth="3" strokeLinecap="round" />
            <path d="M 145 205 Q 150 218 155 205" stroke="#172B4D" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.55" />
            <path d="M 118 244 Q 150 224 182 244" stroke="#172B4D" strokeWidth="7" fill="none" strokeLinecap="round" />
            <path d="M 100 200 Q 93 216 100 226 Q 107 216 100 200" fill="#BEE3FF" />
          </g>
        ) : olhosFechados ? (
          <g>
            <path d="M 90 148 Q 105 140 122 148" stroke="#172B4D" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.6" />
            <path d="M 178 148 Q 195 140 210 148" stroke="#172B4D" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.6" />
            <path d="M 88 186 Q 106 200 124 186" stroke="#172B4D" strokeWidth="8" fill="none" strokeLinecap="round" />
            <path d="M 176 186 Q 194 200 212 186" stroke="#172B4D" strokeWidth="8" fill="none" strokeLinecap="round" />
            <path d="M 145 205 Q 150 218 155 205" stroke="#172B4D" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.55" />
            <path d="M 122 238 Q 150 258 178 238" stroke="#172B4D" strokeWidth="7" fill="none" strokeLinecap="round" />
          </g>
        ) : (
          <g>
            <path d="M 90 148 Q 105 138 123 147" stroke="#172B4D" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.6" />
            <path d="M 177 147 Q 195 138 210 148" stroke="#172B4D" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.6" />

            <path d="M 90 180 L 82 172 M 92 186 L 82 183 M 96 191 L 88 194" stroke="#172B4D" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
            <path d="M 210 180 L 218 172 M 208 186 L 218 183 M 204 191 L 212 194" stroke="#172B4D" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />

            <circle cx="106" cy="188" r="24" fill="#ffffff" />
            <circle cx="194" cy="188" r="24" fill="#ffffff" />
            <circle cx={106 + pupila.x} cy={188 + pupila.y} r="12" fill="#3A7BD5" />
            <circle cx={106 + pupila.x} cy={188 + pupila.y} r="6" fill="#172B4D" />
            <circle cx={194 + pupila.x} cy={188 + pupila.y} r="12" fill="#3A7BD5" />
            <circle cx={194 + pupila.x} cy={188 + pupila.y} r="6" fill="#172B4D" />
            <circle cx={103 + pupila.x} cy={183 + pupila.y} r="3" fill="#ffffff" />
            <circle cx={191 + pupila.x} cy={183 + pupila.y} r="3" fill="#ffffff" />

            <path d="M 145 205 Q 150 220 155 205" stroke="#172B4D" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.55" />

            <path d="M 122 238 Q 150 258 178 238" stroke="#172B4D" strokeWidth="7" fill="none" strokeLinecap="round" />
          </g>
        )}
      </svg>
    </div>
  )
}

export default MalaViajante