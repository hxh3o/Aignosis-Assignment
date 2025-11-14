@echo off
echo ========================================
echo Frontend Setup Script
echo ========================================
echo.

cd frontend

echo Installing Node.js dependencies...
echo This may take a few minutes...
echo.

npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install dependencies
    echo Please ensure Node.js 18+ and npm are installed
    pause
    exit /b 1
)

echo.
echo ========================================
echo Frontend Setup Complete!
echo ========================================
echo.
echo Next step:
echo Start frontend: start-frontend.bat
echo.
pause

