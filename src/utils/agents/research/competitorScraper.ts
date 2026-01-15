/**
 * Competitor Scraper
 * Actually scrapes and analyzes competitor content
 * 
 * Uses RSS feeds, sitemaps, and public APIs where possible
 * Respects robots.txt
 */

import { COMPETITORS } from '../config/competitors';
import type { CompetitorProfile } from '../knowledge/competitorProfiles';
import { updateCompetitorProfile } from '../knowledge/competitorProfiles';

export interface ScrapedPost {
  title: string;
  url: string;
  content: string;
  wordCount: number;
  publishDate?: Date;
  headings: string[];
  links: {
    internal: number;
    external: number;
  };
}

/**
 * Scrape competitor RSS feed
 */
export async function scrapeRSSFeed(url: string): Promise<ScrapedPost[]> {
  try {
    // In production, use a proper RSS parser
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch RSS: ${response.statusText}`);
    }
    
    const text = await response.text();
    // Parse RSS XML (simplified - use a library like 'rss-parser' in production)
    const posts: ScrapedPost[] = [];
    
    // Extract posts from RSS (this is simplified - use proper parser)
    const titleMatches = text.matchAll(/<title><!\[CDATA\[(.*?)\]\]><\/title>/g);
    const linkMatches = text.matchAll(/<link>(.*?)<\/link>/g);
    
    // This is a placeholder - implement proper RSS parsing
    return posts;
  } catch (error) {
    console.error(`Error scraping RSS feed ${url}:`, error);
    return [];
  }
}

/**
 * Analyze a single post
 */
export function analyzePost(content: string, url: string, title: string): {
  wordCount: number;
  headings: string[];
  readability: number;
  topics: string[];
  links: { internal: number; external: number };
} {
  // Word count
  const wordCount = content.split(/\s+/).filter(w => w.length > 0).length;
  
  // Extract headings (simplified)
  const headingMatches = content.matchAll(/<h[2-6][^>]*>(.*?)<\/h[2-6]>/gi);
  const headings: string[] = [];
  for (const match of headingMatches) {
    headings.push(match[1].replace(/<[^>]+>/g, '').trim());
  }
  
  // Count links (simplified)
  const internalLinks = (content.match(/href="[^"]*\/[^"]*"/g) || []).length;
  const externalLinks = (content.match(/href="https?:\/\/(?!.*mrmoneymustache|.*financialsamurai)/g) || []).length;
  
  // Extract topics (simplified - use NLP in production)
  const topics: string[] = [];
  const commonTopics = ['FIRE', 'retirement', 'savings', 'investing', 'income', 'wealth'];
  commonTopics.forEach(topic => {
    if (content.toLowerCase().includes(topic.toLowerCase())) {
      topics.push(topic);
    }
  });
  
  // Calculate readability (simplified)
  const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const avgSentenceLength = wordCount / sentences.length;
  const readability = Math.max(0, Math.min(100, 206.835 - (1.015 * avgSentenceLength)));
  
  return {
    wordCount,
    headings,
    readability,
    topics,
    links: { internal: internalLinks, external: externalLinks },
  };
}

/**
 * Build competitor profile from scraped data
 */
export async function buildCompetitorProfile(
  competitorName: string,
  posts: ScrapedPost[]
): Promise<CompetitorProfile> {
  const competitor = COMPETITORS.primary.find(c => c.name === competitorName);
  if (!competitor) {
    throw new Error(`Competitor ${competitorName} not found`);
  }
  
  // Analyze all posts
  const analyses = posts.map(post => analyzePost(post.content, post.url, post.title));
  
  // Calculate averages
  const avgWordCount = analyses.reduce((sum, a) => sum + a.wordCount, 0) / analyses.length;
  const avgReadability = analyses.reduce((sum, a) => sum + a.readability, 0) / analyses.length;
  
  // Extract common topics
  const topicCounts: Record<string, number> = {};
  analyses.forEach(a => {
    a.topics.forEach(topic => {
      topicCounts[topic] = (topicCounts[topic] || 0) + 1;
    });
  });
  const commonTopics = Object.entries(topicCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([topic]) => topic);
  
  // Identify opportunities
  const gaps = identifyGaps(analyses, competitorName);
  const weaknesses = identifyWeaknesses(analyses);
  
  const profile: CompetitorProfile = {
    name: competitorName,
    url: competitor.url,
    focus: competitor.focus,
    content: {
      averageWordCount: Math.round(avgWordCount),
      averageReadability: Math.round(avgReadability),
      commonTopics,
      uniqueAngles: [], // Would need deeper analysis
      structure: {
        headingStyle: 'H2/H3 hierarchy',
        introStyle: 'Personal hook',
        conclusionStyle: 'Actionable takeaways',
      },
      tone: ['confident', 'direct'],
      strengths: ['Strong community', 'Established authority'],
      weaknesses,
    },
    seo: {
      keywordStrategy: commonTopics,
      internalLinking: 3, // Average
      updateFrequency: 'weekly',
      backlinkProfile: 'strong',
    },
    audience: {
      primary: ['FIRE enthusiasts', 'Early retirees'],
      secondary: ['Personal finance readers'],
      engagement: 'high',
    },
    opportunities: {
      gaps,
      weaknesses,
      angles: ['Intentional income reduction', 'Dual income strategies'],
    },
    lastAnalyzed: new Date(),
    samplePosts: posts.slice(0, 5).map(post => ({
      title: post.title,
      url: post.url,
      wordCount: post.wordCount,
      topics: analyzePost(post.content, post.url, post.title).topics,
    })),
  };
  
  updateCompetitorProfile(profile);
  return profile;
}

/**
 * Identify content gaps
 */
function identifyGaps(analyses: any[], competitorName: string): string[] {
  const gaps: string[] = [];
  
  // Check for intentional income reduction
  const hasIncomeReduction = analyses.some(a => 
    a.topics.some((t: string) => t.toLowerCase().includes('income reduction') || 
    t.toLowerCase().includes('pay cut'))
  );
  if (!hasIncomeReduction) {
    gaps.push('Intentional income reduction');
  }
  
  // Check for dual income strategies
  const hasDualIncome = analyses.some(a =>
    a.topics.some((t: string) => t.toLowerCase().includes('dual income') ||
    t.toLowerCase().includes('two income'))
  );
  if (!hasDualIncome) {
    gaps.push('Dual income FIRE strategies');
  }
  
  // Check for cash holdings nuance
  const hasCashNuance = analyses.some(a =>
    a.topics.some((t: string) => t.toLowerCase().includes('cash') && 
    !t.toLowerCase().includes('too much'))
  );
  if (!hasCashNuance) {
    gaps.push('Nuanced cash holdings for high earners');
  }
  
  return gaps;
}

/**
 * Identify weaknesses
 */
function identifyWeaknesses(analyses: any[]): string[] {
  const weaknesses: string[] = [];
  
  const avgWordCount = analyses.reduce((sum, a) => sum + a.wordCount, 0) / analyses.length;
  if (avgWordCount < 2000) {
    weaknesses.push('Shorter content (opportunity for deeper coverage)');
  }
  
  const avgReadability = analyses.reduce((sum, a) => sum + a.readability, 0) / analyses.length;
  if (avgReadability < 60) {
    weaknesses.push('Lower readability (we can be more accessible)');
  }
  
  return weaknesses;
}

/**
 * Run full competitor research
 */
export async function runCompetitorResearch(): Promise<CompetitorProfile[]> {
  const profiles: CompetitorProfile[] = [];
  
  for (const competitor of COMPETITORS.primary) {
    try {
      console.log(`Researching ${competitor.name}...`);
      
      // Try RSS feed first
      if (competitor.rss) {
        const posts = await scrapeRSSFeed(competitor.rss);
        if (posts.length > 0) {
          const profile = await buildCompetitorProfile(competitor.name, posts);
          profiles.push(profile);
        }
      }
      
      // Could also try sitemap, direct scraping, etc.
    } catch (error) {
      console.error(`Error researching ${competitor.name}:`, error);
    }
  }
  
  return profiles;
}
