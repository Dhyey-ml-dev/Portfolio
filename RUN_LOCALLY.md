# 🏃 RUN LOCALLY - Start All Services on Localhost

**Quick Start:** Everything runs on localhost automatically!

---

## 📊 SERVICES RUNNING LOCALLY

| Service | URL | Port | Status |
|---------|-----|------|--------|
| **Frontend** | http://localhost:5173 | 5173 | React/Vite |
| **Backend** | http://localhost:5001 | 5001 | Express/Node |
| **Chatbot** | http://localhost:8000 | 8000 | Flask/Python |
| **MongoDB** | localhost:27017 | 27017 | Local DB |

---

## ✅ SETUP COMPLETE

Your `.env` file is ready with localhost config:

```env
VITE_API_URL=http://localhost:5001/api
BACKEND_PORT=5001
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/portfolio
CHATBOT_PORT=8000
GEMINI_API_KEY=AIzaSyCrlBUG-Wz4Ur3wfTkLiYmZ7RUI6Yz3yaE
```

---

## 🚀 START ALL SERVICES AT ONCE

### Option A: One Command (Easiest!)

```bash
bash start-all.sh
```

This will open 3 new Terminal windows and start:
1. Chatbot (port 8000)
2. Backend (port 5001)
3. Frontend (port 5173)

**Then automatically opens browser to:** http://localhost:5173

✅ Done! All services running!

---

### Option B: Start Manually (If Option A doesn't work)

**Terminal 1 - Start Chatbot:**
```bash
cd /Users/dhyey/Desktop/Portfolio
source .venv/bin/activate
python3 chatbot/app.py
```
Wait for: `Running on http://0.0.0.0:8000`

**Terminal 2 - Start Backend:**
```bash
cd /Users/dhyey/Desktop/Portfolio
cd server
npm run dev
```
Wait for: `✅ Server running on http://localhost:5001`

**Terminal 3 - Start Frontend:**
```bash
cd /Users/dhyey/Desktop/Portfolio
cd client
npx vite --host
```
Wait for: `Local: http://localhost:5173`

---

## ✅ VERIFY EVERYTHING WORKS

### 1️⃣ Check Backend

Open browser:
```
http://localhost:5001/api
```

**You should see:**
```json
{
  "message": "Welcome to the Portfolio API!",
  "status": "Running"
}
```

✅ Backend works!

### 2️⃣ Check Frontend

Open browser:
```
http://localhost:5173
```

**You should see:** Your portfolio homepage!

✅ Frontend works!

### 3️⃣ Check Chatbot

1. Open http://localhost:5173
2. Click **chatbot icon** (bottom-right corner)
3. Type: **"What services do you offer?"**
4. Wait for response...

**You should see:** Gemini AI response!

✅ Chatbot works!

---

## 📝 ADMIN PANEL (FOR TESTING)

**URL:** http://localhost:5173/admin

**Login Credentials:**
- Email: `admin@example.com`
- Password: `password123`

You can manage projects, settings, and content here!

---

## 🛑 STOP ALL SERVICES

**To stop all services:**

1. Close all 3 terminal windows, OR
2. In each terminal, press: `Ctrl + C`

---

## 🐛 TROUBLESHOOTING

### Frontend shows blank page?

1. Check browser console (F12 → Console tab)
2. Check if backend is running: http://localhost:5001/api
3. Refresh page (Cmd + R)

### Chatbot not responding?

1. Check chatbot terminal for errors
2. Check GEMINI_API_KEY is set in .env
3. Restart chatbot service

### "Port already in use" error?

**Find and kill process on port:**

```bash
# Find what's using port 5001
lsof -i :5001

# Kill it (replace PID with number from above)
kill -9 PID
```

Or use different ports (update .env)

### MongoDB connection fails?

The `.env` uses local MongoDB by default.

**Options:**

1. **Install MongoDB locally:**
   ```bash
   brew install mongodb-community
   brew services start mongodb-community
   ```

2. **OR use MongoDB Atlas (cloud):**
   - Update MONGO_URI in .env with your Atlas connection string
   - Already in .env? It uses local MongoDB at `127.0.0.1:27017`

---

## 📂 PROJECT STRUCTURE

```
Portfolio/
├── client/              (React/Vite frontend - port 5173)
│   ├── src/
│   ├── package.json
│   └── vite.config.js
├── server/              (Express backend - port 5001)
│   ├── src/server.js
│   ├── package.json
│   └── .env (reads from root)
├── chatbot/             (Flask chatbot - port 8000)
│   ├── app.py
│   ├── requirements.txt
│   └── .env (reads from root)
└── .env                 (Single env file for all 3)
```

---

## 🎯 COMMON TASKS

### Edit Portfolio Content?

1. Go to: http://localhost:5173/admin
2. Login with admin credentials
3. Add/edit projects, services, settings
4. Changes saved to MongoDB instantly

### Test API Endpoints?

Use Postman or curl:

```bash
# Get all projects
curl http://localhost:5001/api/projects

# Get settings
curl http://localhost:5001/api/settings

# Send chatbot message
curl -X POST http://localhost:5001/api/chatbot \
  -H "Content-Type: application/json" \
  -d '{"message": "What services do you offer?"}'
```

### View Logs?

**Backend logs:** Terminal 2 (npm run dev output)
**Chatbot logs:** Terminal 1 (python output)
**Frontend logs:** Browser console (F12)

---

## 🔄 MAKE CHANGES & RELOAD

### Frontend Changes (Vite)
- Edit React files
- **Auto-reloads** in browser instantly ✨

### Backend Changes
- Edit Express files
- **Auto-reloads** with `npm run dev` ✨

### Chatbot Changes
- Edit Python files
- **Restart** chatbot service (Ctrl+C, then run again)

---

## 🚀 NEXT STEPS

**When ready to deploy:**

1. Follow [DEPLOYMENT_STEP_BY_STEP.md](../DEPLOYMENT_STEP_BY_STEP.md)
2. Deploy backend to Render
3. Deploy chatbot to Render
4. Deploy frontend to Vercel
5. Add custom domain

---

## 📞 QUICK REFERENCE

| Task | Command |
|------|---------|
| Start all | `bash start-all.sh` |
| Start chatbot | `python3 chatbot/app.py` |
| Start backend | `cd server && npm run dev` |
| Start frontend | `cd client && npx vite --host` |
| Stop services | `Ctrl + C` in each terminal |
| View admin | http://localhost:5173/admin |
| View logs | Terminal output or F12 console |
| Kill port | `lsof -i :PORT && kill -9 PID` |

---

## ✨ YOU'RE ALL SET!

Everything is configured for local development on **localhost**.

**Start now:**
```bash
bash start-all.sh
```

Open: **http://localhost:5173**

Happy coding! 🎉

---

**Last Updated:** April 3, 2026
**Status:** Ready to Run Locally ✅
