# GitHub & Netlify Setup Instructions

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `burnoutfire-blog` (or your preferred name)
3. Description: "Lean, SEO-optimized blog platform for BurnoutFIRE content"
4. Choose: **Private** or **Public** (your choice)
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"

## Step 2: Push to GitHub

After creating the repository, GitHub will show you commands. Run these in your terminal:

```bash
cd /Users/sean/Desktop/BurnoutFire

# Add the remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/burnoutfire-blog.git

# Push to GitHub
git push -u origin main
```

Or if you prefer SSH:

```bash
git remote add origin git@github.com:YOUR_USERNAME/burnoutfire-blog.git
git push -u origin main
```

## Step 3: Deploy to Netlify

### Option A: Connect via GitHub (Recommended)

1. Go to https://app.netlify.com
2. Click "Add new site" → "Import an existing project"
3. Choose "GitHub" and authorize Netlify
4. Select your `burnoutfire-blog` repository
5. Netlify will auto-detect settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. Click "Deploy site"

### Option B: Deploy via Netlify CLI

```bash
# Install Netlify CLI (if not already installed)
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
cd /Users/sean/Desktop/BurnoutFire
netlify deploy --prod
```

### Option C: Manual Deploy

1. Build the site:
   ```bash
   cd /Users/sean/Desktop/BurnoutFire
   npm install
   npm run build
   ```

2. Go to https://app.netlify.com
3. Drag and drop the `dist` folder to deploy

## Step 4: Configure Netlify (After First Deploy)

1. Go to Site settings → Domain management
2. Add your custom domain (if you have one)
3. Go to Site settings → Build & deploy
4. Verify build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: `20` (or latest LTS)

## Step 5: Environment Variables (If Needed)

If you add any environment variables later:
1. Go to Site settings → Environment variables
2. Add any required variables

## Troubleshooting

### Build Fails
- Make sure `package.json` has all dependencies
- Check Node version matches (should be 20+)
- Review build logs in Netlify dashboard

### Site Not Updating
- Netlify auto-deploys on push to main branch
- Check build logs if deployment fails
- Verify `netlify.toml` is correct

### Custom Domain Issues
- DNS settings may take 24-48 hours to propagate
- Check Netlify DNS documentation for setup

## Next Steps

After deployment:
1. Update `src/config.ts` with your actual domain
2. Add your site URL to `astro.config.mjs`
3. Test all pages and functionality
4. Set up analytics (if desired)
5. Configure email capture (if desired)
