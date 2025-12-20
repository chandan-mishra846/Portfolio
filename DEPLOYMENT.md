# Deployment Guide - Portfolio Website

## 🚀 Quick Deploy

### Frontend Deployment (Vercel)

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. **Deploy Frontend**:
   ```bash
   cd frontend
   vercel
   ```
   - Follow prompts, select your account
   - Set project name
   - Accept default settings

3. **Set Environment Variable**:
   After deployment, add this in Vercel Dashboard:
   ```
   VITE_API_URL=<your-backend-url>
   ```

### Backend Deployment (Vercel)

1. **Deploy Backend**:
   ```bash
   cd backend
   vercel
   ```

2. **Set Environment Variables** in Vercel Dashboard:
   ```
   MONGODB_URI=<your-mongodb-atlas-uri>
   ADMIN_TOKEN=<your-secret-admin-token>
   SMTP_HOST=<optional-smtp-host>
   SMTP_PORT=<optional-smtp-port>
   SMTP_USER=<optional-smtp-user>
   SMTP_PASS=<optional-smtp-password>
   MAIL_FROM=<optional-sender-email>
   MAIL_TO=<optional-receiver-email>
   ```

3. **Production Deploy**:
   ```bash
   vercel --prod
   ```

---

## 📝 Alternative: Deploy via GitHub

### Frontend on Vercel:
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Select `frontend` folder as root directory
5. Add environment variable: `VITE_API_URL`
6. Deploy!

### Backend on Vercel:
1. Same steps but select `backend` folder
2. Add all environment variables listed above
3. Deploy!

---

## 🔐 Important Notes

### MongoDB Atlas Setup:
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get connection string (replace `<password>` with your password)
4. Add Vercel IPs to whitelist (or use `0.0.0.0/0` for allow all)

### After Backend Deploy:
1. Copy backend URL from Vercel
2. Update frontend's `VITE_API_URL` environment variable
3. Redeploy frontend if needed

### Test Deployment:
- Frontend: `https://<your-project>.vercel.app`
- Backend API: `https://<your-backend>.vercel.app/api/skills`

---

## 🛠️ Commands Summary

```bash
# Frontend
cd frontend
vercel --prod

# Backend  
cd backend
vercel --prod

# Check deployment
vercel ls
```

---

## 📦 What's Already Configured:
✅ vercel.json for frontend
✅ vercel.json for backend
✅ Build scripts in package.json
✅ Environment variable structure

All ready to deploy! 🎉
