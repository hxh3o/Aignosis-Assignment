@echo off
echo ========================================
echo Starting Video Streaming Backend
echo ========================================
echo.

cd backend

echo Activating virtual environment...
call venv\Scripts\activate.bat

echo.
echo Starting FastAPI server on port 8000...
echo.
echo Backend will be available at: http://localhost:8000
echo API Documentation: http://localhost:8000/docs
echo.
echo Press Ctrl+C to stop the server
echo.

uvicorn main:app --reload --port 8000

