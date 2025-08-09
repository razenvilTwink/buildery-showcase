import React, { useState } from 'react';
import { Phone, Clock, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { sendCallbackRequest } from '@/services/telegramService';

interface CallbackButtonProps {
  className?: string;
  variant?: 'floating' | 'inline';
  size?: 'sm' | 'md' | 'lg';
}

const CallbackButton = ({ 
  className, 
  variant = 'floating',
  size = 'md'
}: CallbackButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [bestTime, setBestTime] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sizeClasses = {
    sm: 'text-xs py-2 px-3',
    md: 'text-sm py-3 px-4',
    lg: 'text-base py-4 px-6'
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Валидация номера телефона
      const phoneDigits = phone.replace(/\D/g, '');
      if (phoneDigits.length !== 11) {
        toast.error("Пожалуйста, введите корректный номер телефона");
        setIsSubmitting(false);
        return;
      }

      const result = await sendCallbackRequest({
        name,
        phone,
        bestTime,
        requestType: 'callback'
      });

      if (result.success) {
        toast.success("Заявка на обратный звонок успешно отправлена! Мы перезвоним в течение 15 минут.");
        setName('');
        setPhone('');
        setBestTime('');
        setIsOpen(false);
      } else {
        toast.error(`Ошибка при отправке: ${result.message}`);
      }
    } catch (error) {
      console.error('Ошибка при отправке заявки на звонок:', error);
      toast.error("Произошла ошибка при отправке заявки. Пожалуйста, попробуйте позже.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatPhoneInput = (value: string) => {
    let digits = value.replace(/\D/g, '');

    if (!digits.startsWith('7') && !digits.startsWith('+7')) {
      digits = '7' + digits;
    }

    if (digits.length > 11) {
      digits = digits.substring(0, 11);
    }

    let formattedValue = '';
    if (digits.length > 0) {
      formattedValue = '+7 ';
      if (digits.length > 1) {
        formattedValue += `(${digits.substring(1, 4)}`;
      }
      if (digits.length > 4) {
        formattedValue += `) ${digits.substring(4, 7)}`;
      }
      if (digits.length > 7) {
        formattedValue += `-${digits.substring(7, 9)}`;
      }
      if (digits.length > 9) {
        formattedValue += `-${digits.substring(9, 11)}`;
      }
    }

    return formattedValue;
  };

  if (variant === 'floating') {
    return (
      <>
        <button
          onClick={() => setIsOpen(true)}
          className={cn(
            'fixed bottom-6 right-6 z-40 bg-construction-dark text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105',
            sizeClasses[size],
            'flex items-center gap-2',
            className
          )}
          aria-label="Заказать обратный звонок"
        >
          <Phone className="h-5 w-5" />
          <span className="hidden sm:inline">Обратный звонок</span>
        </button>

        {isOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                aria-label="Закрыть"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="mb-6">
                <h3 className="text-xl font-serif font-semibold text-construction-dark mb-2">
                  Заказать обратный звонок
                </h3>
                <p className="text-construction-medium text-sm">
                  Оставьте свой номер телефона и мы перезвоним в течение 15 минут
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="callback-name" className="block text-sm font-medium text-construction-medium mb-1">
                    Ваше имя <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="callback-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-construction-light focus:border-construction-light transition-colors"
                    placeholder="Иван Иванов"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="callback-phone" className="block text-sm font-medium text-construction-medium mb-1">
                    Телефон <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="callback-phone"
                    value={phone}
                    onChange={(e) => setPhone(formatPhoneInput(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-construction-light focus:border-construction-light transition-colors"
                    placeholder="+7 (___) ___-__-__"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="callback-time" className="block text-sm font-medium text-construction-medium mb-1">
                    Удобное время для звонка
                  </label>
                  <select
                    id="callback-time"
                    value={bestTime}
                    onChange={(e) => setBestTime(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-construction-light focus:border-construction-light transition-colors"
                  >
                    <option value="">Любое время</option>
                    <option value="9:00-12:00">Утром (9:00-12:00)</option>
                    <option value="12:00-15:00">Днем (12:00-15:00)</option>
                    <option value="15:00-18:00">Вечером (15:00-18:00)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={cn(
                    "btn btn-primary w-full py-2 px-4",
                    isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                  )}
                >
                  {isSubmitting ? "Отправка..." : "Заказать звонок"}
                </button>
              </form>

              <p className="text-xs text-construction-medium mt-4 text-center">
                Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
              </p>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <button
      onClick={() => setIsOpen(true)}
      className={cn(
        'btn btn-primary',
        sizeClasses[size],
        'flex items-center gap-2',
        className
      )}
    >
      <Phone className="h-4 w-4" />
      <span>Обратный звонок</span>
    </button>
  );
};

export default CallbackButton;