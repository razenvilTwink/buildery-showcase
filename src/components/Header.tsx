import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { sendCallbackRequest } from '@/services/telegramService';

const Header = ({ className }: { className?: string }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const CallbackDialog = () => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();

    const handleCallbackRequest = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      
      try {
        const phoneDigits = phone.replace(/\D/g, '');
        if (phoneDigits.length !== 11) {
          toast.error("Пожалуйста, введите корректный номер телефона");
          setIsSubmitting(false);
          return;
        }

        const result = await sendCallbackRequest({
          name,
          phone,
          requestType: 'callback'
        });

        if (result.success) {
          toast.success("Запрос отправлен! Мы перезвоним вам в ближайшее время.");
          setName('');
          setPhone('');
          setOpen(false);
        } else {
          toast.error(`Ошибка при отправке: ${result.message}`);
        }
      } catch (error) {
        console.error('Ошибка при отправке формы:', error);
        toast.error("Произошла ошибка при отправке заявки. Пожалуйста, попробуйте позже.");
      } finally {
        setIsSubmitting(false);
      }
    };

    const formatPhone = (value: string) => {
      let digits = value.replace(/\D/g, '');
      
      if (!digits.startsWith('7') && !digits.startsWith('+7')) {
        digits = '7' + digits;
      }

      if (digits.length > 11) {
        digits = digits.substring(0, 11);
      }

      let formatted = '';
      if (digits.length > 0) {
        formatted = '+7 ';
        if (digits.length > 1) {
          formatted += `(${digits.substring(1, 4)}`;
        }
        if (digits.length > 4) {
          formatted += `) ${digits.substring(4, 7)}`;
        }
        if (digits.length > 7) {
          formatted += `-${digits.substring(7, 9)}`;
        }
        if (digits.length > 9) {
          formatted += `-${digits.substring(9, 11)}`;
        }
      }

      return formatted;
    };

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="bg-construction-dark hover:bg-construction-dark/90">
            Заказать звонок
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Заказать обратный звонок</DialogTitle>
            <DialogDescription>
              Оставьте свои данные, и мы перезвоним вам в ближайшее время
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCallbackRequest}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Ваше имя *</Label>
                <Input 
                  id="name" 
                  placeholder="Иван Иванов" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Номер телефона *</Label>
                <Input 
                  id="phone" 
                  placeholder="+7 (___) ___-__-__" 
                  value={phone}
                  onChange={(e) => setPhone(formatPhone(e.target.value))}
                  required
                  pattern="\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Отправка..." : "Заказать звонок"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <header className={cn("bg-white border-b sticky top-0 z-50", className)}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="font-serif text-xl font-bold text-construction-dark">
          Строй Мечту
        </Link>

        <button 
          className="md:hidden"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

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
              <CallbackDialog />
            </li>
          </ul>
        </nav>
      </div>

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
              <li className="pt-2">
                <CallbackDialog />
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
