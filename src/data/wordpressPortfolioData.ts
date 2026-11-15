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
    id: 'sa-01-naif-alobaid',
    title: 'Naif Alobaid Real Estate Office — Al Malqa Luxury Brokerage',
    client: 'Naif Alobaid Real Estate (Riyadh, Saudi Arabia)',
    domain: 'riyadh-almalqa-realty.sa',
    category: 'Lead-Gen & Property Portal',
    badge: 'SAUDI ARABIA • REAL ESTATE',
    tags: ['Riyadh', 'Arabic + English', 'Property Portal', 'WhatsApp Funnel', '4.8 ★ (198)'],
    image: '/assets/images/portfolio/sa-01-naif-alobaid.webp',
    shortDesc: 'Luxury bilingual brokerage platform for Naif Alobaid Real Estate in Al Malqa, Riyadh — built to replace their missing Google Maps website with curated villa listings and instant WhatsApp scheduling.',
    fullDesc: 'Engineered a flagship digital presence for Naif Alobaid Real Estate Office (مكتب نايف العبيد للعقارات) in Al Malqa, Riyadh. Replaces their missing Google Maps website with an interactive property showcase, neighborhood metrics, verified 4.8-star Google reviews, and direct +966 WhatsApp viewing requests.',
    metrics: {
      speedScore: '99/100 Mobile',
      loadTime: '0.4s LCP',
      architecture: 'Zero-Bloat Custom Architecture • Bilingual RTL/LTR Ready'
    },
    features: [
      'Al Malqa & North Riyadh Property Portfolio Showcase',
      'Interactive Buying / Leasing / Advisory Service Tabs',
      'Verified 4.8 ★ (198 Google Reviews) Social Proof Section',
      'Direct +966 55 528 8933 WhatsApp Viewing Scheduler',
      'Riyadh Office Hours & Interactive Location Details'
    ],
    deliverables: [
      'Full-Page Luxury Real Estate UI & Motion',
      'Mobile-First Responsive Layout',
      'Direct WhatsApp & Phone Conversion Pipeline',
      'SEO Structured Local Riyadh Metadata'
    ]
  },
  {
    id: 'sa-02-otto-coffee',
    title: 'otto Speciality Coffee & Roastery — 24-Hour Riyadh Flagship',
    client: 'otto Speciality Coffee (Al Muruj, Riyadh)',
    domain: 'ottoroastery.sa',
    category: 'Catalog & Specialty Commerce',
    badge: 'SAUDI ARABIA • 24H ROASTERY',
    tags: ['Riyadh', 'Specialty Coffee', '24 Hours', 'Roast Catalog', '4.8 ★ (172)'],
    image: '/assets/images/portfolio/sa-02-otto-coffee.webp',
    shortDesc: 'Editorial espresso & roastery showcase for otto Speciality Coffee in Al Muruj, Riyadh — highlighting their 24-hour service, pour-over menu, and specialty beans.',
    fullDesc: 'Designed a warm, atmospheric digital flagship for otto Speciality Coffee & Roastery (أوتو كافيه ومحمصة مختصة) on Ibn Sina St, Al Muruj, Riyadh. Gives their 4.8-star 24-hour café an interactive brew menu, origin storytelling, and direct WhatsApp bean & table inquiries.',
    metrics: {
      speedScore: '98/100 Mobile',
      loadTime: '0.5s LCP',
      architecture: 'Custom Editorial Layout • Interactive Menu Tabs'
    },
    features: [
      '24-Hour Al Muruj Café & Roastery Hero Experience',
      'Interactive Espresso, Pour-Over & Whole-Bean Menu',
      'Verified 4.8 ★ (172 Google Reviews) Highlights',
      'Direct +966 11 500 1669 & WhatsApp Order Routing'
    ],
    deliverables: [
      'Bespoke Coffee & Roastery Landing Page',
      'Interactive Origin & Roast Filter UI',
      'Local Riyadh Maps & 24/7 Hours Integration'
    ]
  },
  {
    id: 'sa-03-aesthetic-skin',
    title: 'Aesthetic Skin Clinic — Dermatology & Laser Center Riyadh',
    client: 'Aesthetic Skin Clinic (As Sahafah, Riyadh)',
    domain: 'aestheticskinriyadh.sa',
    category: 'Booking & Lead-Gen Portal',
    badge: 'SAUDI ARABIA • MEDICAL CLINIC',
    tags: ['Riyadh', 'Dermatology', 'Booking Portal', '625 Reviews', '4.8 ★'],
    image: '/assets/images/portfolio/sa-03-aesthetic-skin.webp',
    shortDesc: 'Clinical-luxury patient portal for Aesthetic skin clinic on Al Thoumamah Rd, As Sahafah, Riyadh — transforming 625 Google reviews into online consultation bookings.',
    fullDesc: 'Built a serene, high-trust medical aesthetics platform for Aesthetic skin clinic (عيادة استاتيك للجلدية والتجميل) in As Sahafah, Riyadh. Solves their missing-website gap with categorized dermatology & laser protocols, doctor trust signals, and instant WhatsApp booking.',
    metrics: {
      speedScore: '99/100 Mobile',
      loadTime: '0.4s LCP',
      architecture: 'Clinical Trust UI • Instant Consultation Funnel'
    },
    features: [
      'Categorized Dermatology, Laser & Injectable Treatment Tabs',
      '625 Verified Google Reviews & 4.8 ★ Rating Showcase',
      'Direct WhatsApp Appointment Request (+966 11 487 9071)',
      'As Sahafah, Al Thoumamah Rd Clinic Hours & Directions'
    ],
    deliverables: [
      'Luxury Medical Spa & Clinic Landing Page',
      'Treatment Discovery & Consultation Flow',
      'Accessible Contrast & Motion-Reduced Support'
    ]
  },
  {
    id: 'sa-04-halah-boutique',
    title: 'HALAH BOUTIQUE — Luxury Watches & Fine Jewelry Riyadh',
    client: 'HALAH BOUTIQUE (Al Olaya, Riyadh)',
    domain: 'halahboutique.com',
    category: 'Catalog & Luxury Commerce',
    badge: 'SAUDI ARABIA • HOROLOGY',
    tags: ['Riyadh', 'Watches & Jewelry', 'DNS Recovery', 'Al Olaya', '4.5 ★ (246)'],
    image: '/assets/images/portfolio/sa-04-halah-boutique.webp',
    shortDesc: 'Modern luxury horology & jewelry showcase for HALAH BOUTIQUE in Al Olaya, Riyadh — replacing their downed halahboutique.com domain with private salon appointment booking.',
    fullDesc: 'Rebuilt the digital showroom for HALAH BOUTIQUE (بوتيك هالة للساعات والمجوهرات) in Al Olaya, Riyadh after auditing their broken DNS domain. Features curated timepiece & fine jewelry collections, concierge WhatsApp inquiries, and 246-review social proof.',
    metrics: {
      speedScore: '98/100 Mobile',
      loadTime: '0.5s LCP',
      architecture: 'Luxury Editorial Grid • Concierge Booking'
    },
    features: [
      'Fine Timepieces & High Jewelry Collection Showcase',
      'Private Al Olaya Salon Viewing Request Form',
      'Verified 4.5 ★ (246 Google Reviews) Integration',
      'Direct +966 11 465 5580 Concierge Connection'
    ],
    deliverables: [
      'Full Luxury Maison Redesign',
      'Responsive Showcase & Private Concierge Funnel',
      'Broken-Domain Replacement Architecture'
    ]
  },
  {
    id: 'sa-05-dream-automotive',
    title: 'Dream Automotive | PPF & Window Tint — Al Ghadir Studio',
    client: 'Dream Automotive (Al Ghadir, Riyadh)',
    domain: 'dreamautomotive.sa',
    category: 'Creative & Service Configurator',
    badge: 'SAUDI ARABIA • 5.0 ★ PPF',
    tags: ['Riyadh', 'Xpel PPF', 'Ceramic Tint', 'Free Pick-Up', '5.0 ★ (90)'],
    image: '/assets/images/portfolio/sa-05-dream-automotive.webp',
    shortDesc: 'Dark obsidian & copper studio platform for Dream Automotive in Al Ghadir, Riyadh — featuring animated SVG protection gauges, Xpel PPF package configurator, and free pick-up booking.',
    fullDesc: 'Crafted a high-impact luxury automotive protection website for Dream Automotive | PPF & Window Tint on King Abdulaziz Rd, Al Ghadir, Riyadh. Highlights their 5.0-star rating across 90 reviews, Xpel PPF & IR ceramic tint specs, post-install checkups, and complimentary car pick-up/delivery.',
    metrics: {
      speedScore: '99/100 Mobile',
      loadTime: '0.4s LCP',
      architecture: 'Interactive Configurator • Animated SVG Gauges'
    },
    features: [
      'Animated SVG IR Heat Rejection & 8-mil Xpel Film Gauges',
      'Interactive Package Selector (PPF, Ceramic Tint, Paint Correction)',
      'Complimentary Riyadh Car Pick-Up & Delivery Booking',
      'Verified Quotes from 90 Five-Star Google Reviews'
    ],
    deliverables: [
      'Luxury Automotive Studio Landing Page',
      'Interactive WhatsApp Quote Configurator',
      'FAQ Accordion & Studio Hours (Sat–Thu 1–10 PM)'
    ]
  },
  {
    id: 'sa-06-digital-solutions',
    title: 'Digital Solutions . شركه حلول رقميه — Riyadh IT & Support Portal',
    client: 'Digital Solutions (Alshaikh, Riyadh)',
    domain: 'digitalsolutions-sa.com',
    category: 'Booking & Lead-Gen Portal',
    badge: 'SAUDI ARABIA • IT PORTAL',
    tags: ['Riyadh', 'IT Services', 'Support Desk', 'Deep Sea UI', 'WhatsApp Ticket'],
    image: '/assets/images/portfolio/sa-06-digital-solutions.webp',
    shortDesc: 'Enterprise IT & client support portal for Digital Solutions (شركه حلول رقميه) in Alshaikh, Riyadh — directly solving customer complaints about having no website or support contact.',
    fullDesc: 'Built an authoritative Deep-Sea themed corporate IT & client support portal for Digital Solutions . شركه حلول رقميه on Hassan bin Hussain Rd, Riyadh. Directly addresses verified Google review feedback regarding unreachable customer service by providing instant WhatsApp ticketing and service tracks.',
    metrics: {
      speedScore: '99/100 Mobile',
      loadTime: '0.4s LCP',
      architecture: 'Interactive Service Desk • Direct Ticket Routing'
    },
    features: [
      'Interactive 3-Track Service Directory (Systems, Cloud, Support)',
      'One-Click WhatsApp Customer Service & Direct Phone Desk',
      'Online Support Ticket Submission Form',
      'Verified Sun–Thu 9 AM – 6 PM Riyadh Office Hours'
    ],
    deliverables: [
      'Enterprise Information Services Portal',
      'Customer Support Gap Resolution',
      'Responsive Multi-Section Architecture'
    ]
  },
  {
    id: 'usa-01-beauty-elite',
    title: 'Beauty Elite Med Spa — Austin Boutique Aesthetics & Booking',
    client: 'Beauty Elite Med Spa (Austin, TX, USA)',
    domain: 'beautyelitemedspa.com',
    category: 'Booking & Lead-Gen Portal',
    badge: 'USA • AUSTIN MEDSPA',
    tags: ['Austin TX', 'MedSpa', 'DNS Recovery', 'Online Booking', '4.8 ★ (55)'],
    image: '/assets/images/portfolio/usa-01-beauty-elite.webp',
    shortDesc: 'Warm alabaster & rosewood clinical spa redesign for Beauty Elite Med Spa in Austin, TX — replacing their dead ERR_NAME_NOT_RESOLVED domain with a treatment menu and booking funnel.',
    fullDesc: 'Audited beautyelitemedspa.com (dead DNS / unreachable) and built a complete boutique medical spa website for Beauty Elite Med Spa on Research Blvd, Austin, TX. Highlights Dr. Sarah’s natural-results philosophy, Botox & lip filler menu, and verified 4.8-star Austin patient reviews.',
    metrics: {
      speedScore: '99/100 Mobile',
      loadTime: '0.4s LCP',
      architecture: 'Dead-Domain Recovery • Interactive Treatment Menu'
    },
    features: [
      'Interactive Treatment Menu (Injectables, Medical Facials, Consult)',
      'Dr. Sarah & Austin Clinical Trust Highlights',
      'Online Consultation Request Form & (512) 588-3444 Direct Call',
      'Mon–Sat Opening Hours & Research Blvd Location Card'
    ],
    deliverables: [
      'Complete MedSpa Brand Redesign',
      'Patient Booking Funnel & Treatment Tabs',
      'Verified Google Review Integration'
    ]
  },
  {
    id: 'usa-02-olson-defendorf',
    title: 'Olson Defendorf Custom Homes — Westlake Architectural Builder',
    client: 'Olson Defendorf Custom Homes (Austin, TX, USA)',
    domain: 'odcustomhomes.com',
    category: 'Agency & Creative',
    badge: 'USA • CUSTOM HOMES',
    tags: ['Austin TX', 'Architecture', 'Custom Builder', 'Portfolio', '4.6 ★ (22)'],
    image: '/assets/images/portfolio/usa-02-olson-defendorf.webp',
    shortDesc: 'Architectural stone & bronze showcase for Olson Defendorf Custom Homes in Austin, TX — replacing their insecure dead HTTP domain with a 3-phase build process and plan review intake.',
    fullDesc: 'Audited http://www.odcustomhomes.com (insecure HTTP + DNS failure) and designed a luxury residential builder showcase for Olson Defendorf Custom Homes on Bee Caves Rd, Austin, TX. Features Spanish Oaks & Westlake craftsmanship, interactive 3-phase build tabs, and pre-construction intake.',
    metrics: {
      speedScore: '98/100 Mobile',
      loadTime: '0.5s LCP',
      architecture: 'Architectural Showcase • Pre-Construction Intake'
    },
    features: [
      'Interactive 3-Phase Build Process Explorer',
      'Spanish Oaks Homeowner & Real Estate Broker Testimonials',
      'Pre-Construction Plan Review Intake Form',
      'HTTPS-Ready Luxury Editorial Layout'
    ],
    deliverables: [
      'Custom Home Builder Flagship Redesign',
      'Portfolio & Build Methodology Showcase',
      'Austin Neighborhood Intake Funnel'
    ]
  },
  {
    id: 'uk-01-bespoke-tailor',
    title: 'Bespoke Tailor Studio — London SE1 Savile-Grade Tailoring',
    client: 'Bespoke Tailor Studio (London, United Kingdom)',
    domain: 'bespoketailorstudio.com',
    category: 'Agency & Creative',
    badge: 'UNITED KINGDOM • LONDON SE1',
    tags: ['London SE1', 'Bespoke Suit', 'DNS Recovery', 'Fitting Booking', '4.9 ★'],
    image: '/assets/images/portfolio/uk-01-bespoke-tailor.webp',
    shortDesc: 'Dark cloth & gold tailoring atelier website for Bespoke Tailor Studio on Stamford St, London — fixing their dead domain with cloth/cut tabs and private fitting scheduling.',
    fullDesc: 'Audited bespoketailorstudio.com (ERR_NAME_NOT_RESOLVED) and crafted a refined London tailoring showcase for Bespoke Tailor Studio at 58-60 Stamford St, London SE1. Features wedding & business cut tabs, 4.9-star client reviews, and a private fitting appointment form.',
    metrics: {
      speedScore: '99/100 Mobile',
      loadTime: '0.4s LCP',
      architecture: 'Atelier Lookbook UI • Private Fitting Scheduler'
    },
    features: [
      'Interactive Tailoring Cuts (Wedding, City Business, Alterations)',
      'Verified 4.9 ★ London Client Reviews',
      'Private Fitting Request Form & +44 7979 000300 Direct Line',
      'Mon–Sat 9 AM – 7 PM Stamford St Studio Details'
    ],
    deliverables: [
      'Bespoke Tailoring Atelier Website',
      'Interactive Cut & Cloth Selector',
      'Online Fitting Lead Capture'
    ]
  },
  {
    id: 'uk-02-be-unique-camden',
    title: 'Be UNIQUE Camden — Horology & Express Watch Repair London',
    client: 'Be UNIQUE Camden (London NW1, United Kingdom)',
    domain: 'beuniquecamden.co.uk',
    category: 'Catalog & Service Commerce',
    badge: 'UNITED KINGDOM • 119 REVIEWS',
    tags: ['London NW1', 'Watch Repair', 'Horology', 'Mail-In Intake', '4.9 ★ (119)'],
    image: '/assets/images/portfolio/uk-02-be-unique-camden.webp',
    shortDesc: 'Luxury horology & bench-repair portal for Be UNIQUE Camden in London NW1 — turning their 119 five-star Google reviews and missing website into a 7-day repair & mail-in hub.',
    fullDesc: 'Built the first official web presence for Be UNIQUE Camden at 21 Chalk Farm Rd, London NW1 (previously no website on Google Maps despite 119 reviews at 4.9 ★). Highlights express battery, crystal glass, and vintage strap servicing alongside a bench repair intake form.',
    metrics: {
      speedScore: '99/100 Mobile',
      loadTime: '0.4s LCP',
      architecture: 'Horology Bench UI • Repair & Mail-In Intake'
    },
    features: [
      'Express Watch Repair & Multi-Watch Service Showcase',
      '4.9 ★ (119 Reviews) Camden Social Proof',
      'Online Watch Brand & Issue Repair Intake Form',
      '7-Day Chalk Farm Rd Opening Hours'
    ],
    deliverables: [
      'First-Ever Horology & Repair Website',
      'Repair Estimation Intake Pipeline',
      'Local Camden SEO Architecture'
    ]
  },
  {
    id: 'ca-01-lismont-cpa',
    title: 'Lismont Professional Corporation — Toronto CPA & Tax Advisory',
    client: 'Lismont Professional Corporation (Toronto, ON, Canada)',
    domain: 'lismont.ca',
    category: 'Booking & Lead-Gen Portal',
    badge: 'CANADA • TORONTO CPA',
    tags: ['Toronto ON', 'CPA Firm', '2018 Redesign', 'Tax Advisory', '4.8 ★ (32)'],
    image: '/assets/images/portfolio/ca-01-lismont-cpa.webp',
    shortDesc: 'Modern emerald & ivory CPA advisory redesign for Lismont Professional Corporation in Toronto — replacing broken 2018 staging-server video links and dummy # buttons.',
    fullDesc: 'Audited lismont.ca (broken http://stage.lismont.ca hero video & dead # links on legacy 2018 WordPress) and rebuilt an authoritative Toronto CPA website. Showcases corporate T2, personal T1, and 5+ year client retention with a clean consultation intake.',
    metrics: {
      speedScore: '99/100 Mobile',
      loadTime: '0.4s LCP',
      architecture: 'Zero-Bloat Advisory UI • Broken Asset Cleanup'
    },
    features: [
      'Corporate Tax, Personal Returns & Ongoing CPA Advisory',
      'Verified 4.8 ★ (32 Google Reviews) Multi-Year Client Quotes',
      'Clean Tax Review Booking Form (Zero Dead # Links)',
      '1118 St Clair Ave W Toronto Office & Hours'
    ],
    deliverables: [
      'Legacy 2018 WordPress Modernization',
      'Mixed-Content & Broken Link Resolution',
      'CPA Client Intake Funnel'
    ]
  },
  {
    id: 'ca-02-expert-detailing',
    title: 'Expert Car Detailing — Vancouver Mobile & Studio Detailing',
    client: 'Expert Car Detailing (Vancouver, BC, Canada)',
    domain: 'cardetailingvancouverbc.com',
    category: 'Catalog & Service Commerce',
    badge: 'CANADA • VANCOUVER',
    tags: ['Vancouver BC', 'Mobile Detailing', 'Blank Page Fix', '7 AM–10 PM', '4.8 ★'],
    image: '/assets/images/portfolio/ca-02-expert-detailing.webp',
    shortDesc: 'Sleek ice-blue & slate detailing platform for Expert Car Detailing in Vancouver, BC — replacing their 39-byte blank white website with mobile/at-home booking.',
    fullDesc: 'Audited cardetailingvancouverbc.com (returning an empty 39-byte HTML document) and built a complete conversion-ready site for Expert Car Detailing in Vancouver. Highlights at-home mobile detailing, multi-hour scratch removal, and 7 AM – 10 PM daily availability.',
    metrics: {
      speedScore: '99/100 Mobile',
      loadTime: '0.4s LCP',
      architecture: 'Blank-Site Recovery • Mobile Dispatch Booking'
    },
    features: [
      'Mobile At-Home & West Broadway Lot Service Showcase',
      'Verified 4.8 ★ (45 Google Reviews) Vancouver Stories',
      'Interactive Vehicle & Package Reservation Form',
      '7-Day 7:00 AM – 10:00 PM Operating Schedule'
    ],
    deliverables: [
      'Complete Replacement for Blank 39-Byte Website',
      'Mobile Detailing Booking Funnel',
      'Vancouver Local SEO Layout'
    ]
  },
  {
    id: 'ae-01-royal-fitout',
    title: 'Royal Fitout & Interior Design Dubai — Turnkey Luxury Fit-Out',
    client: 'Royal Fitout & Interior Design (Al Quoz, Dubai, UAE)',
    domain: 'royalfitoutdubai.com',
    category: 'Agency & Creative',
    badge: 'DUBAI UAE • 5.0 ★ FIT-OUT',
    tags: ['Dubai UAE', 'Interior Fit-Out', 'Villa Design', 'WhatsApp RFP', '5.0 ★'],
    image: '/assets/images/portfolio/ae-01-royal-fitout.webp',
    shortDesc: 'Obsidian & gold luxury interior fit-out website for Royal Fitout Dubai in Al Quoz 4 — fixing their HTTPS-refused / 39-byte blank site with villa & commercial RFP intake.',
    fullDesc: 'Audited royalfitoutdubai.com (HTTPS connection refused + empty HTTP response) and engineered a luxury Dubai interior fit-out showcase. Features turnkey villa & commercial fit-out scopes, 5.0-star Dubai reviews, and instant +971 50 338 6500 WhatsApp briefs.',
    metrics: {
      speedScore: '98/100 Mobile',
      loadTime: '0.5s LCP',
      architecture: 'Luxury Turnkey Showcase • WhatsApp RFP'
    },
    features: [
      'Luxury Villa & Commercial Turnkey Fit-Out Portfolio',
      'Verified 5.0 ★ (11 Google Reviews) Dubai Client Praise',
      'Instant WhatsApp Project Brief Generator (+971 50 338 6500)',
      'Al Quoz Industrial Area 4 Studio Hours'
    ],
    deliverables: [
      'Luxury Dubai Interior Fit-Out Website',
      'SSL/Blank-Site Replacement Architecture',
      'Direct UAE WhatsApp Lead Funnel'
    ]
  },
  {
    id: 'ae-02-7road-auto',
    title: '7 Road Auto Care — Al Quoz Ceramic & Paint Protection Dubai',
    client: '7 Road Auto Care (Al Quoz 3, Dubai, UAE)',
    domain: '7roadautocare.ae',
    category: 'Catalog & Service Commerce',
    badge: 'DUBAI UAE • 404 FIX',
    tags: ['Dubai UAE', 'Auto Detailing', '404 Recovery', 'Al Quoz 3', '4.8 ★ (61)'],
    image: '/assets/images/portfolio/ae-02-7road-auto.webp',
    shortDesc: 'Performance detailing & ceramic showcase for 7 Road Auto Care in Al Quoz 3, Dubai — replacing their broken 404 Tilda subdomain with a custom booking portal.',
    fullDesc: 'Audited http://7roadautocare.tilda.ws/ (returning an immediate HTTP 404 Page Not Found) and created a high-converting Al Quoz studio website for 7 Road Auto Care. Highlights ceramic protection, paint correction, 61 Google reviews, and 7-day WhatsApp booking.',
    metrics: {
      speedScore: '99/100 Mobile',
      loadTime: '0.4s LCP',
      architecture: '404 Recovery • Direct WhatsApp Bay Booking'
    },
    features: [
      'Full Ceramic Protection, Polish & Interior Restoration Tiers',
      'Verified 4.8 ★ (61 Google Reviews) Al Quoz Feedback',
      'Direct WhatsApp Vehicle Reservation (+971 54 369 3131)',
      'Warehouse 1, 20b St Daily 9 AM – 9 PM Schedule'
    ],
    deliverables: [
      'Custom Brand Website Replacing 404 Tilda Page',
      'UAE Mobile-First Reservation Funnel',
      'Desert-Spec Service Tier Presentation'
    ]
  },
  {
    id: 'de-01-architekten',
    title: 'architekten — Frankfurt Architectural Practice & § 5 TMG Hub',
    client: 'architekten (Schillerstraße 16, Frankfurt, Germany)',
    domain: 'architekten.de',
    category: 'Agency & Creative',
    badge: 'GERMANY • § 5 TMG READY',
    tags: ['Frankfurt', 'Architecture', 'German UI', 'Impressum', '5.0 ★'],
    image: '/assets/images/portfolio/de-01-architekten.webp',
    shortDesc: 'Architectural German-language studio site for architekten on Schillerstraße 16, Frankfurt — replacing their 39-byte blank page and adding mandatory § 5 TMG Impressum structure.',
    fullDesc: 'Audited http://architekten.de/ (blank 39-byte HTTP page lacking SSL and mandatory German § 5 TMG Impressum) and built a minimalist architectural showcase in German. Features Entwurf & Genehmigung, Gewerbe & Wohnbau, 5.0-star reviews, and compliant Impressum structure.',
    metrics: {
      speedScore: '99/100 Mobile',
      loadTime: '0.4s LCP',
      architecture: 'German Architectural UI • § 5 TMG Impressum Ready'
    },
    features: [
      'German-Language Architectural Practice & Leistungsphasen',
      'Mandatory § 5 TMG Impressum Structure Included',
      'Verified 5.0 ★ Frankfurt Client Endorsements',
      'Direct Projektanfrage & +49 69 1338870 Contact'
    ],
    deliverables: [
      'German Architectural Studio Redesign',
      'Blank HTTP Page & Compliance Fix',
      'Frankfurt Innenstadt Inquiry Pipeline'
    ]
  },
  {
    id: 'de-02-why-coffee',
    title: 'WHY! Specialty Coffee — Frankfurt Roastery & Brew Bar',
    client: 'WHY! Specialty Coffee (Frankfurt am Main, Germany)',
    domain: 'whycoffee.de',
    category: 'Catalog & Specialty Commerce',
    badge: 'GERMANY • 553 REVIEWS',
    tags: ['Frankfurt', 'Specialty Coffee', 'Roastery', 'Bean Reservation', '4.8 ★'],
    image: '/assets/images/portfolio/de-02-why-coffee.webp',
    shortDesc: 'Warm espresso-crema redesign for WHY! Specialty Coffee on Klingerstraße 11, Frankfurt — upgrading their sparse outdated site with a digital brew menu and bean reservations.',
    fullDesc: 'Audited http://www.whycoffee.de/ (outdated pixelated logo, no digital menu or bean ordering) and crafted an editorial specialty coffee flagship for WHY! Specialty Coffee in Frankfurt. Showcases their 553 Google reviews (4.8 ★), flat white & pour-over bar, and whole-bean reservation form.',
    metrics: {
      speedScore: '98/100 Mobile',
      loadTime: '0.5s LCP',
      architecture: 'Editorial Roastery UI • Bean Reservation Form'
    },
    features: [
      'Digital Brew Bar (Flat White, Pour Over, Whole-Bean Bags)',
      'Verified 4.8 ★ (553 Google Reviews) Frankfurt Praise',
      'Interactive Whole-Bean & Wholesale Reservation Form',
      'Klingerstraße 11 7-Day Opening Hours'
    ],
    deliverables: [
      'Specialty Coffee Brand Modernization',
      'Digital Menu & Bean Reservation UI',
      'Local Frankfurt Discovery Layout'
    ]
  },
  {
    id: 'nl-01-babette-verhoef',
    title: 'Babette Verhoef Styling & Interieuradvies — Amsterdam Studio',
    client: 'Babette Verhoef (Amsterdam, Netherlands)',
    domain: 'babettesinterieurstyling.nl',
    category: 'Agency & Creative',
    badge: 'NETHERLANDS • AMSTERDAM',
    tags: ['Amsterdam', 'Interior Design', 'Sustainable', 'Consultation', '4.8 ★'],
    image: '/assets/images/portfolio/nl-01-babette-verhoef.webp',
    shortDesc: 'Warm clay & linen interior styling studio for Babette Verhoef in Amsterdam — replacing an unconfigured blog-wall layout with sustainable restyling & WhatsApp intake.',
    fullDesc: 'Audited http://www.babettesinterieurstyling.nl/ (unconfigured "- babettesinterieurstyling.nl" title, dense blog text wall, no intake flow) and redesigned a serene Amsterdam interior styling flagship highlighting sustainable restyling and color direction.',
    metrics: {
      speedScore: '99/100 Mobile',
      loadTime: '0.4s LCP',
      architecture: 'Editorial Interior UI • WhatsApp Session Intake'
    },
    features: [
      'Sustainable Restyling & Color Direction Showcase',
      'Verified 4.8 ★ (13 Google Reviews) Amsterdam Stories',
      'Direct WhatsApp Home Session Planner (+31 6 55135215)',
      'Rivierenbuurt Studio Schedule'
    ],
    deliverables: [
      'Interior Styling Studio Redesign',
      'Metadata & Mobile Layout Modernization',
      'Interactive Consultation Intake'
    ]
  },
  {
    id: 'nl-02-amsterdam-skin',
    title: 'Amsterdam Skin — Post-Op Recovery & Facial Clinic De Pijp',
    client: 'Amsterdam Skin (Van Woustraat, Amsterdam)',
    domain: 'amsterdamskin.nl',
    category: 'Booking & Lead-Gen Portal',
    badge: 'NETHERLANDS • DEMO FIX',
    tags: ['Amsterdam', 'Skin Clinic', 'Hours Sync', 'WhatsApp Booking', '4.8 ★'],
    image: '/assets/images/portfolio/nl-02-amsterdam-skin.webp',
    shortDesc: 'Refined plum & ivory clinic redesign for Amsterdam Skin on Van Woustraat — fixing their "Home6" template title, conflicting opening hours, and 10-node stub page.',
    fullDesc: 'Audited https://amsterdamskin.nl/ (unchanged "Home6 - Amsterdam Skin" demo title, opening hours contradicting Google Maps, bare 10-DOM-node skeleton) and built a complete clinic platform with accurate Mon–Sat hours, after-lipo/postpartum protocols, and WhatsApp booking.',
    metrics: {
      speedScore: '99/100 Mobile',
      loadTime: '0.4s LCP',
      architecture: 'Clinic Booking UI • Verified Hours Sync'
    },
    features: [
      'After-Lipo, Postpartum Massage & Pro Lift Facial Menu',
      'Accurate Google Maps Opening Hours (Mon–Thu til 9 PM)',
      'Verified 4.8 ★ (17 Reviews) De Pijp Testimonials',
      'Direct +31 6 15151022 WhatsApp Treatment Booking'
    ],
    deliverables: [
      'Full Skin Clinic Redesign Replacing Demo Stub',
      'Hours & Metadata Accuracy Fix',
      'WhatsApp Treatment Reservation Flow'
    ]
  },
  {
    id: 'sg-01-mohans-tailors',
    title: "Mohan's Custom Tailors — Orchard Road Bespoke Suiting",
    client: "Mohan's Custom Tailors (Orchard Rd, Singapore)",
    domain: 'mohanstailors.com',
    category: 'Agency & Creative',
    badge: 'SINGAPORE • 116 REVIEWS',
    tags: ['Singapore', 'Orchard Rd', 'Bespoke Tailor', 'DNS Recovery', '4.8 ★'],
    image: '/assets/images/portfolio/sg-01-mohans-tailors.webp',
    shortDesc: "Luxury bespoke suiting showcase for Mohan's Custom Tailors in Lucky Plaza, Orchard Rd, Singapore — replacing their dead http://mohanstailors.com domain with fitting booking.",
    fullDesc: "Audited http://mohanstailors.com/ (insecure HTTP + ERR_NAME_NOT_RESOLVED) and built a crisp Orchard Road tailoring platform for Max Mohan and team. Highlights tropical-weight suits, 5-shirt bespoke packs, express turnaround, and 116 Google reviews.",
    metrics: {
      speedScore: '99/100 Mobile',
      loadTime: '0.4s LCP',
      architecture: 'Bespoke Atelier UI • Fitting Reservation'
    },
    features: [
      'Custom Suits, 5-Shirt Packs & Express Turnaround Showcase',
      'Verified 4.8 ★ (116 Google Reviews) Singapore Praise',
      'Online Measurement Appointment Request Form',
      'Lucky Plaza 7-Day Schedule & +65 6732 3892 Direct Call'
    ],
    deliverables: [
      'Orchard Road Tailor Flagship Website',
      'Dead-Domain Recovery & HTTPS Architecture',
      'Fitting Appointment Intake'
    ]
  },
  {
    id: 'sg-02-horizon-dental',
    title: 'Horizon Dental Surgery — 5.0 ★ Central Singapore Clinic',
    client: 'Horizon Dental Surgery (New Bridge Rd, Singapore)',
    domain: 'horizondentalsg.com',
    category: 'Booking & Lead-Gen Portal',
    badge: 'SINGAPORE • 5.0 ★ (435)',
    tags: ['Singapore', 'Dental Clinic', '435 Reviews', '5.0 ★', 'Patient Intake'],
    image: '/assets/images/portfolio/sg-02-horizon-dental.webp',
    shortDesc: 'Calm clinical-teal website for Horizon Dental Surgery on New Bridge Rd, Singapore — giving their 5.0-star (435 reviews) practice its first online appointment portal.',
    fullDesc: 'Built the first official website for Horizon Dental Surgery at 27 New Bridge Rd, Singapore (no website on Google Maps despite 435 five-star reviews). Highlights Dr. Andrew, Dr. Gary Chee, Ms. Wong, gentle endodontic care, and online slot requests.',
    metrics: {
      speedScore: '99/100 Mobile',
      loadTime: '0.4s LCP',
      architecture: 'Patient Trust Portal • Slot Request Intake'
    },
    features: [
      'Complex Root Canal Salvage & Gentle General Dentistry',
      'Verified 5.0 ★ (435 Google Reviews) Patient Stories',
      'Online Dental Appointment Request Form',
      'New Bridge Rd Mon–Sat Hours & +65 6533 3330 Line'
    ],
    deliverables: [
      'First Official Dental Clinic Website',
      '435-Review Reputation Showcase',
      'Central Singapore Patient Booking Flow'
    ]
  },
  {
    id: 'my-01-mel-detailing',
    title: 'Mel Detailing KL — 5.0 ★ Auto Detailing Kuala Lumpur',
    client: 'Mel Detailing Car Detailing Kuala Lumpur (Malaysia)',
    domain: 'meldetailingkl.my',
    category: 'Catalog & Service Commerce',
    badge: 'MALAYSIA • 5.0 ★ (631)',
    tags: ['Kuala Lumpur', 'Car Detailing', '631 Reviews', 'WhatsApp Bay', '5.0 ★'],
    image: '/assets/images/portfolio/my-01-mel-detailing.webp',
    shortDesc: 'Dark obsidian & amber detailing hub for Mel Detailing in Kuchai Park, Kuala Lumpur — turning 631 five-star reviews and a missing website into a WhatsApp bay booking funnel.',
    fullDesc: 'Built the first dedicated web presence for Mel Detailing Car Detailing Kuala Lumpur (631 reviews at 5.0 ★, no website on Google Maps). Features deep interior cleaning, exterior polish, verified KL customer reviews, and direct +60 16-651 8658 WhatsApp booking.',
    metrics: {
      speedScore: '99/100 Mobile',
      loadTime: '0.4s LCP',
      architecture: 'Auto Studio UI • WhatsApp Bay Reservation'
    },
    features: [
      'Deep Interior Cleaning & Exterior Gloss Packages',
      'Verified 5.0 ★ (631 Google Reviews) KL Feedback',
      'Direct WhatsApp Car Model & Package Booking',
      'Kuchai Entrepreneurs Park Tue–Sun Schedule'
    ],
    deliverables: [
      'First Official KL Detailing Website',
      '631-Review Social Proof Architecture',
      'Direct WhatsApp Conversion Funnel'
    ]
  },
  {
    id: 'my-02-klinik-redha',
    title: 'Klinik Pergigian Redha — 2,092-Review Cheras Dental Hub',
    client: 'Klinik Pergigian Redha Taman Bukit Cheras (KL, Malaysia)',
    domain: 'klinikredhacheras.my',
    category: 'Booking & Lead-Gen Portal',
    badge: 'MALAYSIA • 2,092 REVIEWS',
    tags: ['Kuala Lumpur', 'Dental Clinic', '2,092 Reviews', 'WhatsApp', '4.9 ★'],
    image: '/assets/images/portfolio/my-02-klinik-redha.webp',
    shortDesc: 'Warm sage & ivory dental portal for Klinik Pergigian Redha in Taman Bukit Cheras, KL — empowering their 2,092-review clinic with direct WhatsApp appointment scheduling.',
    fullDesc: 'Designed the first official clinic website for Klinik Pergigian Redha Taman Bukit Cheras (4.9 ★ across 2,092 Google reviews, no website listed). Highlights Dr. Dayana, Dr. Nadhirah, Ms. Alya, 9 AM – 10 PM daily hours, and one-click WhatsApp booking.',
    metrics: {
      speedScore: '99/100 Mobile',
      loadTime: '0.4s LCP',
      architecture: 'Family Dental Portal • WhatsApp Booking'
    },
    features: [
      'Gentle Family Dentistry & Extended 9 AM – 10 PM Daily Hours',
      'Verified 4.9 ★ (2,092 Google Reviews) Patient Trust',
      'Direct +60 11-1051 0495 WhatsApp Appointment Builder',
      'Taman Bukit Cheras Location & Clinic Info'
    ],
    deliverables: [
      'High-Trust Malaysian Dental Clinic Website',
      'WhatsApp Appointment Intake',
      'Mobile-First Cheras Patient Experience'
    ]
  },
  {
    id: 'au-01-studio-urbo',
    title: 'Studio Urbo — Pyrmont Sydney Architecture & DA Approvals',
    client: 'Studio Urbo (Pyrmont, Sydney NSW, Australia)',
    domain: 'studiourbo.com',
    category: 'Agency & Creative',
    badge: 'AUSTRALIA • SYDNEY 5.0 ★',
    tags: ['Sydney NSW', 'Architecture', 'DA Approvals', 'Blank Page Fix', '5.0 ★'],
    image: '/assets/images/portfolio/au-01-studio-urbo.webp',
    shortDesc: 'Warm terracotta & stone architecture showcase for Studio Urbo in Pyrmont, Sydney — replacing their empty 39-byte HTTP stub with DA approval & redesign capabilities.',
    fullDesc: 'Audited http://studiourbo.com/ (serving an empty 39-byte HTML skeleton over insecure HTTP) and built a refined Sydney architecture studio website for Christian and Studio Urbo. Highlights preliminary design, fast DA approvals, and 5.0-star homeowner reviews.',
    metrics: {
      speedScore: '99/100 Mobile',
      loadTime: '0.4s LCP',
      architecture: 'Architectural Editorial UI • Brief Intake'
    },
    features: [
      'Preliminary Design, DA Documentation & Home Redesigns',
      'Verified 5.0 ★ (11 Google Reviews) Sydney Homeowners',
      'Project Stage Inquiry Form & +61 411 768 060 Line',
      'Pyrmont Studio Mon–Fri Operating Hours'
    ],
    deliverables: [
      'Complete Replacement for Blank 39-Byte HTTP Stub',
      'Sydney Residential Architecture Showcase',
      'Project Brief Lead Capture'
    ]
  },
  {
    id: 'au-02-mr-bubbles',
    title: 'Mr. Bubbles Hand Car Wash — Melbourne Ceramic & Detailing',
    client: 'Mr. Bubbles Hand Car Wash (Coburg, Melbourne, Australia)',
    domain: 'mrbubblescoburg.com.au',
    category: 'Catalog & Service Commerce',
    badge: 'AUSTRALIA • MELBOURNE',
    tags: ['Melbourne VIC', 'Hand Car Wash', 'Ceramic Coating', '7 Days', '4.5 ★'],
    image: '/assets/images/portfolio/au-02-mr-bubbles.webp',
    shortDesc: 'Deep cyan & slate automotive care site for Mr. Bubbles Hand Car Wash in Coburg, Melbourne — converting their missing Google Maps website into a 7-day wash & ceramic booking page.',
    fullDesc: 'Built the first official website for Mr. Bubbles Hand Car Wash on Sydney Rd, Coburg VIC (no website on Google Maps). Showcases inside-and-out 4WD/sedan hand washes, ceramic coatings, verified Melbourne reviews, and direct slot requests.',
    metrics: {
      speedScore: '99/100 Mobile',
      loadTime: '0.4s LCP',
      architecture: 'Automotive Care UI • 7-Day Booking Intake'
    },
    features: [
      'Inside & Out Hand Wash, Detailing & Ceramic Coating',
      'Verified 4.5 ★ (47 Google Reviews) Coburg Feedback',
      'Online Wash & Ceramic Slot Request Form',
      '69 Sydney Rd Daily 8 AM – 5 PM Schedule'
    ],
    deliverables: [
      'First Official Melbourne Studio Website',
      'Ceramic & Detailing Package Showcase',
      'Local Coburg SEO Layout'
    ]
  }
];
