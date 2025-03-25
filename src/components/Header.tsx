
import React, { useState, useEffect } from 'react';
import CallButton from './UI/CallButton';
import { cn } from '@/lib/utils';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 20);
  };
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
      setIsMobileMenuOpen(false);
    }
  };
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const navItems = [
    { label: "О компании", id: "about" },
    { label: "Дома", id: "houses" },
    { label: "Преимущества", id: "advantages" },
    { label: "Проекты", id: "projects" },
    { label: "Галерея", id: "gallery" },
    { label: "Контакты", id: "contact" }
  ];
  
  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled 
          ? 'bg-white/95 backdrop-blur-sm shadow-md py-2' 
          : 'bg-transparent py-4'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="text-construction-dark font-serif text-xl md:text-2xl font-bold">
              ГоризонтСтрой
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-construction-dark hover:text-construction-light transition-colors duration-200 font-medium"
              >
                {item.label}
              </button>
            ))}
          </nav>
          
          <div className="hidden md:block">
            <CallButton 
              phoneNumber="+7 (999) 123-45-67" 
              variant="primary"
            />
          </div>
          
          <button 
            className="block md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              className="w-6 h-6 text-construction-dark"
            >
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 bg-white rounded-lg shadow-lg animate-fade-in">
            <nav className="flex flex-col space-y-4 px-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-construction-dark hover:text-construction-light transition-colors duration-200 font-medium text-left py-2 border-b border-gray-100 last:border-b-0"
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-2">
                <CallButton 
                  phoneNumber="+7 (999) 123-45-67" 
                  variant="primary"
                  fullWidth
                />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
