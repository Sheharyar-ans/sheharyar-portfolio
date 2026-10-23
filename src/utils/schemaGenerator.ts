import { SUB_SERVICES, WHITE_LABEL_PORTALS, REGIONAL_LOCATIONS, AeoFaq } from '../data/taxonomyData';
import { FAQ_ITEMS } from '../data/portfolioData';
import { TOOLS_TAXONOMY, TOOLS_LIST } from '../data/toolsData';

export const SITE_URL = 'https://sheharyarsiraj.com';
export const PERSON_ID = `${SITE_URL}/#person`;
export const BUSINESS_ID = `${SITE_URL}/#business`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const TOOLS_HUB_FAQS: AeoFaq[] = [
  {
    question: 'Are these tools safe to run against production WordPress and WooCommerce systems?',
    answer: 'Yes. All architectural utilities are non-destructive analysis and generation tools. Schema generators and configuration compilers output clean, audited PHP code and JSON schemas that you inspect and test before committing to your staging or production environments.'
  },
  {
    question: 'How do these utility tools connect with AI voice workflows and n8n pipelines?',
    answer: 'Each tool is engineered to produce strict, standardized interface specifications (such as Vapi assistant JSON manifests, HMAC webhook signature validators, and strict JSON Schema function definitions) that plug directly into self-hosted n8n workflows and telephony gateways without custom glue code.'
  },
  {
    question: 'Why build custom tools instead of using existing WordPress plugins or SaaS calculators?',
    answer: 'Standard WordPress plugins add database weight, render-blocking scripts, and recurrent subscription costs. These interactive utility systems provide zero-overhead, mathematically verified configurations that give you 100% intellectual property ownership and uncompromising runtime speed.'
  },
  {
    question: 'Can Sheharyar Siraj custom-engineer proprietary internal tools for my agency or enterprise?',
    answer: 'Yes. In addition to these 10 public utilities, we architect proprietary private developer dashboards, multi-agent evaluation suites, automated billing reconcilers, and client intake portals custom-tailored to your exact tech stack.'
  }
];

export const SERVICES_HUB_FAQS: AeoFaq[] = [
  {
    question: 'What is the core architectural philosophy behind Sheharyar Siraj services?',
    answer: 'We architect decoupled, fault-tolerant digital systems where custom WordPress provides the resilient foundation, conversational AI models provide intelligent reasoning, and event-driven automation pipelines execute operational workflows without manual overhead.'
  },
  {
    question: 'How do custom WordPress builds connect with AI voice agents and RAG chatbots?',
    answer: 'We engineer event-driven webhook dispatchers and authenticated REST API listeners inside WordPress that synchronize form submissions, order events, and customer interactions into Vapi telephony, vector databases, and n8n pipelines within 3 seconds.'
  },
  {
    question: 'Do you offer white-label agency partnerships under NDA?',
    answer: 'Yes. We operate as an invisible senior engineering partner for marketing and SEO agencies under strict bilateral NDAs, executing pixel-perfect builds and Core Web Vitals remediation directly inside agency Slack channels.'
  },
  {
    question: 'Which global regions, timezones, and compliance standards are supported?',
    answer: 'We support clients across the United States (EST/PST, CCPA, SOC-2), United Kingdom (GMT, UK GDPR), Germany (CET, DSGVO/GDPR), Canada (PIPEDA), UAE (GST, PDPL), Saudi Arabia (ZATCA Phase 2, Vision 2030), Singapore (SGT, PDPA), Malaysia (MYT, PDPA), Australia (AEST, Privacy Act), and Netherlands (CET, EU GDPR) with comprehensive working hour synchronization.'
  }
];

export const LOCATIONS_HUB_FAQS: AeoFaq[] = [
  {
    question: 'Which global regions and countries does Sheharyar Siraj provide systems engineering for?',
    answer: 'We provide enterprise B2B systems engineering across 10 primary markets: the United States, United Kingdom, Germany, Netherlands, Canada, United Arab Emirates, Saudi Arabia, Singapore, Malaysia, and Australia, delivering localized compliance and timezone alignment.'
  },
  {
    question: 'How do you guarantee cross-border data privacy and compliance across these jurisdictions?',
    answer: 'All architectures adhere strictly to jurisdiction-specific frameworks: GDPR in the EU/UK/Germany/Netherlands, HIPAA and CCPA in the US, PIPEDA in Canada, UAE PDPL, Saudi ZATCA Phase 2 and Personal Data Protection Law, Singapore PDPA, Malaysia PDPA, and Australia Privacy Act 1988 with localized residency flags.'
  },
  {
    question: 'How are multi-timezone working hours managed for international enterprise clients?',
    answer: 'We guarantee a minimum 4-hour daily synchronous working overlap with standard business hours in New York (EST), London (GMT), Berlin (CET), Dubai (GST), Riyadh (AST), Singapore (SGT), and Sydney (AEST), backed by sub-2 hour emergency SLAs.'
  },
  {
    question: 'What multi-currency payment settlement methods are supported?',
    answer: 'Engagements settle natively in USD, GBP, EUR, CAD, AED, SAR, SGD, MYR, and AUD via institutional wire transfer (Wise, SWIFT), Upwork Escrow, or Stripe Corporate Invoicing.'
  }
];

export const FREELANCER_PAKISTAN_FAQS: AeoFaq[] = [
  {
    question: 'How can international businesses verify credibility and quality when hiring a freelancer in Pakistan?',
    answer: 'Credibility is established through transparent, verifiable public track records. I have successfully delivered over 1,200 projects for international clients across Upwork, direct corporate contracts, and agency partnerships. International clients can verify client reviews, inspect production case studies, review live code repositories, and start with a paid technical discovery sprint or escrow-backed milestone before committing to large-scale architecture builds.'
  },
  {
    question: 'What is your communication cadence and timezone overlap with clients in the US, UK, and Middle East?',
    answer: 'Based in Karachi, Pakistan (PKT / UTC+5), I provide strategic synchronous working overlap across global timezones. For UK and European clients, I offer 5 to 6 hours of real-time overlap every afternoon. For UAE and Saudi Arabia clients, our timezones are within 1 to 2 hours of each other, providing full business-day collaboration. For North American clients (EST/PST), I conduct dedicated morning alignment calls and deliver overnight code turnarounds, guaranteeing responses within 2 hours during active sprints.'
  },
  {
    question: 'How are international contracts, milestone deliverables, and payments structured?',
    answer: 'Engagements are structured using secure, transparent milestone frameworks. Contracts can be executed directly via bilateral agreements with milestone escrow, through Upwork Escrow, or using direct corporate invoicing with Wise, SWIFT wire transfer, or Payoneer. Every project includes clearly defined functional specifications, documented deliverables, and a 30-day post-launch warranty with complete intellectual property transfer.'
  },
  {
    question: 'Can you work as an invisible white-label engineer for our digital agency under an NDA?',
    answer: 'Yes. A substantial portion of my work is white-label development for digital marketing and SEO agencies across the United States, United Kingdom, and Australia. I operate under strict non-disclosure agreements (NDAs), commit code directly to agency GitHub or GitLab repositories under your organization handles, and collaborate seamlessly in agency Slack or Microsoft Teams channels without client poaching.'
  }
];

