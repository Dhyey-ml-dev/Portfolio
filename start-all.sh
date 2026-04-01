#!/bin/bash
# Complete Portfolio Startup Script
# Starts all 3 services: Python Chatbot (8000), Node Backend (5001), React Frontend (5173)

echo "🚀 Starting Complete Full-Stack Portfolio Setup"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Kill any existing processes
echo "🔄 Cleaning up old processes..."
killall -9 node python3 2>/dev/null

sleep 1

# Terminal 1: Python Chatbot
echo ""
echo "🤖 Terminal 1: Starting Python Chatbot (port 8000)..."
open -a Terminal <<EOF
cd /Users/dhyey/Desktop/Portfolio/chatbot
source ../.venv/bin/activate 2>/dev/null || true
python3 app.py
EOF

sleep 2

# Terminal 2: Node Backend
echo "🔵 Terminal 2: Starting Node Backend (port 5001)..."
open -a Terminal <<EOF
cd /Users/dhyey/Desktop/Portfolio/server
npm run dev
EOF

sleep 2

# Terminal 3: React Frontend
echo "🟢 Terminal 3: Starting React Frontend (port 5173)..."
open -a Terminal <<EOF
cd /Users/dhyey/Desktop/Portfolio/client
npx vite --host
EOF

sleep 3

echo ""
echo "✅ All services started!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📋 SERVICE URLS:"
echo "  🤖 Chatbot:  http://localhost:8000"
echo "  🔵 Backend:  http://localhost:5001"
echo "  🟢 Frontend: http://localhost:5173"
echo ""
echo "🌐 MAIN PAGES:"
echo "  Homepage:    http://localhost:5173"
echo "  Login:       http://localhost:5173/login"
echo "  Admin Panel: http://localhost:5173/admin"
echo "             (Email: admin@example.com, Password: password123)"
echo ""
echo "Opening browser..."
sleep 1
open "http://localhost:5173"
