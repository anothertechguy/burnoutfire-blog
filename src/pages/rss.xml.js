import rss from '@astrojs/rss';
import { SITE_CONFIG } from '../config';
import { getAllPosts } from '../utils/posts';
import { generateCanonicalUrl } from '../utils/seo';

export async function GET(context) {
  const posts = await getAllPosts();
  
  return rss({
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    site: context.site || SITE_CONFIG.url,
    items: posts.map(post => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishDate,
      link: generateCanonicalUrl(`/posts/${post.slug}`),
    })),
    customData: `<language>en-us</language>`,
  });
}
