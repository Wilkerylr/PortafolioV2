import ProjectCard from './ProjectCard.jsx';
import SectionHeader from './SectionHeader.jsx';
import { useProjects } from '../hooks/useProjects';

const Projects = () => {
  const { projects, loading, error, retry } = useProjects();

  return (
    <section id="proyectos" className="proyectos-section">
      <SectionHeader index="01" title="Proyectos" note="// fuente: api.proyectos" />

      {loading && (
        <p className="proyectos-aviso" role="status">
          <span className="loader" aria-hidden="true" /> CARGANDO REGISTROS...
        </p>
      )}

      {error && (
        <div className="proyectos-aviso proyectos-error">
          <p>// ERROR: NO FUE POSIBLE LEER LOS PROYECTOS — {error}</p>
          <button className="btn btn--ghost btn--sm" onClick={retry}>REINTENTAR</button>
        </div>
      )}

      {!loading && !error && projects.length === 0 && (
        <p className="proyectos-aviso">
          // SIN REGISTROS — AÚN NO HAY PROYECTOS PUBLICADOS_<span className="cursor">▊</span>
        </p>
      )}

      <div className="grid-proyectos">
        {projects.map((project) => (
          <ProjectCard key={project.id ?? project.title} {...project} />
        ))}
      </div>
    </section>
  );
};

export default Projects;