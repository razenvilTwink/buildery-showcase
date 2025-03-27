
import React, { useState, useRef, useEffect } from 'react';
import SectionTitle from './UI/SectionTitle';
import { cn } from '@/lib/utils';

interface HouseType {
  id: number;
  title: string;
  description: string;
  price: string;
  image: string;
  features: string[];
}

const HouseTypes = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const houseTypes: HouseType[] = [
    {
      id: 1,
      title: "Комфорт",
      description: "Оптимальное решение для семей, ценящих функциональность и комфорт. Дома данной комплектации имеют все необходимое для комфортного проживания.",
      price: "от 2.5 млн ₽",
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=800&q=80",
      features: [
        "Площадь от 80 до 120 м²",
        "2-3 спальни",
        "Теплый пол",
        "Базовая отделка",
        "Срок строительства - 4 месяца"
      ]
    },
    {
      id: 2,
      title: "Премиум",
      description: "Идеальный вариант для тех, кто ценит высокое качество и стремится к максимальному комфорту. Продуманные планировки и премиальные материалы.",
      price: "от 4.2 млн ₽",
      image: "https://images.unsplash.com/photo-1460574283810-2aab119d8511?auto=format&fit=crop&w=800&q=80",
      features: [
        "Площадь от 120 до 180 м²",
        "3-4 спальни",
        "Панорамные окна",
        "Премиум отделка",
        "Умный дом",
        "Срок строительства - 6 месяцев"
      ]
    },
    {
      id: 3,
      title: "Эксклюзив",
      description: "Уникальные проекты с индивидуальной архитектурой. Эксклюзивная отделка и благоустройство территории. Дома, не имеющие аналогов.",
      price: "от 7.5 млн ₽",
      image: "https://images.unsplash.com/photo-1493397212122-2b85dda8106b?auto=format&fit=crop&w=800&q=80",
      features: [
        "Площадь от 180 м²",
        "Индивидуальный проект",
        "Эксклюзивные материалы",
        "Ландшафтный дизайн",
        "Дизайнерская отделка",
        "Срок строительства - индивидуально"
      ]
    }
  ];
  
  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % houseTypes.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };
  
  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + houseTypes.length) % houseTypes.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };
  
  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };
  
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
    <section id="houses" className="py-20 bg-construction-sand/30" ref={sectionRef}>
      <div className="section-container">
        <SectionTitle 
          title="Комплектации домов" 
          subtitle="Подберем идеальный вариант"
          className="reveal-element reveal-bottom"
        />
        
        <div className="relative overflow-hidden reveal-element reveal-bottom">
          <div 
            className={cn(
              "flex transition-transform duration-500 ease-in-out",
              isTransitioning ? "transform blur-sm" : ""
            )}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {houseTypes.map((house) => (
              <div key={house.id} className="w-full flex-shrink-0">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="relative rounded-xl overflow-hidden shadow-xl h-full">
                    <img 
                      src={house.image} 
                      alt={house.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="inline-block px-3 py-1 bg-construction-light text-construction-dark rounded-full mb-3 text-sm font-medium">
                        {house.price}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 bg-white rounded-xl shadow-lg">
                    <h3 className="text-2xl font-serif font-semibold mb-4 text-construction-dark">
                      {house.title}
                    </h3>
                    <p className="text-construction-medium mb-6">
                      {house.description}
                    </p>
                    
                    <h4 className="font-medium text-construction-dark mb-3">Особенности:</h4>
                    <ul className="space-y-2 mb-6">
                      {house.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <svg className="w-5 h-5 text-construction-light mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-construction-medium">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <button className="btn btn-primary py-2.5 px-6">
                      Узнать подробнее
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <button 
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 text-construction-dark p-2 rounded-full shadow-md hover:bg-white transition-colors z-10"
            aria-label="Предыдущий"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 text-construction-dark p-2 rounded-full shadow-md hover:bg-white transition-colors z-10"
            aria-label="Следующий"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        
        <div className="flex justify-center mt-8 space-x-2 reveal-element reveal-bottom">
          {houseTypes.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-300",
                index === currentIndex 
                  ? "bg-construction-dark w-8" 
                  : "bg-construction-medium/30 hover:bg-construction-medium/50"
              )}
              aria-label={`Перейти к слайду ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HouseTypes;
