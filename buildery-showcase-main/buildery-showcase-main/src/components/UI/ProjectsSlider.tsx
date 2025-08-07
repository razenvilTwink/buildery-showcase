
import React from 'react';
import { cn } from '@/lib/utils';
import ProjectCard from './ProjectCard';
import { Project } from '@/data/projects';

interface ProjectsSliderProps {
  projects: Project[];
  startIndex: number;
  isTransitioning: boolean;
  visibleProjects: number;
}

const ProjectsSlider = ({ 
  projects, 
  startIndex, 
  isTransitioning,
  visibleProjects
}: ProjectsSliderProps) => {
  return (
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
  );
};

export default ProjectsSlider;
