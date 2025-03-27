
import React from 'react';
import { cn } from '@/lib/utils';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

const SectionTitle = ({ title, subtitle, centered = true, className }: SectionTitleProps) => {
  return (
    <div className={cn(
      'mb-10 relative',
      centered && 'text-center',
      className
    )}>
      {subtitle && (
        <span className="text-sm md:text-base tracking-wider uppercase text-construction-medium mb-2 inline-block">
          {subtitle}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-construction-dark">
        {title}
      </h2>
      <div className={cn(
        'h-1 w-16 bg-construction-light mt-4',
        centered ? 'mx-auto' : ''
      )} />
    </div>
  );
};

export default SectionTitle;
