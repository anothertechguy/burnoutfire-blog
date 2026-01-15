/**
 * Quality Benchmarks
 * Scoring criteria for content quality validation
 */

export const QUALITY_BENCHMARKS = {
  content: {
    minWordCount: 2000, // Minimum for comprehensive coverage
    targetWordCount: 2500, // Optimal for SEO and depth
    maxWordCount: 4000, // Maximum before diminishing returns
    minHeadings: 5, // Minimum H2/H3 headings for structure
    minInternalLinks: 3, // Minimum internal links per 1000 words
    minExternalLinks: 2, // Minimum authoritative external links
  },
  seo: {
    keywordDensity: { min: 0.01, max: 0.03 }, // 1-3% keyword density
    titleLength: { min: 50, max: 60 }, // Optimal title length
    metaDescriptionLength: { min: 150, max: 160 },
    headingKeywordUsage: true, // Use keywords in at least one heading
    firstParagraphKeyword: true, // Include keyword in first paragraph
  },
  quality: {
    readabilityScore: { min: 60, max: 80 }, // Flesch Reading Ease
    uniquenessScore: { min: 80 }, // 80%+ unique vs competitors
    depthScore: { min: 75 }, // Comprehensive coverage score
    actionabilityScore: { min: 70 }, // Clear actionable takeaways
    researchScore: { min: 80 }, // Research-backed claims
  },
  competitive: {
    wordCountVsCompetitors: 'above_average' as const, // Beat average competitor word count
    structureVsCompetitors: 'better' as const, // Better structure than competitors
    depthVsCompetitors: 'deeper' as const, // Deeper coverage than competitors
    angleVsCompetitors: 'unique' as const, // Unique angle or perspective
  },
} as const;

export type QualityBenchmarks = typeof QUALITY_BENCHMARKS;
