# 🚀 QUICK REFERENCE CARD

## ✅ ALL SERVICES RUNNING

**3 Terminal Windows Active:**
```
Terminal 1 (Chatbot):  python3 /Users/dhyey/Desktop/Portfolio/chatbot/app.py
Terminal 2 (Backend):  cd /Users/dhyey/Desktop/Portfolio/server && npm run dev
Terminal 3 (Frontend): cd /Users/dhyey/Desktop/Portfolio/client && npm run dev
```

---

## 🌐 URLS

| Service | URL | Alternative |
|---------|-----|-------------|
| **Frontend** | http://localhost:5173 | http://127.0.0.1:5173 |
| **Backend API** | http://localhost:5001/api | http://127.0.0.1:5001/api |
| **Chatbot** | http://localhost:8000 | http://127.0.0.1:8000 |
| **Admin Panel** | http://localhost:5173/admin | N/A |

---

## 🔐 ADMIN LOGIN

```
Email:    admin@example.com
Password: password123
```

---

## 🔌 COMMON API CALLS

### Get Settings
```bash
curl http://localhost:5001/api/settings | jq
```

### Get Projects
```bash
curl http://localhost:5001/api/projects | jq
```

### Chat with Bot
```bash
curl -X POST http://localhost:8000/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"What are your skills?"}'
```

### Test Contact Form
```bash
curl -X POST http://localhost:5001/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@test.com","message":"Hi!"}'
```

---

## 📁 KEY FILES

```
/Users/dhyey/Desktop/Portfolio/
├── client/src/App.jsx              # Frontend routes
├── server/src/server.js            # Backend setup
├── chatbot/app.py                  # Chatbot logic
├── server/.env                     # Backend config
├── README.md                        # Full documentation
└── start-all.sh                    # Startup script
```

---

## 🔧 QUICK FIXES

**Ports already in use?**
```bash
killall -9 node python3
```

**Need to restart one service?**
```bash
# Terminal 1: Ctrl+C, then run again
# Terminal 2: Ctrl+C, then run again
# Terminal 3: Ctrl+C, then run again
```

**Clear cache?**
- Browser: Cmd+Shift+R (hard refresh)

**Check logs?**
- Terminal windows show live logs from each service

---

## ✨ FEATURES

- ✅ Responsive dark theme
- ✅ Hero section with CTA
- ✅ Projects portfolio
- ✅ Services listing
- ✅ Contact form
- ✅ Floating AI chatbot
- ✅ Admin CMS dashboard
- ✅ JWT authentication
- ✅ File upload (logo, audio)
- ✅ Mock data (no database needed)

---

## 🎯 NEXT STEPS

1. Open http://localhost:5173 in browser
2. Test all navigation links
3. Try the chatbot widget
4. Login to admin panel
5. Add/edit projects and settings
6. Submit contact form

---

## 📞 EVERYTHING IS WORKING!

No errors. No white screens. No port conflicts.
**Your portfolio is production-ready on localhost.** ✨
