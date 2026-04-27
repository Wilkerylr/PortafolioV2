import '../styles/Hero.css';
import fotoTraje from '/FotoTraje.jpg';

// Componente de sección hero con presentación personal
// Recibe theme desde App para mantener una sola fuente de verdad
const Hero = ({ theme }) => {
  return (
    <section id="inicio" className="hero">
      <div className="hero-content">
        {/* Avatar de perfil con fotografía personal */}
        <div className="hero-left">
          <img 
            src={fotoTraje} 
            alt="Wilker Lopez - Desarrollador" 
            className="hero-img avatar-photo"
          />
        </div>

        {/* Texto de presentación */}
        <div className="hero-right">
          <h1>Hola, soy <span className="highlight">Wilker Lopez</span></h1>
          <div className="hero-tags">
            <span>⚡ Técnico en Electrónica</span>
            <span>🐍 Python Certificado</span>
            <span>⚛️ React Dev</span>
          </div>
          <p className="hero-bio">Técnico en Electrónica con +3 años de experiencia implementando sistemas de control de acceso. Programador certificado en Python, especializado en desarrollo de APIs y gestión de bases de datos. Actualmente expandiendo conocimientos en desarrollo web Fullstack con React y Node.js.</p>
          <a href="mailto:Lopezrewilker12@gmail.com" className="btn-main">Contactar</a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
