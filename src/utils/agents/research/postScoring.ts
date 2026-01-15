/**
 * Post Scoring System
 * Scores posts by multiple metrics to identify all-time best performers
 * 
 * Based on industry best practices from tools like BuzzSumo, Ahrefs, SEMrush
 */

export interface PostMetrics {
  url: string;
  title: string;
  publishDate: Date;
  wordCount: number;
  socialShares?: {
    facebook?: number;
    twitter?: number;
    linkedin?: number;
    pinterest?: number;
    reddit?: number;
    total?: number;
  };
  backlinks?: {
    total: number;
    referringDomains: number;
    domainAuthority?: number;
  };
  traffic?: {
    estimatedMonthly: number;
    trend: 'up' | 'down' | 'stable';
  };
  engagement?: {
    comments?: number;
    timeOnPage?: number;
    bounceRate?: number;
  };
  serp?: {
    position?: number;
    keyword?: string;
    featuredSnippet?: boolean;
  };
}

export interface ScoredPost extends PostMetrics {
  compositeScore: number;
  scoreBreakdown: {
    shares: number;
    backlinks: number;
    traffic: number;
    engagement: number;
    longevity: number; // How long it's been performing
  };
  ranking: number;
}

/**
 * Scoring weights (configurable)
 * Based on what matters most for FIRE/finance content
 */
export const SCORING_WEIGHTS = {
  shares: 0.25,      // Social proof and virality
  backlinks: 0.30,   // Authority and SEO value
  traffic: 0.25,     // Actual reach
  engagement: 0.10,  // Quality signal
  longevity: 0.10,   // Evergreen value
};

/**
 * Normalize a value to 0-100 scale
 */
function normalize(value: number, max: number, min: number = 0): number {
  if (max === min) return 50; // Default middle score if no variation
  return Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
}

/**
 * Calculate longevity score
 * Older posts that still perform get higher scores
 */
function calculateLongevityScore(publishDate: Date, hasRecentTraffic: boolean): number {
  const ageInMonths = (Date.now() - publishDate.getTime()) / (1000 * 60 * 60 * 24 * 30);
  
  // Posts older than 12 months that still perform are evergreen
  if (ageInMonths > 12 && hasRecentTraffic) {
    return 100; // Maximum longevity score
  }
  
  // Posts 6-12 months old
  if (ageInMonths > 6) {
    return 75;
  }
  
  // Posts 3-6 months old
  if (ageInMonths > 3) {
    return 50;
  }
  
  // Recent posts
  return 25;
}

/**
 * Score a single post
 */
export function scorePost(post: PostMetrics, allPosts: PostMetrics[]): ScoredPost {
  // Calculate max values for normalization
  const maxShares = Math.max(...allPosts.map(p => p.socialShares?.total || 0), 1);
  const maxBacklinks = Math.max(...allPosts.map(p => p.backlinks?.total || 0), 1);
  const maxTraffic = Math.max(...allPosts.map(p => p.traffic?.estimatedMonthly || 0), 1);
  const maxComments = Math.max(...allPosts.map(p => p.engagement?.comments || 0), 1);
  
  // Normalize each metric
  const sharesScore = normalize(post.socialShares?.total || 0, maxShares);
  const backlinksScore = normalize(post.backlinks?.total || 0, maxBacklinks);
  const trafficScore = normalize(post.traffic?.estimatedMonthly || 0, maxTraffic);
  const engagementScore = normalize(post.engagement?.comments || 0, maxComments);
  const longevityScore = calculateLongevityScore(
    post.publishDate,
    (post.traffic?.estimatedMonthly || 0) > 0
  );
  
  // Calculate composite score
  const compositeScore = 
    (sharesScore * SCORING_WEIGHTS.shares) +
    (backlinksScore * SCORING_WEIGHTS.backlinks) +
    (trafficScore * SCORING_WEIGHTS.traffic) +
    (engagementScore * SCORING_WEIGHTS.engagement) +
    (longevityScore * SCORING_WEIGHTS.longevity);
  
  return {
    ...post,
    compositeScore,
    scoreBreakdown: {
      shares: sharesScore,
      backlinks: backlinksScore,
      traffic: trafficScore,
      engagement: engagementScore,
      longevity: longevityScore,
    },
    ranking: 0, // Will be set after sorting
  };
}

/**
 * Score and rank all posts
 * Returns top N posts sorted by composite score
 */
export function scoreAndRankPosts(
  posts: PostMetrics[],
  topN: number = 20
): ScoredPost[] {
  if (posts.length === 0) return [];
  
  // Score all posts
  const scoredPosts = posts.map(post => scorePost(post, posts));
  
  // Sort by composite score (descending)
  scoredPosts.sort((a, b) => b.compositeScore - a.compositeScore);
  
  // Assign rankings
  scoredPosts.forEach((post, index) => {
    post.ranking = index + 1;
  });
  
  // Return top N
  return scoredPosts.slice(0, topN);
}

/**
 * Get posts by time range
 */
export function filterPostsByTimeRange(
  posts: PostMetrics[],
  range: 'all-time' | '1-year' | '2-years' | '5-years'
): PostMetrics[] {
  const now = Date.now();
  let cutoffDate: number;
  
  switch (range) {
    case '1-year':
      cutoffDate = now - (365 * 24 * 60 * 60 * 1000);
      break;
    case '2-years':
      cutoffDate = now - (2 * 365 * 24 * 60 * 60 * 1000);
      break;
    case '5-years':
      cutoffDate = now - (5 * 365 * 24 * 60 * 60 * 1000);
      break;
    case 'all-time':
    default:
      return posts; // No filter
  }
  
  return posts.filter(post => post.publishDate.getTime() >= cutoffDate);
}
