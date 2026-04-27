import { useClock } from '../hooks/useClock';
import ThemeToggle from './ThemeToggle.jsx';
import StatusBadge from './StatusBadge.jsx';
import ReadingProgress from './ReadingProgress.jsx';
import '../styles/Navbar.css';
import { useState } from 'react';
import Sidebar from './Sidebar.jsx';

const Navbar = ({ theme, onToggleTheme }) => {
  const time = useClock();
  // 1. Declaramos el estado para mostrar/ocultar el login
  const [showLogin, setShowLogin] = useState(false);
  // 2. Estado de la barra lateral
  const [isOpen, setIsOpen] = useState(false);
  // 3. Contador de clicks para boton oculto de administracion
  const [clickCount, setClickCount] = useState(0);

  return (
    <>
    <nav className="navbar">
      <div className="logo">
        <div id='iniciales'>WL</div>
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        
        {/* Tu línea vertical camuflada */}
        <div className='edit-proyectos'>
          <button 
            onClick={() => {
              const newCount = clickCount + 1;
              setClickCount(newCount);
              
              // Si llega a 5 clicks mostramos el sidebar y reseteamos contador
              if (newCount >= 5) {
                setIsOpen(true);
                setClickCount(0);
              }
              
              // Resetear contador despues de 2 segundos sin clicks
              setTimeout(() => {
                setClickCount(0);
              }, 2000);
            }} 
          
          ></button>
        </div>

        <nav className="navbar-nav">
          <a href="#inicio" className="nav-link">Inicio</a>
          <a href="#habilidades" className="nav-link">Habilidades</a>
          <a href="#proyectos" className="nav-link">Proyectos</a>
          <a href="#repositorios" className="nav-link">Repositorios</a>
        </nav>

      </div>
      <div className="navbar-right">
        <StatusBadge />
        <time aria-live="polite" aria-label="Reloj" className="reloj-display">
          {time}
        </time>
      </div>

      <ReadingProgress />

    </nav>
      {/* 3. Renderizado condicional de la barra lateral */}
      <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </>
  );
};

export default Navbar;