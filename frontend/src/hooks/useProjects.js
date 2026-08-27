import { useState, useEffect, useCallback } from 'react';

const API_URL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api/proyectos`
  : '/api/proyectos';

// Normaliza los campos que vienen de Supabase al formato del ProjectCard
const normalizeProject = (p) => ({
  id: p.id,
  title: p.titulo || p.title || 'Proyecto sin título',
  description: p.descripcion || p.description || 'Sin descripción',
  tags: Array.isArray(p.tags)
    ? p.tags
    : p.tags
      ? [p.tags]
      : (p.tecnologias && Array.isArray(p.tecnologias) ? p.tecnologias : []),
  link: p.url || p.link || '',
  image: p.imagen || p.image || '',
});

export const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error(`Error ${response.status}`);
      const data = await response.json();
      const list = Array.isArray(data) ? data : data.proyectos ?? [];
      setProjects(list.map(normalizeProject));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return { projects, loading, error, retry: fetchProjects };
};