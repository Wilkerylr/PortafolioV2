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

  return (
    <>
    <nav className="navbar">
      <div className="logo">
        <div id='iniciales'>WL</div>
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        
        {/* Tu línea vertical camuflada */}
        <div className='edit-proyectos'>
          <button 
            onClick={() => setIsOpen (true)} 
            title="Admin Access"
          ></button>
        </div>
      </div>
      <div className="navbar-right">
        <StatusBadge />
        <time aria-live="polite" aria-label="Reloj" className="reloj-display">
          {time}
        </time>
      </div>

      <ReadingProgress />

      {/* 2. Renderizado condicional del Login */}
      {showLogin && (
        <div className="login-overlay" onClick={() => setShowLogin(false)}>
          <div className="login-modal" onClick={(e) => e.stopPropagation()}>
            {/* El e.stopPropagation evita que el modal se cierre al hacer clic dentro de él */}
            <Login />
            <button className="close-btn" onClick={() => setShowLogin(false)}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </nav>
      {/* 3. Renderizado condicional de la barra lateral */}
      <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </>
  );
};

export default Navbar;