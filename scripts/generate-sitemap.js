import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.resolve(rootDir, 'public');
const distDir = path.resolve(rootDir, 'dist');

// Definitive Route Taxonomy & Priority Strategy (Sorted chronologically for blogs)
const SITEMAP_CONFIG = [
  { url: '/', priority: '1.0', changefreq: 'daily' },
  
  // Hubs
  { url: '/services/', priority: '0.9', changefreq: 'weekly' },
  { url: '/locations/', priority: '0.85', changefreq: 'weekly' },
  
  // High-Intent Sub-Services
  { url: '/services/custom-wordpress-development/', priority: '0.9', changefreq: 'weekly' },
  { url: '/services/woocommerce-systems-architecture/', priority: '0.9', changefreq: 'weekly' },
  { url: '/services/ai-voice-agents/', priority: '0.9', changefreq: 'weekly' },
  { url: '/services/ai-chatbots-rag/', priority: '0.9', changefreq: 'weekly' },
  { url: '/services/workflow-automation-n8n/', priority: '0.9', changefreq: 'weekly' },
  { url: '/services/agentic-ai-applications/', priority: '0.9', changefreq: 'weekly' },
  { url: '/services/data-science-analytics/', priority: '0.9', changefreq: 'weekly' },
  { url: '/services/vibe-coding-engineering/', priority: '0.9', changefreq: 'weekly' },
  { url: '/services/custom-saas-mvp-development/', priority: '0.9', changefreq: 'weekly' },
  { url: '/services/ai-video-ads-ugc/', priority: '0.9', changefreq: 'weekly' },
  
  // Agency White-Label Portals
  { url: '/white-label/marketing-agencies/', priority: '0.9', changefreq: 'weekly' },
  { url: '/white-label/seo-agencies/', priority: '0.9', changefreq: 'weekly' },
  
  // Programmatic Regional GEO Pages
  { url: '/locations/usa/', priority: '0.8', changefreq: 'weekly' },
  { url: '/locations/uk/', priority: '0.8', changefreq: 'weekly' },
  { url: '/locations/germany/', priority: '0.8', changefreq: 'weekly' },
  { url: '/locations/canada/', priority: '0.8', changefreq: 'weekly' },
  { url: '/locations/uae/', priority: '0.8', changefreq: 'weekly' },
  { url: '/locations/saudi-arabia/', priority: '0.8', changefreq: 'weekly' },
  { url: '/locations/singapore/', priority: '0.8', changefreq: 'weekly' },
  { url: '/locations/malaysia/', priority: '0.8', changefreq: 'weekly' },
  { url: '/locations/australia/', priority: '0.8', changefreq: 'weekly' },
  { url: '/locations/netherlands/', priority: '0.8', changefreq: 'weekly' },
  
  // High-Trust Supporting Pages
  { url: '/case-studies/', priority: '0.7', changefreq: 'weekly' },

  // Systems & Utility Tools Suite
  { url: '/tools/', priority: '0.85', changefreq: 'weekly' },
  { url: '/tools/local-schema-generator/', priority: '0.85', changefreq: 'weekly' },
  { url: '/tools/wordpress-database-bloat-estimator/', priority: '0.85', changefreq: 'weekly' },
  { url: '/tools/wordpress-cpt-code-exporter/', priority: '0.85', changefreq: 'weekly' },
  { url: '/tools/voice-agent-roi-calculator/', priority: '0.85', changefreq: 'weekly' },
  { url: '/tools/ai-voice-prompt-designer/', priority: '0.85', changefreq: 'weekly' },
  { url: '/tools/webhook-payload-tester/', priority: '0.85', changefreq: 'weekly' },
  { url: '/tools/n8n-error-handler-generator/', priority: '0.85', changefreq: 'weekly' },
  { url: '/tools/llm-seo-meta-generator/', priority: '0.85', changefreq: 'weekly' },
  { url: '/tools/woocommerce-seo-sku-auditor/', priority: '0.85', changefreq: 'weekly' },
  { url: '/tools/wp-schema-jsonld-architect/', priority: '0.8', changefreq: 'weekly' },
  { url: '/tools/ai-voice-agent-flow-builder/', priority: '0.8', changefreq: 'weekly' },
  { url: '/tools/wp-database-query-profiler/', priority: '0.8', changefreq: 'weekly' },
  { url: '/tools/n8n-webhook-pipeline-simulator/', priority: '0.8', changefreq: 'weekly' },
  { url: '/tools/woocommerce-checkout-stress-engine/', priority: '0.8', changefreq: 'weekly' },
  { url: '/tools/rag-context-token-calculator/', priority: '0.8', changefreq: 'weekly' },
  { url: '/tools/php-hook-filter-conflict-matrix/', priority: '0.8', changefreq: 'weekly' },
  { url: '/tools/local-seo-nap-auditor/', priority: '0.8', changefreq: 'weekly' },
  { url: '/tools/tailwind-cwv-purge-analyzer/', priority: '0.8', changefreq: 'weekly' },
  { url: '/tools/agentic-ai-schema-validator/', priority: '0.8', changefreq: 'weekly' },

  // Engineering Blog & Deep Technical Pillar Guides (Newest to Oldest)
  { url: '/blog/', priority: '0.9', changefreq: 'weekly' },
  { url: '/blog/autonomous-ai-voice-telephony-sub-600ms-latency-enterprise/', priority: '0.85', changefreq: 'monthly' },
  { url: '/blog/php2shell-core-vulnerability-wordpress-hardening-guide/', priority: '0.85', changefreq: 'monthly' },
  { url: '/blog/decoupled-custom-wordpress-php-vip-architecture/', priority: '0.85', changefreq: 'monthly' },
  { url: '/blog/building-sub-600ms-conversational-ai-voice-agents-vapi-twilio/', priority: '0.85', changefreq: 'monthly' },
  { url: '/blog/scaling-woocommerce-hpos-10000-daily-orders-architecture/', priority: '0.85', changefreq: 'monthly' },
  { url: '/blog/self-hosted-n8n-production-clusters-vs-zapier-enterprise-automation/', priority: '0.85', changefreq: 'monthly' },
  { url: '/blog/production-rag-zero-hallucination-vector-architecture-hybrid-search/', priority: '0.85', changefreq: 'monthly' },
  { url: '/blog/generative-engine-optimization-geo-schema-knowledge-graphs-ai-search/', priority: '0.85', changefreq: 'monthly' },
  { url: '/blog/deterministic-agentic-ai-multi-agent-workflows-langgraph-python/', priority: '0.85', changefreq: 'monthly' },
  { url: '/blog/the-invisible-technical-partner-how-digital-agencies-scale-development/', priority: '0.85', changefreq: 'monthly' },
  { url: '/blog/eliminating-wordpress-database-bloat-autoload-optimization-security/', priority: '0.85', changefreq: 'monthly' },
  { url: '/blog/automating-b2b-executive-intelligence-event-driven-etl-pipelines-bi/', priority: '0.85', changefreq: 'monthly' },

  // Interactive 3D Code Arcade Gaming Arena
  { url: '/code-arcade/', priority: '0.9', changefreq: 'weekly' },

  { url: '/about/', priority: '0.7', changefreq: 'monthly' },
  { url: '/contact/', priority: '0.7', changefreq: 'monthly' },
  
  // Legal & Data Governance
  { url: '/privacy-policy/', priority: '0.6', changefreq: 'monthly' },
  { url: '/terms/', priority: '0.6', changefreq: 'monthly' }
];

