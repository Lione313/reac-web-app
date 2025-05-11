import React from 'react';
import '../styles/footer.css';
const Footer: React.FC = () => {
  return (
  <footer className="footer">
      <p className="footer-text">© {new Date().getFullYear()} Mi Farmacia | Todos los derechos reservados</p>
    </footer>
  );
};

export default Footer;
