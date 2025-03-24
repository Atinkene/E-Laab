import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
// ...

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/inscription" element={<Register />} />
        </Routes>
        <Navbar />
        <Routes>
        <Route path="/professeur/dashboard" element={<ProfesseurDashboard />} />
        <Route path="/professeur/correction" element={<ProfessseurCorrections />} />
        <Route path="/professeur/stats" element={<ProfesseurStatistiques />} />
        <Route path="/etudiant/stats" element={<EtudiantStatistiques />} />
          <Route path="/professeur/sujets" element={<SujetForm />} />
          <Route path="/etudiant/dashboard" element={<EtudiantDashboard />} />
          <Route path="/etudiant/soumissions" element={<SoumissionForm />} />
          <Route path="/etudiant/messoumissions" element={<EtudiantSoumissions />} />
          <Route path="/etudiant/corrections" element={<MesCorrections />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;