import { useState, useEffect } from "react";
// Hook personalizado para obtener los proyectos desde el backend
const API_URL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api/projects`
  : "/api/projects";
  console.log("API_URL:", API_URL);

export const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`Error ${response.status}`);
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      } 
    };
    fetchProjects();
  }, []);

  return { projects, loading, error };
};