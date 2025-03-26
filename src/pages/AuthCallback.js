import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Récupérer le token et le rôle depuis les paramètres d'URL
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const role = params.get('role');

    if (token && role) {
      // Stocker le token et le rôle dans localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      // Rediriger en fonction du rôle
      if (role === 'ETUDIANT') {
        navigate('/etudiant/dashboard');
      } else if (role === 'PROFESSEUR') {
        navigate('/professeur/dashboard');
      } else {
        navigate('/login');
      }
    } else {
      // Si le token ou le rôle est manquant, rediriger vers la page de connexion
      navigate('/login');
    }
  }, [navigate, location]);

  return <div>Redirection en cours...</div>;
};

export default AuthCallback;