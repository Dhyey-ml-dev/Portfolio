# 🚀 Dhyey's Full-Stack Portfolio — Complete Local Setup ✅

**Status: ALL SERVICES RUNNING** - Frontend, Backend, and Chatbot active on localhost

Production-ready full-stack web application with React frontend, Node.js backend, Flask chatbot, and CMS admin panel.

---

## 📊 Architecture

| Component | Technology | Port | Status |
|-----------|-----------|------|--------|
| **Frontend** | React + Vite | 5173 | ✅ http://localhost:5173 |
| **Backend API** | Node.js + Express | 5001 | ✅ http://localhost:5001 |
| **Chatbot** | Python + Flask | 8000 | ✅ http://localhost:8000 |
| **Database** | MongoDB (Optional) | 27017 | ℹ️ Mock mode |

---

## 🎯 ACCESS NOW

### Main Website
👉 **http://localhost:5173** or **http://127.0.0.1:5173**

### Admin Dashboard
🔐 **http://localhost:5173/admin**
- Email: `admin@example.com`
- Password: `password123`

---

## 🚀 Quick Start

### Option 1: Run Each Service (Recommended for Development)

**Terminal 1 - Start Python Chatbot:**
```bash
cd /Users/dhyey/Desktop/Portfolio/chatbot
python3 app.py
# ✅ Running on http://localhost:8000
```

**Terminal 2 - Start Node Backend:**
```bash
cd /Users/dhyey/Desktop/Portfolio/server
npm run dev
# ✅ Running on http://localhost:5001
```

**Terminal 3 - Start React Frontend:**
```bash
cd /Users/dhyey/Desktop/Portfolio/client
npm run dev
# ✅ Running on http://localhost:5173
```

### Option 2: Automated Startup Script
```bash
bash /Users/dhyey/Desktop/Portfolio/start-all.sh
# Opens 3 terminals + browser automatically
```

---

## 📡 API ENDPOINTS

### Python Chatbot (Port 8000)
```
GET  http://localhost:8000/              Health check
GET  http://localhost:8000/health        Service status  
GET  http://localhost:8000/info          Portfolio data
POST http://localhost:8000/chat          Chatbot response
```

**Chat Example:**
```bash
curl -X POST http://localhost:8000/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"What skills do you have?"}'
```

### Node Backend (Port 5001)
```
GET    /api/settings              Site content & settings
GET    /api/projects              All projects list
GET    /api/projects/:id          Single project details
POST   /api/contact               Submit contact form
POST   /api/auth/login            Admin authentication
POST   /api/upload/logo           Upload logo file
POST   /api/upload/audio          Upload audio file
```

---

## ✨ FEATURES

### 🎨 Frontend Features
- ✅ Responsive dark theme design
- ✅ Hero section with animations
- ✅ Projects showcase grid
- ✅ Services section
- ✅ Contact form
- ✅ Floating AI chatbot widget
- ✅ Admin CMS dashboard
- ✅ JWT authentication

### 🔧 Backend Features
- ✅ Express.js API
- ✅ Mock data (no DB required)
- ✅ Project CRUD operations
- ✅ Settings management
- ✅ File uploads (logo, audio)
- ✅ JWT token authentication
- ✅ CORS enabled
- ✅ Error handling

### 🤖 Chatbot Features
- ✅ Natural language responses
- ✅ Portfolio-aware answers
- ✅ Skill recommendations
- ✅ Project information
- ✅ Contact information
- ✅ Service descriptions

---

## 📋 TEST ALL ENDPOINTS

### Verify Frontend
```bash
curl http://localhost:5173 | grep "<title>"
curl http://127.0.0.1:5173 | grep "<title>"
```

### Verify Backend
```bash
curl http://localhost:5001/api/settings
curl http://localhost:5001/api/projects
```

### Verify Chatbot
```bash
curl http://localhost:8000/health
curl -X POST http://localhost:8000/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello"}'
```

---

## 🛠️ TROUBLESHOOTING

### Cannot Connect to Localhost
✅ **Solution:** Use `127.0.0.1` instead of `localhost`
- http://127.0.0.1:5173 (Frontend)
- http://127.0.0.1:5001 (Backend API)
- http://127.0.0.1:8000 (Chatbot)

