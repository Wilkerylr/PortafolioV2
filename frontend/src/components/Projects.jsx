import { useState, useRef, useCallback } from 'react';
import ProjectCard from './ProjectCard.jsx';
import SectionBadge from './SectionBadge.jsx';
import Spinner from './spinner.jsx';
import { useProjects } from '../hooks/useProjects';
import '../styles/ProjectCard.css';

const Projects = () => {
  const { projects, loading, error } = useProjects();
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Navegación por teclado
  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? Math.max(projects.length - 1, 0) : prevIndex - 1
    );
  }, [projects.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === projects.length - 1 ? 0 : prevIndex + 1
    );
  }, [projects.length]);

  // Navegación táctil (swipe)
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeThreshold = 50;
    const swipeDistance = touchStartX.current - touchEndX.current;

    if (Math.abs(swipeDistance) > swipeThreshold) {
      if (swipeDistance > 0) {
        goToNext();
      } else {
        goToPrevious();
      }
    }
  };

  // Si está cargando, mostrar spinner
  if (loading) {
    return (
      <section id="proyectos" className="proyectos-section">
        <div className="proyectos-header">
          <h2>Proyectos Destacados</h2>
          <SectionBadge text="🚀 Cargando proyectos..." />
        </div>
        <Spinner size="medium" />
      </section>
    );
  }

  // Si hay error, mostrar mensaje
  if (error) {
    return (
      <section id="proyectos" className="proyectos-section">
        <div className="proyectos-header">
          <h2>Proyectos Destacados</h2>
          <SectionBadge text="⚠️ Error" />
        </div>
        <p className="proyectos-aviso repo-error">
          Error al cargar proyectos: {error}
        </p>
      </section>
    );
  }

  // Si no hay proyectos
  if (projects.length === 0) {
    return (
      <section id="proyectos" className="proyectos-section">
        <div className="proyectos-header">
          <h2>Proyectos Destacados</h2>
          <SectionBadge text="🚧 En construcción" />
        </div>
        <p className="proyectos-aviso">
          No hay proyectos disponibles en este momento.
        </p>
      </section>
    );
  }

  const isCarousel = projects.length > 1;

  return (
    <section id="proyectos" className="proyectos-section">
      <div className="proyectos-header">
        <h2>Proyectos Destacados</h2>
        <SectionBadge text={`${projects.length} proyecto${projects.length > 1 ? 's' : ''}`} />
      </div>

      {isCarousel ? (
        <div 
          className="carousel-container"
          ref={carouselRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Botón anterior */}
          <button 
            className="carousel-btn carousel-prev"
            onClick={goToPrevious}
            aria-label="Proyecto anterior"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Contenedor de tarjetas */}
          <div className="carousel-track">
            <div 
              className="carousel-content"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {projects.map((project) => (
                <div key={project.id} className="carousel-slide">
                  <ProjectCard 
                    title={project.title}
                    description={project.description}
                    tags={project.tags}
                    link={project.link}
                    image={project.image}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Botón siguiente */}
          <button 
            className="carousel-btn carousel-next"
            onClick={goToNext}
            aria-label="Siguiente proyecto"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      ) : (
        // Un solo proyecto, mostrar sin carrusel
        <div className="grid-proyectos">
          <ProjectCard 
            key={projects[0].id}
            title={projects[0].title}
            description={projects[0].description}
            tags={projects[0].tags}
            link={projects[0].link}
            image={projects[0].image}
          />
        </div>
      )}

      {/* Indicadores de página del carrusel */}
      {isCarousel && (
        <div className="carousel-indicators">
          {projects.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Ir al proyecto ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Projects;