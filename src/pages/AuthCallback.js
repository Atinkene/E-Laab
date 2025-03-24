import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const AuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      localStorage.setItem('token', token);
      axios.get('http://localhost:5000/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      }).then(response => {
        const { role } = response.data;
        
        navigate(role === 'PROFESSEUR' ? '/professeur/dashboard' : '/etudiant/dashboard');
      }).catch(() => navigate('/'));
    }
  }, [searchParams, navigate]);

  return <div>Authentification en cours...</div>;
};

export default AuthCallback;