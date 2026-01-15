/**
 * Wide Moat Analysis
 * Finds niches with defensible competitive advantages
 */

export interface WideMoatOpportunity {
  niche: string;
  keyword: string;
  searchVolume: number; // Estimated
  competition: 'very_low' | 'low' | 'medium' | 'high';
  moat: string; // Why it's defensible
  opportunity: string; // What makes it attractive
  strategy: string; // How to capture it
  difficulty: 'easy' | 'medium' | 'hard';
  timeline: string; // Expected time to rank
}

/**
 * Find wide moat opportunities
 */
export function findWideMoatOpportunities(): WideMoatOpportunity[] {
  return [
    {
      niche: 'BurnoutFIRE (intentional income reduction FIRE)',
      keyword: 'burnoutfire',
      searchVolume: 500, // Monthly searches (estimated)
      competition: 'very_low',
      moat: 'First mover advantage, defining the category',
      opportunity: 'No established competitors, can own the term',
      strategy: 'Create comprehensive definition post, use consistently, build brand around term',
      difficulty: 'easy',
      timeline: '1-2 months to rank #1',
    },
    {
      niche: 'Intentional income reduction',
      keyword: 'intentional income reduction',
      searchVolume: 200,
      competition: 'very_low',
      moat: 'Unique angle, most FIRE content focuses on saving more not earning less',
      opportunity: 'Addresses real pain point (burnout) with contrarian solution',
      strategy: 'Multiple posts from different angles, case studies, calculators',
      difficulty: 'easy',
      timeline: '2-3 months',
    },
    {
      niche: 'Dual income FIRE strategies',
      keyword: 'dual income fire',
      searchVolume: 300,
      competition: 'low',
      moat: 'Limited coverage, high search demand, specific to common situation',
      opportunity: 'Most FIRE advice assumes single income or doesn\'t address dual income specifics',
      strategy: 'Comprehensive guide, calculators, case studies',
      difficulty: 'medium',
      timeline: '3-4 months',
    },
    {
      niche: 'High income not wealthy',
      keyword: 'high income not wealthy',
      searchVolume: 1000,
      competition: 'medium',
      moat: 'Deeper analysis than competitors, high earner specific',
      opportunity: 'High search volume, emotional topic, conversion potential',
      strategy: 'Deep analysis post, supporting content, calculators',
      difficulty: 'medium',
      timeline: '4-6 months',
    },
    {
      niche: 'Cash holdings for high earners',
      keyword: 'too much cash high earners',
      searchVolume: 400,
      competition: 'low',
      moat: 'Contrarian angle, nuanced view competitors don\'t offer',
      opportunity: 'Most say cash is bad, but high earners have different needs',
      strategy: 'Contrarian post, psychological analysis, scenarios',
      difficulty: 'easy',
      timeline: '2-3 months',
    },
    {
      niche: 'Pay cut for better life',
      keyword: 'take pay cut better life',
      searchVolume: 800,
      competition: 'low',
      moat: 'Personal finance advice usually says maximize income, this is contrarian',
      opportunity: 'High search volume, emotional topic, underserved',
      strategy: 'Personal narrative posts, decision frameworks, calculators',
      difficulty: 'medium',
      timeline: '3-5 months',
    },
  ];
}

/**
 * Analyze SERP for wide moat potential
 */
export function analyzeSERPForWideMoat(keyword: string): {
  opportunity: 'high' | 'medium' | 'low';
  reasoning: string;
  strategy: string;
} {
  // This would analyze actual SERP in production
  // For now, return analysis based on keyword characteristics
  
  const opportunities = findWideMoatOpportunities();
  const match = opportunities.find(o => 
    o.keyword.toLowerCase().includes(keyword.toLowerCase()) ||
    keyword.toLowerCase().includes(o.keyword.toLowerCase())
  );
  
  if (match) {
    return {
      opportunity: match.competition === 'very_low' || match.competition === 'low' ? 'high' : 'medium',
      reasoning: match.opportunity,
      strategy: match.strategy,
    };
  }
  
  // Generic analysis
  if (keyword.includes('burnoutfire') || keyword.includes('intentional income')) {
    return {
      opportunity: 'high',
      reasoning: 'Very low competition, first mover opportunity',
      strategy: 'Create comprehensive content, establish authority',
    };
  }
  
  return {
    opportunity: 'medium',
    reasoning: 'Standard competition level',
    strategy: 'Create deeper, more comprehensive content than competitors',
  };
}

/**
 * Get wide moat strategy
 */
export function getWideMoatStrategy(): string {
  const opportunities = findWideMoatOpportunities();
  
  let strategy = '# Wide Moat Strategy\n\n';
  strategy += 'Focus on niches with defensible competitive advantages:\n\n';
  
  opportunities.forEach((opp, i) => {
    strategy += `## ${i + 1}. ${opp.niche}\n\n`;
    strategy += `**Keyword:** ${opp.keyword}\n\n`;
    strategy += `**Competition:** ${opp.competition}\n\n`;
    strategy += `**Moat:** ${opp.moat}\n\n`;
    strategy += `**Strategy:** ${opp.strategy}\n\n`;
    strategy += `**Timeline:** ${opp.timeline}\n\n`;
  });
  
  return strategy;
}
