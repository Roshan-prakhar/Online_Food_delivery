@echo off
REM ========================================
REM Start Foodies API Backend
REM ========================================
REM This script starts the Spring Boot API server

echo.
echo Starting Foodies API Backend...
echo.

cd foodiesapi

REM Check if mvn exists
where mvn >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Maven is not installed or not in PATH
    echo Please install Maven from https://maven.apache.org/
    pause
    exit /b 1
)

REM Start the backend
echo Running: mvn spring-boot:run
mvn spring-boot:run

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERROR: Failed to start the backend
    echo Check the output above for details
    pause
    exit /b 1
)
