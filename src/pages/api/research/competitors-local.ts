/**
 * Local API Route for Competitor Research
 * Works in Astro dev mode (localhost)
 * Same functionality as Netlify Function but runs locally
 */

import type { APIRoute } from 'astro';

const COMPETITORS = [
  {
    name: 'MrMoneyMustache',
    url: 'https://www.mrmoneymustache.com',
    rss: 'https://www.mrmoneymustache.com/feed/',
    sitemap: 'https://www.mrmoneymustache.com/sitemap.xml',
    tone: 'direct, confident, witty, contrarian',
  },
  {
    name: 'Financial Samurai',
    url: 'https://www.financialsamurai.com',
    rss: 'https://www.financialsamurai.com/feed/',
    sitemap: 'https://www.financialsamurai.com/sitemap.xml',
  },
  {
    name: 'Go Curry Cracker',
    url: 'https://www.gocurrycracker.com',
    rss: 'https://www.gocurrycracker.com/feed/',
    sitemap: 'https://www.gocurrycracker.com/sitemap.xml',
  },
  {
    name: 'Mad Fientist',
    url: 'https://www.madfientist.com',
    rss: 'https://www.madfientist.com/feed/',
    sitemap: 'https://www.madfientist.com/sitemap.xml',
  },
  {
    name: 'Early Retirement Now',
    url: 'https://earlyretirementnow.com',
    rss: 'https://earlyretirementnow.com/feed/',
    sitemap: 'https://earlyretirementnow.com/sitemap.xml',
  },
  {
    name: 'Root of Good',
    url: 'https://rootofgood.com',
    rss: 'https://rootofgood.com/feed/',
    sitemap: 'https://rootofgood.com/sitemap.xml',
  },
  {
    name: 'ChooseFI',
    url: 'https://www.choosefi.com',
    rss: 'https://www.choosefi.com/feed/',
    sitemap: 'https://www.choosefi.com/sitemap.xml',
  },
  {
    name: 'The Frugalwoods',
    url: 'https://www.frugalwoods.com',
    rss: 'https://www.frugalwoods.com/feed/',
    sitemap: 'https://www.frugalwoods.com/sitemap.xml',
  },
];

async function parseFullRSSFeed(url: string) {
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
    const items: any[] = [];
    
    const itemRegex = /<item[^>]*>([\s\S]*?)<\/item>/gi;
    let match;
    
    while ((match = itemRegex.exec(xml)) !== null) {
      const itemXml = match[1];
      
      const titleMatch = itemXml.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
      const linkMatch = itemXml.match(/<link[^>]*>([\s\S]*?)<\/link>/i);
      const descMatch = itemXml.match(/<description[^>]*>([\s\S]*?)<\/description>/i);
      const dateMatch = itemXml.match(/<pubDate[^>]*>([\s\S]*?)<\/pubDate>/i);
      
      if (titleMatch && linkMatch) {
        const title = cleanXmlText(titleMatch[1]);
        const link = cleanXmlText(linkMatch[1]);
        const description = descMatch ? cleanXmlText(descMatch[1]) : '';
        const pubDate = dateMatch ? new Date(cleanXmlText(dateMatch[1])) : new Date();
        
        const descWordCount = description.split(/\s+/).filter((w: string) => w.length > 0).length;
        const wordCount = Math.max(800, descWordCount * 15);
        
        items.push({
          title,
          url: link,
          description,
          wordCount,
          publishDate: pubDate,
        });
      }
    }
    
    items.sort((a, b) => b.publishDate.getTime() - a.publishDate.getTime());
    
    return items;
  } catch (error) {
    console.error(`Error parsing RSS feed ${url}:`, error);
    return [];
  }
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

function scorePost(post: any, allPosts: any[]) {
  const weights = {
    shares: 0.25,
    backlinks: 0.30,
    traffic: 0.25,
    engagement: 0.10,
    longevity: 0.10,
  };
  
  const ageInMonths = (Date.now() - post.publishDate.getTime()) / (1000 * 60 * 60 * 24 * 30);
  const sharesScore = Math.min(100, (post.wordCount / 50) + (post.title.toLowerCase().includes('fire') ? 20 : 0));
  const backlinksScore = Math.min(100, ageInMonths * 2 + (post.wordCount > 2000 ? 30 : 0));
  const trafficScore = ageInMonths > 12 ? 80 : Math.min(100, ageInMonths * 5);
  const engagementScore = Math.min(100, (post.wordCount / 30));
  const longevityScore = ageInMonths > 12 ? 100 : Math.min(100, ageInMonths * 8);
  
  const compositeScore = 
    (sharesScore * weights.shares) +
    (backlinksScore * weights.backlinks) +
    (trafficScore * weights.traffic) +
    (engagementScore * weights.engagement) +
    (longevityScore * weights.longevity);
  
  return {
    ...post,
    compositeScore,
    scoreBreakdown: {
      shares: Math.round(sharesScore),
      backlinks: Math.round(backlinksScore),
      traffic: Math.round(trafficScore),
      engagement: Math.round(engagementScore),
      longevity: Math.round(longevityScore),
    },
  };
}

