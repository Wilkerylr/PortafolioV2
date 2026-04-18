import '../styles/SectionBadge.css';

// Componente reutilizable para mostrar un badge de estado en cualquier sección
const SectionBadge = ({ text }) => (
  <span className="section-badge">{text}</span>
);

export default SectionBadge;
