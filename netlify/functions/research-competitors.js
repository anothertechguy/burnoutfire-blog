/**
 * Netlify Function: Research Competitors
 * 
 * This function runs competitor research via RSS feeds
 * Accessible at: /.netlify/functions/research-competitors
 */

const COMPETITORS = [
  {
    name: 'MrMoneyMustache',
    url: 'https://www.mrmoneymustache.com',
    rss: 'https://www.mrmoneymustache.com/feed/',
  },
  {
    name: 'Financial Samurai',
    url: 'https://www.financialsamurai.com',
    rss: 'https://www.financialsamurai.com/feed/',
  },
  {
    name: 'Go Curry Cracker',
    url: 'https://www.gocurrycracker.com',
    rss: 'https://www.gocurrycracker.com/feed/',
  },
  {
    name: 'Mad Fientist',
    url: 'https://www.madfientist.com',
    rss: 'https://www.madfientist.com/feed/',
  },
];

/**
 * Parse RSS feed
 */
async function parseRSSFeed(url) {
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
    const items = [];
    
    // Extract items from RSS
    const itemRegex = /<item[^>]*>([\s\S]*?)<\/item>/gi;
    let match;
    
    while ((match = itemRegex.exec(xml)) !== null && items.length < 10) {
      const itemXml = match[1];
      
      const titleMatch = itemXml.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
      const linkMatch = itemXml.match(/<link[^>]*>([\s\S]*?)<\/link>/i);
      const descMatch = itemXml.match(/<description[^>]*>([\s\S]*?)<\/description>/i);
      const dateMatch = itemXml.match(/<pubDate[^>]*>([\s\S]*?)<\/pubDate>/i);
      
      if (titleMatch && linkMatch) {
        const title = cleanXmlText(titleMatch[1]);
        const link = cleanXmlText(linkMatch[1]);
        const description = descMatch ? cleanXmlText(descMatch[1]) : '';
        const pubDate = dateMatch ? new Date(cleanXmlText(dateMatch[1])) : null;
        
        // Estimate word count from description (usually excerpt)
        const wordCount = description.split(/\s+/).filter(w => w.length > 0).length * 10; // Rough estimate
        
        items.push({
          title,
          url: link,
          description,
          wordCount: Math.max(500, wordCount), // Minimum estimate
          publishDate: pubDate,
        });
      }
    }
    
    return items;
  } catch (error) {
    console.error(`Error parsing RSS feed ${url}:`, error);
    return [];
  }
}

function cleanXmlText(text) {
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
 * Analyze posts and build profile
 */
function buildCompetitorProfile(competitor, posts) {
  if (posts.length === 0) {
    return null;
  }
  
  const avgWordCount = Math.round(
    posts.reduce((sum, p) => sum + p.wordCount, 0) / posts.length
  );
  
  // Extract topics from titles and descriptions
  const allText = posts.map(p => `${p.title} ${p.description}`).join(' ').toLowerCase();
  const topicKeywords = ['fire', 'retirement', 'savings', 'investing', 'income', 'wealth', 'financial'];
  const topics = topicKeywords.filter(keyword => allText.includes(keyword));
  
  // Identify gaps
  const gaps = [];
  if (!allText.includes('income reduction') && !allText.includes('pay cut')) {
    gaps.push('Intentional income reduction');
  }
  if (!allText.includes('dual income') && !allText.includes('two income')) {
    gaps.push('Dual income FIRE strategies');
  }
  if (!allText.includes('cash holdings') || allText.includes('too much cash')) {
    gaps.push('Nuanced cash holdings for high earners');
  }
  
  // Identify weaknesses
  const weaknesses = [];
  if (avgWordCount < 2000) {
    weaknesses.push('Shorter content (opportunity for deeper coverage)');
  }
  
  return {
    name: competitor.name,
    url: competitor.url,
    focus: competitor.focus || 'FIRE and personal finance',
    content: {
      averageWordCount: avgWordCount,
      averageReadability: 70, // Estimated
      commonTopics: topics,
      uniqueAngles: [],
      structure: {
        headingStyle: 'H2/H3 hierarchy',
        introStyle: 'Personal hook',
        conclusionStyle: 'Actionable takeaways',
      },
      tone: ['confident', 'direct'],
      strengths: ['Strong community', 'Established authority'],
      weaknesses,
    },
    seo: {
      keywordStrategy: topics,
      internalLinking: 3,
      updateFrequency: 'weekly',
      backlinkProfile: 'strong',
    },
    audience: {
      primary: ['FIRE enthusiasts', 'Early retirees'],
      secondary: ['Personal finance readers'],
      engagement: 'high',
    },
    opportunities: {
      gaps,
      weaknesses,
      angles: ['Intentional income reduction', 'Dual income strategies'],
    },
    lastAnalyzed: new Date().toISOString(),
    samplePosts: posts.slice(0, 5).map(post => ({
      title: post.title,
      url: post.url,
      wordCount: post.wordCount,
      topics: topics.slice(0, 3),
    })),
  };
}

/**
 * Run competitor research
 */
async function runCompetitorResearch() {
  const profiles = [];
  
  for (const competitor of COMPETITORS) {
    try {
      console.log(`Researching ${competitor.name}...`);
      
      if (competitor.rss) {
        const posts = await parseRSSFeed(competitor.rss);
        if (posts.length > 0) {
          const profile = buildCompetitorProfile(competitor, posts);
          if (profile) {
            profiles.push(profile);
          }
        }
      }
    } catch (error) {
      console.error(`Error researching ${competitor.name}:`, error);
    }
  }
  
  return profiles;
}

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  };
  
  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }
  
  try {
    const competitor = event.queryStringParameters?.competitor;
    
    if (competitor) {
      // Research specific competitor
      const allProfiles = await runCompetitorResearch();
      const profile = allProfiles.find(p => p.name === competitor);
      
      if (!profile) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({
            success: false,
            error: 'Competitor not found',
          }),
        };
      }
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          profile,
        }),
      };
    }
    
    // Research all competitors
    const profiles = await runCompetitorResearch();
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        profiles: profiles.map(p => ({
          name: p.name,
          averageWordCount: p.content.averageWordCount,
          gaps: p.opportunities.gaps,
          weaknesses: p.content.weaknesses,
          samplePosts: p.samplePosts,
          lastAnalyzed: p.lastAnalyzed,
        })),
        count: profiles.length,
      }),
    };
  } catch (error) {
    console.error('Research error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: error.message || 'Unknown error',
        details: error.stack,
      }),
    };
  }
};
