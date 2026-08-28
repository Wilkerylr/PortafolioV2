import { useState } from 'react';
import SectionHeader from './SectionHeader.jsx';
import { useSkills } from '../hooks/useSkills';
import '../styles/Technologies.css';

const totalSkills = (categories) =>
  categories.reduce((acc, c) => acc + c.allSkills.length, 0);

const Technologies = () => {
  const { categories, loading, error, retry } = useSkills();
  const [openSkills, setOpenSkills] = useState({});

  const toggleSkill = (key) => {
    setOpenSkills((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <section id="tecnologias" className="skills-section">
      <SectionHeader
        index="01"
        title="Tecnologías"
        note={
          loading
            ? '// consultando base de datos...'
            : `// ${totalSkills(categories)} tecnologías`
        }
      />

      {loading && <p className="skills-intro">// CARGANDO HABILIDADES…</p>}

      {!loading && error && (
        <p className="skills-intro">
          // ERROR AL CONSULTAR LA BASE —{' '}
          <button className="btn btn--sm" onClick={retry}>reintentar_</button>
        </p>
      )}

      {!loading && !error && categories.length === 0 && (
        <p className="skills-intro">// SIN REGISTROS EN LA BASE DE DATOS</p>
      )}

      {!loading && !error && categories.length > 0 && (
        <div className="skills-grid">
          {categories.map((cat) => (
            <div className="skills-panel" key={cat.id ?? cat.title}>
              <p className="skills-area-title">{cat.title}</p>
              <p className="skills-note">// {cat.allSkills.length} COMPETENCIAS</p>
              <ul className="skills-list">
                {cat.allSkills.map((skill, i) => {
                  const key = `${cat.id ?? cat.title}-${skill.name}-${i}`;
                  const open = Boolean(openSkills[key]);
                  const hasDetail = Boolean(skill.description);
                  return (
                    <li
                      key={key}
                      className={`skill-chip${hasDetail ? ' skill-chip--detail' : ''}${open ? ' skill-chip--open' : ''}`}
                      title={hasDetail ? (open ? 'Cerrar detalle' : 'Ver detalle') : undefined}
                      onClick={hasDetail ? () => toggleSkill(key) : undefined}
                    >
                      {skill.name}
                      {open && hasDetail && (
                        <p className="skill-chip-desc">{skill.description}</p>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Technologies;