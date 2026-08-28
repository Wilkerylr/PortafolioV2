import { useState, useEffect, useCallback } from 'react';

const API_URL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api/skills`
  : '/api/skills';

// Categorías: array de { id, title, allSkills: [{ name, description }] }
export const useSkills = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSkills = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error(`Error ${response.status}`);
      const data = await response.json();
      const list = Array.isArray(data) ? data : [];
      setCategories(
        list
          .filter((c) => c && typeof c.title === 'string')
          .map((c) => ({
            id: c.id,
            title: c.title,
            allSkills: Array.isArray(c.allSkills) ? c.allSkills : [],
          }))
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  return { categories, loading, error, retry: fetchSkills };
};