
# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/4a96fc14-f574-4e76-a128-a676e5c2b665

## Настройка Telegram бота с Supabase Edge Functions

### Шаг 1: Настройка Supabase

1. Подключите проект к Supabase через интеграцию Lovable
2. Перейдите в консоль Supabase
3. Перейдите в раздел "Edge Functions"
4. Создайте новую функцию с именем "telegram"
5. Загрузите ваши файлы API из `src/api` в эту функцию

### Шаг 2: Установка переменных окружения

В настройках вашей Supabase Edge Function установите следующие переменные окружения:

```
TELEGRAM_BOT_TOKEN=7809537061:AAHWVRqNikuUyTz0I7C4ycNR0GOUweIKv08
ADMIN_PASSWORD=ваш_секретный_пароль_для_бота
```

### Шаг 3: Запуск бота

1. После настройки Edge Function, вам нужно запустить бота командой:
   ```
   supabase functions deploy telegram
   ```

2. Проверьте логи функции, чтобы убедиться, что бот запустился успешно

### Шаг 4: Подключение формы на сайте

1. Убедитесь, что в вашем проекте установлена переменная окружения `VITE_TELEGRAM_API_URL`, указывающая на URL вашей Edge Function
2. В файле `.env`:
   ```
   VITE_TELEGRAM_API_URL=https://ваш-проект.supabase.co/functions/v1/telegram
   ```

### Шаг 5: Авторизация в боте

1. Найдите вашего бота в Telegram по токену
2. Отправьте команду `/start`
3. Введите пароль, который вы установили в переменной `ADMIN_PASSWORD`
4. После авторизации вы начнете получать уведомления о новых заявках с сайта

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
