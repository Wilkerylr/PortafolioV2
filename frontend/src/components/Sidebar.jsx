import React, { useState } from 'react';
import LoginForm from './LoginForm.jsx';
//import AdminOptions from './AdminOptions';
import '../styles/Sidebar.css';
import '../styles/global.css';

const Sidebar = ({ isOpen, onClose }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className={`sidebar-container ${isOpen ? 'open' : ''}`}>
      {/* Fondo oscuro detrás de la barra para cerrar al hacer clic fuera */}
      <div className="sidebar-overlay" onClick={onClose}></div>
      
      <div className="sidebar-content">
        <button className="close-sidebar-btn" onClick={onClose}>×</button>
        
        {!isLoggedIn ? (
          <div className="login-section">
            <h2>Acceso Admin</h2>
            <form onSubmit={(e) => { e.preventDefault(); setIsLoggedIn(true); }}>
              <input type="password" placeholder="Contraseña" required />
              <button type="submit">Entrar</button>
            </form>
          </div>
        ) : (
          <div className="admin-section">
            <h2>Panel de Control</h2>
            <nav className="admin-nav">
              <button>Gestionar Proyectos</button>
              <button>Editar Perfil</button>
              <button>Ver Métricas</button>
              <button onClick={() => setIsLoggedIn(false)} className="logout-btn">
                Cerrar Sesión
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;