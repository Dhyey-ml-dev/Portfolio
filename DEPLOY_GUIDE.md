# 🚀 Complete Deployment Guide: GitHub → Render/Railway

**Table of Contents**
1. [Prerequisites](#prerequisites)
2. [Step 1: GitHub Repository Setup](#step-1-github-repository-setup)
3. [Step 2: Deploy Backend to Render/Railway](#step-2-deploy-backend-to-renderrailway)
4. [Step 3: Deploy Chatbot to Render/Railway](#step-3-deploy-chatbot-to-renderrailway)
5. [Step 4: Deploy Frontend to Vercel (GitHub Pages Alternative)](#step-4-deploy-frontend-to-vercel-github-pages-alternative)
6. [Step 5: Connect Everything Together](#step-5-connect-everything-together)
7. [Step 6: Custom Domain (.dev/.me)](#step-6-custom-domain-devme)
8. [Testing & Troubleshooting](#testing--troubleshooting)

---

## Prerequisites

✅ GitHub account with your repo pushed: `https://github.com/Dhyey-ml-dev/Portfolio`
✅ `.env.example` file in repo root
✅ All three services ready (frontend in `client/`, backend in `server/`, chatbot in `chatbot/`)

---

## Step 1: GitHub Repository Setup

Your repo is already pushed! Just verify:

```bash
# From your local machine
cd /Users/dhyey/Desktop/Portfolio
git status  # Should show "On branch main, nothing to commit"
```

✅ Your repo is at: https://github.com/Dhyey-ml-dev/Portfolio

---

## Step 2: Deploy Backend to Render/Railway

### Option A: Using Render (Recommended for ease)

**2.1 Create Render Account**
- Go to https://render.com
- Sign up with GitHub (easier auth)

**2.2 Create a New Web Service**
- Click "New +" → "Web Service"
- Connect your GitHub repo: `Dhyey-ml-dev/Portfolio`
- When prompted, authorize Render to access GitHub

**2.3 Configure Service**

| Setting | Value |
|---------|-------|
| **Name** | `portfolio-backend` |
| **Root Directory** | `server` |
| **Environment** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `npm run dev` or `node src/server.js` |
| **Plan** | Free tier (for testing) |

**2.4 Add Environment Variables**

Go to Environment section, add:

```env
BACKEND_PORT=5001
NODE_ENV=production
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
JWT_SECRET=your-super-secret-key-change-me
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=password123
CHATBOT_URL=https://<your-chatbot-render-url>/chat
```

⚠️ **MongoDB Setup:**
- Use MongoDB Atlas (free tier): https://www.mongodb.com/cloud/atlas
- Create cluster, get connection string
- Format: `mongodb+srv://user:pass@cluster.mongodb.net/portfolio?retryWrites=true&w=majority`

**2.5 Deploy**
- Click "Create Web Service"
- Render auto-builds and deploys (5-10 minutes)
- You'll get a URL like: `https://portfolio-backend-xxxx.onrender.com`

✅ **Backend URL:** Note this! Example: `https://portfolio-backend-xxxx.onrender.com`

---

### Option B: Using Railway (Alternative)

**2.1 Create Railway Account**
- Go to https://railway.app
- Sign up with GitHub

**2.2 Create New Project**
- New Project → GitHub repo → Authorize

**2.3 Add Service**
- Add service → Add from repo
- Select your repo
- Root directory: `server`

**2.4 Configure**

In Railway dashboard:

| Variable | Value |
|----------|-------|
| `BACKEND_PORT` | `5001` |
| `NODE_ENV` | `production` |
| `MONGO_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Your secret key |
| `ADMIN_EMAIL` | admin@example.com |
| `ADMIN_PASSWORD` | password123 |
| `CHATBOT_URL` | https://<chatbot-url>/chat |

**2.5 Deploy**
- Railway auto-deploys
- Get your public URL from Railway dashboard

✅ **Backend URL:** Example: `https://portfolio-backend-production.railway.app`

---

## Step 3: Deploy Chatbot to Render/Railway

### Using Render

**3.1 Create Another Web Service**
- In same Render account, click "New +" → "Web Service"
- Select same GitHub repo
- Root directory: `chatbot`

**3.2 Configure Service**

| Setting | Value |
|---------|-------|
| **Name** | `portfolio-chatbot` |
| **Environment** | `Python 3` |
| **Build Command** | `pip install -r requirements.txt` |
| **Start Command** | `gunicorn app:app --bind 0.0.0.0:$PORT` |

**3.3 Add Environment Variables**

```env
CHATBOT_PORT=8000
GEMINI_API_KEY=AIza...your-key-here...
DEBUG=False
```

✅ Get `GEMINI_API_KEY` from: https://makersuite.google.com/app/apikey

**3.4 Deploy**
- Render auto-builds and deploys

✅ **Chatbot URL:** Example: `https://portfolio-chatbot-xxxx.onrender.com`

---

### Using Railway (Alternative)

**3.1 Add Service to Same Project**
- Add service → Add from repo
- Select repo, root directory: `chatbot`

**3.2 Configure**

| Variable | Value |
|----------|-------|
| `CHATBOT_PORT` | `8000` |
| `GEMINI_API_KEY` | Your API key |
| `DEBUG` | False |

**3.3 Deploy**

✅ **Chatbot URL:** Example: `https://portfolio-chatbot-production.railway.app`

---

## Step 4: Deploy Frontend to Vercel (GitHub Pages Alternative)

### Using Vercel (Recommended - easier than GitHub Pages)

**4.1 Create Vercel Account**
- Go to https://vercel.com
- Sign up with GitHub

**4.2 Import Project**
- Click "New Project"
- Select your GitHub repo: `Dhyey-ml-dev/Portfolio`
- Vercel detects it's a monorepo with `client/` folder

**4.3 Configure**

| Setting | Value |
|---------|-------|
| **Framework Preset** | `Next.js` (but it's Vite - proceed anyway) |
| **Root Directory** | `client` |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |

**4.4 Environment Variables**

Add in Vercel dashboard (Project Settings → Environment Variables):

```env
VITE_API_URL=https://portfolio-backend-xxxx.onrender.com/api
```

Replace with your actual backend URL from Step 2.

**4.5 Deploy**
- Click "Deploy"
- Vercel builds and deploys (2-5 minutes)

✅ **Frontend URL:** Example: `https://portfolio-Dhyey-ml-dev.vercel.app`

---

### Alternative: GitHub Pages (Free)

If you prefer GitHub Pages instead of Vercel:

**4.1 Update vite.config.js**

```javascript
export default {
  base: '/',  // or '/Portfolio' if using project pages
  // ... rest of config
}
```

**4.2 Create `.github/workflows/deploy.yml`**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: 18
      
      - name: Install and Build
        run: |
          cd client
          npm install
          npm run build
      
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./client/dist
          publish_branch: gh-pages
```

**4.3 Enable Pages in GitHub**
- Go to repo Settings → Pages
- Source: Deploy from branch
- Branch: `gh-pages`
- Folder: `/ (root)`

✅ **Frontend URL:** `https://Dhyey-ml-dev.github.io/Portfolio`

---

## Step 5: Connect Everything Together

### 5.1 Update Backend Environment Variables

Backend needs to know where chatbot is deployed.

**On Render:** Edit backend service → Environment → Update:
```env
CHATBOT_URL=https://portfolio-chatbot-xxxx.onrender.com/chat
```

**On Railway:** Update `CHATBOT_URL` variable with chatbot URL

### 5.2 Update Frontend Environment Variables

Frontend needs to know where backend is deployed.

**On Vercel:**
- Project Settings → Environment Variables
- Update `VITE_API_URL`:
```env
VITE_API_URL=https://portfolio-backend-xxxx.onrender.com/api
```

**On GitHub Pages:**
- Edit `.env` at repo root
- Update: `VITE_API_URL=https://portfolio-backend-xxxx.onrender.com/api`
- Commit and push

### 5.3 Update Backend CORS

In `server/src/server.js`, update CORS to allow frontend:

```javascript
app.use(cors({
  origin: [
    'https://portfolio-Dhyey-ml-dev.vercel.app',
    'https://Dhyey-ml-dev.github.io',
    'http://localhost:5173',
    'http://127.0.0.1:5173'
  ]
}));
```

Commit and push this change → services auto-redeploy.

---

## Step 6: Custom Domain (.dev/.me)

### 6.1 Buy Domain

- Namecheap, GoDaddy, or Cloudflare
- Pick: `yourname.dev` or `yourname.me`
- Cost: ~$10-15/year

### 6.2 Point to Frontend (Vercel)

**In Vercel Dashboard:**
- Project Settings → Domains
- Add Domain: `yourname.dev`
- Vercel gives you DNS records to add

**At Domain Provider (Namecheap/GoDaddy):**
- Go to DNS settings
- Add Vercel's CNAME/A records
- Wait 24 hours for propagation

### 6.3 Update Frontend URL

After domain is live, update backend environment:

```env
VITE_API_URL=https://api.yourname.dev/api
```

Or keep it as `https://portfolio-backend-xxxx.onrender.com/api` if you don't want API subdomain.

### 6.4 (Optional) Custom Domain for Backend

If you want `api.yourname.dev` for backend:

**On Render:**
- Web Service Settings → Custom Domain
- Add: `api.yourname.dev`
- Add Render's CNAME record to domain provider

Then update frontend:
```env
VITE_API_URL=https://api.yourname.dev/api
```

---

## Testing & Troubleshooting

### Test Frontend

```
1. Open: https://yourname.dev (or Vercel URL)
2. Wait for page to load
3. Check browser console for errors (F12 → Console)
```

### Test Chatbot

```
1. Open homepage
2. Click chatbot icon (bottom-right)
3. Type: "What services do you offer?"
4. Should get response from Gemini AI
```

### Check Logs

**Render Logs:**
- Service dashboard → Logs tab
- Shows errors in real-time

**Railway Logs:**
- Service → Logs
- Filter by service

**Vercel Logs:**
- Project → Deployments → Latest → Logs
- Or use Vercel CLI: `vercel logs`

### Common Issues

| Problem | Solution |
|---------|----------|
| Chatbot not responding | Check `GEMINI_API_KEY` is set and valid |
| Frontend can't reach backend | Check CORS and `VITE_API_URL` env var |
| 403/404 on API calls | Verify backend is running and CORS allows your domain |
| Build fails on Render | Check `requirements.txt` or `package.json` has all deps |
| MongoDB connection error | Verify connection string format and IP whitelist in Atlas |

---

## Summary Checklist

- [ ] GitHub repo pushed with `.env.example`
- [ ] Backend deployed to Render/Railway
- [ ] Chatbot deployed to Render/Railway
- [ ] Frontend deployed to Vercel/GitHub Pages
- [ ] Backend `CHATBOT_URL` env updated
- [ ] Frontend `VITE_API_URL` env updated
- [ ] Backend CORS includes frontend URL
- [ ] Test chatbot on live site
- [ ] (Optional) Domain purchased and configured
- [ ] All services have HTTPS

---

## Quick Command Reference

```bash
# Local testing before deploy
npm install
python3 -m venv .venv
source .venv/bin/activate
pip install -r chatbot/requirements.txt

# Start all locally
bash start-all.sh

# Push changes to trigger auto-deploy
git add .
git commit -m "Update deployment config"
git push origin main
```

---

## Support

For issues:
- **Render Support:** https://render.com/docs
- **Railway Support:** https://docs.railway.app
- **Vercel Support:** https://vercel.com/docs
- **MongoDB Atlas:** https://docs.atlas.mongodb.com

Happy deploying! 🎉
