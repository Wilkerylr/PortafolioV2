const ThemeToggle = ({ theme, onToggle }) => (
  <button
    id="tema_Change"
    aria-label={`Cambiar a tema ${theme === 'claro' ? 'oscuro' : 'claro'}`}
    className={theme === 'claro' ? 'right' : ''}
    onClick={onToggle}
  >
  </button>
);

export default ThemeToggle;
