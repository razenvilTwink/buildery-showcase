
/**
 * Сервис для прямой отправки сообщений в Telegram бот
 */

import { mockSendToTelegram } from './mockTelegramService';
import { isRequestSuspicious, sanitizeUserInput, createSpamProtectionId } from '@/utils/securityHelpers';

// Все отправки идут только на backend API (никаких токенов на клиенте)

// Интерфейсы для различных типов заявок
export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  message: string;
}

export interface CallbackRequest {
  name: string;
  phone: string;
  bestTime?: string;
  requestType: 'callback';
}

export interface QuickEstimateRequest {
  name: string;
  phone: string;
  projectType?: string;
  area?: string;
  budget?: string;
  description?: string;
  projectTitle?: string;
  requestType: 'quick_estimate';
}

// Защита от спама
const requestLimits = new Map<string, { count: number; lastRequest: number }>();
const MAX_REQUESTS_PER_HOUR = 3;
const HOUR_IN_MS = 60 * 60 * 1000;

/**
 * Проверка защиты от спама
 */
const checkSpamProtection = (identifier: string): boolean => {
  const now = Date.now();
  const userRequests = requestLimits.get(identifier);

  if (!userRequests) {
    requestLimits.set(identifier, { count: 1, lastRequest: now });
    return true;
  }

  // Сброс счетчика если прошел час
  if (now - userRequests.lastRequest > HOUR_IN_MS) {
    requestLimits.set(identifier, { count: 1, lastRequest: now });
    return true;
  }

  // Проверка лимита
  if (userRequests.count >= MAX_REQUESTS_PER_HOUR) {
    return false;
  }

  userRequests.count++;
  userRequests.lastRequest = now;
  return true;
};

/**
 * Валидация номера телефона
 */
const validatePhone = (phone: string): boolean => {
  const phoneDigits = phone.replace(/\D/g, '');
  return phoneDigits.length === 11 && phoneDigits.startsWith('7');
};

/**
 * Санитизация пользовательского ввода
 */
const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Удаляем HTML теги
    .replace(/javascript:/gi, '') // Удаляем javascript:
    .replace(/on\w+=/gi, '') // Удаляем event handlers
    .trim()
    .substring(0, 1000); // Ограничиваем длину
};

/**
 * Форматирует сообщение для отправки в Telegram
 */
const formatTelegramMessage = (formData: ContactFormData): string => {
  return `
🔔 НОВАЯ ЗАЯВКА С САЙТА

👤 Имя: ${sanitizeInput(formData.name)}
📞 Телефон: ${sanitizeInput(formData.phone)}
✉️ Email: ${sanitizeInput(formData.email) || 'Не указан'}
💬 Сообщение: 
${sanitizeInput(formData.message) || 'Не указано'}

⏰ Дата: ${new Date().toLocaleString('ru-RU')}
🌐 IP: Скрыт (безопасность)
`;
};

/**
 * Форматирует сообщение для заявки на обратный звонок
 */
const formatCallbackMessage = (request: CallbackRequest): string => {
  return `
📞 ЗАЯВКА НА ОБРАТНЫЙ ЗВОНОК

👤 Имя: ${sanitizeInput(request.name)}
📞 Телефон: ${sanitizeInput(request.phone)}
⏰ Удобное время: ${request.bestTime || 'Любое время'}

📅 Дата заявки: ${new Date().toLocaleString('ru-RU')}
🚨 СРОЧНО! Перезвонить в течение 15 минут
`;
};

/**
 * Форматирует сообщение для быстрого расчета
 */
const formatQuickEstimateMessage = (request: QuickEstimateRequest): string => {
  return `
🧮 ЗАЯВКА НА БЫСТРЫЙ РАСЧЕТ

👤 Имя: ${sanitizeInput(request.name)}
📞 Телефон: ${sanitizeInput(request.phone)}
🏗️ Тип проекта: ${request.projectType || 'Не указан'}
📐 Площадь: ${request.area || 'Не указана'} м²
💰 Бюджет: ${request.budget || 'Не указан'}
🏠 Проект: ${request.projectTitle || 'Не указан'}

💬 Пожелания:
${sanitizeInput(request.description || 'Не указаны')}

📅 Дата заявки: ${new Date().toLocaleString('ru-RU')}
⚡ Клиент ждет расчет в течение 15 минут!
`;
};

/**
 * Отправляет данные формы напрямую в Telegram бот
 * @param formData Данные из формы обратной связи
 * @returns Promise с результатом отправки
 */
/**
 * Общая функция отправки в Telegram с улучшенной безопасностью
 */
const sendToTelegram = async (text: string, identifier: string): Promise<{ success: boolean; message: string }> => {
  // Оставлено для совместимости — отправка теперь идёт только через backend
  if (!checkSpamProtection(identifier)) {
    return { success: false, message: 'Превышен лимит запросов. Попробуйте позже.' };
  }
  return { success: true, message: 'OK' };
};

// URL для API (будет настроен в переменных окружения)
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://ваш-api.vercel.app';
const API_URL = `${BASE_URL}/api/telegram`;

export const sendContactFormToTelegram = async (formData: ContactFormData): Promise<{ success: boolean; message: string }> => {
  // Валидация (оставляем как есть)
  if (!validatePhone(formData.phone)) {
    return {
      success: false,
      message: 'Неверный формат номера телефона'
    };
  }
  if (!formData.name.trim()) {
    return {
      success: false,
      message: 'Имя обязательно для заполнения'
    };
  }
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    return await response.json();
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Произошла неизвестная ошибка'
    };
  }
};

export const sendCallbackRequest = async (request: CallbackRequest): Promise<{ success: boolean; message: string }> => {
  if (!validatePhone(request.phone)) {
    return {
      success: false,
      message: 'Неверный формат номера телефона'
    };
  }
  if (!request.name.trim()) {
    return {
      success: false,
      message: 'Имя обязательно для заполнения'
    };
  }
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    });
    return await response.json();
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Произошла неизвестная ошибка'
    };
  }
};

export const sendQuickEstimateRequest = async (request: QuickEstimateRequest): Promise<{ success: boolean; message: string }> => {
  if (!validatePhone(request.phone)) {
    return {
      success: false,
      message: 'Неверный формат номера телефона'
    };
  }
  if (!request.name.trim()) {
    return {
      success: false,
      message: 'Имя обязательно для заполнения'
    };
  }
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    });
    return await response.json();
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Произошла неизвестная ошибка'
    };
  }
};