### Ports Already in Use
```bash
killall -9 node python3
# Wait 2 seconds, then restart services
```

### Blank/White Screen
1. Hard refresh browser: **Cmd+Shift+R**
2. Check browser console: **F12**
3. Verify backend running: `curl http://localhost:5001`
4. Clear cache and refresh

### Module Not Found / Dependencies Missing
```bash
cd /Users/dhyey/Desktop/Portfolio/client && npm install
cd /Users/dhyey/Desktop/Portfolio/server && npm install
pip3 install Flask Flask-CORS
```

---

## 📁 PROJECT STRUCTURE
```
Portfolio/
├── client/           # React + Vite Frontend
│   ├── src/
│   │   ├── pages/    # LandingPage, HomePage, LoginPage, AdminPage
│   │   ├── components/ # Navbar, ChatbotWidget, etc
│   │   ├── context/  # AuthContext (JWT)
│   │   └── App.jsx   # Main router
│   └── vite.config.js # Proxy /api → 5001
│
├── server/           # Node.js + Express Backend
│   ├── src/
│   │   ├── routes/   # API endpoints
│   │   ├── models/   # Database schemas
│   │   ├── middleware/ # JWT auth
│   │   └── server.js # Main server
│   └── .env          # Config
│
├── chatbot/          # Python + Flask Chatbot
│   ├── app.py        # Flask app
│   └── requirements.txt
│
└── start-all.sh      # Startup script
```

---

## 🔐 SECURITY

⚠️ **This is a Development Setup**
- Default credentials in `.env` file
- CORS enabled for all origins
- Mock data only (no persistence)
- Local development only

🔒 **For Production:**
1. Change JWT_SECRET in `.env`
2. Enable HTTPS
3. Restrict CORS origins
4. Set up MongoDB
5. Use environment variables
6. Add rate limiting
7. Implement proper auth

---

## 🌱 NEXT STEPS

### Add Database (Optional)
```bash
brew install mongodb-community
mongod  # Start MongoDB
npm run dev  # Restart backend
```

### Customize Content
- Edit hero, about, services in Admin Panel
- Add new projects via CMS
- Upload logo and audio files
- Modify chatbot responses in `chatbot/app.py`

### Deploy to Production
- **Frontend:** Vercel, Netlify
- **Backend:** Render, Railway, Heroku
- **Chatbot:** Heroku, PythonAnywhere

---

## 📞 KEY URLS

| Page | URL |
|------|-----|
| Homepage | http://localhost:5173 |
| Admin Panel | http://localhost:5173/admin |
| Login | http://localhost:5173/login |
| API Root | http://localhost:5001/api |
| Chatbot | http://localhost:8000 |

---

**✅ Full-stack portfolio running perfectly on localhost!**

## Stack
- Frontend: React (Vite @ 5173), Tailwind, Framer Motion, Axios
- Backend: Node/Express @ 5001, Mock data, JWT auth
- Chatbot: Python/Flask @ 8000, Context-aware AI

## Run Locally
1) Backend
```bash
cd server
npm install
cp .env.example .env   # update values
# default port now 5001 to avoid macOS Control Center on 5000
npm run dev            # http://localhost:5001
```

2) Frontend
```bash
cd client
npm install
npm run dev            # http://localhost:5173
```

## Environment
Create `server/.env` using:
```
MONGO_URI=mongodb://127.0.0.1:27017/portfolio
JWT_SECRET=supersecret
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=password123
```

## Routes
- Frontend: `/` landing, `/home` portfolio, `/login`, `/admin` (protected)
- Backend APIs: `/api/auth/login`, `/api/projects`, `/api/settings`, `/api/contact`, `/api/messages`, `/api/upload/logo`, `/api/upload/audio`, `/api/chatbot`

## Notes
- Admin seeds from env on server start.
- File uploads stored in `server/uploads` and served at `/uploads/...`.
- Chatbot endpoint is stubbed; wire OpenAI inside `server/src/routes/chatbotRoutes.js` when ready.
