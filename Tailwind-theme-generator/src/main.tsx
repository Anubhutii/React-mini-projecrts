import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { StyleProvider } from './Context/StyleContext'
import { AnimationProvider } from './Context/AnimationContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AnimationProvider>
      <StyleProvider>
        <App />
      </StyleProvider>
    </AnimationProvider>
  </StrictMode>,
)
