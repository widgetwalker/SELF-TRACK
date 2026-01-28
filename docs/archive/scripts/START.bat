@echo off
cls
title Self-Track Startup
echo Starting Self-Track...
start "Self-Track Backend" /min cmd /c "cd backend && npm start"
timeout /t 6 /nobreak >nul
cd frontend && npm start
