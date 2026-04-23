import ProjectPreviewIcon from './ProjectPreviewIcon.jsx';
import '../styles/ProjectCard.css';

// Componente de tarjeta de proyecto con layout horizontal, preparado para carrusel
// Para agregar imagen: pasa el prop `image` con la ruta y se mostrará automáticamente
const ProjectCard = ({ title, description, tags, link, image }) => {
  console.log('ProjectCard props:', { title, description, tags, link, image });
  console.log('Tags info:', {
    isArray: Array.isArray(tags),
    length: tags?.length,
    values: tags
  });
  return (
    <div className="project-card">

      {/* Panel izquierdo: preview del proyecto */}
      {/* Cuando tengas imagen, pasa image="/ruta/imagen.png" desde Projects.jsx */}
      <div className="project-card-left">
        <div className="project-card-preview">
          {image
            ? <img src={image} alt={title} className="project-preview-img" />
            : <ProjectPreviewIcon />
          }
        </div>
      </div>

      {/* Panel derecho: información del proyecto */}
      <div className="project-card-right">
        <div className="project-card-tags">
          {Array.isArray(tags) && tags.length > 0 && tags.map((tag, i) => (
            <span key={i} className="project-tag">{tag}</span>
          ))}
        </div>

        <h3 className="project-card-title">{title}</h3>

        <div className="project-card-desc-box">
          <p className="project-card-description">{description}</p>
        </div>

        {link && (
          <a href={link} target="_blank" rel="noopener noreferrer" className="project-card-btn">
            Ver Proyecto →
          </a>
        )}
      </div>

    </div>
  );
};

export default ProjectCard;
