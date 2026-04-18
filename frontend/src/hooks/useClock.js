import { useState, useEffect } from 'react';

// Hook personalizado para mostrar un reloj en tiempo real
export const useClock = () => {
  // Estado que almacena la hora actual
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  // Efecto que actualiza la hora cada segundo
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    // Limpieza del intervalo al desmontar el componente
    return () => clearInterval(interval);
  }, []);

  return time;
};
