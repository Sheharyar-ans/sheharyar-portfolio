import React from 'react';
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { SUB_SERVICES, WHITE_LABEL_PORTALS, REGIONAL_LOCATIONS } from './data/taxonomyData';
import { TOOLS_TAXONOMY } from './data/toolsData';
import { BLOG_POSTS } from './data/blogData';
import { generateSchemaGraph } from './utils/schemaGenerator';

export const ROUTES = [
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
  '/blog/decoupled-custom-wordpress-php-vip-architecture/',
  '/blog/building-sub-600ms-conversational-ai-voice-agents-vapi-twilio/',
  '/blog/scaling-woocommerce-hpos-10000-daily-orders-architecture/',
  '/blog/self-hosted-n8n-production-clusters-vs-zapier-enterprise-automation/',
  '/blog/production-rag-zero-hallucination-vector-architecture-hybrid-search/',
  '/blog/generative-engine-optimization-geo-schema-knowledge-graphs-ai-search/',
  '/blog/deterministic-agentic-ai-multi-agent-workflows-langgraph-python/',
  '/blog/the-invisible-technical-partner-how-digital-agencies-scale-development/',
  '/blog/eliminating-wordpress-database-bloat-autoload-optimization-security/',
  '/blog/automating-b2b-executive-intelligence-event-driven-etl-pipelines-bi/',
  '/blog/php2shell-core-vulnerability-wordpress-hardening-guide/',
  '/code-arcade/',
  '/about/',
  '/certifications/',
  '/contact/',
  '/freelancer-in-pakistan/',
  '/privacy-policy/',
  '/terms/'
];

