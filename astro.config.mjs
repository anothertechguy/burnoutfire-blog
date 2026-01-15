import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [
    mdx(),
    tailwind({
      applyBaseStyles: false, // We'll handle base styles in global.css
    }),
  ],
  output: 'hybrid', // Hybrid mode: static pages + API routes in dev
  // API routes work in dev mode, static build for production
  site: 'https://burnoutfire.com', // Update with actual domain
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
    },
  },
});
