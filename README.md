## Brands API & Frontend
Полный стек приложения для управления брендами: Backend на NestJS + PostgreSQL и Frontend на Vite с поддержкой аутентификации, CRUD-операций и интеграцией Swagger.
В состав входит WordPress в отдельном контейнере для CMS-части.

## Стек технологий
Backend
NestJS (TypeScript)

TypeORM + PostgreSQL

JWT аутентификация

Swagger для API-документации

bcrypt для хэширования паролей

Docker/Docker Compose

Frontend
Vite + TypeScript

Docker/Docker Compose

### Дополнительно
WordPress + MySQL в контейнерах

Nginx для production-сборки фронтенда

## Структура проекта
```
├── backend/        # Серверная часть NestJS
│   ├── src/
│   ├── Dockerfile.dev
│   ├── Dockerfile.prod
│   └── .env.*
├── frontend/       # Клиентская часть Vite
│   ├── src/
│   ├── Dockerfile.dev
│   ├── Dockerfile.prod
│   └── .env
├── docker-compose.yml
├── docker-compose.dev.yml
├── docker-compose.prod.yml
└── README.md
```
## Установка и запуск
1. Клонирование репозитория
```
git clone https://https://github.com/vldpvnnk/brands-crud-app.git
cd brands-crud-app
```
2. Запуск через Docker Compose 
### development
```
docker compose -f docker-compose.dev.yml up --build -d
```
Backend: http://localhost:5000

Swagger API Docs: http://localhost:5000/docs

Frontend Dev: http://localhost

WordPress: http://localhost:8080

### production
```
docker compose -f docker-compose.prod.yml up --build -d
```
Backend: http://localhost:5000

Swagger API Docs: http://localhost:5000/docs

Frontend Dev: http://localhost:8081

WordPress: http://localhost:8080

## API
После запуска откройте Swagger-документацию:
http://localhost:5000/docs
Доступные эндпоинты:

POST /auth/register — регистрация

POST /auth/login — вход

GET /brands — список брендов

GET /brands/:id — получить бренд

POST /brands — создать бренд (JWT)

PUT /brands/:id — обновить бренд (JWT)

DELETE /brands/:id — удалить бренд (JWT)