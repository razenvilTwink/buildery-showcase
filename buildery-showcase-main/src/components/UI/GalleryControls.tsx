
import React from 'react';
import { cn } from '@/lib/utils';

interface GalleryControlsProps {
  prevSlide: () => void;
  nextSlide: () => void;
  canSlidePrev: boolean;
  canSlideNext: boolean;
}

const GalleryControls = ({ 
  prevSlide, 
  nextSlide, 
  canSlidePrev, 
  canSlideNext 
}: GalleryControlsProps) => {
  return (
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
  );
};

export default GalleryControls;
