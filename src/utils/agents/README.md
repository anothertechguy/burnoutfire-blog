# Agent System Documentation

## Overview

The BurnoutFIRE blog platform uses a multi-agent system for research-backed, competition-beating content creation. Each agent specializes in a specific role, ensuring best-in-class output.

## Architecture

### Agent Types

1. **Content Intelligence Agent** - Deep competitive research and gap analysis
2. **SEO Strategy Agent** - SERP analysis and keyword intelligence
3. **Writing Agent** - Research-backed content creation
4. **Monetization Agent** - High-intent affiliate and product placement
5. **Orchestrator** - Coordinates multi-agent workflow

### Workflow

```
Research Phase → Strategy Phase → Creation Phase → Quality Phase → Optimization Phase → Monetization Phase
```

## Configuration System

All agent behavior is controlled through configuration files in `config/`:

- **`prompts.ts`** - All prompt templates (edit to change tone/style)
- **`parameters.ts`** - Tunable parameters (word counts, SEO settings)
- **`competitors.ts`** - Competitor sites to analyze
- **`qualityBenchmarks.ts`** - Quality scoring criteria
- **`examples.ts`** - Reference examples for quality control

## Tuning Agents

### Common Tuning Scenarios

#### "Posts are too long/short"
→ Edit `config/parameters.ts`, change `AGENT_PARAMS.writing.targetWordCount`

#### "Tone doesn't match brand"
→ Edit `config/prompts.ts`, modify `WRITING_PROMPTS.tone`

#### "Missing certain elements"
→ Add examples to `config/examples.ts`

#### "SEO keywords feel forced"
→ Adjust `AGENT_PARAMS.seo.keywordDensity` in `config/parameters.ts`

#### "Content not competitive enough"
→ Adjust `AGENT_PARAMS.competitive` settings in `config/parameters.ts`

### Workflow

1. **Test agent output** - Run agent, review generated content
2. **Identify issues** - Too formal? Too casual? Wrong structure?
3. **Edit config files** - Modify `prompts.ts` or `parameters.ts` (no code changes)
4. **Add examples** - If output is off, add good examples to `examples.ts`
5. **Re-run and iterate** - Test again, refine until satisfied

## Research Infrastructure

The system includes research modules for:

- **Competitor Analysis** - Deep analysis of top ranking pages
- **SERP Analysis** - Featured snippets, PAA, related searches
- **Content Gap Analysis** - Identify opportunities competitors miss
- **Keyword Research** - Comprehensive keyword intelligence
- **Quality Scoring** - Validate content against benchmarks

## Best Practices

1. **Research First** - Always conduct research before creating content
2. **Quality Gates** - Content must pass quality benchmarks before publication
3. **Competitive Advantage** - Ensure content beats competitors on depth and value
4. **Configuration Over Code** - Tune behavior via config files, not implementation
5. **Iterative Improvement** - Use performance data to refine agents over time

## Extension Points

### Adding New Agents

1. Create agent file in `src/utils/agents/`
2. Define interface in `types.ts`
3. Add to orchestrator workflow
4. Create config section if needed

### Adding Research Capabilities

1. Create research module in `research/`
2. Export functions for agent use
3. Update agent interfaces

## Implementation Status

**Current Status**: Scaffold implementations with clear extension points

**To Complete**:
- Integrate LLM for content generation
- Implement actual competitor scraping/analysis
- Add SERP analysis APIs
- Complete quality scoring algorithms
- Add performance tracking

## Questions?

See main README.md for general project documentation.
