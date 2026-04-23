import { useState, useEffect } from "react";

// Hook personalizado para obtener los proyectos desde el backend
// El frontend llama al servidor Express que maneja la conexión con Supabase
// En dev: Vite proxy redirige /api -> localhost:4321
// En prod: configurar VITE_API_URL con la URL del servidor desplegado
const API_URL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api/proyectos`
  : "/api/proyectos";

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
        
        // Asegurarse de que data sea un array
        const projectsArray = Array.isArray(data) ? data : (data.proyectos || []);
        
        // Transformar los datos del API al formato esperado por ProjectCard
        const transformedProjects = projectsArray.map(project => {
          // Extraer tags directamente del proyecto
          const tags = project.tags || [];
          
          return {
            id: project.id,
            title: project.nombre,
            description: project.descripcion,
            tags: tags,
            link: project.link,
            image: project.imagen || null,
            created_at: project.created_at
          };
        });
        
        setProjects(transformedProjects);
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
