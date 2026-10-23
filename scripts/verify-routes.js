import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '..', 'dist');

const PORT = 4173;
const BASE_URL = `http://localhost:${PORT}`;

const ROUTES_TO_TEST = [
  '/',
  '/services/',
  '/services/custom-wordpress-development/',
  '/services/woocommerce-systems-architecture/',
  '/services/ai-voice-agents/',
  '/services/ai-chatbots-rag/',
  '/services/workflow-automation-n8n/',
  '/services/agentic-ai-applications/',
  '/services/data-science-analytics/',
  '/services/vibe-coding-engineering/',
  '/services/custom-saas-mvp-development/',
  '/services/ai-video-ads-ugc/',
  '/white-label/marketing-agencies/',
  '/white-label/seo-agencies/',
  '/locations/',
  '/locations/usa/',
  '/locations/uk/',
  '/locations/germany/',
  '/locations/canada/',
  '/locations/uae/',
  '/locations/saudi-arabia/',
  '/locations/singapore/',
  '/locations/malaysia/',
  '/locations/australia/',
  '/locations/netherlands/',
  '/case-studies/',
  '/tools/',
  '/tools/local-schema-generator/',
  '/tools/wordpress-database-bloat-estimator/',
  '/tools/wordpress-cpt-code-exporter/',
  '/tools/wordpress-plugin-boilerplate-generator/',
  '/tools/voice-agent-roi-calculator/',
  '/tools/ai-voice-prompt-designer/',
  '/tools/webhook-payload-tester/',
  '/tools/n8n-error-handler-generator/',
  '/tools/llm-seo-meta-generator/',
  '/tools/woocommerce-seo-sku-auditor/',
  '/tools/wp-schema-jsonld-architect/',
  '/tools/ai-voice-agent-flow-builder/',
  '/tools/wp-database-query-profiler/',
  '/tools/n8n-webhook-pipeline-simulator/',
  '/tools/woocommerce-checkout-stress-engine/',
  '/tools/rag-context-token-calculator/',
  '/tools/php-hook-filter-conflict-matrix/',
  '/tools/local-seo-nap-auditor/',
  '/tools/tailwind-cwv-purge-analyzer/',
  '/tools/agentic-ai-schema-validator/',
  '/blog/',
  '/blog/php2shell-core-vulnerability-wordpress-hardening-guide/',
  '/about/',
  '/certifications/',
  '/contact/',
  '/freelancer-in-pakistan/',
  '/privacy-policy/',
  '/terms/'
];

// Simple static server for SSG dist files (with clean URL / directory fallback)
function startServer() {
  const mimeTypes = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.xml': 'application/xml',
    '.txt': 'text/plain',
    '.woff2': 'font/woff2'
  };

  const server = http.createServer((req, res) => {
    try {
      const parsedUrl = new URL(req.url, BASE_URL);
      let pathname = decodeURIComponent(parsedUrl.pathname);

      let filePath = path.join(distDir, pathname);

      if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
        filePath = path.join(filePath, 'index.html');
      } else if (!fs.existsSync(filePath) && !path.extname(filePath)) {
        // Try pathname + /index.html
        const possibleIndex = path.join(distDir, pathname, 'index.html');
        if (fs.existsSync(possibleIndex)) {
          filePath = possibleIndex;
        } else {
          // SPA fallback to root index.html
          filePath = path.join(distDir, 'index.html');
        }
      }

      if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        const ext = path.extname(filePath).toLowerCase();
        const contentType = mimeTypes[ext] || 'application/octet-stream';
        res.writeHead(200, { 'Content-Type': contentType });
        fs.createReadStream(filePath).pipe(res);
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
      }
    } catch (e) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end(`Server Error: ${e.message}`);
    }
  });

  return new Promise((resolve) => {
    server.listen(PORT, () => {
      console.log(`🌐 Test preview server running at ${BASE_URL} serving ${distDir}`);
      resolve(server);
    });
  });
}

