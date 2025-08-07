import React from 'react';
import CallbackButton from './CallbackButton';
import CallButton from './CallButton';
import { MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FloatingActionsProps {
  className?: string;
}

const FloatingActions = ({ className }: FloatingActionsProps) => {
  const handleWhatsAppClick = () => {
    const phoneNumber = '79064772444';
    const message = 'Здравствуйте! Интересует строительство дома.';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className={cn('fixed bottom-6 right-6 z-40 flex flex-col gap-3', className)}>
      {/* WhatsApp кнопка */}
      <button
        onClick={handleWhatsAppClick}
        className="bg-green-500 hover:bg-green-600 text-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        aria-label="Написать в WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* Кнопка звонка */}
      <CallButton
        phoneNumber="+7 (906) 477-24-44"
        variant="primary"
        size="md"
        className="rounded-full p-3 shadow-lg"
        showIcon={true}
      />

      {/* Кнопка обратного звонка */}
      <CallbackButton variant="floating" size="md" />
    </div>
  );
};

export default FloatingActions;