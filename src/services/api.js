import axios from 'axios';

// Use environment variable for API URL, with fallback
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
// const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

// Request interceptor to add Authorization header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    console.error('Erreur lors de la requête API:', error.response?.data || error.message);

    // Handle specific status codes (e.g., 401 for unauthorized)
    if (status === 401) {
      localStorage.removeItem('token'); // Clear invalid token
      // Note: Can't use navigate() here directly since this isn’t a component
      // Components using this API should handle navigation on 401
    }

    return Promise.reject(error);
  }
);

// API Functions
export const registerProfesseur = (data) => api.post('/professeur/register', data);

export const registerEtudiant = (data) => api.post('/etudiant/register', data);

export const createSujet = (formData) =>
  api.post('/professeur/sujets', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const submitReponse = (formData) =>
  api.post('/etudiant/soumissions', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const getProfesseurs = () => api.get('/professeur');

export const getEtudiants = () => api.get('/etudiant');

export const getAllSoumissions = (params) => api.get('/professeur/soumissions', { params });

export const updateSoumission = (data) => api.put('/professeur/soumissions', data);

export const getEtudiantSoumissions = () => api.get('/etudiant/messoumissions');

export const getSujetsDisponibles = () => api.get('/etudiant/sujetsdisponibles');

export default api;