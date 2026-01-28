@echo off
REM ====================================================
REM Self-Track Application Startup Script (Windows)
REM ====================================================
REM This script starts all services with backend in background
REM and frontend visible for development/testing
REM ====================================================

cls
setlocal enabledelayedexpansion

echo.
echo ====================================================
echo    Self-Track Application Startup
echo ====================================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if errorlevel 1 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo [✓] Node.js found
echo.

REM Start Backend Server in minimized window (background)
echo [1/2] Starting Backend Server...
echo     Port: 5000
echo     Status: Background (minimized window)
echo.

start "SelfTrack-Backend" /min cmd /k "title Self-Track Backend Server && cd backend && npm start"

REM Wait for backend to initialize
echo Waiting for backend to start...
timeout /t 6 /nobreak >nul
echo [✓] Backend started

echo.
echo [2/2] Starting Frontend...
echo     Port: 3000
echo     Status: Visible (current window)
echo.

REM Navigate to frontend and start it (this will stay in current window)
cd frontend

REM Check if node_modules exists, if not run npm install
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
    if errorlevel 1 (
        echo ERROR: Failed to install dependencies
        pause
        exit /b 1
    )
)

echo.
echo ====================================================
echo    🚀 Self-Track is Running!
echo ====================================================
echo.
echo   Frontend: http://localhost:3000
echo   Backend:  http://localhost:5000
echo.
echo   Test Credentials:
echo   - Employee: demo@selftrack.com / demo123
echo   - Admin:    admin@selftrack.com / admin123
echo.
echo   To stop:
echo   1. Close this window to stop Frontend
echo   2. Manually close the Backend window
echo      OR use Task Manager to stop the backend
echo.
echo ====================================================
echo.

REM Start frontend (this keeps running)
call npm start
