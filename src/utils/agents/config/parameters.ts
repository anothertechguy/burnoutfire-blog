/**
 * Agent Parameters
 * Tunable agent behavior settings
 * Modify these values to adjust agent behavior without code changes
 */

export const AGENT_PARAMS = {
  writing: {
    targetWordCount: 2500,
    minWordCount: 2000,
    maxWordCount: 4000,
    toneStrictness: 0.8, // 0-1, how strictly to follow tone
    includePersonalNarrative: true,
    includeCalculations: true,
    avoidKeywords: ['extreme', 'must', 'should', 'always', 'never'],
    preferredKeywords: ['consider', 'might', 'could', 'option', 'perhaps'],
    paragraphLength: 3, // sentences per paragraph
    sectionLength: 300, // words per section
  },
  
  seo: {
    keywordDensity: 0.02, // 2% keyword density
    internalLinkFrequency: 3, // links per 1000 words
    headingStructure: 'h2-h3', // preferred heading hierarchy
    titleKeywordPosition: 'front', // 'front' | 'middle' | 'end'
    metaDescriptionLength: 155, // characters
  },
  
  research: {
    topPagesToAnalyze: 20,
    minCompetitorWordCount: 1500,
    depthAnalysisThreshold: 2000, // Analyze deeply if competitors have 2000+ words
    gapOpportunityThreshold: 0.3, // Minimum gap score to pursue
  },
  
  quality: {
    minReadabilityScore: 60,
    maxReadabilityScore: 80,
    minUniquenessScore: 80,
    minDepthScore: 75,
    minActionabilityScore: 70,
    minResearchScore: 80,
  },
  
  competitive: {
    wordCountAdvantage: 0.2, // 20% more words than competitor average
    depthAdvantage: 0.3, // 30% deeper coverage
    structureImprovement: true, // Must have better structure
    uniqueAngleRequired: true, // Must have unique angle
  },
} as const;

export type AgentParams = typeof AGENT_PARAMS;
