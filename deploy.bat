@echo off
echo 🚀 Starting deployment process...

REM Step 1: Install dependencies
echo 📦 Installing dependencies...
npm install

REM Step 2: Type checking
echo 🔍 Running type check...
npm run type-check

REM Step 3: Linting
echo ✨ Running linter...
npm run lint

REM Step 4: Build
echo 🏗️ Building project...
npm run build

REM Step 5: Deploy to Vercel Production
echo 🌐 Deploying to Vercel production...
vercel --prod

echo ✅ Deployment complete!
pause