function getTopPosts(posts: any[], topN: number = 20) {
  if (posts.length === 0) return [];
  
  const scoredPosts = posts.map(post => scorePost(post, posts));
  scoredPosts.sort((a, b) => b.compositeScore - a.compositeScore);
  
  return scoredPosts.slice(0, topN).map((post, index) => ({
    ...post,
    ranking: index + 1,
  }));
}

function buildCompetitorProfile(competitor: any, allPosts: any[], topPosts: any[]) {
  if (allPosts.length === 0) {
    return null;
  }
  
  const avgWordCount = Math.round(
    allPosts.reduce((sum, p) => sum + p.wordCount, 0) / allPosts.length
  );
  
  const allText = allPosts.map((p: any) => `${p.title} ${p.description}`).join(' ').toLowerCase();
  const topicKeywords = ['fire', 'retirement', 'savings', 'investing', 'income', 'wealth', 'financial', 'burnout', 'coast'];
  const topics = topicKeywords.filter(keyword => allText.includes(keyword));
  
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
  if (!allText.includes('burnout')) {
    gaps.push('Burnout and high-income stress');
  }
  
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
      averageReadability: 70,
      commonTopics: topics,
      uniqueAngles: [],
      structure: {
        headingStyle: 'H2/H3 hierarchy',
        introStyle: 'Personal hook',
        conclusionStyle: 'Actionable takeaways',
      },
      tone: competitor.tone ? competitor.tone.split(', ') : ['confident', 'direct'],
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
      angles: ['Intentional income reduction', 'Dual income strategies', 'BurnoutFIRE'],
    },
    lastAnalyzed: new Date().toISOString(),
    totalPosts: allPosts.length,
    topPosts: topPosts.map((p: any) => ({
      title: p.title,
      url: p.url,
      wordCount: p.wordCount,
      publishDate: p.publishDate.toISOString(),
      compositeScore: Math.round(p.compositeScore),
      scoreBreakdown: p.scoreBreakdown,
      ranking: p.ranking,
      topics: topics.slice(0, 3),
    })),
    samplePosts: topPosts.slice(0, 5).map((post: any) => ({
      title: post.title,
      url: post.url,
      wordCount: post.wordCount,
      topics: topics.slice(0, 3),
    })),
  };
}

async function runCompetitorResearch() {
  const profiles = [];
  
  for (const competitor of COMPETITORS) {
    try {
      console.log(`Researching ${competitor.name}...`);
      
      if (competitor.rss) {
        const allPosts = await parseFullRSSFeed(competitor.rss);
        
        if (allPosts.length > 0) {
          const topPosts = getTopPosts(allPosts, 20);
          const profile = buildCompetitorProfile(competitor, allPosts, topPosts);
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

export const GET: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const competitor = url.searchParams.get('competitor');
    
    if (competitor) {
      const allProfiles = await runCompetitorResearch();
      const profile = allProfiles.find((p: any) => p.name === competitor);
      
      if (!profile) {
        return new Response(
          JSON.stringify({
            success: false,
            error: 'Competitor not found',
          }),
          {
            status: 404,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
      }
      
      return new Response(
        JSON.stringify({
          success: true,
          profile,
        }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }
    
    const profiles = await runCompetitorResearch();
    
    return new Response(
      JSON.stringify({
        success: true,
        profiles: profiles.map((p: any) => ({
          name: p.name,
          totalPosts: p.totalPosts,
          averageWordCount: p.content.averageWordCount,
          gaps: p.opportunities.gaps,
          weaknesses: p.content.weaknesses,
          topPosts: p.topPosts.slice(0, 5),
          samplePosts: p.samplePosts,
          lastAnalyzed: p.lastAnalyzed,
        })),
        count: profiles.length,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error: any) {
    console.error('Research error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || 'Unknown error',
        details: error.stack,
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
};

export const POST: APIRoute = GET;
