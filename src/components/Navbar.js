import React, { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import NavbarProfesseur from './NavbarProfesseur';
import NavbarEtudiant from './NavbarEtudiant';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [role, setRole] = useState(null);

  const token = localStorage.getItem('token');
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setRole(decoded.role);
      } catch (error) {
        console.error('Erreur lors du décodage du token:', error);
      }
    }
  }, []);
   const navigate = useNavigate();

  if (!role && !token) {
   navigate('/');
   return null;
  }

  return role === 'PROFESSEUR' ? <NavbarProfesseur /> : <NavbarEtudiant />;
};

export default Navbar;