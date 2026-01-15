/**
 * Competitor Profiles
 * Deep analysis and profiles of competitors
 */

export interface CompetitorProfile {
  name: string;
  url: string;
  focus: string;
  
  // Content analysis
  content: {
    averageWordCount: number;
    averageReadability: number;
    commonTopics: string[];
    uniqueAngles: string[];
    structure: {
      headingStyle: string;
      introStyle: string;
      conclusionStyle: string;
    };
    tone: string[];
    strengths: string[];
    weaknesses: string[];
  };
  
  // SEO analysis
  seo: {
    keywordStrategy: string[];
    internalLinking: number; // links per 1000 words
    updateFrequency: string;
    backlinkProfile: 'strong' | 'moderate' | 'weak';
  };
  
  // Audience analysis
  audience: {
    primary: string[];
    secondary: string[];
    engagement: 'high' | 'medium' | 'low';
  };
  
  // Opportunities
  opportunities: {
    gaps: string[];
    weaknesses: string[];
    angles: string[];
  };
  
  // Last analyzed
  lastAnalyzed: Date;
  samplePosts: Array<{
    title: string;
    url: string;
    wordCount: number;
    topics: string[];
  }>;
}

/**
 * Competitor profiles (to be populated by actual research)
 */
export const competitorProfiles: Record<string, CompetitorProfile> = {};

/**
 * Get competitor profile
 */
export function getCompetitorProfile(name: string): CompetitorProfile | null {
  return competitorProfiles[name] || null;
}

/**
 * Update competitor profile
 */
export function updateCompetitorProfile(profile: CompetitorProfile): void {
  competitorProfiles[profile.name] = {
    ...profile,
    lastAnalyzed: new Date(),
  };
}

/**
 * Get all competitor profiles
 */
export function getAllCompetitorProfiles(): CompetitorProfile[] {
  return Object.values(competitorProfiles);
}

/**
 * Get competitor learnings summary
 */
export function getCompetitorLearnings(): string {
  const profiles = getAllCompetitorProfiles();
  
  if (profiles.length === 0) {
    return 'No competitor analysis completed yet. Run competitor research to build profiles.';
  }
  
  let summary = '# Competitor Learnings\n\n';
  
  profiles.forEach(profile => {
    summary += `## ${profile.name}\n\n`;
    summary += `**Focus:** ${profile.focus}\n\n`;
    summary += `**Content Strategy:**\n`;
    summary += `- Average word count: ${profile.content.averageWordCount}\n`;
    summary += `- Common topics: ${profile.content.commonTopics.join(', ')}\n`;
    summary += `- Strengths: ${profile.content.strengths.join(', ')}\n`;
    summary += `- Weaknesses: ${profile.content.weaknesses.join(', ')}\n\n`;
    summary += `**Opportunities for Us:**\n`;
    summary += `- Gaps: ${profile.opportunities.gaps.join(', ')}\n`;
    summary += `- Angles: ${profile.opportunities.angles.join(', ')}\n\n`;
  });
  
  return summary;
}