export function getRouteMetadata(url: string) {
  const cleanUrl = url.endsWith('/') && url.length > 1 ? url.slice(0, -1) : url;
  const schema = generateSchemaGraph(cleanUrl);

  if (cleanUrl === '' || cleanUrl === '/') {
    return {
      title: 'Sheharyar Siraj | AI Automation Architect & WordPress Systems Engineer',
      description: 'I build connected digital systems where WordPress provides the foundation, AI provides intelligence, and automation handles execution. 1,200+ projects delivered worldwide.',
      canonical: 'https://sheharyarsiraj.com/',
      schema
    };
  }

  if (cleanUrl === '/services') {
    return {
      title: 'WordPress & AI Systems Services Hub | Sheharyar Siraj',
      description: 'Custom WordPress VIP architectures, sub-600ms AI voice agents, contextual RAG chatbots, and n8n workflow automations engineered by Sheharyar Siraj.',
      canonical: 'https://sheharyarsiraj.com/services/',
      schema
    };
  }

  if (cleanUrl === '/locations') {
    return {
      title: 'Global Engineering Hubs & Locations | Sheharyar Siraj',
      description: 'Systems architecture hubs across the US, UK, Germany, Canada, UAE, Saudi Arabia, Singapore, Malaysia, Australia, and Netherlands with timezone overlap.',
      canonical: 'https://sheharyarsiraj.com/locations/',
      schema
    };
  }

  // Sub-services
  if (cleanUrl.startsWith('/services/')) {
    const slug = cleanUrl.replace('/services/', '');
    const service = SUB_SERVICES[slug];
    if (service) {
      return {
        title: service.metaTitle,
        description: service.metaDescription,
        canonical: `https://sheharyarsiraj.com/services/${service.slug}/`,
        schema
      };
    }
  }

  // White-label
  if (cleanUrl.startsWith('/white-label/')) {
    const slug = cleanUrl.replace('/white-label/', '');
    const portal = WHITE_LABEL_PORTALS[slug];
    if (portal) {
      return {
        title: portal.metaTitle,
        description: portal.metaDescription,
        canonical: `https://sheharyarsiraj.com/white-label/${portal.slug}/`,
        schema
      };
    }
  }

  // Locations
  if (cleanUrl.startsWith('/locations/')) {
    const slug = cleanUrl.replace('/locations/', '');
    const loc = REGIONAL_LOCATIONS[slug];
    if (loc) {
      return {
        title: loc.metaTitle,
        description: loc.metaDescription,
        canonical: `https://sheharyarsiraj.com/locations/${loc.slug}/`,
        schema
      };
    }
  }

  if (cleanUrl === '/case-studies') {
    return {
      title: 'AI & WordPress Systems Case Studies | Sheharyar Siraj',
      description: 'Verified B2B case studies: enterprise WordPress & WooCommerce migrations, sub-600ms AI voice qualification, and n8n CRM pipelines by Sheharyar Siraj.',
      canonical: 'https://sheharyarsiraj.com/case-studies/',
      schema
    };
  }

  if (cleanUrl === '/tools') {
    return {
      title: 'Free WordPress & AI Systems Tools | Sheharyar Siraj',
      description: 'Production-ready tools to accelerate development, optimize databases, structure local schemas, and orchestrate low-latency AI voice workflows.',
      canonical: 'https://sheharyarsiraj.com/tools/',
      schema
    };
  }

  if (cleanUrl === '/tools/local-schema-generator') {
    return {
      title: 'AI Local Schema & Entity Generator | Sheharyar Siraj',
      description: 'Generate connected LocalBusiness JSON-LD schema graphs and LLMs.txt manifests for Google AI Overviews, Perplexity, and local map pack rankings.',
      canonical: 'https://sheharyarsiraj.com/tools/local-schema-generator/',
      schema
    };
  }

  if (cleanUrl === '/tools/wordpress-database-bloat-estimator') {
    return {
      title: 'WordPress Database Bloat Estimator | Sheharyar Siraj',
      description: 'Estimate wp_options autoload weight, orphaned transient bloat, and server TTFB slowdown. Download custom database optimization SQL and PHP snippets.',
      canonical: 'https://sheharyarsiraj.com/tools/wordpress-database-bloat-estimator/',
      schema
    };
  }

  if (cleanUrl === '/tools/wordpress-cpt-code-exporter') {
    return {
      title: 'WordPress CPT & Meta Field Exporter | Sheharyar Siraj',
      description: 'Generate production-ready PHP 8.2 code for WordPress custom post types and meta boxes. Clean, security-hardened snippets with zero plugin overhead.',
      canonical: 'https://sheharyarsiraj.com/tools/wordpress-cpt-code-exporter/',
      schema
    };
  }

  if (cleanUrl === '/tools/wordpress-plugin-boilerplate-generator') {
    return {
      title: 'WordPress Plugin Boilerplate Generator | Sheharyar',
      description: 'Generate clean, security-hardened, object-oriented PHP 8.2+ WordPress plugin boilerplates with activation hooks, Settings API, AJAX handlers, and custom post types.',
      canonical: 'https://sheharyarsiraj.com/tools/wordpress-plugin-boilerplate-generator/',
      schema
    };
  }

  if (cleanUrl === '/tools/voice-agent-roi-calculator') {
    return {
      title: 'Voice Agent & Automation ROI Calculator | Sheharyar',
      description: 'Calculate operational cost savings, hours saved, and lead conversion lift from deploying autonomous AI voice agents and n8n workflows. Real-time telephony financial modeling.',
      canonical: 'https://sheharyarsiraj.com/tools/voice-agent-roi-calculator/',
      schema
    };
  }

  if (cleanUrl === '/tools/ai-voice-prompt-designer') {
    return {
      title: 'AI Voice Prompt & Flow Designer | Sheharyar Siraj',
      description: 'Design production-ready Vapi and Retell system prompts, JSON state machines, and low-latency voice agent architectures. Anti-hallucination guardrails and function calling.',
      canonical: 'https://sheharyarsiraj.com/tools/ai-voice-prompt-designer/',
      schema
    };
  }

  if (cleanUrl === '/tools/webhook-payload-tester') {
    return {
      title: 'n8n & Make Webhook Payload Tester | Sheharyar Siraj',
      description: 'Inspect incoming JSON webhook payloads, parse nested keys, validate headers, and compile production-ready n8n Code Node JavaScript scripts instantly.',
      canonical: 'https://sheharyarsiraj.com/tools/webhook-payload-tester/',
      schema
    };
  }

  if (cleanUrl === '/tools/n8n-error-handler-generator') {
    return {
      title: 'n8n Error Handler & JSON Transformer | Sheharyar',
      description: 'Transform broken JSON payloads, intercept workflow errors gracefully, and compile defensive JavaScript for n8n Code Nodes and Set Nodes without silent failures.',
      canonical: 'https://sheharyarsiraj.com/tools/n8n-error-handler-generator/',
      schema
    };
  }

  if (cleanUrl === '/tools/llm-seo-meta-generator') {
    return {
      title: 'LLM Prompt & SEO Meta Generator | Sheharyar Siraj',
      description: 'Generate high-converting SEO meta titles, meta descriptions, deep-research LLM prompts, and Schema.org Article JSON-LD graphs for programmatic content scaling.',
      canonical: 'https://sheharyarsiraj.com/tools/llm-seo-meta-generator/',
      schema
    };
  }

  if (cleanUrl === '/tools/woocommerce-seo-sku-auditor') {
    return {
      title: 'WooCommerce SKU & SEO Health Auditor | Sheharyar',
      description: 'Audit WooCommerce catalogs for duplicate SKUs, missing SEO meta titles, empty image alt tags, and unoptimized product attributes. Download custom remediation PHP snippets.',
      canonical: 'https://sheharyarsiraj.com/tools/woocommerce-seo-sku-auditor/',
      schema
    };
  }

  if (cleanUrl.startsWith('/tools/')) {
    const slug = cleanUrl.replace('/tools/', '');
    const tool = TOOLS_TAXONOMY[slug];
    if (tool) {
      return {
        title: `${tool.name} | Sheharyar Siraj`,
        description: tool.shortDescription,
        canonical: `https://sheharyarsiraj.com/tools/${tool.slug}/`,
        schema
      };
    }
  }

  if (cleanUrl === '/about') {
    return {
      title: 'About Sheharyar Siraj | Senior WordPress Developer & Agentic AI Engineer',
      description: 'Learn about Sheharyar Siraj: 5+ years of systems engineering, 1,200+ projects delivered worldwide, enterprise WordPress architectures, and AI automation pipelines.',
      canonical: 'https://sheharyarsiraj.com/about/',
      schema
    };
  }

  if (cleanUrl === '/certifications' || cleanUrl === '/credentials') {
    return {
      title: 'Verified Certifications & Credentials | Sheharyar Siraj (CCNP & AI)',
      description: 'Explore Sheharyar Siraj\'s verified certifications: Cisco Certified Network Professional (CCNP), AI for App Building & Data Analysis, SSUET IoT, and Virtual University BBIT.',
      canonical: 'https://sheharyarsiraj.com/certifications/',
      schema
    };
  }

  if (cleanUrl === '/contact') {
    return {
      title: 'Contact Sheharyar Siraj | Hire AI & WP Engineer',
      description: 'Connect directly with Sheharyar Siraj. Sub-2 hour response time SLA, WhatsApp instant channel, email, and scheduled architecture scoping sessions.',
      canonical: 'https://sheharyarsiraj.com/contact/',
      schema
    };
  }

  if (cleanUrl === '/freelancer-in-pakistan') {
    return {
      title: 'Freelancer in Pakistan | AI & WordPress Architect',
      description: 'Hire Sheharyar Siraj, a senior systems freelancer in Pakistan. 5+ years experience, 1,200+ projects delivered, specializing in WordPress and AI.',
      canonical: 'https://sheharyarsiraj.com/freelancer-in-pakistan/',
      schema
    };
  }

  if (cleanUrl === '/privacy-policy') {
    return {
      title: 'Privacy Policy & AI Safeguards | Sheharyar Siraj',
      description: 'Privacy disclosure covering client data confidentiality, AI voice telephony processing (Vapi/Twilio), RAG vector safeguards, and global compliance.',
      canonical: 'https://sheharyarsiraj.com/privacy-policy/',
      schema
    };
  }

  if (cleanUrl === '/terms' || cleanUrl === '/terms-and-conditions') {
    return {
      title: 'Terms & Conditions of Service | Sheharyar Siraj',
      description: 'Commercial terms of service: 100% intellectual property ownership, strict bilateral NDA protection, 30-day bug-fix warranty, and multi-currency billing.',
      canonical: 'https://sheharyarsiraj.com/terms/',
      schema
    };
  }

  if (cleanUrl === '/blog') {
    return {
      title: 'Engineering Blog & Architectural Knowledge Base | Sheharyar Siraj',
      description: 'In-depth architectural guides on custom WordPress VIP engineering, low-latency AI voice telephony, WooCommerce HPOS scaling, and deterministic agentic AI.',
      canonical: 'https://sheharyarsiraj.com/blog/',
      schema
    };
  }

  if (cleanUrl.startsWith('/blog/')) {
    const slug = cleanUrl.replace('/blog/', '');
    const post = BLOG_POSTS.find(p => p.slug === slug);
    if (post) {
      return {
        title: post.seoTitle,
        description: post.metaDescription,
        canonical: `https://sheharyarsiraj.com/blog/${post.slug}/`,
        image: `https://sheharyarsiraj.com${post.featuredImage}`,
        schema
      };
    }
  }

  if (cleanUrl === '/code-arcade') {
    return {
      title: 'Free 3D Coding Game Online: Practice JS, Python & React | Sheharyar Siraj',
      description: 'Play the ultimate free 3D coding practice game in your browser. Select Python, JavaScript, React, or CSS from the dropdown and level up your programming skills.',
      canonical: 'https://sheharyarsiraj.com/code-arcade/',
      schema
    };
  }

  return {
    title: 'Sheharyar Siraj | AI Automation Architect & WordPress Systems Engineer',
    description: 'Connected digital systems where WordPress provides the foundation, AI provides intelligence, and automation handles execution.',
    canonical: 'https://sheharyarsiraj.com/',
    schema
  };
}

export function render(url: string) {
  const html = renderToString(
    <MemoryRouter initialEntries={[url]}>
      <App />
    </MemoryRouter>
  );
  return { html };
}
