import React, { useState } from 'react';
import LoginForm from './LoginForm.jsx';
//import AdminOptions from './AdminOptions';
import '../styles/Sidebar.css';
import '../styles/global.css';

const Sidebar = ({ isOpen, onClose }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!sessionStorage.getItem("userRol");
  });
  const [rol, setRol] = useState(() => sessionStorage.getItem("userRol"));

  return (
    <div className={`sidebar-container ${isOpen ? 'open' : ''}`}>
      {/* Fondo oscuro detrás de la barra para cerrar al hacer clic fuera */}
      <div className="sidebar-overlay" onClick={onClose}></div>
      <div className="sidebar-content">
        <button className="close-sidebar-btn" onClick={onClose}>×</button>
        {!isLoggedIn ? (
          <div className="login-section">
            <h2>Acceso Admin</h2>
            <LoginForm onLogin={() => {
              setIsLoggedIn(true);
              setRol(sessionStorage.getItem("userRol"));
            }} />
          </div>
        ) : (
          <div className="admin-section">
            <h2>Panel de Control</h2>
            <nav className="admin-nav">
              <button className="admin-btn">✏️ Editar Proyectos</button>
              <button className="admin-btn">🏷️ Editar Tags</button>
              <hr className="admin-divider" />
              <button onClick={() => {
                setIsLoggedIn(false);
                setRol(null);
                sessionStorage.removeItem("authToken");
                sessionStorage.removeItem("userRol");
                window.location.reload();
              }} className="logout-btn">
                🔓 Cerrar Sesión
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;