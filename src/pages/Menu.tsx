import React from 'react';
import { useAuth } from '../context/AuthContext';

const Menu: React.FC = () => {
  const { role } = useAuth();

  return (
    <div>
      <h2>Menú Principal</h2>
      {role === 'admin' && <div>Bienvenido Administrador</div>}
      {role === 'moderator' && <div>Bienvenido Moderador</div>}
      {role === 'user' && <div>Bienvenido Usuario</div>}
    </div>
  );
};

export default Menu;
