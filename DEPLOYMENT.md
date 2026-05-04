# Vercel Deployment Guide

## Common Issues & Solutions

### 1. Build Errors
**Issue**: TypeScript compilation errors
**Solution**: 
```bash
npm run type-check
npm run lint
```

### 2. Image Optimization Issues
**Issue**: External images not loading
**Solution**: Added remote patterns in `next.config.mjs` for:
- skillicons.dev
- cdn.simpleicons.org
- lh3.googleusercontent.com

### 3. Static Export Issues
**Issue**: Dynamic routes not working with static export
**Solution**: Updated `next.config.mjs` with:
- `output: 'export'`
- `trailingSlash: true`
- `distDir: 'out'`

### 4. Environment Variables
**Issue**: Missing environment variables
**Solution**: Set these in Vercel dashboard:
- `NEXT_PUBLIC_GITHUB_URL`
- `NEXT_PUBLIC_LINKEDIN_URL`
- `NEXT_PUBLIC_INSTAGRAM_URL`
- `NEXT_PUBLIC_FACEBOOK_URL`
- `NEXT_PUBLIC_WHATSAPP_URL`
- `NEXT_PUBLIC_EMAIL`

## Deployment Steps

### 1. Pre-deployment Checks
```bash
# Install dependencies
npm install

# Check TypeScript
npm run type-check

# Lint code
npm run lint

# Build locally
npm run build
```

### 2. Vercel Deployment
1. Push to GitHub
2. Connect repository to Vercel
3. Configure environment variables
4. Deploy

### 3. Post-deployment
- Check all pages load correctly
- Test contact form
- Verify images load
- Test responsive design

## Troubleshooting

### Build Fails
1. Check Vercel build logs
2. Fix TypeScript errors
3. Update dependencies
4. Clear cache: `rm -rf .next && npm run build`

### Images Not Loading
1. Check remote patterns in next.config.mjs
2. Verify image URLs are HTTPS
3. Check image optimization settings

### Dynamic Routes Not Working
1. Ensure `output: 'export'` is configured
2. Check `trailingSlash: true`
3. Verify file structure

### CSS/Styles Not Loading
1. Check Tailwind CSS configuration
2. Verify CSS imports
3. Check PostCSS configuration

## Environment Variables Setup

In Vercel Dashboard > Settings > Environment Variables:

```
NEXT_PUBLIC_GITHUB_URL=https://github.com/msmahfuz3140
NEXT_PUBLIC_LINKEDIN_URL=https://www.linkedin.com/in/msmahfuz3140
NEXT_PUBLIC_INSTAGRAM_URL=https://www.instagram.com/msmahfuz3140
NEXT_PUBLIC_FACEBOOK_URL=https://www.facebook.com/msmahfuz3140
NEXT_PUBLIC_WHATSAPP_URL=https://wa.me/8801956016119
NEXT_PUBLIC_EMAIL=mdmahfuzulhaque3140@gmail.com
```

## Performance Optimization

### Image Optimization
- Use Next.js Image component
- Enable WebP/AVIF formats
- Set proper image sizes

### Bundle Size
- Dynamic imports for large components
- Code splitting
- Tree shaking

### Caching
- Enable Vercel Edge caching
- Set proper cache headers
- Use ISR for dynamic content
