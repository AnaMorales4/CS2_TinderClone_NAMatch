import axios from 'axios';

const API = import.meta.env.VITE_API_URL;

// Obtener perfil por ID
export const getUserById = async (id) => {
  const response = await axios.get(`${API}/users/${id}`);
  return response.data;
};

// Actualizar perfil por ID
export const updateUser = async (id, userData) => {
  const response = await axios.put(`${API}/users/${id}`, userData);
  return response.data;
};

export const getAllUsers= async () => {
  const response = await axios.get(`${API}/users`);
  return response.data;
};


