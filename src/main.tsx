import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Generator from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Generator />
  </StrictMode>,
)
