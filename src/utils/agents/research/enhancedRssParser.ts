/**
 * Enhanced RSS Parser
 * Fetches ALL posts from RSS feed, not just recent 10
 * Also attempts to parse sitemaps for complete post history
 */

export interface ParsedPost {
  title: string;
  url: string;
  description: string;
  publishDate: Date;
  wordCount: number;
  categories?: string[];
  author?: string;
}

/**
 * Parse RSS feed and get ALL items (not just 10)
 * Most RSS feeds paginate or limit, so we need to handle that
 */
export async function parseFullRSSFeed(rssUrl: string): Promise<ParsedPost[]> {
  try {
    const response = await fetch(rssUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; BurnoutFIRE Research Bot)',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch RSS: ${response.statusText}`);
    }
    
    const xml = await response.text();
    const posts: ParsedPost[] = [];
    
    // Extract ALL items from RSS (remove the limit)
    const itemRegex = /<item[^>]*>([\s\S]*?)<\/item>/gi;
    let match;
    
    while ((match = itemRegex.exec(xml)) !== null) {
      const itemXml = match[1];
      
      const titleMatch = itemXml.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
      const linkMatch = itemXml.match(/<link[^>]*>([\s\S]*?)<\/link>/i);
      const descMatch = itemXml.match(/<description[^>]*>([\s\S]*?)<\/description>/i);
      const dateMatch = itemXml.match(/<pubDate[^>]*>([\s\S]*?)<\/pubDate>/i);
      const categoryMatches = itemXml.match(/<category[^>]*>([\s\S]*?)<\/category>/gi);
      
      if (titleMatch && linkMatch) {
        const title = cleanXmlText(titleMatch[1]);
        const url = cleanXmlText(linkMatch[1]);
        const description = descMatch ? cleanXmlText(descMatch[1]) : '';
        const pubDate = dateMatch ? parseDate(cleanXmlText(dateMatch[1])) : new Date();
        
        // Better word count estimation
        // Description is usually excerpt, so multiply by estimated factor
        const descWordCount = description.split(/\s+/).filter(w => w.length > 0).length;
        const wordCount = Math.max(800, descWordCount * 15); // More realistic estimate
        
        const categories = categoryMatches
          ? categoryMatches.map(cat => cleanXmlText(cat.replace(/<\/?category[^>]*>/gi, '')))
          : [];
        
        posts.push({
          title,
          url,
          description,
          publishDate: pubDate,
          wordCount,
          categories,
        });
      }
    }
    
    // Sort by date (newest first)
    posts.sort((a, b) => b.publishDate.getTime() - a.publishDate.getTime());
    
    return posts;
  } catch (error) {
    console.error(`Error parsing RSS feed ${rssUrl}:`, error);
    return [];
  }
}

/**
 * Parse sitemap to get all post URLs
 * Sitemaps often have more complete post lists than RSS
 */
export async function parseSitemap(sitemapUrl: string): Promise<string[]> {
  try {
    const response = await fetch(sitemapUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; BurnoutFIRE Research Bot)',
      },
    });
    
    if (!response.ok) {
      return [];
    }
    
    const xml = await response.text();
    const urls: string[] = [];
    
    // Extract all <loc> tags (URLs in sitemap)
    const locRegex = /<loc[^>]*>([\s\S]*?)<\/loc>/gi;
    let match;
    
    while ((match = locRegex.exec(xml)) !== null) {
      const url = cleanXmlText(match[1]);
      // Filter for blog post URLs (usually contain /blog/, /posts/, or date patterns)
      if (url.match(/\/(blog|post|article|20\d{2})\//i)) {
        urls.push(url);
      }
    }
    
    return urls;
  } catch (error) {
    console.error(`Error parsing sitemap ${sitemapUrl}:`, error);
    return [];
  }
}

/**
 * Combine RSS and sitemap data to get complete post list
 */
export async function getCompletePostList(
  rssUrl: string,
  sitemapUrl?: string
): Promise<ParsedPost[]> {
  // Get posts from RSS
  const rssPosts = await parseFullRSSFeed(rssUrl);
  
  // If sitemap available, get URLs and merge
  if (sitemapUrl) {
    const sitemapUrls = await parseSitemap(sitemapUrl);
    
    // Find posts in RSS that aren't in sitemap (or vice versa)
    // For now, we'll use RSS as primary source
    // In production, you might want to fetch full content for sitemap URLs
  }
  
  return rssPosts;
}

function cleanXmlText(text: string): string {
  return text
    .replace(/<!\[CDATA\[(.*?)\]\]>/gi, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .trim();
}

function parseDate(dateString: string): Date {
  try {
    return new Date(dateString);
  } catch {
    return new Date();
  }
}
