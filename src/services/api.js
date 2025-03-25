import axios from 'axios';

const API_URL = "https://dbplateformebackend.up.railway.app/api";

const api = axios.create({
  baseURL: API_URL,
});

// Intercepteur pour ajouter dynamiquement l'en-tête Authorization
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour logger les erreurs de réponse
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Erreur lors de la requête API:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const registerProfesseur = (data) =>
  api.post('/professeur/register', data);

export const registerEtudiant = (data) =>
  api.post('/etudiant/register', data);

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