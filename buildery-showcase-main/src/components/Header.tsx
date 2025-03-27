import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Header = ({ className }: { className?: string }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={cn("bg-white border-b sticky top-0 z-50", className)}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Логотип */}
        <Link to="/" className="font-serif text-xl font-bold text-construction-dark">
          Строй Мечту
        </Link>

        {/* Мобильная кнопка меню */}
        <button 
          className="md:hidden"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Десктопное меню */}
        <nav className="hidden md:block">
          <ul className="flex items-center space-x-6">
            <li>
              <Link to="/" className="text-sm text-construction-dark hover:text-construction-medium transition-colors">
                Главная
              </Link>
            </li>
            <li>
              <Link to="/projects" className="text-sm text-construction-dark hover:text-construction-medium transition-colors">
                Проекты
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-sm text-construction-dark hover:text-construction-medium transition-colors">
                О компании
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-sm text-construction-dark hover:text-construction-medium transition-colors">
                Контакты
              </Link>
            </li>
            <li className="ml-4">
              <Link to="/admin" className="text-sm text-construction-dark hover:text-construction-medium transition-colors">
                Админ
              </Link>
            </li>
            <li className="ml-4">
              <Button className="bg-construction-dark hover:bg-construction-dark/90">
                Заказать звонок
              </Button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Мобильное меню */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <nav className="container mx-auto px-4 py-4">
            <ul className="space-y-4">
              <li>
                <Link 
                  to="/" 
                  className="block py-2 text-construction-dark hover:text-construction-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Главная
                </Link>
              </li>
              <li>
                <Link 
                  to="/projects" 
                  className="block py-2 text-construction-dark hover:text-construction-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Проекты
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="block py-2 text-construction-dark hover:text-construction-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  О компании
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="block py-2 text-construction-dark hover:text-construction-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Контакты
                </Link>
              </li>
              <li>
                <Link 
                  to="/admin" 
                  className="block py-2 text-construction-dark hover:text-construction-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Админ
                </Link>
              </li>
              <li className="pt-2">
                <Button className="w-full bg-construction-dark hover:bg-construction-dark/90">
                  Заказать звонок
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
