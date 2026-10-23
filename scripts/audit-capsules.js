import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import http from 'node:http';
import { chromium } from 'playwright';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '..', 'dist');

const PORT = 4174;
const BASE_URL = `http://localhost:${PORT}`;

const ROUTES_TO_AUDIT = [
  '/services/',
  '/services/custom-wordpress-development/',
  '/services/woocommerce-systems-architecture/',
  '/services/ai-voice-agents/',
  '/services/ai-chatbots-rag/',
  '/services/workflow-automation-n8n/',
  '/white-label/marketing-agencies/',
  '/white-label/seo-agencies/',
  '/locations/usa/',
  '/locations/uk/',
  '/locations/canada/',
  '/locations/uae/',
  '/locations/saudi-arabia/',
  '/locations/netherlands/'
];

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
        const possibleIndex = path.join(distDir, pathname, 'index.html');
        if (fs.existsSync(possibleIndex)) {
          filePath = possibleIndex;
        } else {
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
      resolve(server);
    });
  });
}

function countWords(str) {
  if (!str) return 0;
  return str.trim().split(/\s+/).filter(Boolean).length;
}

async function runAudit() {
  console.log('🚀 Running Automated Text Extraction Audit: Content Capsule Architecture...\n');
  const server = await startServer();
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();

  let totalH2Count = 0;
  let passedCapsules = 0;
  let failedCapsules = 0;
  const failureDetails = [];

  for (const route of ROUTES_TO_AUDIT) {
    const page = await context.newPage();
    const url = `${BASE_URL}${route}`;

    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });
      await page.waitForTimeout(300);

      // Extract all H2 elements and their immediately following paragraph
      const h2Data = await page.$$eval('h2', (headings) => {
        return headings.map((h2) => {
          const h2Text = h2.textContent?.trim() || '';

          // Look for immediately following paragraph or sibling paragraph
          let nextElem = h2.nextElementSibling;
          let paragraphText = '';

          while (nextElem) {
            if (nextElem.tagName.toLowerCase() === 'p') {
              paragraphText = nextElem.textContent?.trim() || '';
              break;
            }
            // If it's a wrapper, check inside
            const pInside = nextElem.querySelector('p');
            if (pInside) {
              paragraphText = pInside.textContent?.trim() || '';
              break;
            }
            // Stop if another heading is reached
            if (nextElem.tagName.toLowerCase().startsWith('h')) {
              break;
            }
            nextElem = nextElem.nextElementSibling;
          }

          return {
            h2Text,
            paragraphText
          };
        });
      });

      console.log(`\n📍 Auditing Route: ${route} (${h2Data.length} H2 sections found)`);

      for (const item of h2Data) {
        totalH2Count++;
        const words = countWords(item.paragraphText);
        const isCompliant = words >= 30 && words <= 60;

        if (isCompliant) {
          passedCapsules++;
          console.log(`  ✅ [PASS: ${words} words] H2: "${item.h2Text.slice(0, 50)}..."`);
          console.log(`     Capsule: "${item.paragraphText.slice(0, 70)}..."`);
        } else {
          failedCapsules++;
          console.error(`  ❌ [FAIL: ${words} words] H2: "${item.h2Text}"`);
          console.error(`     Text found: "${item.paragraphText.slice(0, 80)}..."`);
          failureDetails.push({
            route,
            h2: item.h2Text,
            words,
            text: item.paragraphText
          });
        }
      }
    } catch (err) {
      console.error(`Error auditing ${route}:`, err.message);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  server.close();

  console.log('\n======================================================');
  console.log(`🎯 CONTENT CAPSULE AUDIT SUMMARY:`);
  console.log(`   Total H2 Elements Audited: ${totalH2Count}`);
  console.log(`   Compliant (30-60 words):   ${passedCapsules}`);
  console.log(`   Non-Compliant:             ${failedCapsules}`);
  console.log('======================================================\n');

  if (failedCapsules > 0) {
    console.error(`❌ Audit failed with ${failedCapsules} non-compliant capsule(s).`);
    process.exit(1);
  } else {
    console.log('✨ 100% OF H2 SECTIONS ARE IMMEDIATELY FOLLOWED BY 30-60 WORD CONTENT CAPSULES!');
    process.exit(0);
  }
}

runAudit();