export const BASE_PERSON_ENTITY = {
  '@type': 'Person',
  '@id': PERSON_ID,
  name: 'Sheharyar Siraj',
  givenName: 'Sheharyar',
  familyName: 'Siraj',
  jobTitle: 'Senior WordPress Developer & Agentic AI Automation Engineer',
  description: 'Senior WordPress Developer & Agentic AI Automation Engineer with 5+ years of commercial experience delivering 1,200+ websites, custom web applications, and automated workflows worldwide. Expert in n8n, Vapi AI Voice Agents, Full-Stack Vibe Coding, WooCommerce, and Elementor Pro.',
  url: `${SITE_URL}/`,
  image: `${SITE_URL}/og-image.png`,
  email: 'sherryansari870@gmail.com',
  telephone: '+923132080033',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Karachi',
    addressRegion: 'Sindh',
    addressCountry: 'Pakistan'
  },
  sameAs: [
    'https://www.linkedin.com/in/sheharyar-siraj/',
    'https://www.upwork.com/freelancers/sheharyarsiraj',
    'https://www.fiverr.com/sellers/mr_shehary/',
    'https://github.com/sheharyarsiraj'
  ],
  alumniOf: [
    {
      '@type': 'EducationalOrganization',
      name: 'Virtual University of Pakistan',
      url: 'https://www.vu.edu.pk/'
    },
    {
      '@type': 'EducationalOrganization',
      name: 'Sir Syed University of Engineering & Technology (SSUET)',
      url: 'https://www.ssuet.edu.pk/'
    }
  ],
  hasCredential: [
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'Cisco Certified Network Professional (CCNP)',
      credentialCategory: 'Professional Certification',
      recognizedBy: {
        '@type': 'Organization',
        name: 'Cisco Systems',
        url: 'https://www.cisco.com/'
      }
    },
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'Networking Academy Learn-A-Thon 2022',
      credentialCategory: 'Professional Certification',
      recognizedBy: {
        '@type': 'Organization',
        name: 'Cisco Networking Academy',
        url: 'https://www.netacad.com/'
      }
    },
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'AI for App Building & Development Workflows',
      credentialCategory: 'Professional Certification',
      recognizedBy: {
        '@type': 'Organization',
        name: 'Professional Training Program'
      }
    },
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'AI for Data Analysis & Automation',
      credentialCategory: 'Professional Certification',
      recognizedBy: {
        '@type': 'Organization',
        name: 'Professional Training Program'
      }
    },
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'AI for Content Creation',
      credentialCategory: 'Professional Certification',
      recognizedBy: {
        '@type': 'Organization',
        name: 'Professional Training Program'
      }
    },
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'Internet of Things (IoT) Systems Architecture',
      credentialCategory: 'Professional Certification',
      recognizedBy: {
        '@type': 'Organization',
        name: 'Sir Syed University of Engineering & Technology (SSUET)',
        url: 'https://www.ssuet.edu.pk/'
      }
    },
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'Google Cloud Vertex AI Certified Specialist',
      credentialCategory: 'Professional Certification',
      recognizedBy: {
        '@type': 'Organization',
        name: 'Google Cloud',
        url: 'https://cloud.google.com/'
      }
    },
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'Anthropic AI Fluency & Prompt Engineering Certification',
      credentialCategory: 'Professional Certification',
      recognizedBy: {
        '@type': 'Organization',
        name: 'Anthropic',
        url: 'https://www.anthropic.com/'
      }
    },
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'Cisco Certified CyberOps Associate',
      credentialCategory: 'Professional Certification',
      recognizedBy: {
        '@type': 'Organization',
        name: 'Cisco Systems',
        url: 'https://www.cisco.com/'
      }
    }
  ],
  worksFor: {
    '@id': BUSINESS_ID
  },
  knowsAbout: [
    'Agentic AI Workflows & Autonomous Tool Calling',
    'Full-Stack Vibe Coding with LLMs',
    'WordPress Systems Engineering (Custom Themes & Plugins)',
    'WooCommerce Architecture & Payment Gateways',
    'Elementor Pro Advanced Architecture',
    'AI Voice Agents & Telephony (Vapi, ElevenLabs, Retell AI)',
    'Contextual AI Chatbots & RAG (Pinecone, pgvector)',
    'Event-Driven Workflow Automation (n8n, Make.com)',
    'Python Data Analytics Pipelines & Machine Learning',
    'Data Cleaning & Business Intelligence Dashboards',
    'PHP 8.2+ Object-Oriented Development',
    'TypeScript & React Systems',
    'Technical SEO, Schema.org Graph & Core Web Vitals',
    'WordPress Database Cleanup & Malware Recovery',
    'Generative Engine Optimization (GEO)',
    'Answer Engine Optimization (AEO)'
  ]
};

export const BASE_BUSINESS_ENTITY = {
  '@type': 'ProfessionalService',
  '@id': BUSINESS_ID,
  name: 'Sheharyar Siraj - AI Systems & Web Architecture',
  description: 'Enterprise WordPress engineering, sub-600ms conversational AI voice agents, and autonomous n8n workflow automations for mid-market enterprises and digital agencies.',
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/favicon.svg`,
  image: `${SITE_URL}/og-image.webp`,
  telephone: '+923132080033',
  email: 'sherryansari870@gmail.com',
  priceRange: '$$$',
  currenciesAccepted: 'USD, GBP, EUR, CAD, AED, SAR',
  paymentAccepted: 'Credit Card, Direct Bank Wire, Stripe, ACH, SEPA, Upwork Enterprise',
  founder: {
    '@id': PERSON_ID
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Karachi',
    addressCountry: 'Pakistan'
  },
  areaServed: [
    { '@type': 'Country', name: 'United States', identifier: 'US' },
    { '@type': 'Country', name: 'United Kingdom', identifier: 'GB' },
    { '@type': 'Country', name: 'Germany', identifier: 'DE' },
    { '@type': 'Country', name: 'Canada', identifier: 'CA' },
    { '@type': 'Country', name: 'United Arab Emirates', identifier: 'AE' },
    { '@type': 'Country', name: 'Saudi Arabia', identifier: 'SA' },
    { '@type': 'Country', name: 'Singapore', identifier: 'SG' },
    { '@type': 'Country', name: 'Malaysia', identifier: 'MY' },
    { '@type': 'Country', name: 'Australia', identifier: 'AU' },
    { '@type': 'Country', name: 'Netherlands', identifier: 'NL' }
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Enterprise Web & AI Systems Service Catalog',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          '@id': `${SITE_URL}/services/custom-wordpress-development/#service`,
          name: 'Custom WordPress Development',
          description: 'Custom PHP 8.2+ WordPress architecture delivering 95+ Core Web Vitals.'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          '@id': `${SITE_URL}/services/woocommerce-systems-architecture/#service`,
          name: 'WooCommerce Systems Architecture',
          description: 'High-concurrency WooCommerce HPOS architectures with custom checkout funnels.'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          '@id': `${SITE_URL}/services/ai-voice-agents/#service`,
          name: 'Autonomous AI Voice Agents',
          description: 'Sub-600ms conversational telephony voice agents built on Vapi and Twilio SIP.'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          '@id': `${SITE_URL}/services/ai-chatbots-rag/#service`,
          name: 'Contextual AI Chatbots & RAG Systems',
          description: 'Enterprise RAG agents grounded in proprietary business documentation with zero hallucination.'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          '@id': `${SITE_URL}/services/workflow-automation-n8n/#service`,
          name: 'Workflow Automation & n8n Architecture',
          description: 'Self-hosted n8n automation clusters orchestrating CRM, payment, and ERP systems.'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          '@id': `${SITE_URL}/services/agentic-ai-applications/#service`,
          name: 'Agentic AI Systems & Multi-Agent Applications',
          description: 'Autonomous goal-directed agent architectures with LangGraph, CrewAI, and secure tool calling.'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          '@id': `${SITE_URL}/services/data-science-analytics/#service`,
          name: 'Data Science Pipelines & Enterprise Analytics',
          description: 'Automated ETL/ELT pipelines, predictive ML models, and executive BI dashboards.'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          '@id': `${SITE_URL}/services/vibe-coding-engineering/#service`,
          name: 'Production Vibe Coding & AI Web Systems',
          description: 'Rapid prompt-driven full-stack application development with zero hallucinations and strict engineering.'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          '@id': `${SITE_URL}/services/custom-saas-mvp-development/#service`,
          name: 'Custom SaaS Architecture & MVP Development',
          description: 'Scalable multi-tenant B2B SaaS web applications with Stripe billing, PostgreSQL, and sub-second dashboards.'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          '@id': `${SITE_URL}/services/ai-video-ads-ugc/#service`,
          name: 'AI Video Ads & Synthetic UGC Creative Production',
          description: 'High-converting generative AI video ads, hyper-realistic synthetic UGC creators, ElevenLabs voice cloning, and multilingual ad localization.'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          '@id': `${SITE_URL}/white-label/marketing-agencies/#service`,
          name: 'White-Label WordPress & AI for Marketing Agencies',
          description: 'Invisible senior technical execution for growth marketing agencies under strict NDA.'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          '@id': `${SITE_URL}/white-label/seo-agencies/#service`,
          name: 'White-Label Technical SEO & Web Engineering',
          description: 'Code-level Core Web Vitals remediation and programmatic SEO directory engines.'
        }
      }
    ]
  }
};

export const BASE_WEBSITE_ENTITY = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: `${SITE_URL}/`,
  name: 'Sheharyar Siraj | AI Automation Architect & WordPress Systems Engineer',
  description: 'Connected digital systems where WordPress provides the foundation, AI provides intelligence, and automation handles execution.',
  publisher: {
    '@id': PERSON_ID
  }
};

function formatFaqEntity(url: string, faqs: AeoFaq[]) {
  return {
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

function formatBreadcrumbs(items: { name: string; item: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${items[items.length - 1].item}#breadcrumbs`,
    itemListElement: items.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.item
    }))
  };
}

