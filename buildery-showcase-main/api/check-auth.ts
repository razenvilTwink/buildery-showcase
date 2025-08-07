import type { VercelRequest, VercelResponse } from '@vercel/node';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

export default function handler(req: VercelRequest, res: VercelResponse) {
  const cookie = req.headers.cookie || '';
  const match = cookie.match(/admin_token=([^;]+)/);
  if (!match) return res.json({ success: false });
  try {
    const payload = jwt.verify(match[1], JWT_SECRET) as { username: string };
    return res.json({ success: true, username: payload.username });
  } catch {
    return res.json({ success: false });
  }
}