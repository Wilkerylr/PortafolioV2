import '../styles/Footer.css';

const CURRENT_YEAR = new Date().getFullYear();

const Footer = () => (
  <footer className="footer">
    <div className="footer-grid">
      <div className="footer-col footer-col--identity">
        <span className="footer-logo">WL</span>
        <p className="footer-tagline">FULLSTACK DEV // ELECTRÓNICA</p>
      </div>

      <div className="footer-col footer-col--center">
        <div className="footer-status">
          <span className="footer-status-dot" aria-hidden="true" />
          <span>DISPONIBLE PARA PROYECTOS</span>
        </div>
        <p className="footer-location">LOC: VENEZUELA</p>
      </div>

      <div className="footer-col footer-col--contact">
        <p className="footer-contact-label">// CONTACTO</p>
        <a href="mailto:Lopezrewilker12@gmail.com" className="footer-email">
          Lopezrewilker12@gmail.com
        </a>
      </div>
    </div>

    <div className="footer-bottom">
      <span>© {CURRENT_YEAR} WILKER LOPEZ_</span>
      <span className="footer-eof" aria-hidden="true">// EOF</span>
      <span className="footer-stack">STACK: REACT · VITE · NODE</span>
    </div>
  </footer>
);

export default Footer;