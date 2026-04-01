# 🚀 Single .env Setup Guide - Simple & Quick

## Step 1: Copy the Template
```bash
cp .env.example .env
```

## Step 2: Fill in Your Values
Edit `.env` file (1 minute):

```env
# Your API URL (local or deployed backend)
VITE_API_URL=http://localhost:5001/api

# Backend Port
BACKEND_PORT=5001

# Your MongoDB connection (local or Atlas)
MONGO_URI=mongodb://127.0.0.1:27017/portfolio

# JWT Secret (any random string for local testing)
JWT_SECRET=your-super-secret-key-here

# Admin Credentials (for /admin panel)
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=password123

# Node Environment
NODE_ENV=development

# Chatbot Settings
CHATBOT_PORT=8000

# Get GEMINI_API_KEY from Google Cloud Console
# https://makersuite.google.com/app/apikey
GEMINI_API_KEY=your-google-gemini-key-here

# Debug Mode
DEBUG=False
```

## Step 3: Install Dependencies

### Frontend
```bash
cd client && npm install && cd ..
```

### Backend
```bash
cd server && npm install && cd ..
```

### Chatbot
```bash
# Using Python 3.11+
python3 -m venv .venv
source .venv/bin/activate
pip install -r chatbot/requirements.txt
```

## Step 4: Start Everything

### Option A: Start All Services (Easiest)
```bash
bash start-all.sh
```
Opens 3 terminals automatically for Chatbot (8000), Backend (5001), Frontend (5173)

### Option B: Start Individual Services

**Terminal 1 - Chatbot:**
```bash
source .venv/bin/activate
python3 chatbot/app.py
# Runs on http://localhost:8000
```

**Terminal 2 - Backend:**
```bash
cd server && npm run dev
# Runs on http://localhost:5001
```

**Terminal 3 - Frontend:**
```bash
cd client && npx vite --host
# Runs on http://localhost:5173
```

## Step 5: Test It
- Open browser: **http://localhost:5173**
- Click Chatbot icon (bottom-right)
- Ask: "What services do you offer?"
- Should get response from Gemini AI!

## ✅ That's It!

All services now read from the **single .env file** at the project root.

---

## 🌍 For Deployment (Vercel + Railway)

### Backend URL
After deploying backend to Railway, get the URL:
```env
VITE_API_URL=https://your-backend-xxx.railway.app/api
```

### Chatbot URL  
Update in Railway backend env:
```env
CHATBOT_URL=https://your-chatbot-xxx.railway.app/chat
```

### Production .env
Just update the same `.env` file with deployed URLs and deploy again!

---

## ⚠️ Important
- **Never commit `.env` to Git** — it's in `.gitignore`
- Only commit `.env.example` (the template)
- Keep API keys secret!

---

## 📞 Need Help?
- Check `.env.example` for all available options
- Logs will show which file was loaded: `Loading from /path/to/.env`
