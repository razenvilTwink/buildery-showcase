/**
 * Утилиты для обеспечения безопасности
 */

// Список подозрительных слов и паттернов
const suspiciousPatterns = [
  /script/gi,
  /javascript/gi,
  /vbscript/gi,
  /onload/gi,
  /onerror/gi,
  /onclick/gi,
  /eval/gi,
  /expression/gi,
  /<[^>]*>/g, // HTML теги
  /data:.*base64/gi,
  /href\s*=\s*["']?javascript:/gi
];

/**
 * Проверяет входящие данные на подозрительный контент
 */
export const detectSuspiciousContent = (text: string): boolean => {
  return suspiciousPatterns.some(pattern => pattern.test(text));
};

/**
 * Очищает и санитизирует пользовательский ввод
 */
export const sanitizeUserInput = (input: string): string => {
  if (!input || typeof input !== 'string') {
    return '';
  }

  return input
    .replace(/[<>]/g, '') // Удаляем HTML теги
    .replace(/javascript:/gi, '') // Удаляем javascript:
    .replace(/on\w+\s*=/gi, '') // Удаляем event handlers
    .replace(/data:.*base64/gi, '') // Удаляем base64 data URIs
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, '') // Удаляем управляющие символы
    .trim()
    .substring(0, 1000); // Ограничиваем длину
};

/**
 * Валидирует номер телефона
 */
export const validatePhoneNumber = (phone: string): boolean => {
  const cleanPhone = phone.replace(/\D/g, '');
  
  // Проверяем российские номера
  if (cleanPhone.length === 11 && cleanPhone.startsWith('7')) {
    return true;
  }
  
  // Проверяем номера без кода страны
  if (cleanPhone.length === 10 && /^[39][0-9]{9}$/.test(cleanPhone)) {
    return true;
  }
  
  return false;
};

/**
 * Валидирует email адрес
 */
export const validateEmail = (email: string): boolean => {
  if (!email) return true; // Email не обязательный
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const cleanEmail = sanitizeUserInput(email);
  
  return emailRegex.test(cleanEmail) && cleanEmail.length <= 320;
};

/**
 * Валидирует имя пользователя
 */
export const validateName = (name: string): boolean => {
  if (!name || name.trim().length < 2) {
    return false;
  }
  
  const cleanName = sanitizeUserInput(name);
  
  // Проверяем на подозрительный контент
  if (detectSuspiciousContent(cleanName)) {
    return false;
  }
  
  // Проверяем длину и символы
  return cleanName.length >= 2 && cleanName.length <= 100 && 
         /^[а-яёА-ЯЁa-zA-Z\s\-]+$/.test(cleanName);
};

/**
 * Создает уникальный идентификатор для защиты от спама
 */
export const createSpamProtectionId = (phone: string): string => {
  const cleanPhone = phone.replace(/\D/g, '');
  return `phone_${cleanPhone}`;
};

/**
 * Проверяет, является ли запрос подозрительным
 */
export const isRequestSuspicious = (data: any): { suspicious: boolean; reason?: string } => {
  // Проверяем обязательные поля
  if (!data.name || !data.phone) {
    return { suspicious: true, reason: 'Отсутствуют обязательные поля' };
  }
  
  // Проверяем имя
  if (!validateName(data.name)) {
    return { suspicious: true, reason: 'Недопустимое имя' };
  }
  
  // Проверяем телефон
  if (!validatePhoneNumber(data.phone)) {
    return { suspicious: true, reason: 'Недопустимый номер телефона' };
  }
  
  // Проверяем email, если указан
  if (data.email && !validateEmail(data.email)) {
    return { suspicious: true, reason: 'Недопустимый email' };
  }
  
  // Проверяем все текстовые поля на подозрительный контент
  const textFields = [data.name, data.phone, data.email, data.message, data.description];
  for (const field of textFields) {
    if (field && detectSuspiciousContent(field)) {
      return { suspicious: true, reason: 'Обнаружен подозрительный контент' };
    }
  }
  
  return { suspicious: false };
};