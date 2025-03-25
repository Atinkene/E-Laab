import React, { useState } from 'react';
import { registerProfesseur, registerEtudiant } from '../services/api';

const Register = () => {
  const [role, setRole] = useState('PROFESSEUR');
  const [formData, setFormData] = useState({
    login: '',
    motDePasse: '',
    prenom: '',
    nom: '',
    mail: '',
    matricule: '',
    numeroEtudiant: '',
    niveauEtudiant: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (role === 'PROFESSEUR') {
        await registerProfesseur({
          login: formData.login,
          motDePasse: formData.motDePasse,
          prenom: formData.prenom,
          nom: formData.nom,
          mail: formData.mail,
          matricule: formData.matricule,
        });
        alert('Professeur inscrit !');
      } else {
        await registerEtudiant({
          login: formData.login,
          motDePasse: formData.motDePasse,
          prenom: formData.prenom,
          nom: formData.nom,
          mail: formData.mail,
          numeroEtudiant: formData.numeroEtudiant,
          niveauEtudiant: formData.niveauEtudiant,
        });
        alert('Étudiant inscrit !');
      }
    } catch (error) {
      alert('Erreur : ' + error.response.data.error);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Inscription</h1>
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="mb-4 p-2 border rounded w-full"
      >
        <option value="PROFESSEUR">Professeur</option>
        <option value="ETUDIANT">Étudiant</option>
      </select>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="login" placeholder="Login" onChange={handleChange} className="p-2 border rounded w-full" />
        <input name="motDePasse" type="password" placeholder="Mot de passe" onChange={handleChange} className="p-2 border rounded w-full" />
        <input name="prenom" placeholder="Prénom" onChange={handleChange} className="p-2 border rounded w-full" />
        <input name="nom" placeholder="Nom" onChange={handleChange} className="p-2 border rounded w-full" />
        <input name="mail" type="email" placeholder="Email" onChange={handleChange} className="p-2 border rounded w-full" />
        {role === 'PROFESSEUR' ? (
          <input name="matricule" placeholder="Matricule" onChange={handleChange} className="p-2 border rounded w-full" />
        ) : (
          <>
            <input name="numeroEtudiant" placeholder="Numéro étudiant" onChange={handleChange} className="p-2 border rounded w-full" />
            <select name="niveauEtudiant" onChange={handleChange} className="p-2 border rounded w-full">
              <option value="">Niveau</option>
              <option value="L1">L1</option>
              <option value="L2">L2</option>
              <option value="L3">L3</option>
              <option value="M1">M1</option>
              <option value="M2">M2</option>
            </select>
          </>
        )}
        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">S'inscrire</button>
      </form>
    </div>
  );
};

export default Register;