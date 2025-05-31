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

export const getMatchesByUserId= async (currentId) => {
  const response = await axios.get(`${API}/users/${currentId}/matches`);
  return response.data;
};

export const giveLike = async (targetId, currentId) => {
  await axios.post(`${API}/users/${targetId}/like`, { userId: currentId });
};

//Quitar like (dislike)
export const removeLike = async (targetId, currentId) => {
  await axios.post(`${API}/users/${targetId}/dislike`, { userId: currentId });
};

//si ya le diste like cambiar estado
export const hasLiked = async (targetId, currentId) => {
  const user = await getUserById(currentId);
  return user.swipes.includes(targetId);
};
