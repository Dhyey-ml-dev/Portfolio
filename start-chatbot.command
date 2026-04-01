#!/bin/bash
echo -e "\033[1;32mStarting Python Chatbot...\033[0m"
cd /Users/dhyey/Desktop/Portfolio/chatbot
source ../.venv/bin/activate 2>/dev/null || true
python3 app.py
