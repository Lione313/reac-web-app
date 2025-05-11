import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { login as loginService } from '../services/apiService';
import '../styles/login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Por favor, complete todos los campos');
      return;
    }

    try {
      const response = await loginService(email, password);
      login(response.token, response.role);
      navigate('/');
    } catch (err) {
      setError('Credenciales incorrectas');
    }
  };

 

  return (
    <div className="login-container">
      {/* Meteoros animados */}
     <div className="meteoro-container">
  {[...Array(20)].map((_, i) => (
    <div key={i} className="meteoro"></div>
  ))}
</div>



      <div className="login-overlay"></div>
      <div className="login-box">
        <h2 className="login-title">Iniciar sesión</h2>
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
            Iniciar sesión
          </button>
        </form>
        <div className="link-wrapper">
          <a href="/forgot-password" className="link">Olvidé mi contraseña</a>
          <a href="/register" className="link">Registrarse</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
