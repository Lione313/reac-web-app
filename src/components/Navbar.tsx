import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaSignOutAlt, FaBars } from 'react-icons/fa';

import '../styles/navbar.css';

const Navbar: React.FC = () => {
  const { token, role, logout } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setShowModal(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" className="navbar-item">LeoTeck</Link>
      </div>

      <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
        <Link to="/" className="navbar-item">Inicio</Link>
        <Link to="/laboratorios" className="navbar-item">Laboratorios</Link> {/* Cambiar a /laboratorios */}
        <Link to="/medicamentos" className="navbar-item">Medicamentos</Link>

        {token ? (
          <button className="navbar-button" onClick={() => setShowModal(true)}>
            <FaSignOutAlt size={20} color="white" />
          </button>
        ) : (
          <>
            <Link to="/login" className="navbar-item">Iniciar sesión</Link>
            <Link to="/register" className="navbar-item">Registrar</Link>
          </>
        )}
      </div>

      <div className="navbar-hamburger" onClick={toggleMenu}>
        <FaBars size={30} color="white" />
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>¿Seguro que quieres cerrar sesión?</p>
            <button onClick={handleLogout}>Sí</button>
            <button onClick={() => setShowModal(false)}>Cancelar</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
