# Modern Portfolio (React + Tailwind + Framer Motion + Express + MongoDB)

A modern, clean, and responsive portfolio with animations, dark/light mode, SEO meta tags, dynamic content from a backend, and a fully functional contact form with email notifications.

## Monorepo Structure

- `frontend/` – React + Vite + Tailwind + Framer Motion
- `backend/` – Node.js + Express + MongoDB + Nodemailer

## Prerequisites

- Node.js 18+
- MongoDB (local or cloud; update `MONGODB_URI`)

## Setup (Windows PowerShell)

### Backend
```powershell
Push-Location "c:\Users\mishr\Desktop\my profile\backend"; npm install; Copy-Item .env.example .env; Pop-Location
```
Update `.env` with your values. To seed sample data:
```powershell
Push-Location "c:\Users\mishr\Desktop\my profile\backend"; npm run seed; Pop-Location
```
Run the server:
```powershell
Push-Location "c:\Users\mishr\Desktop\my profile\backend"; npm run dev; Pop-Location
```

### Frontend
```powershell
Push-Location "c:\Users\mishr\Desktop\my profile\frontend"; npm install; Copy-Item .env.example .env; Pop-Location
```
Run the dev server:
```powershell
Push-Location "c:\Users\mishr\Desktop\my profile\frontend"; npm run dev; Pop-Location
```

Frontend dev runs on http://localhost:5173 and backend on http://localhost:5000.

## Environment Variables

### Backend `.env`
- `PORT` – default `5000`
- `MONGODB_URI` – your MongoDB connection string
- `CORS_ORIGIN` – set to `http://localhost:5173`
- `ADMIN_TOKEN` – token for admin CRUD operations
- `SMTP_*` – optional SMTP settings for Nodemailer

### Frontend `.env`
- `VITE_API_URL` – e.g., `http://localhost:5000`

## Admin-Friendly Content Updates

Use the admin token for CRUD:
- `POST /api/projects` – create
- `PUT /api/projects/:id` – update
- `DELETE /api/projects/:id` – delete
(Similarly for `/api/skills` and `/api/testimonials`)

Send header `x-admin-token: <ADMIN_TOKEN>` or `Authorization: Bearer <ADMIN_TOKEN>`.

## Features Checklist

- Dark/Light mode toggle (top-right of Hero)
- Framer Motion animations on sections
- Responsive layout with Tailwind
- SEO via `react-helmet-async` and `index.html` meta tags
- Contact form with Joi validation, rate limiting, and email notifications
- Dynamic projects/skills/testimonials from backend (MongoDB)
- CORS + environment variables

## Production Notes

- Build frontend: `npm run build` in `frontend/` → deploy `dist/`
- Configure `MAIL_*` and `SMTP_*` for production email
- Consider reverse proxy (e.g., Nginx) and HTTPS
