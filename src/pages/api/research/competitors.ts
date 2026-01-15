/**
 * API Endpoint: Run Competitor Research
 * 
 * This endpoint triggers actual competitor research
 * In production, this would:
 * 1. Scrape competitor RSS feeds
 * 2. Analyze content
 * 3. Build profiles
 * 4. Store results
 */

import type { APIRoute } from 'astro';
import { runCompetitorResearch } from '../../../utils/agents/research/competitorScraper';

export const GET: APIRoute = async () => {
  try {
    // Run competitor research
    const profiles = await runCompetitorResearch();
    
    return new Response(JSON.stringify({
      success: true,
      profiles: profiles.map(p => ({
        name: p.name,
        averageWordCount: p.content.averageWordCount,
        gaps: p.opportunities.gaps,
        weaknesses: p.content.weaknesses,
      })),
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const { competitor } = await request.json();
    
    // Research specific competitor
    const profiles = await runCompetitorResearch();
    const profile = profiles.find(p => p.name === competitor);
    
    if (!profile) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Competitor not found',
      }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    
    return new Response(JSON.stringify({
      success: true,
      profile,
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};
