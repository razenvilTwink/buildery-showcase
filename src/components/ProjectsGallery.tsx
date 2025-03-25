
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from './UI/SectionTitle';
import ProjectCard from './UI/ProjectCard';
import { cn } from '@/lib/utils';
import { useProjectsStore } from '@/hooks/useProjectsStore';

const ProjectsGallery = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { projects } = useProjectsStore();
  
  const visibleProjects = 3; // Количество видимых проектов
  
  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setStartIndex((prevIndex) => 
      (prevIndex + 1) % (projects.length - visibleProjects + 1)
    );
    setTimeout(() => setIsTransitioning(false), 500);
  };
  
  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setStartIndex((prevIndex) => 
      prevIndex === 0 ? projects.length - visibleProjects : prevIndex - 1
    );
    setTimeout(() => setIsTransitioning(false), 500);
  };
  
  const canSlideNext = startIndex < projects.length - visibleProjects;
  const canSlidePrev = startIndex > 0;
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const revealElements = sectionRef.current?.querySelectorAll('.reveal-element');
    revealElements?.forEach((el) => observer.observe(el));
    
    return () => {
      revealElements?.forEach((el) => observer.unobserve(el));
    };
  }, []);
  
  return (
    <section id="gallery" className="py-20 bg-construction-offWhite" ref={sectionRef}>
      <div className="section-container">
        <SectionTitle 
          title="Галерея проектов" 
          subtitle="Наши лучшие работы"
          className="reveal-element reveal-bottom"
        />
        
        <div className="relative mt-12 reveal-element reveal-bottom">
          <div className="overflow-hidden">
            <div 
              className={cn(
                "flex gap-6 transition-transform duration-500 ease-out",
                isTransitioning ? "blur-sm" : ""
              )}
              style={{ transform: `translateX(-${startIndex * (100 / visibleProjects)}%)` }}
            >
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  image={project.image}
                  title={project.title}
                  description={project.description}
                  location={project.location}
                  area={project.area}
                  price={project.price}
                  className="flex-shrink-0 w-full md:w-[calc(33.333%-1rem)]"
                />
              ))}
            </div>
          </div>
          
          <div className="flex justify-center mt-8 space-x-4">
            <button 
              onClick={prevSlide}
              disabled={!canSlidePrev}
              className={cn(
                "btn p-2 rounded-full",
                canSlidePrev 
                  ? "bg-construction-dark text-white hover:bg-construction-dark/90" 
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              )}
              aria-label="Предыдущие проекты"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button 
              onClick={nextSlide}
              disabled={!canSlideNext}
              className={cn(
                "btn p-2 rounded-full",
                canSlideNext 
                  ? "bg-construction-dark text-white hover:bg-construction-dark/90" 
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              )}
              aria-label="Следующие проекты"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
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
