const ThemeToggle = ({ theme, onToggle }) => (
  <button
    id="tema_Change"
    aria-label={`Cambiar a tema ${theme === 'claro' ? 'oscuro' : 'claro'}`}
    className={theme === 'claro' ? 'right' : ''}
    onClick={onToggle}
  >
    <span className="toggle-icon toggle-icon--moon">🌙  </span>
    <span className="toggle-icon toggle-icon--sun">☀️</span>
  </button>
);

export default ThemeToggle;
