
# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/4a96fc14-f574-4e76-a128-a676e5c2b665

## Настройка Telegram бота

### Шаг 1: Получение Chat ID

1. Найдите в Telegram бота @userinfobot
2. Отправьте ему любое сообщение
3. Бот вернет информацию о вашем аккаунте, включая ваш Chat ID
4. Скопируйте ваш Chat ID

### Шаг 2: Установка переменных окружения

В настройках вашего проекта установите следующую переменную окружения:

```
VITE_TELEGRAM_CHAT_ID=ваш_chat_id
```

### Шаг 3: Проверка работы

1. Заполните форму обратной связи на сайте
2. Отправьте сообщение
3. Проверьте получение сообщения в вашем Telegram

## Размещение на российских хостингах

### Рекомендуемые хостинг-провайдеры

1. **Beget** - надежный российский хостинг с хорошей техподдержкой и доступными ценами.
   - Поддерживает современные технологии
   - Простая панель управления
   - Автоматическая настройка SSL-сертификатов
   - Сайт: [beget.com](https://beget.com)

2. **Timeweb** - крупный российский хостинг с широким спектром услуг.
   - Быстрые SSD-серверы
   - Бесплатный перенос сайтов
   - Удобная панель управления
   - Сайт: [timeweb.com](https://timeweb.com)

3. **Reg.ru** - один из крупнейших российских регистраторов доменов и хостинг-провайдеров.
   - Широкий выбор тарифов хостинга
   - Простая регистрация доменов
   - Интеграция с популярными CMS
   - Сайт: [reg.ru](https://reg.ru)

4. **SpaceWeb** - надежный хостинг с хорошей поддержкой.
   - Высокая скорость работы серверов
   - Бесплатный SSL-сертификат
   - 24/7 техническая поддержка
   - Сайт: [sweb.ru](https://sweb.ru)

### На что обратить внимание при выборе хостинга

1. **Поддержка современных технологий**:
   - Поддержка Node.js
   - Совместимость с React/Vite приложениями
   - Возможность настройки .htaccess для SPA приложений

2. **Размещение статических сайтов**:
   - Для данного проекта достаточно базового тарифа для статических сайтов
   - Убедитесь, что хостинг позволяет настроить правильную обработку маршрутов для SPA

3. **Настройка домена**:
   - Проверьте, предлагает ли хостинг услуги регистрации доменов
   - Уточните стоимость и процесс продления домена
   - Убедитесь в наличии DNS-панели для настройки записей

4. **Процесс деплоя**:
   1. Соберите проект командой `npm run build`
   2. Загрузите содержимое папки `dist` на сервер через FTP или Git
   3. Настройте .htaccess или nginx для корректной обработки маршрутов SPA

5. **Настройка для Single Page Application**:
   - Создайте файл .htaccess в корне сайта со следующим содержимым:
   ```
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

6. **Переменные окружения**:
   - Убедитесь, что значение переменной `TELEGRAM_BOT_TOKEN` задано правильно в настройках хостинга
   - Создайте файл `.env.production` или используйте панель хостинга для установки переменных

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/4a96fc14-f574-4e76-a128-a676e5c2b665) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with .

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/4a96fc14-f574-4e76-a128-a676e5c2b665) and click on Share -> Publish.

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)
