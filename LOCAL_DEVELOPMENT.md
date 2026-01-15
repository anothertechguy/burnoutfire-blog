# Local Development Setup

## Running Research Locally (No Netlify Limits!)

You can now run all research functions locally on your machine, avoiding Netlify free tier limits. Everything works the same, just runs on localhost.

## Quick Start

1. **Start the dev server:**
   ```bash
   cd /Users/sean/Desktop/BurnoutFire
   npm run dev
   ```

2. **Open the admin panel:**
   ```
   http://localhost:4321/admin
   ```

3. **Run research:**
   - Go to `/admin/research` or `/admin/learnings`
   - Click "Run Research Now" or "Research All Competitors"
   - It will automatically use local API routes (no Netlify functions)

## How It Works

### Automatic Detection

The admin panel automatically detects if you're running locally:
- **Localhost**: Uses `/api/research/competitors-local` (runs on your machine)
- **Production**: Uses `/.netlify/functions/research-competitors` (runs on Netlify)

### Local API Route

- **File**: `src/pages/api/research/competitors-local.ts`
- **Works in**: Astro dev mode (`npm run dev`)
- **Features**: Same as Netlify function, just runs locally
- **Internet Access**: ✅ Full internet access for scraping RSS feeds

### What Works Locally

✅ All competitor research  
✅ RSS feed parsing  
✅ Post scoring and ranking  
✅ All-time best posts analysis  
✅ Content gap identification  
✅ Full internet access for scraping  

## Benefits

1. **No Netlify Limits**: Run research as much as you want locally
2. **Faster**: No cold starts, runs immediately
3. **Free**: No function invocations used
4. **Same Features**: Everything works exactly the same
5. **Easy Switch**: Just deploy when ready, production uses Netlify functions

## Development Workflow

### Daily Development

```bash
# Start local dev server
npm run dev

# Open browser
open http://localhost:4321/admin

# Run research, build profile, view roadmap
# Everything works locally!
```

### When Ready for Production

```bash
# Build for production (static + Netlify functions)
npm run build

# Deploy to Netlify
# Netlify will automatically use the functions in netlify/functions/
```

## API Routes

### Local Development
- `/api/research/competitors-local` - Competitor research (local)

### Production
- `/.netlify/functions/research-competitors` - Competitor research (Netlify)

The admin panel automatically switches between them based on hostname.

## Troubleshooting

### Research Not Working?

1. **Check dev server is running:**
   ```bash
   npm run dev
   ```

2. **Check browser console:**
   - Open DevTools (F12)
   - Look for errors in Console tab

3. **Verify API route:**
   - Visit: `http://localhost:4321/api/research/competitors-local`
   - Should return JSON data

### Still Using Netlify Functions?

Make sure you're accessing via `localhost`:
- ✅ `http://localhost:4321/admin`
- ✅ `http://127.0.0.1:4321/admin`
- ❌ `https://your-site.netlify.app/admin` (uses Netlify functions)

## Environment Variables

If you want to use API keys for enhanced data (optional):

1. **Create `.env` file:**
   ```bash
   SHAREDCOUNT_API_KEY=your_key_here
   DONREACH_API_KEY=your_key_here
   ```

2. **Access in code:**
   ```typescript
   const apiKey = import.meta.env.SHAREDCOUNT_API_KEY;
   ```

3. **Note**: `.env` files are gitignored, won't be committed

## Next Steps

1. Run `npm run dev`
2. Open `http://localhost:4321/admin`
3. Build your profile at `/admin/profile`
4. Run research at `/admin/research`
5. View roadmap at `/admin/roadmap`

Everything works locally with full internet access! 🚀
