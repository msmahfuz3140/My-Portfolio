#!/bin/bash

# Deployment Script for Vercel Production

echo "🚀 Starting deployment process..."

# Step 1: Install dependencies
echo "📦 Installing dependencies..."
npm install

# Step 2: Type checking
echo "🔍 Running type check..."
npm run type-check

# Step 3: Linting
echo "✨ Running linter..."
npm run lint

# Step 4: Build
echo "🏗️ Building project..."
npm run build

# Step 5: Deploy to Vercel Production
echo "🌐 Deploying to Vercel production..."
vercel --prod

echo "✅ Deployment complete!"
