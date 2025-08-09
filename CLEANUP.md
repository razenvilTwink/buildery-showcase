# Очистка проекта

После разделения на backend и frontend, можно удалить ненужные файлы из корневой папки.

## Что можно удалить

### Из корневой папки:
- `api/` - перенесено в `backend/api/`
- `src/` - перенесено в `frontend/src/`
- `public/` - перенесено в `frontend/public/`
- `package.json` - заменен на отдельные в backend/ и frontend/
- `package-lock.json` - заменен на отдельные
- `vite.config.ts` - перенесено в frontend/
- `tailwind.config.ts` - перенесено в frontend/
- `postcss.config.js` - перенесено в frontend/
- `tsconfig.json` - заменен на отдельные
- `tsconfig.app.json` - перенесено в frontend/
- `tsconfig.node.json` - перенесено в frontend/
- `components.json` - перенесено в frontend/
- `eslint.config.js` - перенесено в frontend/
- `index.html` - перенесено в frontend/
- `dist/` - будет создаваться в frontend/
- `node_modules/` - будут создаваться отдельно
- `.vercel/` - будет создаваться в backend/

### Команды для удаления:

```bash
# Удаляем ненужные файлы из корня
rm -rf api/
rm -rf src/
rm -rf public/
rm -rf dist/
rm -rf node_modules/
rm -rf .vercel/
rm package.json
rm package-lock.json
rm vite.config.ts
rm tailwind.config.ts
rm postcss.config.js
rm tsconfig.json
rm tsconfig.app.json
rm tsconfig.node.json
rm components.json
rm eslint.config.js
rm index.html
```

## Финальная структура

После очистки структура будет такой:

```
buildery-showcase-main/
├── backend/               # Backend для Vercel
│   ├── api/
│   ├── package.json
│   ├── tsconfig.json
│   ├── vercel.json
│   └── README.md
├── frontend/             # Frontend для российского хостинга
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.ts
│   └── README.md
├── README.md             # Основной README
├── DEPLOYMENT.md         # Инструкция по деплою
├── ENV_SETUP.md          # Настройка переменных
└── CLEANUP.md            # Этот файл
```

## Проверка работоспособности

### Backend:
```bash
cd backend
npm install
npm run dev
```

### Frontend:
```bash
cd frontend
npm install
npm run dev
```

## Деплой

1. **Backend на Vercel:**
```bash
cd backend
vercel --prod
```

2. **Frontend на российский хостинг:**
```bash
cd frontend
npm run build
# Загрузить dist/ на хостинг
```
