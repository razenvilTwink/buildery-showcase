
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { MapPin, Home } from 'lucide-react';

interface ProjectCardProps {
  image: string;
  title: string;
  description: string;
  location?: string;
  area?: string;
  price?: string;
  className?: string;
}

const ProjectCard = ({ 
  image, 
  title, 
  description, 
  location, 
  area, 
  price,
  className 
}: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={cn(
        'relative overflow-hidden rounded-lg bg-white shadow-md transition-all duration-500',
        isHovered ? 'shadow-xl scale-[1.02]' : '',
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-56 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className={cn(
            'w-full h-full object-cover transition-all duration-700',
            isHovered ? 'scale-110' : 'scale-100'
          )}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80" />
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-serif font-semibold mb-2 text-construction-dark">{title}</h3>
        <p className="text-construction-medium text-sm mb-4">{description}</p>
        
        <div className="flex flex-wrap gap-4 text-sm">
          {location && (
            <div className="flex items-center gap-1 text-construction-medium">
              <MapPin className="h-4 w-4" />
              <span>{location}</span>
            </div>
          )}
          
          {area && (
            <div className="flex items-center gap-1 text-construction-medium">
              <Home className="h-4 w-4" />
              <span>{area} м²</span>
            </div>
          )}
          
          {price && (
            <div className="ml-auto font-medium text-construction-dark">
              {price}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
