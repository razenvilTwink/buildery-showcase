
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SectionTitle from '@/components/UI/SectionTitle';
import ProjectCard from '@/components/UI/ProjectCard';
import { projectsData } from '@/data/projects';

const AllProjects = () => {
  const [filter, setFilter] = useState('all');
  
  const filteredProjects = filter === 'all' 
    ? projectsData 
    : projectsData.filter(project => {
        // Здесь можно добавить логику фильтрации по типу дома, цене и т.д.
        return project.location.includes(filter);
      });
  
  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="pt-24 pb-16 bg-construction-sand/10">
        <div className="section-container">
          <SectionTitle 
            title="Наши проекты" 
            subtitle="Реализованные работы"
            className="reveal-element reveal-bottom"
          />
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button 
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                filter === 'all' 
                  ? 'bg-construction-dark text-white' 
                  : 'bg-white border border-construction-medium/20 hover:bg-construction-light/10'
              }`}
            >
              Все проекты
            </button>
            <button 
              onClick={() => setFilter('Московская')}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                filter === 'Московская' 
                  ? 'bg-construction-dark text-white' 
                  : 'bg-white border border-construction-medium/20 hover:bg-construction-light/10'
              }`}
            >
              Московская область
            </button>
            <button 
              onClick={() => setFilter('Ленинградская')}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                filter === 'Ленинградская' 
                  ? 'bg-construction-dark text-white' 
                  : 'bg-white border border-construction-medium/20 hover:bg-construction-light/10'
              }`}
            >
              Ленинградская область
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                image={project.image}
                title={project.title}
                description={project.description}
                location={project.location}
                area={project.area}
                price={project.price}
              />
            ))}
          </div>
          
          <div className="text-center">
            <Link to="/" className="btn btn-outline py-2.5 px-6">
              Вернуться на главную
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AllProjects;
