@echo off
echo ========================================
echo Starting Self-Track Application
echo ========================================
echo.

REM Start ML Service in background
echo [1/2] Starting ML Service on port 8000...
start "Self-Track ML Service" cmd /k "cd backend\ml-service && py -m uvicorn app:app --reload --port 8000"

REM Wait for ML service to start
timeout /t 3 /nobreak >nul

REM Start Backend (which serves frontend)
echo [2/2] Starting Backend Server on port 3000...
start "Self-Track Application" cmd /k "cd backend && npm run dev"

REM Wait a moment
timeout /t 2 /nobreak >nul

echo.
echo ========================================
echo   Self-Track is starting...
echo ========================================
echo.
echo   Access the application at:
echo   http://localhost:3000
echo.
echo   Available Pages:
echo   - Homepage:  http://localhost:3000/1-homepage/index.html
echo   - Login:     http://localhost:3000/2-login/login.html
echo   - Dashboard: http://localhost:3000/3-dashboard/dashboard.html
echo.
echo   Press Ctrl+C in each window to stop services
echo ========================================
echo.
