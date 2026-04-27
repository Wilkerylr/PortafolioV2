import '../styles/Footer.css';

const CURRENT_YEAR = new Date().getFullYear();

const Footer = () => (
  <footer className="footer">
    <div className="footer-grid">
      <div className="footer-col footer-col--identity">
        <span className="footer-logo">WL</span>
        <p className="footer-tagline">Desarrollador Fullstack<br />& Técnico Electrónico</p>
      </div>
      <div className="footer-col footer-col--center">
        <div className="footer-status">
          <span className="footer-status-dot" aria-hidden="true" />
          <span>Disponible para proyectos</span>
        </div>
        <p className="footer-location">📍 Venezuela</p>
      </div>
      <div className="footer-col footer-col--contact">
        <p className="footer-contact-label">Contacto</p>
        <a href="mailto:Lopezrewilker12@gmail.com" className="footer-email">
          Lopezrewilker12@gmail.com
        </a>
      </div>
    </div>
    <div className="footer-bottom">
      <span>© {CURRENT_YEAR} Wilker Lopez. Todos los derechos reservados.</span>
      <span className="footer-stack">React · Vite · Node.js</span>
    </div>
  </footer>
);

export default Footer;
