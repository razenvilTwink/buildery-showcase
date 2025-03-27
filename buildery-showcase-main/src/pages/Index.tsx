
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import AboutSection from '@/components/AboutSection';
import HouseTypes from '@/components/HouseTypes';
import Advantages from '@/components/Advantages';
import ProjectsVideo from '@/components/ProjectsVideo';
import ProjectsGallery from '@/components/ProjectsGallery';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';

const Index = () => {
  // Анимация элементов при прокрутке
  useEffect(() => {
    const handleScroll = () => {
      const revealElements = document.querySelectorAll('.reveal-element');
      
      revealElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight * 0.85) {
          element.classList.add('active');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Вызываем при первой загрузке
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero секция */}
      <section className="pt-32 pb-20 bg-construction-sand/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-construction-sand/30 pointer-events-none" />
        
        <div className="section-container relative">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="md:order-1 reveal-element reveal-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 text-construction-dark leading-tight">
                Строим дома <br />мечты <span className="relative inline-block">
                  под ключ
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-construction-light"></span>
                </span>
              </h1>
              
              <p className="text-xl text-construction-medium mb-8 max-w-lg">
                Профессиональное строительство домов с полным циклом работ от проектирования до сдачи объекта.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <a 
                  href="#contact" 
                  className="btn btn-primary py-4 px-8 text-base rounded-md"
                >
                  Обсудить проект
                </a>
                
                <a 
                  href="#houses" 
                  className="btn btn-outline py-4 px-8 text-base rounded-md"
                >
                  Типы домов
                </a>
              </div>
              
              <div className="flex items-center mt-12 space-x-6">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-construction-light" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="ml-2 text-construction-medium">Гарантия качества</span>
                </div>
                
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-construction-light" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="ml-2 text-construction-medium">Фиксированная цена</span>
                </div>
              </div>
            </div>
            
            <div className="md:order-2 reveal-element reveal-right">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-construction-light/30 rounded-full blur-2xl z-0"></div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-construction-light/20 rounded-full blur-2xl z-0"></div>
                
                <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1200&q=80" 
                    alt="Современный дом" 
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <AboutSection />
      <HouseTypes />
      <Advantages />
      <ProjectsVideo />
      <ProjectsGallery />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default Index;
