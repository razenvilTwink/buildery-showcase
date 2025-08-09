## Полная инструкция по сборке и деплою проекта

Этот файл описывает все шаги подготовки, сборки и деплоя фронтенда, а также то, что необходимо настроить на бэкенде, чтобы формы и авторизация работали в продакшене.

### Требования
- Node.js 18+ (рекомендуется LTS)
- npm 9+ или pnpm/yarn (в инструкциях ниже используется npm)

### Структура ассетов и важные пути
- Все статичные изображения должны лежать в `public/images` (в сборке окажутся в `dist/images`).
- OG/Twitter изображения лучше указывать абсолютным URL вида `https://домен/images/имя.jpg`.

## Подготовка окружения

### Важно про токены и секреты
- Раньше токен бота и временный пароль администратора были захардкожены в `src/api/telegramBot.js`. Это небезопасно и может привести к утечке.
- Сейчас из фронтенда секреты удалены. Если токен мог попасть в репозиторий/сборку — перевыпустите его у BotFather и используйте только переменные окружения на сервере.
- Секреты никогда не храните в коде репозитория. Храните их в Env Variables хостинга (Vercel/Render и т.п.).

### 1) Переменные окружения фронтенда
Создайте файл `.env.production` в корне проекта со значением адреса API (ваш бэкенд):

```bash
VITE_API_BASE_URL=https://ВАШ-БЕКЕНД.ДОМЕН
```

Где используется:
- `src/services/telegramService.ts` — отправка заявок на `${VITE_API_BASE_URL}/api/telegram`
- `src/hooks/useAuth.tsx` — авторизация: `${VITE_API_BASE_URL}/api/check-auth|login|logout`

Без валидного API эти запросы выдадут ошибки в продакшене.

### 2) Настройка OG/Twitter мета
В файлах `index.html`, `src/pages/Index.tsx`, `src/pages/About.tsx`, `src/pages/Contact.tsx`:
- `og:url` — укажите ваш продакшн-домен
- `og:image` и `twitter:image` — укажите абсолютную ссылку, например: `https://домен/images/promoMainPage.jpg`

### 3) Если сайт будет в подпапке
Например, сайт будет доступен по адресу `https://домен/portfolio/`:
в `vite.config.ts` добавьте базовый путь и пересоберите:

```ts
export default defineConfig({
  base: '/portfolio/'
})
```

## Сборка и локальная проверка

```bash
npm install

# Сборка
npm run build

# Предпросмотр собранной версии (SPA‑fallback уже учтён)
npm run preview -- --host 0.0.0.0 --port 4173
# Откройте: http://127.0.0.1:4173
```

Альтернатива предпросмотра (эмуляция «обычного» хостинга):

```bash
npx serve -s dist -l 5050
# Откройте: http://127.0.0.1:5050
```

Не открывайте `dist/index.html` напрямую через `file://` — маршруты SPA работать не будут.

## Деплой на статический хостинг (FTP/хостинг‑панель)

1) Соберите проект: `npm run build`
2) Зальйте СОДЕРЖИМОЕ папки `dist` в корень сайта (например, `public_html`). Не загружайте саму папку `dist`, только её содержимое.
3) Включите SPA‑fallback на `index.html`, чтобы работали маршруты React Router:

Добавьте файл `.htaccess` в корень сайта:

```apache
RewriteEngine On
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

Если сайт в подпапке — замените `/` на путь вашей подпапки и выставьте `base` в `vite.config.ts` (см. выше), затем пересоберите.

## Деплой на Vercel

1) Добавьте файл `vercel.json` в корень проекта (для SPA‑fallback):

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

2) Импортируйте проект в Vercel:
- Framework: Vite
- Build Command: `npm run build`
- Output Directory: `dist`

3) В настройках проекта (Vercel → Settings → Environment Variables) задайте:
- `VITE_API_BASE_URL=https://ВАШ-БЕКЕНД.ДОМЕН` (видна фронтенду)
- Секреты бэкенда (если используете серверные функции на Vercel):
  - `TELEGRAM_BOT_TOKEN=...`
  - `ADMIN_PASSWORD=...` (если нужна админ‑авторизация бота)

> Важно: секреты НИКОГДА не храним в репозитории. Если ранее токен Telegram бота попадал в код — срочно перевыпустите токен.

## Требования к бэкенду (обязательно для работы форм и логина)

Фронтенд ожидает существование следующих эндпоинтов на `${VITE_API_BASE_URL}`:

- `POST /api/telegram` — принимает заявки и пересылает их в Telegram
  - Возможные payload:
    - Контактная форма:
      ```json
      { "name": "Иван", "phone": "+7 (...) ...", "email": "...", "message": "..." }
      ```
    - Обратный звонок:
      ```json
      { "name": "Иван", "phone": "+7 (...) ...", "bestTime": "9:00-12:00", "requestType": "callback" }
      ```
    - Быстрый расчёт:
      ```json
      { "name": "Иван", "phone": "+7 (...) ...", "projectType": "...", "area": "...", "budget": "...", "description": "...", "projectTitle": "...", "requestType": "quick_estimate" }
      ```
  - Ответ:
    ```json
    { "success": true, "message": "..." }
    ```

