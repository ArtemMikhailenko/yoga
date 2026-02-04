# Настройка Google Calendar Integration

## Шаг 1: Создание проекта в Google Cloud Console

1. Перейдите на https://console.cloud.google.com/
2. Создайте новый проект или выберите существующий
3. Включите Google Calendar API:
   - Перейдите в "APIs & Services" → "Library"
   - Найдите "Google Calendar API"
   - Нажмите "Enable"

## Шаг 2: Создание Service Account

1. Перейдите в "APIs & Services" → "Credentials"
2. Нажмите "Create Credentials" → "Service Account"
3. Заполните:
   - Service account name: `yoga-calendar-bot`
   - Service account ID: автоматически заполнится
4. Нажмите "Create and Continue"
5. Пропустите шаги "Grant access" и "Grant users access"
6. Нажмите "Done"

## Шаг 3: Создание ключа Service Account

1. В списке Service Accounts нажмите на созданный аккаунт
2. Перейдите на вкладку "Keys"
3. Нажмите "Add Key" → "Create new key"
4. Выберите JSON формат
5. Скачайте файл с ключом

## Шаг 4: Настройка Google Calendar

1. Откройте Google Calendar (calendar.google.com) с аккаунтом, к которому нужен доступ
2. Найдите нужный календарь в левой панели
3. Нажмите на 3 точки рядом с календарём → "Settings and sharing"
4. Прокрутите до "Share with specific people or groups"
5. Нажмите "Add people and groups"
6. Введите email Service Account (из файла JSON, поле `client_email`)
7. Выберите права "Make changes to events"
8. Нажмите "Send"

## Шаг 5: Получение Calendar ID

1. В настройках календаря прокрутите до "Integrate calendar"
2. Скопируйте "Calendar ID"
   - Для основного календаря это будет email (например: `vladybookings@gmail.com`)
   - Или можно использовать `primary` для основного календаря

## Шаг 6: Настройка переменных окружения

Добавьте в файл `.env.local`:

```env
# Google Calendar API
GOOGLE_CALENDAR_ID=vladybookings@gmail.com
GOOGLE_SERVICE_ACCOUNT_EMAIL=yoga-calendar-bot@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
```

### Как скопировать Private Key:

1. Откройте скачанный JSON файл
2. Найдите поле `private_key`
3. Скопируйте значение ПОЛНОСТЬЮ включая:
   - `-----BEGIN PRIVATE KEY-----`
   - Все символы `\n` (не заменяйте их на переносы строк!)
   - `-----END PRIVATE KEY-----\n`
4. Вставьте в `.env.local` в кавычках

### Пример структуры JSON файла:

```json
{
  "type": "service_account",
  "project_id": "your-project-id",
  "private_key_id": "xxxxx",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "yoga-calendar-bot@your-project.iam.gserviceaccount.com",
  "client_id": "123456789",
  ...
}
```

## Проверка работы

После настройки:

1. Перезапустите сервер: `npm run dev`
2. Откройте страницу записи на занятия
3. Выберите дату - должны загрузиться занятые слоты
4. Создайте событие в Google Calendar на сегодня (например, 14:00-15:00)
5. На сайте выберите эту дату - время 14:00 должно быть помечено как занятое

## Тестирование API

```bash
# Получить занятые слоты на сегодня
curl "http://localhost:3000/api/calendar?date=2025-01-15"

# Проверить конкретное время
curl "http://localhost:3000/api/calendar?date=2025-01-15&time=14:00"
```

## Возможные проблемы

### "Calendar API has not been used in project"
- Убедитесь, что Calendar API включён в проекте

### "The caller does not have permission"
- Проверьте, что Service Account добавлен в настройки календаря
- Проверьте, что у Service Account есть права "Make changes to events"

### "Invalid key"
- Убедитесь, что `GOOGLE_PRIVATE_KEY` скопирован ПОЛНОСТЬЮ
- Проверьте, что ключ в кавычках
- Символы `\n` должны остаться как есть (не заменяйте на реальные переносы строк)
