# Vercel Deployment Guide

## 0. GitHub Setup (Required First Step)

### Create a GitHub Repository

1. **Go to GitHub:**
   - Visit https://github.com/new
   - Sign in with your account (create one if needed)

2. **Create repository:**
   - Repository name: `portfolio` (or any name you prefer)
   - Description: "DS TECHVIBE Portfolio - React, Express, Flask with Gemini AI"
   - Visibility: **Public** (required for free Vercel/Railway)
   - **DO NOT** initialize with README, .gitignore, or license (we'll do this locally)
   - Click "Create repository"

3. **Copy the repo URL:**
   - Copy the HTTPS URL: `https://github.com/YOUR_USERNAME/portfolio.git`

### Initialize Git Locally

4. **Open terminal in your project directory:**
   ```bash
   cd /Users/dhyey/Desktop/Portfolio
   ```

5. **Initialize git (if not already done):**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: DS TECHVIBE portfolio with Vite, Express, Flask + Gemini"
   ```

6. **Add remote and push:**
   ```bash
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
   git push -u origin main
   ```

7. **Verify on GitHub:**
   - Go to https://github.com/YOUR_USERNAME/portfolio
   - Confirm all files are there (`client/`, `server/`, `chatbot/`, `.github/`, etc.)

### GitHub .gitignore (Ensure secrets are NOT committed)

8. **Create/update `.gitignore` in repo root:**
   ```
   node_modules/
   .env
   .env.local
   .env.*.local
   __pycache__/
   *.pyc
   .venv/
   venv/
   dist/
   build/
   .DS_Store
   *.log
   ```

9. **Create `.env.example` files (without secrets):**

   **`chatbot/.env.example`** (already created):
   ```
   GEMINI_API_KEY=
   PORT=8000
   DEBUG=False
   ```

   **`server/.env.example`** (create if missing):
   ```
   CHATBOT_URL=https://your-chatbot-url.railway.app/chat
   PORT=5001
   NODE_ENV=production
   ```

10. **Commit these files:**
    ```bash
    git add .gitignore .env.example chatbot/.env.example server/.env.example
    git commit -m "Add environment templates and gitignore"
    git push
    ```

### Repository Structure Check

Your GitHub repo should look like:
```
portfolio/
├── client/                    (React Vite frontend)
├── server/                    (Express backend)
│   ├── src/
│   ├── package.json
│   └── vercel.json
├── chatbot/                   (Flask + Gemini)
│   ├── app.py
│   ├── requirements.txt
│   └── .env.example
├── .github/                   (GitHub Actions - optional)
├── .gitignore
├── vercel.json
├── DEPLOYMENT.md
└── DEPLOYMENT_QUICK_START.md
```

---

## Frontend Deployment (Vercel)

1. **Connect your GitHub repo to Vercel:**
   - Go to https://vercel.com
   - Click "New Project"
   - Import your GitHub repo
   - Select root directory as `/`
   - Build settings: Already configured in `vercel.json`

2. **Set environment variables in Vercel dashboard:**
   - Go to Project Settings → Environment Variables
   - Add: `VITE_API_URL` = your backend URL (see below)

3. **Deploy:**
   - Push to main branch; Vercel auto-deploys

---

## Backend Deployment (Railway or Render)

### Option A: Railway (Recommended for this stack)

1. Go to https://railway.app
2. Create new project → GitHub repo → Select root
3. Add service:
   - Name: `backend`
   - Root directory: `server/`
   - Start command: `npm install && npm start`
4. Set environment variables:
   - `PORT=5001` (or auto-assigned)
   - `CHATBOT_URL=https://your-chatbot-url.railway.app/chat`
   - `NODE_ENV=production`
5. Deploy and note the public URL (e.g., `https://backend-production.railway.app`)

### Option B: Render

1. Go to https://render.com
2. Create new "Web Service" → GitHub repo
3. Settings:
   - Root directory: `server/`
   - Build command: `npm install`
   - Start command: `node src/server.js`
4. Add environment variables (same as above)
5. Deploy and note the URL

---

## Chatbot Deployment (Railway or Render)

### Railway:
1. In the same Railway project, add another service:
   - Name: `chatbot`
   - Root directory: `chatbot/`
   - Start command: `pip install -r requirements.txt && gunicorn app:app --bind 0.0.0.0:$PORT`
2. Set env vars:
   - `GEMINI_API_KEY=AIzaSyCrlBUG-Wz4Ur3wfTkLiYmZ7RUI6Yz3yaE`
   - `PORT=8000` (or auto-assigned)
3. Deploy and note the URL (e.g., `https://chatbot-production.railway.app`)

### Render:
1. Create new "Web Service" → GitHub repo
2. Settings:
   - Root directory: `chatbot/`
   - Build command: `pip install -r requirements.txt`
   - Start command: `gunicorn app:app --bind 0.0.0.0:$PORT`
3. Set env vars (same as above)
4. Deploy and note the URL

---

## Wire Everything Together

1. **Get URLs after deployment:**
   - Frontend: `https://yourname.vercel.app` (Vercel auto-assigns)
   - Backend: `https://your-backend-xxx.railway.app` (Railway/Render)
   - Chatbot: `https://your-chatbot-xxx.railway.app` (Railway/Render)

2. **Update Vercel env vars:**
   - In Vercel dashboard → `VITE_API_URL` = `https://your-backend-xxx.railway.app`
   - Redeploy frontend

3. **Update Railway/Render backend env:**
   - `CHATBOT_URL` = `https://your-chatbot-xxx.railway.app/chat`
   - Redeploy backend

4. **Test:**
   - Open `https://yourname.vercel.app`
   - Click chatbot → ask "What services do you offer?"
   - Should get Gemini-powered response

---

## GitHub Integration

Connect all services to auto-deploy on push:
- **Vercel:** Already connected
- **Railway/Render:** Settings → GitHub → Auto-deploy on push to main

---

## CORS Setup (if needed)

In `server/src/server.js`, ensure CORS allows your Vercel domain:
```javascript
app.use(cors({
  origin: [
    'https://yourname.vercel.app',
    'http://localhost:5173',
    'http://127.0.0.1:5173'
  ]
}));
```

---

## Secrets Management

**Never commit API keys!** Use platform env vars:
- Vercel: Project Settings → Environment Variables
- Railway/Render: Service Settings → Environment Variables