export function generateSchemaGraph(route: string): { '@context': string; '@graph': any[] } {
  const cleanRoute = route.endsWith('/') && route.length > 1 ? route.slice(0, -1) : route;
  const canonicalUrl = `${SITE_URL}${cleanRoute === '' ? '/' : cleanRoute + '/'}`;

  const graphNodes: any[] = [
    BASE_PERSON_ENTITY,
    BASE_BUSINESS_ENTITY,
    BASE_WEBSITE_ENTITY
  ];

  // 1. Root Home Page
  if (cleanRoute === '' || cleanRoute === '/') {
    graphNodes.push({
      '@type': 'ProfilePage',
      '@id': `${SITE_URL}/#webpage`,
      url: `${SITE_URL}/`,
      name: 'Sheharyar Siraj | AI Automation Architect & WordPress Systems Engineer',
      description: 'Connected digital systems where WordPress provides the foundation, AI provides intelligence, and automation handles execution. 1,200+ projects delivered worldwide.',
      isPartOf: { '@id': WEBSITE_ID },
      about: { '@id': PERSON_ID },
      mainEntity: {
        '@type': 'Person',
        '@id': PERSON_ID,
        name: BASE_PERSON_ENTITY.name,
        jobTitle: BASE_PERSON_ENTITY.jobTitle,
        url: BASE_PERSON_ENTITY.url,
        image: BASE_PERSON_ENTITY.image,
        sameAs: BASE_PERSON_ENTITY.sameAs
      }
    });

    graphNodes.push(formatFaqEntity(`${SITE_URL}/`, FAQ_ITEMS));
    return { '@context': 'https://schema.org', '@graph': graphNodes };
  }

  // 2. Services Hub Page (/services/)
  if (cleanRoute === '/services') {
    graphNodes.push({
      '@type': 'CollectionPage',
      '@id': `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: 'WordPress & AI Systems Services Hub | Sheharyar Siraj',
      description: 'Comprehensive B2B systems engineering taxonomy: custom WordPress VIP architectures, sub-600ms AI voice agents, contextual RAG chatbots, and n8n workflow automations.',
      isPartOf: { '@id': WEBSITE_ID }
    });

    graphNodes.push(
      formatBreadcrumbs([
        { name: 'Home', item: `${SITE_URL}/` },
        { name: 'Services Hub', item: canonicalUrl }
      ])
    );

    graphNodes.push({
      '@type': 'Service',
      '@id': `${canonicalUrl}#service`,
      name: 'Enterprise Web & AI Automation Systems Services',
      description: 'Enterprise B2B digital systems architecture spanning custom WordPress, WooCommerce, AI voice telephony, and autonomous workflow pipelines.',
      provider: { '@id': BUSINESS_ID },
      areaServed: BASE_BUSINESS_ENTITY.areaServed
    });

    graphNodes.push(formatFaqEntity(canonicalUrl, SERVICES_HUB_FAQS));
    return { '@context': 'https://schema.org', '@graph': graphNodes };
  }

  // 3. Sub-Service Pages (/services/{slug}/)
  if (cleanRoute.startsWith('/services/')) {
    const slug = cleanRoute.replace('/services/', '');
    const service = SUB_SERVICES[slug];

    if (service) {
      graphNodes.push({
        '@type': 'WebPage',
        '@id': `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: service.metaTitle,
        description: service.metaDescription,
        isPartOf: { '@id': WEBSITE_ID }
      });

      graphNodes.push(
        formatBreadcrumbs([
          { name: 'Home', item: `${SITE_URL}/` },
          { name: 'Services', item: `${SITE_URL}/services/` },
          { name: service.title, item: canonicalUrl }
        ])
      );

      graphNodes.push({
        '@type': 'Service',
        '@id': `${canonicalUrl}#service`,
        name: service.title,
        serviceType: service.badge,
        description: service.metaDescription,
        category: 'Web Engineering & Artificial Intelligence',
        provider: { '@id': BUSINESS_ID },
        areaServed: BASE_BUSINESS_ENTITY.areaServed,
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: `${service.title} Capabilities`,
          itemListElement: service.coreCapabilities.map((cap) => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: cap
            }
          }))
        }
      });

      if (service.faqs && service.faqs.length > 0) {
        graphNodes.push(formatFaqEntity(canonicalUrl, service.faqs));
      }
    }

    return { '@context': 'https://schema.org', '@graph': graphNodes };
  }

  // 4. White-Label Agency Portals (/white-label/{slug}/)
  if (cleanRoute.startsWith('/white-label/')) {
    const slug = cleanRoute.replace('/white-label/', '');
    const portal = WHITE_LABEL_PORTALS[slug];

    if (portal) {
      graphNodes.push({
        '@type': 'WebPage',
        '@id': `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: portal.metaTitle,
        description: portal.metaDescription,
        isPartOf: { '@id': WEBSITE_ID }
      });

      graphNodes.push(
        formatBreadcrumbs([
          { name: 'Home', item: `${SITE_URL}/` },
          { name: 'Services Hub', item: `${SITE_URL}/services/` },
          { name: portal.title, item: canonicalUrl }
        ])
      );

      graphNodes.push({
        '@type': 'Service',
        '@id': `${canonicalUrl}#service`,
        name: portal.title,
        serviceType: portal.badge,
        description: portal.metaDescription,
        category: 'Agency White-Label Subcontracting',
        provider: { '@id': BUSINESS_ID },
        areaServed: BASE_BUSINESS_ENTITY.areaServed
      });

      if (portal.faqs && portal.faqs.length > 0) {
        graphNodes.push(formatFaqEntity(canonicalUrl, portal.faqs));
      }
    }

    return { '@context': 'https://schema.org', '@graph': graphNodes };
  }

  // 5. Locations Hub Page (/locations/)
  if (cleanRoute === '/locations') {
    graphNodes.push({
      '@type': 'CollectionPage',
      '@id': `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: 'Global Engineering Hubs & Locations | Sheharyar Siraj',
      description: 'Explore regional systems architecture hubs across the US, UK, Germany, Canada, UAE, Saudi Arabia, Singapore, Malaysia, Australia, and Netherlands with localized compliance and timezone overlap.',
      isPartOf: { '@id': WEBSITE_ID }
    });

    graphNodes.push(
      formatBreadcrumbs([
        { name: 'Home', item: `${SITE_URL}/` },
        { name: 'Global Locations', item: canonicalUrl }
      ])
    );

    graphNodes.push({
      '@type': 'Service',
      '@id': `${canonicalUrl}#service`,
      name: 'Global Enterprise Systems Engineering & AI Deployment',
      description: 'Localized B2B software engineering, custom WordPress VIP setups, and enterprise AI automation across 10 global tech regions.',
      provider: { '@id': BUSINESS_ID },
      areaServed: BASE_BUSINESS_ENTITY.areaServed
    });

    graphNodes.push(formatFaqEntity(canonicalUrl, LOCATIONS_HUB_FAQS));
    return { '@context': 'https://schema.org', '@graph': graphNodes };
  }

  // 6. Regional GEO Location Pages (/locations/{slug}/)
  if (cleanRoute.startsWith('/locations/')) {
    const slug = cleanRoute.replace('/locations/', '');
    const loc = REGIONAL_LOCATIONS[slug];

    if (loc) {
      graphNodes.push({
        '@type': 'WebPage',
        '@id': `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: loc.metaTitle,
        description: loc.metaDescription,
        isPartOf: { '@id': WEBSITE_ID }
      });

      graphNodes.push(
        formatBreadcrumbs([
          { name: 'Home', item: `${SITE_URL}/` },
          { name: 'Global Locations', item: `${SITE_URL}/locations/` },
          { name: loc.country, item: canonicalUrl }
        ])
      );

      graphNodes.push({
        '@type': 'ProfessionalService',
        '@id': `${canonicalUrl}#localbusiness`,
        name: `Sheharyar Siraj: Systems Engineering for ${loc.country}`,
        description: loc.metaDescription,
        url: canonicalUrl,
        priceRange: '$$$',
        currenciesAccepted: loc.currencySettlement.split(' ')[0] || 'USD',
        provider: { '@id': PERSON_ID },
        parentOrganization: { '@id': BUSINESS_ID },
        areaServed: {
          '@type': 'Country',
          name: loc.country,
          identifier: loc.regionCode
        }
      });

      if (loc.regionalFaqs && loc.regionalFaqs.length > 0) {
        graphNodes.push(formatFaqEntity(canonicalUrl, loc.regionalFaqs));
      }
    }

    return { '@context': 'https://schema.org', '@graph': graphNodes };
  }

  // 6. Case Studies (/case-studies/)
  if (cleanRoute === '/case-studies') {
    graphNodes.push({
      '@type': 'CollectionPage',
      '@id': `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: 'AI & WordPress Systems Case Studies | Sheharyar Siraj',
      description: 'Detailed B2B case studies: enterprise WordPress & WooCommerce migrations, sub-600ms AI voice qualification, and n8n CRM pipelines by Sheharyar Siraj.',
      isPartOf: { '@id': WEBSITE_ID }
    });

    graphNodes.push(
      formatBreadcrumbs([
        { name: 'Home', item: `${SITE_URL}/` },
        { name: 'Case Studies', item: canonicalUrl }
      ])
    );

    return { '@context': 'https://schema.org', '@graph': graphNodes };
  }

  // Tools Hub Page (/tools/)
  if (cleanRoute === '/tools') {
    graphNodes.push({
      '@type': 'CollectionPage',
      '@id': `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: 'Free WordPress & AI Systems Tools | Sheharyar Siraj',
      description: 'Production-grade interactive tools designed to accelerate development, optimize databases, structure local SEO schemas, and orchestrate AI voice workflows.',
      isPartOf: { '@id': WEBSITE_ID }
    });

    graphNodes.push(
      formatBreadcrumbs([
        { name: 'Home', item: `${SITE_URL}/` },
        { name: 'Systems & Utility Tools', item: canonicalUrl }
      ])
    );

    graphNodes.push({
      '@type': 'SoftwareApplication',
      '@id': `${canonicalUrl}#software`,
      name: 'Sheharyar Siraj Systems & Utility Tools Suite',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'All',
      description: 'Production-grade interactive tools designed to accelerate development, optimize databases, structure local SEO schemas, and orchestrate AI voice workflows.',
      author: { '@id': PERSON_ID },
      offers: {
        '@type': 'Offer',
        price: '0.00',
        priceCurrency: 'USD'
      }
    });

    graphNodes.push(formatFaqEntity(canonicalUrl, TOOLS_HUB_FAQS));
    return { '@context': 'https://schema.org', '@graph': graphNodes };
  }

  // AI-Powered Local Schema & Entity Graph Generator (/tools/local-schema-generator/)
  if (cleanRoute === '/tools/local-schema-generator') {
    graphNodes.push({
      '@type': 'ItemPage',
      '@id': `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: 'AI-Powered Local Schema & Entity Graph Generator | Sheharyar Siraj',
      description: 'Generate connected LocalBusiness JSON-LD schema graphs and LLMs.txt manifests for Google AI Overviews, Perplexity, and local map pack rankings.',
      isPartOf: { '@id': WEBSITE_ID }
    });

    graphNodes.push(
      formatBreadcrumbs([
        { name: 'Home', item: `${SITE_URL}/` },
        { name: 'Systems & Utility Tools', item: `${SITE_URL}/tools/` },
        { name: 'Local Schema & Entity Generator', item: canonicalUrl }
      ])
    );

    graphNodes.push({
      '@type': 'SoftwareApplication',
      '@id': `${canonicalUrl}#tool`,
      name: 'AI-Powered Local Schema & Entity Graph Generator',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'All',
      description: 'Generate connected LocalBusiness JSON-LD schema graphs and LLMs.txt manifests for Google AI Overviews, Perplexity, and local map pack rankings.',
      author: { '@id': PERSON_ID },
      offers: {
        '@type': 'Offer',
        price: '0.00',
        priceCurrency: 'USD'
      }
    });

    const localSchemaFaqs = [
      {
        question: 'Why does an @id URI anchor matter inside your local schema?',
        answer: 'Search engine crawlers process web pages as isolated documents unless you explicitly connect them into a global entity graph. By adding an @id anchor such as https://yoursite.com/#business, you create a permanent identifier. This allows your organization node, location coordinates, founder profile, and service catalogs to bind together without ambiguous duplicates.'
      },
      {
        question: 'How does an llms.txt file help with Google AI Overviews and Perplexity?',
        answer: 'Large language models scan text for clean, factual certainty. Modern AI crawlers look for /llms.txt at the domain root as a distilled markdown manifest. It delivers your operating radius, direct services, phone format, and geographic boundaries without forcing the model to infer details through heavy DOM parsing.'
      },
      {
        question: 'Will this code conflict with existing SEO plugins like Yoast or Rank Math?',
        answer: 'No, provided you disable their default local business modules. When you inject clean JSON-LD through a simple WordPress head hook, you bypass redundant postmeta lookups and prevent plugins from outputting fragmented, conflicting organization blocks.'
      },
      {
        question: 'How quickly do search engines recognize updated entity connections?',
        answer: 'Google typically reindexes the home page entity graph within 48 to 72 hours of submission via Google Search Console. AI Overviews and citation aggregators update their grounding caches within one to two crawl cycles once the structured data passes validation.'
      }
    ];

    graphNodes.push(formatFaqEntity(canonicalUrl, localSchemaFaqs));
    return { '@context': 'https://schema.org', '@graph': graphNodes };
  }

  // WordPress Database Bloat & Transient Cleaner Estimator (/tools/wordpress-database-bloat-estimator/)
  if (cleanRoute === '/tools/wordpress-database-bloat-estimator') {
    graphNodes.push({
      '@type': 'ItemPage',
      '@id': `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: 'WordPress Database Bloat & Transient Cleaner Estimator | Sheharyar Siraj',
      description: 'Estimate wp_options autoload weight, orphaned transient bloat, and server TTFB slowdown. Download custom database optimization SQL and PHP snippets.',
      isPartOf: { '@id': WEBSITE_ID }
    });

    graphNodes.push(
      formatBreadcrumbs([
        { name: 'Home', item: `${SITE_URL}/` },
        { name: 'Systems & Utility Tools', item: `${SITE_URL}/tools/` },
        { name: 'WordPress Database Bloat Estimator', item: canonicalUrl }
      ])
    );

    graphNodes.push({
      '@type': 'SoftwareApplication',
      '@id': `${canonicalUrl}#tool`,
      name: 'WordPress Database Bloat & Transient Cleaner Estimator',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'All',
      description: 'Estimate wp_options autoload weight, orphaned transient bloat, and server TTFB slowdown. Download custom database optimization SQL and PHP snippets.',
      author: { '@id': PERSON_ID },
      offers: {
        '@type': 'Offer',
        price: '0.00',
        priceCurrency: 'USD'
      }
    });

    const dbBloatFaqs = [
      {
        question: 'Why does autoloaded data in wp_options slow down every single page request?',
        answer: 'When WordPress initializes, it executes an early query: SELECT option_name, option_value FROM wp_options WHERE autoload = "yes". This query runs on every HTTP request before routing or page caching occurs. When this table grows past 1MB, MySQL performs a slow table seek, and the PHP process allocates excessive RAM memory to parse the serialized strings, driving up Time to First Byte (TTFB).'
      },
      {
        question: 'Why does WordPress core fail to delete expired transients automatically?',
        answer: 'WordPress only checks if a transient is expired when code attempts to read that specific transient key via get_transient(). If a plugin updates, deactivates, or ceases calling that specific key, the transient row and its timeout companion remain in wp_options forever unless an external worker purges them.'
      },
      {
        question: 'How does WooCommerce multiply database bloat compared to standard sites?',
        answer: 'WooCommerce stores customer cart tokens, active session states, rate limits, and shipping quotes inside wp_options and custom tables as transients. On busy stores without Redis object caching, tens of thousands of session keys accumulate each month, leading to severe database page fragmentation and cart slowdowns.'
      },
      {
        question: 'Is it safe to delete all transients from wp_options?',
        answer: 'Yes. Transients are by definition temporary cached data designed to expire. Any active plugin or theme will automatically regenerate its required transients upon the next function execution. Only expired and orphaned transients need deletion.'
      }
    ];

    graphNodes.push(formatFaqEntity(canonicalUrl, dbBloatFaqs));
    return { '@context': 'https://schema.org', '@graph': graphNodes };
  }

  // WordPress Custom Post Type & Meta Field Code Exporter (/tools/wordpress-cpt-code-exporter/)
  if (cleanRoute === '/tools/wordpress-cpt-code-exporter') {
    graphNodes.push({
      '@type': 'ItemPage',
      '@id': `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: 'WordPress Custom Post Type & Meta Field Code Exporter | Sheharyar Siraj',
      description: 'Generate production-ready PHP 8.2 code for WordPress custom post types and meta boxes. Clean, security-hardened snippets with zero plugin overhead.',
      isPartOf: { '@id': WEBSITE_ID }
    });

    graphNodes.push(
      formatBreadcrumbs([
        { name: 'Home', item: `${SITE_URL}/` },
        { name: 'Systems & Utility Tools', item: `${SITE_URL}/tools/` },
        { name: 'WordPress CPT Code Exporter', item: canonicalUrl }
      ])
    );

    graphNodes.push({
      '@type': 'SoftwareApplication',
      '@id': `${canonicalUrl}#tool`,
      name: 'WordPress Custom Post Type & Meta Field Code Exporter',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'All',
      description: 'Generate production-ready PHP 8.2 code for WordPress custom post types and meta boxes. Clean, security-hardened snippets with zero plugin overhead.',
      author: { '@id': PERSON_ID },
      offers: {
        '@type': 'Offer',
        price: '0.00',
        priceCurrency: 'USD'
      }
    });

    const cptCodeExporterFaqs = [
      {
        question: 'Why should I register custom post types programmatically instead of using a UI plugin?',
        answer: 'UI plugins store post type parameters inside wp_options or compile dynamic queries on every bootstrap. Pure PHP registration runs directly in opcache during the init action, eliminating database roundtrips, reducing attack surface, and allowing your data architecture to remain version-controlled in Git.'
      },
      {
        question: 'Where should I paste the generated PHP code snippet in my WordPress setup?',
        answer: 'Place the code snippet inside a custom site-specific plugin (in wp-content/plugins/) or within your active child theme functions.php. Using a site-specific plugin is recommended so your post types persist even if you switch front-end themes.'
      },
      {
        question: 'Why do custom post types return 404 errors immediately after registration?',
        answer: 'WordPress caches rewrite rules in the database. When you register a new post type with public permalinks, WordPress does not rewrite rules automatically. Navigate to Settings > Permalinks in wp-admin and click Save Changes to flush rewrite rules safely.'
      },
      {
        question: 'How does native PHP meta box registration compare to Advanced Custom Fields (ACF)?',
        answer: 'Native meta boxes require zero dependencies, run with native nonces, and store values directly in wp_postmeta without additional field reference keys. ACF provides a polished administration UI and complex field types like repeaters at the cost of plugin overhead.'
      }
    ];

    graphNodes.push(formatFaqEntity(canonicalUrl, cptCodeExporterFaqs));
    return { '@context': 'https://schema.org', '@graph': graphNodes };
  }

  // Voice Agent & Workflow Cost/ROI Calculator (/tools/voice-agent-roi-calculator/)
  if (cleanRoute === '/tools/voice-agent-roi-calculator') {
    graphNodes.push({
      '@type': 'ItemPage',
      '@id': `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: 'Voice Agent & Workflow Cost/ROI Calculator | Sheharyar Siraj',
      description: 'Calculate operational cost savings, hours saved, and lead conversion lift from deploying autonomous AI voice agents and n8n workflows. Real-time telephony financial modeling.',
      isPartOf: { '@id': WEBSITE_ID }
    });

    graphNodes.push(
      formatBreadcrumbs([
        { name: 'Home', item: `${SITE_URL}/` },
        { name: 'Systems & Utility Tools', item: `${SITE_URL}/tools/` },
        { name: 'Voice Agent ROI Calculator', item: canonicalUrl }
      ])
    );

    graphNodes.push({
      '@type': 'SoftwareApplication',
      '@id': `${canonicalUrl}#tool`,
      name: 'Voice Agent & Workflow Cost/ROI Calculator',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'All',
      description: 'Calculate operational cost savings, hours saved, and lead conversion lift from deploying autonomous AI voice agents and n8n workflows. Real-time telephony financial modeling.',
      author: { '@id': PERSON_ID },
      offers: {
        '@type': 'Offer',
        price: '0.00',
        priceCurrency: 'USD'
      }
    });

    const voiceRoiFaqs = [
      {
        question: 'How do conversational AI voice agents maintain sub-600ms latency without awkward pauses?',
        answer: 'Achieving conversational flow requires a pipeline built on WebSocket streaming. The system uses Deepgram Nova-2 for real-time speech-to-text token streaming, passes prompts to low-latency models like Llama 3.3 70B or GPT-4o mini, and streams generated tokens directly into Cartesia Sonic or ElevenLabs Turbo audio generation. By avoiding monolithic buffer chunks, time to first audio byte stays comfortably below 600 milliseconds.'
      },
      {
        question: 'How does the voice agent synchronize caller data with our existing CRM and calendar?',
        answer: 'During and immediately upon call completion, Vapi or Retell triggers structured HTTP webhook payloads. Self-hosted n8n workflows validate HMAC signatures, extract structured JSON parameters (caller name, intent, qualification score, requested appointment timestamp), and update platforms like HubSpot, Salesforce, GoHighLevel, or custom PostgreSQL databases within two seconds.'
      },
      {
        question: 'What happens when a caller requires human escalation or exhibits complex edge cases?',
        answer: 'The agent monitors conversation sentiment, explicit escalation requests, and strict confidence boundaries. When an escalation trigger occurs, the voice engine uses SIP refer transfer or Twilio live bridging to forward the caller directly to an on-duty specialist, while simultaneously posting a conversation summary to your internal Slack or Microsoft Teams channel.'
      },
      {
        question: 'Can we port our existing business phone numbers to this AI voice pipeline?',
        answer: 'Yes. You can route inbound numbers through Twilio, Telnyx, or your existing SIP trunking provider. Forwarding rules can be set to 24/7 direct pick-up, after-hours overflow, or simultaneous hunt groups where the AI answers instantly if human agents do not pick up within two rings.'
      }
    ];

    graphNodes.push(formatFaqEntity(canonicalUrl, voiceRoiFaqs));
    return { '@context': 'https://schema.org', '@graph': graphNodes };
  }

  // AI Voice Agent Flowchart & Prompt Architecture Designer (/tools/ai-voice-prompt-designer/)
  if (cleanRoute === '/tools/ai-voice-prompt-designer') {
    graphNodes.push({
      '@type': 'ItemPage',
      '@id': `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: 'AI Voice Agent Flowchart & Prompt Architecture Designer | Sheharyar Siraj',
      description: 'Design production-ready Vapi and Retell system prompts, JSON state machines, and low-latency voice agent architectures. Anti-hallucination guardrails and function calling.',
      isPartOf: { '@id': WEBSITE_ID }
    });

    graphNodes.push(
      formatBreadcrumbs([
        { name: 'Home', item: `${SITE_URL}/` },
        { name: 'Systems & Utility Tools', item: `${SITE_URL}/tools/` },
        { name: 'AI Voice Prompt Designer', item: canonicalUrl }
      ])
    );

    graphNodes.push({
      '@type': 'SoftwareApplication',
      '@id': `${canonicalUrl}#tool`,
      name: 'AI Voice Agent Flowchart & Prompt Architecture Designer',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'All',
      description: 'Design production-ready Vapi and Retell system prompts, JSON state machines, and low-latency voice agent architectures. Anti-hallucination guardrails and function calling.',
      author: { '@id': PERSON_ID },
      offers: {
        '@type': 'Offer',
        price: '0.00',
        priceCurrency: 'USD'
      }
    });

    const promptDesignerFaqs = [
      {
        question: 'Why must voice prompts differ fundamentally from text chatbot prompts?',
        answer: 'Voice prompts operate under strict latency and auditory processing constraints. Callers cannot skim paragraphs on a screen; they process speech linearly. Voice prompts must restrict conversational turns to 1 or 2 spoken sentences, avoid bullet points or markdown syntax that TTS engines garble, and explicitly format phone numbers and dates into spoken phoneme structures.'
      },
      {
        question: 'How do state machines prevent LLM hallucination and off-script rambling in voice agents?',
        answer: 'Rather than relying on vague roleplay instructions, a production voice agent uses rigid conversational state gates. The prompt defines explicit states (such as Greeting, Triage, Calendar Lookup, and Confirmation) where transitions only occur when specific parameters are extracted or tool calls succeed. This constrains the LLM reasoning scope to the current conversational milestone.'
      },
      {
        question: 'How do you configure ElevenLabs, Cartesia, and Deepgram inside Vapi for lowest latency?',
        answer: 'In Vapi or Retell, select Deepgram Nova-2 with smart_format enabled as your streaming transcriber. For voice generation, use Cartesia Sonic or ElevenLabs Turbo v2.5 with chunk size set to 50ms and WebSockets enabled. Paired with GPT-4o-mini or Llama 3.3 70B, end-to-end voice latency consistently clocks in between 480ms and 580ms.'
      },
      {
        question: 'How does live call transfer to a human receptionist work with Twilio and SIP trunking?',
        answer: 'When the agent invokes the escalate_to_human_agent function, Vapi or Retell issues a SIP REFER command or executes a Twilio REST API call update. The telephony gateway bridges the caller to your company PBX or cell hunt group while playing a smooth comfort message, preserving the call without disconnecting.'
      }
    ];

    graphNodes.push(formatFaqEntity(canonicalUrl, promptDesignerFaqs));
    return { '@context': 'https://schema.org', '@graph': graphNodes };
  }

  // n8n / Make Webhook Payload Tester & Debugger (/tools/webhook-payload-tester/)
  if (cleanRoute === '/tools/webhook-payload-tester') {
    graphNodes.push({
      '@type': 'ItemPage',
      '@id': `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: 'n8n & Make Webhook Payload Tester & Debugger | Sheharyar Siraj',
      description: 'Inspect incoming JSON webhook payloads, parse nested keys, validate headers, and compile production-ready n8n Code Node JavaScript scripts instantly.',
      isPartOf: { '@id': WEBSITE_ID }
    });

    graphNodes.push(
      formatBreadcrumbs([
        { name: 'Home', item: `${SITE_URL}/` },
        { name: 'Systems & Utility Tools', item: `${SITE_URL}/tools/` },
        { name: 'Webhook Payload Tester', item: canonicalUrl }
      ])
    );

    graphNodes.push({
      '@type': 'SoftwareApplication',
      '@id': `${canonicalUrl}#tool`,
      name: 'n8n & Make Webhook Payload Tester & Debugger',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'All',
      description: 'Inspect incoming JSON webhook payloads, parse nested keys, validate headers, and compile production-ready n8n Code Node JavaScript scripts instantly.',
      author: { '@id': PERSON_ID },
      offers: {
        '@type': 'Offer',
        price: '0.00',
        priceCurrency: 'USD'
      }
    });

    const webhookTesterFaqs = [
      {
        question: 'Why do webhook payloads frequently fail to parse inside n8n Code Nodes?',
        answer: 'When webhooks arrive through reverse proxies or certain API gateways, the payload body is delivered as a stringified raw text buffer rather than a native JavaScript object. Calling item.json.body.user directly throws an undefined property exception. Defensive scripts must verify typeof body === "string" and apply JSON.parse() within a try-catch block before property access.'
      },
      {
        question: 'How do you prevent duplicate execution when third-party services retry webhooks?',
        answer: 'Services like Stripe, Shopify, and Twilio automatically retry unacknowledged webhook deliveries up to 72 hours. To guarantee idempotent processing, extract the unique event ID (such as evt_xxx or message_sid) on the first node and perform an atomic lookup in Redis or your database with an expiration key. If the key exists, return HTTP 200 immediately without executing downstream operations.'
      },
      {
        question: 'What is the correct protocol for verifying HMAC signatures in self-hosted n8n?',
        answer: 'Do not verify HMAC signatures using parsed JSON strings, because JSON serializers reorder object keys and alter spacing, corrupting the hash. Pass the raw binary payload buffer directly into the Crypto node or a custom Code Node using crypto.createHmac("sha256", secret).update(rawBody).digest("hex") and compare using crypto.timingSafeEqual().'
      },
      {
        question: 'How should n8n and Make.com workflows handle transient downstream rate limits (HTTP 429)?',
        answer: 'Never let a webhook workflow fail silently on HTTP 429. In n8n, enable "Retry on Fail" with exponential backoff on HTTP Request nodes. In Make.com, attach a Break error handler directive that queues the failed bundle into the dead-letter queue with automatic execution retries spaced over 15, 60, and 300 seconds.'
      }
    ];

    graphNodes.push(formatFaqEntity(canonicalUrl, webhookTesterFaqs));
    return { '@context': 'https://schema.org', '@graph': graphNodes };
  }

  // n8n Error Handler & JSON Payload Transformer (/tools/n8n-error-handler-generator/)
  if (cleanRoute === '/tools/n8n-error-handler-generator') {
    graphNodes.push({
      '@type': 'ItemPage',
      '@id': `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: 'n8n Error Handler & JSON Payload Transformer | Sheharyar Siraj',
      description: 'Transform broken JSON payloads, intercept workflow errors gracefully, and compile defensive JavaScript for n8n Code Nodes and Set Nodes without silent failures.',
      isPartOf: { '@id': WEBSITE_ID }
    });

    graphNodes.push(
      formatBreadcrumbs([
        { name: 'Home', item: `${SITE_URL}/` },
        { name: 'Systems & Utility Tools', item: `${SITE_URL}/tools/` },
        { name: 'n8n Error Handler Generator', item: canonicalUrl }
      ])
    );

    graphNodes.push({
      '@type': 'SoftwareApplication',
      '@id': `${canonicalUrl}#tool`,
      name: 'n8n Error Handler & JSON Payload Transformer',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'All',
      description: 'Transform broken JSON payloads, intercept workflow errors gracefully, and compile defensive JavaScript for n8n Code Nodes and Set Nodes without silent failures.',
      author: { '@id': PERSON_ID },
      offers: {
        '@type': 'Offer',
        price: '0.00',
        priceCurrency: 'USD'
      }
    });

    const n8nErrorHandlerFaqs = [
      {
        question: 'Why does enabling "Continue On Fail" without a dedicated error node create data corruption?',
        answer: 'When you enable "Continue On Fail" in an n8n node, the workflow does not stop if an error occurs. Instead, it passes an error object downstream. If downstream nodes (such as Google Sheets, Airtable, or HubSpot) expect valid customer records, they will attempt to write the raw error object into your database, corrupting records and polluting reporting metrics.'
      },
      {
        question: 'How do you configure an n8n Code Node to output two separate execution branches?',
        answer: 'In the n8n Code Node settings, change the "Outputs" configuration from 1 to 2. In your JavaScript return statement, return an array containing two sub-arrays: return [successItems, errorItems]. Output index 0 will emit through the top output connector, while output index 1 will emit through the bottom output connector into your dead-letter queue.'
      },
      {
        question: 'What is the recommended retry strategy for transient HTTP 504 and 502 gateway timeouts?',
        answer: 'Gateway timeouts usually indicate temporary server restarts or transient proxy spikes. Rather than retrying immediately, which overburdens struggling servers, configure exponential backoff: retry after 2 seconds, 4 seconds, and 8 seconds with randomized jitter buffering. If the request fails four consecutive times, route the payload to your dead-letter queue.'
      },
      {
        question: 'How does n8n handle circular references and deeply nested JSON parsing in Code Nodes?',
        answer: 'Attempting to execute JSON.stringify() on objects with circular references throws a TypeError. In n8n, use a defensive replacer function inside JSON.stringify or utilize structured utility libraries to prune circular pointers before writing to external webhook outputs or databases.'
      }
    ];

    graphNodes.push(formatFaqEntity(canonicalUrl, n8nErrorHandlerFaqs));
    return { '@context': 'https://schema.org', '@graph': graphNodes };
  }

  // Dynamic LLM Prompt Generator & SEO Meta Optimizer (/tools/llm-seo-meta-generator/)
  if (cleanRoute === '/tools/llm-seo-meta-generator') {
    graphNodes.push({
      '@type': 'ItemPage',
      '@id': `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: 'Dynamic LLM Prompt Generator & SEO Meta Optimizer | Sheharyar Siraj',
      description: 'Generate high-converting SEO meta titles, meta descriptions, deep-research LLM prompts, and Schema.org Article JSON-LD graphs for programmatic content scaling.',
      isPartOf: { '@id': WEBSITE_ID }
    });

    graphNodes.push(
      formatBreadcrumbs([
        { name: 'Home', item: `${SITE_URL}/` },
        { name: 'Systems & Utility Tools', item: `${SITE_URL}/tools/` },
        { name: 'LLM SEO Meta Generator', item: canonicalUrl }
      ])
    );

    graphNodes.push({
      '@type': 'SoftwareApplication',
      '@id': `${canonicalUrl}#tool`,
      name: 'Dynamic LLM Prompt Generator & SEO Meta Optimizer',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'All',
      description: 'Generate high-converting SEO meta titles, meta descriptions, deep-research LLM prompts, and Schema.org Article JSON-LD graphs for programmatic content scaling.',
      author: { '@id': PERSON_ID },
      offers: {
        '@type': 'Offer',
        price: '0.00',
        priceCurrency: 'USD'
      }
    });

    const llmSeoFaqs = [
      {
        question: 'Why do naive LLM prompts generate low-ranking SEO content?',
        answer: 'Standard prompts lack negative constraints, entity constraints, and information gain directives. When prompted casually, large language models default to median probabilistic training text, generating repetitive transitional fluff and superficial definitions. Search engine quality filters like Google Helpful Content algorithms flag and down-rank generic text because it provides zero original insight or verifiable technical depth.'
      },
      {
        question: 'What is the optimal character and pixel budget for modern Google SEO meta titles?',
        answer: 'Google truncates search result titles that exceed 600 pixels on desktop screens and 580 pixels on mobile viewports. In character terms, this equates to 50 to 60 characters. Keeping your primary keyword within the first 35 characters ensures critical topic visibility even on compact mobile displays before brand name delimiters.'
      },
      {
        question: 'How does structured Article schema improve visibility in Google AI Overviews and Perplexity?',
        answer: 'AI search engines use structured JSON-LD data to verify authoritative authorship, publication timestamps, and semantic entity relationships without guessing. Adding Speakable specifications and explicit entity attributes allows retrieval-augmented generation (RAG) engines to extract factual claims with high confidence scores, significantly increasing citation probability in AI Overviews.'
      },
      {
        question: 'Why does eliminating em-dashes improve readability and AI prompt precision?',
        answer: 'Overusing punctuation like em-dashes leads to fragmented clauses, run-on sentences, and disjointed reading flow on mobile devices. In LLM prompts, enforcing clear, concise sentences with standard punctuation produces cleaner token generation, reduces rambling outputs, and prevents models from generating repetitive parenthetical commentary.'
      }
    ];

    graphNodes.push(formatFaqEntity(canonicalUrl, llmSeoFaqs));
    return { '@context': 'https://schema.org', '@graph': graphNodes };
  }

  // WooCommerce SKU & Metadata Health Auditor (/tools/woocommerce-seo-sku-auditor/)
  if (cleanRoute === '/tools/woocommerce-seo-sku-auditor') {
    graphNodes.push({
      '@type': 'ItemPage',
      '@id': `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: 'WooCommerce SKU & Metadata Health Auditor | Sheharyar Siraj',
      description: 'Audit WooCommerce catalogs for duplicate SKUs, missing SEO meta titles, empty image alt tags, and unoptimized product attributes. Download custom remediation PHP snippets.',
      isPartOf: { '@id': WEBSITE_ID }
    });

    graphNodes.push(
      formatBreadcrumbs([
        { name: 'Home', item: `${SITE_URL}/` },
        { name: 'Systems & Utility Tools', item: `${SITE_URL}/tools/` },
        { name: 'WooCommerce SKU Auditor', item: canonicalUrl }
      ])
    );

    graphNodes.push({
      '@type': 'SoftwareApplication',
      '@id': `${canonicalUrl}#tool`,
      name: 'WooCommerce SKU & Metadata Health Auditor',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'All',
      description: 'Audit WooCommerce catalogs for duplicate SKUs, missing SEO meta titles, empty image alt tags, and unoptimized product attributes. Download custom remediation PHP snippets.',
      author: { '@id': PERSON_ID },
      offers: {
        '@type': 'Offer',
        price: '0.00',
        priceCurrency: 'USD'
      }
    });

    const skuAuditorFaqs = [
      {
        question: 'How do duplicate SKUs and missing meta tags harm Google Shopping organic traffic?',
        answer: 'Google Merchant Center feeds enforce strict identifier uniqueness. When WooCommerce feeds submit duplicate SKUs or products lacking unique identifiers, Google flags the feed for policy violations, resulting in instant SKU disapprovals and suppressed Free Product Listings. Furthermore, pages lacking custom meta titles receive auto-generated search snippet titles that fail to display product modifiers, significantly lowering organic click-through rates.'
      },
      {
        question: 'Why should WooCommerce stores convert custom product attributes into global taxonomies?',
        answer: 'Custom product-level attributes are stored as serialized strings within the wp_postmeta table. Running faceted filters (such as filtering by Color or Size) across thousands of serialized attributes requires full table scans that bypass database indexes. Converting them into global taxonomies (pa_color, pa_size) stores terms in indexed wp_term_relationships tables, allowing Redis object caches to serve faceted queries in sub-25ms.'
      },
      {
        question: 'What is the performance impact of empty image alt tags on WooCommerce SEO?',
        answer: 'Empty image alt text tags eliminate product images from appearing in Google Images, which accounts for up to 20% of high-intent e-commerce visual search discovery. Additionally, screen readers used by visually impaired consumers cannot interpret the product contents, creating compliance vulnerabilities under WCAG 2.1 accessibility regulations.'
      },
      {
        question: 'How does fixing catalog metadata reduce WordPress database bloat and TTFB latency?',
        answer: 'Orphaned attributes, broken metadata entries, and incomplete product drafts create millions of unused postmeta rows in wp_postmeta and stale transient keys in wp_options. Cleaning and standardizing your catalog metadata structure reduces autoload weight, shrinks database table memory footprint, and drops server Time to First Byte (TTFB) response times across catalog category pages.'
      }
    ];

    graphNodes.push(formatFaqEntity(canonicalUrl, skuAuditorFaqs));
    return { '@context': 'https://schema.org', '@graph': graphNodes };
  }

  // WordPress Custom Plugin Boilerplate Generator (/tools/wordpress-plugin-boilerplate-generator/)
  if (cleanRoute === '/tools/wordpress-plugin-boilerplate-generator') {
    graphNodes.push({
      '@type': 'ItemPage',
      '@id': `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: 'WordPress Custom Plugin Boilerplate Generator | Sheharyar Siraj',
      description: 'Generate clean, security-hardened, object-oriented PHP 8.2+ WordPress plugin boilerplates with activation hooks, Settings API, AJAX handlers, and custom post types.',
      isPartOf: { '@id': WEBSITE_ID }
    });

    graphNodes.push(
      formatBreadcrumbs([
        { name: 'Home', item: `${SITE_URL}/` },
        { name: 'Systems & Utility Tools', item: `${SITE_URL}/tools/` },
        { name: 'WordPress Plugin Boilerplate Generator', item: canonicalUrl }
      ])
    );

    graphNodes.push({
      '@type': 'SoftwareApplication',
      '@id': `${canonicalUrl}#tool`,
      name: 'WordPress Custom Plugin Boilerplate Generator',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'All',
      description: 'Generate clean, security-hardened, object-oriented PHP 8.2+ WordPress plugin boilerplates with activation hooks, Settings API, AJAX handlers, and custom post types.',
      author: { '@id': PERSON_ID },
      offers: {
        '@type': 'Offer',
        price: '0.00',
        priceCurrency: 'USD'
      }
    });

    const boilerplateFaqs = [
      {
        question: 'Why should enterprise WordPress plugins use an object-oriented architecture instead of procedural functions?',
        answer: 'Procedural WordPress plugins with loose global functions pollute the global namespace, creating severe function collision risks when third-party plugins or theme updates are introduced. An object-oriented structure organizes activation hooks, admin views, REST endpoints, and AJAX dispatchers into distinct, single-responsibility classes under dedicated PHP namespaces. This enables clean autoloading, effortless unit testing with Mockery or Brain Monkey, and predictable maintenance in team environments.'
      },
      {
        question: 'How does this boilerplate prevent wp_options query bloat during WordPress bootstrap?',
        answer: 'When standard plugins seed default settings using add_option without explicitly setting the autoload flag, WordPress defaults to autoload = yes. On high-traffic stores, hundreds of autoloaded options are bundled into an enormous query on every single request, inflating Redis or Memcached object cache footprints and spiking Time to First Byte (TTFB). This boilerplate explicitly passes autoload = no on activation, ensuring plugin settings are fetched only on pages where they are actively needed.'
      },
      {
        question: 'Why is check_ajax_referer insufficient without an explicit current_user_can check?',
        answer: 'Nonces in WordPress are cryptographic CSRF tokens, not authorization credentials. A valid nonce verifies that an action was intentionally triggered from an authorized browser session, but it does not verify whether that user has administrative privileges. Without an explicit current_user_can check (such as manage_options), any logged-in subscriber or customer could trigger administrative AJAX routines simply by acquiring a valid public nonce.'
      },
      {
        question: 'What is the performance benefit of scoped admin asset enqueuing?',
        answer: 'Many commercial plugins enqueue their JavaScript and CSS stylesheets globally on every admin page, causing dashboard slowness and script conflicts across the block editor and WooCommerce order tables. This generator captures the unique $page_hook returned by add_options_page and halts execution if the current hook does not match, ensuring administrative assets are downloaded exclusively on the plugin settings screen.'
      },
      {
        question: 'Why does this boilerplate flush rewrite rules via transients instead of raw activation execution?',
        answer: 'Running flush_rewrite_rules during the initial activation request is an expensive database operation that can time out on large sites with thousands of rewrite endpoints. By storing a transient flag (flush_rewrite_rules = 1), the rewrite table rebuild is deferred to the subsequent admin bootstrap, guaranteeing smooth, error-free plugin activation.'
      },
      {
        question: 'How does uninstall.php protect database integrity compared to deactivation hooks?',
        answer: 'WordPress VIP coding standards strictly mandate that deactivating a plugin must never delete customer data or configuration settings, because site owners frequently deactivate plugins temporarily for troubleshooting. Data cleanup belongs exclusively in uninstall.php, which WordPress executes only when an administrator explicitly clicks Delete. This boilerplate includes a security-hardened uninstall.php file that verifies administrator privileges before wiping plugin records.'
      }
    ];

    graphNodes.push(formatFaqEntity(canonicalUrl, boilerplateFaqs));
    return { '@context': 'https://schema.org', '@graph': graphNodes };
  }

  // Standalone Tool Detail Pages (/tools/{slug}/)
  if (cleanRoute.startsWith('/tools/')) {
    const slug = cleanRoute.replace('/tools/', '');
    const tool = TOOLS_TAXONOMY[slug];

    if (tool) {
      graphNodes.push({
        '@type': 'ItemPage',
        '@id': `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: `${tool.name} | Sheharyar Siraj`,
        description: tool.shortDescription,
        isPartOf: { '@id': WEBSITE_ID }
      });

      graphNodes.push(
        formatBreadcrumbs([
          { name: 'Home', item: `${SITE_URL}/` },
          { name: 'Systems & Utility Tools', item: `${SITE_URL}/tools/` },
          { name: tool.name, item: canonicalUrl }
        ])
      );

      graphNodes.push({
        '@type': 'SoftwareApplication',
        '@id': `${canonicalUrl}#tool`,
        name: tool.name,
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'All',
        description: tool.fullDescription,
        author: { '@id': PERSON_ID },
        offers: {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'USD'
        }
      });

      if (tool.faqs && tool.faqs.length > 0) {
        graphNodes.push(formatFaqEntity(canonicalUrl, tool.faqs));
      }
    }

    return { '@context': 'https://schema.org', '@graph': graphNodes };
  }

  // 7. About Page (/about/)
  if (cleanRoute === '/about') {
    graphNodes.push({
      '@type': 'ProfilePage',
      '@id': `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: 'About Sheharyar Siraj | AI Architect & WP Engineer',
      description: 'Learn about Sheharyar Siraj: 5+ years of systems engineering, 1,200+ projects delivered worldwide, custom WordPress VIP systems, and AI automation.',
      isPartOf: { '@id': WEBSITE_ID },
      about: { '@id': PERSON_ID },
      mainEntity: {
        '@type': 'Person',
        '@id': PERSON_ID,
        name: BASE_PERSON_ENTITY.name,
        jobTitle: BASE_PERSON_ENTITY.jobTitle,
        url: BASE_PERSON_ENTITY.url,
        image: BASE_PERSON_ENTITY.image,
        sameAs: BASE_PERSON_ENTITY.sameAs
      }
    });

    graphNodes.push(
      formatBreadcrumbs([
        { name: 'Home', item: `${SITE_URL}/` },
        { name: 'About', item: canonicalUrl }
      ])
    );

    return { '@context': 'https://schema.org', '@graph': graphNodes };
  }

  // 7b. Certifications Page (/certifications/ & /credentials/)
  if (cleanRoute === '/certifications' || cleanRoute === '/credentials') {
    graphNodes.push({
      '@type': 'ProfilePage',
      '@id': `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: 'Verified Technical Certifications & Credentials | Sheharyar Siraj',
      description: 'Audited technical certifications in Cisco Enterprise Networking (CCNP), Artificial Intelligence engineering, IoT systems, and academic software engineering.',
      isPartOf: { '@id': WEBSITE_ID },
      about: { '@id': PERSON_ID },
      mainEntity: {
        '@type': 'Person',
        '@id': PERSON_ID,
        name: BASE_PERSON_ENTITY.name,
        jobTitle: BASE_PERSON_ENTITY.jobTitle,
        url: BASE_PERSON_ENTITY.url,
        image: BASE_PERSON_ENTITY.image,
        sameAs: BASE_PERSON_ENTITY.sameAs,
        hasCredential: BASE_PERSON_ENTITY.hasCredential
      }
    });

    graphNodes.push(
      formatBreadcrumbs([
        { name: 'Home', item: `${SITE_URL}/` },
        { name: 'About', item: `${SITE_URL}/about/` },
        { name: 'Certifications', item: canonicalUrl }
      ])
    );

    return { '@context': 'https://schema.org', '@graph': graphNodes };
  }

  // 8. Contact Page (/contact/)
  if (cleanRoute === '/contact') {
    graphNodes.push({
      '@type': 'ContactPage',
      '@id': `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: 'Contact Sheharyar Siraj | Hire AI & WP Engineer',
      description: 'Connect directly with Sheharyar Siraj. Sub-2 hour response time SLA, WhatsApp instant channel, email, and scheduled architecture scoping sessions.',
      isPartOf: { '@id': WEBSITE_ID }
    });

    graphNodes.push(
      formatBreadcrumbs([
        { name: 'Home', item: `${SITE_URL}/` },
        { name: 'Contact', item: canonicalUrl }
      ])
    );

    return { '@context': 'https://schema.org', '@graph': graphNodes };
  }

  // 9. Privacy Policy (/privacy-policy/)
  if (cleanRoute === '/privacy-policy') {
    graphNodes.push({
      '@type': 'WebPage',
      '@id': `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: 'Privacy Policy & AI Safeguards | Sheharyar Siraj',
      description: 'Comprehensive privacy policy and data governance disclosure for Sheharyar Siraj systems architecture, AI voice agents, RAG vector pipelines, and international clients.',
      isPartOf: { '@id': WEBSITE_ID }
    });

    graphNodes.push(
      formatBreadcrumbs([
        { name: 'Home', item: `${SITE_URL}/` },
        { name: 'Privacy Policy', item: canonicalUrl }
      ])
    );

    return { '@context': 'https://schema.org', '@graph': graphNodes };
  }

  // 10. Terms & Conditions (/terms/ & /terms-and-conditions/)
  if (cleanRoute === '/terms' || cleanRoute === '/terms-and-conditions') {
    graphNodes.push({
      '@type': 'WebPage',
      '@id': `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: 'Terms and Conditions | Systems Engineering & Client Contracts | Sheharyar Siraj',
      description: 'Contractual terms, 100% client code ownership agreements, bilateral non-disclosure standards, and 30-day production warranties for Sheharyar Siraj systems architecture.',
      isPartOf: { '@id': WEBSITE_ID }
    });

    graphNodes.push(
      formatBreadcrumbs([
        { name: 'Home', item: `${SITE_URL}/` },
        { name: 'Terms & Conditions', item: canonicalUrl }
      ])
    );

    return { '@context': 'https://schema.org', '@graph': graphNodes };
  }

  // 11. Freelancer in Pakistan (/freelancer-in-pakistan/)
  if (cleanRoute === '/freelancer-in-pakistan') {
    graphNodes.push({
      '@type': 'ProfilePage',
      '@id': `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: 'Freelancer in Pakistan | AI & WordPress Architect',
      description: 'Hire Sheharyar Siraj, a senior systems freelancer in Pakistan. 5+ years of experience, 1,200+ projects delivered, specializing in WordPress, custom PHP, and AI automation.',
      isPartOf: { '@id': WEBSITE_ID },
      about: { '@id': PERSON_ID },
      mainEntity: {
        '@type': 'Person',
        '@id': PERSON_ID,
        name: BASE_PERSON_ENTITY.name,
        jobTitle: BASE_PERSON_ENTITY.jobTitle,
        url: BASE_PERSON_ENTITY.url,
        image: BASE_PERSON_ENTITY.image,
        sameAs: BASE_PERSON_ENTITY.sameAs
      }
    });

    graphNodes.push(
      formatBreadcrumbs([
        { name: 'Home', item: `${SITE_URL}/` },
        { name: 'Freelancer in Pakistan', item: canonicalUrl }
      ])
    );

    graphNodes.push({
      '@type': 'ProfessionalService',
      '@id': `${canonicalUrl}#service`,
      name: 'Sheharyar Siraj - Elite Freelancer in Pakistan',
      description: 'Senior freelance software engineering, custom WordPress VIP architecture, sub-600ms AI voice agents, and enterprise workflow automation operating from Karachi, Pakistan for international clients.',
      telephone: '+923132080033',
      email: 'sherryansari870@gmail.com',
      url: canonicalUrl,
      priceRange: '$$$',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Karachi',
        addressRegion: 'Sindh',
        addressCountry: 'PK'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 24.8607,
        longitude: 67.0011
      },
      areaServed: [
        { '@type': 'Country', name: 'Worldwide' },
        { '@type': 'Country', name: 'United States' },
        { '@type': 'Country', name: 'United Kingdom' },
        { '@type': 'Country', name: 'United Arab Emirates' },
        { '@type': 'Country', name: 'Saudi Arabia' },
        { '@type': 'Country', name: 'Germany' },
        { '@type': 'Country', name: 'Canada' },
        { '@type': 'Country', name: 'Australia' },
        { '@type': 'Country', name: 'Pakistan' }
      ],
      provider: { '@id': PERSON_ID }
    });

    graphNodes.push(formatFaqEntity(canonicalUrl, FREELANCER_PAKISTAN_FAQS));

    return { '@context': 'https://schema.org', '@graph': graphNodes };
  }

  return { '@context': 'https://schema.org', '@graph': graphNodes };
}
