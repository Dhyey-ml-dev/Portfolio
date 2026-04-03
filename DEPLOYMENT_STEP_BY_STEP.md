# 🚀 DEPLOYMENT GUIDE - Step by Step

Complete guide to deploy your portfolio to production in 30 minutes.

---

## 📋 QUICK SUMMARY

| Service | Platform | Time | Cost |
|---------|----------|------|------|
| **Frontend** (React) | Vercel | 5 min | FREE |
| **Backend** (Node.js) | Render | 10 min | FREE |
| **Chatbot** (Python) | Render | 10 min | FREE |
| **Database** | MongoDB Atlas | 5 min | FREE |
| **Domain** (.dev/.me) | GitHub Student Pack | 5 min | FREE (1 year) |

**Total Cost:** $0 (if using student domain)

---

## ✅ BEFORE YOU START - CHECKLIST

- [ ] GitHub repo pushed: https://github.com/Dhyey-ml-dev/Portfolio
- [ ] MongoDB cluster created with username: `Portfolio_Dhyey`
- [ ] MongoDB connection string ready
- [ ] Gemini API key generated
- [ ] Google account for Vercel login

---

---

# STEP 1: Setup MongoDB (Database)

## 1.1 Get Your Connection String

**You already have this!** From your terminal:
```
mongodb+srv://Portfolio_Dhyey:DHYEY12345@cluster0.n3liqr6.mongodb.net/portfolio?retryWrites=true&w=majority
```

**Save this somewhere safe.** You'll need it in 5 minutes.

## 1.2 Whitelist Render IP (IMPORTANT!)

1. Go to: https://cloud.mongodb.com
2. Login with your MongoDB account
3. Find **"Network Access"** on left menu
4. Click **"Add IP Address"**
5. Enter: `0.0.0.0/0` (allow all - needed for Render)
6. Click **"Confirm"**

✅ MongoDB is ready!

---

---

# STEP 2: Deploy Backend to Render

## 2.1 Create Render Account

1. Open: https://render.com
2. Click **"Sign up with GitHub"**
3. Authorize and login
4. You're in! ✅

## 2.2 Create Backend Service

1. Click **"New +"** (top right)
2. Select **"Web Service"**
3. Select your repo: `Dhyey-ml-dev/Portfolio`
4. Click **"Connect"**

## 2.3 Fill Service Configuration

**Fill in these exact values:**

| Field | Value |
|-------|-------|
| **Name** | `portfolio-backend` |
| **Root Directory** | `server` |
| **Environment** | Select **"Node"** ← IMPORTANT |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Region** | Choose closest to you |
| **Plan** | Free |

## 2.4 Add Environment Variables

**Click "Add Environment Variable" for EACH one:**

### Variable 1:
```
KEY: BACKEND_PORT
VALUE: 5001
```
Click **"Add Environment Variable"**

### Variable 2:
```
KEY: NODE_ENV
VALUE: production
```
Click **"Add Environment Variable"**

### Variable 3:
```
KEY: MONGO_URI
VALUE: mongodb+srv://Portfolio_Dhyey:DHYEY12345@cluster0.n3liqr6.mongodb.net/portfolio?retryWrites=true&w=majority
```
Click **"Add Environment Variable"**

### Variable 4:
```
KEY: JWT_SECRET
VALUE: MySecureRandomKey123!@#$%^&*
```
(Or generate new: `openssl rand -base64 32` in terminal)
Click **"Add Environment Variable"**

### Variable 5:
```
KEY: ADMIN_EMAIL
VALUE: admin@example.com
```
Click **"Add Environment Variable"**

### Variable 6:
```
KEY: ADMIN_PASSWORD
VALUE: SecurePassword@123
```
Click **"Add Environment Variable"**

### Variable 7:
```
KEY: CHATBOT_URL
VALUE: https://portfolio-chatbot-xxxx.onrender.com/chat
```
(Leave as-is for now, update after deploying chatbot)

## 2.5 Deploy Backend

