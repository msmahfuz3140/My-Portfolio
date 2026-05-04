@echo off
echo ⚡ QUICK FIX FOR SITE ISSUES
echo.

REM Common fixes
echo 🛠️ Applying common fixes...

REM Fix 1: Clear cache
echo Clearing cache...
npm cache clean --force

REM Fix 2: Delete problematic folders
echo Cleaning problematic folders...
if exist ".next" rmdir /s /q ".next"
if exist "out" rmdir /s /q "out"

REM Fix 3: Fresh install
echo Installing dependencies...
npm install --force

REM Fix 4: Update Next.js if needed
echo Checking Next.js...
npm list next

REM Fix 5: Try simple dev server
echo 🚀 Starting dev server...
echo.
echo If you see errors above, please copy them and show me.
echo Otherwise, open http://localhost:3000 in your browser.
echo.
echo Press Ctrl+C to stop the server when done.
echo.
npm run dev

pause
