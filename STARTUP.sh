#!/bin/bash

# Portfolio Startup Script
# Runs both backend and frontend servers

set -e

echo "🚀 Starting Dhyey Pavagadhi Portfolio..."
echo ""

# Check if Node is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if MongoDB is running
echo "🔍 Checking MongoDB..."
if ! command -v mongod &> /dev/null; then
    echo "⚠️  MongoDB CLI not found. Make sure MongoDB is running on localhost:27017"
else
    echo "✅ MongoDB found"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "STARTUP INSTRUCTIONS"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📌 TERMINAL 1 - Start Backend:"
echo "   cd server"
echo "   npm install (if not done yet)"
echo "   npm run dev"
echo ""
echo "📌 TERMINAL 2 - Start Frontend:"
echo "   cd client"
echo "   npm install (if not done yet)"
echo "   npm run dev"
echo ""
echo "📌 Access the portfolio:"
echo "   🏠 Landing: http://localhost:5173"
echo "   🏠 Portfolio: http://localhost:5173/home"
echo "   🔐 Admin Login: http://localhost:5173/login"
echo "   ⚙️  Admin Dashboard: http://localhost:5173/admin"
echo ""
echo "📌 Default Admin Credentials:"
echo "   Email: admin@example.com"
echo "   Password: password123"
echo ""
echo "🌐 Backend API: http://localhost:5000"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
