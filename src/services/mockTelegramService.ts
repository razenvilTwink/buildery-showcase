
/**
 * Временный сервис для имитации отправки уведомлений в Telegram
 * Используется для локальной разработки без настоящего Telegram-бота
 */

import { ContactFormData } from './telegramService';
import { toast } from 'sonner';

/**
 * Имитирует отправку сообщения в Telegram
 * В реальной среде будет заменен настоящим API
 */
export const mockSendToTelegram = (formData: ContactFormData): void => {
  console.group('📨 Новое сообщение для Telegram:');
  console.log('👤 От:', formData.name);
  console.log('📞 Телефон:', formData.phone);
  console.log('✉️ Email:', formData.email || 'Не указан');
  console.log('💬 Сообщение:', formData.message || 'Не указано');
  console.log('⏰ Время:', new Date().toLocaleString());
  console.groupEnd();
  
  toast.info('Заявка будет отправлена в Telegram-бот при работе на сервере', {
    description: 'Бот настроен и готов к работе с вашим токеном. На продакшн сервере все сообщения будут приходить в ваш Telegram.',
    duration: 5000,
  });
};

export default mockSendToTelegram;
