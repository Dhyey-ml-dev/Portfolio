#!/bin/bash
# Complete Portfolio Startup Script
echo "💻 Killing any old ghost processes so ports are free..."
killall -9 node python3 2>/dev/null
sleep 1

echo "🎨 Launching Frontend in new window..."
open /Users/dhyey/Desktop/Portfolio/start-frontend.command

echo "⚙️  Launching Backend in new window..."
open /Users/dhyey/Desktop/Portfolio/start-backend.command

echo "🤖 Launching Chatbot in new window..."
open /Users/dhyey/Desktop/Portfolio/start-chatbot.command

echo "✅ All servers starting..."
echo "Opening browser in 5 seconds..."
sleep 5
open "http://127.0.0.1:5173"
