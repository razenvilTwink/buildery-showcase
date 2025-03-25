
import React, { useState, useRef, useEffect } from 'react';
import SectionTitle from './UI/SectionTitle';
import ProjectCard from './UI/ProjectCard';
import { cn } from '@/lib/utils';

interface Project {
  id: number;
  title: string;
  description: string;
  location: string;
  area: string;
  price: string;
  image: string;
}

const ProjectsGallery = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const projects: Project[] = [
    {
      id: 1,
      title: "Современный дом в скандинавском стиле",
      description: "Минималистичный дизайн с открытой планировкой и панорамными окнами",
      location: "Подмосковье",
      area: "145",
      price: "5.8 млн ₽",
      image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "Семейный дом с террасой",
      description: "Просторный дом для большой семьи с уютной террасой и садом",
      location: "Ленинградская область",
      area: "210",
      price: "7.2 млн ₽",
      image: "https://images.unsplash.com/photo-1493397212122-2b85dda8106b?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "Компактный дачный дом",
      description: "Функциональный дом для сезонного проживания с продуманной планировкой",
      location: "Тверская область",
      area: "85",
      price: "2.9 млн ₽",
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 4,
      title: "Двухэтажный коттедж с гаражом",
      description: "Просторный коттедж с гаражом на 2 автомобиля и большим участком",
      location: "Московская область",
      area: "220",
      price: "8.5 млн ₽",
      image: "https://images.unsplash.com/photo-1460574283810-2aab119d8511?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 5,
      title: "Дом в стиле барнхаус",
      description: "Современный дом в популярном стиле барнхаус с просторными помещениями",
      location: "Калужская область",
      area: "180",
      price: "6.3 млн ₽",
      image: "https://images.unsplash.com/photo-1487452066049-a710f7296400?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 6,
      title: "Уютный дом с мансардой",
      description: "Компактный дом с мансардным этажом и эргономичной планировкой",
      location: "Владимирская область",
      area: "120",
      price: "4.7 млн ₽",
      image: "https://images.unsplash.com/photo-1510627489930-0c1b0bfb6785?auto=format&fit=crop&w=800&q=80"
    }
  ];
  
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
          <button className="btn btn-outline py-2.5 px-6">
            Смотреть все проекты
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsGallery;
