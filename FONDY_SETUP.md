# ===========================================
# FONDY PAYMENT INTEGRATION SETUP
# ===========================================

## Шаг 1: Регистрация в Fondy
# Зарегистрируйтесь на https://portal.fondy.eu/
# или используйте демо аккаунт для тестирования

## Шаг 2: Получите Merchant ID и Secret Key
# После активации мерчанта в панели Fondy:
# - Настройки мерчанта -> API ключи
# - Скопируйте Merchant ID
# - Скопируйте Secret Key (Ключ подписи)

## Шаг 3: Обновите .env.local
# Замените значения в файле .env.local:
#
# FONDY_MERCHANT_ID=ваш_merchant_id
# FONDY_SECRET_KEY=ваш_secret_key
# NEXT_PUBLIC_BASE_URL=https://your-domain.com

## Шаг 4: Настройте Callback URL в панели Fondy
# В настройках мерчанта укажите:
# - Server Callback URL: https://your-domain.com/api/fondy/callback
# - Response URL (Success): https://your-domain.com/payment/success

## Тестовые данные Fondy:
# Для тестирования используйте:
# - Карта: 4444555566661111
# - CVV: любые 3 цифры
# - Срок: любая будущая дата

## API Endpoints:
# POST /api/fondy/checkout - Создать платёж и получить ссылку на оплату
# POST /api/fondy/callback - Webhook для обработки результатов оплаты
# GET  /api/fondy/status?order_id=XXX - Проверить статус платежа

## Страницы:
# /payment/success?order_id=XXX - Страница успешной оплаты

## Поддерживаемые валюты:
# EUR, USD, UAH, GBP, PLN и другие

## Документация Fondy API:
# https://docs.fondy.eu/
