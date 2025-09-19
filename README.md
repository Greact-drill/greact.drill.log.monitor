# Drill Log Monitor

API для отображения и анализа логов, приходящих из https://drill.greact.ru/api/log

## Установка и запуск

### Локальная разработка

```bash
# Установка зависимостей
npm install

# Запуск в режиме разработки
npm start
```

### Docker

#### Сборка и запуск с Docker

```bash
# Сборка образа
docker build -t monitor-frontend .

# Запуск контейнера
docker run -p 3000:80 monitor-frontend
```

#### Сборка и запуск с Docker Compose

```bash
# Сборка и запуск
docker-compose up --build

# Запуск в фоновом режиме
docker-compose up -d --build
```

Приложение будет доступно по адресу: http://localhost:3000

## Переменные окружения

Создайте файл `.env`:

```env
REACT_APP_LOG_API_URL=https://drill.greact.ru/api/log
```

## Docker

Проект использует multi-stage Docker сборку:
- **Stage 1**: Сборка React приложения с помощью `react-scripts build`
- **Stage 2**: Nginx для хостинга статических файлов с поддержкой SPA роутинга

### Особенности конфигурации nginx:
- Все запросы направляются на `index.html` для поддержки SPA роутинга
- Кэширование статических ресурсов (JS, CSS, изображения)
- Gzip сжатие для оптимизации
- Скрытие версии nginx для безопасности
