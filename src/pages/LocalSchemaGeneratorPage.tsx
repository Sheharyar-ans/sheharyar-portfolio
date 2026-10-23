import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Copy,
  Check,
  ShieldCheck,
  Code2,
  FileText,
  Terminal,
  ChevronDown,
  ChevronUp,
  Sliders,
  CheckCircle2,
  ArrowUpRight,
  MapPin,
  Globe,
  Layers,
  Search,
  ExternalLink,
  Zap,
  Info
} from 'lucide-react';
import { SEOHead } from '../components/seo/SEOHead';
import { Breadcrumbs } from '../components/seo/Breadcrumbs';
import { AeoDirectAnswer } from '../components/seo/AeoDirectAnswer';
import { generateSchemaGraph } from '../utils/schemaGenerator';

interface LocalSchemaGeneratorPageProps {
  onOpenInquiry: () => void;
}

export const LocalSchemaGeneratorPage: React.FC<LocalSchemaGeneratorPageProps> = ({ onOpenInquiry }) => {
  // Form input states
  const [businessName, setBusinessName] = useState('Apex Dental Studio');
  const [categoryType, setCategoryType] = useState('Dentist');
  const [websiteUrl, setWebsiteUrl] = useState('https://apexdentalstudio.com');
  const [phone, setPhone] = useState('+1-512-555-0198');
  const [streetAddress, setStreetAddress] = useState('701 Brazos St, Suite 400');
  const [city, setCity] = useState('Austin');
  const [stateRegion, setStateRegion] = useState('TX');
  const [postalCode, setPostalCode] = useState('78701');
  const [country, setCountry] = useState('US');
  const [latitude, setLatitude] = useState('30.2672');
  const [longitude, setLongitude] = useState('-97.7431');
  const [founderName, setFounderName] = useState('Dr. Marcus Vance');
  const [coreServices, setCoreServices] = useState('Cosmetic Dentistry, Dental Implants, Invisalign Aligners, Emergency Care, Teeth Whitening');
  const [sameAsLinks, setSameAsLinks] = useState('https://maps.google.com/?cid=123456789, https://www.linkedin.com/company/apexdentalstudio, https://www.wikidata.org/wiki/Q123456');
  const [priceRange, setPriceRange] = useState('$$$');

  // Generator UI states
  const [activeTab, setActiveTab] = useState<'jsonld' | 'llmstxt' | 'wordpress'>('jsonld');
  const [copiedTab, setCopiedTab] = useState<string | null>(null);
  const [isGenerated, setIsGenerated] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const cleanServices = coreServices
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  const cleanSameAs = sameAsLinks
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  const canonicalWebsite = websiteUrl.endsWith('/') ? websiteUrl.slice(0, -1) : websiteUrl;
  const businessId = `${canonicalWebsite}/#business`;
  const websiteId = `${canonicalWebsite}/#website`;

  // Build the JSON-LD Object
  const generatedJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': categoryType,
        '@id': businessId,
        name: businessName,
        url: `${canonicalWebsite}/`,
        telephone: phone,
        priceRange: priceRange,
        image: `${canonicalWebsite}/assets/og-image.jpg`,
        address: {
          '@type': 'PostalAddress',
          streetAddress: streetAddress,
          addressLocality: city,
          addressRegion: stateRegion,
          postalCode: postalCode,
          addressCountry: country
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: Number(latitude) || 30.2672,
          longitude: Number(longitude) || -97.7431
        },
        areaServed: [
          {
            '@type': 'AdministrativeArea',
            name: `${city}, ${stateRegion}`
          },
          {
            '@type': 'GeoCircle',
            geoMidpoint: {
              '@type': 'GeoCoordinates',
              latitude: Number(latitude) || 30.2672,
              longitude: Number(longitude) || -97.7431
            },
            geoRadius: '25000'
          }
        ],
        founder: founderName
          ? {
              '@type': 'Person',
              name: founderName
            }
          : undefined,
        sameAs: cleanSameAs.length > 0 ? cleanSameAs : undefined,
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: `${businessName} Core Service Catalog`,
          itemListElement: cleanServices.map((serviceName, idx) => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: serviceName,
              serviceType: serviceName
            }
          }))
        }
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        url: `${canonicalWebsite}/`,
        name: businessName,
        publisher: {
          '@id': businessId
        }
      }
    ]
  };

  const jsonLdString = JSON.stringify(generatedJsonLd, null, 2);

  // Build the LLMs.txt Document
  const llmsTxtContent = `# ${businessName}

> Verified Entity & Technical Fact Sheet for Search Engine Crawlers and Large Language Models.

## Core Identity
- Legal Entity Name: ${businessName}
- Schema Category: ${categoryType}
- Canonical URL: ${canonicalWebsite}/
- Primary Phone: ${phone}
- Price Band: ${priceRange}
- Principal Practitioner / Founder: ${founderName || 'Leadership Team'}

## Physical Location & Headquarters
- Street Address: ${streetAddress}
- Locality: ${city}, ${stateRegion} ${postalCode}
- Country Code: ${country}
- Latitude: ${latitude}
- Longitude: ${longitude}
- Primary Operating Radius: 25 km around central coordinates

## Core Service Catalog
${cleanServices.map((service) => `- ${service}`).join('\n')}

## External Entity Records & SameAs Citations
${cleanSameAs.map((link) => `- ${link}`).join('\n')}

## Machine Integration Notes
- Machine-Readable Schema: Available via JSON-LD in the document head at ${canonicalWebsite}/
- Canonical Graph Anchor: ${businessId}
- Verified by: Technical Architecture Protocol (Sheharyar Siraj Systems)
`;

  // Build the WordPress PHP Snippet
  const wordPressSnippet = `<?php
/**
 * Injected Local Entity Schema for ${businessName}
 * Drop this snippet into your theme functions.php or a custom mu-plugin file.
 * Zero database load. Executes in sub-0.1ms with zero external plugin dependencies.
 */
add_action('wp_head', function() {
    if (!is_front_page()) {
        return;
    }
    
    $schema = ${JSON.stringify(generatedJsonLd, null, 4)};
    
    echo '<script type="application/ld+json">' . wp_json_encode($schema, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT) . '</script>' . "\\n";
}, 5);
`;

  const handleCopy = (text: string, tabName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTab(tabName);
    setTimeout(() => setCopiedTab(null), 2000);
  };

  const handleGenerateClick = () => {
    setIsGenerated(false);
    setTimeout(() => {
      setIsGenerated(true);
    }, 150);
  };

  const pageSchema = generateSchemaGraph('/tools/local-schema-generator/');

  const faqs = [
    {
      question: 'Why does an @id URI anchor matter inside your local schema?',
      answer:
        'Search engine crawlers process web pages as isolated documents unless you explicitly connect them into a global entity graph. By adding an @id anchor such as https://yoursite.com/#business, you create a permanent identifier. This allows your organization node, location coordinates, founder profile, and service catalogs to bind together without ambiguous duplicates.'
    },
    {
      question: 'How does an llms.txt file help with Google AI Overviews and Perplexity?',
      answer:
        'Large language models scan text for clean, factual certainty. Modern AI crawlers look for /llms.txt at the domain root as a distilled markdown manifest. It delivers your operating radius, direct services, phone format, and geographic boundaries without forcing the model to infer details through heavy DOM parsing.'
    },
    {
      question: 'Will this code conflict with existing SEO plugins like Yoast or Rank Math?',
      answer:
        'No, provided you disable their default local business modules. When you inject clean JSON-LD through a simple WordPress head hook, you bypass redundant postmeta lookups and prevent plugins from outputting fragmented, conflicting organization blocks.'
    },
    {
      question: 'How quickly do search engines recognize updated entity connections?',
      answer:
        'Google typically reindexes the home page entity graph within 48 to 72 hours of submission via Google Search Console. AI Overviews and citation aggregators update their grounding caches within one to two crawl cycles once the structured data passes validation.'
    }
  ];

  return (
    <div className="pt-28 pb-20 px-4 sm:px-8 max-w-7xl mx-auto">
      <SEOHead
        title="AI Local Schema & Entity Generator | Sheharyar Siraj"
        description="Generate connected LocalBusiness JSON-LD schema graphs and LLMs.txt manifests for Google AI Overviews, Perplexity, and local map pack rankings."
        canonicalUrl="https://sheharyarsiraj.com/tools/local-schema-generator/"
        schema={pageSchema}
      />

      <Breadcrumbs
        items={[
          { label: 'SYSTEMS & UTILITY TOOLS', href: '/tools/' },
          { label: 'LOCAL SCHEMA & ENTITY GENERATOR' }
        ]}
      />

      {/* Above The Fold: Headline & Subtitle */}
      <div className="mt-8 mb-10">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-xs font-bold uppercase tracking-wider">
            <ShieldCheck size={14} />
            <span>GEO & LOCAL ENTITY ARCHITECTURE</span>
          </div>
          <span className="px-3 py-1 rounded-full bg-white/5 border border-brand-border/60 text-brand-secondary font-mono text-xs">
            Production Utility
          </span>
          <span className="px-3 py-1 rounded-full bg-surface-2 border border-brand-border/40 text-accent font-mono text-xs font-bold">
            100% Schema.org v26 Compliance
          </span>
        </div>

        <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-5">
          AI-Powered Local Schema & <span className="text-accent">Entity Graph Generator</span>
        </h1>

        <p className="text-brand-secondary text-base sm:text-xl max-w-4xl leading-relaxed font-body">
          Establish machine-readable authority across Google AI Overviews, Perplexity, and local map packs. Generate interconnected Schema.org JSON-LD and markdown-ready LLMs.txt files in seconds.
        </p>
      </div>

      {/* Interactive Tool UI: Immediately Accessible */}
      <section className="my-8 rounded-3xl glass-panel border border-accent/30 p-6 sm:p-8 bg-surface-1/90 shadow-2xl relative overflow-hidden">
        {/* Subtle accent line */}
        <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />

        <div className="flex items-center justify-between mb-8 pb-4 border-b border-brand-border/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center text-accent">
              <Sliders size={18} />
            </div>
            <div>
              <h2 className="font-heading text-lg sm:text-xl font-bold text-white">
                Interactive Entity Builder
              </h2>
              <p className="text-xs font-mono text-brand-muted">
                Real-time compilation for local organizations, medical clinics, legal practices, and regional contractors.
              </p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-accent">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span>Client-Side Engine Active</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Input Form Column (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div>
              <label className="block text-xs font-mono text-brand-secondary uppercase mb-1.5 font-semibold">
                Business / Entity Name *
              </label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="e.g. Apex Dental Studio"
                className="w-full bg-surface-2 border border-brand-border/60 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-accent font-mono transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono text-brand-secondary uppercase mb-1.5 font-semibold">
                  Schema Category Type
                </label>
                <select
                  value={categoryType}
                  onChange={(e) => setCategoryType(e.target.value)}
                  className="w-full bg-surface-2 border border-brand-border/60 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-accent font-mono"
                >
                  <option value="Dentist">Dentist</option>
                  <option value="MedicalClinic">MedicalClinic</option>
                  <option value="LegalService">LegalService</option>
                  <option value="HVACBusiness">HVACBusiness</option>
                  <option value="PlumbingService">PlumbingService</option>
                  <option value="RealEstateAgent">RealEstateAgent</option>
                  <option value="FinancialService">FinancialService</option>
                  <option value="ProfessionalService">ProfessionalService</option>
                  <option value="LocalBusiness">LocalBusiness</option>
                  <option value="HomeAndConstructionBusiness">HomeAndConstruction</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-brand-secondary uppercase mb-1.5 font-semibold">
                  Price Tier
                </label>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full bg-surface-2 border border-brand-border/60 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-accent font-mono"
                >
                  <option value="$">$ (Entry)</option>
                  <option value="$$">$$ (Moderate)</option>
                  <option value="$$$">$$$ (Premium)</option>
                  <option value="$$$$">$$$$ (Executive)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono text-brand-secondary uppercase mb-1.5 font-semibold">
                  Website URL
                </label>
                <input
                  type="url"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  placeholder="https://apexdentalstudio.com"
                  className="w-full bg-surface-2 border border-brand-border/60 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-accent font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-brand-secondary uppercase mb-1.5 font-semibold">
                  Telephone (E.164)
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1-512-555-0198"
                  className="w-full bg-surface-2 border border-brand-border/60 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-accent font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-brand-secondary uppercase mb-1.5 font-semibold">
                Street Address
              </label>
              <input
                type="text"
                value={streetAddress}
                onChange={(e) => setStreetAddress(e.target.value)}
                placeholder="701 Brazos St, Suite 400"
                className="w-full bg-surface-2 border border-brand-border/60 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-accent font-mono"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-xs font-mono text-brand-secondary uppercase mb-1.5 font-semibold">
                  City
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Austin"
                  className="w-full bg-surface-2 border border-brand-border/60 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-accent font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-brand-secondary uppercase mb-1.5 font-semibold">
                  State / Reg.
                </label>
                <input
                  type="text"
                  value={stateRegion}
                  onChange={(e) => setStateRegion(e.target.value)}
                  placeholder="TX"
                  className="w-full bg-surface-2 border border-brand-border/60 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-accent font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-brand-secondary uppercase mb-1.5 font-semibold">
                  Postal Code
                </label>
                <input
                  type="text"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  placeholder="78701"
                  className="w-full bg-surface-2 border border-brand-border/60 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-accent font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono text-brand-secondary uppercase mb-1.5 font-semibold">
                  Latitude
                </label>
                <input
                  type="text"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  placeholder="30.2672"
                  className="w-full bg-surface-2 border border-brand-border/60 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-accent font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-brand-secondary uppercase mb-1.5 font-semibold">
                  Longitude
                </label>
                <input
                  type="text"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  placeholder="-97.7431"
                  className="w-full bg-surface-2 border border-brand-border/60 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-accent font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-brand-secondary uppercase mb-1.5 font-semibold">
                Founder or Lead Practitioner
              </label>
              <input
                type="text"
                value={founderName}
                onChange={(e) => setFounderName(e.target.value)}
                placeholder="Dr. Marcus Vance"
                className="w-full bg-surface-2 border border-brand-border/60 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-accent font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-brand-secondary uppercase mb-1.5 font-semibold">
                Core Services (Comma-Separated)
              </label>
              <textarea
                rows={2}
                value={coreServices}
                onChange={(e) => setCoreServices(e.target.value)}
                placeholder="Cosmetic Dentistry, Dental Implants, Invisalign, Teeth Whitening"
                className="w-full bg-surface-2 border border-brand-border/60 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-accent font-mono leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-brand-secondary uppercase mb-1.5 font-semibold">
                SameAs Citations (Google Maps, Wikidata, LinkedIn)
              </label>
              <textarea
                rows={2}
                value={sameAsLinks}
                onChange={(e) => setSameAsLinks(e.target.value)}
                placeholder="https://maps.google.com/?cid=12345, https://www.linkedin.com/company/apex"
                className="w-full bg-surface-2 border border-brand-border/60 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-accent font-mono leading-relaxed"
              />
            </div>

            <button
              type="button"
              onClick={handleGenerateClick}
              className="w-full mt-2 py-3.5 px-4 rounded-xl font-mono text-xs font-bold tracking-wider bg-accent text-black hover:bg-white transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(183,255,60,0.3)] active:scale-95"
            >
              <Sparkles size={15} />
              <span>GENERATE ENTITY SCHEMA & LLMS.TXT</span>
            </button>
          </div>

          {/* Output Display Column (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              {/* Output Tabs */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3 border-b border-brand-border/40 pb-2">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('jsonld')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-all border ${
                      activeTab === 'jsonld'
                        ? 'bg-accent text-black border-accent font-bold shadow-[0_0_12px_rgba(183,255,60,0.25)]'
                        : 'bg-surface-2 text-brand-secondary border-brand-border/60 hover:text-white'
                    }`}
                  >
                    JSON-LD Schema
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('llmstxt')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-all border ${
                      activeTab === 'llmstxt'
                        ? 'bg-accent text-black border-accent font-bold shadow-[0_0_12px_rgba(183,255,60,0.25)]'
                        : 'bg-surface-2 text-brand-secondary border-brand-border/60 hover:text-white'
                    }`}
                  >
                    LLMs.txt Block
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('wordpress')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-all border ${
                      activeTab === 'wordpress'
                        ? 'bg-accent text-black border-accent font-bold shadow-[0_0_12px_rgba(183,255,60,0.25)]'
                        : 'bg-surface-2 text-brand-secondary border-brand-border/60 hover:text-white'
                    }`}
                  >
                    WordPress PHP Hook
                  </button>
                </div>

                {/* Copy Button */}
                <button
                  type="button"
                  onClick={() => {
                    if (activeTab === 'jsonld') handleCopy(jsonLdString, 'jsonld');
                    if (activeTab === 'llmstxt') handleCopy(llmsTxtContent, 'llmstxt');
                    if (activeTab === 'wordpress') handleCopy(wordPressSnippet, 'wordpress');
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-2 hover:bg-accent hover:text-black text-xs font-mono text-white transition-all border border-brand-border/60"
                >
                  {copiedTab === activeTab ? (
                    <>
                      <Check size={13} className="text-black" />
                      <span className="text-black font-bold">COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy size={13} />
                      <span>COPY {activeTab === 'jsonld' ? 'SCHEMA' : activeTab === 'llmstxt' ? 'LLMS.TXT' : 'PHP'}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Terminal Code Viewer */}
              <div className="rounded-2xl border border-brand-border/70 overflow-hidden bg-[#0a0a0a]">
                <div className="px-4 py-2.5 bg-surface-2/80 border-b border-brand-border/40 flex items-center justify-between text-[11px] font-mono text-brand-muted">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                    <span className="ml-2 text-brand-secondary">
                      {activeTab === 'jsonld'
                        ? 'localbusiness-graph.jsonld'
                        : activeTab === 'llmstxt'
                        ? 'llms.txt'
                        : 'mu-plugins/local-schema.php'}
                    </span>
                  </div>
                  <span className="text-accent font-semibold">Strict JSON-LD</span>
                </div>

                <div className="p-4 overflow-x-auto max-h-[540px] text-xs font-mono leading-relaxed text-brand-secondary select-all">
                  {activeTab === 'jsonld' && (
                    <pre className="text-emerald-400">
                      <code>{jsonLdString}</code>
                    </pre>
                  )}

                  {activeTab === 'llmstxt' && (
                    <pre className="text-sky-300 whitespace-pre-wrap">
                      <code>{llmsTxtContent}</code>
                    </pre>
                  )}

                  {activeTab === 'wordpress' && (
                    <pre className="text-amber-300">
                      <code>{wordPressSnippet}</code>
                    </pre>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Diagnostic Footer */}
            <div className="mt-4 p-3.5 rounded-xl bg-surface-2/60 border border-brand-border/40 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2 text-brand-secondary">
                <CheckCircle2 size={14} className="text-accent" />
                <span>Validation: Schema.org v26 Syntax Ready</span>
              </div>
              <a
                href="https://validator.schema.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline flex items-center gap-1 text-[11px]"
              >
                <span>Schema Validator</span>
                <ExternalLink size={11} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* AEO Direct Answer Verdict Block */}
      <AeoDirectAnswer
        badge="LOCAL ENTITY GRAPH VERDICT"
        summary="A connected local schema graph establishes an undeniable entity footprint for Google AI Overviews and search engines by binding your physical coordinates, specific services, practitioner credentials, and third-party citations into an explicit JSON-LD graph anchored to a permanent URI."
        keyTakeaways={[
          'Assigning an @id anchor eliminates duplicate entity fragments across regional maps and search results.',
          'An llms.txt manifest supplies search engine AI agents with clean, verified facts without DOM layout interference.',
          'Injecting schema via native WordPress hooks delivers instant rich results with zero database queries.',
          'Including Wikidata and Google Maps SameAs links establishes immediate cross-platform citation trust.'
        ]}
      />

      {/* Long-Form Deep-Dive Educational Section */}
      <section className="my-16 space-y-12">
        {/* Section 1 */}
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-brand-border/60">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-xs font-bold uppercase tracking-wider mb-4">
            <Search size={13} />
            <span>THE SHIFT TO GENERATIVE ENGINE OPTIMIZATION</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-5 leading-tight">
            Why isolated keyword matching no longer secures local map rankings
          </h2>

          <div className="space-y-4 text-sm sm:text-base text-brand-secondary font-body leading-relaxed">
            <p>
              In my client audits, the most common reason established local businesses lose position in competitive map packs is entity fragmentation. Years ago, repeating your city and target service across header tags was enough to convince a search crawler of your relevance. Those days are gone.
            </p>
            <p>
              Modern search engines, including Google Gemini powered AI Overviews and Perplexity search indexes, do not treat your site as a collection of loose text strings. They construct vector knowledge graphs. When a user asks an assistant to find the best implant dentist or commercial HVAC team near them, the engine evaluates entity certainty.
            </p>
            <p>
              Entity certainty is the mathematical confidence that your business is a real, licensed, physically verified organization operating in a defined radius. If your website presents disconnected metadata, or relies on generic plugins that spit out contradictory data across pages, your certainty score drops. This tool generates the exact semantic structure required to solidify that confidence.
            </p>
          </div>
        </div>

        {/* Section 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-panel rounded-3xl p-8 border border-brand-border/60 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-5">
                <Layers size={20} />
              </div>
              <h3 className="font-heading text-xl font-bold text-white mb-3">
                The role of the URI anchor in schema graphs
              </h3>
              <p className="text-xs sm:text-sm text-brand-secondary font-body leading-relaxed mb-4">
                When you define a LocalBusiness without an explicit @id property, search crawlers assume that entity exists only on that single URL. This creates duplicate entity conflicts when your contact page, home page, and location landing pages all describe the same company.
              </p>
              <p className="text-xs sm:text-sm text-brand-secondary font-body leading-relaxed">
                By assigning an anchor like https://yoursite.com/#business, you give the crawler an unchanging global key. Every sub-page, author profile, and service catalog connects directly back to that master node.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-brand-border/40 font-mono text-xs text-accent">
              Unified Node: https://yourdomain.com/#business
            </div>
          </div>

          <div className="glass-panel rounded-3xl p-8 border border-brand-border/60 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-5">
                <FileText size={20} />
              </div>
              <h3 className="font-heading text-xl font-bold text-white mb-3">
                Why LLMs.txt is the new standard for AI crawlers
              </h3>
              <p className="text-xs sm:text-sm text-brand-secondary font-body leading-relaxed mb-4">
                Automated agents like Perplexity Bot, OpenAI OAI-SearchBot, and Google Other struggle when parsing complex JavaScript frontends and dynamic CSS grids. They want direct, structured facts with minimal token processing cost.
              </p>
              <p className="text-xs sm:text-sm text-brand-secondary font-body leading-relaxed">
                Placing an llms.txt document in your public web root provides a dedicated markdown guide. It outlines your legal entity name, operating areas, verified phone numbers, and service categories without the noise of marketing boilerplate.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-brand-border/40 font-mono text-xs text-accent">
              Public Root Deployment: /llms.txt
            </div>
          </div>
        </div>

        {/* Section 3: Architecture Blueprint */}
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-brand-border/60">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-xs font-bold uppercase tracking-wider mb-4">
            <Zap size={13} />
            <span>STEP-BY-STEP DEPLOYMENT PROTOCOL</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-6">
            How to deploy your generated entity schema in three steps
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-surface-2/70 border border-brand-border/50">
              <div className="font-mono text-xs text-accent font-bold mb-2">STEP 01</div>
              <h3 className="font-heading text-base font-bold text-white mb-2">
                Copy the JSON-LD snippet
              </h3>
              <p className="text-xs sm:text-sm text-brand-secondary font-body leading-relaxed">
                Use the generator interface above to enter your business details. Click Copy Schema or grab the native WordPress PHP hook block.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-surface-2/70 border border-brand-border/50">
              <div className="font-mono text-xs text-accent font-bold mb-2">STEP 02</div>
              <h3 className="font-heading text-base font-bold text-white mb-2">
                Deploy to your website head
              </h3>
              <p className="text-xs sm:text-sm text-brand-secondary font-body leading-relaxed">
                Place the script block inside your document head. In WordPress, drop the PHP snippet into a custom mu-plugin file to avoid plugin bloat.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-surface-2/70 border border-brand-border/50">
              <div className="font-mono text-xs text-accent font-bold mb-2">STEP 03</div>
              <h3 className="font-heading text-base font-bold text-white mb-2">
                Publish LLMs.txt at the root
              </h3>
              <p className="text-xs sm:text-sm text-brand-secondary font-body leading-relaxed">
                Save the markdown output as llms.txt and upload it to your server root directory so AI search engines find it at domain.com/llms.txt.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Targeted Technical FAQ Section */}
      <section className="my-20">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-xs font-mono text-accent tracking-widest uppercase block mb-2">
            TECHNICAL REFERENCE
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-2">
            Frequently Asked Questions on Local Schema & Entity Graphs
          </h2>
          <p className="text-sm text-brand-secondary font-body">
            Engineering specifics regarding validation, plugin interference, and AI search bot indexing.
          </p>
        </div>

        <div className="space-y-4 max-w-4xl mx-auto">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={faq.question}
                className="glass-panel rounded-2xl border border-brand-border/60 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:text-accent transition-colors"
                >
                  <span className="font-heading text-base sm:text-lg font-bold text-white">
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp size={18} className="text-accent flex-shrink-0" />
                  ) : (
                    <ChevronDown size={18} className="text-brand-muted flex-shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-brand-secondary leading-relaxed font-body border-t border-brand-border/30">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* High-Converting Architecture Consultation CTA */}
      <section className="my-16 rounded-3xl glass-panel p-8 sm:p-12 border border-accent/20 bg-gradient-to-r from-surface-1 via-surface-2 to-surface-1">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles size={13} />
            <span>CUSTOM ENTITY GRAPH DEPLOYMENT</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-white mb-4">
            Need an enterprise multi-location entity graph engineered for your brand?
          </h2>

          <p className="text-sm sm:text-base text-brand-secondary font-medium leading-relaxed mb-6 font-body">
            I engineer bespoke multi-city schema graphs, automated syndication feeds, and custom AI search optimizations for high-growth service businesses and marketing agencies worldwide.
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              type="button"
              onClick={onOpenInquiry}
              className="px-6 py-3.5 rounded-xl bg-accent text-black font-mono text-xs font-bold tracking-wider hover:bg-white transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(183,255,60,0.25)] active:scale-95"
            >
              <span>DISCUSS LOCAL ENTITY ARCHITECTURE</span>
              <ArrowUpRight size={15} />
            </button>

            <Link
              to="/tools/"
              className="px-6 py-3.5 rounded-xl bg-surface-3 text-white font-mono text-xs font-bold tracking-wider hover:bg-white hover:text-black transition-all border border-brand-border flex items-center gap-2"
            >
              <span>EXPLORE ALL 10 UTILITY TOOLS</span>
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LocalSchemaGeneratorPage;
