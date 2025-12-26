import axios from 'axios';

// Use environment variable for API URL, fallback to deployed backend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://real-time-chat-application-hxoe.onrender.com';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authAPI = {
  login: async (name, password) => {
    const response = await api.post('/chatapp/login', { name, password });
    return response.data;
  },
  
  register: async (name, email, password) => {
    const response = await api.post('/chatapp/register', { name, email, password });
    return response.data;
  },
};

export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('token', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
  }
};

export const getAuthToken = () => {
  return localStorage.getItem('token');
};

export const removeAuthToken = () => {
  localStorage.removeItem('token');
  delete api.defaults.headers.common['Authorization'];
};

