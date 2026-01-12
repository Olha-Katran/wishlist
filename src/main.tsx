import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { WishesProvider } from '../src/context/WishesContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WishesProvider>
      <App />
    </WishesProvider>
  </StrictMode>,
)
