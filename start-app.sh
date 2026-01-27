#!/bin/bash

echo "╔════════════════════════════════════════════════════════════════════════════╗"
echo "║              Starting Self-Track Application (Full Stack)                  ║"
echo "╚════════════════════════════════════════════════════════════════════════════╝"

# Start backend in background
echo ""
echo "🚀 Starting Backend Server..."
cd backend
npm install --silent 2>/dev/null || true
npm start &
BACKEND_PID=$!
echo "   Backend PID: $BACKEND_PID"

# Wait for backend to start
sleep 5

# Start frontend in background
echo ""
echo "🎨 Starting Frontend Server..."
cd ../frontend
npm start &
FRONTEND_PID=$!
echo "   Frontend PID: $FRONTEND_PID"

echo ""
echo "════════════════════════════════════════════════════════════════════════════"
echo ""
echo "✅ SERVERS STARTED"
echo ""
echo "📱 Frontend: http://localhost:3000"
echo "🔧 Backend API: http://localhost:5000/api"
echo ""
echo "Demo Login:"
echo "  Email: admin@example.com"
echo "  Password: demo"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""
echo "════════════════════════════════════════════════════════════════════════════"

# Keep script running
wait
