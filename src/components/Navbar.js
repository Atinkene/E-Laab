import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role'); // Supposons que le rôle est stocké après la connexion

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Plateforme SGBD
        </Link>
        <div className="space-x-4">
          {token ? (
            <>
              {role === 'PROFESSEUR' && (
                <>
                  <Link to="/professeur/dashboard" className="hover:underline">
                    Tableau de bord
                  </Link>
                  <Link to="/professeur/sujets" className="hover:underline">
                    Créer un sujet
                  </Link>
                  <Link to="/professeur/correction" className="hover:underline">
                    Corrections
                  </Link>
                  <Link to="/professeur/stats" className="hover:underline">
                    Statistiques
                  </Link>
                </>
              )}
              {role === 'ETUDIANT' && (
                <>
                  <Link to="/etudiant/dashboard" className="hover:underline">
                    Tableau de bord
                  </Link>
                  <Link to="/etudiant/soumissions" className="hover:underline">
                    Soumettre une réponse
                  </Link>
                  <Link to="/etudiant/messoumissions" className="hover:underline">
                    Mes soumissions
                  </Link>
                  <Link to="/etudiant/corrections" className="hover:underline">
                    Mes corrections
                  </Link>
                  <Link to="/etudiant/stats" className="hover:underline">
                    Statistiques
                  </Link>
                </>
              )}
              <button onClick={handleLogout} className="hover:underline">
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline">
                Connexion
              </Link>
              <Link to="/inscription" className="hover:underline">
                Inscription
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;