#!/bin/bash
# Python Chatbot Startup Script

cd /Users/dhyey/Desktop/Portfolio/chatbot

# Install dependencies if not already installed
if ! python3 -c "import flask" 2>/dev/null; then
    echo "📦 Installing Python dependencies..."
    pip3 install -q -r requirements.txt
fi

echo "🤖 Starting Chatbot Backend on port 8000..."
python3 app.py
