import { useState, useEffect } from 'react';

// Hook personalizado para manejar el tema de la aplicación (claro/oscuro)
export const useTheme = () => {
  // Estado del tema, inicializado desde localStorage o 'claro' por defecto
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('tema') || 'claro';
  });

  // Efecto que aplica el tema al body y lo guarda en localStorage
  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem('tema', theme);
  }, [theme]);

  // Función para alternar entre tema claro y oscuro
  const toggleTheme = () => {
    setTheme(prev => prev === 'oscuro' ? 'claro' : 'oscuro');
  };

  return { theme, toggleTheme };
};
