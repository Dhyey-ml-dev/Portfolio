# 🚀 HOW TO RUN PROJECT ON LOCALHOST

Your project is ready to run locally! Here's everything you need:

---

## ✅ SETUP COMPLETE

✅ `.env` file created with localhost configuration
✅ All dependencies installed (npm + pip)
✅ Backend fixed and ready
✅ `start-local.sh` script ready to run

---

## 🎯 QUICK START - ONE COMMAND

### Open Terminal and Run:

```bash
cd /Users/dhyey/Desktop/Portfolio
bash start-local.sh
```

**That's it!** This will:
1. Check .env file
2. Start Chatbot (port 8000)
3. Start Backend (port 5001)
4. Start Frontend (port 5173)
5. Open browser to http://localhost:5173

---

## 📊 WHAT YOU'LL SEE

After running the script:

```
╔════════════════════════════════════════════════════════╗
║  🚀 DS TECHVIBE PORTFOLIO - LOCAL STARTUP SCRIPT       ║
╚════════════════════════════════════════════════════════╝

✅ Environment Setup Complete!

🚀 STARTING ALL SERVICES...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SERVICES STARTING:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1️⃣  CHATBOT (Flask) - http://localhost:8000
2️⃣  BACKEND (Express) - http://localhost:5001
3️⃣  FRONTEND (Vite) - http://localhost:5173

✅ ALL SERVICES STARTED!

📋 SERVICE URLS:
   🤖 Chatbot:  http://localhost:8000
   🔵 Backend:  http://localhost:5001/api
   🟢 Frontend: http://localhost:5173

🌐 MAIN PAGES:
   Homepage:    http://localhost:5173
   Admin:       http://localhost:5173/admin
   Login Email: admin@example.com
   Login Pass:  password123
```

Browser will automatically open to: **http://localhost:5173**

---

## ✅ VERIFY EVERYTHING WORKS

### 1. Frontend
Open: http://localhost:5173
**You should see:** Portfolio homepage

### 2. Admin Panel
Open: http://localhost:5173/admin
Login: 
- Email: `admin@example.com`
- Password: `password123`

### 3. Chatbot
1. On homepage, click chatbot icon (bottom-right)
2. Type: "What services do you offer?"
3. **You should see:** Gemini AI response!

### 4. Backend API
Open: http://localhost:5001/api
**You should see:**
```json
{
  "message": "Welcome to the Portfolio API!",
  "status": "Running"
}
```

---

## 🛑 STOP SERVICES

The script shows you the Process IDs (PIDs):

```
🤖 Starting Chatbot (Flask)...
   PID: 12345

🔵 Starting Backend (Express)...
   PID: 12346

🟢 Starting Frontend (Vite)...
   PID: 12347
```

### Stop them:

```bash
kill 12345  # Stop Chatbot
kill 12346  # Stop Backend
kill 12347  # Stop Frontend
```

Or just press `Ctrl + C` in the terminal.

---

## 📝 ALTERNATIVE: MANUAL START

If the script doesn't work, start manually in 3 separate terminals:

### Terminal 1 - Chatbot:
```bash
cd /Users/dhyey/Desktop/Portfolio
source .venv/bin/activate
python3 chatbot/app.py
```

### Terminal 2 - Backend:
```bash
cd /Users/dhyey/Desktop/Portfolio/server
npm run dev
```

### Terminal 3 - Frontend:
```bash
cd /Users/dhyey/Desktop/Portfolio/client
npx vite --host 127.0.0.1
```

Then open: http://localhost:5173

---

## 🔍 VIEW LOGS

If anything goes wrong, check logs:

```bash
tail -f /tmp/chatbot.log   # Chatbot logs
tail -f /tmp/backend.log   # Backend logs
tail -f /tmp/frontend.log  # Frontend logs
```

---

## 🎯 MAKE CHANGES & TEST

**Frontend:** Edit React files → Auto-reloads in browser
**Backend:** Edit Express files → Auto-reloads with `npm run dev`
**Chatbot:** Edit Python files → Restart service

---

## 📊 YOUR .ENV FILE

Located at: `/Users/dhyey/Desktop/Portfolio/.env`

```env
VITE_API_URL=http://localhost:5001/api
BACKEND_PORT=5001
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/portfolio
CHATBOT_PORT=8000
GEMINI_API_KEY=AIzaSyCrlBUG-Wz4Ur3wfTkLiYmZ7RUI6Yz3yaE
```

All services read from this file.

---

## 🚀 READY TO START?

```bash
bash start-local.sh
```

Everything will start automatically!

Open browser to: **http://localhost:5173**

---

**Status:** ✅ Ready to Run Locally!
