import { useState, useEffect } from 'react';
import SectionBadge from './SectionBadge.jsx';
import Spinner from './spinner.jsx';
import '../styles/Skills.css';

const Skills = () => {
  const [skillCategories, setSkillCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/skills');
        
        if (!response.ok) {
          throw new Error('Error al cargar habilidades');
        }

        const data = await response.json();
        setSkillCategories(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  if (loading) {
    return (
      <section id="habilidades" className="skills-section">
        <div className="skills-header">
          <h2>Habilidades Tecnológicas</h2>
          <SectionBadge text="🔄 Cargando..." />
        </div>
        <div style={{ textAlign: 'center', padding: '4rem' }}>
          <Spinner size="medium" />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="habilidades" className="skills-section">
        <div className="skills-header">
          <h2>Habilidades Tecnológicas</h2>
          <SectionBadge text="⚠️ Error" />
        </div>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
          No se pudieron cargar las habilidades
        </p>
      </section>
    );
  }

  return (
    <section id="habilidades" className="skills-section">
      <div className="skills-header">
        <h2>Habilidades Tecnológicas</h2>
        <SectionBadge text={`🛠️ ${skillCategories.reduce((acc, cat) => acc + (cat.allSkills?.length || 0), 0)} tecnologías`} />
      </div>

      <div className="skills-grid">
        {skillCategories.map((category, index) => (
          <div key={index} className="skill-card">
            <div className="skill-card-header">
              <span className="skill-icon">{category.icon}</span>
              <h3>{category.title.charAt(0).toUpperCase() + category.title.slice(1)}</h3>
            </div>
            <div className="skill-tags">
              {(category.allSkills || []).map((skill, skillIndex) => (
                <div key={skillIndex} className="skill-tag-wrapper">
                  <span className="skill-tag">
                    {skill.name}
                  </span>
                  {skill.description && (
                    <div className="skill-tooltip">
                      {skill.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;