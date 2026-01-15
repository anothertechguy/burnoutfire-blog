/**
 * Post Collection Utilities
 * Type-safe post loading, sorting, filtering, and related post calculation
 */

import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import { calculateReadingTime } from './seo';
import { getRelatedPosts } from './internalLinks';

/**
 * Get all published posts, sorted by date (newest first)
 */
export async function getAllPosts(): Promise<CollectionEntry<'posts'>[]> {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  
  // Sort by publish date, newest first
  return posts.sort((a, b) => 
    b.data.publishDate.getTime() - a.data.publishDate.getTime()
  );
}

/**
 * Get posts by category
 */
export async function getPostsByCategory(category: string): Promise<CollectionEntry<'posts'>[]> {
  const posts = await getAllPosts();
  return posts.filter(post => post.data.category === category);
}

/**
 * Get posts by tag
 */
export async function getPostsByTag(tag: string): Promise<CollectionEntry<'posts'>[]> {
  const posts = await getAllPosts();
  return posts.filter(post => post.data.tags.includes(tag));
}

/**
 * Get a single post by slug
 */
export async function getPostBySlug(slug: string): Promise<CollectionEntry<'posts'> | undefined> {
  const posts = await getAllPosts();
  return posts.find(post => post.slug === slug);
}

/**
 * Get related posts for a given post
 */
export async function getRelatedPostsForPost(
  post: CollectionEntry<'posts'>,
  limit: number = 3
): Promise<CollectionEntry<'posts'>[]> {
  const allPosts = await getAllPosts();
  return getRelatedPosts(post, allPosts, limit);
}

/**
 * Search posts by keyword (simple client-side search)
 */
export function searchPosts(
  posts: CollectionEntry<'posts'>[],
  query: string
): CollectionEntry<'posts'>[] {
  const lowerQuery = query.toLowerCase();
  
  return posts.filter(post => {
    const titleMatch = post.data.title.toLowerCase().includes(lowerQuery);
    const descriptionMatch = post.data.description.toLowerCase().includes(lowerQuery);
    const tagMatch = post.data.tags.some(tag => tag.toLowerCase().includes(lowerQuery));
    const keywordMatch = post.data.seo?.keywords?.some(kw => 
      kw.toLowerCase().includes(lowerQuery)
    );
    
    return titleMatch || descriptionMatch || tagMatch || keywordMatch;
  });
}

/**
 * Get posts with pagination
 */
export function getPaginatedPosts(
  posts: CollectionEntry<'posts'>[],
  page: number = 1,
  perPage: number = 10
): {
  posts: CollectionEntry<'posts'>[];
  totalPages: number;
  currentPage: number;
  hasNext: boolean;
  hasPrev: boolean;
} {
  const totalPages = Math.ceil(posts.length / perPage);
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  
  return {
    posts: posts.slice(startIndex, endIndex),
    totalPages,
    currentPage: page,
    hasNext: page < totalPages,
    hasPrev: page > 1,
  };
}

/**
 * Calculate and add reading time to post data
 */
export function addReadingTime(post: CollectionEntry<'posts'>): CollectionEntry<'posts'> & {
  data: CollectionEntry<'posts'>['data'] & { readTime: number };
} {
  const content = post.body;
  const readTime = calculateReadingTime(content);
  
  return {
    ...post,
    data: {
      ...post.data,
      readTime,
    },
  };
}

/**
 * Get all unique tags from all posts
 */
export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts();
  const tagSet = new Set<string>();
  
  posts.forEach(post => {
    post.data.tags.forEach(tag => tagSet.add(tag));
  });
  
  return Array.from(tagSet).sort();
}

/**
 * Get all unique categories from all posts
 */
export async function getAllCategories(): Promise<string[]> {
  const posts = await getAllPosts();
  const categorySet = new Set<string>();
  
  posts.forEach(post => {
    if (post.data.category) {
      categorySet.add(post.data.category);
    }
  });
  
  return Array.from(categorySet).sort();
}
