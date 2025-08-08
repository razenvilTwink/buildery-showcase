# Настройка переменных окружения

## Для продакшена

Создайте файл `.env.production` в корне проекта:

```env
VITE_API_BASE_URL=https://ваш-api.vercel.app
```

## Для разработки

Создайте файл `.env.local` в корне проекта:

```env
VITE_API_BASE_URL=http://localhost:3000
```

## Переменные для Vercel (API)

В настройках Vercel добавьте:

| Переменная | Значение |
|------------|----------|
| `TELEGRAM_BOT_TOKEN` | `7809537061:AAHH0mEgoPdjgx-E8eLgc1WiYdbUtQNO_jI` |
| `TELEGRAM_CHAT_ID` | `361122150` |
| `JWT_SECRET` | `DlVzElJOZicBbS2HR8i4CpHoaoIfHqj8Xi2th14xtIhKAtLjpzLhYbBg7XAxAtWBUgPPhed9iVioDl065ZdCvMgLasNdAhX6fE4Oh1ClsJajS6etJyafUbs51sFXPg9YuwaInEmSbFz6edKFjl0woKBZnxoE9uuVjaEJGvD3iIZFS84txUxAstpBPBWKMbcsCkhVBBIRi8uR0w0kDtTikbdCXBOPakIbMRaFyHkpqaGP0TLpjYyzCl3FAPybRkCpLzGBgp6Ao1lcvj5BWob5GU4hIEzpUFrxAkRWmSzwOwEf992HC5iqOXqOGn1B2PztUViPOHWLElV96jF9CsSAvh8uu8nvQm9Z9HaqcYCtDPEjyobYNaid05uIF1KW10hQT5em5OkmA6pDnkzZU5bwd9IWz7KbphBoaHiemYvDgKDbyfuKydqTStdYEyCliFmSy0Ue7yiMqMMuBcNMWMM5VfHmsDqjfK8o33UD3sWhaLgZYEB6xaOE901wVm7fPdm3` |
| `ADMIN_USER` | `admin` |
| `ADMIN_PASS` | `secure123` |

## Важно!

1. **Измените пароли** по умолчанию
2. **Обновите JWT_SECRET** на уникальный
3. **Замените URL API** на ваш реальный
4. **Добавьте ваш домен** в CORS настройки
