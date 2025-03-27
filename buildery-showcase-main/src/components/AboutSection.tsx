import React, { useEffect, useRef } from 'react';
import SectionTitle from './UI/SectionTitle';

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
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
  
  // Очищенный номер телефона (без пробелов, скобок, дефисов)
  const cleanPhoneNumber = '+79064772444';
  // Форматированный номер для отображения
  const displayPhoneNumber = '+7 (906) 477-24-44';

  return (
    <section id="about" className="py-20 relative" ref={sectionRef}>
      <div 
        className="absolute inset-0 bg-hero-pattern bg-cover bg-center"
        style={{ opacity: 0.08 }}
      ></div>
      
      <div className="section-container relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="reveal-element reveal-left">
            <SectionTitle 
              title="О нашей компании" 
              subtitle="Качество и надежность"
              centered={false}
            />
            
            <p className="text-construction-medium mb-6 text-balance">
              Наша строительная компания специализируется на возведении современных домов и коттеджей под ключ. 
              Мы работаем на рынке более 10 лет и за это время построили десятки объектов, которыми гордимся.
            </p>
            
            <p className="text-construction-medium mb-8 text-balance">
              Используем только высококачественные материалы, соблюдаем все технологические нормы и работаем в соответствии с современными стандартами строительства. 
              Вам не придется переплачивать за лишние материалы или работы. 
              Мы четко соблюдаем сроки и бюджет проекта.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a
                href={`tel:${cleanPhoneNumber}`}
                className="btn btn-primary py-3 px-6 text-base"
              >
                {displayPhoneNumber}
              </a>
              
              <button className="btn btn-outline py-3 px-6 text-base">
                Запросить смету
              </button>
            </div>
          </div>
          
          <div className="reveal-element reveal-right">
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=800&q=80" 
                alt="Строительство дома" 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-construction-dark/40 to-transparent pointer-events-none" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-black to-transparent">
                <div className="text-white">
                  <h3 className="text-2xl font-serif font-semibold mb-2">Доверьте нам свой дом</h3>
                  <p className="text-white/80">Профессиональный подход к каждому проекту</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 reveal-element reveal-bottom">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
            <div className="text-4xl font-serif font-bold text-construction-dark mb-2">10+</div>
            <div className="text-construction-medium">Лет опыта</div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
            <div className="text-4xl font-serif font-bold text-construction-dark mb-2">150+</div>
            <div className="text-construction-medium">Построенных домов</div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
            <div className="text-4xl font-serif font-bold text-construction-dark mb-2">45</div>
            <div className="text-construction-medium">Специалистов</div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
            <div className="text-4xl font-serif font-bold text-construction-dark mb-2">98%</div>
            <div className="text-construction-medium">Довольных клиентов</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;