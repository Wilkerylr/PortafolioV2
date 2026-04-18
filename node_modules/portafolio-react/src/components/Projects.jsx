import ProjectCard from './ProjectCard.jsx';
import SectionBadge from './SectionBadge.jsx';
import projects from '../data/projects.js';

const Projects = () => (
  <section id="proyectos" className="proyectos-section">
    <div className="proyectos-header">
      <h2>Proyectos Destacados</h2>
      <SectionBadge text="🚧 En construcción" />
    </div>
    <p className="proyectos-aviso">
      Esta sección está siendo actualizada. Pronto encontrarás mis proyectos aquí.
    </p>
    <div className="grid-proyectos">
      {projects.map((project) => (
        <ProjectCard key={project.title} {...project} />
      ))}
    </div>
  </section>
);

export default Projects;
