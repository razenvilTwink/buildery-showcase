# Инструкция по раздельному деплою

## Архитектура
- **Backend (API)**: Vercel - serverless функции
- **Frontend**: Российский хостинг (например, Beget, Timeweb, REG.RU)

## Этап 1: Деплой API на Vercel

### 1.1 Подготовка API
```bash
# Убедитесь, что в корне проекта есть файлы:
# - api/telegram.ts
# - api/login.ts
# - api/logout.ts
# - api/check-auth.ts
# - api/lib/cors.ts
# - vercel.json
```

### 1.2 Деплой на Vercel
```bash
# Войдите в Vercel CLI
vercel login

# Деплой API
vercel --prod
```

### 1.3 Настройка переменных окружения на Vercel
Перейдите в [Vercel Dashboard](https://vercel.com/dashboard) → ваш проект → Settings → Environment Variables

Добавьте следующие переменные:

| Переменная | Значение | Описание |
|------------|----------|----------|
| `TELEGRAM_BOT_TOKEN` | `7809537061:AAHH0mEgoPdjgx-E8eLgc1WiYdbUtQNO_jI` | Токен вашего Telegram бота |
| `TELEGRAM_CHAT_ID` | `361122150` | ID чата для получения сообщений |
| `JWT_SECRET` | `DlVzElJOZicBbS2HR8i4CpHoaoIfHqj8Xi2th14xtIhKAtLjpzLhYbBg7XAxAtWBUgPPhed9iVioDl065ZdCvMgLasNdAhX6fE4Oh1ClsJajS6etJyafUbs51sFXPg9YuwaInEmSbFz6edKFjl0woKBZnxoE9uuVjaEJGvD3iIZFS84txUxAstpBPBWKMbcsCkhVBBIRi8uR0w0kDtTikbdCXBOPakIbMRaFyHkpqaGP0TLpjYyzCl3FAPybRkCpLzGBgp6Ao1lcvj5BWob5GU4hIEzpUFrxAkRWmSzwOwEf992HC5iqOXqOGn1B2PztUViPOHWLElV96jF9CsSAvh8uu8nvQm9Z9HaqcYCtDPEjyobYNaid05uIF1KW10hQT5em5OkmA6pDnkzZU5bwd9IWz7KbphBoaHiemYvDgKDbyfuKydqTStdYEyCliFmSy0Ue7yiMqMMuBcNMWMM5VfHmsDqjfK8o33UD3sWhaLgZYEB6xaOE901wVm7fPdm3` | Секретный ключ для JWT |
| `ADMIN_USER` | `admin` | Логин администратора |
| `ADMIN_PASS` | `secure123` | Пароль администратора |

### 1.4 Получение URL API
После деплоя получите URL вашего API (например: `https://your-api.vercel.app`)

## Этап 2: Деплой Frontend на российский хостинг

### 2.1 Подготовка фронтенда
```bash
# Создайте файл .env.production в корне проекта
VITE_API_BASE_URL=https://ваш-api.vercel.app
```

### 2.2 Сборка проекта
```bash
npm run build
```

### 2.3 Загрузка на хостинг
1. Загрузите содержимое папки `dist/` на ваш российский хостинг
2. Настройте домен и SSL сертификат
3. Настройте SPA роутинг (все запросы должны вести на index.html)

### 2.4 Настройка CORS
Обновите файл `api/lib/cors.ts` и добавьте ваш домен в `ALLOWED_ORIGINS`:

```typescript
const ALLOWED_ORIGINS = [
  'http://localhost:3000',
  'http://localhost:5173',
  'https://ваш-домен.рф',  // ← Добавьте сюда
  'https://www.ваш-домен.рф', // ← И сюда
];
```

Затем передеплойте API:
```bash
vercel --prod
```

## Этап 3: Тестирование

### 3.1 Проверка API
```bash
# Проверьте, что API работает
curl https://ваш-api.vercel.app/api/check-auth
```

### 3.2 Проверка фронтенда
1. Откройте ваш сайт
2. Попробуйте отправить заявку через форму
3. Проверьте админскую панель (логин: admin, пароль: secure123)

## Этап 4: Настройка доменов (опционально)

### 4.1 Поддомен для API
Рекомендуется настроить поддомен для API:
- API: `api.ваш-домен.рф`
- Frontend: `ваш-домен.рф`

### 4.2 Обновление переменных
После настройки поддомена обновите:
- `VITE_API_BASE_URL=https://api.ваш-домен.рф`
- Добавьте поддомен в `ALLOWED_ORIGINS`

## Безопасность

### Рекомендации:
1. **Измените пароли** по умолчанию
2. **Обновите JWT_SECRET** на уникальный
3. **Настройте HTTPS** на обоих доменах
4. **Ограничьте CORS** только вашими доменами
5. **Настройте rate limiting** на API

### Мониторинг:
- Логи Vercel для API
- Логи хостинга для фронтенда
- Мониторинг Telegram бота

## Поддержка

При возникновении проблем:
1. Проверьте логи в Vercel Dashboard
2. Убедитесь, что переменные окружения настроены
3. Проверьте CORS настройки
4. Убедитесь, что домены добавлены в `ALLOWED_ORIGINS`
