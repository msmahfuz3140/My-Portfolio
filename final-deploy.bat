@echo off
echo 🔍 FINAL DEPLOYMENT CHECK
echo.

REM Clean previous build
if exist "out" rmdir /s /q "out"
if exist ".next" rmdir /s /q ".next"

REM Install dependencies fresh
echo 📦 Installing dependencies...
npm install --force

REM Type check
echo 🔍 Running type check...
npm run type-check

REM Build
echo 🏗️ Building project...
npm run build

if %ERRORLEVEL% NEQ 0 (
    echo ❌ BUILD FAILED!
    echo Check the error messages above.
    pause
    exit /b 1
)

echo ✅ BUILD SUCCESSFUL!

REM Deploy to Vercel
echo 🌐 Deploying to Vercel...
vercel --prod

echo ✅ DEPLOYMENT COMPLETE!
echo Your portfolio is now live!
pause
