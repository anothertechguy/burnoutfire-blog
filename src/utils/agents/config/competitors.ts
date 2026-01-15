/**
 * Competitor Configuration
 * List of competitors to analyze and benchmark against
 * Expanded with more FIRE/financial independence blogs
 */

export const COMPETITORS = {
  primary: [
    {
      name: 'MrMoneyMustache',
      url: 'https://www.mrmoneymustache.com',
      focus: 'FIRE philosophy, early retirement, frugality',
      rss: 'https://www.mrmoneymustache.com/feed/',
      sitemap: 'https://www.mrmoneymustache.com/sitemap.xml',
      tone: 'direct, confident, witty, contrarian',
      established: 2011,
    },
    {
      name: 'Financial Samurai',
      url: 'https://www.financialsamurai.com',
      focus: 'High income FIRE, wealth building, career',
      rss: 'https://www.financialsamurai.com/feed/',
      sitemap: 'https://www.financialsamurai.com/sitemap.xml',
      tone: 'analytical, data-driven, career-focused',
      established: 2009,
    },
    {
      name: 'Go Curry Cracker',
      url: 'https://www.gocurrycracker.com',
      focus: 'Early retirement, travel, expat FIRE',
      rss: 'https://www.gocurrycracker.com/feed/',
      sitemap: 'https://www.gocurrycracker.com/sitemap.xml',
      tone: 'adventurous, practical, travel-focused',
      established: 2011,
    },
    {
      name: 'Mad Fientist',
      url: 'https://www.madfientist.com',
      focus: 'Financial independence, tax optimization',
      rss: 'https://www.madfientist.com/feed/',
      sitemap: 'https://www.madfientist.com/sitemap.xml',
      tone: 'technical, optimization-focused, analytical',
      established: 2011,
    },
    {
      name: 'Early Retirement Now',
      url: 'https://earlyretirementnow.com',
      focus: 'Early retirement math, safe withdrawal rates',
      rss: 'https://earlyretirementnow.com/feed/',
      sitemap: 'https://earlyretirementnow.com/sitemap.xml',
      tone: 'academic, data-heavy, research-focused',
      established: 2016,
    },
    {
      name: 'Root of Good',
      url: 'https://rootofgood.com',
      focus: 'Early retirement, family FIRE',
      rss: 'https://rootofgood.com/feed/',
      sitemap: 'https://rootofgood.com/sitemap.xml',
      tone: 'family-focused, practical, relatable',
      established: 2013,
    },
    {
      name: 'ChooseFI',
      url: 'https://www.choosefi.com',
      focus: 'Financial independence community, podcast',
      rss: 'https://www.choosefi.com/feed/',
      sitemap: 'https://www.choosefi.com/sitemap.xml',
      tone: 'community-focused, educational, accessible',
      established: 2016,
    },
    {
      name: 'The Frugalwoods',
      url: 'https://www.frugalwoods.com',
      focus: 'Frugality, homesteading, FIRE journey',
      rss: 'https://www.frugalwoods.com/feed/',
      sitemap: 'https://www.frugalwoods.com/sitemap.xml',
      tone: 'homesteading, frugal, lifestyle-focused',
      established: 2014,
    },
    {
      name: 'Our Next Life',
      url: 'https://ournextlife.com',
      focus: 'Early retirement planning, lifestyle design',
      rss: 'https://ournextlife.com/feed/',
      sitemap: 'https://ournextlife.com/sitemap.xml',
      tone: 'thoughtful, planning-focused, introspective',
      established: 2015,
    },
    {
      name: 'Millennial Revolution',
      url: 'https://www.millennial-revolution.com',
      focus: 'FIRE for millennials, travel, early retirement',
      rss: 'https://www.millennial-revolution.com/feed/',
      sitemap: 'https://www.millennial-revolution.com/sitemap.xml',
      tone: 'millennial-focused, travel, contrarian',
      established: 2015,
    },
  ],
  secondary: [
    {
      name: 'Physician on FIRE',
      url: 'https://www.physicianonfire.com',
      focus: 'Physician FIRE, high income strategies',
      rss: 'https://www.physicianonfire.com/feed/',
    },
    {
      name: 'White Coat Investor',
      url: 'https://www.whitecoatinvestor.com',
      focus: 'Physician finance, high income investing',
      rss: 'https://www.whitecoatinvestor.com/feed/',
    },
    {
      name: 'BiggerPockets',
      url: 'https://www.biggerpockets.com',
      focus: 'Real estate investing, FIRE',
      rss: 'https://www.biggerpockets.com/blog/feed',
    },
  ],
  analysisDepth: {
    topPages: 50, // Analyze top 50 ranking pages per keyword (increased)
    contentDepth: 'deep' as const,
    updateFrequency: 'weekly' as const, // More frequent updates
    historicalWindow: 'all-time' as const, // Analyze all-time best, not just recent
    metrics: ['traffic', 'backlinks', 'shares', 'engagement'] as const,
  },
} as const;

export type Competitor = typeof COMPETITORS.primary[number];
