
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SectionTitle from '@/components/UI/SectionTitle';
import ProjectCard from '@/components/UI/ProjectCard';
import { projectsData, getUniqueRegions, getCitiesByRegion, REGIONS } from '@/data/projects';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

const AllProjects = () => {
  const [activeRegion, setActiveRegion] = useState<string>('all');
  const [activeCity, setActiveCity] = useState<string>('all');
  const [cities, setCities] = useState<string[]>([]);
  const regions = getUniqueRegions();
  
  useEffect(() => {
    if (activeRegion !== 'all') {
      const regionCities = getCitiesByRegion(activeRegion);
      setCities(regionCities);
    } else {
      setCities([]);
    }
    setActiveCity('all');
  }, [activeRegion]);
  
  const filteredProjects = projectsData.filter(project => {
    if (activeRegion === 'all') return true;
    if (project.region !== activeRegion) return false;
    if (activeCity === 'all') return true;
    return project.city === activeCity;
  });
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16 bg-construction-sand/10">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Наши проекты" 
            subtitle="Реализованные работы"
            className="mb-12"
          />
          
          <div className="mb-12">
            <h3 className="text-xl font-serif mb-4 text-construction-dark">Выберите регион</h3>
            <div className="flex flex-wrap gap-2 mb-6">
              <Button 
                variant={activeRegion === 'all' ? 'default' : 'outline'}
                onClick={() => setActiveRegion('all')}
                className={activeRegion === 'all' ? 'bg-construction-dark' : ''}
              >
                Все регионы
              </Button>
              {regions.map(region => (
                <Button 
                  key={region}
                  variant={activeRegion === region ? 'default' : 'outline'}
                  onClick={() => setActiveRegion(region)}
                  className={activeRegion === region ? 'bg-construction-dark' : ''}
                >
                  {region}
                </Button>
              ))}
            </div>
            
            {cities.length > 0 && (
              <div>
                <h3 className="text-xl font-serif mb-4 text-construction-dark">Выберите город</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  <Button 
                    variant={activeCity === 'all' ? 'default' : 'outline'}
                    onClick={() => setActiveCity('all')}
                    className={activeCity === 'all' ? 'bg-construction-dark' : ''}
                  >
                    Все города
                  </Button>
                  {cities.map(city => (
                    <Button 
                      key={city}
                      variant={activeCity === city ? 'default' : 'outline'}
                      onClick={() => setActiveCity(city)}
                      className={activeCity === city ? 'bg-construction-dark' : ''}
                    >
                      {city}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  image={project.image}
                  title={project.title}
                  description={project.description}
                  location={project.city ? `${project.city}, ${project.region}` : project.location}
                  area={project.area}
                  price={project.price}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-serif mb-4 text-construction-dark">Проекты не найдены</h3>
              <p className="text-construction-medium mb-6">
                К сожалению, проекты с выбранными параметрами отсутствуют.
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setActiveRegion('all');
                  setActiveCity('all');
                }}
              >
                Сбросить фильтры
              </Button>
            </div>
          )}
          
          <div className="text-center mt-8">
            <Link to="/">
              <Button variant="outline">
                Вернуться на главную
              </Button>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AllProjects;
