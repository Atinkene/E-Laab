import React, { useState, useEffect } from 'react';
import { getAllSoumissions } from '../services/api';

const ProfesseurDashboard = () => {
  const [soumissions, setSoumissions] = useState([]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await getAllSoumissions();
      setSoumissions(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques:', error);
    }
  };

  const totalSoumissions = soumissions.length;
  const averageGrade =
    soumissions.length > 0
      ? (soumissions.reduce((sum, s) => sum + (s.note || 0), 0) / soumissions.filter(s => s.note).length).toFixed(1)
      : 'N/A';
  const pendingCorrections = soumissions.filter(s => !s.note).length;

  return (
    <div className="bg-gray-100 min-h-screen">
      <main className="p-6">
        <h1 className="text-2xl font-bold mb-4">Tableau de bord professeur</h1>
        <p className="text-gray-600 mb-4">Voici un aperçu des performances et activités des étudiants.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-bold">Total des soumissions</h3>
            <p className="text-gray-600 text-2xl">{totalSoumissions}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-bold">Moyenne des notes</h3>
            <p className="text-gray-600 text-2xl">{averageGrade}/20</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-bold">Corrections en attente</h3>
            <p className="text-gray-600 text-2xl">{pendingCorrections}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfesseurDashboard;