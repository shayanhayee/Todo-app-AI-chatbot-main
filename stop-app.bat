@echo off
echo ========================================
echo   Stopping Todo App Servers
echo ========================================
echo.

echo Stopping Backend Server (Port 8001)...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :8001 ^| findstr LISTENING') do (
    taskkill /F /PID %%a >nul 2>&1
)

echo Stopping Frontend Server (Port 3000)...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000 ^| findstr LISTENING') do (
    taskkill /F /PID %%a >nul 2>&1
)

echo.
echo ========================================
echo   All Servers Stopped Successfully!
echo ========================================
echo.
pause
