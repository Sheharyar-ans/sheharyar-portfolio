import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '..', 'dist');

const ROUTES_TO_VALIDATE = [
  '/',
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
  '/locations/netherlands/',
  '/case-studies/',
  '/about/',
  '/certifications/',
  '/contact/',
  '/freelancer-in-pakistan/'
];

function getHtmlFilePath(route) {
  const clean = route.replace(/^\/|\/$/g, '');
  if (!clean) {
    return path.join(distDir, 'index.html');
  }
  return path.join(distDir, clean, 'index.html');
}

function extractJsonLdSchemas(htmlContent) {
  const regex = /<script\s+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi;
  const schemas = [];
  let match;

  while ((match = regex.exec(htmlContent)) !== null) {
    const rawContent = match[1].trim();
    if (!rawContent) continue;
    try {
      const parsed = JSON.parse(rawContent);
      schemas.push(parsed);
    } catch (err) {
      throw new Error(`JSON Syntax Error in script tag: ${err.message}\nRaw content snippet: ${rawContent.slice(0, 100)}...`);
    }
  }

  return schemas;
}

function validateSchemaGraph(route, schemas) {
  const errors = [];
  const warnings = [];

  if (schemas.length === 0) {
    errors.push('No JSON-LD <script type="application/ld+json"> tag found in static HTML.');
    return { errors, warnings };
  }

  // Flatten all graph nodes across all JSON-LD blocks on the page
  const allNodes = [];

  for (const schema of schemas) {
    if (schema['@context'] !== 'https://schema.org' && schema['@context'] !== 'http://schema.org') {
      errors.push(`Invalid @context: "${schema['@context']}". Must be "https://schema.org".`);
    }

    if (Array.isArray(schema['@graph'])) {
      allNodes.push(...schema['@graph']);
    } else {
      allNodes.push(schema);
    }
  }

  // Check 1: Person entity for "Sheharyar Siraj"
  const person = allNodes.find((n) => n['@type'] === 'Person' && (n.name?.includes('Sheharyar Siraj') || n['@id']?.includes('#person')));
  if (!person) {
    errors.push('Missing Person entity for "Sheharyar Siraj".');
  } else {
    if (!person['@id']) errors.push('Person entity missing required "@id".');
    if (!person.name) errors.push('Person entity missing required "name".');
    if (!person.jobTitle) errors.push('Person entity missing required "jobTitle".');

    // sameAs pointing to LinkedIn
    if (!Array.isArray(person.sameAs) || !person.sameAs.some((url) => url.includes('linkedin.com'))) {
      errors.push('Person entity sameAs must contain a verified LinkedIn profile URL.');
    }

    // Credentials: Google Vertex AI, Anthropic AI Fluency, Cisco CyberOps
    if (!Array.isArray(person.hasCredential) || person.hasCredential.length === 0) {
      errors.push('Person entity missing "hasCredential" array for verified certifications.');
    } else {
      const credNames = person.hasCredential.map((c) => (c.name || '').toLowerCase()).join(' ');
      if (!credNames.includes('vertex ai')) {
        errors.push('Person hasCredential missing "Google Cloud Vertex AI" certification.');
      }
      if (!credNames.includes('anthropic')) {
        errors.push('Person hasCredential missing "Anthropic AI Fluency" certification.');
      }
      if (!credNames.includes('cisco') && !credNames.includes('cyberops')) {
        errors.push('Person hasCredential missing "Cisco CyberOps" certification.');
      }
    }
  }

  // Check 2: ProfessionalService entity ("Sheharyar Siraj - AI Systems & Web Architecture")
  const business = allNodes.find((n) => n['@type'] === 'ProfessionalService' && n['@id']?.includes('#business'));
  if (!business) {
    errors.push('Missing unified ProfessionalService #business entity.');
  } else {
    if (!business.priceRange) errors.push('ProfessionalService missing required "priceRange" (e.g. "$$$").');
    if (!business.areaServed) {
      errors.push('ProfessionalService missing required "areaServed".');
    } else if (Array.isArray(business.areaServed)) {
      const areaCodes = business.areaServed.map((a) => (typeof a === 'string' ? a : a.identifier || a.name || '')).join(' ');
      const requiredAreas = ['US', 'GB', 'CA', 'AE', 'SA', 'NL'];
      for (const code of requiredAreas) {
        if (!areaCodes.includes(code)) {
          errors.push(`ProfessionalService areaServed missing required territory: ${code}`);
        }
      }
    }

    // Service catalog check
    if (!business.hasOfferCatalog) {
      errors.push('ProfessionalService missing required "hasOfferCatalog".');
    }
  }

  // Check 3: WebSite entity
  const website = allNodes.find((n) => n['@type'] === 'WebSite');
  if (!website) {
    errors.push('Missing WebSite entity in schema graph.');
  } else {
    if (!website['@id']) errors.push('WebSite missing required "@id".');
    if (!website.name) errors.push('WebSite missing required "name".');
    if (!website.url) errors.push('WebSite missing required "url".');
  }

  // Check 4: Service Schema on all /services/* and /white-label/* pages linking back to #business
  if (route.startsWith('/services/') || route.startsWith('/white-label/')) {
    const services = allNodes.filter((n) => n['@type'] === 'Service');
    if (services.length === 0) {
      errors.push(`Route "${route}" requires a Service entity node.`);
    } else {
      const hasProviderLink = services.some((s) => {
        const prov = s.provider;
        return prov && (prov['@id'] === 'https://sheharyarsiraj.com/#business' || prov['@id']?.includes('#business'));
      });

      if (!hasProviderLink) {
        errors.push(`Service entity on "${route}" must link provider to "https://sheharyarsiraj.com/#business".`);
      }
    }
  }

  // Check 5: BreadcrumbList Schema on all sub-routes
  if (route !== '/') {
    const breadcrumbs = allNodes.find((n) => n['@type'] === 'BreadcrumbList');
    if (!breadcrumbs) {
      errors.push(`Sub-route "${route}" missing required "BreadcrumbList" schema.`);
    } else {
      if (!Array.isArray(breadcrumbs.itemListElement) || breadcrumbs.itemListElement.length < 2) {
        errors.push(`BreadcrumbList on "${route}" must contain at least 2 ListItem elements.`);
      } else {
        breadcrumbs.itemListElement.forEach((item, idx) => {
          if (item['@type'] !== 'ListItem') errors.push(`Breadcrumb item ${idx} must have @type "ListItem".`);
          if (item.position !== idx + 1) errors.push(`Breadcrumb item ${idx} position must be ${idx + 1}, found ${item.position}.`);
          if (!item.name) errors.push(`Breadcrumb item ${idx} missing "name".`);
          if (!item.item) errors.push(`Breadcrumb item ${idx} missing "item" URL.`);
        });
      }
    }
  }

  // Check 6: FAQPage Schema on routes with FAQs
  const hasFaqExpected =
    route === '/' ||
    route === '/services/' ||
    route.startsWith('/services/') ||
    route.startsWith('/white-label/') ||
    route.startsWith('/locations/');

  if (hasFaqExpected) {
    const faqPage = allNodes.find((n) => n['@type'] === 'FAQPage');
    if (!faqPage) {
      errors.push(`Route "${route}" expected FAQPage schema node matching visible FAQ accordion.`);
    } else {
      if (!Array.isArray(faqPage.mainEntity) || faqPage.mainEntity.length === 0) {
        errors.push(`FAQPage on "${route}" mainEntity must be a non-empty array of Questions.`);
      } else {
        faqPage.mainEntity.forEach((q, idx) => {
          if (q['@type'] !== 'Question') errors.push(`FAQ ${idx} must have @type "Question".`);
          if (!q.name || q.name.length < 5) errors.push(`FAQ ${idx} question text missing or too short.`);
          if (!q.acceptedAnswer || q.acceptedAnswer['@type'] !== 'Answer') errors.push(`FAQ ${idx} missing acceptedAnswer of type "Answer".`);
          if (!q.acceptedAnswer?.text || q.acceptedAnswer.text.length < 15) errors.push(`FAQ ${idx} acceptedAnswer text missing or too short.`);
        });
      }
    }
  }

  // Check 7: ProfilePage Schema must have mainEntity pointing to Person
  const profilePage = allNodes.find((n) => n['@type'] === 'ProfilePage');
  if (profilePage) {
    if (!profilePage.mainEntity) {
      errors.push(`ProfilePage on "${route}" missing required "mainEntity" field (critical for Google Search Console rich results).`);
    } else {
      const entity = profilePage.mainEntity;
      if (entity['@type'] !== 'Person') {
        errors.push(`ProfilePage on "${route}" mainEntity must have @type "Person".`);
      }
      if (!entity.name) {
        errors.push(`ProfilePage on "${route}" mainEntity missing required "name".`);
      }
      if (!entity['@id']?.includes('#person')) {
        errors.push(`ProfilePage on "${route}" mainEntity @id must link to "#person".`);
      }
    }
  }

  return { errors, warnings, nodeCount: allNodes.length };
}

