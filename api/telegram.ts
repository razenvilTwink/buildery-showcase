import type { VercelRequest, VercelResponse } from '@vercel/node';
import { applyCors, handleCorsPreflight } from './lib/cors.js';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (handleCorsPreflight(req, res)) return;
  applyCors(req, res);
  
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Метод не поддерживается' });
  }

  try {
    const data = req.body;
    const { name, phone, email, message, bestTime, projectType, area, budget, description, projectTitle, requestType } = data;
    
    if (!name || !phone) {
      return res.status(400).json({ success: false, message: 'Не указаны обязательные поля (имя и телефон)' });
    }

    // Формируем текст сообщения
    let text = '';
    if (requestType === 'callback') {
      text = `📞 ЗАЯВКА НА ОБРАТНЫЙ ЗВОНОК\n\n👤 Имя: ${name}\n📞 Телефон: ${phone}\n⏰ Удобное время: ${bestTime || 'Любое время'}\n\n📅 Дата заявки: ${new Date().toLocaleString('ru-RU')}\n🚨 СРОЧНО! Перезвонить в течение 15 минут`;
    } else if (requestType === 'quick_estimate') {
      text = `🧮 ЗАЯВКА НА БЫСТРЫЙ РАСЧЕТ\n\n👤 Имя: ${name}\n📞 Телефон: ${phone}\n🏗️ Тип проекта: ${projectType || 'Не указан'}\n📐 Площадь: ${area || 'Не указана'} м²\n💰 Бюджет: ${budget || 'Не указан'}\n🏠 Проект: ${projectTitle || 'Не указан'}\n\n💬 Пожелания:\n${description || 'Не указаны'}\n\n📅 Дата заявки: ${new Date().toLocaleString('ru-RU')}\n⚡ Клиент ждет расчет в течение 15 минут!`;
    } else {
      text = `🔔 НОВАЯ ЗАЯВКА С САЙТА\n\n👤 Имя: ${name}\n📞 Телефон: ${phone}\n✉️ Email: ${email || 'Не указан'}\n💬 Сообщение: ${message || 'Не указано'}\n\n⏰ Дата: ${new Date().toLocaleString('ru-RU')}`;
    }

    // Проверяем наличие токенов
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.log('Missing Telegram tokens:', { TELEGRAM_BOT_TOKEN: !!TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID: !!TELEGRAM_CHAT_ID });
      return res.status(500).json({ success: false, message: 'Telegram не настроен' });
    }

    const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    
    const response = await fetch(TELEGRAM_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text,
        parse_mode: 'HTML',
      }),
    });

    const tgData = await response.json();
    if (!tgData.ok) {
      console.log('Telegram API error:', tgData);
      return res.status(500).json({ success: false, message: tgData.description || 'Ошибка Telegram API' });
    }

    return res.status(200).json({ success: true, message: 'Сообщение успешно отправлено' });
  } catch (error: any) {
    console.log('API error:', error);
    return res.status(500).json({ success: false, message: error.message || 'Ошибка сервера' });
  }
}
