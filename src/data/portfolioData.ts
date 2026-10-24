export interface CaseStudy {
  id: string;
  category: string;
  title: string;
  problem: string;
  system: string;
  architecture: string;
  tech: string;
  outcome: string;
  role: string;
  projectType: 'Client Project' | 'Production Benchmark' | 'Prototype / R&D';
  tags: string[];
}

export interface Service {
  num: string;
  title: string;
  desc: string;
  tags: string[];
  secondaryTitle: string;
  secondaryTags: string[];
  hasWaveform?: boolean;
}

export interface FlowNode {
  step: string;
  name: string;
  desc: string;
}

export interface TechCategory {
  category: string;
  skills: string[];
}

export interface TimelineItem {
  year: string;
  title: string;
  role: string;
  company: string;
  location: string;
  desc: string;
  highlights: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  year: string;
  field?: string;
  description?: string;
}

export interface ResultDelivered {
  metric: string;
  title: string;
  description: string;
  category: string;
}

export interface Certification {
  title: string;
  issuer: string;
}

export interface Testimonial {
  quote: string;
  client: string;
  role: string;
  company: string;
  rating: number;
  source: 'Upwork Verified' | 'Fiverr Verified' | 'Agency Partner';
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const CONTACT_INFO = {
  name: 'Sheharyar Siraj',
  title: 'Senior WordPress Developer & Agentic AI Automation Engineer',
  secondaryTitle: 'n8n & Vapi Voice Agents Specialist | WooCommerce & Elementor Pro Expert',
  tagline: 'Senior WordPress Developer & Agentic AI Automation Engineer (n8n, Vapi Voice Agents, Full-Stack Vibe Coding) | WooCommerce & Elementor Pro Expert',
  phone: '+92 313 2080033',
  phoneRaw: '923132080033',
  whatsappUrl: 'https://wa.me/923132080033?text=Hi%20Sheharyar,%20I%20saw%20your%20website%20and%20would%20like%20to%20discuss%20an%20AI%20system%20/%20WordPress%20project!',
  email: 'sherryansari870@gmail.com',
  emailUrl: 'mailto:sherryansari870@gmail.com?subject=Project%20Inquiry%20-%20Sheharyar%20Siraj',
  linkedin: 'https://www.linkedin.com/in/sheharyar-siraj/',
  upwork: 'https://www.upwork.com/freelancers/sheharyarsiraj',
  fiverr: 'https://www.fiverr.com/sellers/mr_shehary/',
  portfolio: 'https://sheharyarsiraj.com',
  location: 'Karachi West District, Sindh, Pakistan',
  locationDetails: 'Based in Karachi West District, Sindh, Pakistan • Open to Full-Time Remote Engineering Roles, Relocation to UAE / KSA, White-Label Agency Retainers, and Custom AI or WordPress Projects',
  availability: 'Open to Full-Time Remote Engineering Roles, Relocation to UAE / KSA, White-Label Retainers & Custom Projects'
};

export const METRICS = [
  { value: 5, suffix: '+', label: 'YEARS EXPERIENCE' },
  { value: 1200, suffix: '+', label: 'PROJECTS DELIVERED WORLDWIDE' },
  { value: 100, suffix: '%', label: 'JOB SUCCESS SCORE' },
  { value: 5.0, suffix: '★', label: '5-STAR VERIFIED RATING' },
];

export const REAL_RESULTS_DELIVERED: ResultDelivered[] = [
  {
    metric: '20% Q1 Growth',
    title: 'UAE Enterprise Automation & 15% Faster Delivery',
    description: 'Delivered 20% Q1 business growth and 15% faster project delivery for a prominent UAE enterprise through process automation.',
    category: 'Enterprise Automation'
  },
  {
    metric: '30% – 60% Cut',
    title: 'Reduction in Manual Operational Workload',
    description: 'Achieved 30% to 60% reduction in manual operational workload for clients using custom n8n and Make.com backend workflows.',
    category: 'Workflow Automation'
  },
  {
    metric: '2.5x Faster',
    title: 'Ultra-Fast Page Loading & Search Engine Performance',
    description: 'Delivered up to 2.5x faster page load speeds and up to 30% organic traffic growth across 50+ optimized WordPress and WooCommerce platforms.',
    category: 'Performance & SEO'
  },
  {
    metric: '5-Star / 100%',
    title: 'Flawless Marketplace Track Record (Upwork & Fiverr)',
    description: '5-Star rated professional across Upwork and Fiverr with 100% client satisfaction and long-term agency retainers.',
    category: 'Marketplace Trust'
  }
];

export const MARQUEE_LOCATIONS = [
  'DUBAI & UAE', 'SAUDI ARABIA', 'USA', 'UNITED KINGDOM', 'IRELAND', 'CANADA', 'AUSTRALIA', 'EUROPE'
];

export const PRIMARY_SERVICES: Service[] = [
  {
    num: '01',
    title: 'CUSTOM WORDPRESS & WOOCOMMERCE SYSTEMS',
    desc: 'Build reliable WordPress and WooCommerce infrastructure that connects content, commerce, APIs, automation, and business operations without bloated, slow page builders.',
    tags: [
      'Custom Themes',
      'Custom Plugins',
      'WooCommerce',
      'Elementor Pro',
      'Headless WordPress',
      'REST APIs',
      'PHP 8.2',
      'Figma to WordPress',
      'Performance Optimization',
    ],
    secondaryTitle: 'CORE CAPABILITIES',
    secondaryTags: ['PHP 8.2', 'MySQL', 'REST API', 'Custom Hooks', 'WooCommerce API', 'Speed Tuning'],
  },
  {
    num: '02',
    title: 'AI AGENTS & INTELLIGENT CUSTOMER SYSTEMS',
    desc: 'Build AI assistants that understand business knowledge, answer customer questions, qualify leads, and connect directly with business workflows.',
    tags: [
      'AI Chatbots',
      'RAG Knowledge Bases',
      'Lead Qualification',
      'AI Customer Support',
      'OpenAI Assistants',
      'Anthropic Claude',
      'Google Gemini',
      'Vector Search',
      'API Integrations',
    ],
    secondaryTitle: 'AI ENGINE',
    secondaryTags: ['GPT-4o', 'Claude 3.5', 'Gemini 1.5', 'Pinecone', 'Embeddings', 'Contextual Memory'],
  },
  {
    num: '03',
    title: 'AI VOICE AGENTS',
    desc: 'Build instant-response AI voice agents for automated phone calls and customer reception, qualifying inquiries and booking appointments directly into your calendar 24/7.',
    tags: [
      'Vapi Voice AI',
      'Retell AI',
      'ElevenLabs',
      'Twilio Telephony',
      'Deepgram STT',
      'Speech-to-Text',
      'Text-to-Speech',
      'Appointment Booking',
      'CRM Integration',
    ],
    secondaryTitle: 'TELEPHONY & VOICE STACK',
    secondaryTags: ['Vapi', 'ElevenLabs', 'Twilio SIP', 'Deepgram Nova', 'Whisper', 'Automated Calling'],
    hasWaveform: true,
  },
  {
    num: '04',
    title: 'AI AUTOMATION & WORKFLOW SYSTEMS',
    desc: 'Connect forms, websites, CRMs, AI agents, and business tools into automated workflows that eliminate repetitive manual work.',
    tags: [
      'n8n Workflows',
      'Make.com',
      'Zapier',
      'Webhooks',
      'REST APIs',
      'CRM Synchronization',
      'Lead Routing',
      'Instant Notifications',
      'Data Processing',
    ],
    secondaryTitle: 'WORKFLOW ENGINE',
    secondaryTags: ['n8n Self-Hosted', 'Make.com', 'HubSpot API', 'GoHighLevel', 'Slack Webhooks', 'Database ETL'],
  },
  {
    num: '05',
    title: 'DATA ANALYTICS & DATA SCIENCE SOLUTIONS',
    desc: 'Transform raw data into automated business intelligence with interactive executive dashboards, predictive machine learning models, and automated web data extraction.',
    tags: [
      'Power BI & Tableau',
      'Advanced Excel & KPI Models',
      'SQL & PostgreSQL',
      'Python Data Science',
      'Pandas & Scikit-learn',
      'Customer Churn Prediction',
      'Sales Forecasting',
      'Automated Web Scrapers',
      'ScrapeGraphAI & ETL',
      'Executive Dashboards',
    ],
    secondaryTitle: 'ANALYTICS & BI ENGINE',
    secondaryTags: ['Power BI', 'Tableau', 'Excel Dashboards', 'SQL', 'Python', 'ScrapeGraphAI', 'ETL Pipelines'],
  },
];

export const SAAS_CAPABILITY = {
  title: 'AI-POWERED WEB & SAAS DEVELOPMENT',
  subtitle: 'SECONDARY CAPABILITY',
  desc: 'For businesses that need more than a website, I build custom web applications, dashboards, portals, and MVPs using modern frontend technologies and AI-assisted development workflows internally to accelerate delivery.',
  technologies: [
    'React',
    'TypeScript',
    'Vite',
    'Tailwind CSS',
    'Node.js',
    'PHP 8.2',
    'REST APIs',
    'Authentication',
    'Stripe / Payments',
    'Database Integrations',
  ],
};

export const WHITE_LABEL_PARTNERSHIP = {
  headline: 'YOUR AGENCY SELLS. I BUILD.',
  description: 'I provide behind-the-scenes WordPress, WooCommerce, and AI automation development for digital, SEO, and marketing agencies that need reliable technical capacity without expanding internal overhead.',
  bullets: [
    'Custom WordPress Development',
    'WooCommerce Architecture',
    'Custom Plugin Development',
    'AI Automation Systems',
    'n8n & Make Workflows',
    'Bug Fixes & Code Remediation',
    'Speed & Performance Optimization',
    'Ongoing System Maintenance',
    'Emergency Technical Support',
    '100% White-Label Delivery',
  ],
  cta: 'DISCUSS A WHITE-LABEL PARTNERSHIP',
};

export const SYSTEM_FLOW_STEPS: FlowNode[] = [
  {
    step: '01',
    name: 'TRAFFIC',
    desc: 'Acquisition via Technical SEO, GEO, AEO, paid campaigns, and organic discoverability channels.',
  },
  {
    step: '02',
    name: 'WEBSITE',
    desc: 'High-performance WordPress or WooCommerce foundation delivering instant authority and clarity.',
  },
  {
    step: '03',
    name: 'AI CHAT',
    desc: 'Contextual AI assistant trained on verified business knowledge to resolve customer questions instantly.',
  },
  {
    step: '04',
    name: 'LEAD QUALIFICATION',
    desc: 'Automated intent extraction and scoring to determine buyer readiness and deal requirements.',
  },
  {
    step: '05',
    name: 'VOICE AGENT',
    desc: 'Automated voice follow-up without manual intervention for high-intent inquiries requiring immediate call connection.',
  },
  {
    step: '06',
    name: 'CRM + WORKFLOWS',
    desc: 'n8n / Make workflows update HubSpot/GoHighLevel, sync calendars, and trigger team notifications.',
  },
  {
    step: '07',
    name: 'CONVERSION',
    desc: 'Qualified leads move smoothly toward closed sales with full conversation context preserved.',
  },
  {
    step: '08',
    name: 'CUSTOMER ONBOARDING',
    desc: 'Automated post-purchase intake, onboarding sequences, and client portal provisioning executed instantly upon checkout.',
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'cs-1',
    category: 'WORDPRESS × N8N × VAPI VOICE AI',
    title: 'Automated Inbound Lead Qualification & Voice Callback System',
    problem: 'Slow manual follow-ups on inbound high-value inquiries caused substantial drop-offs before sales reps could make contact.',
    system: 'Architected an integrated pipeline connecting WordPress inquiry forms via secure webhooks to an n8n orchestration engine that triggers an automated Vapi voice call.',
    architecture: 'WordPress Form → Webhook → n8n Workflow → Vapi Voice AI → HubSpot CRM',
    tech: 'WordPress, n8n, Vapi Voice AI, OpenAI Assistants API, Webhooks, HubSpot API',
    outcome: 'Sub-30-second automated follow-up with complete conversation transcript and audio logged to CRM.',
    role: 'Lead Systems Architect & Integration Engineer',
    projectType: 'Client Project',
    tags: ['WordPress', 'n8n', 'Vapi', 'HubSpot'],
  },
  {
    id: 'cs-2',
    category: 'WOOCOMMERCE × VECTOR SEARCH × REST API',
    title: 'Conversational Product Discovery & Knowledge Support Engine',
    problem: 'A multi-category catalog created friction in product discovery and placed heavy repetitive load on customer support staff.',
    system: 'Engineered a custom WordPress plugin that indexes product attributes into a vector store and powers a contextual conversational assistant via WooCommerce REST endpoints.',
    architecture: 'WooCommerce Core → Custom PHP Plugin → Vector Search (Pinecone) → LLM API → Frontend Chat Widget',
    tech: 'WooCommerce, Custom PHP Plugin, OpenAI API, Pinecone Vector DB, REST API',
    outcome: 'Automated resolution of routine pre-sale product inquiries and instant catalog recommendations.',
    role: 'Full-Stack WordPress & AI Plugin Developer',
    projectType: 'Client Project',
    tags: ['WooCommerce', 'PHP 8.2', 'Vector Search', 'OpenAI'],
  },
  {
    id: 'cs-3',
    category: 'VAPI × ELEVENLABS × MAKE × CRM',
    title: 'Autonomous Real Estate Inbound Voice Assistant & Booking Agent',
    problem: 'International property inquiries across disparate timezones suffered delayed response times and lost viewing opportunities.',
    system: 'Designed a conversational voice agent using Vapi and ElevenLabs connected via Make.com to qualify buyer budgets and book viewing appointments directly into team calendars.',
    architecture: 'Inbound Phone Call → Vapi Voice Agent → ElevenLabs TTS → Make.com Webhook → Google Calendar & CRM',
    tech: 'Vapi Voice AI, ElevenLabs, Make.com, Webhooks, Google Calendar API, GoHighLevel',
    outcome: 'Near-real-time inbound call handling, automated qualification against criteria, and automated calendar scheduling.',
    role: 'Voice AI Architect & Automation Engineer',
    projectType: 'Client Project',
    tags: ['Vapi', 'ElevenLabs', 'Make.com', 'GoHighLevel'],
  },
  {
    id: 'cs-4',
    category: 'AI WORKFLOWS × WORDPRESS REST API',
    title: 'Structured Content Research & Draft Publishing Pipeline',
    problem: 'Manual research, drafting, formatting, and uploading structured educational articles was bottlenecking editorial throughput.',
    system: 'Built an automated pipeline that queries verified research data, generates structured drafts with metadata, and creates scheduled drafts in WordPress via REST API.',
    architecture: 'Research Ingestion → OpenAI GPT-4o API → Structured Validation → WordPress REST API → Scheduled Drafts',
    tech: 'Python, OpenAI GPT-4o API, RankMath SEO API, WordPress REST API, JSON Schema',
    outcome: 'Streamlined drafting and staging workflow with human-in-the-loop review prior to publication.',
    role: 'Automation & API Pipeline Developer',
    projectType: 'Production Benchmark',
    tags: ['WordPress REST API', 'GPT-4o', 'Python', 'SEO Schema'],
  },
  {
    id: 'cs-5',
    category: 'TECHNICAL SEO × SPEED OPTIMIZATION',
    title: 'Enterprise WordPress Core Performance & Structured Data Overhaul',
    problem: 'Bloated scripts, unoptimized database queries, and absent structured data caused poor mobile performance and diminished search discoverability.',
    system: 'Refactored template hierarchy, implemented edge caching via Cloudflare, removed render-blocking resources, and built comprehensive entity JSON-LD schemas.',
    architecture: 'WordPress Core → Clean PHP Templates → Cloudflare Edge Cache → Structured JSON-LD Graph',
    tech: 'WordPress Core, PHP 8.2, Cloudflare Edge, JSON-LD Schema, Vite Build Tools',
    outcome: 'Sub-second mobile first contentful paint and rich entity indexing across search engines.',
    role: 'WordPress Performance & Technical SEO Engineer',
    projectType: 'Production Benchmark',
    tags: ['WordPress', 'Cloudflare Edge', 'JSON-LD', 'Core Web Vitals'],
  },
  {
    id: 'cs-6',
    category: 'CUSTOM PLUGINS × PHP × REST APIs',
    title: 'High-Volume WooCommerce ERP Bi-Directional Synchronization',
    problem: 'Manual inventory and order synchronization between WooCommerce and an external ERP resulted in stock discrepancies.',
    system: 'Developed a custom PHP plugin with background queue processing, webhook event listeners, and automated failure retry handling.',
    architecture: 'WooCommerce Order Action → Custom Plugin Queue → Webhook Dispatcher → External ERP API',
    tech: 'WordPress Core, PHP 8.2, MySQL, WooCommerce Action Scheduler, REST APIs, Webhooks',
    outcome: 'Reliable bi-directional order and inventory synchronization with automated error logging and zero data loss.',
    role: 'Custom Plugin & Backend Integration Developer',
    projectType: 'Client Project',
    tags: ['PHP 8.2', 'WooCommerce', 'REST API', 'MySQL'],
  },
];

export const TECH_CATEGORIES: TechCategory[] = [
  {
    category: 'AGENTIC AI & VIBE CODING',
    skills: [
      'Agentic AI Workflows & Tool Calling',
      'Full-Stack Vibe Coding (Cursor & LLMs)',
      'OpenAI (GPT-4o, Assistants API)',
      'Anthropic Claude & Google Gemini',
      'RAG Architecture & Vector DBs (Pinecone)',
      'Prompt Engineering & Structured Outputs',
    ],
  },
  {
    category: 'VOICE AI & RECEPTIONISTS',
    skills: [
      'Vapi AI Voice Agents (Inbound & Outbound)',
      'Retell AI Telephony',
      'ElevenLabs Voice Synthesis & Cloning',
      'Twilio SIP Trunking & Call Routing',
      'Deepgram Speech-to-Text (<300ms)',
      'Automated Appointment Booking',
    ],
  },
  {
    category: 'WORKFLOW AUTOMATION',
    skills: [
      'n8n (Self-Hosted Docker & Cloud)',
      'Make.com (Integromat)',
      'Zapier Automation Pipelines',
      'HubSpot & GoHighLevel CRM Sync',
      'Webhook Architecture & HMAC Security',
      'REST API Integration & Data Sync',
    ],
  },
  {
    category: 'WORDPRESS & ECOMMERCE',
    skills: [
      'Full-Stack WordPress (Custom Themes & Plugins)',
      'WooCommerce Scalable Stores & Gateways',
      'Elementor Pro Architecture & Custom Dynamic Tags',
      'Headless WordPress & REST Endpoints',
      'PHP 8.2+ Object-Oriented Development',
      'Figma-to-WordPress Pixel-Perfect Conversion',
    ],
  },
  {
    category: 'DATA, ANALYTICS & SECURITY',
    skills: [
      'Data Cleaning & Machine Learning (Python)',
      'Business Intelligence Dashboards & Analytics',
      'Technical SEO, GEO & JSON-LD Schemas',
      'Core Web Vitals Speed Optimization',
      'WordPress Malware Cleanup & Database Hardening',
      'AI Commercial Video Ads & Motion Graphics',
    ],
  },
];

export const CERTIFICATIONS: Certification[] = [
  {
    title: 'Cisco Certified Network Professional (CCNP)',
    issuer: 'Cisco Systems',
  },
  {
    title: 'Networking Academy Learn-A-Thon 2022',
    issuer: 'Cisco Networking Academy',
  },
  {
    title: 'AI for App Building & Modern Development Workflows',
    issuer: 'Professional Certification',
  },
  {
    title: 'AI for Data Analysis & Automation',
    issuer: 'Professional Certification',
  },
  {
    title: 'AI for Content Creation',
    issuer: 'Professional Certification',
  },
  {
    title: 'Internet of Things (IoT) Systems Architecture (6-Month Short Course)',
    issuer: 'Sir Syed University of Engineering & Technology (SSUET)',
  },
  {
    title: 'Information Technology and Business World Certificate',
    issuer: 'Professional Certification',
  },
  {
    title: 'DigiSkills Professional Training Program Certificate',
    issuer: 'DigiSkills Training Program',
  },
  {
    title: 'Google Cloud Vertex AI Certified Specialist',
    issuer: 'Google Cloud',
  },
  {
    title: 'Anthropic AI Fluency & Prompt Engineering Certification',
    issuer: 'Anthropic',
  },
  {
    title: 'Cisco Certified CyberOps Associate',
    issuer: 'Cisco Systems',
  },
];

export const EDUCATION: EducationItem[] = [
  {
    degree: 'Bachelor of Business and Information Technology (BBIT)',
    institution: 'Virtual University of Pakistan',
    year: 'Graduation: April 2025',
    field: 'Computer Software Engineering',
    description: 'Advanced curriculum covering computer software engineering, distributed systems, modern web development, database management systems, and business information workflows.',
  },
  {
    degree: '6-Month Short Course: Internet of Things (IoT)',
    institution: 'Sir Syed University of Engineering & Technology (SSUET)',
    year: 'April 2021 – October 2021',
    field: 'IoT Hardware, Telemetry & Network Architecture',
    description: 'Intensive engineering training in microcontrollers, sensor telemetry, edge data ingestion, network protocols, and automated cloud hardware integrations.',
  },
  {
    degree: 'Secondary School Certificate (Matriculation)',
    institution: 'Superior English School',
    year: 'April 2005 – May 2016',
    field: 'Science & Computer Studies',
    description: 'Foundational academic education in computer science, mathematics, physics, and analytical problem-solving.',
  },
];

export const TIMELINE: TimelineItem[] = [
  {
    year: 'March 2024 - Present',
    title: 'AI Automation Specialist & Senior WordPress Developer',
    company: 'Upwork',
    role: 'AI Automation Specialist (n8n, Make.com) & Senior WordPress Developer',
    location: 'Remote (Serving Global Clients: US, UK, UAE, EU)',
    desc: 'Delivering remote AI workflow automation and custom WordPress engineering for international enterprise clients and fast-growing founders across eCommerce, real estate, healthcare, and B2B SaaS.',
    highlights: [
      'Built custom n8n, Make.com, and AI voice agent integrations that automate lead capture, CRM routing, and client onboarding',
      'Developed 20+ responsive, conversion-optimized WordPress and WooCommerce websites using Elementor Pro and custom code',
      'Maintained a 5-star rating for technical quality, clear communication, and fast turnaround times',
    ],
  },
  {
    year: 'January 2022 - Present',
    title: 'Custom WordPress, Elementor Pro & Speed Optimization Specialist',
    company: 'Fiverr',
    role: 'Custom WordPress, Elementor Pro & Speed Optimization Specialist',
    location: 'Remote (Global International Marketplace)',
    desc: 'Providing rapid-turnaround remote WordPress development, technical troubleshooting, malware recovery, and automation setups for global businesses and agency clients.',
    highlights: [
      'Delivered custom Figma-to-WordPress builds, WooCommerce stores, custom plugin tweaks, and REST API integrations',
      'Performed advanced WordPress speed optimization (Core Web Vitals) and malware cleanup to secure and accelerate client websites',
      'Consistently achieved 5-star reviews and repeat business across all completed orders with 100% client satisfaction',
    ],
  },
  {
    year: 'April 2021 - Present',
    title: 'Senior AI Automation Engineer & Lead WordPress Developer',
    company: 'Ansari Web Agency',
    role: 'Senior AI Automation Engineer (n8n / Vapi) & Lead WordPress Developer',
    location: 'Karachi, Sindh, Pakistan (Serving USA, UK, UAE, Ireland & Europe)',
    desc: 'Working remotely within a full-service digital agency team, architecting custom web platforms and AI systems for global clients across the USA, UK, UAE, Ireland, and Europe.',
    highlights: [
      'AI Voice Agents & Chatbots: Engineered 24/7 AI voice receptionists and chat agents using OpenAI, Vapi AI, and ElevenLabs for automated customer support and instant lead qualification',
      'n8n & Make.com Workflow Automation: Designed and deployed complex multi-step automations connecting CRMs, webhooks, and APIs, reducing manual client labor by 30–60%',
      'Custom WordPress & WooCommerce Development: Developed bespoke WordPress themes, custom PHP plugins, headless setups, and high-converting Elementor Pro / WooCommerce stores',
      'Technical SEO & Performance: Executed Core Web Vitals and speed optimizations, driving up to 30% organic traffic growth across client websites',
      'Remote Team Collaboration: Worked closely with cross-functional remote project managers, UI/UX designers, and QA testers to ensure 100% on-time delivery',
    ],
  },
  {
    year: 'January 2023 - October 2026',
    title: 'Senior Full-Stack WordPress Developer (Custom Themes & Plugins)',
    company: 'EndeOnline',
    role: 'Senior Full-Stack WordPress Developer',
    location: 'Netherlands (Remote)',
    desc: 'Bespoke WordPress solutions, custom theme architecture, complex malware cleanup, database optimization, and modern AI-to-WordPress workflows.',
    highlights: [
      'Full-Stack WordPress & Custom Theme Architecture: 5+ years of hands-on experience designing and developing bespoke WordPress solutions, turning Figma designs into pixel-perfect custom themes and plugins',
      'Complex Problem Solving & Malware Recovery: Specializing in critical debugging, fixing complex site errors, and cleaning/restoring hacked or compromised WordPress websites',
      'Performance Optimization: Advanced speed optimization expertise, significantly improving core web vitals, page load speeds, and database efficiency',
      'AI-to-WordPress Integration & Modern Workflows: Pioneering the integration of modern AI-generated designs and frontend layouts into robust, maintainable custom WordPress themes',
    ],
  },
  {
    year: 'January 2023 - April 2024',
    title: 'Senior WordPress Developer',
    company: 'UMW Media',
    role: 'Senior WordPress Developer',
    location: 'Karachi Division, Sindh, Pakistan',
    desc: 'Led WordPress development projects with a primary focus on custom design, performance optimization, responsive fidelity, and client satisfaction.',
    highlights: [
      'Delivered 50+ successful WordPress projects with custom theme and plugin integration',
      'Directed responsive design implementation, troubleshooting, and site speed optimization',
      'Collaborated directly with clients to translate business needs into functional, high-converting websites',
    ],
  },
  {
    year: 'February 2022 - January 2023',
    title: 'WordPress Developer & Frontend Developer',
    company: 'Digitizal',
    role: 'WordPress Developer & Frontend Developer',
    location: 'Karachi, Sindh, Pakistan',
    desc: 'Designed and developed custom WordPress websites, custom themes, and custom plugins for diverse international client projects.',
    highlights: [
      'Increased website traffic by 30% through on-page SEO optimization and structured content architecture',
      'Built custom plugins that improved user engagement by 20%',
      'Reduced website loading time by 40%, significantly improving overall user experience and mobile conversions',
      'Worked across HTML, CSS, JavaScript, and PHP for custom frontend and backend builds',
    ],
  },
  {
    year: 'March 2021 - January 2022',
    title: 'WordPress Developer',
    company: 'Sintech',
    role: 'WordPress Developer',
    location: 'Sindh, Pakistan',
    desc: 'Crafted dynamic, user-centric websites with a rigorous focus on page speed performance and responsive multi-device design.',
    highlights: [
      'Built custom WordPress themes and plugins tailored to unique client business requirements',
      'Optimized websites for speed and SEO, dramatically improving overall digital presence and search rankings',
      'Specialized in clean PHP, custom CSS animations, and cross-browser compatibility',
    ],
  },
  {
    year: '2024 - 2025',
    title: 'Business Coordinator & Digital Systems Optimizer',
    company: 'Meer Group',
    role: 'Enterprise Operations & Digital Automation',
    location: 'Dubai, United Arab Emirates',
    desc: 'Facilitated digital process optimization and workflow automation across cross-functional enterprise departments at a prominent UAE business group.',
    highlights: [
      'Delivered 20% Q1 business growth and 15% faster project delivery for UAE enterprise through automated process workflows',
      'Identified operational bottlenecks and implemented automated reporting dashboards',
      'Coordinated digital infrastructure delivery and inter-departmental systems integration',
    ],
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: 'Sheharyar built a custom WordPress and automated lead workflow that completely transformed how we receive and process inquiries. His understanding of how the website connects with APIs is top-tier.',
    client: 'David M.',
    role: 'Operations Director',
    company: 'Commercial Real Estate Group (UK)',
    rating: 5,
    source: 'Upwork Verified',
  },
  {
    quote: 'Exceptional work. He delivered our WooCommerce store with custom plugin integrations and automated invoice synchronization. Fast, communicative, and zero technical friction.',
    client: 'Alexander K.',
    role: 'E-Commerce Founder',
    company: 'Specialty Retail Brand (USA)',
    rating: 5,
    source: 'Fiverr Verified',
  },
  {
    quote: 'Sheharyar has been our reliable white-label development partner for multiple client projects. He handles complex WordPress builds, speed tuning, and enterprise automations with exceptional reliability.',
    client: 'Marcus T.',
    role: 'Agency Founder',
    company: 'Digital Growth Agency (UAE)',
    rating: 5,
    source: 'Agency Partner',
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Who is Sheharyar Siraj?',
    answer: 'Sheharyar Siraj is an AI Automation Architect and WordPress Systems Engineer based in Karachi, Pakistan. He has 5+ years of hands-on technical experience and has delivered 1,200+ projects worldwide across Upwork, direct client engagements, and digital agency partnerships. He specializes in building connected digital systems where WordPress provides the foundation, AI provides intelligence, and automation handles execution.',
  },
  {
    question: 'What does Sheharyar Siraj build?',
    answer: 'He builds connected digital systems that link websites directly to business operations. This includes custom WordPress and WooCommerce platforms, intelligent AI chat agents trained on business knowledge bases, AI voice phone agents for automated qualification, and automated workflow pipelines that synchronize CRMs, forms, and business tools.',
  },
  {
    question: 'What WordPress services does Sheharyar provide?',
    answer: 'He provides custom WordPress theme development, bespoke plugin development, WooCommerce e-commerce architecture, Elementor Pro solutions, Figma-to-WordPress conversion, REST API integrations, speed optimization, and malware recovery & security hardening.',
  },
  {
    question: 'What AI automation services does he provide?',
    answer: 'He designs multi-step automated workflows using n8n (self-hosted and cloud), Make.com, and Zapier. These automations handle lead routing, real-time CRM updates (HubSpot, GoHighLevel, Salesforce), automated customer notifications, and data processing without manual human data entry.',
  },
  {
    question: 'What AI voice systems does he build?',
    answer: 'He builds autonomous inbound and outbound voice agents using Vapi Voice AI, ElevenLabs, Deepgram, and Twilio. These voice agents answer customer calls, qualify buyer intent, answer questions using verified business knowledge, and book appointments directly into calendar systems.',
  },
  {
    question: 'How does he connect WordPress with AI and automation?',
    answer: 'He develops custom PHP plugins, webhooks, and REST API endpoints that bridge the WordPress database with external AI models (OpenAI, Claude, Gemini), vector databases (Pinecone), and automation engines (n8n, Make). This allows websites to trigger instant follow-ups, sync orders with external ERPs, and provide contextual AI responses.',
  },
  {
    question: 'Does he work with agencies?',
    answer: 'Yes. He provides dedicated, 100% white-label WordPress, WooCommerce, and AI automation development for digital, SEO, and marketing agencies under the model: "Your Agency Sells. I Build." Agencies maintain the client relationship and brand, while he provides dependable technical execution behind the scenes.',
  },
  {
    question: 'Where is he based?',
    answer: 'He is physically based in Karachi, Pakistan, and serves clients internationally across the United States, United Kingdom, United Arab Emirates, Saudi Arabia, Canada, Australia, and Europe.',
  },
  {
    question: 'Is he available for Dubai and Saudi Arabia opportunities?',
    answer: 'Yes. He is open to remote work as well as on-site and relocation opportunities for companies and agencies in Dubai, UAE and Saudi Arabia.',
  },
];
