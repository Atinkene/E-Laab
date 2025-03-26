import React, { useEffect } from 'react'; // Added useEffect
import { Link, useNavigate } from 'react-router-dom';

const NavbarProfesseur = () => {
  const navigate = useNavigate();

  // Check authentication status on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      // If no token is found, redirect to login page
      navigate('/');
    }
  }, [navigate]); // Dependency array includes navigate

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="flex items-center">
        <img
          src="https://fad.esp.sn/pluginfile.php/1/theme_moove/logo/1709829106/senegal-ucad.png"
          alt="Logo ESP"
          className="h-12 mr-4"
        />
        <h1 className="text-xl font-bold">Plateforme Bases de Données</h1>
      </div>
      <nav className="mt-2 flex justify-between items-center">
        <div>
          <Link to="/professeur/dashboard" className="text-white hover:underline mr-4">Accueil</Link>
          <Link to="/professeur/sujets" className="text-white hover:underline mr-4">Créer un sujet</Link>
          <Link to="/professeur/correction" className="text-white hover:underline mr-4">Corrections</Link>
          <Link to="/professeur/stats" className="text-white hover:underline">Statistiques</Link>
        </div>
        <button onClick={handleLogout} className="text-white hover:underline">
          Déconnexion
        </button>
      </nav>
    </header>
  );
};

export default NavbarProfesseur;