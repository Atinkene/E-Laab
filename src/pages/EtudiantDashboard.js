import React, { useState, useEffect } from 'react';
import { getEtudiantSoumissions,  } from '../services/api';
import { jwtDecode } from 'jwt-decode';

const EtudiantDashboard = () => {
  const [soumissions, setSoumissions] = useState([]);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      setUserName(`${decoded.prenom} ${decoded.nom}`); // Supposant que prenom et nom sont dans le token
    }
    fetchSoumissions();
  }, []);

  const fetchSoumissions = async () => {
    try {
      const response = await getEtudiantSoumissions();
      setSoumissions(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des soumissions:', error);
    }
  };

 


  // Calculs pour les cartes
  const pendingExercises = soumissions.filter(s => !s.note).length;
  const lastNote = soumissions.length > 0 ? `${soumissions[0].note ?? 'Non noté'}/20` : 'Aucune note';
  const progression = '+5%'; // À calculer dynamiquement si données disponibles

  return (
    <main className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Bienvenue, {userName || 'Étudiant'}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-bold">Exercices en attente</h3>
          <p className="text-gray-600">{pendingExercises} exercices à soumettre</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-bold">Dernière note</h3>
          <p className="text-gray-600">{lastNote}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-bold">Progression</h3>
          <p className="text-gray-600">{progression} ce mois-ci</p>
        </div>
      </div>

    </main>
  );
};

export default EtudiantDashboard;