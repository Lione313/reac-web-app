import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext'; // Para acceder al token
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/labortorio.css';

const LaboratoriosPage: React.FC = () => {
  const { token } = useAuth(); // Obtener el token desde el contexto
  const navigate = useNavigate();

  const [laboratorios, setLaboratorios] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentLaboratorio, setCurrentLaboratorio] = useState<any | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false); // Controlar la visibilidad del modal

  // Verificar si el usuario está autenticado
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  // Obtener la lista de laboratorios
  const fetchAllLaboratorios = async () => {
    try {
      const response = await axios.get('http://localhost:3000/laboratorios', {
        headers: {
          Authorization: `Bearer ${token}`, // Enviar el token en las cabeceras
        },
      });
      setLaboratorios(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error al cargar los laboratorios', error);
      setLoading(false);
    }
  };

  // Eliminar un laboratorio
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/laboratorios/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchAllLaboratorios(); // Refrescar la lista después de eliminar
    } catch (error) {
      console.error('Error al eliminar el laboratorio', error);
    }
  };

  // Función para crear un laboratorio
  const createLaboratorio = async (lab: any) => {
    if (!lab.razonSocial || !lab.direccion || !lab.telefono || !lab.email || !lab.contacto) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    try {
      await axios.post('http://localhost:3000/laboratorios', lab, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchAllLaboratorios(); // Refrescar lista de laboratorios
      setCurrentLaboratorio(null); // Limpiar formulario
      setShowModal(false); // Cerrar modal
    } catch (error) {
      console.error('Error al crear el laboratorio', error);
    }
  };

  // Función para actualizar un laboratorio
  const updateLaboratorio = async (lab: any) => {
    if (!lab.razonSocial || !lab.direccion || !lab.telefono || !lab.email || !lab.contacto) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    try {
      await axios.put(`http://localhost:3000/laboratorios/${currentLaboratorio.id}`, lab, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchAllLaboratorios(); // Refrescar lista de laboratorios
      setCurrentLaboratorio(null); // Limpiar formulario
      setShowModal(false); // Cerrar modal
    } catch (error) {
      console.error('Error al actualizar el laboratorio', error);
    }
  };

  // Manejar cambios en el formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentLaboratorio({
      ...currentLaboratorio,
      [name]: value,
    });
  };

  // Función para resetear el formulario al cancelar
  const handleCancel = () => {
    setCurrentLaboratorio(null);
    setShowModal(false); // Cerrar modal cuando se cancela
  };

  useEffect(() => {
    fetchAllLaboratorios();
  }, [token]);

  if (loading) {
    return <p>Cargando laboratorios...</p>;
  }

  return (
    <div className="laboratorios-container">
      <h1>Laboratorios</h1>

      <table>
        <thead>
          <tr>
            <th>Razón Social</th>
            <th>Dirección</th>
            <th>Teléfono</th>
            <th>Email</th>
            <th>Contacto</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {laboratorios.map((lab) => (
            <tr key={lab.id}>
              <td>{lab.razonSocial}</td>
              <td>{lab.direccion}</td>
              <td>{lab.telefono}</td>
              <td>{lab.email}</td>
              <td>{lab.contacto}</td>
              <td>
                <button onClick={() => { setCurrentLaboratorio(lab); setShowModal(true); }}>Editar</button>
                <button onClick={() => handleDelete(lab.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Botón para abrir el modal de crear */}
      <button onClick={() => { setCurrentLaboratorio(null); setShowModal(true); }}>Nuevo Laboratorio</button>

      {/* Modal de creación o edición */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>{currentLaboratorio ? 'Editar Laboratorio' : 'Nuevo Laboratorio'}</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (currentLaboratorio) {
                  updateLaboratorio(currentLaboratorio); // Si estamos editando, llamar a updateLaboratorio
                } else {
                  createLaboratorio(currentLaboratorio || {}); // Si estamos creando, llamar a createLaboratorio
                }
              }}
            >
              <div>
                <label>Razón Social</label>
                <input
                  type="text"
                  name="razonSocial"
                  value={currentLaboratorio?.razonSocial || ''}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Dirección</label>
                <input
                  type="text"
                  name="direccion"
                  value={currentLaboratorio?.direccion || ''}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Teléfono</label>
                <input
                  type="text"
                  name="telefono"
                  value={currentLaboratorio?.telefono || ''}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={currentLaboratorio?.email || ''}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Contacto</label>
                <input
                  type="text"
                  name="contacto"
                  value={currentLaboratorio?.contacto || ''}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <button type="submit">{currentLaboratorio ? 'Actualizar' : 'Agregar'}</button>
                <button type="button" onClick={handleCancel}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LaboratoriosPage;
