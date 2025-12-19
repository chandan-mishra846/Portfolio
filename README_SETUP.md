# Modern Portfolio (React + Tailwind + Framer Motion + Express + MongoDB)

A modern, clean, and responsive portfolio with premium animations, dark/light mode, SEO meta tags, dynamic content from backend, and fully functional contact form with email notifications.

## Monorepo Structure

- `frontend/` – React + Vite + Tailwind + Framer Motion
- `backend/` – Node.js + Express + MongoDB + Nodemailer

## Prerequisites

- Node.js 18+
- MongoDB (local or MongoDB Atlas cloud)

## Quick Setup & Run (Windows PowerShell)

### Step 1: Install Dependencies

**Backend:**
```powershell
Push-Location "c:\Users\mishr\Desktop\my profile\backend"
npx --yes pnpm@9.12.3 i --registry https://registry.npmmirror.com
Pop-Location
```

**Frontend:**
```powershell
Push-Location "c:\Users\mishr\Desktop\my profile\frontend"
npx --yes pnpm@9.12.3 i --registry https://registry.npmmirror.com
Pop-Location
```

### Step 2: Configure Environment Variables

**Backend `.env`:**
```powershell
Push-Location "c:\Users\mishr\Desktop\my profile\backend"
if (-Not (Test-Path .env)) { Copy-Item .env.example .env }
Pop-Location
```
Edit `backend/.env` and set:
- `MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/portfolio` (or `mongodb://localhost:27017/portfolio` for local)
- `CORS_ORIGIN=http://localhost:5173`
- `ADMIN_TOKEN=your-secret-token-here`

**Frontend `.env`:**
```powershell
Push-Location "c:\Users\mishr\Desktop\my profile\frontend"
if (-Not (Test-Path .env)) { Copy-Item .env.example .env }
Pop-Location
```

### Step 3: Start the Servers

**Backend (in one terminal):**
```powershell
Push-Location "c:\Users\mishr\Desktop\my profile\backend"
node server.js
Pop-Location
```
Backend runs on http://localhost:5000

**Frontend (in another terminal):**
```powershell
Push-Location "c:\Users\mishr\Desktop\my profile\frontend"
npx vite
Pop-Location
```
Frontend runs on http://localhost:5173

### Step 4 (Optional): Seed Sample Data

```powershell
Push-Location "c:\Users\mishr\Desktop\my profile\backend"
npx --yes pnpm@9.12.3 exec node scripts/seed.js --registry https://registry.npmmirror.com
Pop-Location
```

## MongoDB Setup Options

### Option A: MongoDB Atlas (Cloud - Recommended)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account and cluster
3. Get connection string
4. Add to `backend/.env`: `MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/portfolio`

### Option B: Local MongoDB
1. Download from https://www.mongodb.com/try/download/community
2. Start MongoDB service
3. Use `MONGODB_URI=mongodb://localhost:27017/portfolio`

## Admin Content Management

Add/update projects, skills, testimonials via API with admin token:

```powershell
$headers = @{ "x-admin-token" = "your-admin-token" }
$body = @{
    title = "My Project"
    description = "Description here"
    image = "https://..."
    liveLink = "https://..."
    githubLink = "https://..."
    techStack = @("React", "Node.js")
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:5000/api/projects" `
  -Method POST `
  -Headers $headers `
  -ContentType "application/json" `
  -Body $body
```

Apply same pattern to `/api/skills` and `/api/testimonials`.

## Features

✅ **Animations**: Page preloader, scroll reveals, hover effects, button ripples  
✅ **Dark/Light Mode**: Toggle in navbar  
✅ **Mobile Responsive**: Hamburger menu for mobile  
✅ **Scroll Indicators**: Progress bar + back-to-top button  
✅ **Skeleton Loaders**: Smooth loading states for API data  
✅ **Contact Form**: Email notifications via Nodemailer  
✅ **Dynamic Content**: Projects, skills, testimonials from MongoDB  
✅ **SEO Optimized**: Meta tags, structured HTML  
✅ **Glassmorphism**: Glow effects & modern UI  
✅ **Admin API**: Protected CRUD endpoints  
✅ **Rate Limiting**: Contact form spam protection  

## Troubleshooting

**npm/pnpm install fails?**
```powershell
npm cache clean --force
npx --yes pnpm@9.12.3 i --registry https://registry.npmmirror.com
```

**MongoDB connection error?**
- Ensure MongoDB is running (local) OR use Atlas connection string
- Check `MONGODB_URI` in `backend/.env`

**Port 5173 already in use?**
```powershell
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

**Frontend can't reach backend?**
- Verify `VITE_API_URL=http://localhost:5000` in `frontend/.env`
- Check `CORS_ORIGIN=http://localhost:5173` in `backend/.env`
- Ensure backend is running

## Production Deployment

1. **Build Frontend:** `npm run build` → uploads `dist/` folder to Vercel/Netlify
2. **Deploy Backend:** Railway/Heroku/DigitalOcean
3. **Update URLs:** Set `VITE_API_URL` to production backend URL
4. **Database:** Use MongoDB Atlas for production
5. **Email:** Configure `SMTP_*` variables for Nodemailer

## Project Structure

```
my profile/
├── frontend/
│   ├── src/
│   │   ├── components/    (Preloader, ThemeToggle, MobileMenu, etc.)
│   │   ├── sections/      (Hero, About, Skills, Projects, etc.)
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
└── backend/
    ├── src/
    │   ├── models/        (Project, Skill, Testimonial, Contact)
    │   ├── routes/        (projects, skills, testimonials, contact)
    │   └── utils/         (adminAuth middleware)
    ├── scripts/
    │   └── seed.js        (sample data)
    ├── server.js
    └── package.json
```
