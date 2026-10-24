# Sheharyar Siraj - AI Automation Architect & WordPress Systems Engineer

[![Live Site](https://img.shields.io/badge/Live_Site-sheharyarsiraj.com-b7ff3c?style=for-the-badge&logo=googlechrome&logoColor=black)](https://sheharyarsiraj.com/)
[![GitHub](https://img.shields.io/badge/GitHub-Sheharyar--ans-white?style=for-the-badge&logo=github&logoColor=black)](https://github.com/Sheharyar-ans)
[![React 18](https://img.shields.io/badge/React-18.2.0-61dafb?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.4.5-646cff?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

Source code for the official portfolio and systems engineering platform of **Sheharyar Siraj**, an AI Automation Architect & WordPress Systems Engineer based in Karachi, Pakistan. The site is live at [https://sheharyarsiraj.com/](https://sheharyarsiraj.com/).

Sheharyar partners with clients via Upwork and Fiverr, as well as founders, enterprises, and digital agencies across the USA, United Kingdom, United Arab Emirates, Saudi Arabia, Ireland, and Europe.

---

## What the Platform Showcases

### 1. 11 Core B2B Architecture Services
- **Custom WordPress Systems Engineering**: Modern, bespoke WordPress architectures built from scratch with clean PHP 8.2+ object-oriented code, custom Gutenberg block suites, and zero bloated page builders.
- **WooCommerce High-Concurrency Systems**: High-throughput stores utilizing High-Performance Order Storage (HPOS), session sharding, and database indexing for high order concurrency.
- **Autonomous AI Voice Agents & Telephony**: Instant-response conversational voice agents for automated phone reception, calendar booking, and CRM synchronization via Vapi, Retell AI, and Twilio.
- **Contextual AI Chatbots & RAG Systems**: Retrieval-augmented conversational assistants grounded in private business knowledge with source citations and zero hallucinations.
- **Workflow Automation & Self-Hosted n8n Clusters**: Private multi-worker Docker clusters with Redis queues and Dead Letter Queue (DLQ) retry architecture, eliminating per-task SaaS fees.
- **Deterministic Agentic AI Applications**: Multi-agent orchestration workflows built on LangGraph and Python with strict schema tool-calling and self-correcting validation loops.
- **Custom SaaS & MVP Engineering**: Full-stack React, Next.js, and Node.js web applications with PostgreSQL and Stripe multi-tier subscription billing.
- **White-Label Agency Subcontracting**: Dedicated behind-the-scenes engineering bandwidth for digital and SEO agencies under strict bilateral non-disclosure agreements.
- **AI Video Ads & Synthetic UGC**: Automated high-velocity creative testing pipelines combining generative video models with synthetic digital avatars and voice cloning.
- **Data Pipelines & Headless Scraping**: Resilient data harvesting workflows built with ScrapeGraphAI and Playwright, proxy rotation, and automated database ETL.
- **Data Analytics & Data Science Solutions**: Interactive executive dashboards in Power BI, Tableau, and Advanced Microsoft Excel; SQL ETL flows; Python (Pandas, Scikit-learn) predictive modeling (churn analysis, sales forecasting); and automated web data scrapers.

### 2. 10 Built-In Interactive Utility Tools (`/tools/`)
- **AI Local Schema & Entity Generator**: Compiles nested JSON-LD LocalBusiness schemas and markdown `llms.txt` manifests.
- **WordPress Database Bloat Estimator**: Audits `wp_options` autoload weight, transient bloat, and provides SQL cleanups.
- **Custom Post Type Code Exporter**: Generates clean PHP 8.2 CPT registrations and Gutenberg REST bindings.
- **PSR-4 WordPress Plugin Boilerplate Generator**: Scaffolds modular, object-oriented plugins with strict typing and CSRF protection.
- **AI Voice Agent ROI Calculator**: Simulates operational savings and payback timelines for automated voice telephony.
- **AI Voice Prompt Designer**: Visualizes state machines and tool-calling flows for conversational phone bots.
- **Webhook Payload Tester**: Formats incoming webhook payloads and validates HMAC SHA-256 signatures.
- **n8n Fault-Tolerant Error Handler Generator**: Exports Dead Letter Queue (DLQ) retry workflows for n8n.
- **LLM SEO Meta Generator**: Simulates SERP snippets, Open Graph cards, and AI search engine visibility.
- **WooCommerce SKU & Catalog Auditor**: Audits product catalogs for duplicate SKUs, missing alt tags, and unindexed attributes.

### 3. Interactive Code Arcade (`/arcade/`)
- A retro-futuristic browser-based developer coding arena featuring:
  - **Puzzle Mode**: Grid navigation coding challenges using real code commands.
  - **Boss Fighter Mode**: Algorithmic test-case battles dealing damage to technical bosses.
  - **5 Language Tracks**: JavaScript (ES6+), Python, React hooks, HTML/CSS layout, and API/JSON parsing.

### 4. Production Architectural Case Studies & Benchmarks
- Real-world client implementations, architectural data flow diagrams, technology matrices, and verified operational outcomes.

---

## Key Features

- **RAG-Based AI Chat Assistant**: Consultative B2B conversational assistant with Roman Urdu, Urdu, and English language support, live Google Gemini 1.5/2.0 Flash integration, local semantic knowledge fallback, and qualification-driven lead capture.
- **Autonomous Voice Bot**: Real-time voice interaction with Speech-to-Text (STT), natural Text-to-Speech (TTS), half-duplex turn-taking, and acoustic barge-in handling.
- **WhatsApp Lead Capture**: One-click direct communication routing with multi-turn context preservation and instant scoping confirmation.
- **Unified Email Dispatch**: Integrated dispatch handling inquiries from contact forms and conversational chatbot flows.
- **SSR & Static Pre-Rendering**: Hybrid architecture using an SSR entry (`src/entry-server.tsx`) and static pre-rendering script (`scripts/prerender.js`) to generate fully indexed static HTML files for all routes.
- **Full Crawlability & Machine Discovery**: Automatically generated `sitemap.xml`, `robots.txt`, and structured `llms.txt` / `llms-full.txt` manifests.
- **Security & Vulnerability Cleared**: Complete npm audit compliance with 0 vulnerabilities, documented in the in-repo `AUDIT_REPORT.md`.

---

## Tech Stack

| Category | Technology |
| :--- | :--- |
| **Frontend Framework** | React 18.2 (`react`, `react-dom`) |
| **Language** | TypeScript 5.3 (`typescript`) |
| **Bundler & Dev Server** | Vite 6.4.5 (`vite`, `@vitejs/plugin-react`) |
| **Client Routing** | React Router 7 (`react-router-dom`) |
| **Styling & Design System** | Tailwind CSS 3.4 (`tailwindcss`, `postcss`, `autoprefixer`) |
| **Animations & Transitions**| Framer Motion 11 (`framer-motion`), GSAP 3.12 (`gsap` + ScrollTrigger) |
| **Smooth Scrolling** | Lenis 1.0 (`lenis`) |
| **3D Canvas & Visuals** | Three.js 0.160 (`three`, `@react-three/fiber`, `@react-three/drei`) |
| **Icons** | Lucide React (`lucide-react`) |
| **SSR & Pre-Rendering** | React DOM Server (`renderToString`), Node.js Static SSG Generator |
| **Automated Testing** | Playwright 1.64 (`playwright`) |
| **Archive Packaging** | JSZip 3.10 (`jszip`) |

---

## Project Structure

```text
sheharyar-portfolio/
├── .env.example              # Environment variables template
├── AUDIT_REPORT.md           # Security audit and remediation report
├── api/                      # Serverless API endpoints
│   └── chat.js               # Conversational AI handler (Gemini / fallback)
├── dist/                     # Pre-rendered production build output
├── public/                   # Static assets, manifests, and root documents
│   ├── assets/               # Production icons, badges, and images
│   ├── favicon.svg           # Scalable SVG brand favicon
│   ├── llms.txt              # AI discovery markdown manifest
│   ├── llms-full.txt         # Comprehensive AI context manifest
│   ├── robots.txt            # Search engine crawler directives
│   └── sitemap.xml           # XML sitemap index
├── scripts/                  # Build, test, and utility scripts
│   ├── create-hostinger-zip.js # Packages dist/ into hostinger-public_html.zip
│   ├── generate-sitemap.js   # Generates XML sitemap across all routes
│   ├── prerender.js          # SSG pre-render generator
│   └── verify-routes.js      # Automated Playwright route verification
├── src/                      # Application source code
│   ├── components/           # UI components
│   │   ├── chat/             # AiChatbotWidget and lead capture modals
│   │   ├── layout/           # Navbar, Footer, ScrollToTop
│   │   ├── modals/           # DirectConnectModal, CaseStudyModal
│   │   ├── sections/         # Hero, Services, WordPressFoundation, etc.
│   │   ├── seo/              # SEOHead, Breadcrumbs, AeoDirectAnswer
│   │   └── visuals/          # VoiceWaveform, CustomCursor
│   ├── data/                 # Grounded catalogs and taxonomies
│   │   ├── agentKnowledge.ts # Shared bot knowledge base & tools catalog
│   │   ├── arcadeGameData.ts # Code Arcade tracks, levels, and test cases
│   │   ├── blogData.ts       # Engineering articles and tutorials
│   │   ├── portfolioData.ts  # Primary services, case studies, metrics
│   │   ├── taxonomyData.ts   # Sub-services and white-label portals
│   │   └── toolsData.ts      # 10 interactive developer tools taxonomy
│   ├── pages/                # Route page components
│   ├── utils/                # Utility engines (ragEngine, schemaGenerator)
│   ├── App.tsx               # Primary application component & route map
│   ├── entry-server.tsx      # SSR render entry point
│   ├── index.css             # Tailwind utilities and global styles
│   └── main.tsx              # Client hydration and DOM mount
├── index.html                # HTML entry template with fallback SEO
├── package.json              # Dependencies, overrides, and scripts
├── tailwind.config.js        # Custom Tailwind design tokens
├── tsconfig.json             # TypeScript compiler configuration
├── vercel.json               # Vercel deployment configuration
└── vite.config.ts            # Vite configuration with SSR & security plugins
```

---

## Getting Started

### Prerequisites
- **Node.js**: Version 20.x or higher
- **npm**: Version 10.x or higher

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Sheharyar-ans/sheharyar-portfolio.git
   cd sheharyar-portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. (Optional) Configure Environment Variables:
   Copy `.env.example` to `.env` to configure an optional Google Gemini API key:
   ```bash
   cp .env.example .env
   ```
   > *Note:* If no API key is provided, the platform automatically runs on its built-in local semantic RAG engine with zero configuration needed.

4. Start the local development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Vite local development server with Hot Module Replacement (HMR). |
| `npm run build` | Runs TypeScript type checking (`tsc`), compiles the client bundle, builds the SSR bundle (`src/entry-server.tsx`), executes `scripts/prerender.js` to pre-render static HTML for all routes, and generates `sitemap.xml`. |
| `npm run preview` | Locally previews the pre-rendered production build from the `dist/` directory. |
| `npm run test:routes` | Starts a preview server and executes headless Playwright browser tests across all routes to verify HTTP 200 status, H1 presence, and zero broken internal links. |
| `npm run build:zip` | Compiles the production build and packages the `dist/` folder into `hostinger-public_html.zip` with ready-to-use `.htaccess` routing rules. |

---

## Deployment

### Deploying to Vercel
The repository includes a production-ready `vercel.json` configuration file:
- **Framework**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Features**: Clean URLs, trailing slash normalization, immutable asset caching headers, and HTTP security headers (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`).

To deploy:
1. Push the code to GitHub.
2. Import the repository into your Vercel dashboard.
3. Vercel detects `vercel.json` automatically and deploys the pre-rendered static site.

### Deploying to Hostinger (or Standard Apache / cPanel Hosting)
1. Run the build and package script:
   ```bash
   npm run build
   npm run build:zip
   ```
2. Locate the generated `hostinger-public_html.zip` in the project root.
3. In your hosting control panel (e.g. Hostinger hPanel or cPanel File Manager), navigate to `public_html`.
4. Upload `hostinger-public_html.zip` and extract its contents directly into `public_html`.
5. The bundled `.htaccess` file handles clean URLs, static HTML routing, and security headers automatically.

---

## Search Engine & Generative Engine Optimization (SEO / GEO)

- **Comprehensive JSON-LD Schemas**: Dynamic schema graphs for `Organization`, `Person`, `WebSite`, `ProfessionalService`, `FAQPage`, and `BreadcrumbList`.
- **Pre-Rendered HTML**: Every route is compiled into a standalone `index.html` file with complete metadata, eliminating client-side rendering delays for search crawlers.
- **Core Web Vitals Optimized**: Critical CSS inlined, zero Cumulative Layout Shift (CLS), responsive image attributes with explicit dimensions, and modern WebP media.
- **AI Agent Discovery**: Machine-readable `llms.txt` and `llms-full.txt` files allow AI crawlers (ChatGPT, Perplexity, Google AI Overviews) to index services, credentials, and tools accurately.

---

## Security & Quality Assurance

- **Zero Vulnerabilities**: Validated via `npm audit` with explicit dependency overrides.
- **Automated Route Testing**: Validated via Playwright in `scripts/verify-routes.js` with 100% pass rates across all routes.
- **Audit Documentation**: Complete details on vulnerability remediation, dependency updates, and test results are recorded in [AUDIT_REPORT.md](file:///c:/Users/SG/OneDrive/Desktop/Sheharyar%20portfolio%20web/AUDIT_REPORT.md).

---

## Links

- **Live Platform**: [https://sheharyarsiraj.com/](https://sheharyarsiraj.com/)
- **GitHub Profile**: [https://github.com/Sheharyar-ans](https://github.com/Sheharyar-ans)
- **Repository**: [https://github.com/Sheharyar-ans/sheharyar-portfolio](https://github.com/Sheharyar-ans/sheharyar-portfolio)
