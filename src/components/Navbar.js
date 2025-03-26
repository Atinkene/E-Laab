import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import NavbarProfesseur from './NavbarProfesseur';
import NavbarEtudiant from './NavbarEtudiant';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [role, setRole] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/'); // Rediriger si pas de token
      return;
    }

    try {
      const decoded = jwtDecode(token);
      setRole(decoded.role);
    } catch (error) {
      console.error('Erreur lors du décodage du token:', error);
      navigate('/'); // Rediriger en cas d'erreur de décodage (token invalide)
    }
  }, [token, navigate]); // Dépendances : token et navigate

  // Ne rien rendre tant que le rôle n'est pas déterminé
  if (!role) {
    return null;
  }

  return role === 'PROFESSEUR' ? <NavbarProfesseur /> : <NavbarEtudiant />;
};

export default Navbar;