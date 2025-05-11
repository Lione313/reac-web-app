import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext'; // Importar el contexto
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Menu from './pages/Menu';
import LaboratoriosPage from './pages/LaboratorioPage'; // Página de laboratorios

import './styles/index.css'; 
import './App.css';

// Componente principal que usa el contexto de autenticación
const App: React.FC = () => {
  const { token } = useAuth(); // Obtener el token del contexto

  return (
    <AuthProvider>
      <Router>
        {/* Solo mostrar el Navbar y Footer si el usuario está autenticado */}
        {token && <Navbar />}

        <Routes>
          <Route path="/" element={<Home />} />
          
          {/* Rutas accesibles solo si el usuario NO está autenticado */}
          {!token && <Route path="/login" element={<Login />} />}
          {!token && <Route path="/register" element={<Register />} />}

          {/* Rutas accesibles solo si el usuario está autenticado */}
          {token && <Route path="/menu" element={<Menu />} />}
          {token && <Route path="/laboratorios" element={<LaboratoriosPage />} />}
        </Routes>
        
        {/* Solo mostrar el Footer si el usuario está autenticado */}
        {token && <Footer />}
      </Router>
    </AuthProvider>
  );
};

export default App;
