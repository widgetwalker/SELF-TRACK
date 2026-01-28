@echo off
cls
echo ========================================
echo Starting Self-Track Application
echo ========================================
echo.

REM Start Backend Server in minimized/background window
echo [1/2] Starting Backend Server on port 5000 (background)...
start "Self-Track Backend" /min cmd /k "cd backend && npm start"

REM Wait for backend to fully start
timeout /t 5 /nobreak >nul

REM Start React Frontend in current window (visible)
echo [2/2] Starting React Frontend on port 3000 (visible)...
echo.
echo ========================================
echo Backend is running in background
echo Access Frontend at: http://localhost:3000
echo Backend API: http://localhost:5000
echo ========================================
echo.

cd frontend
npm start
