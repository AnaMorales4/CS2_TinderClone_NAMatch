import axios from 'axios';

const API = import.meta.env.VITE_API_URL;

export const loginUser = async (email, password) => {
  const response = await axios.post(`${API}/login`, { email, password });
  return response.data;
};
export const registerUser = async (userData) => {
    const response = await axios.post(`${API}/register`, userData);
    return response.data;
  };