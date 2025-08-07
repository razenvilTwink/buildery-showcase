import type { VercelRequest, VercelResponse } from '@vercel/node';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

export function requireAdminAuth(req: VercelRequest, res: VercelResponse): boolean {
  const cookie = req.headers.cookie || '';
  const match = cookie.match(/admin_token=([^;]+)/);
  if (!match) {
    res.status(401).json({ success: false, message: 'Не авторизовано' });
    return false;
  }
  try {
    jwt.verify(match[1], JWT_SECRET);
    return true;
  } catch {
    res.status(401).json({ success: false, message: 'Сессия истекла или токен невалиден' });
    return false;
  }
}