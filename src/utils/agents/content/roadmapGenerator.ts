/**
 * Content Roadmap Generator
 * Intelligently generates a chronological content roadmap
 * Based on competitor analysis, keyword research, and strategic sequencing
 */

import type { Topic } from '../types';

export interface RoadmapPost {
  id: string;
  title: string;
  keyword: string;
  category: 'pillar' | 'supporting' | 'tactical' | 'evergreen';
  priority: 'high' | 'medium' | 'low';
  targetWordCount: number;
  suggestedPublishDate: Date;
  dependencies: string[]; // IDs of posts that should come before this
  rationale: string;
  competitorGaps: string[];
  internalLinks: string[]; // IDs of posts to link to
  seoOpportunity: {
    competition: 'low' | 'medium' | 'high';
    searchVolume: 'low' | 'medium' | 'high';
    opportunity: 'high' | 'medium' | 'low';
  };
  status: 'draft' | 'planned' | 'in-progress' | 'published';
}

export interface ContentRoadmap {
  posts: RoadmapPost[];
  timeline: {
    thisMonth: RoadmapPost[];
    nextMonth: RoadmapPost[];
    nextQuarter: RoadmapPost[];
    backlog: RoadmapPost[];
  };
  strategy: {
    pillarPosts: number;
    supportingPosts: number;
    tacticalPosts: number;
    evergreenPosts: number;
  };
  generatedAt: Date;
}

/**
 * Generate intelligent content roadmap
 * 
 * @param competitorGaps - Content gaps identified from competitor analysis
 * @param existingPosts - Already published posts
 * @param userProfile - User profile for personalization
 */
export function generateContentRoadmap(
  competitorGaps: Array<{ topic: string; opportunity: 'high' | 'medium' | 'low'; reasoning: string }>,
  existingPosts: Array<{ id: string; title: string; category?: string }>,
  userProfile?: any
): ContentRoadmap {
  const now = new Date();
  const posts: RoadmapPost[] = [];
  
  // Generate posts from gaps
  competitorGaps.forEach((gap, index) => {
    if (gap.opportunity === 'high' || gap.opportunity === 'medium') {
      const post = createPostFromGap(gap, index, existingPosts);
      posts.push(post);
    }
  });
  
  // Add strategic pillar posts if missing
  const pillarPosts = posts.filter(p => p.category === 'pillar');
  if (pillarPosts.length < 5) {
    const additionalPillars = generateStrategicPillars(existingPosts);
    posts.push(...additionalPillars);
  }
  
  // Sort by priority and dependencies
  const sortedPosts = sortPostsByDependencies(posts);
  
  // Assign publish dates chronologically
  const postsWithDates = assignPublishDates(sortedPosts, now);
  
  // Build timeline
  const timeline = buildTimeline(postsWithDates, now);
  
  return {
    posts: postsWithDates,
    timeline,
    strategy: {
      pillarPosts: postsWithDates.filter(p => p.category === 'pillar').length,
      supportingPosts: postsWithDates.filter(p => p.category === 'supporting').length,
      tacticalPosts: postsWithDates.filter(p => p.category === 'tactical').length,
      evergreenPosts: postsWithDates.filter(p => p.category === 'evergreen').length,
    },
    generatedAt: now,
  };
}

function createPostFromGap(
  gap: { topic: string; opportunity: 'high' | 'medium' | 'low'; reasoning: string },
  index: number,
  existingPosts: Array<{ id: string; title: string; category?: string }>
): RoadmapPost {
  // Determine category based on topic
  const category = determineCategory(gap.topic);
  
  // Generate title and keyword
  const { title, keyword } = generateTitleAndKeyword(gap.topic);
  
  // Find related existing posts for internal linking
  const relatedPosts = findRelatedPosts(gap.topic, existingPosts);
  
  return {
    id: `post-${Date.now()}-${index}`,
    title,
    keyword,
    category,
    priority: gap.opportunity === 'high' ? 'high' : 'medium',
    targetWordCount: getTargetWordCount(category),
    suggestedPublishDate: new Date(), // Will be assigned later
    dependencies: [],
    rationale: gap.reasoning,
    competitorGaps: [gap.topic],
    internalLinks: relatedPosts.map(p => p.id),
    seoOpportunity: {
      competition: 'medium',
      searchVolume: 'medium',
      opportunity: gap.opportunity,
    },
    status: 'planned',
  };
}

function determineCategory(topic: string): 'pillar' | 'supporting' | 'tactical' | 'evergreen' {
  const topicLower = topic.toLowerCase();
  
  // Pillar topics are foundational
  if (topicLower.includes('fire') || topicLower.includes('burnout') || 
      topicLower.includes('income') || topicLower.includes('wealth')) {
    return 'pillar';
  }
  
  // Evergreen topics are timeless
  if (topicLower.includes('guide') || topicLower.includes('how to') || 
      topicLower.includes('strategy') || topicLower.includes('complete')) {
    return 'evergreen';
  }
  
  // Tactical topics are specific, quick wins
  if (topicLower.includes('quick') || topicLower.includes('tip') || 
      topicLower.includes('simple') || topicLower.includes('easy')) {
    return 'tactical';
  }
  
  // Default to supporting
  return 'supporting';
}

