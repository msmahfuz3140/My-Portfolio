@echo off
echo 🚀 FAST DEPLOY TO VERCEL
echo.

REM Install Vercel CLI if not exists
npm i -g vercel

REM Login to Vercel
vercel login

REM Install dependencies
echo 📦 Installing dependencies...
npm install --force

REM Build project
echo 🏗️ Building project...
npm run build

REM Deploy to production
echo 🌐 Deploying to Vercel...
vercel --prod --force

echo ✅ DEPLOYMENT COMPLETE!
echo Check your Vercel dashboard for the live URL.
pause
