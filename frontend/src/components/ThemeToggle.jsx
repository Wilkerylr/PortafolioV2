const ThemeToggle = ({ theme, onToggle }) => (
  <button
    id="tema_Change"
    aria-label={`Cambiar a tema ${theme === 'claro' ? 'oscuro' : 'claro'}`}
    role="switch"
    aria-checked={theme === 'oscuro'}
    className={theme === 'claro' ? 'right' : ''}
    onClick={onToggle}
  >
    <span className="toggle-label">CLARO</span>
    <span className="toggle-block" aria-hidden="true" />
    <span className="toggle-label">OSCURO</span>
  </button>
);

export default ThemeToggle;