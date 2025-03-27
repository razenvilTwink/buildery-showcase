
import React, { useRef, useEffect } from 'react';
import SectionTitle from './UI/SectionTitle';

const ProjectsVideo = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            
            // Автозапуск видео при прокрутке до него
            if (videoRef.current && entry.target === videoRef.current.parentElement) {
              videoRef.current.play().catch(e => console.log("Автовоспроизведение видео отклонено браузером:", e));
            }
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
    <section id="projects" className="py-20 bg-construction-dark text-white" ref={sectionRef}>
      <div className="section-container">
        <SectionTitle 
          title="Наши проекты" 
          subtitle="Посмотрите на наши работы"
          className="reveal-element reveal-bottom text-white"
        />
        
        <div className="mt-12 grid md:grid-cols-2 gap-6 lg:gap-12 items-center">
          <div className="reveal-element reveal-left md:order-2">
            <div className="rounded-xl overflow-hidden shadow-2xl relative">
              <div className="relative pb-[56.25%] h-0">
                {/* Замените на свое реальное видео */}
                <video
                  ref={videoRef}
                  className="absolute top-0 left-0 w-full h-full object-cover"
                  controls
                  poster="https://images.unsplash.com/photo-1460574283810-2aab119d8511?auto=format&fit=crop&w=800&q=80"
                  playsInline
                  muted
                >
                  {/* Здесь нужно добавить ваше реальное видео */}
                  <source src="https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
                  Ваш браузер не поддерживает видео.
                </video>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
          
          <div className="reveal-element reveal-right md:order-1">
            <h3 className="text-2xl font-serif font-semibold mb-4">Мы создаем дома вашей мечты</h3>
            <p className="text-gray-300 mb-6">
              В этом видео вы можете увидеть процесс строительства одного из наших проектов от заливки фундамента до полной отделки. 
              Мы уделяем внимание каждой детали, чтобы создать идеальный дом для наших клиентов.
            </p>
            <p className="text-gray-300 mb-6">
              Каждый проект уникален и разрабатывается с учетом всех пожеланий заказчика. 
              Мы строим не просто дома, а создаем пространство для комфортной жизни, где каждый элемент продуман до мельчайших деталей.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-10 h-1 bg-construction-light rounded-full"></div>
                <p className="text-gray-200 font-medium">Современная архитектура</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-1 bg-construction-light rounded-full"></div>
                <p className="text-gray-200 font-medium">Экологичные материалы</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-1 bg-construction-light rounded-full"></div>
                <p className="text-gray-200 font-medium">Энергоэффективность</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsVideo;
