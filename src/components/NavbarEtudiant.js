import { Link, useNavigate } from 'react-router-dom';

const NavbarEtudiant = () => {
  const navigate = useNavigate();

 
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
          <Link to="/etudiant/dashboard" className="text-white hover:underline mr-4">Accueil</Link>
          <Link to="/etudiant/soumissions" className="text-white hover:underline mr-4">Déposer un exercice</Link>
          <Link to="/etudiant/messoumissions" className="text-white hover:underline mr-4 relative">
            Mes soumissions
            
          </Link>
          <Link to="/etudiant/corrections" className="text-white hover:underline mr-4 relative">
            Correction
            
          </Link>
          <Link to="/etudiant/stats" className="text-white hover:underline">Statistiques</Link>
        </div>
        <button onClick={handleLogout} className="text-white hover:underline">
          Déconnexion
        </button>
      </nav>
    </header>
  );
};

export default NavbarEtudiant;