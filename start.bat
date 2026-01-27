@echo off
echo ========================================
echo Starting Self-Track Application
echo ========================================
echo.

REM Start ML Service in background
echo [1/3] Starting ML Service on port 8000...
start "Self-Track ML Service" cmd /k "cd backend\ml-service && py -m uvicorn app:app --reload --port 8000"

REM Wait for ML service to start
timeout /t 3 /nobreak >nul

REM Start Backend (which serves frontend)
echo [2/3] Starting Backend Server on port 5000...
start "Self-Track Application" cmd /k "cd backend && npm run dev"

REM Wait a moment
timeout /t 2 /nobreak >nul

REM Start React Frontend
echo [3/3] Starting React Frontend on port 3000...
start "Self-Track Frontend" cmd /k "cd frontend && npm start"

echo.
echo ========================================
echo   Self-Track is starting...
echo ========================================
echo.
echo   Access the application at:
echo   Frontend: http://localhost:3000
echo   Backend:  http://localhost:5000
echo.
echo   Available Pages:
echo   - Homepage:  http://localhost:3000/
echo   - Login:     http://localhost:3000/login
echo   - Dashboard: http://localhost:3000/dashboard
echo.
echo   Press Ctrl+C in each window to stop services
echo ========================================
echo.
