/**
 * RSS Parser
 * Parse RSS feeds to extract competitor content
 */

export interface RSSItem {
  title: string;
  link: string;
  description: string;
  pubDate?: Date;
  content?: string;
}

/**
 * Parse RSS feed XML
 */
export async function parseRSSFeed(url: string): Promise<RSSItem[]> {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; BurnoutFIRE Research Bot)',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch RSS: ${response.statusText}`);
    }
    
    const xml = await response.text();
    const items: RSSItem[] = [];
    
    // Simple XML parsing (in production, use a proper XML parser)
    const itemMatches = xml.matchAll(/<item[^>]*>([\s\S]*?)<\/item>/gi);
    
    for (const match of itemMatches) {
      const itemXml = match[1];
      
      const titleMatch = itemXml.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
      const linkMatch = itemXml.match(/<link[^>]*>([\s\S]*?)<\/link>/i);
      const descMatch = itemXml.match(/<description[^>]*>([\s\S]*?)<\/description>/i);
      const dateMatch = itemXml.match(/<pubDate[^>]*>([\s\S]*?)<\/pubDate>/i);
      
      if (titleMatch && linkMatch) {
        const title = cleanXmlText(titleMatch[1]);
        const link = cleanXmlText(linkMatch[1]);
        const description = descMatch ? cleanXmlText(descMatch[1]) : '';
        const pubDate = dateMatch ? new Date(cleanXmlText(dateMatch[1])) : undefined;
        
        items.push({
          title,
          link,
          description,
          pubDate,
        });
      }
    }
    
    return items.slice(0, 20); // Limit to 20 most recent
  } catch (error) {
    console.error(`Error parsing RSS feed ${url}:`, error);
    return [];
  }
}

/**
 * Clean XML text (remove CDATA, HTML tags, etc.)
 */
function cleanXmlText(text: string): string {
  return text
    .replace(/<!\[CDATA\[(.*?)\]\]>/gi, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

/**
 * Fetch and analyze post content
 */
export async function fetchPostContent(url: string): Promise<{
  content: string;
  wordCount: number;
  headings: string[];
}> {
  try {
    // In production, use a proper HTML parser and respect robots.txt
    // For now, return placeholder
    return {
      content: '',
      wordCount: 0,
      headings: [],
    };
  } catch (error) {
    console.error(`Error fetching post content ${url}:`, error);
    return {
      content: '',
      wordCount: 0,
      headings: [],
    };
  }
}
