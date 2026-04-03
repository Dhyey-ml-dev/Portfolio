#!/bin/bash

# 🚀 DS TECHVIBE Portfolio - Start All Services Locally

echo "╔════════════════════════════════════════════════════════╗"
echo "║  🚀 DS TECHVIBE PORTFOLIO - LOCAL STARTUP SCRIPT       ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""

PROJECT_DIR="/Users/dhyey/Desktop/Portfolio"
cd "$PROJECT_DIR"

echo "✅ Step 1: Checking .env file..."
if [ ! -f ".env" ]; then
    echo "⚠️  .env file not found! Copying from .env.example..."
    cp .env.example .env
    echo "✅ .env created!"
else
    echo "✅ .env exists!"
fi

echo ""
echo "═══════════════════════════════════════════════════════════"
echo "✅ Environment Setup Complete!"
echo "═══════════════════════════════════════════════════════════"
echo ""

echo "🚀 STARTING ALL SERVICES..."
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "SERVICES STARTING:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "1️⃣  CHATBOT (Flask) - http://localhost:8000"
echo "2️⃣  BACKEND (Express) - http://localhost:5001"
echo "3️⃣  FRONTEND (Vite) - http://localhost:5173"
echo ""

# Start Chatbot
echo "🤖 Starting Chatbot (Flask)..."
cd "$PROJECT_DIR"
source .venv/bin/activate
python3 chatbot/app.py > /tmp/chatbot.log 2>&1 &
CHATBOT_PID=$!
echo "   PID: $CHATBOT_PID"
sleep 3

# Start Backend
echo ""
echo "🔵 Starting Backend (Express)..."
cd "$PROJECT_DIR/server"
npm run dev > /tmp/backend.log 2>&1 &
BACKEND_PID=$!
echo "   PID: $BACKEND_PID"
sleep 5

# Start Frontend
echo ""
echo "🟢 Starting Frontend (Vite)..."
cd "$PROJECT_DIR/client"
npx vite --host 127.0.0.1 > /tmp/frontend.log 2>&1 &
FRONTEND_PID=$!
echo "   PID: $FRONTEND_PID"
sleep 3

echo ""
echo "═══════════════════════════════════════════════════════════"
echo "✅ ALL SERVICES STARTED!"
echo "═══════════════════════════════════════════════════════════"
echo ""
echo "📋 SERVICE URLS:"
echo "   🤖 Chatbot:  http://localhost:8000"
echo "   🔵 Backend:  http://localhost:5001/api"
echo "   🟢 Frontend: http://localhost:5173"
echo ""
echo "🌐 MAIN PAGES:"
echo "   Homepage:    http://localhost:5173"
echo "   Admin:       http://localhost:5173/admin"
echo "   Login Email: admin@example.com"
echo "   Login Pass:  password123"
echo ""
echo "📊 LOGS:"
echo "   Chatbot:  tail -f /tmp/chatbot.log"
echo "   Backend:  tail -f /tmp/backend.log"
echo "   Frontend: tail -f /tmp/frontend.log"
echo ""
echo "🛑 STOP SERVICES:"
echo "   kill $CHATBOT_PID  # Stop Chatbot"
echo "   kill $BACKEND_PID  # Stop Backend"
echo "   kill $FRONTEND_PID # Stop Frontend"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Open browser
sleep 3
echo ""
echo "🌍 Opening browser..."
open "http://localhost:5173"

echo ""
echo "✨ Ready! Press Ctrl+C to stop script (services will keep running)"
echo ""

# Keep script running to show PIDs
wait
