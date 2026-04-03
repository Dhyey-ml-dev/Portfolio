# 🚀 Complete Deployment Guide: GitHub → Render/Railway

**Table of Contents**
1. [Prerequisites](#prerequisites)
2. [Step 1: GitHub Repository Setup](#step-1-github-repository-setup)
3. [Step 2: Deploy Backend to Render/Railway](#step-2-deploy-backend-to-renderrailway)
4. [Step 3: Deploy Chatbot to Render/Railway](#step-3-deploy-chatbot-to-renderrailway)
5. [Step 4: Deploy Frontend to Vercel (GitHub Pages Alternative)](#step-4-deploy-frontend-to-vercel-github-pages-alternative)
6. [Step 5: Connect Everything Together](#step-5-connect-everything-together)
7. [Step 6: Custom Domain (.dev/.me) - FREE via GitHub Student Pack](#step-6-custom-domain-devme---free-via-github-student-pack)
8. [Appendix A: Render Runtime Selection Guide](#appendix-a-render-runtime-selection-guide)
9. [Testing & Troubleshooting](#testing--troubleshooting)

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

✅ Your repo is at: https://github.c@om/Dhyey-ml-dev/Portfolio

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

⚠️ **DETAILED EXPLANATION OF EACH VARIABLE:**

#### `BACKEND_PORT=5001`
- **What it is:** The port your Express server runs on
- **What to write:** `5001` (don't change this)
- **Why:** This is the port your frontend will connect to
- **Example:** `BACKEND_PORT=5001`

#### `NODE_ENV=production`
- **What it is:** Tells Node.js to run in production mode (optimized, no debug logs)
- **What to write:** `production` (exactly this word)
- **Why:** Render expects this for deployment
- **Example:** `NODE_ENV=production`

#### `MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio`
- **What it is:** Connection string to your MongoDB database
- **Where to get it:** MongoDB Atlas (free tier): https://www.mongodb.com/cloud/atlas
- **Step-by-step:**
  1. Go to MongoDB Atlas
  2. Sign up or login
  3. Create new cluster (choose FREE tier)
  4. Wait for cluster to be created (~5 min)
  5. Click "Connect" button
  6. Choose "Drivers" → "Node.js"
  7. Copy connection string
  8. Replace `<password>` with your MongoDB password
  9. Replace `<dbname>` with `portfolio`
- **Full Example:** 
  ```
  mongodb+srv://dhyey:MyPassword123@cluster0.abc123.mongodb.net/portfolio?retryWrites=true&w=majority
  ```
- **⚠️ Important:** 
  - Keep username/password secret!
  - Add Render's IP to MongoDB whitelist: In MongoDB Atlas → Network Access → Add IP → "Allow access from anywhere" (0.0.0.0/0)

#### `JWT_SECRET=your-super-secret-key-change-me`
- **What it is:** Secret key for user authentication tokens
- **What to write:** Any random string (at least 32 characters long)
- **How to generate:** Use any random string generator or:
  ```bash
  # On your Mac terminal:
  openssl rand -base64 32
  # This will output something like: aBc123XyZ+/==
  ```
- **Example:** `JWT_SECRET=MySecureKey12345RandomString67890`
- **⚠️ Important:** 
  - Keep it secret!
  - Don't share it!
  - Use something complex (mix uppercase, lowercase, numbers, symbols)

#### `ADMIN_EMAIL=admin@example.com`
- **What it is:** Email for admin login panel
- **What to write:** Your email or fake email for testing
- **Example:** 
  - `ADMIN_EMAIL=admin@example.com` (for testing)
  - `ADMIN_EMAIL=your-email@gmail.com` (your real email)
- **Why:** You'll use this to login to the admin panel

#### `ADMIN_PASSWORD=password123`
- **What it is:** Password for admin login panel
- **What to write:** Any password you want (change from default!)
- **Example:** 
  - `ADMIN_PASSWORD=SecurePassword@123` (strong password)
  - `ADMIN_PASSWORD=password123` (for testing, not secure)
- **⚠️ Important:** 
  - Change this from default!
  - Use strong password for production

#### `CHATBOT_URL=https://<your-chatbot-render-url>/chat`
- **What it is:** URL where your chatbot is deployed
- **What to write:** Leave as-is for now, update AFTER deploying chatbot
- **Step-by-step:**
  1. First, deploy backend without this URL set
  2. Then, go to Step 3 and deploy chatbot
  3. You'll get chatbot URL like: `https://portfolio-chatbot-xxxx.onrender.com`
  4. Come back to backend settings
  5. Replace `<your-chatbot-render-url>` with actual URL
  6. **Final:** `CHATBOT_URL=https://portfolio-chatbot-xxxx.onrender.com/chat`
- **Example:** `CHATBOT_URL=https://portfolio-chatbot-abc123.onrender.com/chat`

---

#### 🎯 QUICK REFERENCE TABLE

| Variable | Example Value | Where to Write |
|----------|---------------|-----------------|
| `BACKEND_PORT` | `5001` | Render → Environment |
| `NODE_ENV` | `production` | Render → Environment |
| `MONGO_URI` | `mongodb+srv://user:pass@cluster.abc.mongodb.net/portfolio` | Render → Environment |
| `JWT_SECRET` | `MySecureRandomKey123!@#` | Render → Environment |
| `ADMIN_EMAIL` | `admin@example.com` | Render → Environment |
| `ADMIN_PASSWORD` | `SecurePass@123` | Render → Environment |
| `CHATBOT_URL` | `https://portfolio-chatbot-xxxx.onrender.com/chat` | Render → Environment (after step 3) |

---

#### HOW TO ADD THESE IN RENDER DASHBOARD

1. Create backend service (see Step 2.2)
2. Fill Name, Root Directory, Environment, etc.
3. Scroll down to **"Environment"** section
4. Click **"Add Environment Variable"**
5. Enter first variable name: `BACKEND_PORT`
6. Enter value: `5001`
7. Click **"Add Environment Variable"** again
8. Enter next variable: `NODE_ENV`
9. Enter value: `production`
10. Repeat for ALL variables
11. Scroll down and click **"Create Web Service"**

**It will look like:**
```
Environment Variables:
┌─────────────────────────────────────────┐
│ KEY: BACKEND_PORT  VALUE: 5001         │
│ KEY: NODE_ENV      VALUE: production    │
│ KEY: MONGO_URI     VALUE: mongodb+srv...│
│ KEY: JWT_SECRET    VALUE: MySecureKey...│
│ KEY: ADMIN_EMAIL   VALUE: admin@exam...│
│ KEY: ADMIN_PASSWORD VALUE: SecurePass..│
│ KEY: CHATBOT_URL   VALUE: https://...  │
└─────────────────────────────────────────┘
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

## Step 6: Custom Domain (.dev/.me) - FREE via GitHub Student Pack

### 6.1 Get FREE .dev or .me Domain (Students Only)

If you have a GitHub Student ID, you can get a free `.dev` or `.me` domain for 1 year through GitHub Education!

#### 6.1a: Verify GitHub Student Status

1. Go to: https://education.github.com
2. Click "Join GitHub Classroom" or "Get Student Benefits"
3. Sign in with your GitHub account
4. Verify with your school email (`.edu` or institutional email)
5. Wait for approval (usually instant, sometimes 24 hours)

**Check status:**
- Go to https://github.com/settings/education
- Should show "GitHub Pro" and "Student" badge

#### 6.1b: Get Free Domain from GitHub Student Pack

1. Go to: https://education.github.com/pack
2. Scroll down to find domain offers:
   - **Namecheap:** Free `.me` domain for 1 year + $50 credit
   - **Get.tech:** Free `.tech` domain
   - **Codecademy:** Free domain with Codecademy courses

**Using Namecheap (easiest for .dev/.me):**

1. In GitHub Student Pack page, find "Namecheap" → Click "Get offer"
2. You'll get a redemption link and coupon code
3. Go to https://namecheap.com and sign up
4. Search for your desired domain:
   - `yourname.me` (usually FREE with coupon)
   - `yourname.dev` (might need $50 credit)
5. Add to cart and apply the coupon code from GitHub
6. Checkout (should be $0 or use credit)
7. Complete domain registration

**Domain options:**
- `.me` → Personal brand, 1 year free
- `.dev` → Requires $50 credit but looks more professional
- Choose based on what's available with your student credit

**Pro tip:** 
- Free domain for 1 year
- After 1 year, auto-renews at regular price (~$8-12/year) unless you cancel
- Keep your billing method updated if you want to keep it

#### 6.1c: After Getting Domain

Once registered, note your domain (e.g., `dhyey.me` or `dhyey.dev`).

You'll use this in the next sections.

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

## Appendix A: Render Runtime Selection Guide

When creating a new Web Service on Render, you'll see a prompt asking for "Environment". Here's the detailed breakdown for which one to choose.

### A.1 Backend (Node.js Service)

**What Render asks:**
```
Select Runtime/Environment:

⭕ Docker
⭕ Node
⭕ Static Site
⭕ Python
⭕ Go
⭕ Rust
```

**Your backend (`server/`) uses Node.js, so SELECT: `Node`**

**Full Backend Configuration:**

```
Name:                  portfolio-backend
Root Directory:        server
Environment:           Node ← SELECT THIS
Build Command:         npm install
Start Command:         npm start
                       (or: node src/server.js)
Region:                Choose closest to you
Plan:                  Free (for testing)
```

**Why Node and not Docker?**
- ✅ Node is simpler and faster to deploy
- ✅ No need to write Dockerfile for standard Node apps
- ✅ Render auto-detects `package.json` and handles everything
- ✅ Docker adds unnecessary complexity for standard apps
- ✅ Builds 5x faster with Node runtime

**When to use Docker?**
- ❌ Only if you have a custom `Dockerfile` in your repo
- ❌ Only if you need custom system dependencies
- ❌ Only if you're running complex multi-container setup
- For this project: **DO NOT USE DOCKER**

---

### A.2 Chatbot (Python Service)

**Your chatbot (`chatbot/`) uses Python with Flask, so SELECT: `Python 3`**

**Full Chatbot Configuration:**

```
Name:                  portfolio-chatbot
Root Directory:        chatbot
Environment:           Python 3 ← SELECT THIS
Build Command:         pip install -r requirements.txt
Start Command:         gunicorn app:app --bind 0.0.0.0:$PORT
Region:                Same as backend (for lower latency)
Plan:                  Free (for testing)
```

**Why Python 3 and not Docker?**
- ✅ Python 3 is the standard for Flask apps
- ✅ Render auto-detects `requirements.txt`
- ✅ Faster deployment than Docker
- ✅ Gunicorn handles production workloads properly

**Important: Use Gunicorn, not Flask dev server**

❌ WRONG (will crash in production):
```bash
python app.py
flask run
```

✅ CORRECT (production-ready):
```bash
gunicorn app:app --bind 0.0.0.0:$PORT
```

**Gunicorn explanation:**
- `app:app` → tells Gunicorn where your Flask app is (`app.py` file, `app` object)
- `--bind 0.0.0.0:$PORT` → binds to all interfaces on the port Render assigns
- `$PORT` → Render automatically sets this environment variable

---

### A.3 Frontend (Vercel or GitHub Pages)

For frontend, you use **Vercel or GitHub Pages**, NOT Render:

- **Vercel:** Recommended - auto-detects Vite, instant deployments
- **GitHub Pages:** Free alternative - use GitHub Actions

**DO NOT deploy frontend to Render.** It's slower and more expensive.

If you absolutely must, use:
```
Environment:           Node
Build Command:         npm run build
Start Command:         npm run preview
```

But **Vercel is better for frontend.**

---

### A.4 Complete Runtime Selection Cheat Sheet

| Service | Directory | Render Environment | Build Command | Start Command |
|---------|-----------|-------------------|----------------|----------------|
| **Backend** | `server/` | **Node** | `npm install` | `npm start` |
| **Chatbot** | `chatbot/` | **Python 3** | `pip install -r requirements.txt` | `gunicorn app:app --bind 0.0.0.0:$PORT` |
| **Frontend** | `client/` | **Use Vercel** | `npm run build` | (N/A - Vercel handles it) |

---

### A.5 Common Render Configuration Mistakes

| Mistake | What Happens | Fix |
|---------|--------------|-----|
| Select "Docker" for Node backend | Build fails or very slow (15+ min) | Select "Node" instead |
| Use `python app.py` as start command for chatbot | App starts but crashes under load | Use `gunicorn app:app --bind 0.0.0.0:$PORT` |
| Wrong root directory (e.g., `Portfolio/server` instead of `server`) | Build fails: "package.json not found" | Use exact directory: `server` or `chatbot` |
| Missing environment variables | Services crash silently or with vague errors | Add all vars in Render Dashboard → Environment |
| Missing `requirements.txt` or `package.json` | Build fails completely | Verify files exist in root of service directory |
| Forgot to set `GEMINI_API_KEY` for chatbot | Chatbot responds with errors | Add key in Render Environment section |
| Using `$PORT` wrong in start command | App doesn't bind to Render's assigned port | Use: `--bind 0.0.0.0:$PORT` (Render sets this) |

---

### A.6 Step-by-Step: Creating Backend Service on Render

**When you click "New +" → "Web Service":**

```
1. ✅ Connect GitHub repo → Select Dhyey-ml-dev/Portfolio
   
2. ✅ Enter Name: portfolio-backend

3. ✅ Choose Environment:
   - See options: Docker, Node, Static Site, Python, Go, Rust
   - CLICK: Node ← THIS ONE

4. ✅ Root Directory: server

5. ✅ Build Command: npm install

6. ✅ Start Command: npm start

7. ✅ Choose Region: Choose closest to you

8. ✅ Select Plan: Free

9. ✅ Click "Create Web Service"

10. ✅ Wait 5-10 minutes for build

11. ✅ You'll get URL: https://portfolio-backend-xxxx.onrender.com
```

---

### A.7 Step-by-Step: Creating Chatbot Service on Render

**When you click "New +" → "Web Service" (second time):**

```
1. ✅ Connect same GitHub repo

2. ✅ Enter Name: portfolio-chatbot

3. ✅ Choose Environment:
   - CLICK: Python 3 ← THIS ONE

4. ✅ Root Directory: chatbot

5. ✅ Build Command: pip install -r requirements.txt

6. ✅ Start Command: gunicorn app:app --bind 0.0.0.0:$PORT

7. ✅ Choose Region: Same as backend (optional but good for latency)

8. ✅ Select Plan: Free

9. ✅ Click "Create Web Service"

10. ✅ Wait 5-10 minutes for build

11. ✅ You'll get URL: https://portfolio-chatbot-xxxx.onrender.com
```

---

## Testing & Troubleshooting

### T.1 Verify Services Are Running

Check all three services are deployed and running:

**Backend Health Check:**
```
Open: https://portfolio-backend-xxxx.onrender.com/api
Should see: {"message": "Welcome to the Portfolio API!", ...}
```

**Chatbot Health Check:**
```
Open: https://portfolio-chatbot-xxxx.onrender.com/health
Should see: {"status": "healthy", "service": "chatbot", ...}
```

**Frontend Check:**
```
Open: https://yourname.dev (or Vercel URL)
Should load homepage immediately
```

### T.2 Test Frontend

```
1. Open: https://yourname.dev (or Vercel URL)
2. Wait for page to load
3. Check browser console for errors (F12 → Console)
```

### T.3 Test Chatbot

```
1. Open homepage
2. Click chatbot icon (bottom-right)
3. Type: "What services do you offer?"
4. Should get response from Gemini AI
```

### T.4 Check Logs

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
