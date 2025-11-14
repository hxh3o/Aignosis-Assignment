@echo off
echo ========================================
echo Backend Setup Script
echo ========================================
echo.

cd backend

echo [1/5] Creating virtual environment...
python -m venv venv
if %errorlevel% neq 0 (
    echo ERROR: Failed to create virtual environment
    echo Please ensure Python 3.8+ is installed
    pause
    exit /b 1
)
echo SUCCESS: Virtual environment created
echo.

echo [2/5] Activating virtual environment...
call venv\Scripts\activate.bat
echo.

echo [3/5] Installing Python dependencies...
pip install -r requirements.txt
if %errorlevel% neq 0 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)
echo SUCCESS: Dependencies installed
echo.

echo [4/5] Generating RSA key pair...
python generate_test_key.py
if %errorlevel% neq 0 (
    echo WARNING: Key generation had issues (may be okay)
)
echo.

echo [5/5] Setting up test files...
python setup_test_files.py
echo.

echo ========================================
echo Backend Setup Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Start backend: start-backend.bat
echo 2. Setup frontend: setup-frontend.bat
echo.
pause

