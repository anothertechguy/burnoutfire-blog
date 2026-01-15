# Admin Dashboard Documentation

## Overview

The admin dashboard provides a user-friendly GUI for managing your BurnoutFIRE blog, configuring agents, and viewing intelligence insights.

## Access

Navigate to `/admin` to access the dashboard.

**Note:** Currently, there's no authentication. For production, you should add:
- Password protection
- Environment variable-based access
- Or integrate with a headless CMS

## Features

### 1. Agent Configuration (`/admin/agents`)

**Purpose:** Easily modify agent prompts and parameters without editing code files.

**What you can do:**
- Edit writing prompts (tone, structure, research integration, quality)
- Adjust numerical parameters (word counts, keyword density, etc.)
- Toggle features (personal narrative, calculations)

**How it works:**
- Currently shows UI for editing
- In production, this should connect to your config files
- Changes can be saved to `src/utils/agents/config/prompts.ts` and `parameters.ts`

**To make it functional:**
1. Add API endpoints (requires Astro server mode or Netlify Functions)
2. Or use GitHub API to update files directly
3. Or create a build-time script that reads from a JSON config

### 2. Agent Intelligence (`/admin/intelligence`)

**Purpose:** See why agents make decisions and understand their strategy.

**What you see:**
- Agent decision flow (what each agent is doing and why)
- Competitive analysis insights
- SERP analysis results
- Quality benchmark scores
- Strategic explanations

**Key Insights:**
- **Content Depth Strategy:** Shows why we target 55% more words than competitors
- **Gap-Filling Approach:** Identifies underserved topics
- **SERP Optimization:** Explains featured snippet opportunities

**To make it functional:**
- Connect to your agent system's actual output
- Store agent decisions in a database or JSON files
- Real-time updates as agents run

### 3. Agent Workflow (`/admin/workflow`)

**Purpose:** Run agents interactively, answer their questions, and create content.

**Features:**
- Start content creation for a topic
- Answer agent questions to improve output
- See workflow progress in real-time
- Preview generated content
- Approve, request revisions, or edit manually

**Workflow Steps:**
1. **Research Phase:** Competitor analysis and SERP research
2. **Strategy Phase:** Content brief creation (may ask questions)
3. **Creation Phase:** Content generation
4. **Quality Phase:** Quality validation

**To make it functional:**
- Connect to your agent orchestrator
- Add API endpoints for agent execution
- Store workflow state
- Integrate with LLM APIs

### 4. Content Management (`/admin/content`)

**Purpose:** Manage all blog posts, edit content, and review agent output.

**Features:**
- List all posts
- Edit posts (links to edit page)
- Preview posts
- See post metadata

**To make it functional:**
- Create edit pages for each post
- Add markdown editor (like CodeMirror or Monaco)
- Save changes back to markdown files
- Or integrate with a headless CMS

### 5. Research Dashboard (`/admin/research`)

**Purpose:** View competitor analysis, SERP insights, and content gaps.

**What you see:**
- Competitor analysis results
- Content gaps (high/medium/low priority)
- SERP feature opportunities
- People Also Ask questions

**To make it functional:**
- Connect to your research agents
- Store research results
- Update automatically as research runs

### 6. Analytics (`/admin/analytics`)

**Purpose:** Track performance, rankings, and growth metrics.

**Features:**
- Key metrics (posts, visitors, rankings, backlinks)
- Traffic trends chart
- Top performing content

**To make it functional:**
- Integrate Google Analytics or Plausible
- Add SEO tracking (Ahrefs, SEMrush APIs)
- Track rankings over time

## Making It Functional

### Option 1: Add API Endpoints (Recommended)

Create API routes in `src/pages/api/`:

```typescript
// src/pages/api/config/prompts.ts
export async function GET() {
  // Read from config files
  const prompts = await import('../../utils/agents/config/prompts');
  return new Response(JSON.stringify(prompts));
}

export async function POST({ request }) {
  // Write to config files
  const data = await request.json();
  // Update config files
  return new Response(JSON.stringify({ success: true }));
}
```

### Option 2: Use Netlify Functions

Create functions in `netlify/functions/`:

```typescript
// netlify/functions/update-config.ts
export const handler = async (event) => {
  // Update config via GitHub API or file system
  return { statusCode: 200, body: JSON.stringify({ success: true }) };
};
```

### Option 3: Client-Side with GitHub API

Use GitHub API to update files directly:

```javascript
// Update config via GitHub API
const response = await fetch('https://api.github.com/repos/...', {
  method: 'PUT',
  headers: { Authorization: `token ${GITHUB_TOKEN}` },
  body: JSON.stringify({ content: btoa(newContent) })
});
```

## Security Considerations

1. **Add Authentication:**
   - Simple password protection
   - Environment variable check
   - OAuth integration

2. **Rate Limiting:**
   - Limit API calls
   - Prevent abuse

3. **Input Validation:**
   - Validate all user inputs
   - Sanitize before saving

## Next Steps

1. **Add Authentication:** Protect admin routes
2. **Connect to Config Files:** Make editing actually work
3. **Integrate Agent System:** Connect to real agents
4. **Add Real Analytics:** Connect to analytics services
5. **Create Edit Interface:** Build markdown editor for posts

## Example: Adding Password Protection

Add to each admin page:

```astro
---
// Simple password check
const password = Astro.url.searchParams.get('p');
if (password !== import.meta.env.ADMIN_PASSWORD) {
  return Astro.redirect('/admin/login');
}
---
```

Or create a middleware component that checks authentication.
