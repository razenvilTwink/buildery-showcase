
// Этот файл предназначен для запуска на сервере или в Supabase Edge Functions

// Импорт необходимых библиотек
// Примечание: Node.js модули доступны только в серверном окружении
import TelegramBot from 'node-telegram-bot-api';
import fs from 'fs/promises';
import path from 'path';

// Константы и переменные
const TOKEN = process.env.TELEGRAM_BOT_TOKEN || '7809537061:AAHWVRqNikuUyTz0I7C4ycNR0GOUweIKv08';
const PASSWORD = process.env.ADMIN_PASSWORD || 'secure123'; // Временный пароль для разработки
let authorizedUsers = new Set();

// Валидация токена
if (!TOKEN) {
  throw new Error('КРИТИЧЕСКАЯ ОШИБКА: Токен бота не найден!');
}

// Валидация пароля
if (!PASSWORD) {
  throw new Error('КРИТИЧЕСКАЯ ОШИБКА: Пароль администратора не найден!');
}

// Инициализация бота
const bot = new TelegramBot(TOKEN, { polling: true });

// Путь к файлу пользователей (в зависимости от окружения)
const usersFilePath = path.join(process.cwd(), 'users.json');

// Загрузка пользователей
const loadUsers = async () => {
  try {
    const data = await fs.readFile(usersFilePath, 'utf-8');
    const users = JSON.parse(data);
    authorizedUsers = new Set(users.map(id => Number(id))); // Преобразуем ID в числа
    console.log(`👥 Загружено ${authorizedUsers.size} авторизованных пользователей`);
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log('ℹ Файл users.json не найден, будет создан новый');
    } else {
      console.error('❌ Ошибка загрузки users.json:', err);
    }
  }
};

// Сохранение пользователей
const saveUsers = async () => {
  try {
    await fs.writeFile(
      usersFilePath,
      JSON.stringify([...authorizedUsers], null, 2)
    );
    console.log('✅ Пользователи сохранены');
  } catch (err) {
    console.error('❌ Ошибка сохранения users.json:', err);
  }
};

// Инициализация
loadUsers().catch(console.error);

// Обработчики команд
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  console.log(`Получена команда /start от пользователя ${chatId}`);
  
  if (authorizedUsers.has(chatId)) {
    return bot.sendMessage(chatId, '✅ Вы уже авторизованы!');
  }

  bot.sendMessage(chatId, '🔐 Введите пароль администратора:');
});

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text?.trim();

  if (!text || text.startsWith('/')) return;

  console.log(`Получено сообщение от ${chatId}: ${text}`);

  if (text === PASSWORD) {
    console.log(`Пользователь ${chatId} ввел правильный пароль`);
    authorizedUsers.add(chatId);
    await saveUsers();
    bot.sendMessage(chatId, '🎉 Авторизация успешна! Теперь вы будете получать уведомления.');
  } else if (!authorizedUsers.has(chatId)) {
    console.log(`Пользователь ${chatId} ввел неверный пароль`);
    bot.sendMessage(chatId, '❌ Неверный пароль. Попробуйте снова или используйте /start');
  }
});

// Функция для отправки сообщения всем авторизованным пользователям
export const sendMessageToAllAuthorizedUsers = async (message) => {
  const users = [...authorizedUsers];
  
  if (users.length === 0) {
    console.warn('⚠ Нет авторизованных пользователей для отправки сообщения');
    return false;
  }
  
  try {
    console.log(`Отправка сообщения ${users.length} пользователям`);
    for (const chatId of users) {
      await bot.sendMessage(chatId, message, { parse_mode: 'HTML' });
      console.log(`Сообщение отправлено пользователю ${chatId}`);
    }
    return true;
  } catch (error) {
    console.error('❌ Ошибка при отправке сообщений:', error);
    return false;
  }
};

// Функция форматирования сообщения о новой заявке
export const formatContactMessage = (formData) => {
  return `
<b>🔔 НОВАЯ ЗАЯВКА С САЙТА</b>

<b>👤 Имя:</b> ${formData.name}
<b>📞 Телефон:</b> ${formData.phone}
<b>✉️ Email:</b> ${formData.email || 'Не указан'}
<b>💬 Сообщение:</b> 
${formData.message || 'Не указано'}

<i>⏰ Дата: ${new Date().toLocaleString('ru-RU')}</i>
`;
};

// Обработка ошибок
bot.on('polling_error', (error) => {
  console.error('🔴 Ошибка polling:', error);
});

process.on('unhandledRejection', (error) => {
  console.error('🔴 Необработанное исключение:', error);
});

console.log('🤖 Бот успешно запущен и ожидает сообщений...');

// Экспорт функций для использования в API
export const telegramBot = {
  sendMessageToAllAuthorizedUsers,
  formatContactMessage
};

export default telegramBot;
