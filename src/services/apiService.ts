import axios from 'axios';

const API_URL = 'http://localhost:3000'; // La URL base de la API

// Servicio para realizar login
export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data; // Retorna los datos de la respuesta (puede incluir token, role, etc.)
  } catch (error) {
    throw new Error('Error al iniciar sesión');
  }
};

// Servicio para registrar un nuevo usuario
export const register = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { email, password });
    return response.data; // Retorna los datos de la respuesta (puede incluir token, role, etc.)
  } catch (error) {
    throw new Error('Error al registrar el usuario');
  }
};
