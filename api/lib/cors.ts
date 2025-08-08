import type { VercelRequest, VercelResponse } from '@vercel/node';

// Список разрешенных доменов для фронтенда
const ALLOWED_ORIGINS = [
  'http://localhost:3000',
  'http://localhost:5173',
  'https://ваш-домен.рф',
  'https://www.ваш-домен.рф',
  // Добавьте сюда ваш российский домен
];

export function applyCors(req: VercelRequest, res: VercelResponse) {
  const origin = req.headers.origin;
  
  // Проверяем, разрешен ли домен
  const isAllowedOrigin = ALLOWED_ORIGINS.includes(origin || '');
  
  if (isAllowedOrigin && origin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    // Для разработки разрешаем localhost
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
}

export function handleCorsPreflight(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') {
    applyCors(req, res);
    res.status(204).end();
    return true;
  }
  return false;
}

