import { defineCollection, z } from 'astro:content';

/**
 * Content Collection Schema
 * Defines the structure for blog posts with SEO and monetization fields
 */

const postsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    // Basic post information
    title: z.string(),
    description: z.string(),
    slug: z.string().optional(), // Auto-generated from filename if not provided
    
    // Dates
    publishDate: z.date(),
    updatedDate: z.date().optional(),
    
    // Categorization
    tags: z.array(z.string()).default([]),
    category: z.string().optional(),
    
    // SEO
    seo: z.object({
      keywords: z.array(z.string()).default([]),
      metaDescription: z.string().optional(),
      canonicalUrl: z.string().optional(),
    }).optional(),
    
    // Internal linking
    relatedPosts: z.array(z.string()).default([]), // Array of post slugs
    
    // Content metrics (calculated)
    readTime: z.number().optional(), // Minutes
    
    // Monetization
    monetization: z.object({
      affiliateLinks: z.array(z.object({
        text: z.string(),
        url: z.string(),
        description: z.string().optional(),
      })).default([]),
      products: z.array(z.string()).default([]), // Product IDs or names
    }).optional(),
    
    // Research data (for agent system)
    research: z.object({
      competitorAnalysis: z.any().optional(),
      serpAnalysis: z.any().optional(),
      qualityScore: z.number().optional(),
    }).optional(),
    
    // Draft flag
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  posts: postsCollection,
};