- (Опционально) Авторизация для админки:
  - `GET  /api/check-auth` → `{ success: boolean, username?: string }`
  - `POST /api/login` (JSON: `{ username, password }`, с cookies) → `{ success: boolean }`
  - `POST /api/logout` (с cookies) → `{ success: boolean }`

### CORS и куки (если используете auth)
- На бэкенде включите CORS для вашего домена:
  - `Access-Control-Allow-Origin: https://ВАШ-ДОМЕН`
  - `Access-Control-Allow-Credentials: true`
- На фронте уже используется `credentials: 'include'` в запросах авторизации.

## Чек‑лист перед продакшеном

- [ ] В `public/images` лежат все изображения; в коде — пути `/images/...`
- [ ] `VITE_API_BASE_URL` задан в `.env.production`
- [ ] Бэкенд развернут, эндпоинты `/api/telegram` (+ auth при необходимости) работают и отдают JSON
- [ ] Секреты (Telegram токен и т.п.) НЕ в репозитории, добавлены в переменные окружения на сервере
- [ ] OG‑мета указывает абсолютные ссылки на изображения и правильный домен
- [ ] Если сайт в подпапке — настроен `base` в `vite.config.ts` и выполнена новая сборка
- [ ] Для статического хостинга — `.htaccess` с редиректом на `index.html` добавлен
- [ ] Локальная проверка `npm run preview` проходит без ошибок

## Telegram‑бот: «один раз ввести пароль» и Webhooks

Варианта два — выберите нужный под задачу.

- Простой вариант (без пароля у пользователя):
  - Не нужны ни polling, ни webhooks. Используется `backend/api/telegram.ts`, который отправляет заявки в один `TELEGRAM_CHAT_ID` (чат/канал/группа, где бот админ).
  - В бэкенд‑проекте (Vercel) задайте Env: `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`.

- Вариант с «однократным паролем» (пользователь пишет боту пароль, чтобы подписаться):
  - Нужны входящие сообщения от Telegram → на Vercel используйте Webhooks (serverless). Long polling на Vercel не подходит.
  - Понадобится внешнее хранилище для `chat_id` подписчиков (в serverless нельзя хранить в памяти/файле):
    - Supabase (Postgres): таблица `authorized_users(chat_id bigint primary key, created_at timestamptz default now())`.
    - Либо Vercel KV/Upstash Redis (хранить set ключей `chat_id`).
  - Env переменные для бэкенда:
    - `TELEGRAM_BOT_TOKEN`
    - `TELEGRAM_WEBHOOK_SECRET` (секрет для заголовка `X-Telegram-Bot-Api-Secret-Token`)
    - Переменные доступа к выбранному хранилищу (например, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` ИЛИ `KV_REST_API_URL`, `KV_REST_API_TOKEN`).
  - Включение вебхука на адрес `https://ВАШ-БЭК.vercel.app/api/telegram-webhook`:
    ```bash
    curl -X POST "https://api.telegram.org/bot<ТОКЕН>/setWebhook" \
      -H "Content-Type: application/json" \
      -d "{ \"url\": \"https://ВАШ-БЭК.vercel.app/api/telegram-webhook\", \"secret_token\": \"СЕКРЕТ\", \"drop_pending_updates\": true }"
    ```
  - Логика вебхука (доработайте `backend/api/telegram-webhook.ts`):
    - На `/start` ответить приглашением ввести пароль.
    - Если сообщение равно `ADMIN_PASSWORD` (Env), добавить `chat_id` в хранилище и ответить «вы подписаны».
  - Рассылка заявок: доработайте `backend/api/telegram.ts`, чтобы отправлять сообщение всем `chat_id` из хранилища (вместо одного `TELEGRAM_CHAT_ID`).
  - Откат на polling (если нужен постоянный процесс): удалите вебхук `deleteWebhook` и запустите `backend/legacy/telegramBot.js` на Render/Railway/VPS.

## Типичные проблемы и решения

- ERR_CONNECTION_REFUSED
  - Сервер предпросмотра не запущен или открыт неверный порт. Используйте `npm run dev` или `npm run preview` и откройте URL из терминала.
  - Порт занят — укажите другой (например, `--port 5050`).

- 404 при прямом вводе URL (например, `/about`)
  - Не настроен SPA‑fallback. Добавьте `.htaccess` (Apache) или `vercel.json` (Vercel).

- Не грузятся изображения
  - Проверьте, что изображения лежат в `public/images` и пути начинаются с `/images/...`.

- Ошибки CORS/куки при авторизации
  - На бэкенде включите `Access-Control-Allow-Origin` на конкретный фронтенд‑домен и `Access-Control-Allow-Credentials: true`.

- Соцсети/мессенджеры не подтягивают превью
  - Используйте абсолютные URL в `og:image` и дождитесь кеш‑инвалидатора (или пинганите отладчиками FB/Twitter/Telegram).

## Обновление версии на хостинге

1) Внести изменения → `npm run build`
2) Залить СОДЕРЖИМОЕ обновлённой `dist` на хост (поверх старых файлов)
3) Очистить кеш CDN/браузера при необходимости

---

Если потребуется — могу подготовить заготовку серверной функции (Vercel/Supabase) для `POST /api/telegram` и описать подключение Telegram‑бота с безопасным хранением секретов.


