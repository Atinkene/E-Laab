import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import ProfesseurDashboard from './pages/ProfesseurDashboard';
import ProfessseurCorrections from './pages/ProfessseurCorrections';
import ProfesseurStatistiques from './pages/ProfesseurStatistiques';
import EtudiantStatistiques from './pages/EtudiantStatistiques';
import EtudiantDashboard from './pages/EtudiantDashboard';
import EtudiantSoumissions from './pages/MesSoumissions';
import MesCorrections from './pages/MesCorrections';
import SujetForm from './pages/SujetForm';
import SoumissionForm from './pages/SoumissionForm';
import AuthCallback from './pages/AuthCallback';

// Interface pour les props des layouts
interface LayoutProps {
  children: React.ReactNode;
}

// Layout pour les pages avec barre de navigation
const PrivateLayout = ({ children }: LayoutProps) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  // Vérifier si l'utilisateur est authentifié
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // Vérifier le rôle pour les routes professeur
  if (window.location.pathname.startsWith('/professeur') && role !== 'PROFESSEUR') {
    return <Navigate to="/" replace />;
  }

  // Vérifier le rôle pour les routes étudiant
  if (window.location.pathname.startsWith('/etudiant') && role !== 'ETUDIANT') {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      {children}
    </div>
  );
};

// Layout pour les pages sans barre de navigation
const PublicLayout = ({ children }: LayoutProps) => {
  const token = localStorage.getItem('token');

  // Si l'utilisateur est authentifié, rediriger vers le tableau de bord
  if (token) {
    const role = localStorage.getItem('role');
    if (role === 'PROFESSEUR') {
      return <Navigate to="/professeur/dashboard" replace />;
    } else if (role === 'ETUDIANT') {
      return <Navigate to="/etudiant/dashboard" replace />;
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {children}
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Pages publiques sans Navbar */}
        <Route path="/" element={<PublicLayout><Login /></PublicLayout>} />
        <Route path="/etudiant" element={<PublicLayout><Login /></PublicLayout>} />
        <Route path="/professeur" element={<PublicLayout><Login /></PublicLayout>} />
        <Route path="/inscription" element={<PublicLayout><Register /></PublicLayout>} />

        {/* Pages privées avec Navbar */}
        <Route path="/professeur/dashboard" element={<PrivateLayout><ProfesseurDashboard /></PrivateLayout>} />
        <Route path="/professeur/correction" element={<PrivateLayout><ProfessseurCorrections /></PrivateLayout>} />
        <Route path="/professeur/stats" element={<PrivateLayout><ProfesseurStatistiques /></PrivateLayout>} />
        <Route path="/etudiant/stats" element={<PrivateLayout><EtudiantStatistiques /></PrivateLayout>} />
        <Route path="/professeur/sujets" element={<PrivateLayout><SujetForm /></PrivateLayout>} />
        <Route path="/etudiant/dashboard" element={<PrivateLayout><EtudiantDashboard /></PrivateLayout>} />
        <Route path="/etudiant/soumissions" element={<PrivateLayout><SoumissionForm /></PrivateLayout>} />
        <Route path="/etudiant/messoumissions" element={<PrivateLayout><EtudiantSoumissions /></PrivateLayout>} />
        <Route path="/etudiant/corrections" element={<PrivateLayout><MesCorrections /></PrivateLayout>} />
        <Route path="/auth/callback" element={<PrivateLayout><AuthCallback /></PrivateLayout>} />

        {/* Page 404 */}
        <Route path="*" element={<PublicLayout><div>404 - Page non trouvée</div></PublicLayout>} />
      </Routes>
    </Router>
  );
}

export default App;