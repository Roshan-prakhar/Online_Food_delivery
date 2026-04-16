@echo off
REM ========================================
REM Start Admin Panel
REM ========================================
REM This script starts the admin React frontend on port 5174

echo.
echo Starting Admin Panel...
echo.

cd adminpanel

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

REM Start the admin panel on port 5174
echo Running: npm run dev -- --port 5174
echo Admin Panel will be available at http://localhost:5174
call npm run dev -- --port 5174

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERROR: Failed to start the admin panel
    echo Check the output above for details
    pause
    exit /b 1
)
