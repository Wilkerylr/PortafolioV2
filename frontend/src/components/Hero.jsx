import { useState } from 'react';
import AvatarPlaceholder from './AvatarPlaceholder.jsx';
import fotoTraje from '../assets/FotoTraje.jpg';
import '../styles/Hero.css';

// Componente de sección hero con presentación personal
const Hero = ({ theme }) => {
  const [fotoError, setFotoError] = useState(false);

  return (
    <section id="inicio" className="hero">
      <span className="hero-coord" aria-hidden="true">COORD 10.48°N · 66.90°W</span>

      <div className="hero-content">
        {/* Tarjeta de identificación */}
        <div className="hero-avatar">
          {fotoError ? (
            <AvatarPlaceholder theme={theme} />
          ) : (
            <img
              src={fotoTraje}
              alt="Wilker Lopez — Técnico en Electrónica y Programador"
              className="hero-photo"
              onError={() => setFotoError(true)}
            />
          )}
          <span className="hero-avatar-id">TAG_01 · PERFIL</span>
        </div>

        {/* Presentación */}
        <div className="hero-right">
          <p className="hero-kicker">&gt; HOLA, SOY</p>
          <h1>
            Wilker <span className="hl">Lopez</span>
            <span className="cursor" aria-hidden="true">▊</span>
          </h1>

          <div className="hero-tags">
            <span>Técnico en Electrónica</span>
            <span>Python Certificado</span>
            <span>React Dev</span>
          </div>

          <p className="hero-bio">
            Más de 3 años en sistemas de control de acceso. Programador
            certificado en Python con manejo de bases de datos y APIs.
            Actualmente especializándome en desarrollo web Fullstack
            con React y Node.js.
          </p>

          <a href="#repositorios" className="btn btn--accent">Ver repositorios_</a>
        </div>
      </div>
    </section>
  );
};

export default Hero;