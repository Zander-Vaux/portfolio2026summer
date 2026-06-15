#!/bin/bash

# Zander Vaux Portfolio Deployment Script
echo "🚀 Deploying Zander Vaux Portfolio to Vercel..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Check if user is logged in
if ! vercel whoami &> /dev/null; then
    echo "🔐 Please log in to Vercel..."
    vercel login
fi

# Deploy to Vercel
echo "📦 Deploying to Vercel..."
vercel --prod

echo "✅ Deployment complete!"
echo "🌐 Your portfolio is now live at the URL shown above."
echo "📝 Don't forget to update your custom domain in the Vercel dashboard if needed."




