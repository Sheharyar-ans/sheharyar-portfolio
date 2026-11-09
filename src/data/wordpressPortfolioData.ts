export interface WordPressProject {
  id: string;
  title: string;
  client: string;
  domain: string;
  category: string;
  badge: string;
  tags: string[];
  image: string;
  shortDesc: string;
  fullDesc: string;
  metrics: {
    speedScore: string;
    loadTime: string;
    architecture: string;
  };
  features: string[];
  deliverables: string[];
}

export const WORDPRESS_PROJECTS: WordPressProject[] = [
  {
    id: 'wp-ende-online',
    title: 'Ende Online – Modern Agency & Digital Marketing Platform',
    client: 'Ende Online (Netherlands)',
    domain: 'endeonline.nl',
    category: 'Agency & Lead Generation',
    badge: 'CUSTOM WORDPRESS & PHP 8.2',
    tags: ['Custom Blocks', 'PHP 8.2', 'Dark UI', 'Lead Funnel', 'Speed 98+'],
    image: '/assets/images/portfolio/wp-ende-online.webp',
    shortDesc: 'Modern dark-themed agency platform featuring custom topographic branding, interactive services showcase, verified client reviews, and an optimized lead capture funnel.',
    fullDesc: 'Architected and engineered a high-performance bespoke WordPress web platform for Ende Online. Features custom Gutenberg blocks, interactive dark-mode topographic contour styling, client testimonial carousels, and automated sub-second lead-capture pipelines.',
    metrics: {
      speedScore: '98/100 Mobile',
      loadTime: '0.6s TTFB',
      architecture: 'Clean PHP 8.2 • Custom Blocks • Zero Bloat'
    },
    features: [
      'Custom Hero Section with Topographic Contour Aesthetics',
      'Interactive Services Grid with Animated Hover States',
      'Recent Works Portfolio Showcase with Direct Case Links',
      'Trustpilot & Google Reviews Carousel Integration',
      'High-Converting Quick Inquiry & Quotation Funnel',
      'Sub-600ms Time-to-First-Byte on Caching Infrastructure'
    ],
    deliverables: [
      'Bespoke WordPress Theme Development',
      'Figma to Pixel-Perfect Responsive Code',
      'Core Web Vitals & Speed Optimization (95+)',
      'Automated Lead Routing to CRM / Email'
    ]
  },
  {
    id: 'wp-moldstaff-recruitment',
    title: 'MoldStaff – European Jobs & Talent Recruitment Portal',
    client: 'MoldStaff Europe',
    domain: 'moldstaff.eu',
    category: 'Recruitment & Job Portal',
    badge: 'CUSTOM POST TYPES & PORTAL',
    tags: ['Job Board', 'Custom Post Types', 'Intake Forms', 'Multilingual', 'Speed 96+'],
    image: '/assets/images/portfolio/wp-moldstaff-recruitment.webp',
    shortDesc: 'International European recruitment platform connecting skilled candidates with verified European employers, featuring multi-step application workflows and video testimonials.',
    fullDesc: 'Engineered an international European recruitment and career placement portal for MoldStaff. Built with custom post types, filtered vacancy boards, candidate application funnels with CV ingestion, employer trust credentials, and multilingual architecture.',
    metrics: {
      speedScore: '96/100 Mobile',
      loadTime: '0.8s LCP',
      architecture: 'Custom Post Types • REST API • Secure Storage'
    },
    features: [
      'International Recruitment Hero with Quick Search Filters',
      'Sector-Specific Employment Cards (Logistics, Warehouse, Welding)',
      'Automated Candidate CV & Application Submission Pipeline',
      'Video Case Studies & Candidate Story Embeds',
      'Multilingual Architecture for Pan-European Job Seekers',
      'Trust Badges, GDPR Compliance & FAQ Accordion System'
    ],
    deliverables: [
      'Custom Recruitment Job Portal Architecture',
      'Multi-Step Application Intake Webhooks',
      'Mobile-First Layout Optimized for Fast 4G Browsing',
      'SEO Architecture for European Labor Markets'
    ]
  },
  {
    id: 'wp-everaard-techniek',
    title: 'Everaard Techniek – Agro Machinery & Parts Catalog',
    client: 'Everaard Techniek (Netherlands)',
    domain: 'everaardtechniek.nl',
    category: 'WooCommerce & Machinery Catalog',
    badge: 'WOOCOMMERCE & HIGH INVENTORY',
    tags: ['WooCommerce', 'Spare Parts Catalog', 'SKU Search', 'Dutch Market', 'Speed 97+'],
    image: '/assets/images/portfolio/wp-everaard-techniek.webp',
    shortDesc: 'Heavy-duty agricultural machinery dealership and spare parts catalog platform built on WooCommerce, featuring high-speed SKU search and direct maintenance booking.',
    fullDesc: 'Architected an industrial agricultural machinery catalog and parts ordering platform for Everaard Techniek. Engineered for John Deere, Lemken, and Steeno machinery dealerships with sub-second SKU search, custom quote requests, and workshop service scheduling.',
    metrics: {
      speedScore: '97/100 Mobile',
      loadTime: '0.7s TTFB',
      architecture: 'WooCommerce HPOS • Redis Object Cache • Fast SKU Index'
    },
    features: [
      'Heavy Machinery & Tractor Equipment Showcase',
      'Fast Spare Parts Catalog with Direct SKU Search & Filtering',
      'Workshop Repair & Field Maintenance Appointment Booking',
      'Request-a-Quote Architecture without Third-Party Plugin Bloat',
      'Brand Partnership Showcase (John Deere, Lemken, Steeno)',
      'High-Concurrency Database Indexing for Instant Filtering'
    ],
    deliverables: [
      'WooCommerce Catalog & Parts Ordering Architecture',
      'Custom Database Schema & Query Optimization',
      'Responsive Mobile UI for Field Engineers & Farmers',
      'Local Business Dutch Schema & Fast Edge Caching'
    ]
  },
  {
    id: 'wp-contentwerk-agency',
    title: 'ContentWerk – Creative Studio & Media Production',
    client: 'ContentWerk Media',
    domain: 'contentwerk.nl',
    category: 'Creative Agency & Video Production',
    badge: 'BESPOKE THEME & GSAP MOTION',
    tags: ['GSAP Motion', 'Video Lazy Load', 'Creative UI', 'Fluid Typography', 'Speed 99+'],
    image: '/assets/images/portfolio/wp-contentwerk-agency.webp',
    shortDesc: 'Aesthetic storytelling and video production agency website featuring fluid organic section transitions, high-impact video showcases, and a streamlined client scoping intake.',
    fullDesc: 'Crafted a bespoke digital agency showcase for ContentWerk media house. Features fluid organic wave section dividers, lazy-loading video CDN streaming, interactive service tiers, client success story carousels, and streamlined project scoping forms.',
    metrics: {
      speedScore: '99/100 Mobile',
      loadTime: '0.5s TTFB',
      architecture: 'Bespoke Block Theme • GSAP • Fast CDN Video Assets'
    },
    features: [
      'Modern Editorial Hero with Warm Earth-Tone Aesthetic',
      'Curved Wave Section Dividers & Organic Visual Hierarchy',
      'Video Showreel Embeds with Automatic Low-Bandwidth Fallback',
      'Interactive Service Packages with Expandable Scope Details',
      'Client Success Story Portfolio Grid with Modal Previews',
      'Interactive Project Scoping & Contact Questionnaire'
    ],
    deliverables: [
      'Pixel-Perfect Figma to Custom WordPress Build',
      'GSAP Micro-Interactions & Smooth Scroll Synergy',
      'Mobile-First Layout with Zero Layout Shift (0 CLS)',
      'Optimized Video Streaming Integration'
    ]
  },
  {
    id: 'wp-floortec-flooring',
    title: 'Floortec – Architectural Flooring & Showroom Portal',
    client: 'Floortec Nederland',
    domain: 'floortec.nl',
    category: 'Corporate & Lead Generation',
    badge: 'HIGH-CONVERSION WORDPRESS',
    tags: ['Showroom Gallery', 'Quote Engine', 'Local Schema', 'Elementor Pro', 'Speed 98+'],
    image: '/assets/images/portfolio/wp-floortec-flooring.webp',
    shortDesc: 'High-converting residential and commercial flooring specialist website with interactive showroom visualizer, quotation estimator, and verified review matrix.',
    fullDesc: 'Developed a high-converting corporate web platform for Floortec flooring specialists. Features interactive showroom galleries, direct showroom appointment booking, 20k+ verified customer reviews matrix, and multi-step custom quotation workflows.',
    metrics: {
      speedScore: '98/100 Mobile',
      loadTime: '0.6s LCP',
      architecture: 'Lightweight WordPress • High-Conversion UI • Schema Graph'
    },
    features: [
      'High-Impact Hero with Direct Free Quote & Consultation CTA',
      'Showroom Visit Booking & Interactive Physical Location Maps',
      'Categorized Flooring Solutions (Wood, Cast Floors, Renovation)',
      '20k+ Happy Client Verified Testimonial Grid & Trust Badges',
      'Multi-Step Quotation Intake Form with Room Measurement Fields',
      'Dutch Market Local SEO & Geo Schema Implementation'
    ],
    deliverables: [
      'Conversion-Optimized WordPress Design & Build',
      'Mobile-Tuned Touch Interactions & Fast Form Submissions',
      'Security Hardening & SSL/Firewall Configuration',
      'Google Analytics 4 & Meta Conversion API Setup'
    ]
  }
];
