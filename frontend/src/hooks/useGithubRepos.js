import { useState, useEffect, useCallback } from 'react';

// El frontend llama al servidor Express que maneja la autenticación con GitHub
// En dev: Vite proxy redirige /api -> localhost:4321
// En prod: configurar VITE_API_URL con la URL del servidor desplegado
const API_URL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api/repos`
  : '/api/repos';

export const useGithubRepos = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRepos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error(`Error ${response.status}`);
      const data = await response.json();
      setRepos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRepos();
  }, [fetchRepos]);

  return { repos, loading, error, retry: fetchRepos };
};