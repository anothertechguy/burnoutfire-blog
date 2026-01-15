/**
 * SEO Utilities
 * Helper functions for generating SEO metadata, canonical URLs, and sitemaps
 */

import type { CollectionEntry } from 'astro:content';
import { SITE_CONFIG } from '../config';

export interface SEOData {
  title: string;
  description: string;
  canonicalUrl?: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
}

/**
 * Generate page title with site name
 */
export function generateTitle(pageTitle?: string): string {
  if (pageTitle) {
    return `${pageTitle} | ${SITE_CONFIG.title}`;
  }
  return SITE_CONFIG.seo.defaultTitle;
}

/**
 * Generate meta description
 */
export function generateDescription(description?: string): string {
  return description || SITE_CONFIG.seo.defaultDescription;
}

/**
 * Generate canonical URL
 */
export function generateCanonicalUrl(path: string): string {
  const baseUrl = SITE_CONFIG.url.replace(/\/$/, '');
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
}

/**
 * Generate SEO data for a blog post
 */
export function generatePostSEO(post: CollectionEntry<'posts'> & { data: { readTime?: number } }): SEOData {
  const canonicalUrl = generateCanonicalUrl(`/posts/${post.slug}`);
  
  return {
    title: generateTitle(post.data.title),
    description: post.data.seo?.metaDescription || post.data.description || generateDescription(),
    canonicalUrl,
    keywords: post.data.seo?.keywords || SITE_CONFIG.seo.defaultKeywords,
    ogImage: `${SITE_CONFIG.url}${SITE_CONFIG.seo.ogImage}`,
    ogType: 'article',
    publishedTime: post.data.publishDate.toISOString(),
    modifiedTime: post.data.updatedDate?.toISOString(),
    author: SITE_CONFIG.author.name,
  };
}

/**
 * Generate sitemap entries for posts
 */
export function generateSitemapEntries(posts: CollectionEntry<'posts'>[]): Array<{
  url: string;
  lastmod: string;
  changefreq: string;
  priority: number;
}> {
  return posts
    .filter(post => !post.data.draft)
    .map(post => ({
      url: generateCanonicalUrl(`/posts/${post.slug}`),
      lastmod: post.data.updatedDate?.toISOString() || post.data.publishDate.toISOString(),
      changefreq: 'monthly' as const,
      priority: 0.8,
    }));
}

/**
 * Calculate reading time in minutes
 */
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}
