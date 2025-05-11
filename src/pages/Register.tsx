import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/apiService';
import '../styles/login.css'; // Reutilizamos los estilos

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Por favor, complete todos los campos');
      return;
    }

    try {
      await register(email, password);
      navigate('/login');
    } catch (err) {
      setError('Hubo un error al registrar el usuario');
    }
  };

  const meteoros = Array.from({ length: 10 }, (_, i) => (
    <div key={i} className="meteoro" />
  ));

  return (
    <div className="login-container">
      {meteoros}
      <div className="login-overlay"></div>
      <div className="login-box">
        <h2 className="login-title">Registrarse</h2>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
          />
          <div className="input-password-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
            />
            <span
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? '🙈' : '👁️'}
            </span>
          </div>
          <button type="submit" className="login-btn">
            Registrarse
          </button>
        </form>
        <div className="link-wrapper">
          <a href="/login" className="link">¿Ya tienes cuenta? Inicia sesión</a>
        </div>
      </div>
    </div>
  );
};

export default Register;