async function runValidation() {
  console.log('🚀 Running Knowledge Graph & JSON-LD Schema.org Automated Validation Linter...\n');

  let passedRoutes = 0;
  let failedRoutes = 0;
  const failureReports = [];

  for (const route of ROUTES_TO_VALIDATE) {
    const filePath = getHtmlFilePath(route);

    if (!fs.existsSync(filePath)) {
      console.error(`❌ [FILE MISSING] Static file not found for route "${route}": ${filePath}`);
      failedRoutes++;
      failureReports.push({ route, errors: ['Static pre-rendered index.html file not found.'] });
      continue;
    }

    try {
      const htmlContent = fs.readFileSync(filePath, 'utf-8');
      const schemas = extractJsonLdSchemas(htmlContent);
      const { errors, warnings, nodeCount } = validateSchemaGraph(route, schemas);

      if (errors.length === 0) {
        passedRoutes++;
        console.log(`  ✅ [PASS: ${nodeCount} nodes] ${route.padEnd(46)}`);
      } else {
        failedRoutes++;
        console.error(`  ❌ [FAIL: ${errors.length} errors] ${route}`);
        errors.forEach((err) => console.error(`     • ${err}`));
        failureReports.push({ route, errors });
      }

      if (warnings.length > 0) {
        warnings.forEach((warn) => console.warn(`     ⚠️ ${warn}`));
      }
    } catch (err) {
      failedRoutes++;
      console.error(`  ❌ [SYNTAX ERROR] ${route}: ${err.message}`);
      failureReports.push({ route, errors: [err.message] });
    }
  }

  console.log('\n======================================================');
  console.log(`🎯 JSON-LD SCHEMA.ORG VALIDATION SUMMARY:`);
  console.log(`   Total Routes Audited: ${ROUTES_TO_VALIDATE.length}`);
  console.log(`   Passed (100% Valid):  ${passedRoutes}`);
  console.log(`   Failed:               ${failedRoutes}`);
  console.log('======================================================\n');

  if (failedRoutes > 0) {
    console.error(`❌ Validation failed with ${failedRoutes} route failure(s).`);
    process.exit(1);
  } else {
    console.log('✨ 100% OF ROUTES PASS VALIDATED SCHEMA.ORG STANDARDS WITH ZERO ERRORS & ZERO MISSING FIELDS!');
    process.exit(0);
  }
}

runValidation();
