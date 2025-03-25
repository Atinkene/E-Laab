import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../index.css'; // Ajustez selon votre structure

const Login = () => {
  const [login, setLogin] = useState('');
  const [motDePasse, setMotDePasse] = useState(''); // Changé de password à motDePasse
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://dbplateformebackend.up.railway.app/auth/login', { // Changé à /auth/login
        login,
        motDePasse, // Aligné avec l’ancienne version
      });
      const { token, role } = res.data;
      localStorage.setItem('token', token);
      console.log('Connexion réussie:', res.data);

      // Redirection basée sur le rôle
      if (role === 'ETUDIANT') {
        navigate('/etudiant/dashboard');
      } else if (role === 'PROFESSEUR') {
        navigate('/professeur/dashboard');
      } else {
        setError('Rôle inconnu');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Erreur de connexion');
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-center mb-6">
          <img
            src="https://fad.esp.sn/pluginfile.php/1/theme_moove/logo/1709829106/senegal-ucad.png"
            alt="Logo ESP"
            className="h-16"
          />
        </div>
        <h1 className="text-2xl font-bold text-center mb-6">Connexion</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="login" className="block text-gray-700">
              Login
            </label>
            <input
              type="text"
              id="login"
              className="w-full p-2 border rounded mt-1"
              placeholder="sgbd"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="motDePasse" className="block text-gray-700">
              Mot de passe
            </label>
            <input
              type="password"
              id="motDePasse" // Changé de password à motDePasse
              className="w-full p-2 border rounded mt-1"
              placeholder="********"
              value={motDePasse}
              onChange={(e) => setMotDePasse(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Se connecter
          </button>
        </form>
        <p className="text-center mt-4 text-gray-600">Ou connectez-vous avec :</p>
        <div className="flex justify-center gap-4 mt-4">
          <button className="bg-red-500 text-white p-2 rounded hover:bg-red-600">Google</button>
          <button className="bg-blue-800 text-white p-2 rounded hover:bg-blue-900">Facebook</button>
          <button className="bg-gray-800 text-white p-2 rounded hover:bg-gray-900">Microsoft</button>
          <button className="bg-gray-700 text-white p-2 rounded hover:bg-gray-800">GitHub</button>
        </div>
        <p className="text-center mt-4 text-sm">
          Pas de compte ?{' '}
          <a href="/inscription" className="text-blue-600">
            Inscrivez-vous
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;