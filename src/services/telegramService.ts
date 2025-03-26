
/**
 * Сервис для отправки сообщений в Telegram бот
 */

import { mockSendToTelegram } from './mockTelegramService';

// URL API Telegram бота
const TELEGRAM_API_URL = import.meta.env.VITE_TELEGRAM_API_URL || '/api/telegram';

// Интерфейс для данных формы обратной связи
export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  message: string;
}

/**
 * Отправляет данные формы в Telegram бот
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
    const response = await fetch(TELEGRAM_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        // Добавляем временную метку для отслеживания
        timestamp: new Date().toISOString()
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Произошла ошибка при отправке сообщения');
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
