
/**
 * Сервис для прямой отправки сообщений в Telegram бот
 */

import { mockSendToTelegram } from './mockTelegramService';

// Telegram Bot API
const TELEGRAM_BOT_TOKEN = '7809537061:AAHWVRqNikuUyTz0I7C4ycNR0GOUweIKv08';
const TELEGRAM_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID || '361122150'; // ID чата куда отправлять сообщения
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

// Интерфейс для данных формы обратной связи
export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  message: string;
}

/**
 * Форматирует сообщение для отправки в Telegram
 */
const formatTelegramMessage = (formData: ContactFormData): string => {
  return `
🔔 НОВАЯ ЗАЯВКА С САЙТА

👤 Имя: ${formData.name}
📞 Телефон: ${formData.phone}
✉️ Email: ${formData.email || 'Не указан'}
💬 Сообщение: 
${formData.message || 'Не указано'}

⏰ Дата: ${new Date().toLocaleString('ru-RU')}
`;
};

/**
 * Отправляет данные формы напрямую в Telegram бот
 * @param formData Данные из формы обратной связи
 * @returns Promise с результатом отправки
 */
export const sendContactFormToTelegram = async (formData: ContactFormData): Promise<{ success: boolean; message: string }> => {
  // В режиме разработки используем мок-сервис
  if (import.meta.env.DEV) {
    mockSendToTelegram(formData);
    return { success: true, message: 'Сообщение успешно отправлено (режим разработки)' };
  }
  
  try {
    // Форматируем сообщение для Telegram
    const text = formatTelegramMessage(formData);
    
    // Используем chatId из переменной окружения или стандартное значение для демонстрации
    // Важно: этот chatId должен соответствовать вашему чату в Telegram
    const chatId = TELEGRAM_CHAT_ID || '12345678'; // Замените на ваш Chat ID (можно узнать через @userinfobot в Telegram)
    
    const response = await fetch(TELEGRAM_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: 'HTML'
      }),
    });

    const data = await response.json();
    
    if (!data.ok) {
      throw new Error(data.description || 'Произошла ошибка при отправке сообщения');
    }

    return { success: true, message: 'Сообщение успешно отправлено' };
  } catch (error) {
    console.error('Ошибка при отправке данных в Telegram:', error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Произошла неизвестная ошибка'
    };
  }
};