export async function generateRssFeed() {
  const domain = 'https://sheharyarsiraj.com';
  let blogPosts = [];
  
  try {
    const { BLOG_POSTS } = await import('../src/data/blogData.ts');
    blogPosts = [...BLOG_POSTS].sort(
      (a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
    );
  } catch (err) {
    console.warn('Could not load BLOG_POSTS for RSS feed directly, using fallback.', err);
  }

  const itemsXml = blogPosts.map((post) => {
    const pubDate = new Date(`${post.publishedDate}T09:00:00+05:00`).toUTCString();
    const cleanExcerpt = post.excerpt.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const cleanTitle = post.title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return `    <item>
      <title>${cleanTitle}</title>
      <link>${domain}/blog/${post.slug}/</link>
      <guid isPermaLink="true">${domain}/blog/${post.slug}/</guid>
      <description>${cleanExcerpt}</description>
      <category>${post.category}</category>
      <pubDate>${pubDate}</pubDate>
      <author>sherryansari870@gmail.com (${post.author.name})</author>
    </item>`;
  }).join('\n');

  const rssContent = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Sheharyar Siraj | Systems Engineering &amp; AI Telephony Blog</title>
    <link>${domain}/blog/</link>
    <description>In-depth architectural guides on custom WordPress VIP engineering, low-latency AI voice telephony, WooCommerce HPOS scaling, and deterministic agentic AI.</description>
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${domain}/rss.xml" rel="self" type="application/rss+xml" />
${itemsXml}
  </channel>
</rss>
`;

  const publicRssPath = path.resolve(publicDir, 'rss.xml');
  fs.writeFileSync(publicRssPath, rssContent, 'utf-8');
  console.log(`✓ Generated RSS Feed at ${publicRssPath} (${blogPosts.length} items, newest first)`);

  const rootRssPath = path.resolve(rootDir, 'rss.xml');
  fs.writeFileSync(rootRssPath, rssContent, 'utf-8');
  console.log(`✓ Synchronized root RSS Feed at ${rootRssPath}`);

  if (fs.existsSync(distDir)) {
    const distRssPath = path.resolve(distDir, 'rss.xml');
    fs.writeFileSync(distRssPath, rssContent, 'utf-8');
    console.log(`✓ Mirrored RSS Feed to ${distRssPath}`);
  }
}

export function generateSitemap() {
  const currentDate = new Date().toISOString().split('T')[0];
  const domain = 'https://sheharyarsiraj.com';

  const urlsXml = SITEMAP_CONFIG.map(item => `  <url>
    <loc>${domain}${item.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`).join('\n');

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urlsXml}
</urlset>
`;

  const publicSitemapPath = path.resolve(publicDir, 'sitemap.xml');
  fs.writeFileSync(publicSitemapPath, xmlContent, 'utf-8');
  console.log(`✓ Generated XML Sitemap at ${publicSitemapPath} (${SITEMAP_CONFIG.length} routes)`);

  // Also keep root sitemap.xml synchronized
  const rootSitemapPath = path.resolve(rootDir, 'sitemap.xml');
  fs.writeFileSync(rootSitemapPath, xmlContent, 'utf-8');
  console.log(`✓ Synchronized root XML Sitemap at ${rootSitemapPath}`);

  // If dist exists, mirror it there as well
  if (fs.existsSync(distDir)) {
    const distSitemapPath = path.resolve(distDir, 'sitemap.xml');
    fs.writeFileSync(distSitemapPath, xmlContent, 'utf-8');
    console.log(`✓ Mirrored XML Sitemap to ${distSitemapPath}`);
  }
}

export async function generateFeeds() {
  generateSitemap();
  await generateRssFeed();
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  generateFeeds();
}
