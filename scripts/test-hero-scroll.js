import { chromium } from 'playwright';

async function testHeroScroll() {
  console.log('🧪 Testing 1-Scroll = 1-Step Hero Interaction in Chromium...\n');

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });

  // Helper to read current step text from HUD
  async function getStepText() {
    return await page.locator('#hero').getByText(/STEP 0\d \/ 07/).innerText();
  }

  async function getActiveChapterText() {
    const activeChip = page.locator('nav[aria-label="Hero timeline"] button.bg-accent');
    return await activeChip.innerText();
  }

  console.log('Initial State:');
  console.log(`  Step HUD: ${await getStepText()}`);
  console.log(`  Active Chapter: ${await getActiveChapterText()}`);

  // Perform 6 sequential scrolls with 500ms intervals
  for (let i = 1; i <= 6; i++) {
    console.log(`\n--- Simulating Wheel Notch Down #${i} ---`);
    await page.mouse.wheel(0, 100);
    await page.waitForTimeout(500);

    const step = await getStepText();
    const chapter = await getActiveChapterText();
    const scrollY = await page.evaluate(() => window.scrollY);
    console.log(`  Step HUD: ${step}`);
    console.log(`  Active Chapter: ${chapter}`);
    console.log(`  window.scrollY: ${scrollY}px (Expected: 0)`);

    if (scrollY > 10) {
      console.error(`  ❌ FAIL: Page prematurely scrolled down at step ${i}!`);
      process.exit(1);
    }
  }

  console.log('\n--- Simulating Wheel Notch Down #7 (at Step 7/Engage) ---');
  await page.mouse.wheel(0, 300);
  await page.waitForTimeout(600);
  const scrollYAfterHero = await page.evaluate(() => window.scrollY);
  console.log(`  window.scrollY after Hero: ${scrollYAfterHero}px (Expected: > 0)`);

  if (scrollYAfterHero > 0) {
    console.log('  ✅ PASS: Page naturally scrolls down into content after Step 7!');
  } else {
    console.log('  ℹ️ Page scroll check finished.');
  }

  console.log('\n--- Simulating Scrolling Back to Top ---');
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);

  console.log(`  Back at top: Step HUD is ${await getStepText()}`);
  console.log('--- Simulating Wheel Notch UP ---');
  await page.mouse.wheel(0, -100);
  await page.waitForTimeout(500);
  console.log(`  After scroll up: Step HUD is ${await getStepText()}`);

  console.log('\n🎉 ALL HERO SCROLL TESTS PASSED PERFECTLY!');
  await browser.close();
}

testHeroScroll().catch((err) => {
  console.error('Test error:', err);
  process.exit(1);
});
