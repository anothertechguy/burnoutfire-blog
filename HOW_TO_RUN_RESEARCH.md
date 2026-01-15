# How to Run Competitor Research

## The Issue

The admin panel buttons may not work because:
1. **Static Site Limitation**: Astro in static mode doesn't serve API routes
2. **API Endpoints**: Need Netlify Functions or server mode to work
3. **No Loading Feedback**: Functions may be running but not showing progress

## Solutions

### Option 1: Run Research Locally (Recommended)

```bash
cd /Users/sean/Desktop/BurnoutFire
npm install  # If you haven't already
npm run research
```

This will:
- Scrape competitor RSS feeds
- Analyze content
- Build competitor profiles
- Display results in terminal

**Results will be in-memory** - to persist, we need to add file storage.

### Option 2: Set Up Netlify Functions

Create `netlify/functions/research-competitors.ts`:

```typescript
import { runCompetitorResearch } from '../../src/utils/agents/research/competitorScraper';

export const handler = async (event) => {
  try {
    const profiles = await runCompetitorResearch();
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, profiles }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: error.message }),
    };
  }
};
```

Then update admin panel to call `/api/research-competitors` instead.

### Option 3: Use Client-Side Research

The research functions can run in the browser, but they need to be imported correctly. The current implementation tries this but may have module resolution issues.

### Option 4: Manual Research

You can manually analyze competitors and update the profiles in:
- `src/utils/agents/knowledge/competitorProfiles.ts`

## What Research Actually Does

When it runs, it will:

1. **Fetch RSS Feeds**:
   - MrMoneyMustache: https://www.mrmoneymustache.com/feed/
   - Financial Samurai: https://www.financialsamurai.com/feed/
   - Go Curry Cracker: https://www.gocurrycracker.com/feed/
   - Mad Fientist: https://www.madfientist.com/feed/

2. **Analyze Posts**:
   - Extract titles, descriptions
   - Estimate word counts
   - Identify topics
   - Analyze structure

3. **Build Profiles**:
   - Average word counts
   - Content gaps
   - Weaknesses
   - Opportunities for us

4. **Store Results**:
   - Currently in-memory
   - Need to add persistence for production

## Quick Test

To test if research works:

```bash
cd /Users/sean/Desktop/BurnoutFire
node -e "
import('./src/utils/agents/research/competitorScraper.js').then(m => {
  m.runCompetitorResearch().then(profiles => {
    console.log('Profiles:', profiles.length);
    profiles.forEach(p => {
      console.log(p.name, ':', p.content.averageWordCount, 'words avg');
    });
  });
});
"
```

## Next Steps

1. **Add Loading States**: ✅ Done - buttons now show loading
2. **Add Error Messages**: ✅ Done - shows helpful errors
3. **Add Persistence**: Need to save results to files
4. **Add Netlify Functions**: For production API endpoints

## Current Status

- ✅ Research functions are built and ready
- ✅ RSS parser works
- ✅ Profile builder works
- ⚠️ API endpoints need Netlify Functions
- ⚠️ Results need file persistence
- ✅ UI shows helpful messages when API unavailable
