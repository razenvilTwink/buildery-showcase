# Buildery Frontend

Frontend приложение для сайта Buildery, развернутое на российском хостинге.

## Структура

```
frontend/
├── src/                   # Исходный код
│   ├── components/        # React компоненты
│   ├── pages/            # Страницы приложения
│   ├── hooks/            # React хуки
│   ├── services/         # API сервисы
│   ├── data/             # Статические данные
│   └── lib/              # Утилиты
├── public/               # Статические файлы
├── package.json          # Зависимости
├── vite.config.ts        # Конфигурация Vite
└── tailwind.config.ts    # Конфигурация Tailwind
```

## Установка и запуск

1. Установите зависимости:
```bash
npm install
```

2. Создайте `.env.local` файл с переменными окружения:
```env
VITE_API_BASE_URL=https://your-vercel-api.vercel.app
```

3. Локальная разработка:
```bash
npm run dev
```

4. Сборка для продакшена:
```bash
npm run build
```

5. Предварительный просмотр:
```bash
npm run preview
```

## Деплой на российский хостинг

1. Соберите проект:
```bash
npm run build
```

2. Загрузите содержимое папки `dist/` на ваш хостинг

3. Настройте SPA routing (fallback на index.html)

4. Включите HTTPS на домене

## Переменные окружения

- `VITE_API_BASE_URL` - URL вашего Vercel API (например: https://your-api.vercel.app)

## Особенности

- SPA приложение с React Router
- Адаптивный дизайн с Tailwind CSS
- Интеграция с Telegram через backend API
- Админ панель с защищенными маршрутами
- SEO оптимизация с react-helmet-async
