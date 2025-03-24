import React, { useState, useEffect } from 'react';
import { getEtudiantSoumissions } from '../services/api';
import { jwtDecode } from 'jwt-decode';

const MesCorrections = () => {
  const [soumissions, setSoumissions] = useState([]);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      setUserName(`${decoded.prenom} ${decoded.nom}`);
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

  // Fonction pour formater la date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <main className="p-6">
        <h2 className="text-2xl font-semibold mb-6">Vos Corrections et Notes</h2>
        <p className="text-gray-600 mb-4">
          Bienvenue, {userName || 'Étudiant'} ! Voici vos dernières soumissions corrigées automatiquement.
        </p>
        <div className="space-y-6">
          {soumissions.length === 0 ? (
            <p className="text-gray-600">Aucune soumission disponible pour le moment.</p>
          ) : (
            soumissions.map((soumission) => (
              <div key={soumission.id} className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold">Devoir : {soumission.sujet_libelle}</h3>
                  <span className="text-sm text-gray-500">
                    Soumis le {formatDate(soumission.created_at)}
                  </span>
                </div>
                <p className="text-gray-600 mt-2">Professeur : {soumission.professeur_nom || 'Non spécifié'}</p>
                <div className="mt-4">
                  <span className="text-xl font-semibold text-blue-600">
                    Note : {soumission.note ?? 'Non noté'}/20
                  </span>
                </div>
                <div className="mt-4">
                  <h4 className="font-semibold">Feedback de l’IA :</h4>
                  <p className="text-gray-700">
                    {soumission.feedback || 'Aucun feedback disponible pour cette soumission.'}
                  </p>
                </div>
                <a
                  href={soumission.fichier}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-blue-600 hover:underline"
                >
                  Télécharger votre soumission (PDF)
                </a>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default MesCorrections;