@echo off
echo 🔧 FIXING 500 INTERNAL SERVER ERROR
echo.

REM Common causes of 500 errors in Next.js

echo 🧹 Step 1: Complete cleanup
if exist ".next" rmdir /s /q ".next"
if exist "out" rmdir /s /q "out"
if exist "node_modules" rmdir /s /q "node_modules"
if exist "package-lock.json" del "package-lock.json"

echo 📦 Step 2: Fresh install
npm install --force

echo 🔍 Step 3: Check for syntax errors
echo Checking TypeScript...
npx tsc --noEmit --noImplicitAny false --skipLibCheck true

echo 🏗️ Step 4: Build check
echo Testing build...
npm run build

if %ERRORLEVEL% NEQ 0 (
    echo ❌ Build failed - this is causing the 500 error
    echo Check the build errors above
    pause
    exit /b 1
)

echo ✅ Build successful!

echo 🚀 Step 5: Start dev server with detailed logging
echo.
echo Starting server with error details...
echo.
set NODE_OPTIONS=--inspect
npm run dev

pause
