@echo off
echo ========================================
echo   Starting Todo App - Full Stack
echo ========================================
echo.

echo [1/3] Starting Backend Server...
start "Backend Server" cmd /k "cd backend && python -m uvicorn main:app --host 0.0.0.0 --port 8001 --reload"
timeout /t 3 /nobreak >nul

echo [2/3] Starting Frontend Server...
start "Frontend Server" cmd /k "cd frontend && npm run dev"
timeout /t 5 /nobreak >nul

echo [3/3] Opening Browser...
timeout /t 3 /nobreak >nul
start http://localhost:3000

echo.
echo ========================================
echo   Application Started Successfully!
echo ========================================
echo.
echo Backend:  http://localhost:8001
echo Frontend: http://localhost:3000
echo.
echo Press any key to exit this window...
pause >nul
