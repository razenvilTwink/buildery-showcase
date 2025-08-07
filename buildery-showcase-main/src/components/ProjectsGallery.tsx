
import React from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from './UI/SectionTitle';
import GalleryControls from './UI/GalleryControls';
import ProjectsSlider from './UI/ProjectsSlider';
import { useProjectsStore } from '@/hooks/useProjectsStore';
import { useGallerySlider } from '@/hooks/useGallerySlider';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const ProjectsGallery = () => {
  const { projects } = useProjectsStore();
  const visibleProjects = 3;
  
  const { 
    startIndex, 
    isTransitioning, 
    nextSlide, 
    prevSlide, 
    canSlideNext, 
    canSlidePrev 
  } = useGallerySlider({
    totalItems: projects.length,
    visibleItems: visibleProjects
  });
  
  const sectionRef = useScrollReveal();
  
  return (
    <section id="gallery" className="py-20 bg-construction-offWhite" ref={sectionRef}>
      <div className="section-container">
        <SectionTitle 
          title="Галерея проектов" 
          subtitle="Наши лучшие работы"
          className="reveal-element reveal-bottom"
        />
        
        <div className="relative mt-12 reveal-element reveal-bottom">
          <ProjectsSlider 
            projects={projects}
            startIndex={startIndex}
            isTransitioning={isTransitioning}
            visibleProjects={visibleProjects}
          />
          
          <GalleryControls 
            prevSlide={prevSlide}
            nextSlide={nextSlide}
            canSlidePrev={canSlidePrev}
            canSlideNext={canSlideNext}
          />
        </div>
        
        <div className="text-center mt-12 reveal-element reveal-bottom">
          <Link to="/projects" className="btn btn-outline py-2.5 px-6">
            Смотреть все проекты
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProjectsGallery;
