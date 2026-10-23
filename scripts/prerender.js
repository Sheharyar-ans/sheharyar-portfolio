import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const templatePath = path.resolve(distDir, 'index.html');
const serverEntryPath = path.resolve(distDir, 'server', 'entry-server.js');

async function prerender() {
  console.log('🚀 Starting Static Site Generation (SSG) Pre-render Pipeline...\n');

  if (!fs.existsSync(templatePath)) {
    console.error(`Error: Base template not found at ${templatePath}`);
    process.exit(1);
  }

  if (!fs.existsSync(serverEntryPath)) {
    console.error(`Error: Server entry bundle not found at ${serverEntryPath}`);
    process.exit(1);
  }

  const baseTemplate = fs.readFileSync(templatePath, 'utf-8');
  const { render, getRouteMetadata, ROUTES } = await import(pathToFileURL(serverEntryPath).href);

  console.log(`Found ${ROUTES.length} routes to statically pre-render:\n`);

  for (const route of ROUTES) {
    try {
      const { html } = render(route);
      const meta = getRouteMetadata(route);

      // Inject title
      let pageHtml = baseTemplate.replace(
        /<title>[\s\S]*?<\/title>/i,
        `<title>${meta.title}</title>`
      );

      // Inject meta description
      if (pageHtml.includes('name="description"')) {
        pageHtml = pageHtml.replace(
          /<meta\s+name="description"\s+content="[\s\S]*?"\s*\/?>/i,
          `<meta name="description" content="${meta.description.replace(/"/g, '&quot;')}" />`
        );
      } else {
        pageHtml = pageHtml.replace('</head>', `  <meta name="description" content="${meta.description.replace(/"/g, '&quot;')}" />\n</head>`);
      }

      // Inject canonical URL
      if (pageHtml.includes('rel="canonical"')) {
        pageHtml = pageHtml.replace(
          /<link\s+rel="canonical"\s+href="[\s\S]*?"\s*\/?>/i,
          `<link rel="canonical" href="${meta.canonical}" />`
        );
      } else {
        pageHtml = pageHtml.replace('</head>', `  <link rel="canonical" href="${meta.canonical}" />\n</head>`);
      }

      // Inject Open Graph tags
      pageHtml = pageHtml.replace(
        /<meta\s+property="og:title"\s+content="[\s\S]*?"\s*\/?>/i,
        `<meta property="og:title" content="${meta.title.replace(/"/g, '&quot;')}" />`
      );
      pageHtml = pageHtml.replace(
        /<meta\s+property="og:description"\s+content="[\s\S]*?"\s*\/?>/i,
        `<meta property="og:description" content="${meta.description.replace(/"/g, '&quot;')}" />`
      );
      pageHtml = pageHtml.replace(
        /<meta\s+property="og:url"\s+content="[\s\S]*?"\s*\/?>/i,
        `<meta property="og:url" content="${meta.canonical}" />`
      );

      if (meta.image) {
        pageHtml = pageHtml.replace(
          /<meta\s+property="og:image"\s+content="[\s\S]*?"\s*\/?>/i,
          `<meta property="og:image" content="${meta.image}" />`
        );
        pageHtml = pageHtml.replace(
          /<meta\s+property="twitter:image"\s+content="[\s\S]*?"\s*\/?>/i,
          `<meta property="twitter:image" content="${meta.image}" />`
        );
      }

      // Inject JSON-LD Schema
      if (meta.schema && Object.keys(meta.schema).length > 0) {
        const schemaTag = `\n  <script type="application/ld+json" id="route-schema-ssg">\n${JSON.stringify(meta.schema, null, 2)}\n  </script>\n`;
        pageHtml = pageHtml.replace('</head>', `${schemaTag}</head>`);
      }

      // Inject pre-rendered DOM into #root
      pageHtml = pageHtml.replace(
        '<div id="root"></div>',
        `<div id="root">${html}</div>`
      );

      // Determine output directory and filename
      const routePath = route.replace(/^\/|\/$/g, '');
      const outDir = routePath ? path.resolve(distDir, routePath) : distDir;
      const outFile = path.resolve(outDir, 'index.html');

      fs.mkdirSync(outDir, { recursive: true });
      fs.writeFileSync(outFile, pageHtml, 'utf-8');

      console.log(`  ✓ SSG Pre-rendered: ${route.padEnd(46)} -> ${path.relative(rootDir, outFile)}`);
    } catch (err) {
      console.error(`  ✗ Failed to pre-render route "${route}":`, err);
    }
  }

  // Clean up server build directory to keep dist lean
  try {
    fs.rmSync(path.resolve(distDir, 'server'), { recursive: true, force: true });
    console.log('\n  ✓ Cleaned up temporary SSR build artifact.');
  } catch (err) {
    // Ignore cleanup error
  }

  // Generate & sync fresh sitemap with all routes
  const { generateSitemap } = await import('./generate-sitemap.js');
  generateSitemap();

  console.log('\n✨ All routes successfully pre-rendered into static HTML with full AEO/GEO Schema!');
}

prerender();
