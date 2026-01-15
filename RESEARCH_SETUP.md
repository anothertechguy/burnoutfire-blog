# Research Setup Guide

## Current Status

The buttons in the admin panel are **not working** because:

1. **Static Site Limitation**: Astro builds a static site, so API routes (`/api/*`) don't work in production
2. **No Server**: Netlify serves static files, not a Node.js server
3. **Functions Needed**: Need Netlify Functions for serverless API endpoints

## What I've Added

✅ **Loading States**: Buttons now show loading spinners
✅ **Error Messages**: Clear error messages when API unavailable  
✅ **Instructions**: Helpful messages explaining how to run research

## How to Actually Run Research

### Option 1: Run Locally (Easiest)

```bash
cd /Users/sean/Desktop/BurnoutFire
npm install
npm run research
```

This will:
- Scrape competitor RSS feeds
- Analyze content
- Display results in terminal
- Build competitor profiles

**Note**: Results are currently in-memory. To persist, we need to add file storage.

### Option 2: Set Up Netlify Functions

1. **Install Netlify Functions dependencies**:
```bash
npm install @netlify/functions
```

2. **Create function** (already created at `netlify/functions/research-competitors.ts`)

3. **Update function** to actually import and run research

4. **Update admin panel** to call `/.netlify/functions/research-competitors`

### Option 3: Manual Research

You can manually research competitors and update:
- `src/utils/agents/knowledge/competitorProfiles.ts`

## Quick Fix: Make Buttons Show What's Happening

The buttons now:
- ✅ Show loading state (spinner + text)
- ✅ Show error messages if API fails
- ✅ Provide instructions for running research

**Try clicking a button now** - you should see:
1. Button changes to "Analyzing..." with spinner
2. Error message appears explaining API unavailable
3. Instructions box shows how to run research

## Next Steps to Make It Work

1. **Add File Persistence**: Save research results to JSON files
2. **Set Up Netlify Functions**: Make API endpoints work in production
3. **Or Use Client-Side**: Bundle research code to run in browser

## Testing Locally

To test research works:

```bash
cd /Users/sean/Desktop/BurnoutFire
npm run research
```

You should see output like:
```
🔍 Starting competitor research...
✅ Analyzed 4 competitors
📊 MrMoneyMustache: Avg word count: 1800, Gaps: ...
```
