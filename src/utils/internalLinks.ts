/**
 * Internal Linking Engine
 * Automatically links to related posts based on keywords and tags
 */

import type { CollectionEntry } from 'astro:content';
import { getCollection } from 'astro:content';

export interface InternalLink {
  text: string;
  slug: string;
  url: string;
}

export interface LinkOpportunity {
  keyword: string;
  postSlug: string;
  postTitle: string;
  context: string; // Surrounding text
  position: number; // Character position in content
}

/**
 * Find internal linking opportunities in content
 */
export function findLinkOpportunities(
  content: string,
  allPosts: CollectionEntry<'posts'>[],
  currentPostSlug: string
): LinkOpportunity[] {
  const opportunities: LinkOpportunity[] = [];
  
  // Get all posts except current one
  const otherPosts = allPosts.filter(post => post.slug !== currentPostSlug);
  
  // For each post, check if its keywords/tags appear in content
  for (const post of otherPosts) {
    const keywords = [
      ...(post.data.seo?.keywords || []),
      ...post.data.tags,
      ...post.data.title.split(/\s+/).filter(word => word.length > 4), // Extract meaningful words from title
    ];
    
    for (const keyword of keywords) {
      // Create case-insensitive regex
      const regex = new RegExp(`\\b${escapeRegex(keyword)}\\b`, 'gi');
      const matches = [...content.matchAll(regex)];
      
      for (const match of matches) {
        if (match.index !== undefined) {
          // Get context (50 chars before and after)
          const start = Math.max(0, match.index - 50);
          const end = Math.min(content.length, match.index + match[0].length + 50);
          const context = content.substring(start, end);
          
          opportunities.push({
            keyword,
            postSlug: post.slug,
            postTitle: post.data.title,
            context,
            position: match.index,
          });
        }
      }
    }
  }
  
  // Sort by position
  return opportunities.sort((a, b) => a.position - b.position);
}

/**
 * Apply internal links to content (returns HTML with links)
 */
export function applyInternalLinks(
  content: string,
  opportunities: LinkOpportunity[],
  maxLinks: number = 3 // Maximum links per 1000 words
): string {
  const wordCount = content.split(/\s+/).length;
  const maxLinksForContent = Math.ceil((wordCount / 1000) * maxLinks);
  
  // Limit opportunities to avoid over-linking
  const limitedOpportunities = opportunities.slice(0, maxLinksForContent);
  
  // Sort by position in reverse to avoid index shifting issues
  const sorted = [...limitedOpportunities].sort((a, b) => b.position - a.position);
  
  let result = content;
  
  for (const opp of sorted) {
    const regex = new RegExp(`\\b${escapeRegex(opp.keyword)}\\b`, 'i');
    const url = `/posts/${opp.postSlug}`;
    const link = `<a href="${url}" class="internal-link">${opp.keyword}</a>`;
    
    // Replace first occurrence only
    result = result.replace(regex, link);
  }
  
  return result;
}

/**
 * Get related posts based on tags and keywords
 */
export function getRelatedPosts(
  currentPost: CollectionEntry<'posts'>,
  allPosts: CollectionEntry<'posts'>[],
  limit: number = 3
): CollectionEntry<'posts'>[] {
  const currentTags = currentPost.data.tags;
  const currentKeywords = currentPost.data.seo?.keywords || [];
  const allKeywords = [...currentTags, ...currentKeywords];
  
  // Score each post based on tag/keyword overlap
  const scored = allPosts
    .filter(post => post.slug !== currentPost.slug && !post.data.draft)
    .map(post => {
      const postTags = post.data.tags;
      const postKeywords = post.data.seo?.keywords || [];
      const postAllKeywords = [...postTags, ...postKeywords];
      
      // Calculate overlap score
      const overlap = allKeywords.filter(kw => 
        postAllKeywords.some(pk => 
          pk.toLowerCase().includes(kw.toLowerCase()) || 
          kw.toLowerCase().includes(pk.toLowerCase())
        )
      ).length;
      
      return {
        post,
        score: overlap,
      };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.post);
  
  return scored;
}

/**
 * Escape special regex characters
 */
function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Build internal link graph for all posts
 */
export async function buildLinkGraph(): Promise<Map<string, string[]>> {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  const graph = new Map<string, string[]>();
  
  for (const post of posts) {
    const related = getRelatedPosts(post, posts, 5);
    graph.set(post.slug, related.map(p => p.slug));
  }
  
  return graph;
}
