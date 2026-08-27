import { useClock } from '../hooks/useClock';
import ThemeToggle from './ThemeToggle.jsx';
import StatusBadge from './StatusBadge.jsx';
import ReadingProgress from './ReadingProgress.jsx';
import '../styles/Navbar.css';
import { useState } from 'react';
import Sidebar from './Sidebar.jsx';

const Navbar = ({ theme, onToggleTheme }) => {
  const time = useClock();
  // Estado de la barra lateral (única vía de acceso admin)
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <div id='iniciales'>WL</div>
          <span className="nav-name">WILKER_LOPEZ</span>
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>
        <div className="navbar-right">
          <div className='edit-proyectos'>
            <button
              onClick={() => setIsOpen(true)}
              title="Admin Access"
              aria-label="Panel de administración"
            ></button>
          </div>
          <StatusBadge />
          <time aria-live="polite" aria-label="Reloj" className="reloj-display">
            {time}
          </time>
        </div>

        <ReadingProgress />
      </nav>
      <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default Navbar;