import type { VercelRequest, VercelResponse } from '@vercel/node';
import jwt from 'jsonwebtoken';

const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASS || 'secure123';
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 минут
const RATE_LIMIT_MAX = 10; // 10 попыток за 15 минут

const attempts: Record<string, { count: number; last: number }> = {};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Метод не поддерживается' });
  }

  const ip = req.headers['x-forwarded-for']?.toString().split(',')[0] || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  if (!attempts[ip]) attempts[ip] = { count: 0, last: now };
  if (now - attempts[ip].last > RATE_LIMIT_WINDOW) {
    attempts[ip] = { count: 0, last: now };
  }
  attempts[ip].count++;
  attempts[ip].last = now;
  if (attempts[ip].count > RATE_LIMIT_MAX) {
    return res.status(429).json({ success: false, message: 'Слишком много попыток. Попробуйте позже.' });
  }

  const { username, password } = req.body || {};
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '2h' });
    res.setHeader('Set-Cookie', `admin_token=${token}; HttpOnly; Path=/; Max-Age=7200; SameSite=Strict`);
    return res.status(200).json({ success: true, message: 'Вход выполнен' });
  }
  return res.status(401).json({ success: false, message: 'Неверный логин или пароль' });
}