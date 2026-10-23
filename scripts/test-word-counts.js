import { SUB_SERVICES, WHITE_LABEL_PORTALS, REGIONAL_LOCATIONS } from '../src/data/taxonomyData.js';

function countWords(str) {
  if (!str) return 0;
  return str.trim().split(/\s+/).filter(Boolean).length;
}

let errors = 0;

console.log('--- AUDITING CONTENT CAPSULES (MUST BE 30-60 WORDS) ---');

function checkItem(category, key, item) {
  // Check Content Sections
  if (item.contentSections) {
    item.contentSections.forEach((sec, idx) => {
      const capsuleCount = countWords(sec.capsuleAnswer);
      const techCount = countWords(sec.technicalBreakdown);

      if (capsuleCount < 30 || capsuleCount > 60) {
        console.error(`❌ [${category}/${key}] Section ${idx + 1} Capsule Word Count: ${capsuleCount} (Must be 30-60 words)`);
        errors++;
      } else {
        console.log(`✅ [${category}/${key}] Section ${idx + 1} Capsule: ${capsuleCount} words`);
      }

      if (techCount < 120 || techCount > 180) {
        console.log(`ℹ️ [${category}/${key}] Section ${idx + 1} Tech Breakdown: ${techCount} words`);
      }
    });
  }

  // Check Comparison Capsule
  if (item.comparisonCapsule) {
    const compCount = countWords(item.comparisonCapsule);
    if (compCount < 30 || compCount > 60) {
      console.error(`❌ [${category}/${key}] Comparison Capsule Word Count: ${compCount} (Must be 30-60 words)`);
      errors++;
    } else {
      console.log(`✅ [${category}/${key}] Comparison Capsule: ${compCount} words`);
    }
  }

  // Check FAQ Capsule
  if (item.faqCapsule) {
    const faqCount = countWords(item.faqCapsule);
    if (faqCount < 30 || faqCount > 60) {
      console.error(`❌ [${category}/${key}] FAQ Capsule Word Count: ${faqCount} (Must be 30-60 words)`);
      errors++;
    } else {
      console.log(`✅ [${category}/${key}] FAQ Capsule: ${faqCount} words`);
    }
  }

  // Check FAQ count (must be exactly 4)
  const faqs = item.faqs || item.regionalFaqs;
  if (faqs && faqs.length !== 4) {
    console.error(`❌ [${category}/${key}] FAQ Count: ${faqs.length} (Must be exactly 4 FAQs)`);
    errors++;
  } else if (faqs) {
    console.log(`✅ [${category}/${key}] FAQs: ${faqs.length} items`);
  }
}

for (const [key, item] of Object.entries(SUB_SERVICES)) {
  checkItem('Sub-Service', key, item);
}

for (const [key, item] of Object.entries(WHITE_LABEL_PORTALS)) {
  checkItem('White-Label', key, item);
}

for (const [key, item] of Object.entries(REGIONAL_LOCATIONS)) {
  checkItem('Location', key, item);
}

console.log(`\nTotal Errors: ${errors}`);
if (errors > 0) {
  process.exit(1);
} else {
  console.log('✨ ALL CAPSULES & FAQS 100% COMPLIANT!');
}
