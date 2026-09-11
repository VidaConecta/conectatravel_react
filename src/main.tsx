import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'
import App from './App.tsx'
import { AccessibilityProvider } from './contexts/acessibilidade/AcessibilidadeContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AccessibilityProvider>
    <App />
    </AccessibilityProvider>
  </StrictMode>,
)