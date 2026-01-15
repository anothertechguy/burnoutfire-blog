/**
 * Enhanced SERP Analysis
 * Better niche finding with wide moat focus
 */

import type { SERPAnalysis, SearchIntent } from '../types';
import { analyzeSERPForWideMoat, findWideMoatOpportunities } from './wideMoatAnalysis';

export interface NicheOpportunity {
  keyword: string;
  searchVolume: number;
  competition: 'very_low' | 'low' | 'medium' | 'high';
  difficulty: number; // 0-100
  opportunity: 'high' | 'medium' | 'low';
  moat: string;
  strategy: string;
  relatedKeywords: string[];
  contentIdeas: string[];
}

/**
 * Enhanced SERP analysis focused on wide moat opportunities
 */
export async function analyzeSERPForNiche(keyword: string): Promise<NicheOpportunity> {
  // Get wide moat analysis
  const wideMoat = analyzeSERPForWideMoat(keyword);
  const allOpportunities = findWideMoatOpportunities();
  const match = allOpportunities.find(o => 
    o.keyword.toLowerCase() === keyword.toLowerCase()
  );
  
  if (match) {
    return {
      keyword: match.keyword,
      searchVolume: match.searchVolume,
      competition: match.competition,
      difficulty: match.competition === 'very_low' ? 10 : match.competition === 'low' ? 30 : 60,
      opportunity: wideMoat.opportunity,
      moat: match.moat,
      strategy: match.strategy,
      relatedKeywords: generateRelatedKeywords(keyword),
      contentIdeas: generateContentIdeas(keyword, match),
    };
  }
  
  // Generic analysis for new keywords
  return {
    keyword,
    searchVolume: 0, // Would come from keyword tool
    competition: 'medium',
    difficulty: 50,
    opportunity: 'medium',
    moat: 'Standard competition',
    strategy: 'Create comprehensive content that beats competitors',
    relatedKeywords: generateRelatedKeywords(keyword),
    contentIdeas: generateContentIdeas(keyword),
  };
}

/**
 * Generate related keywords for a niche
 */
function generateRelatedKeywords(keyword: string): string[] {
  const base = keyword.toLowerCase();
  const related: string[] = [];
  
  // Add question variations
  const questions = ['what is', 'how to', 'why', 'when', 'where'];
  questions.forEach(q => {
    related.push(`${q} ${base}`);
    related.push(`${base} ${q}`);
  });
  
  // Add modifier variations
  const modifiers = ['best', 'guide', 'strategy', 'calculator', 'vs'];
  modifiers.forEach(m => {
    related.push(`${base} ${m}`);
    related.push(`${m} ${base}`);
  });
  
  // Add long-tail variations
  related.push(`${base} for high earners`);
  related.push(`${base} strategy`);
  related.push(`${base} examples`);
  
  return related.slice(0, 10); // Limit to 10
}

/**
 * Generate content ideas for a niche
 */
function generateContentIdeas(keyword: string, opportunity?: any): string[] {
  const ideas: string[] = [];
  
  ideas.push(`Complete Guide to ${keyword.charAt(0).toUpperCase() + keyword.slice(1)}`);
  ideas.push(`${keyword.charAt(0).toUpperCase() + keyword.slice(1)}: Everything You Need to Know`);
  ideas.push(`How to Master ${keyword.charAt(0).toUpperCase() + keyword.slice(1)}`);
  
  if (opportunity) {
    ideas.push(`${opportunity.niche}: A Deep Dive`);
    ideas.push(`Why ${opportunity.niche} Is the Best Strategy`);
  }
  
  ideas.push(`${keyword.charAt(0).toUpperCase() + keyword.slice(1)} Calculator`);
  ideas.push(`${keyword.charAt(0).toUpperCase() + keyword.slice(1)} vs Alternatives`);
  
  return ideas;
}

/**
 * Find best niches to target
 */
export function findBestNiches(count: number = 5): NicheOpportunity[] {
  const opportunities = findWideMoatOpportunities();
  
  return opportunities
    .filter(o => o.competition === 'very_low' || o.competition === 'low')
    .sort((a, b) => {
      // Sort by opportunity (very_low > low > medium)
      const compOrder = { very_low: 0, low: 1, medium: 2, high: 3 };
      return compOrder[a.competition] - compOrder[b.competition];
    })
    .slice(0, count)
    .map(o => ({
      keyword: o.keyword,
      searchVolume: o.searchVolume,
      competition: o.competition,
      difficulty: o.competition === 'very_low' ? 10 : 30,
      opportunity: 'high' as const,
      moat: o.moat,
      strategy: o.strategy,
      relatedKeywords: generateRelatedKeywords(o.keyword),
      contentIdeas: generateContentIdeas(o.keyword, o),
    }));
}

/**
 * Analyze keyword cluster for wide moat potential
 */
export function analyzeKeywordCluster(keywords: string[]): {
  bestOpportunity: NicheOpportunity | null;
  clusterStrength: 'strong' | 'medium' | 'weak';
  recommendation: string;
} {
  const opportunities = keywords.map(k => analyzeSERPForNiche(k));
  
  // Find best opportunity
  const best = opportunities
    .sort((a, b) => {
      if (a.opportunity === 'high' && b.opportunity !== 'high') return -1;
      if (b.opportunity === 'high' && a.opportunity !== 'high') return 1;
      return a.difficulty - b.difficulty;
    })[0];
  
  // Assess cluster strength
  const highOppCount = opportunities.filter(o => o.opportunity === 'high').length;
  const clusterStrength = highOppCount >= 3 ? 'strong' : highOppCount >= 1 ? 'medium' : 'weak';
  
  let recommendation = '';
  if (clusterStrength === 'strong') {
    recommendation = 'Strong cluster with multiple high-opportunity keywords. Build comprehensive content covering all keywords.';
  } else if (clusterStrength === 'medium') {
    recommendation = 'Moderate cluster. Focus on the best opportunity first, then expand.';
  } else {
    recommendation = 'Weak cluster. Consider different keyword strategy or deeper niche.';
  }
  
  return {
    bestOpportunity: best || null,
    clusterStrength,
    recommendation,
  };
}
