/**
 * Client-Side Research Runner
 * Can be called from browser to run research
 */

import { runCompetitorResearch } from './competitorScraper';
import { updateCompetitorProfile } from '../knowledge/competitorProfiles';

/**
 * Run research and return results
 * This can be called from the browser
 */
export async function runResearchClient(): Promise<{
  success: boolean;
  profiles: any[];
  error?: string;
}> {
  try {
    const profiles = await runCompetitorResearch();
    
    return {
      success: true,
      profiles: profiles.map(p => ({
        name: p.name,
        averageWordCount: p.content.averageWordCount,
        gaps: p.opportunities.gaps,
        weaknesses: p.content.weaknesses,
        samplePosts: p.samplePosts,
      })),
    };
  } catch (error) {
    return {
      success: false,
      profiles: [],
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
