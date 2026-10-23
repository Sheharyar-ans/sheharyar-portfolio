import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingBag,
  Upload,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  FileText,
  Copy,
  Check,
  Zap,
  ShieldCheck,
  Database,
  ArrowUpRight,
  Layers,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Search,
  Code2,
  Sparkles,
  BarChart3
} from 'lucide-react';
import { SEOHead } from '../components/seo/SEOHead';
import { Breadcrumbs } from '../components/seo/Breadcrumbs';
import { AeoDirectAnswer } from '../components/seo/AeoDirectAnswer';
import { generateSchemaGraph } from '../utils/schemaGenerator';

interface WooCommerceSkuAuditorPageProps {
  onOpenInquiry: () => void;
}

interface ProductAuditItem {
  id: string;
  sku: string;
  name: string;
  category: string;
  metaTitle: string;
  metaDescription: string;
  imageAlt: string;
  attributes: string;
  issues: {
    type: 'critical' | 'warning' | 'info';
    code: 'DUPLICATE_SKU' | 'MISSING_SKU' | 'MISSING_META_TITLE' | 'SHORT_META_TITLE' | 'MISSING_ALT' | 'UNOPTIMIZED_ATTRIBUTE';
    message: string;
    fix: string;
  }[];
}

const SAMPLE_CATALOG_1: string = `SKU,Name,Category,MetaTitle,MetaDescription,ImageAlt,Attributes
TSHIRT-BLK-S,Classic Crewneck T-Shirt - Black S,Apparel,Classic Black Crewneck Cotton T-Shirt,Premium combed organic cotton crewneck tee in black.,Black crewneck t-shirt front view,pa_color: Black | pa_size: S
TSHIRT-BLK-S,Classic Crewneck T-Shirt - Black S (Duplicate),Apparel,,,,"pa_color: Black | Size: Small"
HOODIE-GRY-M,Heavyweight Fleece Hoodie - Grey M,Outerwear,,Cozy fleece hoodie for winter layering.,,pa_color: Grey | pa_size: M
JEANS-SLIM-32,Slim Fit Denim Jeans - Indigo 32,Pants,Slim Fit Indigo Denim Jeans - 32 Waist,Stretch denim with reinforced pockets.,Indigo slim denim pants front,CustomAttribute_Fit: Slim
SOCKS-WHT-3PK,Cushioned Athletic Socks (3-Pack),Accessories,Cushioned Athletic White Socks (3-Pack),Reinforced arch support crew socks.,White athletic socks 3 pack packaging,pa_color: White | pa_size: Standard
,Leather Bifold Wallet - Tan,Accessories,Tan Leather Bifold Wallet,Vegetable tanned leather with RFID blocking.,,Material: Genuine Leather
CAP-SNAP-NAVY,Structured Snapback Cap - Navy,Headwear,Structured Navy Snapback Hat Cap,Wool blend 6 panel snapback cap in navy.,,pa_color: Navy | Size: OSFA
BEANIE-RIB-BLK,Ribbed Knit Beanie - Charcoal,Headwear,Ribbed Charcoal Knit Winter Beanie,100% merino wool ribbed cuff winter beanie.,Charcoal ribbed knit beanie flat lay,pa_color: Charcoal`;

const SAMPLE_CATALOG_2: string = `SKU,Name,Category,MetaTitle,MetaDescription,ImageAlt,Attributes
USBC-CABLE-2M,Braided USB-C to USB-C Cable 2M,Cables,Braided USB-C Cable 2 Meter 100W PD,Supports 100W Power Delivery and 480Mbps data transfer.,Durable nylon braided USB-C cable 2m length,pa_length: 2m | pa_color: Space Grey
USBC-CABLE-2M,Braided USB-C to USB-C Cable 2M (Duplicate),Cables,Fast Charging USB-C Cord,,,Length: 2 Meters
GAN-CHARGER-65W,65W GaN Fast Wall Charger 3-Port,Chargers,,Ultra-compact GaN fast charger with dual USB-C ports.,GaN wall charger white 65 watt,pa_wattage: 65W
MAG-MOUNT-CAR,Magnetic Wireless Car Charger Mount,Mounts,MagSafe Magnetic Wireless Car Phone Mount,Qi certified 15W wireless charging air vent mount.,,pa_compatibility: MagSafe
AUDIO-DAC-PRO,Hi-Res USB-C Headphone DAC Adapter,Audio,,Lossless 32-bit 384kHz digital audio converter.,USB-C to 3.5mm headphone jack DAC dongle,pa_interface: USB-C
,Wireless Noise Cancelling Earbuds,Audio,Wireless ANC Earbuds with Spatial Audio,Active noise cancelling earbuds with 32 hour battery.,,Bluetooth: 5.3
DESK-PAD-LEATH,Premium Vegan Leather Desk Mat 90x40,Accessories,Large Vegan Leather Desk Pad 90x40cm,Water resistant desk blotter with anti-slip backing.,,pa_dimensions: 90x40cm | Color: Tan`;

