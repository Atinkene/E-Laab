import React, { useState, useEffect, useCallback } from 'react';
import { getAllSoumissions, updateSoumission } from '../services/api';

const ProfessseurCorrections = () => {
  const [soumissions, setSoumissions] = useState([]);
  const [sujetId, setSujetId] = useState('');
  const [editing, setEditing] = useState(null);
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  const fetchSoumissions = useCallback(async () => {
    try {
      const response = await getAllSoumissions(sujetId ? { sujet_id: sujetId } : {});
      setSoumissions(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des soumissions:', error);
    }
  }, [sujetId]); // Dépendance : sujetId

  useEffect(() => {
    fetchSoumissions();
  }, [fetchSoumissions]); // Dépendance : fetchSoumissions stabilisée

  const handleUpdate = async (soumission) => {
    try {
      await updateSoumission({
        soumission_id: soumission.id,
        note: soumission.note,
        feedback: soumission.feedback,
      });
      setEditing(null);
      fetchSoumissions();
      alert('Soumission mise à jour avec succès');
    } catch (error) {
      alert('Erreur lors de la mise à jour : ' + error.message);
    }
  };

  const truncateText = (text, maxLength = 50) => {
    if (!text) return 'Aucun feedback';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Tableau de bord professeur</h1>
      
      <div className="mb-4">
        <input
          type="text"
          placeholder="Filtrer par sujet ID"
          value={sujetId}
          onChange={(e) => setSujetId(e.target.value)}
          className="p-2 border rounded w-full max-w-xs"
        />
      </div>

      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Étudiant</th>
            <th className="border p-2">Sujet</th>
            <th className="border p-2">Fichier</th>
            <th className="border p-2">Note</th>
            <th className="border p-2">Feedback</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {soumissions.map((s) => (
            <tr key={s.id}>
              <td className="border p-2">{`${s.prenom} ${s.nom}`}</td>
              <td className="border p-2">{s.sujet_libelle}</td>
              <td className="border p-2">
                <a href={s.fichier} target="_blank" rel="noopener noreferrer" className="text-blue-500">Télécharger</a>
              </td>
              <td className="border p-2">
                {editing === s.id ? (
                  <input
                    type="number"
                    value={s.note || ''}
                    onChange={(e) => setSoumissions(
                      soumissions.map((item) =>
                        item.id === s.id ? { ...item, note: parseInt(e.target.value) || null } : item
                      )
                    )}
                    className="p-1 border rounded w-16"
                  />
                ) : (
                  s.note ?? 'Non noté'
                )}
              </td>
              <td className="border p-2">
                {editing === s.id ? (
                  <input
                    type="text"
                    value={s.feedback || ''}
                    onChange={(e) => setSoumissions(
                      soumissions.map((item) =>
                        item.id === s.id ? { ...item, feedback: e.target.value || null } : item
                      )
                    )}
                    className="p-1 border rounded w-full"
                  />
                ) : (
                  <span>
                    {truncateText(s.feedback)}
                    {s.feedback && s.feedback.length > 50 && (
                      <button
                        onClick={() => setSelectedFeedback(s.feedback)}
                        className="text-blue-500 underline ml-2"
                      >
                        Voir plus
                      </button>
                    )}
                  </span>
                )}
              </td>
              <td className="border p-2">
                {editing === s.id ? (
                  <button
                    onClick={() => handleUpdate(s)}
                    className="bg-green-500 text-white p-1 rounded mr-2"
                  >
                    Sauvegarder
                  </button>
                ) : (
                  <button
                    onClick={() => setEditing(s.id)}
                    className="bg-blue-500 text-white p-1 rounded mr-2"
                  >
                    Modifier
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedFeedback && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full max-h-[80vh] flex flex-col">
            <h2 className="text-xl font-semibold mb-4">Feedback complet</h2>
            <div className="max-h-64 overflow-y-auto mb-4">
              <p>{selectedFeedback}</p>
            </div>
            <button
              onClick={() => setSelectedFeedback(null)}
              className="mt-4 bg-red-500 text-white p-2 rounded w-full"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfessseurCorrections;