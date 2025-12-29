# MERN Task Management App

Production-oriented MERN task manager with secure JWT auth and strict per-user task access.

## Tech
- MongoDB + Mongoose
- Express.js
- React (functional components + hooks)
- Node.js
- JWT authentication (expiring tokens)
- Tailwind CSS

## Deployment

See [DEPLOY.md](DEPLOY.md) for detailed deployment instructions using Render (Backend) and Vercel (Frontend).

## Local setup

### 1) Backend env
Create `backend/.env` (do **not** commit it). Use `backend/.env.example` as reference.

Required:
- `MONGODB_URI`
- `JWT_SECRET`

### 2) Install
From repo root:
- `npm install`
- `npm install --prefix backend`
- `npm install --prefix frontend`

### 3) Run
From repo root:
- `npm run dev`

Backend runs on `http://localhost:5000`.
Frontend runs on `http://localhost:5173`.

## API
Base URL: `/api`

### Auth
- `POST /api/auth/register`  `{ name?, email, password }`
- `POST /api/auth/login`  `{ email, password }`
- `GET /api/auth/me` (Bearer token)

### Tasks (Bearer token)
- `GET /api/tasks` supports query params:
  - `status` = `todo|in_progress|done`
  - `priority` = `low|medium|high`
  - `dueAfter` = date
  - `dueBefore` = date
  - `sort` = `dueDate:asc|dueDate:desc`
- `POST /api/tasks`
