
import React, { useState } from 'react';
import { Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface CallButtonProps {
  phoneNumber: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const CallButton = ({ 
  phoneNumber, 
  className, 
  variant = 'primary', 
  fullWidth = false,
  showIcon = true,
  size = 'md'
}: CallButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const formattedNumber = phoneNumber.replace(/[^\d+]/g, '');
  
  const handleCall = () => {
    window.location.href = `tel:${formattedNumber}`;
    toast.success("Набираем номер...");
  };
  
  const handleCopyPhone = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(phoneNumber);
    toast.success("Номер скопирован в буфер обмена");
  };
  
  const sizeClasses = {
    sm: 'text-xs py-1.5 px-3',
    md: 'text-sm py-2 px-4',
    lg: 'text-base py-3 px-6'
  };
  
  return (
    <button
      type="button"
      onClick={handleCall}
      onContextMenu={handleCopyPhone}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        'btn transition-all duration-300 font-medium rounded-md',
        sizeClasses[size],
        variant === 'primary' && 'btn-primary',
        variant === 'secondary' && 'btn-secondary',
        variant === 'outline' && 'btn-outline',
        fullWidth && 'w-full',
        isHovered && 'scale-105',
        className
      )}
    >
      <span className="flex items-center gap-2">
        {showIcon && <Phone className="h-4 w-4" />}
        <span>{phoneNumber}</span>
      </span>
    </button>
  );
};

export default CallButton;
