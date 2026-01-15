/**
 * Digital Marketing Plan
 * Comprehensive marketing strategy based on research and analysis
 */

export interface MarketingPlan {
  // Overall strategy
  strategy: {
    positioning: string;
    targetAudience: string[];
    uniqueValueProposition: string;
    competitiveAdvantage: string[];
  };
  
  // Content strategy
  content: {
    pillarTopics: string[];
    supportingTopics: string[];
    contentGaps: Array<{
      topic: string;
      opportunity: 'high' | 'medium' | 'low';
      reasoning: string;
    }>;
    publishingCadence: string;
  };
  
  // SEO strategy
  seo: {
    primaryKeywords: string[];
    longTailKeywords: string[];
    serpOpportunities: Array<{
      keyword: string;
      opportunity: string;
      difficulty: 'low' | 'medium' | 'high';
    }>;
    linkBuilding: {
      strategy: string;
      targets: string[];
    };
  };
  
  // Growth strategy
  growth: {
    channels: string[];
    tactics: Array<{
      tactic: string;
      priority: 'high' | 'medium' | 'low';
      reasoning: string;
    }>;
    milestones: Array<{
      goal: string;
      timeline: string;
      metrics: string[];
    }>;
  };
  
  // Wide moat opportunities
  wideMoat: {
    niches: Array<{
      niche: string;
      moat: string;
      competition: 'low' | 'medium' | 'high';
      opportunity: string;
    }>;
    defensibility: string[];
  };
  
  lastUpdated: Date;
}

let marketingPlan: MarketingPlan = {
  strategy: {
    positioning: 'BurnoutFIRE: Financial independence through intentional income reduction for high earners',
    targetAudience: ['Tech workers >$120k', 'Burned-out professionals', 'Parents seeking time', 'High earners optimizing life quality'],
    uniqueValueProposition: 'The only FIRE approach that acknowledges high income can cost too much in health and time',
    competitiveAdvantage: [
      'Focus on intentional income reduction (underserved niche)',
      'Dual income strategies (limited competitor coverage)',
      'Psychological safety of cash (contrarian angle)',
      'High earner specific (not generic FIRE advice)',
    ],
  },
  content: {
    pillarTopics: [
      'BurnoutFIRE definition and philosophy',
      'High income vs wealth',
      'Cash holdings rationale',
      'Intentional income reduction',
      'Dual income FIRE strategies',
    ],
    supportingTopics: [
      'True hourly rate calculations',
      'Stress cost analysis',
      'Pay cut decision frameworks',
      'Tax strategies for income reduction',
    ],
    contentGaps: [
      {
        topic: 'Intentional income reduction',
        opportunity: 'high',
        reasoning: 'Competitors focus on saving more, not earning less. This is a major gap.',
      },
      {
        topic: 'Dual income FIRE',
        opportunity: 'high',
        reasoning: 'Limited coverage of how dual income changes FIRE math and strategy.',
      },
      {
        topic: 'Cash holdings for high earners',
        opportunity: 'medium',
        reasoning: 'Most say cash is bad. Nuanced view for high earners is missing.',
      },
    ],
    publishingCadence: '2-3 posts per month initially, scaling to weekly',
  },
  seo: {
    primaryKeywords: [
      'burnoutfire',
      'intentional income reduction',
      'high income vs wealth',
      'cash holdings high earners',
    ],
    longTailKeywords: [
      'how to reduce income for better life',
      'dual income fire strategy',
      'high earners not wealthy',
      'too much cash rational',
    ],
    serpOpportunities: [
      {
        keyword: 'burnoutfire',
        opportunity: 'No featured snippet exists. Can capture with clear definition.',
        difficulty: 'low',
      },
      {
        keyword: 'intentional income reduction',
        opportunity: 'Very low competition, high search intent',
        difficulty: 'low',
      },
    ],
    linkBuilding: {
      strategy: 'Guest posts on FIRE blogs, engagement in communities, resource pages',
      targets: ['MrMoneyMustache comments', 'Financial Samurai', 'FIRE subreddits'],
    },
  },
  growth: {
    channels: [
      'Organic search (primary)',
      'Reddit/FIRE communities',
      'Email list',
      'Social media (Twitter/X)',
    ],
    tactics: [
      {
        tactic: 'Answer questions in FIRE communities',
        priority: 'high',
        reasoning: 'Build authority and backlinks naturally',
      },
      {
        tactic: 'Create comprehensive guides',
        priority: 'high',
        reasoning: 'Rank for long-tail keywords, establish expertise',
      },
      {
        tactic: 'Build email list with lead magnets',
        priority: 'medium',
        reasoning: 'Direct channel, higher conversion',
      },
    ],
    milestones: [
      {
        goal: '10 published posts',
        timeline: 'Month 2',
        metrics: ['Posts published', 'Average word count', 'Quality scores'],
      },
      {
        goal: '1000 monthly visitors',
        timeline: 'Month 4',
        metrics: ['Organic traffic', 'Top 10 rankings', 'Backlinks'],
      },
    ],
  },
  wideMoat: {
    niches: [
      {
        niche: 'BurnoutFIRE (intentional income reduction FIRE)',
        moat: 'First mover in this specific sub-niche',
        competition: 'low',
        opportunity: 'Define the category, become the authority',
      },
      {
        niche: 'Dual income FIRE strategies',
        moat: 'Limited competitor coverage, high search demand',
        competition: 'low',
        opportunity: 'Comprehensive coverage creates defensible position',
      },
      {
        niche: 'High earner FIRE (not generic)',
        moat: 'Specific to high earners, not one-size-fits-all',
        competition: 'medium',
        opportunity: 'Targeted content outperforms generic advice',
      },
    ],
    defensibility: [
      'First mover in BurnoutFIRE niche',
      'Deep expertise in high earner specific challenges',
      'Unique angle (intentional income reduction)',
      'Comprehensive content depth (beats competitors by 50%+)',
    ],
  },
  lastUpdated: new Date(),
};

/**
 * Get marketing plan
 */
export function getMarketingPlan(): MarketingPlan {
  return marketingPlan;
}

/**
 * Update marketing plan
 */
export function updateMarketingPlan(updates: Partial<MarketingPlan>): void {
  marketingPlan = {
    ...marketingPlan,
    ...updates,
    lastUpdated: new Date(),
  };
}

/**
 * Get wide moat analysis
 */
export function getWideMoatAnalysis(): string {
  const moats = marketingPlan.wideMoat.niches;
  
  let analysis = '# Wide Moat Opportunities\n\n';
  analysis += 'These niches have defensible competitive advantages:\n\n';
  
  moats.forEach((niche, i) => {
    analysis += `## ${i + 1}. ${niche.niche}\n\n`;
    analysis += `**Moat:** ${niche.moat}\n\n`;
    analysis += `**Competition:** ${niche.competition}\n\n`;
    analysis += `**Opportunity:** ${niche.opportunity}\n\n`;
  });
  
  analysis += '\n## Defensibility Factors\n\n';
  marketingPlan.wideMoat.defensibility.forEach(factor => {
    analysis += `- ${factor}\n`;
  });
  
  return analysis;
}
