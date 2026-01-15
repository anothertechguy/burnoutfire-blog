/**
 * Site Configuration
 * Central configuration for the BurnoutFIRE blog platform
 */

export const SITE_CONFIG = {
  // Site metadata
  title: 'BurnoutFIRE',
  description: 'A sub-niche of FIRE for high earners who intentionally reduce income to regain health, time, and life satisfaction while pursuing financial independence.',
  author: {
    name: 'Anonymous',
    bio: 'Experienced professional who took a 50% pay cut to prioritize health, time, and life satisfaction while still pursuing financial independence.',
    location: 'Rocky Mountains',
  },
  
  // Site URLs
  url: 'https://burnoutfire.com', // Update with actual domain
  twitter: '@burnoutfire', // Update if you have Twitter
  
  // SEO defaults
  seo: {
    defaultTitle: 'BurnoutFIRE - Financial Independence Through Intentional Income Reduction',
    defaultDescription: 'For high earners who want to reduce stress, regain time, and achieve financial independence without the burnout.',
    defaultKeywords: ['burnoutfire', 'FIRE', 'financial independence', 'work-life balance', 'intentional income reduction'],
    ogImage: '/og-image.jpg', // Add OG image
  },
  
  // Brand positioning
  brand: {
    philosophy: 'Money is a tool to reduce stress, not maximize ego. Lower income + lower stress can outperform high income + burnout.',
    targetAudience: ['Tech workers & high earners (>$120k)', 'Burned-out professionals', 'Parents who want more time with kids', 'People optimizing life quality, not just net worth'],
    coreBeliefs: [
      'Money is a tool to reduce stress, not maximize ego',
      'Lower income + lower stress can outperform high income + burnout',
      'Cash holdings are acceptable for psychological safety',
      'Moderate spending on health, experiences, and time is encouraged',
    ],
  },
  
  // Content defaults
  content: {
    postsPerPage: 10,
    excerptLength: 160,
  },
} as const;

export type SiteConfig = typeof SITE_CONFIG;
