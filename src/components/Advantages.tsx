
import React, { useRef, useEffect, useState } from 'react';
import SectionTitle from './UI/SectionTitle';
import { cn } from '@/lib/utils';
import QuickOrderModal from './UI/QuickOrderModal';

interface Advantage {
  id: number;
  title: string;
  description: string;
  icon: string;
}

const Advantages = () => {
  const [isQuickOrderOpen, setIsQuickOrderOpen] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const advantages: Advantage[] = [
    {
      id: 1,
      title: "Качественные материалы",
      description: "Используем только сертифицированные материалы от проверенных поставщиков для долговечности вашего дома.",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
            </svg>`
    },
    {
      id: 2,
      title: "Соблюдение сроков",
      description: "Гарантируем выполнение всех работ в согласованные сроки без задержек и переносов.",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>`
    },
    {
      id: 3,
      title: "Фиксированная стоимость",
      description: "Работаем по договору с фиксированной стоимостью. Никаких дополнительных платежей и скрытых расходов.",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
            </svg>`
    },
    {
      id: 4,
      title: "Профессиональная команда",
      description: "Наши специалисты имеют многолетний опыт в строительстве и регулярно повышают свою квалификацию.",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
            </svg>`
    },
    {
      id: 5,
      title: "Индивидуальный подход",
      description: "Учитываем все пожелания заказчика и предлагаем оптимальные решения для каждого проекта.",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="m21 7.5-2.25-1.313M21 7.5v2.25m0-2.25-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3 2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75 2.25-1.313M12 21.75V19.5m0 2.25-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25" />
            </svg>`
    },
    {
      id: 6,
      title: "Гарантия и поддержка",
      description: "Предоставляем гарантию на все виды работ и оказываем послестроительную поддержку.",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
            </svg>`
    }
  ];
  
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
    <section id="advantages" className="py-20 bg-white relative" ref={sectionRef}>
      <div className="section-container">
        <SectionTitle 
          title="Наши преимущества" 
          subtitle="Почему выбирают нас"
          className="reveal-element reveal-bottom"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {advantages.map((item, index) => (
            <div 
              key={item.id} 
              className={cn(
                "bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 card-hover reveal-element",
                index % 3 === 0 ? "reveal-left" : index % 3 === 2 ? "reveal-right" : "reveal-bottom"
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start">
                <div className="bg-construction-sand/50 p-3 rounded-lg text-construction-dark mr-4" 
                     dangerouslySetInnerHTML={{ __html: item.icon.replace('currentColor', '#2A2C2F') }}>
                </div>
                <div>
                  <h3 className="text-xl font-serif font-semibold mb-2 text-construction-dark">{item.title}</h3>
                  <p className="text-construction-medium text-sm">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center reveal-element reveal-bottom">
          <button 
            className="btn btn-primary py-3 px-8 text-base"
            onClick={() => setIsQuickOrderOpen(true)}
          >
            Обсудить ваш проект
          </button>
        </div>
      </div>
      
      <QuickOrderModal 
        isOpen={isQuickOrderOpen}
        onClose={() => setIsQuickOrderOpen(false)}
        projectTitle="Обсуждение индивидуального проекта"
      />
    </section>
  );
};

export default Advantages;
