
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
    description: 'Сейчас вы видите это сообщение, потому что бот работает только на сервере',
    duration: 5000,
  });
};

export default mockSendToTelegram;