1. Scroll down
2. Click **"Create Web Service"**
3. **Wait 5-10 minutes** ⏳ (don't close this page)
4. You'll see deployment logs scrolling
5. When done, you'll see:
   ```
   ✓ Your service is live at: https://portfolio-backend-xxxx.onrender.com
   ```

**📌 Copy this URL!** You'll need it later.

Example: `https://portfolio-backend-abc123.onrender.com`

✅ **Backend deployed!**

---

---

# STEP 3: Deploy Chatbot to Render

## 3.1 Create Chatbot Service

1. In Render dashboard, click **"New +"**
2. Select **"Web Service"**
3. Select same repo: `Dhyey-ml-dev/Portfolio`
4. Click **"Connect"**

## 3.2 Fill Chatbot Configuration

| Field | Value |
|-------|-------|
| **Name** | `portfolio-chatbot` |
| **Root Directory** | `chatbot` |
| **Environment** | Select **"Python 3"** ← IMPORTANT |
| **Build Command** | `pip install -r requirements.txt` |
| **Start Command** | `gunicorn app:app --bind 0.0.0.0:$PORT` |
| **Region** | Same as backend |
| **Plan** | Free |

## 3.3 Add Environment Variables

**Click "Add Environment Variable" for EACH:**

### Variable 1:
```
KEY: CHATBOT_PORT
VALUE: 8000
```
Click **"Add Environment Variable"**

### Variable 2:
```
KEY: GEMINI_API_KEY
VALUE: AIzaSyC...your-actual-key...
```
Get from: https://makersuite.google.com/app/apikey
Click **"Add Environment Variable"**

### Variable 3:
```
KEY: DEBUG
VALUE: False
```

## 3.4 Deploy Chatbot

1. Scroll down
2. Click **"Create Web Service"**
3. **Wait 5-10 minutes** ⏳
4. When done, you'll see:
   ```
   ✓ Your service is live at: https://portfolio-chatbot-xxxx.onrender.com
   ```

**📌 Copy this URL!**

Example: `https://portfolio-chatbot-abc123.onrender.com`

✅ **Chatbot deployed!**

---

---

# STEP 4: Update Backend with Chatbot URL

## 4.1 Go Back to Backend Service

1. In Render dashboard
2. Click on `portfolio-backend` service
3. Go to **"Environment"** tab

## 4.2 Update CHATBOT_URL

1. Find variable: `CHATBOT_URL`
2. Click to edit
3. Change value from: `https://portfolio-chatbot-xxxx.onrender.com/chat`
4. To your actual URL: `https://portfolio-chatbot-abc123.onrender.com/chat`
5. Click **"Save"**

🔄 Backend will automatically redeploy (2-3 minutes)

✅ **Backend updated!**

---

---

# STEP 5: Deploy Frontend to Vercel

## 5.1 Create Vercel Account

1. Open: https://vercel.com
2. Click **"Sign up"**
3. Choose **"GitHub"**
4. Authorize and login

## 5.2 Import Project

1. Click **"New Project"**
2. Select repo: `Dhyey-ml-dev/Portfolio`
3. Click **"Import"**

## 5.3 Configure Frontend

**Vercel will auto-detect, but verify these settings:**

| Field | Value |
|-------|-------|
| **Framework** | Vite |
| **Root Directory** | `client` |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |

## 5.4 Add Environment Variable

1. Look for **"Environment Variables"** section
2. Click **"Add"**
3. Enter:
   ```
   KEY: VITE_API_URL
   VALUE: https://portfolio-backend-abc123.onrender.com/api
   ```
   (Use YOUR actual backend URL from Step 2)

## 5.5 Deploy Frontend

1. Scroll down
2. Click **"Deploy"**
3. **Wait 2-5 minutes** ⏳
4. When done, you'll see:
   ```
   ✓ Deployment complete! Your frontend is live at:
   https://portfolio-Dhyey-ml-dev.vercel.app
   ```

**📌 Copy this URL!**

✅ **Frontend deployed!**

---

---

# STEP 6: Test Everything

## 6.1 Test Backend

Open in browser:
```
https://portfolio-backend-abc123.onrender.com/api
```

**You should see:**
```json
{
  "message": "Welcome to the Portfolio API!",
  "status": "Running"
}
```

✅ Backend works!

## 6.2 Test Frontend

Open in browser:
```
https://portfolio-Dhyey-ml-dev.vercel.app
```

**You should see:** Your homepage loads!

✅ Frontend works!

## 6.3 Test Chatbot

1. Open frontend URL
2. Click **chatbot icon** (bottom-right)
3. Type: **"What services do you offer?"**
4. Wait for response...

**You should see:** Gemini AI response!

✅ Chatbot works!

## 6.4 If Anything Fails

**Check Render Logs:**
1. Go to Render dashboard
2. Click service name
3. Click **"Logs"** tab
4. Scroll and look for errors (RED text)

**Common Errors:**
- `MongoDB connection failed` → Check MONGO_URI and whitelist IP
- `GEMINI_API_KEY not set` → Add it to chatbot environment
- `Cannot find module` → Dependencies not installed correctly

---

---

# STEP 7: Add Custom Domain (Optional - but FREE!)

## 7.1 Get FREE Domain via GitHub Student Pack

1. Go to: https://github.com/settings/education
2. Check if you have **"Student"** badge
3. If yes, go to: https://education.github.com/pack
4. Find **"Namecheap"** → Click **"Get offer"**
5. You'll get coupon code for free `.me` or `.dev` domain

## 7.2 Register Domain on Namecheap

1. Go to: https://namecheap.com
2. Search for: `yourname.me` or `yourname.dev`
3. Add to cart
4. Apply Namecheap coupon from GitHub
5. Checkout (**should be FREE**)
6. Verify email and complete registration

**📌 Note your domain:** `yourname.dev`

## 7.3 Connect Domain to Vercel Frontend

1. Go to Vercel dashboard
2. Click your project
3. Go to **"Settings"** → **"Domains"**
4. Click **"Add Domain"**
5. Enter: `yourname.dev`
6. Click **"Add"**
7. Vercel shows DNS records
8. Copy these records
9. Go to Namecheap → Domain Settings → DNS Records
10. Add Vercel's records
11. **Wait 24 hours** for DNS to propagate

🎉 **Your domain is live!**

Open: `https://yourname.dev`

---

---

# 📊 FINAL CHECKLIST

- [ ] MongoDB cluster created and whitelisted
- [ ] Backend deployed to Render
- [ ] Chatbot deployed to Render
- [ ] Backend updated with chatbot URL
- [ ] Frontend deployed to Vercel
- [ ] Backend API health check works (returns JSON)
- [ ] Frontend loads successfully
- [ ] Chatbot responds to messages
- [ ] (Optional) Custom domain pointing to frontend

---

---

# 🆘 TROUBLESHOOTING

## Issue: "Cannot connect to MongoDB"

**Fix:**
1. Go to MongoDB Atlas
2. Check "Network Access" → Is `0.0.0.0/0` whitelisted?
3. Check MONGO_URI in Render environment
4. Restart Render service

## Issue: "Frontend can't reach backend"

**Fix:**
1. Check `VITE_API_URL` in Vercel environment
2. Make sure it matches your actual backend URL
3. Redeploy frontend (Vercel → Deployments → Redeploy)

## Issue: "Chatbot not responding"

**Fix:**
1. Check `GEMINI_API_KEY` is set in Render
2. Go to https://makersuite.google.com/app/apikey
3. Generate new key if needed
4. Update in Render environment
5. Restart chatbot service

## Issue: "Build failed on Render"

**Fix:**
1. Check Render logs for error message
2. Common causes:
   - Missing `package.json` or `requirements.txt`
   - Wrong root directory
   - Missing environment variables
3. Fix and commit to GitHub
4. Render will auto-rebuild

---

---

# 🎓 WHAT YOU LEARNED

✅ Deployed full-stack app (Frontend + Backend + Chatbot)
✅ Used MongoDB for database
✅ Integrated Gemini AI
✅ Connected all services together
✅ Set up custom domain
✅ Deployed to production

**Your portfolio is now LIVE!** 🎉

---

---

# 📞 SUPPORT

- Render Help: https://render.com/docs
- Vercel Help: https://vercel.com/docs
- MongoDB Help: https://docs.mongodb.com
- Still stuck? Check service logs first!

---

**Last Updated:** April 3, 2026
**Status:** Ready to Deploy ✅
