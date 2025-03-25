import axios from 'axios';
require('dotenv').config();
const API_URL = "https://dbplateformebackend.up.railway.app";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
  },
});

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