export const WooCommerceSkuAuditorPage: React.FC<WooCommerceSkuAuditorPageProps> = ({ onOpenInquiry }) => {
  const [rawCsv, setRawCsv] = useState<string>(SAMPLE_CATALOG_1);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'critical' | 'warning' | 'clean'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedScript, setCopiedScript] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Parse CSV and audit products
  const auditResults = useMemo(() => {
    const lines = rawCsv.trim().split('\n').filter((l) => l.trim().length > 0);
    if (lines.length < 2) {
      return { items: [], metrics: { total: 0, critical: 0, warnings: 0, clean: 0, score: 100 } };
    }

    const headers = lines[0].split(',').map((h) => h.trim().toLowerCase());
    const skuIdx = headers.findIndex((h) => h.includes('sku'));
    const nameIdx = headers.findIndex((h) => h.includes('name') || h.includes('title'));
    const catIdx = headers.findIndex((h) => h.includes('category') || h.includes('cat'));
    const metaTitleIdx = headers.findIndex((h) => h.includes('metatitle') || h.includes('meta_title') || h.includes('seo_title'));
    const metaDescIdx = headers.findIndex((h) => h.includes('metadesc') || h.includes('meta_desc') || h.includes('description'));
    const altIdx = headers.findIndex((h) => h.includes('alt') || h.includes('imagealt'));
    const attrIdx = headers.findIndex((h) => h.includes('attribute') || h.includes('attr'));

    const parsedItems: ProductAuditItem[] = [];
    const skuFrequency: Record<string, number> = {};

    // First pass: collect SKU counts
    for (let i = 1; i < lines.length; i++) {
      const parts = lines[i].split(',').map((p) => p.trim());
      const sku = skuIdx >= 0 && parts[skuIdx] ? parts[skuIdx] : '';
      if (sku) {
        skuFrequency[sku] = (skuFrequency[sku] || 0) + 1;
      }
    }

    // Second pass: audit product metadata
    for (let i = 1; i < lines.length; i++) {
      const parts = lines[i].split(',').map((p) => p.trim());
      const sku = skuIdx >= 0 && parts[skuIdx] ? parts[skuIdx] : '';
      const name = nameIdx >= 0 && parts[nameIdx] ? parts[nameIdx] : `Product #${i}`;
      const category = catIdx >= 0 && parts[catIdx] ? parts[catIdx] : 'Uncategorized';
      const metaTitle = metaTitleIdx >= 0 && parts[metaTitleIdx] ? parts[metaTitleIdx] : '';
      const metaDesc = metaDescIdx >= 0 && parts[metaDescIdx] ? parts[metaDescIdx] : '';
      const imageAlt = altIdx >= 0 && parts[altIdx] ? parts[altIdx] : '';
      const attributes = attrIdx >= 0 && parts[attrIdx] ? parts[attrIdx] : '';

      const issues: ProductAuditItem['issues'] = [];

      // Check SKU
      if (!sku) {
        issues.push({
          type: 'critical',
          code: 'MISSING_SKU',
          message: 'Missing product SKU identification number.',
          fix: 'Assign unique alphanumeric SKU (e.g. CAT-PROD-01) to support inventory syncing and Google Shopping feed validation.'
        });
      } else if (skuFrequency[sku] > 1) {
        issues.push({
          type: 'critical',
          code: 'DUPLICATE_SKU',
          message: `Duplicate SKU "${sku}" detected across ${skuFrequency[sku]} catalog items.`,
          fix: 'Ensure each variant retains a unique SKU suffix to prevent WooCommerce order stock collision and Google Merchant Center disapproval.'
        });
      }

      // Check Meta Title
      if (!metaTitle) {
        issues.push({
          type: 'critical',
          code: 'MISSING_META_TITLE',
          message: 'Missing custom SEO meta title tag.',
          fix: 'Populate Yoast/RankMath meta title with primary keyword and brand modifier to avoid generic H1 fallback truncation.'
        });
      } else if (metaTitle.length < 30) {
        issues.push({
          type: 'warning',
          code: 'SHORT_META_TITLE',
          message: `Under-optimized meta title length (${metaTitle.length} chars). Underutilizes SERP display budget.`,
          fix: 'Expand title to 50-60 characters incorporating category, key attribute, and brand name.'
        });
      }

      // Check Image Alt Text
      if (!imageAlt) {
        issues.push({
          type: 'warning',
          code: 'MISSING_ALT',
          message: 'Primary featured product image missing alt text attribute.',
          fix: 'Add descriptive image alt text including product model and colorway to capture Google Image search traffic and satisfy WCAG guidelines.'
        });
      }

      // Check Attributes
      if (attributes && (attributes.includes('CustomAttribute') || attributes.includes('Size:') || attributes.includes('Length:') || attributes.includes('Material:'))) {
        issues.push({
          type: 'warning',
          code: 'UNOPTIMIZED_ATTRIBUTE',
          message: 'Product uses ad-hoc custom attribute strings instead of global taxonomy terms.',
          fix: 'Migrate to global WooCommerce taxonomy attributes (pa_size, pa_color) to enable Redis object cached faceted filtering.'
        });
      }

      parsedItems.push({
        id: `prod-${i}`,
        sku: sku || 'NO-SKU',
        name,
        category,
        metaTitle,
        metaDescription: metaDesc,
        imageAlt,
        attributes,
        issues
      });
    }

    // Tally metrics
    let criticalCount = 0;
    let warningCount = 0;
    let cleanCount = 0;

    for (const item of parsedItems) {
      const hasCritical = item.issues.some((iss) => iss.type === 'critical');
      const hasWarning = item.issues.some((iss) => iss.type === 'warning');
      if (hasCritical) {
        criticalCount++;
      } else if (hasWarning) {
        warningCount++;
      } else {
        cleanCount++;
      }
    }

    const total = parsedItems.length;
    // Calculate Health Score (100 base, -15 per critical%, -6 per warning%)
    const criticalPenalty = total > 0 ? (criticalCount / total) * 60 : 0;
    const warningPenalty = total > 0 ? (warningCount / total) * 30 : 0;
    const score = Math.max(10, Math.round(100 - criticalPenalty - warningPenalty));

    return {
      items: parsedItems,
      metrics: {
        total,
        critical: criticalCount,
        warnings: warningCount,
        clean: cleanCount,
        score
      }
    };
  }, [rawCsv]);

  // Filter items
  const filteredProducts = useMemo(() => {
    return auditResults.items.filter((item) => {
      const matchesSearch =
        searchQuery === '' ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (selectedFilter === 'all') return true;
      if (selectedFilter === 'critical') return item.issues.some((i) => i.type === 'critical');
      if (selectedFilter === 'warning') return item.issues.some((i) => i.type === 'warning') && !item.issues.some((i) => i.type === 'critical');
      if (selectedFilter === 'clean') return item.issues.length === 0;
      return true;
    });
  }, [auditResults.items, selectedFilter, searchQuery]);

  // Remediation PHP Snippet generator
  const generatedRemediationPhp = useMemo(() => {
    return `<?php
/**
 * Plugin Name: WooCommerce Catalog Metadata & SKU Auto-Remediator
 * Description: Automated database sanitization hooks for duplicate SKUs, missing image alt tags, and dynamic SEO titles.
 * Author: Sheharyar Siraj (Systems Architecture)
 * Version: 2.4.0
 */

if (!defined('ABSPATH')) {
    exit;
}

// 1. Auto-assign Fallback Image Alt Text from Product Title if missing
add_filter('wp_get_attachment_image_attributes', function($attr, $attachment, $size) {
    if (empty($attr['alt'])) {
        $post = get_post($attachment->ID);
        if ($post && $post->post_parent > 0) {
            $parent = get_post($post->post_parent);
            if ($parent && $parent->post_type === 'product') {
                $attr['alt'] = esc_attr(get_the_title($parent->ID) . ' - Official Product View');
            }
        }
    }
    return $attr;
}, 10, 3);

// 2. Prevent Duplicate SKU Collision in WooCommerce Admin & REST API
add_filter('wc_product_has_unique_sku', function($is_unique, $product_id, $sku) {
    global $wpdb;
    if (empty($sku)) {
        return false;
    }
    $query = $wpdb->prepare("
        SELECT post_id FROM {$wpdb->postmeta} 
        WHERE meta_key = '_sku' AND meta_value = %s AND post_id != %d 
        LIMIT 1
    ", $sku, $product_id);
    $existing = $wpdb->get_var($query);
    return empty($existing);
}, 10, 3);

// 3. Dynamic Yoast / RankMath Meta Title Fallback for Products with empty titles
add_filter('wpseo_title', function($title) {
    if (is_product() && (empty($title) || $title === get_bloginfo('name'))) {
        $product = wc_get_product(get_the_ID());
        if ($product) {
            $category = '';
            $terms = get_the_terms($product->get_id(), 'product_cat');
            if ($terms && !is_wp_error($terms)) {
                $category = ' - ' . $terms[0]->name;
            }
            return esc_html($product->get_name() . $category . ' | ' . get_bloginfo('name'));
        }
    }
    return $title;
});`;
  }, []);

  const copyScript = () => {
    navigator.clipboard.writeText(generatedRemediationPhp);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        if (text) {
          setRawCsv(text);
        }
      };
      reader.readAsText(file);
    }
  };

  const pageSchema = generateSchemaGraph('/tools/woocommerce-seo-sku-auditor');

  const faqs = [
    {
      question: 'How do duplicate SKUs and missing meta tags harm Google Shopping organic traffic?',
      answer:
        'Google Merchant Center feeds enforce strict identifier uniqueness. When WooCommerce feeds submit duplicate SKUs or products lacking unique identifiers, Google flags the feed for policy violations, resulting in instant SKU disapprovals and suppressed Free Product Listings. Furthermore, pages lacking custom meta titles receive auto-generated search snippet titles that fail to display product modifiers, significantly lowering organic click-through rates.'
    },
    {
      question: 'Why should WooCommerce stores convert custom product attributes into global taxonomies?',
      answer:
        'Custom product-level attributes are stored as serialized strings within the wp_postmeta table. Running faceted filters (such as filtering by Color or Size) across thousands of serialized attributes requires full table scans that bypass database indexes. Converting them into global taxonomies (pa_color, pa_size) stores terms in indexed wp_term_relationships tables, allowing Redis object caches to serve faceted queries in sub-25ms.'
    },
    {
      question: 'What is the performance impact of empty image alt tags on WooCommerce SEO?',
      answer:
        'Empty image alt text tags eliminate product images from appearing in Google Images, which accounts for up to 20% of high-intent e-commerce visual search discovery. Additionally, screen readers used by visually impaired consumers cannot interpret the product contents, creating compliance vulnerabilities under WCAG 2.1 accessibility regulations.'
    },
    {
      question: 'How does fixing catalog metadata reduce WordPress database bloat and TTFB latency?',
      answer:
        'Orphaned attributes, broken metadata entries, and incomplete product drafts create millions of unused postmeta rows in wp_postmeta and stale transient keys in wp_options. Cleaning and standardizing your catalog metadata structure reduces autoload weight, shrinks database table memory footprint, and drops server Time to First Byte (TTFB) response times across catalog category pages.'
    }
  ];

  return (
    <div className="pt-28 pb-20 px-4 sm:px-8 max-w-7xl mx-auto">
      <SEOHead
        title="WooCommerce SKU & SEO Health Auditor | Sheharyar"
        description="Audit WooCommerce catalogs for duplicate SKUs, missing SEO meta titles, empty image alt tags, and unoptimized product attributes. Download custom remediation PHP snippets."
        canonicalUrl="https://sheharyarsiraj.com/tools/woocommerce-seo-sku-auditor/"
        schema={pageSchema}
      />

      {/* Breadcrumb Navigation */}
      <Breadcrumbs
        items={[
          { label: 'Systems & Utility Tools', href: '/tools/' },
          { label: 'WooCommerce SKU & Metadata Auditor' }
        ]}
      />

      {/* Hero Header Section */}
      <div className="mt-8 mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-xs font-bold uppercase tracking-wider mb-4">
          <ShoppingBag size={14} />
          <span>WOOCOMMERCE CATALOG & TECHNICAL SEO UTILITY</span>
        </div>

        <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
          WooCommerce SKU &{' '}
          <span className="text-accent">Metadata Health Auditor</span>
        </h1>

        <p className="text-brand-secondary text-base sm:text-xl max-w-4xl leading-relaxed font-body">
          Rapid catalog health analyzer for high-traffic WooCommerce stores. Intercept duplicate SKUs, missing SEO meta titles, empty image alt tags, and serialized attribute bloat before they trigger Google Merchant Center disapprovals and organic ranking drops.
        </p>

        {/* Quick System Telemetry Bar */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl glass-panel border border-brand-border/60 bg-surface-1/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
              <BarChart3 size={18} />
            </div>
            <div>
              <div className="font-mono text-lg font-bold text-white">{auditResults.metrics.score}/100</div>
              <div className="text-[11px] font-mono text-brand-muted">Catalog Health Index</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-400/10 border border-red-400/20 flex items-center justify-center text-red-400">
              <XCircle size={18} />
            </div>
            <div>
              <div className="font-mono text-lg font-bold text-white">{auditResults.metrics.critical}</div>
              <div className="text-[11px] font-mono text-brand-muted">Critical Violations</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400">
              <AlertTriangle size={18} />
            </div>
            <div>
              <div className="font-mono text-lg font-bold text-white">{auditResults.metrics.warnings}</div>
              <div className="text-[11px] font-mono text-brand-muted">Catalog Warnings</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center text-emerald-400">
              <CheckCircle2 size={18} />
            </div>
            <div>
              <div className="font-mono text-lg font-bold text-white">{auditResults.metrics.clean}</div>
              <div className="text-[11px] font-mono text-brand-muted">Clean Products</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Interactive Tool Section */}
      <div className="my-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Data Input & Preset Selector */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-7 rounded-2xl glass-panel border border-brand-border bg-surface-1">
              <div className="flex items-center justify-between pb-4 border-b border-brand-border/60 mb-5">
                <div className="flex items-center gap-2 text-white font-mono text-sm font-bold">
                  <Upload size={16} className="text-accent" />
                  <span>CATALOG DATA INGESTION</span>
                </div>
                <span className="text-[10px] font-mono text-accent bg-accent/10 px-2 py-0.5 rounded border border-accent/20 font-bold">
                  CSV SCANNER
                </span>
              </div>

              {/* Quick Sample Catalog Loaders */}
              <div className="mb-6">
                <label className="block text-xs font-mono font-bold text-brand-secondary uppercase tracking-wider mb-2">
                  Load Pre-Built Store Catalog
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRawCsv(SAMPLE_CATALOG_1)}
                    className="p-2.5 rounded-xl text-xs font-mono bg-surface-2 hover:bg-surface-3 border border-brand-border/60 hover:border-accent/40 text-brand-secondary hover:text-white transition-all text-left flex items-center justify-between group"
                  >
                    <span>Apparel Store (8 SKUs)</span>
                    <RefreshCw size={12} className="text-accent group-hover:rotate-180 transition-transform" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setRawCsv(SAMPLE_CATALOG_2)}
                    className="p-2.5 rounded-xl text-xs font-mono bg-surface-2 hover:bg-surface-3 border border-brand-border/60 hover:border-accent/40 text-brand-secondary hover:text-white transition-all text-left flex items-center justify-between group"
                  >
                    <span>Electronics (7 SKUs)</span>
                    <RefreshCw size={12} className="text-accent group-hover:rotate-180 transition-transform" />
                  </button>
                </div>
              </div>

              {/* File Upload Zone */}
              <div className="mb-6">
                <label className="block text-xs font-mono font-bold text-brand-secondary uppercase tracking-wider mb-2">
                  Or Upload WooCommerce CSV Export
                </label>
                <label className="border-2 border-dashed border-brand-border hover:border-accent/50 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer bg-surface-2/40 hover:bg-surface-2/70 transition-all group">
                  <Upload size={24} className="text-brand-muted group-hover:text-accent mb-2 transition-colors" />
                  <span className="text-xs font-mono text-white font-bold mb-1">
                    Click to browse or drop CSV file
                  </span>
                  <span className="text-[11px] font-mono text-brand-muted">
                    Supports native WooCommerce Export CSV columns
                  </span>
                  <input
                    type="file"
                    accept=".csv,.txt"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Raw CSV Textarea Input */}
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="font-bold text-brand-secondary uppercase tracking-wider">
                    Raw CSV Data Stream
                  </span>
                  <span className="text-brand-muted">{auditResults.metrics.total} items parsed</span>
                </div>
                <textarea
                  value={rawCsv}
                  onChange={(e) => setRawCsv(e.target.value)}
                  rows={8}
                  className="w-full bg-surface-2 border border-brand-border rounded-xl p-3 text-xs font-mono text-white focus:outline-none focus:border-accent transition-colors leading-relaxed"
                  placeholder="Paste WooCommerce product CSV rows here..."
                />
              </div>
            </div>

            {/* Health Score Overview Panel */}
            <div className="p-6 rounded-2xl glass-panel border border-brand-border bg-surface-1">
              <div className="flex items-center justify-between mb-4">
                <div className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <ShieldCheck size={16} className="text-accent" />
                  <span>Audit Severity Breakdown</span>
                </div>
                <span className="text-xs font-mono text-brand-muted">
                  {auditResults.metrics.total} Total Products
                </span>
              </div>

              {/* Progress bar */}
              <div className="h-3 w-full bg-surface-3 rounded-full overflow-hidden flex mb-4">
                <div
                  style={{ width: `${(auditResults.metrics.clean / Math.max(1, auditResults.metrics.total)) * 100}%` }}
                  className="bg-emerald-400 transition-all"
                  title="Clean Products"
                />
                <div
                  style={{ width: `${(auditResults.metrics.warnings / Math.max(1, auditResults.metrics.total)) * 100}%` }}
                  className="bg-amber-400 transition-all"
                  title="Warnings"
                />
                <div
                  style={{ width: `${(auditResults.metrics.critical / Math.max(1, auditResults.metrics.total)) * 100}%` }}
                  className="bg-red-400 transition-all"
                  title="Critical Issues"
                />
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                <div className="p-2 rounded-xl bg-surface-2 border border-brand-border/60">
                  <div className="text-emerald-400 font-bold">{auditResults.metrics.clean}</div>
                  <div className="text-[10px] text-brand-muted">Clean (100%)</div>
                </div>
                <div className="p-2 rounded-xl bg-surface-2 border border-brand-border/60">
                  <div className="text-amber-400 font-bold">{auditResults.metrics.warnings}</div>
                  <div className="text-[10px] text-brand-muted">Warnings</div>
                </div>
                <div className="p-2 rounded-xl bg-surface-2 border border-brand-border/60">
                  <div className="text-red-400 font-bold">{auditResults.metrics.critical}</div>
                  <div className="text-[10px] text-brand-muted">Critical</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Product Findings & Remediation Code */}
          <div className="lg:col-span-7 space-y-6">
            {/* Filter Bar & Search */}
            <div className="p-4 rounded-2xl glass-panel border border-brand-border bg-surface-1 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
                {[
                  { id: 'all', label: `All (${auditResults.metrics.total})` },
                  { id: 'critical', label: `Critical (${auditResults.metrics.critical})` },
                  { id: 'warning', label: `Warnings (${auditResults.metrics.warnings})` },
                  { id: 'clean', label: `Clean (${auditResults.metrics.clean})` }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setSelectedFilter(tab.id as any)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-all whitespace-nowrap ${
                      selectedFilter === tab.id
                        ? 'bg-accent text-black font-bold shadow-[0_0_15px_rgba(183,255,60,0.3)]'
                        : 'text-brand-secondary hover:text-white bg-surface-2 border border-brand-border/60'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-48">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter by SKU or name..."
                  className="w-full bg-surface-2 border border-brand-border rounded-xl pl-8 pr-3 py-1.5 text-xs font-mono text-white focus:outline-none focus:border-accent"
                />
                <Search size={13} className="absolute left-2.5 top-2.5 text-brand-muted" />
              </div>
            </div>

            {/* Product Issue Cards List */}
            <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1">
              {filteredProducts.length === 0 ? (
                <div className="p-8 rounded-2xl glass-panel border border-brand-border bg-surface-1 text-center">
                  <CheckCircle2 size={32} className="text-emerald-400 mx-auto mb-2" />
                  <p className="text-sm font-mono text-white font-bold">No Products Matching Criteria</p>
                  <p className="text-xs text-brand-secondary mt-1">All audited products in this selection pass verification standards.</p>
                </div>
              ) : (
                filteredProducts.map((item) => {
                  const hasCritical = item.issues.some((i) => i.type === 'critical');
                  const hasWarning = item.issues.some((i) => i.type === 'warning');

                  return (
                    <div
                      key={item.id}
                      className={`p-4 sm:p-5 rounded-2xl glass-panel border transition-all ${
                        hasCritical
                          ? 'border-red-400/40 bg-red-950/10'
                          : hasWarning
                          ? 'border-amber-400/40 bg-amber-950/10'
                          : 'border-emerald-400/30 bg-emerald-950/10'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-brand-border/40">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-surface-2 border border-brand-border text-white">
                              SKU: {item.sku}
                            </span>
                            <span className="text-[11px] font-mono text-brand-muted">
                              {item.category}
                            </span>
                          </div>
                          <h3 className="font-heading text-sm font-bold text-white mt-1">
                            {item.name}
                          </h3>
                        </div>

                        <div>
                          {item.issues.length === 0 ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full border border-emerald-400/20">
                              <CheckCircle2 size={13} />
                              <span>CLEAN RECORD</span>
                            </span>
                          ) : hasCritical ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-red-400 bg-red-400/10 px-2.5 py-1 rounded-full border border-red-400/20">
                              <XCircle size={13} />
                              <span>{item.issues.length} ACTION REQUIRED</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20">
                              <AlertTriangle size={13} />
                              <span>{item.issues.length} WARNINGS</span>
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Issues Breakdown */}
                      {item.issues.length > 0 && (
                        <div className="mt-3 space-y-2">
                          {item.issues.map((iss, idx) => (
                            <div
                              key={idx}
                              className={`p-2.5 rounded-xl text-xs font-mono border ${
                                iss.type === 'critical'
                                  ? 'bg-red-500/10 border-red-500/20 text-red-300'
                                  : 'bg-amber-500/10 border-amber-500/20 text-amber-300'
                              }`}
                            >
                              <div className="font-bold flex items-center gap-1.5 mb-1">
                                {iss.type === 'critical' ? (
                                  <XCircle size={12} className="text-red-400 flex-shrink-0" />
                                ) : (
                                  <AlertTriangle size={12} className="text-amber-400 flex-shrink-0" />
                                )}
                                <span>{iss.message}</span>
                              </div>
                              <div className="text-[11px] text-brand-secondary pl-4">
                                <span className="text-brand-muted font-bold">Fix Protocol: </span>
                                {iss.fix}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Product Metadata Summary */}
                      <div className="mt-3 pt-2.5 border-t border-brand-border/30 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono text-brand-muted">
                        <div>
                          <span className="text-brand-secondary font-bold">SEO Title: </span>
                          <span className={item.metaTitle ? 'text-white' : 'text-red-400 italic'}>
                            {item.metaTitle || 'MISSING'}
                          </span>
                        </div>
                        <div>
                          <span className="text-brand-secondary font-bold">Image Alt: </span>
                          <span className={item.imageAlt ? 'text-white' : 'text-amber-400 italic'}>
                            {item.imageAlt || 'EMPTY'}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Auto-Remediation PHP Plugin Snippet Box */}
            <div className="p-6 rounded-2xl glass-panel border border-accent/30 bg-surface-1 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-brand-border/60">
                <div className="flex items-center gap-2 text-white font-mono text-sm font-bold">
                  <Code2 size={16} className="text-accent" />
                  <span>CUSTOM WOOCOMMERCE REMEDIATION PHP SCRIPT</span>
                </div>

                <button
                  type="button"
                  onClick={copyScript}
                  className="px-3 py-1 rounded-lg text-xs font-mono bg-accent text-black font-bold flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(183,255,60,0.3)] hover:bg-white"
                >
                  {copiedScript ? (
                    <>
                      <Check size={13} />
                      <span>COPIED CODE</span>
                    </>
                  ) : (
                    <>
                      <Copy size={13} />
                      <span>COPY PHP SCRIPT</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-xs text-brand-secondary font-body leading-relaxed">
                Drop this snippet into a custom mu-plugin (`wp-content/mu-plugins/wc-sku-remediator.php`) to automatically enforce unique SKU validations, fallback image alt attributes, and dynamic SEO title generation across your store.
              </p>

              <pre className="p-4 rounded-xl bg-black/70 border border-brand-border text-xs font-mono text-emerald-400 overflow-x-auto max-h-56 leading-relaxed">
                {generatedRemediationPhp}
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* AEO Direct Answer Block */}
      <AeoDirectAnswer
        summary="WooCommerce SKU duplication, missing SEO meta titles, empty image alt text tags, and unindexed custom attributes severely harm e-commerce stores by triggering Google Merchant Center feed disapprovals, degrading search rankings, and slowing down faceted category filtering. Standardizing catalog metadata with global taxonomies and database integrity hooks ensures clean Google Shopping indexation, eliminates search engine crawl waste, and accelerates server TTFB response speeds."
        keyTakeaways={[
          'Duplicate SKUs trigger immediate item disapproval in Google Merchant Center Free Listings feeds.',
          'Missing custom meta titles force search engines to display truncated fallback H1 tags, reducing organic CTR.',
          'Empty image alt text tags forfeit Google Images search traffic and violate accessibility standards.',
          'Converting serialized custom attributes to global taxonomies (pa_color) reduces database query latency by over 70%.'
        ]}
      />

      {/* Long-Form Technical Content: Catalog Metadata Optimization */}
      <div className="my-16 space-y-16">
        {/* Section 1 */}
        <section className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-xs font-bold uppercase tracking-wider">
            <Zap size={14} />
            <span>COMMERCIAL IMPACT</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            How Metadata Errors Cause Index Bloat and Suppress E-Commerce Revenue
          </h2>

          <div className="text-brand-secondary text-base sm:text-lg leading-relaxed font-body space-y-4">
            <p>
              In large-scale WooCommerce stores operating thousands of stock-keeping units, metadata defects compound silently across your entire technical architecture. When multi-variation products share duplicate SKUs, automated inventory sync pipelines, ERP bridges, and Google Merchant Center feeds interpret them as colliding product instances.
            </p>
            <p>
              Google Shopping algorithms mandate unique product identifiers to verify product authenticity, GTIN references, and pricing consistency. When identical SKUs appear across distinct product variants, Merchant Center issues account-level diagnostics warnings that suppress organic product surfaces.
            </p>
            <p>
              Simultaneously, missing SEO meta titles cause Google crawler spiders to manufacture titles dynamically from breadcrumb tags or raw product titles. These synthesized titles frequently omit primary purchasing modifiers like sizing, material, or model generation, directly degrading organic search click-through rates against optimized competitors.
            </p>
          </div>
        </section>

        {/* Section 2 */}
        <section className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-xs font-bold uppercase tracking-wider">
            <Database size={14} />
            <span>DATABASE ARCHITECTURE</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            The Danger of Serialized Attributes in wp_postmeta
          </h2>

          <div className="text-brand-secondary text-base sm:text-lg leading-relaxed font-body space-y-4">
            <p>
              WooCommerce provides two distinct methods for storing product attributes: global taxonomies and custom product attributes. Naive catalog imports frequently dump specifications into custom product attributes. In the WordPress database, these custom attributes are stored as serialized PHP strings in the single `_product_attributes` row inside `wp_postmeta`.
            </p>
            <p>
              When a shopper visits a category page and applies faceted filters (for instance, selecting Color: Navy and Size: M), MySQL cannot perform an indexed index seek on serialized text. The database engine is forced to execute an unindexed full table scan across millions of postmeta rows, causing severe CPU spikes and blowing out Time to First Byte (TTFB) latency.
            </p>
            <p>
              Migrating custom product attributes to registered global taxonomies (such as `pa_color` and `pa_size`) stores relationships inside indexed `wp_term_relationships` tables. This architectural transition unlocks native Redis object caching, enabling faceted filtering queries to resolve in sub-25ms even under holiday peak concurrency.
            </p>
          </div>
        </section>

        {/* 4 Core Pillars of Catalog Health */}
        <section className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-xs font-bold uppercase tracking-wider">
            <ShieldCheck size={14} />
            <span>AUDIT SPECIFICATION</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Four Core Standards for WooCommerce Catalog Hygiene
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="p-6 rounded-2xl glass-panel border border-brand-border bg-surface-1">
              <div className="flex items-center gap-2.5 text-accent font-mono text-sm font-bold mb-3">
                <ShoppingBag size={18} />
                <span>1. Enforce Unique Variant SKUs</span>
              </div>
              <p className="text-sm text-brand-secondary font-body leading-relaxed mb-3">
                Every child variation in WooCommerce must possess a dedicated, unique stock-keeping unit suffix.
              </p>
              <div className="p-3 rounded-xl bg-surface-2 border border-brand-border/60 text-xs font-mono text-brand-muted">
                Attach a database validation filter to block saving duplicate SKUs in the WordPress administration panel and REST API.
              </div>
            </div>

            <div className="p-6 rounded-2xl glass-panel border border-brand-border bg-surface-1">
              <div className="flex items-center gap-2.5 text-accent font-mono text-sm font-bold mb-3">
                <FileText size={18} />
                <span>2. Dynamic SEO Title Fallbacks</span>
              </div>
              <p className="text-sm text-brand-secondary font-body leading-relaxed mb-3">
                Products lacking custom Yoast or RankMath titles should never default to bare post names.
              </p>
              <div className="p-3 rounded-xl bg-surface-2 border border-brand-border/60 text-xs font-mono text-brand-muted">
                Deploy programmatic filters synthesizing title formulas containing product name, primary category, and store branding.
              </div>
            </div>

            <div className="p-6 rounded-2xl glass-panel border border-brand-border bg-surface-1">
              <div className="flex items-center gap-2.5 text-accent font-mono text-sm font-bold mb-3">
                <Layers size={18} />
                <span>3. Global Taxonomy Attribute Migration</span>
              </div>
              <p className="text-sm text-brand-secondary font-body leading-relaxed mb-3">
                Eliminate unindexed serialized attribute strings in wp_postmeta that throttle filter performance.
              </p>
              <div className="p-3 rounded-xl bg-surface-2 border border-brand-border/60 text-xs font-mono text-brand-muted">
                Run catalog migration scripts converting custom strings to indexed pa_* taxonomies with Redis caching.
              </div>
            </div>

            <div className="p-6 rounded-2xl glass-panel border border-brand-border bg-surface-1">
              <div className="flex items-center gap-2.5 text-accent font-mono text-sm font-bold mb-3">
                <CheckCircle2 size={18} />
                <span>4. Automated Image Alt Text Injection</span>
              </div>
              <p className="text-sm text-brand-secondary font-body leading-relaxed mb-3">
                Featured product images without alt tags miss Google Images visual search traffic.
              </p>
              <div className="p-3 rounded-xl bg-surface-2 border border-brand-border/60 text-xs font-mono text-brand-muted">
                Hook into wp_get_attachment_image_attributes to dynamically inject parent product titles as fallback alt attributes.
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Technical FAQ Accordion */}
      <div className="my-20">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles size={14} />
            <span>TECHNICAL SPECIFICATIONS & FREQUENTLY ASKED QUESTIONS</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            WooCommerce Catalog & Metadata Optimization FAQ
          </h2>
        </div>

        <div className="space-y-4 max-w-4xl mx-auto">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl glass-panel border border-brand-border bg-surface-1 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="font-heading text-base sm:text-lg font-bold text-white">
                    {faq.question}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-surface-2 border border-brand-border flex items-center justify-center flex-shrink-0 text-accent">
                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </button>
                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 text-brand-secondary font-body text-sm sm:text-base leading-relaxed border-t border-brand-border/40 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Conversion Banner */}
      <div className="p-8 sm:p-12 rounded-3xl glass-panel border border-accent/30 bg-gradient-to-r from-accent/10 via-surface-2 to-surface-1 text-center max-w-5xl mx-auto my-12">
        <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
          Fix Store Infrastructure with a Custom Plugin
        </h2>
        <p className="text-brand-secondary text-base sm:text-lg max-w-2xl mx-auto mb-8 font-body">
          Connect directly with Sheharyar Siraj. We engineer custom WooCommerce remediation plugins, automate Google Merchant Center feed pipelines, and optimize high-concurrency database queries.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            type="button"
            onClick={onOpenInquiry}
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-mono text-sm font-bold tracking-wider bg-accent text-black hover:bg-white transition-all flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(183,255,60,0.4)] active:scale-95"
          >
            <Zap size={18} />
            <span>REQUEST SYSTEM REMEDIATION</span>
          </button>

          <Link
            to="/tools/wordpress-database-bloat-estimator/"
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-mono text-sm font-bold tracking-wider bg-surface-2 hover:bg-surface-3 border border-brand-border text-white transition-all flex items-center justify-center gap-2"
          >
            <span>DATABASE BLOAT ESTIMATOR</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WooCommerceSkuAuditorPage;
