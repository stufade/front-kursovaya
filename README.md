# Интернет-магазин продуктов

Простое приложение для заказа продуктов с бэкендом на Node.js и фронтендом на React.

## Структура проекта

```
.
├── client/              # React-клиент
│   ├── public/
│   ├── src/
│   └── Dockerfile
├── server/              # Node.js сервер
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── index.js
├── docker-compose.yml
└── README.md
```

## Технологии

- Бэкенд: Node.js, Express, Sequelize, SQLite
- Фронтенд: React, React-Bootstrap, Axios
- Контейнеризация: Docker, Docker Compose

## Запуск через Docker

1. Установите Docker и Docker Compose
2. Выполните в корне проекта:
```bash
docker-compose up --build
```
3. Приложение будет доступно:
   - Фронтенд: http://localhost:3000
   - Бэкенд: http://localhost:8000/api

## Локальный запуск

**Сервер:**
```bash
cd server
npm install
npm start
```

**Клиент:**
```bash
cd client
npm install
npm start
```

## API Endpoints

- `GET /api/products` - список продуктов
- `POST /api/orders` - создать заказ
- `GET /api/orders` - список заказов
- `GET /api/product-types` - типы продуктов

## Примеры запросов

Создание заказа:
```http
POST /api/orders
Content-Type: application/json

{
  "phone": "+79123456789",
  "address": "ул. Примерная, 1",
  "products": [
    {"id": 1, "quantity": 2}
  ]
}
```
