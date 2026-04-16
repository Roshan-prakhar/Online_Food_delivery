@echo off
REM ========================================
REM Start Foodies Frontend
REM ========================================
REM This script starts the main React frontend

echo.
echo Starting Foodies Frontend...
echo.

cd foodies

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo.
        echo ERROR: Failed to install dependencies
        pause
        exit /b 1
    )
)

REM Start the frontend
echo Running: npm run dev
echo Frontend will be available at http://localhost:5173
call npm run dev

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERROR: Failed to start the frontend
    echo Check the output above for details
    pause
    exit /b 1
)
