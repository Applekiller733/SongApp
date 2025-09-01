import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'


//STRICT MODE DOUBLE RENDERS COMPS IN DEV
createRoot(document.getElementById('root')!).render(
    <App />
)
