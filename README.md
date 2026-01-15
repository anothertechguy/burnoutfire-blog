# BurnoutFIRE Blog Platform

A lean, SEO-optimized static blog platform focused on "BurnoutFIRE" — a sub-niche of FIRE aimed at high earners who intentionally reduce income to regain health, time, and life satisfaction while still pursuing financial independence.

## Philosophy

This blog targets:
- Tech workers & other high earners (>$120k)
- Burned-out professionals
- Parents who want more time with kids
- People optimizing life quality, not just net worth

**Core beliefs:**
- Money is a tool to reduce stress, not maximize ego
- Lower income + lower stress can outperform high income + burnout
- Cash holdings are acceptable for psychological safety
- Moderate spending on health, experiences, and time is encouraged

## Tech Stack

- **Astro** - Static site generation (zero JS by default)
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Markdown/MDX** - Content authoring
- **Netlify** - Deployment

## Project Structure

```
BurnoutFire/
├── src/
│   ├── components/     # Reusable components
│   ├── layouts/        # Page layouts
│   ├── pages/          # Route pages
│   ├── content/        # Markdown posts
│   ├── utils/          # Utilities and agents
│   └── styles/         # Global styles
├── public/             # Static assets
└── research/            # Research documentation
```

## Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Visit `http://localhost:4321`

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

## Content Creation

### Adding a New Post

1. Create a new Markdown file in `src/content/posts/`
2. Add frontmatter with required fields (see existing posts)
3. Write content in Markdown
4. Build and deploy

### Post Frontmatter

```yaml
---
title: "Post Title"
description: "Post description for SEO"
publishDate: 2024-01-15
tags: ["tag1", "tag2"]
category: "Category"
seo:
  keywords: ["keyword1", "keyword2"]
  metaDescription: "SEO meta description"
---
```

## Agent System

The platform includes a multi-agent system for research-backed content creation:

- **Content Intelligence Agent** - Competitive research
- **SEO Strategy Agent** - SERP analysis and keyword research
- **Writing Agent** - Content creation
- **Monetization Agent** - Affiliate and product placement
- **Orchestrator** - Coordinates workflow

See `src/utils/agents/README.md` for detailed documentation.

### Tuning Agents

All agent behavior is controlled through configuration files:

- `src/utils/agents/config/prompts.ts` - Prompt templates
- `src/utils/agents/config/parameters.ts` - Tunable parameters
- `src/utils/agents/config/competitors.ts` - Competitor list
- `src/utils/agents/config/qualityBenchmarks.ts` - Quality criteria

Edit these files to modify agent behavior without touching code.

## SEO Features

- Schema.org structured data (BlogPosting)
- Open Graph and Twitter Card tags
- Internal linking engine
- Sitemap generation
- RSS feed
- Semantic HTML

## Deployment

### Netlify

The project is configured for Netlify deployment:

1. Connect GitHub repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Deploy automatically on push to main

See `netlify.toml` for configuration.

## Content Roadmap

See `content-roadmap.md` for planned content (30 posts organized by category).

## Research

Research documentation is in the `research/` directory:

- `competitor-analysis.md` - Competitive research
- `serp-analysis.md` - SERP feature analysis
- `content-gaps.md` - Content opportunities
- `quality-benchmarks.md` - Quality standards

## Code Organization

- **One file, one responsibility** - Each file does one thing well
- **Clear naming** - File names describe contents
- **Logical grouping** - Related files grouped together
- **Configuration over code** - Tune behavior via config files
- **Type safety** - TypeScript catches errors early

## Extension Points

### Adding New Pages

Add files to `src/pages/` following existing patterns.

### Adding Components

Create components in `src/components/` organized by category.

### Extending Agents

See `src/utils/agents/README.md` for agent extension guide.

### Adding Research Capabilities

Create research modules in `src/utils/agents/research/`.

## Performance

- **Zero JS by default** - Astro ships no JavaScript unless needed
- **Static generation** - All pages pre-rendered
- **Fast builds** - Entire site rebuilds in seconds
- **Optimized assets** - Images and CSS optimized automatically

## License

[Add your license here]

## Contributing

[Add contributing guidelines if applicable]

---

Built with ❤️ for high earners seeking financial independence without burnout.
