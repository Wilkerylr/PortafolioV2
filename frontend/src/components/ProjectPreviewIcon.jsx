// Preview de proyecto tipo osciloscopio: marco de instrumento y traza animada
const ProjectPreviewIcon = () => (
  <svg
    className="project-preview-icon"
    viewBox="0 0 200 120"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    aria-hidden="true"
  >
    {/* Marco del instrumento */}
    <rect x="2" y="2" width="196" height="116" />

    {/* Rejilla de divisiones */}
    <g opacity="0.22">
      <path d="M2 32H198 M2 60H198 M2 88H198" />
      <path d="M52 2V118 M102 2V118 M152 2V118" />
    </g>

    {/* Marcas de escala superior */}
    <g opacity="0.5">
      <path d="M2 6h10M2 12h6M2 18h6M2 24h6" />
    </g>

    {/* Lectura simulada */}
    <text x="12" y="112" fontSize="8" letterSpacing="2" opacity="0.6">
      CH1:FLATLINE
    </text>

    {/* Traza de señal */}
    <path
      className="scope-trace"
      d="M8 70 H26 L34 36 L42 96 L50 50 L58 92 L66 42 L74 76 H92 L100 26 L108 94 L116 46 L124 90 L132 40 H150 L196 70"
      strokeLinejoin="round"
      strokeLinecap="round"
    />

    {/* Nodo activo */}
    <circle className="scope-node" cx="196" cy="70" r="3" fill="currentColor" stroke="none" />
  </svg>
);

export default ProjectPreviewIcon;