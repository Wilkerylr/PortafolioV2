// Icono placeholder para el preview de un proyecto
// Representa una ventana de código con barra de título y líneas de código
const ProjectPreviewIcon = () => (
  <svg
    className="project-preview-icon"
    viewBox="0 0 64 64"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    aria-hidden="true"
  >
    {/* Ventana/contenedor principal */}
    <rect x="4" y="12" width="56" height="40" rx="4" />

    {/* Barra de título */}
    <path d="M4 20h56" />

    {/* Puntos de la barra (rojo, amarillo, verde) */}
    <circle cx="12" cy="16" r="2" fill="currentColor" stroke="none" />
    <circle cx="20" cy="16" r="2" fill="currentColor" stroke="none" />
    <circle cx="28" cy="16" r="2" fill="currentColor" stroke="none" />

    {/* Líneas de código simuladas */}
    <path d="M14 32h12M14 38h20M14 44h8" strokeLinecap="round" />

    {/* Flecha de código (símbolo >) */}
    <path d="M38 30l8 8-8 8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default ProjectPreviewIcon;
