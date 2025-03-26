import React, { useState, useEffect } from 'react'; // Added useEffect
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../index.css'; // Adjust based on your structure

const Login = () => {
  const [login, setLogin] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Check for existing token on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Optionally, verify the token with the backend here
      // For simplicity, assuming the token implies a valid session
      const role = localStorage.getItem('role'); // You’d need to store this too
      if (role === 'ETUDIANT') {
        navigate('/etudiant/dashboard');
      } else if (role === 'PROFESSEUR') {
        navigate('/professeur/dashboard');
      }
    }
  }, [navigate]); // Dependency array includes navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://dbplateformebackend.up.railway.app/auth/login', {
        login,
        motDePasse,
      });
      const { token, role } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('role', role); // Store role for use in useEffect
      console.log('Connexion réussie:', res.data);

      // Redirect based on role
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
      <div class="p-4 bg-gray-100 rounded-lg shadow-md fixed top-0 left-0">
    <h2 class="text-xl font-bold text-gray-800 mb-4">Paramètres de connexion par défaut</h2>
    
    <div class="mb-4">
        <h3 class="text-lg font-semibold text-gray-700">Professeur</h3>
        <p><strong>Matricule :</strong> massina</p>
        <p><strong>Mot de passe :</strong> password123</p>
    </div>
    
    <div>
        <h3 class="text-lg font-semibold text-gray-700">Etudiant</h3>
        <p><strong>Matricule :</strong> bassene</p>
        <p><strong>Mot de passe :</strong> passer</p>
    </div>
</div>
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
              id="motDePasse"
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