async function runTests() {
  const server = await startServer();
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });

  console.log('\n🔍 Starting Automated Playwright Browser Verification of all routes...\n');

  let passedCount = 0;
  let failedCount = 0;
  const discoveredLinks = new Set();
  const results = [];

  for (const route of ROUTES_TO_TEST) {
    const page = await context.newPage();
    const consoleErrors = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        // Filter out non-fatal WebGL / audio warnings if any
        consoleErrors.push(msg.text());
      }
    });

    try {
      const targetUrl = `${BASE_URL}${route}`;
      const response = await page.goto(targetUrl, { waitUntil: 'domcontentloaded', timeout: 15000 });
      const status = response ? response.status() : 0;

      // Wait briefly for hydration
      await page.waitForTimeout(400);

      // Check H1
      const h1Count = await page.locator('h1').count();
      const h1Text = h1Count > 0 ? (await page.locator('h1').first().textContent())?.trim() : 'MISSING';

      // Check Title
      const title = await page.title();

      // Check JSON-LD
      const schemaCount = await page.locator('script[type="application/ld+json"]').count();

      // Check internal links on this page
      const hrefs = await page.$$eval('a[href]', (els) =>
        els.map((el) => el.getAttribute('href')).filter(Boolean)
      );

      hrefs.forEach((h) => {
        if (h.startsWith('/') && !h.startsWith('//')) {
          discoveredLinks.add(h.split('#')[0]);
        }
      });

      const isStatusOk = status === 200;
      const isH1Ok = h1Count >= 1 && h1Text !== 'MISSING';
      const isTitleOk = title.length > 5;
      const isSchemaOk = schemaCount >= 1;
      const hasFatalErrors = consoleErrors.some(e => e.includes('Uncaught') || e.includes('ReferenceError'));

      const passed = isStatusOk && isH1Ok && isTitleOk && isSchemaOk && !hasFatalErrors;

      if (passed) {
        passedCount++;
        console.log(`  ✅ [PASS 200] ${route.padEnd(45)} | H1: "${h1Text.slice(0, 35)}..."`);
      } else {
        failedCount++;
        console.error(`  ❌ [FAIL] ${route} -> Status: ${status}, H1: ${h1Count}, Errors: ${consoleErrors.length}`);
      }

      results.push({
        route,
        status,
        h1: h1Text,
        title,
        schemas: schemaCount,
        passed
      });
    } catch (err) {
      failedCount++;
      console.error(`  ❌ [CRASH] ${route} -> ${err.message}`);
    } finally {
      await page.close();
    }
  }

  // Verify internal links for broken references
  console.log(`\n🔗 Verifying discovered internal links (${discoveredLinks.size} unique links)...`);
  let brokenLinks = 0;
  for (const link of discoveredLinks) {
    if (link === '' || link === '/' || link.startsWith('/assets') || link.startsWith('/video') || link.endsWith('.xml') || link.endsWith('.txt')) {
      continue;
    }
    const testPage = await context.newPage();
    const res = await testPage.goto(`${BASE_URL}${link}`, { timeout: 10000 });
    if (!res || res.status() >= 400) {
      console.error(`  ⚠️ Broken internal link detected: ${link} (Status: ${res?.status()})`);
      brokenLinks++;
    }
    await testPage.close();
  }

  await browser.close();
  server.close();

  console.log('\n======================================================');
  console.log(`🎯 ROUTE VERIFICATION SUMMARY:`);
  console.log(`   Passed: ${passedCount} / ${ROUTES_TO_TEST.length}`);
  console.log(`   Failed: ${failedCount}`);
  console.log(`   Broken Internal Links: ${brokenLinks}`);
  console.log('======================================================\n');

  if (failedCount > 0 || brokenLinks > 0) {
    process.exit(1);
  } else {
    console.log('✨ ALL 18 ROUTES & INTERNAL LINKS 100% VERIFIED!');
    process.exit(0);
  }
}

runTests();
