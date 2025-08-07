
/**
 * Мок-сервис для симуляции отправки сообщений в Telegram в режиме разработки
 */

import { ContactFormData } from './telegramService';

/**
 * Симулирует отправку данных в Telegram
 * @param formData Данные из формы обратной связи
 */
export const mockSendToTelegram = (formData: ContactFormData): void => {
  // Форматируем сообщение (аналогично серверной функции)
  const message = `
🔔 НОВАЯ ЗАЯВКА С САЙТА (МОК)

👤 Имя: ${formData.name}
📞 Телефон: ${formData.phone}
✉️ Email: ${formData.email || 'Не указан'}
💬 Сообщение: 
${formData.message || 'Не указано'}

⏰ Дата: ${new Date().toLocaleString('ru-RU')}
`;

  // Выводим сообщение в консоль браузера
  console.log('---------------------------------------');
  console.log('📱 СИМУЛЯЦИЯ ОТПРАВКИ В TELEGRAM');
  console.log(message);
  console.log('---------------------------------------');
  console.log('✅ В рабочей версии это сообщение будет отправлено в Telegram');
};
