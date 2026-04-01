# Vercel Deployment Checklist

## Quick Setup Steps

### 1. Frontend (Vite) → Vercel

```bash
# Already configured in vercel.json
git push  # Vercel auto-detects and deploys
```

**Set in Vercel dashboard:**
- Environment variable: `VITE_API_URL` = your backend URL (e.g., `https://backend-xxx.railway.app`)

### 2. Backend (Express) → Railway or Render

**Choose one platform:**

#### Railway:
```bash
# 1. Sign up at railway.app with GitHub
# 2. New Project → GitHub repo
# 3. Select service root: server/
# 4. Environment variables:
#    - CHATBOT_URL=https://chatbot-xxx.railway.app/chat
#    - NODE_ENV=production
# 5. Railway auto-deploys on push
```

#### Render:
```bash
# 1. Sign up at render.com with GitHub
# 2. New → Web Service
# 3. Root directory: server/
# 4. Build: npm install
# 5. Start: node src/server.js
# 6. Add same env vars as above
```

### 3. Chatbot (Flask + Gemini) → Railway or Render

#### Railway (same project as backend):
```bash
# 1. Add new service in Railway
# 2. Root directory: chatbot/
# 3. Environment variables:
#    - GEMINI_API_KEY=AIzaSyCrlBUG-Wz4Ur3wfTkLiYmZ7RUI6Yz3yaE
#    - PORT (auto-assigned)
```

#### Render:
```bash
# 1. New → Web Service
# 2. Root directory: chatbot/
# 3. Build: pip install -r requirements.txt
# 4. Start: gunicorn app:app --bind 0.0.0.0:$PORT
# 5. Add GEMINI_API_KEY env var
```

### 4. Link Everything

After deployment, update `VITE_API_URL` in Vercel with your backend URL:
1. Vercel Dashboard → Settings → Environment Variables
2. Add/update: `VITE_API_URL` = `https://your-backend.railway.app`
3. Redeploy frontend (or push to main)

### 5. Test

Open `https://yourname.vercel.app` and ask the chatbot a question. It should answer using Gemini + your portfolio context.

---

## GitHub Integration (Auto-Deploy)

All three platforms auto-deploy when you push to `main`:
- **Vercel:** Already connected
- **Railway/Render:** Connect during service creation

## Secrets

**NEVER commit API keys.** Use platform env vars only.

## Logs & Debugging

- **Vercel:** Deployments tab
- **Railway/Render:** Logs in service dashboard
