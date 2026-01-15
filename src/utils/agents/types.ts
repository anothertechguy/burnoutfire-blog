/**
 * Agent Type Definitions
 * Interfaces for all agents in the multi-agent system
 */

import type { CollectionEntry } from 'astro:content';

// Content Intelligence Agent Types
export interface CompetitorAnalysis {
  keyword: string;
  topPages: PageAnalysis[];
  averageWordCount: number;
  averageReadability: number;
  commonStructure: ContentStructure;
  contentGaps: ContentGap[];
  serpFeatures: SERPFeature[];
  timestamp: Date;
}

export interface PageAnalysis {
  url: string;
  title: string;
  wordCount: number;
  headings: string[];
  internalLinks: number;
  externalLinks: number;
  readabilityScore: number;
  structure: ContentStructure;
  keywords: string[];
  publishDate?: Date;
  updateDate?: Date;
}

export interface ContentStructure {
  headingHierarchy: string[];
  averageSectionLength: number;
  commonSections: string[];
  conclusionStyle: string;
}

export interface ContentGap {
  topic: string;
  opportunity: 'high' | 'medium' | 'low';
  competitorCoverage: number; // 0-1, how well competitors cover it
  ourCoverage: number; // 0-1, how well we cover it
  trafficPotential: number; // Estimated search volume
  competition: number; // 0-1, competition level
}

// SEO Strategy Agent Types
export interface SERPAnalysis {
  keyword: string;
  featuredSnippet?: FeaturedSnippet;
  peopleAlsoAsk: string[];
  relatedSearches: string[];
  topRankingPages: PageAnalysis[];
  searchIntent: SearchIntent;
  serpFeatures: SERPFeature[];
}

export interface FeaturedSnippet {
  text: string;
  source: string;
  type: 'paragraph' | 'list' | 'table';
}

export interface SERPFeature {
  type: 'featured_snippet' | 'people_also_ask' | 'related_searches' | 'video' | 'images';
  data: any;
}

export interface SearchIntent {
  type: 'informational' | 'transactional' | 'navigational' | 'commercial';
  confidence: number; // 0-1
  keywords: string[];
}

export interface KeywordCluster {
  primary: string;
  secondary: string[];
  longTail: string[];
  questions: string[];
  searchVolume?: number;
  difficulty?: number;
  intent: SearchIntent;
}

export interface InternalLinkMap {
  from: string; // Post slug
  to: string[]; // Array of post slugs
  keywords: string[]; // Keywords used for linking
}

export interface ContentBrief {
  topic: string;
  targetKeyword: string;
  title: string;
  description: string;
  structure: string[];
  wordCountTarget: number;
  uniqueAngle: string;
  competitorGaps: string[];
  serpOpportunities: string[];
  keywords: KeywordCluster;
  searchIntent: SearchIntent;
}

// Writing Agent Types
export interface ResearchData {
  competitorAnalysis: CompetitorAnalysis;
  serpAnalysis: SERPAnalysis;
  contentGaps: ContentGap[];
  keywordResearch: KeywordCluster;
  qualityBenchmarks: QualityBenchmarks;
}

export interface WritingConfig {
  tone?: string;
  wordCount?: number;
  includePersonalNarrative?: boolean;
  includeCalculations?: boolean;
}

export interface ToneAnalysis {
  matches: boolean;
  score: number; // 0-1
  issues: string[];
  suggestions: string[];
}

export interface QualityReport {
  overallScore: number; // 0-100
  readability: number;
  depth: number;
  uniqueness: number;
  actionability: number;
  research: number;
  competitive: CompetitiveScore;
  passes: boolean;
  improvements: string[];
}

export interface CompetitiveScore {
  wordCountVsCompetitors: 'above' | 'average' | 'below';
  structureVsCompetitors: 'better' | 'equal' | 'worse';
  depthVsCompetitors: 'deeper' | 'equal' | 'shallower';
  angleVsCompetitors: 'unique' | 'similar' | 'generic';
}

// Monetization Agent Types
export interface AffiliateLink {
  text: string;
  url: string;
  description: string;
  context: string; // Where it appears in content
  relevance: number; // 0-1
}

export interface MonetizationStrategy {
  affiliateLinks: AffiliateLink[];
  productPlacements: ProductPlacement[];
  emailCapture: EmailCapture[];
}

export interface ProductPlacement {
  product: string;
  position: number; // Character position
  context: string;
}

export interface EmailCapture {
  position: 'top' | 'middle' | 'bottom';
  leadMagnet: string;
  context: string;
}

// Quality Benchmarks
export interface QualityBenchmarks {
  content: {
    minWordCount: number;
    targetWordCount: number;
    maxWordCount: number;
    minHeadings: number;
    minInternalLinks: number;
    minExternalLinks: number;
  };
  seo: {
    keywordDensity: { min: number; max: number };
    titleLength: { min: number; max: number };
    metaDescriptionLength: { min: number; max: number };
    headingKeywordUsage: boolean;
    firstParagraphKeyword: boolean;
  };
  quality: {
    readabilityScore: { min: number; max: number };
    uniquenessScore: { min: number };
    depthScore: { min: number };
    actionabilityScore: { min: number };
    researchScore: { min: number };
  };
  competitive: {
    wordCountVsCompetitors: 'above_average' | 'average' | 'below_average';
    structureVsCompetitors: 'better' | 'equal' | 'worse';
    depthVsCompetitors: 'deeper' | 'equal' | 'shallower';
    angleVsCompetitors: 'unique' | 'similar' | 'generic';
  };
}

// Post type for agents
export type Post = CollectionEntry<'posts'>;

// Topic type
export interface Topic {
  topic: string;
  priority?: number;
  opportunity?: 'high' | 'medium' | 'low';
  trafficPotential?: number;
  competition?: number;
}

export type PrioritizedTopic = Topic;
