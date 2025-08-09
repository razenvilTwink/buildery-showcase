
# Buildery Showcase

Сайт частного застройщика с раздельной архитектурой: backend на Vercel, frontend на российском хостинге.

## Структура проекта

```
buildery-showcase-main/
├── backend/               # Backend API (Vercel)
│   ├── api/              # API endpoints
│   ├── package.json      # Backend dependencies
│   └── vercel.json       # Vercel config
├── frontend/             # Frontend (Российский хостинг)
│   ├── src/              # React приложение
│   ├── public/           # Статические файлы
│   └── package.json      # Frontend dependencies
└── README.md             # Этот файл
```

## Быстрый старт

### Backend (Vercel)

1. Перейдите в папку backend:
```bash
cd backend
```

2. Установите зависимости:
```bash
npm install
```

3. Создайте `.env.local`:
```env
ADMIN_USER=admin
ADMIN_PASS=your_secure_password
JWT_SECRET=your_jwt_secret_key
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
TELEGRAM_CHAT_ID=your_telegram_chat_id
FRONTEND_ORIGIN=https://your-domain.ru
```

4. Деплой на Vercel:
```bash
npm run deploy
```

### Frontend (Российский хостинг)

1. Перейдите в папку frontend:
```bash
cd frontend
```

2. Установите зависимости:
```bash
npm install
```

3. Создайте `.env.local`:
```env
VITE_API_BASE_URL=https://your-vercel-api.vercel.app
```

4. Сборка:
```bash
npm run build
```

5. Загрузите `dist/` на хостинг

## Подробные инструкции

- [Деплой Backend на Vercel](backend/README.md)
- [Деплой Frontend на российский хостинг](frontend/README.md)
- [Настройка переменных окружения](ENV_SETUP.md)
- [Полная инструкция по деплою](DEPLOYMENT.md)

## Особенности

- 🔒 Безопасная архитектура с разделением frontend/backend
- 🤖 Интеграция с Telegram для уведомлений
- 👨‍💼 Админ панель с защищенными маршрутами
- 📱 Адаптивный дизайн
- ⚡ Быстрая загрузка с Vite
- 🎨 Современный UI с shadcn/ui
- 🔍 SEO оптимизация
