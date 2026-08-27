// Encabezado de sección con nomenclatura técnica [NN] · TÍTULO · trazo de señal
const SectionHeader = ({ index, title, note }) => (
  <header className="section-head">
    <span className="section-idx">[{index}]</span>
    <h2 className="section-title">{title}</h2>
    {note && <span className="section-note">{note}</span>}
    <div className="section-rule" aria-hidden="true" />
  </header>
);

export default SectionHeader;