# Быстрый деплой

## 1. Backend на Vercel

```bash
cd backend
npm install
vercel --prod
```

**Настройте переменные окружения в Vercel Dashboard:**
- `ADMIN_USER` = admin
- `ADMIN_PASS` = ваш_пароль
- `JWT_SECRET` = сгенерированный_секрет
- `TELEGRAM_BOT_TOKEN` = ваш_токен_бота
- `TELEGRAM_CHAT_ID` = ваш_чат_id
- `FRONTEND_ORIGIN` = https://ваш-домен.рф

## 2. Frontend на российский хостинг

```bash
cd frontend
npm install
```

Создайте `.env.local`:
```env
VITE_API_BASE_URL=https://ваш-vercel-проект.vercel.app
```

```bash
npm run build
```

Загрузите содержимое папки `dist/` на хостинг.

## 3. Проверка

1. Формы отправляются в Telegram ✅
2. Авторизация работает ✅
3. Админ панель доступна ✅
4. Сайт загружается быстро ✅

## Готово! 🎉
