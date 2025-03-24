import React, { useState, useEffect } from 'react';
import { getEtudiantSoumissions,  } from '../services/api';
import { jwtDecode } from 'jwt-decode';

const MesSoumissions = () => {
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

 

  return (
    <main className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Bienvenue, {userName || 'Étudiant'}</h2>
      

      {/* Tableau des soumissions */}
      <h2 className="text-xl font-semibold mb-2">Mes soumissions</h2>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Sujet</th>
            <th className="border p-2">Fichier</th>
            <th className="border p-2">Note</th>
          </tr>
        </thead>
        <tbody>
          {soumissions.map((s) => (
            <tr key={s.id}>
              <td className="border p-2">{s.sujet_libelle}</td>
              <td className="border p-2">
                <a href={s.fichier} target="_blank" rel="noopener noreferrer" className="text-blue-500">Télécharger</a>
              </td>
              <td className="border p-2">{s.note ?? 'Non noté'}</td>
             
            </tr>
          ))}
        </tbody>
      </table>

    </main>
  );
};

export default MesSoumissions;