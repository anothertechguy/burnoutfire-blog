/**
 * Competitor Configuration
 * List of competitors to analyze and benchmark against
 */

export const COMPETITORS = {
  primary: [
    {
      name: 'MrMoneyMustache',
      url: 'https://www.mrmoneymustache.com',
      focus: 'FIRE philosophy, early retirement, frugality',
      rss: 'https://www.mrmoneymustache.com/feed/',
    },
    {
      name: 'Financial Samurai',
      url: 'https://www.financialsamurai.com',
      focus: 'High income FIRE, wealth building, career',
      rss: 'https://www.financialsamurai.com/feed/',
    },
    {
      name: 'Go Curry Cracker',
      url: 'https://www.gocurrycracker.com',
      focus: 'Early retirement, travel, expat FIRE',
      rss: 'https://www.gocurrycracker.com/feed/',
    },
    {
      name: 'Mad Fientist',
      url: 'https://www.madfientist.com',
      focus: 'Financial independence, tax optimization',
      rss: 'https://www.madfientist.com/feed/',
    },
  ],
  secondary: [
    {
      name: 'Early Retirement Now',
      url: 'https://earlyretirementnow.com',
      focus: 'Early retirement math, safe withdrawal rates',
    },
    {
      name: 'Root of Good',
      url: 'https://rootofgood.com',
      focus: 'Early retirement, family FIRE',
    },
  ],
  analysisDepth: {
    topPages: 20, // Analyze top 20 ranking pages per keyword
    contentDepth: 'deep' as const, // Deep analysis vs surface-level
    updateFrequency: 'monthly' as const, // How often to re-analyze
  },
} as const;

export type Competitor = typeof COMPETITORS.primary[number];
