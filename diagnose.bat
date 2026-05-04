@echo off
echo 🔍 DIAGNOSING SITE ISSUES
echo.

REM Check Node.js
echo Checking Node.js...
node --version
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Check npm
echo Checking npm...
npm --version

REM Clean install
echo 🧹 Cleaning and installing...
if exist "node_modules" rmdir /s /q "node_modules"
if exist "package-lock.json" del "package-lock.json"
if exist ".next" rmdir /s /q ".next"
if exist "out" rmdir /s /q "out"

npm install

REM Check for TypeScript errors
echo 🔍 Checking TypeScript...
npx tsc --noEmit

REM Try development server
echo 🚀 Starting development server...
echo If this works, open http://localhost:3000
echo Press Ctrl+C to stop the server
echo.
npm run dev

pause
