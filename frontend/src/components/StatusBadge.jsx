import '../styles/StatusBadge.css';

const StatusBadge = () => (
  <div className="status-badge" aria-label="Estado: disponible para trabajar">
    <span className="status-dot" aria-hidden="true" />
    <span className="status-text">DISPONIBLE</span>
  </div>
);

export default StatusBadge;