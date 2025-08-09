
import { useState } from 'react';

interface UseGallerySliderProps {
  totalItems: number;
  visibleItems: number;
}

export const useGallerySlider = ({ totalItems, visibleItems }: UseGallerySliderProps) => {
  const [startIndex, setStartIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setStartIndex((prevIndex) => 
      (prevIndex + 1) % (totalItems - visibleItems + 1)
    );
    setTimeout(() => setIsTransitioning(false), 500);
  };
  
  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setStartIndex((prevIndex) => 
      prevIndex === 0 ? totalItems - visibleItems : prevIndex - 1
    );
    setTimeout(() => setIsTransitioning(false), 500);
  };
  
  const canSlideNext = startIndex < totalItems - visibleItems;
  const canSlidePrev = startIndex > 0;
  
  return {
    startIndex,
    isTransitioning,
    nextSlide,
    prevSlide,
    canSlideNext,
    canSlidePrev
  };
};
