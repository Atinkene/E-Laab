import React, { useState } from 'react';
import FileUpload from '../components/FileUpload';
import { createSujet } from '../services/api';

const SujetForm = () => {
  const [formData, setFormData] = useState({
    libelle: '',
    deadLine: '',
    professeur_id: 'a21edea7-096c-4063-9f34-51332303dd25', // Exemple
    classe_ids: '1', // Exemple
  });
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('libelle', formData.libelle);
    data.append('deadLine', formData.deadLine);
    data.append('professeur_id', formData.professeur_id);
    data.append('classe_ids', JSON.stringify([formData.classe_ids]));
    data.append('file', file);

    try {
      const response = await createSujet(data);
      alert('Sujet créé : ' + response.data.fileUrl);
    } catch (error) {
      alert('Erreur : ' + error.response.data.error);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Déposer un sujet</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="libelle" placeholder="Libellé" onChange={handleChange} className="p-2 border rounded w-full" />
        <input name="deadLine" type="datetime-local" onChange={handleChange} className="p-2 border rounded w-full" />
        <FileUpload onFileChange={setFile} />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">Créer</button>
      </form>
    </div>
  );
};

export default SujetForm;