function generateTitleAndKeyword(topic: string): { title: string; keyword: string } {
  // Simple title generation - in production, use AI or templates
  const title = topic
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  const keyword = topic.toLowerCase().replace(/\s+/g, '-');
  
  return { title, keyword };
}

function getTargetWordCount(category: 'pillar' | 'supporting' | 'tactical' | 'evergreen'): number {
  switch (category) {
    case 'pillar':
      return 2500;
    case 'evergreen':
      return 2000;
    case 'supporting':
      return 1500;
    case 'tactical':
      return 1000;
  }
}

function findRelatedPosts(topic: string, existingPosts: Array<{ id: string; title: string }>): Array<{ id: string; title: string }> {
  const topicWords = topic.toLowerCase().split(' ');
  return existingPosts.filter(post => {
    const titleLower = post.title.toLowerCase();
    return topicWords.some(word => titleLower.includes(word));
  });
}

function generateStrategicPillars(existingPosts: Array<{ id: string; title: string }>): RoadmapPost[] {
  const strategicTopics = [
    { topic: 'CoastFIRE vs BurnoutFIRE', category: 'pillar' as const },
    { topic: 'The Real Cost of Burnout', category: 'pillar' as const },
    { topic: 'Dual Income FIRE Strategies', category: 'pillar' as const },
  ];
  
  return strategicTopics.map((topic, index) => ({
    id: `strategic-${Date.now()}-${index}`,
    title: topic.topic,
    keyword: topic.topic.toLowerCase().replace(/\s+/g, '-'),
    category: topic.category,
    priority: 'high' as const,
    targetWordCount: 2500,
    suggestedPublishDate: new Date(),
    dependencies: [],
    rationale: 'Strategic pillar post to establish authority',
    competitorGaps: [],
    internalLinks: [],
    seoOpportunity: {
      competition: 'medium',
      searchVolume: 'high',
      opportunity: 'high',
    },
    status: 'planned' as const,
  }));
}

function sortPostsByDependencies(posts: RoadmapPost[]): RoadmapPost[] {
  // Simple topological sort
  const sorted: RoadmapPost[] = [];
  const visited = new Set<string>();
  
  function visit(post: RoadmapPost) {
    if (visited.has(post.id)) return;
    
    // Visit dependencies first
    post.dependencies.forEach(depId => {
      const dep = posts.find(p => p.id === depId);
      if (dep) visit(dep);
    });
    
    visited.add(post.id);
    sorted.push(post);
  }
  
  // Sort by priority first, then visit
  const priorityOrder = { high: 0, medium: 1, low: 2 };
  posts.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  
  posts.forEach(visit);
  
  return sorted;
}

function assignPublishDates(posts: RoadmapPost[], startDate: Date): RoadmapPost[] {
  let currentDate = new Date(startDate);
  
  return posts.map((post, index) => {
    // Pillar posts: 2 weeks apart
    // Supporting: 1 week apart
    // Tactical: 3-4 days apart
    // Evergreen: 1 week apart
    
    let daysToAdd = 7; // Default
    
    if (post.category === 'pillar') {
      daysToAdd = 14;
    } else if (post.category === 'tactical') {
      daysToAdd = 4;
    }
    
    // Add buffer for first post
    if (index > 0) {
      currentDate = new Date(currentDate.getTime() + daysToAdd * 24 * 60 * 60 * 1000);
    }
    
    return {
      ...post,
      suggestedPublishDate: new Date(currentDate),
    };
  });
}

function buildTimeline(posts: RoadmapPost[], now: Date): ContentRoadmap['timeline'] {
  const thisMonth = posts.filter(p => {
    const postDate = p.suggestedPublishDate;
    const monthFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    return postDate >= now && postDate <= monthFromNow;
  });
  
  const nextMonth = posts.filter(p => {
    const postDate = p.suggestedPublishDate;
    const monthFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    const twoMonthsFromNow = new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000);
    return postDate > monthFromNow && postDate <= twoMonthsFromNow;
  });
  
  const nextQuarter = posts.filter(p => {
    const postDate = p.suggestedPublishDate;
    const twoMonthsFromNow = new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000);
    const threeMonthsFromNow = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000);
    return postDate > twoMonthsFromNow && postDate <= threeMonthsFromNow;
  });
  
  const backlog = posts.filter(p => {
    const postDate = p.suggestedPublishDate;
    const threeMonthsFromNow = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000);
    return postDate > threeMonthsFromNow;
  });
  
  return {
    thisMonth,
    nextMonth,
    nextQuarter,
    backlog,
  };
}
