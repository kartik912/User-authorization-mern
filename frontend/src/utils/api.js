import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (email, password) =>
    api.post('/register', { email, password }),
  
  login: (email, password) =>
    api.post('/login', { email, password }),
};

export const projectAPI = {
  getProjects: () => api.get('/projects'),
  
  addProject: (name, uniqueCode) =>
    api.post('/projects', { name, uniqueCode }),
  
  deleteProject: (id) =>
    api.delete(`/projects/${id}`),
};

export default api;