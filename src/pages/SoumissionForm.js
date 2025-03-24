import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import FileUpload from '../components/FileUpload';
import { submitReponse, getSujetsDisponibles } from '../services/api';

const SoumissionForm = () => {
  const [sujetId, setSujetId] = useState(''); // Seulement sujet_id dans le state visible
  const [sujets, setSujets] = useState([]);
  const [file, setFile] = useState(null);
  const [evaluation, setEvaluation] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [etudiantId, setEtudiantId] = useState(''); // ID extrait du token

  useEffect(() => {
    // Récupérer l'ID de l'étudiant depuis le token
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setEtudiantId(decoded.id); // Stocke l'ID dans un state séparé
      } catch (err) {
        console.error('Erreur lors du décodage du token:', err);
        navigate('/'); // Rediriger si token invalide
      }
    } else {
      navigate('/'); // Rediriger si pas de token
    }

    // Récupérer les sujets disponibles
    fetchSujetsDisponibles();
  }, [navigate]);

  const fetchSujetsDisponibles = async () => {
    try {
      const response = await getSujetsDisponibles();
      setSujets(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Erreur lors de la récupération des sujets');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('Veuillez sélectionner un fichier.');
      return;
    }
    if (!sujetId) {
      alert('Veuillez sélectionner un sujet.');
      return;
    }

    const data = new FormData();
    data.append('etudiant_id', etudiantId); // ID automatique depuis le token
    data.append('sujet_id', sujetId);
    data.append('file', file);

    try {
      const response = await submitReponse(data);
      setEvaluation(response.data.evaluation);
      alert('Soumission envoyée : ' + response.data.fileUrl);
      setSujetId(''); // Réinitialiser le sujet après soumission
      fetchSujetsDisponibles(); // Rafraîchir la liste des sujets disponibles
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message;
      alert('Erreur : ' + errorMessage);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Soumettre une réponse</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="sujet_id" className="block text-gray-700 font-semibold">Choisir un sujet</label>
          <select
            id="sujet_id"
            value={sujetId}
            onChange={(e) => setSujetId(e.target.value)}
            className="w-full p-2 border rounded mt-1"
            required
          >
            <option value="">Sélectionnez un sujet</option>
            {sujets.map((sujet) => (
              <option key={sujet.id} value={sujet.id}>
                {sujet.libelle}
              </option>
            ))}
          </select>
        </div>
        <FileUpload onFileChange={setFile} />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
          Soumettre
        </button>
      </form>

      {evaluation && (
        <div className="mt-4 p-4 border rounded bg-gray-100">
          <h2 className="text-xl font-semibold">Résultat de l’évaluation</h2>
          <p><strong>Note :</strong> {evaluation.note}/20</p>
          <p><strong>Commentaire :</strong> {evaluation.commentaire}</p>
        </div>
      )}
    </div>
  );
};

export default SoumissionForm;