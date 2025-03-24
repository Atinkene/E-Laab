import React, { useState, useEffect, useRef } from 'react';
import { getEtudiantSoumissions } from '../services/api';
import Chart from 'chart.js/auto'; // Importation de Chart.js

const EtudiantStatistiques = () => {
  const [soumissions, setSoumissions] = useState([]);
  const progressChartRef = useRef(null); // Référence pour le graphique de progression
  const scoreChartRef = useRef(null);   // Référence pour le graphique de scores
  const progressChartInstance = useRef(null); // Instance pour gérer le graphique
  const scoreChartInstance = useRef(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await getEtudiantSoumissions();
      setSoumissions(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques:', error);
    }
  };

  useEffect(() => {
    if (soumissions.length > 0) {
      // Préparer les données pour les graphiques
      const monthlyProgress = calculateMonthlyProgress(soumissions);
      const scoreDistribution = calculateScoreDistribution(soumissions);

      // Détruire les graphiques existants pour éviter les conflits
      if (progressChartInstance.current) {
        progressChartInstance.current.destroy();
      }
      if (scoreChartInstance.current) {
        scoreChartInstance.current.destroy();
      }

      // Graphique de progression des notes
      const progressCtx = progressChartRef.current.getContext('2d');
      progressChartInstance.current = new Chart(progressCtx, {
        type: 'line',
        data: {
          labels: monthlyProgress.labels, // Mois
          datasets: [{
            label: 'Mes notes',
            data: monthlyProgress.data, // Notes moyennes par mois
            borderColor: '#2563eb',
            fill: false,
          }],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              max: 20,
            },
          },
        },
      });

      // Graphique de répartition des scores
      const scoreCtx = scoreChartRef.current.getContext('2d');
      scoreChartInstance.current = new Chart(scoreCtx, {
        type: 'bar',
        data: {
          labels: ['0-10', '11-15', '16-20'],
          datasets: [{
            label: 'Nombre de soumissions',
            data: scoreDistribution,
            backgroundColor: '#2563eb',
          }],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [soumissions]);

  // Calcul de la progression mensuelle des notes
  const calculateMonthlyProgress = (soumissions) => {
    const monthlyData = {};
    soumissions.forEach((s) => {
      if (s.note) {
        const date = new Date(s.created_at);
        const month = date.toLocaleString('fr-FR', { month: 'short' }); // Ex. "janv."
        if (!monthlyData[month]) {
          monthlyData[month] = { total: 0, count: 0 };
        }
        monthlyData[month].total += s.note;
        monthlyData[month].count += 1;
      }
    });

    const labels = Object.keys(monthlyData);
    const data = labels.map((month) => 
      (monthlyData[month].total / monthlyData[month].count).toFixed(1)
    );
    return { labels, data };
  };

  // Calcul de la répartition des scores
  const calculateScoreDistribution = (soumissions) => {
    const ranges = [0, 0, 0]; // [0-10, 11-15, 16-20]
    soumissions.forEach((s) => {
      if (s.note) {
        if (s.note <= 10) ranges[0]++;
        else if (s.note <= 15) ranges[1]++;
        else ranges[2]++;
      }
    });
    return ranges;
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <main className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Statistiques</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-bold mb-2">Progression des notes</h3>
            <canvas ref={progressChartRef} id="progressChart"></canvas>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-bold mb-2">Répartition des scores</h3>
            <canvas ref={scoreChartRef} id="scoreChart"></canvas>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EtudiantStatistiques;