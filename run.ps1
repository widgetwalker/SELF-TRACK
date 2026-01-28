# Self-Track Startup Script (PowerShell)
# Run with: powershell -ExecutionPolicy Bypass -File run.ps1

Clear-Host
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Self-Track Application Startup" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check Node.js
Write-Host "[1/3] Checking Node.js..." -ForegroundColor Yellow
$node = Get-Command node -ErrorAction SilentlyContinue
if (-not $node) {
    Write-Host "ERROR: Node.js not found!" -ForegroundColor Red
    Write-Host "Please install from https://nodejs.org/" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}
Write-Host "[✓] Node.js found" -ForegroundColor Green

# Start Backend
Write-Host ""
Write-Host "[2/3] Starting Backend Server (port 5000)..." -ForegroundColor Yellow
$backendProcess = Start-Process -FilePath "cmd.exe" `
    -ArgumentList "/c cd backend && npm start" `
    -WindowStyle Minimized `
    -PassThru

Write-Host "[✓] Backend started (PID: $($backendProcess.Id))" -ForegroundColor Green

# Wait for backend
Write-Host "Waiting for backend to initialize..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

# Start Frontend
Write-Host ""
Write-Host "[3/3] Starting Frontend (port 3000)..." -ForegroundColor Yellow
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Self-Track is Running!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "  Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host "  Backend:  http://localhost:5000" -ForegroundColor Cyan
Write-Host ""
Write-Host "  Test Credentials:" -ForegroundColor Yellow
Write-Host "  - Employee: demo@selftrack.com / demo123" -ForegroundColor White
Write-Host "  - Admin:    admin@selftrack.com / admin123" -ForegroundColor White
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Start Frontend (stays in current window)
Set-Location frontend
npm start
