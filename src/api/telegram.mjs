
// Суперструктура для Supabase Edge Function
// ДЛЯ ЗАПУСКА НА СЕРВЕРЕ

import { telegramBot, formatContactMessage, sendMessageToAllAuthorizedUsers } from './telegramBot.js';

// Обработчик HTTP-запросов для Supabase Edge Function
export const handler = async (req) => {
  // Только POST-запросы
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ success: false, message: 'Метод не поддерживается' }),
      { status: 405, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    // Получаем данные из запроса
    const formData = await req.json();
    
    // Проверяем наличие обязательных полей
    if (!formData.name || !formData.phone) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Не указаны обязательные поля (имя и телефон)' 
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // Форматируем сообщение
    const message = formatContactMessage(formData);
    
    // Отправляем сообщение всем авторизованным пользователям
    const sent = await sendMessageToAllAuthorizedUsers(message);
    
    if (sent) {
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Сообщение успешно отправлено' 
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    } else {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Не удалось отправить сообщение' 
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error('Ошибка обработки запроса:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: 'Произошла ошибка при обработке запроса' 
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

// Экспортируем для локального тестирования
export default handler;
