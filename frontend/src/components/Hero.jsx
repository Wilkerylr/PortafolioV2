import AvatarPlaceholder from './AvatarPlaceholder.jsx';
import '../styles/Hero.css';

// Componente de sección hero con presentación personal
// Recibe theme desde App para mantener una sola fuente de verdad
const Hero = ({ theme }) => {
  return (
    <section id="inicio" className="hero">
      <div className="hero-content">
        {/* Avatar de perfil - reemplazar AvatarPlaceholder por <img> cuando tengas foto */}
        <div className="hero-left">
          <AvatarPlaceholder theme={theme} />
        </div>

        {/* Texto de presentación */}
        <div className="hero-right">
          <h1>Hola, soy <span className="highlight">Wilker Lopez</span></h1>
          <div className="hero-tags">
            <span>⚡ Técnico en Electrónica</span>
            <span>🐍 Python Certificado</span>
            <span>⚛️ React Dev</span>
          </div>
          <p className="hero-bio">Más de 3 años en sistemas de control de acceso. Programador certificado en Python con manejo de bases de datos y APIs. Actualmente especializándome en desarrollo web Fullstack con React y Node.js.</p>
          <a href="#repositorios" className="btn-main">Ver Repositorios</a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
