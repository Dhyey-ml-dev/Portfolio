#!/bin/bash

# Portfolio Setup Validator
# Checks all requirements before running

echo "🔍 Portfolio Setup Validator"
echo "════════════════════════════════════════"
echo ""

# Check Node
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    echo "✅ Node.js installed: $NODE_VERSION"
else
    echo "❌ Node.js NOT found. Install from https://nodejs.org"
    exit 1
fi

# Check npm
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    echo "✅ npm installed: $NPM_VERSION"
else
    echo "❌ npm NOT found"
    exit 1
fi

# Check MongoDB
echo ""
echo "Checking MongoDB..."
if command -v mongod &> /dev/null; then
    echo "✅ mongod found in system"
    echo "   ⚠️  Start MongoDB with: mongod"
else
    echo "⚠️  mongod not found locally"
    echo "   Options:"
    echo "   1. Install MongoDB: brew install mongodb-community"
    echo "   2. Use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas"
fi

# Check server files
echo ""
echo "Checking file structure..."

if [ -f "server/package.json" ]; then
    echo "✅ server/package.json exists"
else
    echo "❌ server/package.json missing"
fi

if [ -f "server/src/server.js" ]; then
    echo "✅ server/src/server.js exists"
else
    echo "❌ server/src/server.js missing"
fi

if [ -f "client/package.json" ]; then
    echo "✅ client/package.json exists"
else
    echo "❌ client/package.json missing"
fi

if [ -f "client/src/App.jsx" ]; then
    echo "✅ client/src/App.jsx exists"
else
    echo "❌ client/src/App.jsx missing"
fi

# Check ports
echo ""
echo "Checking ports..."

if lsof -n -i4TCP:5000 &> /dev/null; then
    echo "⚠️  Port 5000 is in use (backend will use this)"
else
    echo "✅ Port 5000 is available"
fi

if lsof -n -i4TCP:5173 &> /dev/null; then
    echo "⚠️  Port 5173 is in use (frontend will use this)"
else
    echo "✅ Port 5173 is available"
fi

# Check dependencies
echo ""
echo "Checking dependencies..."

if [ -d "server/node_modules" ]; then
    echo "✅ Backend dependencies installed"
else
    echo "⚠️  Backend dependencies not installed"
    echo "   Run: cd server && npm install"
fi

if [ -d "client/node_modules" ]; then
    echo "✅ Frontend dependencies installed"
else
    echo "⚠️  Frontend dependencies not installed"
    echo "   Run: cd client && npm install"
fi

# Check .env
echo ""
echo "Checking environment..."

if [ -f "server/.env" ]; then
    echo "✅ server/.env exists"
else
    echo "⚠️  server/.env missing"
    echo "   Creating from .env.example..."
    if [ -f "server/.env.example" ]; then
        cp server/.env.example server/.env
        echo "   ✅ Created server/.env"
    fi
fi

echo ""
echo "════════════════════════════════════════"
echo "🚀 READY TO START!"
echo ""
echo "Terminal 1 - Backend:"
echo "  $ cd server && npm run dev"
echo ""
echo "Terminal 2 - Frontend:"
echo "  $ cd client && npm run dev"
echo ""
echo "Then visit: http://localhost:5173"
echo "════════════════════════════════════════"
