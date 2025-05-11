import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';  // Importar el contexto de autenticación
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import  '../styles/home.css';

const Home: React.FC = () => {
  const { token } = useAuth(); // Obtener el token del contexto
  const navigate = useNavigate();

  // Estados para manejar los datos de los laboratorios y medicamentos
  const [laboratorios, setLaboratorios] = useState([]);
  const [medicamentos, setMedicamentos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Verificamos si el usuario está autenticado
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  // Fetch de los datos de laboratorios y medicamentos
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Si el token está presente, lo incluimos en las cabeceras de las solicitudes
        const config = {
          headers: {
            Authorization: `Bearer ${token}` // Pasamos el token en las cabeceras como Bearer token
          }
        };

        const [laboratoriosResponse, medicamentosResponse] = await Promise.all([
          axios.get('http://localhost:3000/laboratorios', config),  // Incluir token en la solicitud
          axios.get('http://localhost:3000/medicamentos', config)   // Incluir token en la solicitud
        ]);

        setLaboratorios(laboratoriosResponse.data);
        setMedicamentos(medicamentosResponse.data);
        setLoading(false); // Al finalizar la carga
      } catch (error) {
        console.error('Error al cargar los datos', error);
      }
    };

    fetchData();
  }, [token]); // Dependemos del token para hacer las peticiones

  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="home-container">
      <h1>Bienvenido a la página de inicio</h1>

      <div className="cards-container">
        {/* Cards de Laboratorios */}
        <div className="cards-section">
          <h2>Laboratorios</h2>
          <div className="cards">
            {laboratorios.map((lab: any) => (
              <div key={lab.id} className="card">
                <h3>{lab.razonSocial}</h3>
                <p>{lab.direccion}</p>
                <button onClick={() => navigate(`/laboratorio/${lab.id}`)}>Ver detalles</button>
              </div>
            ))}
          </div>
        </div>

        {/* Cards de Medicamentos */}
        <div className="cards-section">
          <h2>Medicamentos</h2>
          <div className="cards">
            {medicamentos.map((medicamento: any) => (
              <div key={medicamento.id} className="card">
                <h3>{medicamento.descripcionMed}</h3>
                <p>{medicamento.presentacion}</p>
                <button onClick={() => navigate(`/medicamento/${medicamento.id}`)}>Ver detalles</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
