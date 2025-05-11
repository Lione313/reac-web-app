import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import { AuthProvider, useAuth } from './context/AuthContext'; // Importar el contexto
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <App />
  </AuthProvider>,
)
