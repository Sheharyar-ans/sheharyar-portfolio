import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Code2,
  Sliders,
  Copy,
  Check,
  ShieldCheck,
  Plus,
  Trash2,
  FileCode,
  Terminal,
  Layers,
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  Cpu,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  Info
} from 'lucide-react';
import { SEOHead } from '../components/seo/SEOHead';
import { Breadcrumbs } from '../components/seo/Breadcrumbs';
import { AeoDirectAnswer } from '../components/seo/AeoDirectAnswer';
import { generateSchemaGraph } from '../utils/schemaGenerator';

interface MetaField {
  id: string;
  label: string;
  key: string;
  type: 'text' | 'textarea' | 'number' | 'image' | 'select' | 'repeater';
}

interface CptCodeExporterPageProps {
  onOpenInquiry: () => void;
}

export const CptCodeExporterPage: React.FC<CptCodeExporterPageProps> = ({ onOpenInquiry }) => {
  // CPT Core Settings
  const [cptSlug, setCptSlug] = useState('case_study');
  const [singularLabel, setSingularLabel] = useState('Case Study');
  const [pluralLabel, setPluralLabel] = useState('Case Studies');
  const [menuIcon, setMenuIcon] = useState('dashicons-portfolio');
  const [menuPosition, setMenuPosition] = useState(20);
  const [showInRest, setShowInRest] = useState(true);
  const [hasArchive, setHasArchive] = useState(true);
  const [isHierarchical, setIsHierarchical] = useState(false);
  const [rewriteSlug, setRewriteSlug] = useState('case-studies');

  // Supports checkboxes
  const [supports, setSupports] = useState<Record<string, boolean>>({
    title: true,
    editor: true,
    thumbnail: true,
    excerpt: true,
    'custom-fields': false,
    revisions: true,
    author: false,
    'page-attributes': false
  });

  // Meta Fields
  const [metaFields, setMetaFields] = useState<MetaField[]>([
    { id: '1', label: 'Client Organization', key: 'client_organization', type: 'text' },
    { id: '2', label: 'Project Budget USD', key: 'project_budget_usd', type: 'number' },
    { id: '3', label: 'Architecture Blueprint Image', key: 'architecture_blueprint', type: 'image' },
    { id: '4', label: 'Verified Outcome Metrics', key: 'outcome_metrics', type: 'repeater' }
  ]);

  // Code Output Mode
  const [outputMode, setOutputMode] = useState<'native' | 'acf'>('native');
  const [copiedCode, setCopiedCode] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleSupport = (key: string) => {
    setSupports((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const addMetaField = () => {
    const newId = String(Date.now());
    setMetaFields((prev) => [
      ...prev,
      { id: newId, label: 'New Field', key: `custom_field_${prev.length + 1}`, type: 'text' }
    ]);
  };

  const removeMetaField = (id: string) => {
    setMetaFields((prev) => prev.filter((f) => f.id !== id));
  };

  const updateMetaField = (id: string, updates: Partial<MetaField>) => {
    setMetaFields((prev) =>
      prev.map((f) => (f.id === id ? { ...f, ...updates } : f))
    );
  };

  // Compile active supports array
  const activeSupports = Object.entries(supports)
    .filter(([_, enabled]) => enabled)
    .map(([key]) => `'${key}'`);

  // Generate Native PHP Code (register_post_type + add_meta_box + save_post)
  const generateNativeCode = () => {
    return `<?php
/**
 * Programmatic Post Type Registration: ${pluralLabel}
 * Optimized for PHP 8.2+ and WordPress VIP coding standards.
 * Zero external plugin dependencies. Drop into wp-content/mu-plugins/cpt-${cptSlug}.php
 */

declare(strict_types=1);

add_action('init', function(): void {
    $labels = [
        'name'                  => _x('${pluralLabel}', 'Post Type General Name', 'sheharyar'),
        'singular_name'         => _x('${singularLabel}', 'Post Type Singular Name', 'sheharyar'),
        'menu_name'             => __('${pluralLabel}', 'sheharyar'),
        'name_admin_bar'        => __('${singularLabel}', 'sheharyar'),
        'archives'              => __('${singularLabel} Archives', 'sheharyar'),
        'attributes'            => __('${singularLabel} Attributes', 'sheharyar'),
        'parent_item_colon'     => __('Parent ${singularLabel}:', 'sheharyar'),
        'all_items'             => __('All ${pluralLabel}', 'sheharyar'),
        'add_new_item'          => __('Add New ${singularLabel}', 'sheharyar'),
        'add_new'               => __('Add New', 'sheharyar'),
        'new_item'              => __('New ${singularLabel}', 'sheharyar'),
        'edit_item'             => __('Edit ${singularLabel}', 'sheharyar'),
        'update_item'           => __('Update ${singularLabel}', 'sheharyar'),
        'view_item'             => __('View ${singularLabel}', 'sheharyar'),
        'view_items'            => __('View ${pluralLabel}', 'sheharyar'),
        'search_items'          => __('Search ${singularLabel}', 'sheharyar'),
        'not_found'             => __('Not found', 'sheharyar'),
        'not_found_in_trash'    => __('Not found in Trash', 'sheharyar'),
    ];

    $args = [
        'label'                 => __('${singularLabel}', 'sheharyar'),
        'description'           => __('High performance programmatic ${singularLabel} entity', 'sheharyar'),
        'labels'                => $labels,
        'supports'              => [${activeSupports.join(', ')}],
        'hierarchical'          => ${isHierarchical ? 'true' : 'false'},
        'public'                => true,
        'show_ui'               => true,
        'show_in_menu'          => true,
        'menu_position'         => ${menuPosition},
        'menu_icon'             => '${menuIcon}',
        'show_in_admin_bar'     => true,
        'show_in_nav_menus'     => true,
        'can_export'            => true,
        'has_archive'           => ${hasArchive ? (rewriteSlug ? `'${rewriteSlug}'` : 'true') : 'false'},
        'exclude_from_search'   => false,
        'publicly_queryable'    => true,
        'capability_type'       => 'post',
        'show_in_rest'          => ${showInRest ? 'true' : 'false'},
        'rest_base'             => '${rewriteSlug || cptSlug}',
        'rewrite'               => [
            'slug'       => '${rewriteSlug || cptSlug}',
            'with_front' => false,
        ],
    ];

    register_post_type('${cptSlug}', $args);
}, 0);

/**
 * Register Security-Hardened Native Meta Box
 */
add_action('add_meta_boxes', function(): void {
    add_meta_box(
        '${cptSlug}_metadata_box',
        __('${singularLabel} Specifications', 'sheharyar'),
        'render_${cptSlug}_meta_box',
        '${cptSlug}',
        'normal',
        'high'
    );
});

function render_${cptSlug}_meta_box(\\WP_Post $post): void {
    wp_nonce_field('${cptSlug}_meta_action', '${cptSlug}_meta_nonce');
    ?>
    <div style="display:grid; grid-template-columns: 1fr; gap: 14px; padding: 10px 0;">
${metaFields
  .map(
    (field) => `        <div>
            <label for="${field.key}" style="font-weight:600; display:block; margin-bottom:4px;">
                ${field.label}
            </label>
            <input type="${field.type === 'number' ? 'number' : 'text'}" 
                   id="${field.key}" 
                   name="${field.key}" 
                   value="<?php echo esc_attr(get_post_meta($post->ID, '_${field.key}', true)); ?>" 
                   style="width: 100%; max-width: 500px;" />
        </div>`
  )
  .join('\n')}
    </div>
    <?php
}

/**
 * Save Meta Box Data with Strict Nonce and Permission Verification
 */
add_action('save_post_${cptSlug}', function(int $post_id, \\WP_Post $post, bool $update): void {
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
    if (!isset($_POST['${cptSlug}_meta_nonce']) || !wp_verify_nonce((string)$_POST['${cptSlug}_meta_nonce'], '${cptSlug}_meta_action')) return;
    if (!current_user_can('edit_post', $post_id)) return;

${metaFields
  .map(
    (field) => `    if (isset($_POST['${field.key}'])) {
        update_post_meta($post_id, '_${field.key}', sanitize_text_field((string)$_POST['${field.key}']));
    }`
  )
  .join('\n')}
}, 10, 3);
`;
  };

  // Generate ACF Local PHP Code
  const generateAcfCode = () => {
    return `<?php
/**
 * Advanced Custom Fields (ACF) Local PHP Definition
 * Auto-registers fields in code with zero database lookups.
 * Safe for git version control.
 */

add_action('acf/init', function(): void {
    if (!function_exists('acf_add_local_field_group')) {
        return;
    }

    acf_add_local_field_group([
        'key' => 'group_${cptSlug}_specs',
        'title' => '${singularLabel} Specifications',
        'fields' => [
${metaFields
  .map(
    (field, idx) => `            [
                'key' => 'field_${cptSlug}_${field.key}',
                'label' => '${field.label}',
                'name' => '${field.key}',
                'type' => '${field.type === 'image' ? 'image' : field.type === 'number' ? 'number' : 'text'}',
                'instructions' => 'Configured for ${singularLabel} entity.',
                'required' => 0,
            ],`
  )
  .join('\n')}
        ],
        'location' => [
            [
                [
                    'param' => 'post_type',
                    'operator' => '==',
                    'value' => '${cptSlug}',
                ],
            ],
        ],
        'menu_order' => 0,
        'position' => 'normal',
        'style' => 'default',
        'label_placement' => 'top',
        'instruction_placement' => 'label',
        'active' => true,
    ]);
});
`;
  };

  const activeSnippet = outputMode === 'native' ? generateNativeCode() : generateAcfCode();

  const handleCopy = () => {
    navigator.clipboard.writeText(activeSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const pageSchema = generateSchemaGraph('/tools/wordpress-cpt-code-exporter/');

  const faqs = [
    {
      question: 'Why should I register custom post types in code instead of using UI plugins?',
      answer:
        'UI plugins like CPT UI store your configuration in wp_options. On every page request, WordPress must query, unpack, and parse this option before running registration hooks. Registering post types in code executes instantaneously via opcode cache, eliminates plugin update risks, and keeps your schema version-controlled inside Git.'
    },
    {
      question: 'Where is the best place to paste this generated PHP code?',
      answer:
        'Place this file inside wp-content/mu-plugins/ as a must-use plugin (for example: wp-content/mu-plugins/cpt-portfolio.php). Must-use plugins load automatically on every request before standard plugins, cannot be accidentally deactivated in the admin dashboard, and remain active even if you change themes.'
    },
    {
      question: 'Why prefix meta keys with an underscore like _client_organization?',
      answer:
        'In WordPress, prefixing a meta key with an underscore marks it as protected metadata. This hides raw key values from the generic Custom Fields box in the classic editor while preserving programmatic access via get_post_meta($post_id, "_key", true) and REST API serializers.'
    },
    {
      question: 'How does show_in_rest impact headless WordPress and Gutenberg?',
      answer:
        'Setting show_in_rest to true enables the WordPress REST API endpoint (at /wp-json/wp/v2/your-slug) and activates the modern Gutenberg block editor. If set to false, WordPress falls back to the classic editor and excludes the post type from public REST queries.'
    }
  ];

  return (
    <div className="pt-28 pb-20 px-4 sm:px-8 max-w-7xl mx-auto">
      <SEOHead
        title="WordPress CPT & Meta Field Exporter | Sheharyar Siraj"
        description="Generate production-ready PHP 8.2 code for WordPress custom post types and meta boxes. Clean, security-hardened snippets with zero plugin overhead."
        canonicalUrl="https://sheharyarsiraj.com/tools/wordpress-cpt-code-exporter/"
        schema={pageSchema}
      />

      <Breadcrumbs
        items={[
          { label: 'SYSTEMS & UTILITY TOOLS', href: '/tools/' },
          { label: 'CPT & META CODE EXPORTER' }
        ]}
      />

      {/* Header */}
      <div className="mt-8 mb-10">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-xs font-bold uppercase tracking-wider">
            <ShieldCheck size={14} />
            <span>WORDPRESS VIP & PHP 8.2 ARCHITECTURE</span>
          </div>
          <span className="px-3 py-1 rounded-full bg-white/5 border border-brand-border/60 text-brand-secondary font-mono text-xs">
            Zero Plugin Overhead
          </span>
          <span className="px-3 py-1 rounded-full bg-surface-2 border border-brand-border/40 text-accent font-mono text-xs font-bold">
            Strict Nonce & Type Checked
          </span>
        </div>

        <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-5">
          WordPress Custom Post Type & <span className="text-accent">Meta Field Code Exporter</span>
        </h1>

        <p className="text-brand-secondary text-base sm:text-xl max-w-4xl leading-relaxed font-body">
          Generate clean, security-hardened register_post_type and custom meta field PHP code. Eliminate database overhead and plugin dependency with production-ready snippets for functions.php or mu-plugins.
        </p>
      </div>

      {/* Interactive Tool UI: Visual Builder & Code Viewer */}
      <section className="my-8 rounded-3xl glass-panel border border-accent/30 p-6 sm:p-8 bg-surface-1/90 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />

        <div className="flex items-center justify-between mb-8 pb-4 border-b border-brand-border/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center text-accent">
              <Sliders size={18} />
            </div>
            <div>
              <h2 className="font-heading text-lg sm:text-xl font-bold text-white">
                Interactive Schema & Meta Architect
              </h2>
              <p className="text-xs font-mono text-brand-muted">
                Configure labels, REST routing, and custom meta fields. Code updates in real time.
              </p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-accent">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span>PHP 8.2 Syntax Engine</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Visual Form Builder (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono text-brand-secondary uppercase mb-1.5 font-semibold">
                  Singular Label *
                </label>
                <input
                  type="text"
                  value={singularLabel}
                  onChange={(e) => {
                    setSingularLabel(e.target.value);
                    if (!cptSlug || cptSlug === 'case_study') {
                      setCptSlug(e.target.value.toLowerCase().replace(/\s+/g, '_'));
                    }
                  }}
                  className="w-full bg-surface-2 border border-brand-border/60 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-accent font-mono"
                  placeholder="Case Study"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-brand-secondary uppercase mb-1.5 font-semibold">
                  Plural Label *
                </label>
                <input
                  type="text"
                  value={pluralLabel}
                  onChange={(e) => setPluralLabel(e.target.value)}
                  className="w-full bg-surface-2 border border-brand-border/60 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-accent font-mono"
                  placeholder="Case Studies"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono text-brand-secondary uppercase mb-1.5 font-semibold">
                  Post Type Slug *
                </label>
                <input
                  type="text"
                  value={cptSlug}
                  onChange={(e) => setCptSlug(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                  className="w-full bg-surface-2 border border-brand-border/60 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-accent font-mono"
                  placeholder="case_study"
                />
                <span className="text-[10px] font-mono text-brand-muted">Max 20 chars, lowercase.</span>
              </div>

              <div>
                <label className="block text-xs font-mono text-brand-secondary uppercase mb-1.5 font-semibold">
                  URL Rewrite Slug
                </label>
                <input
                  type="text"
                  value={rewriteSlug}
                  onChange={(e) => setRewriteSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                  className="w-full bg-surface-2 border border-brand-border/60 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-accent font-mono"
                  placeholder="case-studies"
                />
                <span className="text-[10px] font-mono text-brand-muted">Public URL path.</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono text-brand-secondary uppercase mb-1.5 font-semibold">
                  Admin Dashicon
                </label>
                <input
                  type="text"
                  value={menuIcon}
                  onChange={(e) => setMenuIcon(e.target.value)}
                  className="w-full bg-surface-2 border border-brand-border/60 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-accent font-mono"
                  placeholder="dashicons-portfolio"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-brand-secondary uppercase mb-1.5 font-semibold">
                  Menu Order
                </label>
                <input
                  type="number"
                  value={menuPosition}
                  onChange={(e) => setMenuPosition(Number(e.target.value))}
                  className="w-full bg-surface-2 border border-brand-border/60 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-accent font-mono"
                  placeholder="20"
                />
              </div>
            </div>

            {/* Core Capability Toggles */}
            <div className="p-4 rounded-xl bg-surface-2/70 border border-brand-border/60 space-y-3">
              <span className="text-xs font-mono text-brand-muted uppercase font-bold block">
                Routing & Editing Capabilities
              </span>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono text-brand-secondary">
                <label className="flex items-center gap-2 cursor-pointer hover:text-white">
                  <input
                    type="checkbox"
                    checked={showInRest}
                    onChange={(e) => setShowInRest(e.target.checked)}
                    className="accent-accent"
                  />
                  <span>REST API & Gutenberg</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer hover:text-white">
                  <input
                    type="checkbox"
                    checked={hasArchive}
                    onChange={(e) => setHasArchive(e.target.checked)}
                    className="accent-accent"
                  />
                  <span>Has Archive Page</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer hover:text-white">
                  <input
                    type="checkbox"
                    checked={isHierarchical}
                    onChange={(e) => setIsHierarchical(e.target.checked)}
                    className="accent-accent"
                  />
                  <span>Hierarchical (Parent/Child)</span>
                </label>
              </div>
            </div>

            {/* Supports Feature Checkboxes */}
            <div className="p-4 rounded-xl bg-surface-2/70 border border-brand-border/60 space-y-2">
              <span className="text-xs font-mono text-brand-muted uppercase font-bold block">
                WordPress Supports Features
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono text-brand-secondary">
                {Object.keys(supports).map((key) => (
                  <label key={key} className="flex items-center gap-1.5 cursor-pointer hover:text-white">
                    <input
                      type="checkbox"
                      checked={supports[key]}
                      onChange={() => toggleSupport(key)}
                      className="accent-accent"
                    />
                    <span>{key}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Custom Meta Fields Builder */}
            <div className="p-4 rounded-xl bg-surface-2/70 border border-brand-border/60 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-brand-muted uppercase font-bold">
                  Custom Meta Fields ({metaFields.length})
                </span>
                <button
                  type="button"
                  onClick={addMetaField}
                  className="px-2.5 py-1 rounded-lg bg-accent/15 text-accent border border-accent/30 text-xs font-mono font-bold flex items-center gap-1 hover:bg-accent hover:text-black transition-colors"
                >
                  <Plus size={13} />
                  <span>Add Field</span>
                </button>
              </div>

              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {metaFields.map((field) => (
                  <div
                    key={field.id}
                    className="p-2.5 rounded-lg bg-surface-1 border border-brand-border/40 flex items-center gap-2"
                  >
                    <input
                      type="text"
                      value={field.label}
                      onChange={(e) => updateMetaField(field.id, { label: e.target.value })}
                      placeholder="Field Label"
                      className="flex-1 bg-surface-2 border border-brand-border/40 rounded px-2 py-1 text-xs text-white font-mono"
                    />

                    <input
                      type="text"
                      value={field.key}
                      onChange={(e) => updateMetaField(field.id, { key: e.target.value })}
                      placeholder="meta_key"
                      className="flex-1 bg-surface-2 border border-brand-border/40 rounded px-2 py-1 text-xs text-white font-mono"
                    />

                    <select
                      value={field.type}
                      onChange={(e) => updateMetaField(field.id, { type: e.target.value as any })}
                      className="bg-surface-2 border border-brand-border/40 rounded px-1.5 py-1 text-xs text-white font-mono"
                    >
                      <option value="text">text</option>
                      <option value="number">number</option>
                      <option value="image">image</option>
                      <option value="repeater">repeater</option>
                    </select>

                    <button
                      type="button"
                      onClick={() => removeMetaField(field.id)}
                      className="p-1 text-brand-muted hover:text-rose-400 transition-colors"
                      title="Remove field"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Code Generator Preview (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              {/* Output Controls Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3 border-b border-brand-border/40 pb-2">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setOutputMode('native')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-all border ${
                      outputMode === 'native'
                        ? 'bg-accent text-black border-accent font-bold shadow-[0_0_12px_rgba(183,255,60,0.25)]'
                        : 'bg-surface-2 text-brand-secondary border-brand-border/60 hover:text-white'
                    }`}
                  >
                    Native PHP (Zero Plugins)
                  </button>

                  <button
                    type="button"
                    onClick={() => setOutputMode('acf')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-all border ${
                      outputMode === 'acf'
                        ? 'bg-accent text-black border-accent font-bold shadow-[0_0_12px_rgba(183,255,60,0.25)]'
                        : 'bg-surface-2 text-brand-secondary border-brand-border/60 hover:text-white'
                    }`}
                  >
                    ACF Local PHP Fields
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-2 hover:bg-accent hover:text-black text-xs font-mono text-white transition-all border border-brand-border/60"
                >
                  {copiedCode ? (
                    <>
                      <Check size={13} className="text-black" />
                      <span className="text-black font-bold">COPIED TO CLIPBOARD</span>
                    </>
                  ) : (
                    <>
                      <Copy size={13} />
                      <span>COPY PHP SNIPPET</span>
                    </>
                  )}
                </button>
              </div>

              {/* Code Viewer */}
              <div className="rounded-2xl border border-brand-border/70 overflow-hidden bg-[#0a0a0a]">
                <div className="px-4 py-2.5 bg-surface-2/80 border-b border-brand-border/40 flex items-center justify-between text-[11px] font-mono text-brand-muted">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                    <span className="ml-2 text-brand-secondary">
                      mu-plugins/cpt-{cptSlug}.php
                    </span>
                  </div>
                  <span className="text-accent font-semibold">Strict Types • PHP 8.2</span>
                </div>

                <div className="p-4 overflow-x-auto max-h-[560px] text-xs font-mono leading-relaxed text-brand-secondary select-all">
                  <pre className={outputMode === 'native' ? 'text-emerald-400' : 'text-amber-300'}>
                    <code>{activeSnippet}</code>
                  </pre>
                </div>
              </div>
            </div>

            {/* Diagnostic Footer */}
            <div className="mt-4 p-3.5 rounded-xl bg-surface-2/60 border border-brand-border/40 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2 text-brand-secondary">
                <CheckCircle2 size={14} className="text-accent" />
                <span>Verification: Sanitized Nonce Handlers Included</span>
              </div>
              <span className="text-brand-muted text-[11px]">
                Target: wp-content/mu-plugins/
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* AEO Direct Answer Block */}
      <AeoDirectAnswer
        badge="CUSTOM POST TYPE ARCHITECTURE VERDICT"
        summary="Registering custom post types and custom meta fields directly in PHP code eliminates the database query overhead, security attack surface, and serialization bugs introduced by UI generator plugins while ensuring 100% version control and instant opcode cache execution."
        keyTakeaways={[
          'Executing programmatic registrations in mu-plugins cuts wp_options query load during bootstrap.',
          'Native custom meta boxes protect your editorial workflow with explicit nonces and user permission barriers.',
          'Exporting ACF local PHP field groups stops database field lookups completely.',
          'Setting show_in_rest to true allows immediate decoupling for modern React frontends or Gutenberg blocks.'
        ]}
      />

      {/* Long-Form Educational Content */}
      <section className="my-16 space-y-12">
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-brand-border/60">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-xs font-bold uppercase tracking-wider mb-4">
            <Cpu size={13} />
            <span>DEVELOPER SYSTEMS ARCHITECTURE</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-5 leading-tight">
            Why programmatic post type registration outperforms UI generator plugins
          </h2>

          <div className="space-y-4 text-sm sm:text-base text-brand-secondary font-body leading-relaxed">
            <p>
              In many WordPress audits I perform, site speed issues begin with how content types are registered. Site builders often rely on plugins like Custom Post Type UI or heavy all-in-one frameworks to create portfolio items, team members, or service cards.
            </p>
            <p>
              These plugins store their schema definitions inside serialized option rows in wp_options. On every single web request, WordPress must query the database, unserialize the arrays, and pass them into register_post_type. When a site scales to dozens of content types, this adds unnecessary database seek time before template files even load.
            </p>
            <p>
              Writing your registration logic in pure PHP eliminates that step entirely. Once compiled by PHP OPCache, your post types and meta fields load straight from server memory in fractions of a millisecond. Furthermore, your schema lives cleanly in Git repositories, making staging-to-production migrations completely deterministic.
            </p>
          </div>
        </div>

        {/* Deployment Protocol */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-panel rounded-3xl p-8 border border-brand-border/60 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-5">
                <FileCode size={20} />
              </div>
              <h3 className="font-heading text-xl font-bold text-white mb-3">
                Why mu-plugins are superior to theme functions.php
              </h3>
              <p className="text-xs sm:text-sm text-brand-secondary font-body leading-relaxed mb-4">
                Placing your custom post types inside your theme functions.php file creates an unnecessary content lock-in. The moment you switch or rebuild your theme, all your custom post types disappear from the admin menu.
              </p>
              <p className="text-xs sm:text-sm text-brand-secondary font-body leading-relaxed">
                By placing the generated file in wp-content/mu-plugins/, your data architecture remains completely independent of your presentation layer. Must-use plugins cannot be accidentally deactivated by clients in the WordPress dashboard.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-brand-border/40 font-mono text-xs text-accent">
              Recommended Path: wp-content/mu-plugins/cpt-{cptSlug}.php
            </div>
          </div>

          <div className="glass-panel rounded-3xl p-8 border border-brand-border/60 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-5">
                <Terminal size={20} />
              </div>
              <h3 className="font-heading text-xl font-bold text-white mb-3">
                Security-hardened meta save routines
              </h3>
              <p className="text-xs sm:text-sm text-brand-secondary font-body leading-relaxed mb-4">
                Vulnerabilities in custom post meta handling almost always stem from two oversights: missing nonces and inadequate permission verification.
              </p>
              <p className="text-xs sm:text-sm text-brand-secondary font-body leading-relaxed">
                The code generated by this tool implements strict wp_verify_nonce checks, verifies current_user_can edit permissions, and prevents execution during automated autosaves before running sanitize_text_field calls.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-brand-border/40 font-mono text-xs text-accent">
              Security Standard: Strict Nonce + User Capabilities Guard
            </div>
          </div>
        </div>
      </section>

      {/* Technical FAQ Section */}
      <section className="my-20">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-xs font-mono text-accent tracking-widest uppercase block mb-2">
            TECHNICAL REFERENCE
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-2">
            Frequently Asked Questions on Custom Post Types
          </h2>
          <p className="text-sm text-brand-secondary font-body">
            Developer specifics regarding REST endpoints, permalink flushes, and meta serialization.
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

      {/* Architecture Consultation CTA */}
      <section className="my-16 rounded-3xl glass-panel p-8 sm:p-12 border border-accent/20 bg-gradient-to-r from-surface-1 via-surface-2 to-surface-1">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles size={13} />
            <span>CUSTOM WORDPRESS BACKEND ENGINEERING</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-white mb-4">
            Need complex content architectures or custom plugins built?
          </h2>

          <p className="text-sm sm:text-base text-brand-secondary font-medium leading-relaxed mb-6 font-body">
            I engineer decoupled backends, custom REST API endpoints, high-concurrency database optimizations, and bespoke enterprise WordPress plugins for digital agencies and growth brands.
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              type="button"
              onClick={onOpenInquiry}
              className="px-6 py-3.5 rounded-xl bg-accent text-black font-mono text-xs font-bold tracking-wider hover:bg-white transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(183,255,60,0.25)] active:scale-95"
            >
              <span>DISCUSS BACKEND ARCHITECTURE</span>
              <ArrowUpRight size={15} />
            </button>

            <Link
              to="/tools/"
              className="px-6 py-3.5 rounded-xl bg-surface-3 text-white font-mono text-xs font-bold tracking-wider hover:bg-white hover:text-black transition-all border border-brand-border flex items-center gap-2"
            >
              <span>EXPLORE ALL UTILITY TOOLS</span>
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CptCodeExporterPage;
