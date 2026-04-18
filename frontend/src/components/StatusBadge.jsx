import '../styles/StatusBadge.css';

const StatusBadge = () => (
  <div className="status-badge" aria-label="Estado: disponible para trabajar">
    <span className="status-dot" aria-hidden="true" />
    <span className="status-text">Solucionando problemas</span>
  </div>
);

export default StatusBadge;
