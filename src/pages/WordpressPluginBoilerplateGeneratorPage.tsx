import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Code2,
  Sliders,
  Copy,
  Check,
  ShieldCheck,
  FileCode,
  Terminal,
  Layers,
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  Cpu,
  CheckCircle2,
  Sparkles,
  Download,
  Folder,
  FolderOpen,
  FileText,
  Boxes,
  Zap,
  Lock,
  Globe,
  Settings,
  Database,
  RefreshCw
} from 'lucide-react';
import JSZip from 'jszip';
import { SEOHead } from '../components/seo/SEOHead';
import { Breadcrumbs } from '../components/seo/Breadcrumbs';
import { AeoDirectAnswer } from '../components/seo/AeoDirectAnswer';
import { generateSchemaGraph } from '../utils/schemaGenerator';

interface BoilerplateConfig {
  pluginName: string;
  pluginSlug: string;
  pluginUri: string;
  description: string;
  version: string;
  authorName: string;
  authorUri: string;
  namespace: string;
  constantPrefix: string;
  textDomain: string;
  minPhpVersion: string;
  minWpVersion: string;
  includeActivationHooks: boolean;
  includeSettingsPage: boolean;
  includeAjaxHandler: boolean;
  includeCustomPostType: boolean;
  includeRestApi: boolean;
  includeAdminAssets: boolean;
  includeStrictTypes: boolean;
  includeUninstallScript: boolean;
}

interface GeneratedFile {
  path: string;
  name: string;
  language: 'php' | 'javascript' | 'css' | 'markdown';
  content: string;
  description: string;
}

interface WordpressPluginBoilerplateGeneratorPageProps {
  onOpenInquiry: () => void;
}

export const WordpressPluginBoilerplateGeneratorPage: React.FC<WordpressPluginBoilerplateGeneratorPageProps> = ({
  onOpenInquiry
}) => {
  // Form Configuration State
  const [config, setConfig] = useState<BoilerplateConfig>({
    pluginName: 'Acme Enterprise Core',
    pluginSlug: 'acme-enterprise-core',
    pluginUri: 'https://sheharyarsiraj.com/plugins/acme-enterprise-core',
    description: 'Security-hardened, object-oriented enterprise WordPress foundation engineered for high concurrency.',
    version: '1.0.0',
    authorName: 'Sheharyar Siraj',
    authorUri: 'https://sheharyarsiraj.com',
    namespace: 'Acme\\EnterpriseCore',
    constantPrefix: 'ACME_ENTERPRISE_CORE_',
    textDomain: 'acme-enterprise-core',
    minPhpVersion: '8.2',
    minWpVersion: '6.5',
    includeActivationHooks: true,
    includeSettingsPage: true,
    includeAjaxHandler: true,
    includeCustomPostType: true,
    includeRestApi: true,
    includeAdminAssets: true,
    includeStrictTypes: true,
    includeUninstallScript: true
  });

  const [activeFilePath, setActiveFilePath] = useState<string>('acme-enterprise-core.php');
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedTree, setCopiedTree] = useState(false);
  const [isZipping, setIsZipping] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Helper to slugify and derive naming conventions
  const handleNameChange = (name: string) => {
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    const cleanWords = name.replace(/[^a-zA-Z0-9 ]/g, '').split(/\s+/).filter(Boolean);
    const pascal = cleanWords.map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join('');
    const screaming = slug.replace(/-/g, '_').toUpperCase() + '_';
    const ns = cleanWords.length > 1
      ? `${cleanWords[0]}\\${cleanWords.slice(1).map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join('')}`
      : `${pascal}\\Core`;

    setConfig((prev) => ({
      ...prev,
      pluginName: name,
      pluginSlug: slug || prev.pluginSlug,
      pluginUri: `https://sheharyarsiraj.com/plugins/${slug || 'custom-plugin'}`,
      textDomain: slug || prev.textDomain,
      constantPrefix: screaming || prev.constantPrefix,
      namespace: ns || prev.namespace
    }));
  };

  // Compile Dynamic Plugin Files based on config
  const generatedFiles: GeneratedFile[] = useMemo(() => {
    const files: GeneratedFile[] = [];
    const slug = config.pluginSlug || 'custom-plugin';
    const prefix = config.constantPrefix || 'MY_PLUGIN_';
    const ns = config.namespace || 'MyPlugin';
    const strictHeader = config.includeStrictTypes ? "declare(strict_types=1);\n\n" : '';

    // 1. Root Plugin Main Bootstrap File
    const mainFileContent = `<?php
/**
 * Plugin Name:       ${config.pluginName}
 * Plugin URI:        ${config.pluginUri}
 * Description:       ${config.description}
 * Version:           ${config.version}
 * Requires at least: ${config.minWpVersion}
 * Requires PHP:      ${config.minPhpVersion}
 * Author:            ${config.authorName}
 * Author URI:        ${config.authorUri}
 * Text Domain:       ${config.textDomain}
 * Domain Path:       /languages
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 */

${strictHeader}namespace ${ns};

if (!defined('ABSPATH')) {
    exit;
}

// Core Environment Constants
define('${prefix}VERSION', '${config.version}');
define('${prefix}FILE', __FILE__);
define('${prefix}PATH', plugin_dir_path(__FILE__));
define('${prefix}URL', plugin_dir_url(__FILE__));
define('${prefix}BASENAME', plugin_basename(__FILE__));

/**
 * Autoloader for Plugin Classes
 */
spl_autoload_register(function (string $class): void {
    $prefix = '${ns}\\\\';
    $base_dir = ${prefix}PATH . 'includes/';

    $len = strlen($prefix);
    if (strncmp($prefix, $class, $len) !== 0) {
        return;
    }

    $relative_class = substr($class, $len);
    $parts = explode('\\\\', $relative_class);
    $file_name = 'class-' . strtolower(str_replace('_', '-', array_pop($parts))) . '.php';
    $path = $base_dir;

    if (!empty($parts)) {
        $path .= strtolower(implode('/', $parts)) . '/';
    }

    $file = $path . $file_name;
    if (file_exists($file)) {
        require_once $file;
    }
});

${config.includeActivationHooks ? `// Lifecycle Hooks
register_activation_hook(__FILE__, [\\${ns}\\Activator::class, 'activate']);
register_deactivation_hook(__FILE__, [\\${ns}\\Deactivator::class, 'deactivate']);
` : ''}
/**
 * Primary Plugin Orchestrator
 */
final class Plugin {
    private static ?Plugin $instance = null;

    public static function instance(): Plugin {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct() {
        $this->bootstrap();
    }

    private function bootstrap(): void {
        add_action('plugins_loaded', [$this, 'init'], 10);
    }

    public function init(): void {
        load_plugin_textdomain('${config.textDomain}', false, dirname(${prefix}BASENAME) . '/languages');

        ${config.includeSettingsPage ? `// Admin subsystem
        if (is_admin()) {
            Admin::instance();
        }
` : ''}        ${config.includeAjaxHandler ? `// AJAX subsystem
        Ajax::instance();
` : ''}        ${config.includeCustomPostType ? `// Custom post types and taxonomies
        CustomPostType::instance();
` : ''}        ${config.includeRestApi ? `// REST API endpoints
        add_action('rest_api_init', [RestApi::class, 'register_routes']);
` : ''}    }
}

// Launch plugin lifecycle
Plugin::instance();
`;

    files.push({
      path: `${slug}.php`,
      name: `${slug}.php`,
      language: 'php',
      content: mainFileContent,
      description: 'Main plugin entry file containing WordPress headers, constants, class autoloader, and singleton bootstrap.'
    });

    // 2. Activator Class
    if (config.includeActivationHooks) {
      const activatorContent = `<?php
${strictHeader}namespace ${ns};

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Handles plugin activation routines.
 * Executes version compatibility checks, default option seeding, and rewrite flags.
 */
final class Activator {
    public static function activate(): void {
        // Enforce Minimum PHP Environment
        if (version_compare(PHP_VERSION, '${config.minPhpVersion}', '<')) {
            deactivate_plugins(plugin_basename(${prefix}FILE));
            wp_die(
                esc_html(
                    sprintf(
                        /* translators: 1: Required PHP version, 2: Current PHP version */
                        __('${config.pluginName} requires PHP %1$s or higher. Your server is running %2$s.', '${config.textDomain}'),
                        '${config.minPhpVersion}',
                        PHP_VERSION
                    )
                ),
                esc_html__('Plugin Activation Error', '${config.textDomain}'),
                ['back_link' => true]
            );
        }

        // Seed Default Options with autoload set to false to prevent wp_options query bloat
        $default_settings = [
            'api_mode'         => 'production',
            'rate_limit'       => 60,
            'log_retention_days' => 14,
            'installed_at'     => time(),
            'version'          => ${prefix}VERSION,
        ];

        if (get_option('${slug}_settings') === false) {
            add_option('${slug}_settings', $default_settings, '', 'no');
        }

        // Store flag to flush rewrites on next admin load rather than during activation request
        set_transient('${slug}_flush_rewrite_rules', 1, 60);
    }
}
`;
      files.push({
        path: `includes/class-activator.php`,
        name: 'class-activator.php',
        language: 'php',
        content: activatorContent,
        description: 'Hardened activation handler verifying PHP version and seeding non-autoloaded options.'
      });

      // 3. Deactivator Class
      const deactivatorContent = `<?php
${strictHeader}namespace ${ns};

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Handles plugin deactivation routines.
 * Purges transients and cleans up scheduled cron events without deleting user data.
 */
final class Deactivator {
    public static function deactivate(): void {
        // Clear scheduled crons
        wp_clear_scheduled_hook('${slug}_daily_maintenance_cron');

        // Clear cached transients
        delete_transient('${slug}_flush_rewrite_rules');
        delete_transient('${slug}_telemetry_cache');

        // Flush rewrite rules cleanly
        flush_rewrite_rules(false);
    }
}
`;
      files.push({
        path: `includes/class-deactivator.php`,
        name: 'class-deactivator.php',
        language: 'php',
        content: deactivatorContent,
        description: 'Clean deactivation handler removing cron jobs and transient caches while preserving customer data.'
      });
    }

    // 4. Admin Class
    if (config.includeSettingsPage) {
      const adminContent = `<?php
${strictHeader}namespace ${ns};

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Admin Subsystem: Manages Settings API options page and scoped asset enqueuing.
 */
final class Admin {
    private static ?Admin $instance = null;
    private string $page_hook = '';

    public static function instance(): Admin {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct() {
        add_action('admin_menu', [$this, 'register_menu_page']);
        add_action('admin_init', [$this, 'register_settings']);
        ${config.includeAdminAssets ? `add_action('admin_enqueue_scripts', [$this, 'enqueue_assets']);` : ''}
        add_action('admin_init', [$this, 'check_rewrite_flush']);
    }

    public function register_menu_page(): void {
        $this->page_hook = add_options_page(
            __('${config.pluginName} Settings', '${config.textDomain}'),
            __('${config.pluginName}', '${config.textDomain}'),
            'manage_options',
            '${slug}',
            [$this, 'render_settings_page']
        );
    }

    public function register_settings(): void {
        register_setting(
            '${slug}_options_group',
            '${slug}_settings',
            [
                'type'              => 'array',
                'description'       => __('Configuration parameters for ${config.pluginName}', '${config.textDomain}'),
                'sanitize_callback' => [$this, 'sanitize_settings'],
                'show_in_rest'      => false,
                'default'           => [
                    'api_mode'         => 'production',
                    'rate_limit'       => 60,
                    'log_retention_days' => 14,
                ],
            ]
        );

        add_settings_section(
            '${slug}_general_section',
            __('Engine Configuration', '${config.textDomain}'),
            function (): void {
                echo '<p class="description">' . esc_html__('Configure core operational limits, caching flags, and security parameters.', '${config.textDomain}') . '</p>';
            },
            '${slug}'
        );

        add_settings_field(
            'api_mode',
            __('Operational Mode', '${config.textDomain}'),
            [$this, 'render_api_mode_field'],
            '${slug}',
            '${slug}_general_section'
        );

        add_settings_field(
            'rate_limit',
            __('Requests Per Minute', '${config.textDomain}'),
            [$this, 'render_rate_limit_field'],
            '${slug}',
            '${slug}_general_section'
        );
    }

    /**
     * Defense-in-depth sanitization callback for Settings API
     */
    public function sanitize_settings(mixed $input): array {
        $sanitized = [];
        $allowed_modes = ['sandbox', 'production', 'high_concurrency'];

        if (is_array($input)) {
            $mode = isset($input['api_mode']) ? sanitize_key($input['api_mode']) : 'production';
            $sanitized['api_mode'] = in_array($mode, $allowed_modes, true) ? $mode : 'production';

            $rate = isset($input['rate_limit']) ? absint($input['rate_limit']) : 60;
            $sanitized['rate_limit'] = ($rate > 0 && $rate <= 600) ? $rate : 60;

            $retention = isset($input['log_retention_days']) ? absint($input['log_retention_days']) : 14;
            $sanitized['log_retention_days'] = ($retention >= 1 && $retention <= 90) ? $retention : 14;
        }

        add_settings_error(
            '${slug}_settings',
            '${slug}_updated',
            __('Configuration successfully saved and opcode cached.', '${config.textDomain}'),
            'updated'
        );

        return $sanitized;
    }

    public function render_api_mode_field(): void {
        $options = get_option('${slug}_settings', []);
        $mode = $options['api_mode'] ?? 'production';
        ?>
        <select name="${slug}_settings[api_mode]" id="api_mode" class="regular-text">
            <option value="sandbox" <?php selected($mode, 'sandbox'); ?>><?php esc_html_e('Sandbox / Staging Testing', '${config.textDomain}'); ?></option>
            <option value="production" <?php selected($mode, 'production'); ?>><?php esc_html_e('Production (Optimized)', '${config.textDomain}'); ?></option>
            <option value="high_concurrency" <?php selected($mode, 'high_concurrency'); ?>><?php esc_html_e('High-Concurrency Enterprise', '${config.textDomain}'); ?></option>
        </select>
        <?php
    }

    public function render_rate_limit_field(): void {
        $options = get_option('${slug}_settings', []);
        $rate = $options['rate_limit'] ?? 60;
        ?>
        <input type="number" name="${slug}_settings[rate_limit]" id="rate_limit" value="<?php echo esc_attr((string)$rate); ?>" min="1" max="600" class="small-text" />
        <span class="description"><?php esc_html_e('Threshold for automated client rate-limiting protection.', '${config.textDomain}'); ?></span>
        <?php
    }

    public function render_settings_page(): void {
        if (!current_user_can('manage_options')) {
            wp_die(esc_html__('Insufficient privileges to inspect this interface.', '${config.textDomain}'));
        }
        require_once ${prefix}PATH . 'admin/views/settings-page.php';
    }

    ${config.includeAdminAssets ? `public function enqueue_assets(string $hook): void {
        // Enqueue assets strictly on this plugin page to eliminate dashboard bloat
        if ($hook !== $this->page_hook) {
            return;
        }

        wp_enqueue_style(
            '${slug}-admin-css',
            ${prefix}URL . 'assets/css/admin.css',
            [],
            ${prefix}VERSION
        );

        wp_enqueue_script(
            '${slug}-admin-js',
            ${prefix}URL . 'assets/js/admin.js',
            [],
            ${prefix}VERSION,
            true
        );

        wp_localize_script('${slug}-admin-js', '${prefix}CONFIG', [
            'ajaxUrl' => admin_url('admin-ajax.php'),
            'nonce'   => wp_create_nonce('${slug}_ajax_nonce'),
            'i18n'    => [
                'processing' => esc_html__('Executing secure operation...', '${config.textDomain}'),
                'success'    => esc_html__('Action verified and synchronized.', '${config.textDomain}'),
                'error'      => esc_html__('Verification rejected.', '${config.textDomain}'),
            ],
        ]);
    }
` : ''}
    public function check_rewrite_flush(): void {
        if (get_transient('${slug}_flush_rewrite_rules')) {
            delete_transient('${slug}_flush_rewrite_rules');
            flush_rewrite_rules(false);
        }
    }
}
`;
      files.push({
        path: `includes/class-admin.php`,
        name: 'class-admin.php',
        language: 'php',
        content: adminContent,
        description: 'Admin controller using WordPress Settings API with capability barriers and scoped asset loading.'
      });

      // Settings View Template
      const settingsViewContent = `<?php
${strictHeader}if (!defined('ABSPATH')) {
    exit;
}
?>
<div class="wrap ${slug}-admin-wrap">
    <h1><?php echo esc_html(get_admin_page_title()); ?></h1>
    <p class="description">
        <?php esc_html_e('Production configuration powered by object-oriented PHP 8.2 architecture. Zero frontend bloat.', '${config.textDomain}'); ?>
    </p>

    <div class="card" style="max-width: 860px; margin-top: 20px; padding: 20px;">
        <form method="post" action="options.php">
            <?php
            settings_fields('${slug}_options_group');
            do_settings_sections('${slug}');
            submit_button(__('Save System Settings', '${config.textDomain}'), 'primary');
            ?>
        </form>
    </div>

    ${config.includeAjaxHandler ? `<div class="card" style="max-width: 860px; margin-top: 20px; padding: 20px;">
        <h2><?php esc_html_e('Interactive Diagnostics Console', '${config.textDomain}'); ?></h2>
        <p class="description">
            <?php esc_html_e('Test authenticated nonce verification and server latency in real time.', '${config.textDomain}'); ?>
        </p>
        <button type="button" id="${slug}-test-ajax-btn" class="button button-secondary">
            <?php esc_html_e('Trigger Nonce Protected Ping', '${config.textDomain}'); ?>
        </button>
        <div id="${slug}-ajax-feedback" style="margin-top: 12px; font-family: monospace; font-size: 12px;"></div>
    </div>` : ''}
</div>
`;
      files.push({
        path: `admin/views/settings-page.php`,
        name: 'settings-page.php',
        language: 'php',
        content: settingsViewContent,
        description: 'Clean PHP view template rendered exclusively within the admin settings wrapper.'
      });
    }

    // 5. AJAX Handler Class
    if (config.includeAjaxHandler) {
      const ajaxContent = `<?php
${strictHeader}namespace ${ns};

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Handles authenticated and non-authenticated AJAX requests.
 * Enforces cryptographic nonce verification, user capability checks, and JSON response typing.
 */
final class Ajax {
    private static ?Ajax $instance = null;

    public static function instance(): Ajax {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct() {
        // Authenticated AJAX hook
        add_action('wp_ajax_${slug}_ping', [$this, 'handle_ping']);
        // Public AJAX hook (if external guest ping allowed)
        add_action('wp_ajax_nopriv_${slug}_ping', [$this, 'handle_public_ping']);
    }

    public function handle_ping(): void {
        // 1. Strict Nonce Verification
        check_ajax_referer('${slug}_ajax_nonce', 'security');

        // 2. Strict Capability Barrier
        if (!current_user_can('manage_options')) {
            wp_send_json_error([
                'message'   => esc_html__('Unauthorized: Inadequate user capability level.', '${config.textDomain}'),
                'timestamp' => time(),
            ], 403);
        }

        // 3. Input Sanitization
        $request_origin = isset($_POST['origin']) ? sanitize_text_field(wp_unslash($_POST['origin'])) : 'dashboard';

        // 4. Return Structured Typed JSON
        wp_send_json_success([
            'status'     => 'healthy',
            'origin'     => $request_origin,
            'timestamp'  => current_time('mysql'),
            'memory_mb'  => round(memory_get_usage(true) / 1048576, 2),
            'php_version'=> PHP_VERSION,
            'message'    => esc_html__('Cryptographic nonce validated. Architecture healthy.', '${config.textDomain}'),
        ]);
    }

    public function handle_public_ping(): void {
        check_ajax_referer('${slug}_ajax_nonce', 'security');

        wp_send_json_success([
            'status'    => 'public_verified',
            'timestamp' => time(),
        ]);
    }
}
`;
      files.push({
        path: `includes/class-ajax.php`,
        name: 'class-ajax.php',
        language: 'php',
        content: ajaxContent,
        description: 'Hardened AJAX dispatcher with check_ajax_referer and current_user_can guardrails.'
      });
    }

    // 6. Custom Post Type Class
    if (config.includeCustomPostType) {
      const cptContent = `<?php
${strictHeader}namespace ${ns};

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Registers custom post types and taxonomies with full Gutenberg and REST API support.
 */
final class CustomPostType {
    private static ?CustomPostType $instance = null;

    public static function instance(): CustomPostType {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct() {
        add_action('init', [$this, 'register_post_type'], 0);
        add_action('init', [$this, 'register_taxonomy'], 0);
    }

    public function register_post_type(): void {
        $labels = [
            'name'                  => _x('Entities', 'Post Type General Name', '${config.textDomain}'),
            'singular_name'         => _x('Entity', 'Post Type Singular Name', '${config.textDomain}'),
            'menu_name'             => __('Entities', '${config.textDomain}'),
            'name_admin_bar'        => __('Entity', '${config.textDomain}'),
            'archives'              => __('Entity Archives', '${config.textDomain}'),
            'all_items'             => __('All Entities', '${config.textDomain}'),
            'add_new_item'          => __('Add New Entity', '${config.textDomain}'),
            'add_new'               => __('Add New', '${config.textDomain}'),
            'new_item'              => __('New Entity', '${config.textDomain}'),
            'edit_item'             => __('Edit Entity', '${config.textDomain}'),
            'update_item'           => __('Update Entity', '${config.textDomain}'),
            'view_item'             => __('View Entity', '${config.textDomain}'),
            'search_items'          => __('Search Entities', '${config.textDomain}'),
            'not_found'             => __('Not found', '${config.textDomain}'),
            'not_found_in_trash'    => __('Not found in Trash', '${config.textDomain}'),
        ];

        $args = [
            'label'                 => __('Entity', '${config.textDomain}'),
            'description'           => __('Enterprise content entity managed by ${config.pluginName}', '${config.textDomain}'),
            'labels'                => $labels,
            'supports'              => ['title', 'editor', 'thumbnail', 'excerpt', 'revisions', 'custom-fields'],
            'hierarchical'          => false,
            'public'                => true,
            'show_ui'               => true,
            'show_in_menu'          => true,
            'menu_position'         => 25,
            'menu_icon'             => 'dashicons-database',
            'show_in_admin_bar'     => true,
            'show_in_nav_menus'     => true,
            'can_export'            => true,
            'has_archive'           => true,
            'exclude_from_search'   => false,
            'publicly_queryable'    => true,
            'capability_type'       => 'post',
            'show_in_rest'          => true,
            'rest_base'             => '${slug}-entities',
            'rewrite'               => [
                'slug'       => '${slug}-entities',
                'with_front' => false,
            ],
        ];

        register_post_type('${slug.replace(/-/g, '_').slice(0, 20)}', $args);
    }

    public function register_taxonomy(): void {
        $labels = [
            'name'              => _x('Entity Types', 'taxonomy general name', '${config.textDomain}'),
            'singular_name'     => _x('Entity Type', 'taxonomy singular name', '${config.textDomain}'),
            'search_items'      => __('Search Entity Types', '${config.textDomain}'),
            'all_items'         => __('All Entity Types', '${config.textDomain}'),
            'edit_item'         => __('Edit Entity Type', '${config.textDomain}'),
            'update_item'       => __('Update Entity Type', '${config.textDomain}'),
            'add_new_item'      => __('Add New Entity Type', '${config.textDomain}'),
            'new_item_name'     => __('New Entity Type Name', '${config.textDomain}'),
            'menu_name'         => __('Entity Types', '${config.textDomain}'),
        ];

        $args = [
            'hierarchical'      => true,
            'labels'            => $labels,
            'show_ui'           => true,
            'show_admin_column' => true,
            'query_var'         => true,
            'show_in_rest'      => true,
            'rewrite'           => ['slug' => '${slug}-type'],
        ];

        register_taxonomy('${slug.replace(/-/g, '_').slice(0, 16)}_type', ['${slug.replace(/-/g, '_').slice(0, 20)}'], $args);
    }
}
`;
      files.push({
        path: `includes/class-custom-post-type.php`,
        name: 'class-custom-post-type.php',
        language: 'php',
        content: cptContent,
        description: 'Object-oriented Custom Post Type and Taxonomy registration with full REST API support.'
      });
    }

    // 7. REST API Controller Class
    if (config.includeRestApi) {
      const restContent = `<?php
${strictHeader}namespace ${ns};

if (!defined('ABSPATH')) {
    exit;
}

use WP_REST_Request;
use WP_REST_Response;
use WP_Error;

/**
 * REST API Controller: Registers protected and public endpoints under /wp-json/${slug}/v1/
 */
final class RestApi {
    public static function register_routes(): void {
        $namespace = '${slug}/v1';

        register_rest_route($namespace, '/status', [
            'methods'             => 'GET',
            'callback'            => [self::class, 'get_status'],
            'permission_callback' => '__return_true',
        ]);

        register_rest_route($namespace, '/telemetry', [
            'methods'             => 'POST',
            'callback'            => [self::class, 'record_telemetry'],
            'permission_callback' => [self::class, 'check_write_permissions'],
            'args'                => [
                'event' => [
                    'required'          => true,
                    'type'              => 'string',
                    'sanitize_callback' => 'sanitize_key',
                    'validate_callback' => function ($param) {
                        return is_string($param) && strlen($param) <= 64;
                    },
                ],
                'payload' => [
                    'required'          => false,
                    'type'              => 'object',
                    'default'           => [],
                ],
            ],
        ]);
    }

    public static function get_status(WP_REST_Request $request): WP_REST_Response {
        return new WP_REST_Response([
            'status'     => 'online',
            'version'    => ${prefix}VERSION,
            'timestamp'  => time(),
            'engine'     => '${config.pluginName}',
        ], 200);
    }

    public static function record_telemetry(WP_REST_Request $request): WP_REST_Response|WP_Error {
        $event = $request->get_param('event');
        $payload = $request->get_param('payload');

        // Execute enterprise logic here
        return new WP_REST_Response([
            'success'   => true,
            'event'     => $event,
            'received'  => time(),
        ], 201);
    }

    public static function check_write_permissions(): bool {
        return current_user_can('manage_options');
    }
}
`;
      files.push({
        path: `includes/class-rest-api.php`,
        name: 'class-rest-api.php',
        language: 'php',
        content: restContent,
        description: 'REST API Controller with structured route registration, schema validation, and permission callbacks.'
      });
    }

    // 8. Admin Assets (JS & CSS)
    if (config.includeAdminAssets) {
      const jsContent = `/**
 * ${config.pluginName} Admin Controller
 * High-performance vanilla JavaScript with native fetch and CSRF nonces.
 */
(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {
        const testBtn = document.getElementById('${slug}-test-ajax-btn');
        const feedback = document.getElementById('${slug}-ajax-feedback');

        if (!testBtn || !feedback) {
            return;
        }

        testBtn.addEventListener('click', async function (e) {
            e.preventDefault();
            testBtn.disabled = true;
            feedback.style.color = '#0284c7';
            feedback.textContent = window.${prefix}CONFIG?.i18n?.processing || 'Connecting...';

            try {
                const formData = new URLSearchParams();
                formData.append('action', '${slug}_ping');
                formData.append('security', window.${prefix}CONFIG?.nonce || '');
                formData.append('origin', 'settings_view_diagnostic');

                const response = await fetch(window.${prefix}CONFIG?.ajaxUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    },
                    body: formData.toString(),
                });

                const data = await response.json();

                if (data.success) {
                    feedback.style.color = '#16a34a';
                    feedback.textContent = \`✓ Nonce Verified! Latency: Server memory usage: \${data.data.memory_mb} MB | Status: \${data.data.status}\`;
                } else {
                    feedback.style.color = '#dc2626';
                    feedback.textContent = \`✗ Error: \${data.data?.message || 'Verification rejected.'}\`;
                }
            } catch (err) {
                feedback.style.color = '#dc2626';
                feedback.textContent = \`✗ Connection Failure: \${err.message}\`;
            } finally {
                testBtn.disabled = false;
            }
        });
    });
})();
`;
      files.push({
        path: `assets/js/admin.js`,
        name: 'admin.js',
        language: 'javascript',
        content: jsContent,
        description: 'Vanilla ES6 JavaScript asset managing AJAX verification with CSRF protection.'
      });

      const cssContent = `/**
 * ${config.pluginName} Admin Styles
 * Scoped strictly to plugin admin wrapper to avoid CSS pollution.
 */
.${slug}-admin-wrap {
    margin: 20px 20px 0 2px;
}

.${slug}-admin-wrap .card {
    background: #ffffff;
    border: 1px solid #c3c4c7;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

.${slug}-admin-wrap h1 {
    font-weight: 700;
    color: #1d2327;
}

.${slug}-admin-wrap .form-table th {
    font-weight: 600;
    width: 220px;
}

#${slug}-ajax-feedback {
    min-height: 20px;
    transition: all 0.2s ease-in-out;
}
`;
      files.push({
        path: `assets/css/admin.css`,
        name: 'admin.css',
        language: 'css',
        content: cssContent,
        description: 'Clean scoped admin stylesheet styled for WordPress core aesthetics.'
      });
    }

    // 9. Uninstall Script
    if (config.includeUninstallScript) {
      const uninstallContent = `<?php
/**
 * Fired when the plugin is deleted via the WordPress admin.
 * Security barrier prevents direct execution from web browsers.
 */

${strictHeader}if (!defined('WP_UNINSTALL_PLUGIN')) {
    exit;
}

// Security: Verify current user possesses administrator permissions
if (!current_user_can('activate_plugins')) {
    exit;
}

// 1. Delete plugin configuration settings from wp_options
delete_option('${slug}_settings');

// 2. Clean up transient cache keys
delete_transient('${slug}_flush_rewrite_rules');
delete_transient('${slug}_telemetry_cache');

// 3. Clear scheduled cron hooks
wp_clear_scheduled_hook('${slug}_daily_maintenance_cron');

// Note: To protect against catastrophic data loss during accidental deletions,
// custom post type rows and custom taxonomy terms are preserved by default.
// If an exhaustive database purge is required, execute custom SQL table drops here.
`;
      files.push({
        path: `uninstall.php`,
        name: 'uninstall.php',
        language: 'php',
        content: uninstallContent,
        description: 'Dedicated uninstall file wiping orphaned options without leaving residual database bloat.'
      });
    }

    // 10. Developer README
    const readmeContent = `# ${config.pluginName}

> ${config.description}

Generated via the **WordPress Custom Plugin Boilerplate Generator** by [Sheharyar Siraj](https://sheharyarsiraj.com).

## Architectural Highlights
- **Object-Oriented Structure**: Strict separation of concerns across Activator, Admin, AJAX, REST API, and Custom Post Type modules.
- **PHP 8.2+ Compatibility**: Typed class properties, strict typing declarations (\`declare(strict_types=1);\`), and memory-conscious execution.
- **Defense-in-Depth Security**: Cryptographic nonce verification, capability checks (\`current_user_can\`), input sanitization (\`sanitize_text_field\`, \`sanitize_key\`), and late output escaping.
- **Zero Frontend Bloat**: Assets are enqueued strictly on the plugin settings page hook, ensuring 0KB impact on frontend Core Web Vitals.
- **Clean Database Footprint**: Settings are stored in \`wp_options\` with autoload explicitly disabled (\`autoload = 'no'\`) to prevent query bloat during WordPress bootstrap.

## Directory Structure
\`\`\`text
${slug}/
├── ${slug}.php                         # Primary plugin orchestrator and bootstrap
├── uninstall.php                      # Hardened cleanup on plugin deletion
├── includes/
${config.includeActivationHooks ? `│   ├── class-activator.php            # Lifecycle activation routines\n│   ├── class-deactivator.php          # Lifecycle deactivation routines\n` : ''}${config.includeSettingsPage ? `│   ├── class-admin.php                # Settings API admin controller\n` : ''}${config.includeAjaxHandler ? `│   ├── class-ajax.php                 # Nonce-verified AJAX dispatcher\n` : ''}${config.includeCustomPostType ? `│   ├── class-custom-post-type.php     # CPT and Taxonomy registration\n` : ''}${config.includeRestApi ? `│   ├── class-rest-api.php             # Namespaced REST API endpoints\n` : ''}${config.includeSettingsPage ? `├── admin/\n│   └── views/\n│       └── settings-page.php          # Settings template view\n` : ''}${config.includeAdminAssets ? `└── assets/\n    ├── css/\n    │   └── admin.css                  # Scoped admin styles\n    └── js/\n        └── admin.js                   # Scoped admin JavaScript\n` : ''}\`\`\`

## Installation Guidelines

### Method 1: WP-CLI (Fastest)
1. Extract the boilerplate ZIP into your WordPress plugins directory:
   \`\`\`bash
   wp plugin install /path/to/${slug}.zip --activate
   \`\`\`
2. Verify active status:
   \`\`\`bash
   wp plugin is-active ${slug} && echo "Active"
   \`\`\`

### Method 2: Manual Staging Upload
1. Extract the folder into \`wp-content/plugins/${slug}/\`.
2. Navigate to **Plugins > Installed Plugins** in the WordPress Dashboard.
3. Click **Activate** beneath **${config.pluginName}**.
4. Configure options under **Settings > ${config.pluginName}**.

## Coding Standards & Quality Verification
This codebase is authored according to **WordPress Coding Standards (WPCS)** and **WordPress VIP Go** enterprise guidelines.
To run automated static analysis:
\`\`\`bash
composer run lint
composer run phpcs
\`\`\`
`;
    files.push({
      path: `README.md`,
      name: 'README.md',
      language: 'markdown',
      content: readmeContent,
      description: 'Comprehensive developer documentation, installation guidelines, and directory tree reference.'
    });

    return files;
  }, [config]);

  // Active File Reference
  const activeFile = useMemo(() => {
    return generatedFiles.find((f) => f.path === activeFilePath) || generatedFiles[0];
  }, [generatedFiles, activeFilePath]);

  // Handle Download Boilerplate as ZIP
  const handleDownloadZip = async () => {
    try {
      setIsZipping(true);
      const zip = new JSZip();
      const folderName = config.pluginSlug || 'custom-plugin';
      const rootFolder = zip.folder(folderName);

      if (rootFolder) {
        generatedFiles.forEach((file) => {
          rootFolder.file(file.path, file.content);
        });

        const content = await zip.generateAsync({ type: 'blob' });
        const downloadUrl = URL.createObjectURL(content);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = `${folderName}.zip`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(downloadUrl);
      }
    } catch (err) {
      console.error('Failed to create plugin ZIP package:', err);
    } finally {
      setIsZipping(false);
    }
  };

  const handleCopyCode = () => {
    if (activeFile) {
      navigator.clipboard.writeText(activeFile.content);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const handleCopyTree = () => {
    const treeText = generatedFiles.map((f) => `  ├── ${f.path}`).join('\n');
    const fullTree = `${config.pluginSlug}/\n${treeText}`;
    navigator.clipboard.writeText(fullTree);
    setCopiedTree(true);
    setTimeout(() => setCopiedTree(false), 2000);
  };

  const pageSchema = generateSchemaGraph('/tools/wordpress-plugin-boilerplate-generator/');

  const faqs = [
    {
      question: 'Why should enterprise WordPress plugins use an object-oriented architecture instead of procedural functions?',
      answer:
        'Procedural WordPress plugins with loose global functions pollute the global namespace, creating severe function collision risks when third-party plugins or theme updates are introduced. An object-oriented structure organizes activation hooks, admin views, REST endpoints, and AJAX dispatchers into distinct, single-responsibility classes under dedicated PHP namespaces. This enables clean autoloading, effortless unit testing with Mockery or Brain Monkey, and predictable maintenance in team environments.'
    },
    {
      question: 'How does this boilerplate prevent wp_options query bloat during WordPress bootstrap?',
      answer:
        'When standard plugins seed default settings using add_option without explicitly setting the autoload flag, WordPress defaults to autoload = yes. On high-traffic stores, hundreds of autoloaded options are bundled into an enormous query on every single request, inflating Redis or Memcached object cache footprints and spiking Time to First Byte (TTFB). This boilerplate explicitly passes autoload = no on activation, ensuring plugin settings are fetched only on pages where they are actively needed.'
    },
    {
      question: 'Why is check_ajax_referer insufficient without an explicit current_user_can check?',
      answer:
        'Nonces in WordPress are cryptographic CSRF tokens, not authorization credentials. A valid nonce verifies that an action was intentionally triggered from an authorized browser session, but it does not verify whether that user has administrative privileges. Without an explicit current_user_can check (such as manage_options), any logged-in subscriber or customer could trigger administrative AJAX routines simply by acquiring a valid public nonce.'
    },
    {
      question: 'What is the performance benefit of scoped admin asset enqueuing?',
      answer:
        'Many commercial plugins enqueue their JavaScript and CSS stylesheets globally on every admin page, causing dashboard slowness and script conflicts across the block editor and WooCommerce order tables. This generator captures the unique $page_hook returned by add_options_page and halts execution if the current hook does not match, ensuring administrative assets are downloaded exclusively on the plugin settings screen.'
    },
    {
      question: 'Why does this boilerplate flush rewrite rules via transients instead of raw activation execution?',
      answer:
        'Running flush_rewrite_rules during the initial activation request is an expensive database operation that can time out on large sites with thousands of rewrite endpoints. By storing a transient flag (flush_rewrite_rules = 1), the rewrite table rebuild is deferred to the subsequent admin bootstrap, guaranteeing smooth, error-free plugin activation.'
    },
    {
      question: 'How does uninstall.php protect database integrity compared to deactivation hooks?',
      answer:
        'WordPress VIP coding standards strictly mandate that deactivating a plugin must never delete customer data or configuration settings, because site owners frequently deactivate plugins temporarily for troubleshooting. Data cleanup belongs exclusively in uninstall.php, which WordPress executes only when an administrator explicitly clicks Delete. This boilerplate includes a security-hardened uninstall.php file that verifies administrator privileges before wiping plugin records.'
    }
  ];

  return (
    <div className="pt-28 pb-20 px-4 sm:px-8 max-w-7xl mx-auto">
      <SEOHead
        title="WordPress Plugin Boilerplate Generator | Sheharyar"
        description="Generate clean, security-hardened, object-oriented PHP 8.2+ WordPress plugin boilerplates with activation hooks, Settings API, AJAX handlers, and custom post types."
        canonicalUrl="https://sheharyarsiraj.com/tools/wordpress-plugin-boilerplate-generator/"
        schema={pageSchema}
      />

      <Breadcrumbs
        items={[
          { label: 'SYSTEMS & UTILITY TOOLS', href: '/tools/' },
          { label: 'WORDPRESS PLUGIN BOILERPLATE GENERATOR' }
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
            Zero Plugin Bloat
          </span>
          <span className="px-3 py-1 rounded-full bg-surface-2 border border-brand-border/40 text-accent font-mono text-xs font-bold">
            One-Click ZIP Exporter
          </span>
        </div>

        <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-5">
          WordPress Custom Plugin <span className="text-accent">Boilerplate Generator</span>
        </h1>

        <p className="text-brand-secondary text-base sm:text-xl max-w-4xl leading-relaxed font-body">
          Generate clean, security-hardened, object-oriented PHP 8.2+ WordPress plugin boilerplates with modular activation hooks, Settings API options pages, cryptographic AJAX nonces, and custom post types. Download a production-ready ZIP or copy the file structure instantly.
        </p>
      </div>

      {/* Interactive Tool UI: Visual Builder & Code Viewer */}
      <section className="my-8 rounded-3xl glass-panel border border-accent/30 p-6 sm:p-8 bg-surface-1/90 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />

        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-brand-border/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center text-accent">
              <Sliders size={18} />
            </div>
            <div>
              <h2 className="font-heading text-lg sm:text-xl font-bold text-white">
                Plugin Architecture Configurator
              </h2>
              <p className="text-xs font-mono text-brand-muted">
                Configure metadata and modular subsystems. File structure and code recompile in real time.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleDownloadZip}
              disabled={isZipping}
              className="px-4 py-2.5 rounded-xl bg-accent text-black font-mono text-xs font-bold tracking-wider hover:bg-white transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(183,255,60,0.3)] active:scale-95 disabled:opacity-50"
            >
              {isZipping ? (
                <>
                  <RefreshCw size={14} className="animate-spin text-black" />
                  <span>PACKAGING ZIP...</span>
                </>
              ) : (
                <>
                  <Download size={14} />
                  <span>DOWNLOAD BOILERPLATE (.ZIP)</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Form Controls (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Identity Settings */}
            <div className="p-4 sm:p-5 rounded-2xl bg-surface-2/60 border border-brand-border/60 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-accent uppercase tracking-wider">
                <Boxes size={14} />
                <span>Plugin Identity & Naming</span>
              </div>

              <div>
                <label className="block text-xs font-mono text-brand-secondary uppercase mb-1.5 font-semibold">
                  Plugin Name *
                </label>
                <input
                  type="text"
                  value={config.pluginName}
                  onChange={(e) => handleNameChange(e.target.value)}
                  className="w-full bg-surface-1 border border-brand-border/60 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-accent font-mono"
                  placeholder="Acme Enterprise Core"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-brand-secondary uppercase mb-1.5 font-semibold">
                    Plugin Slug *
                  </label>
                  <input
                    type="text"
                    value={config.pluginSlug}
                    onChange={(e) =>
                      setConfig((prev) => ({
                        ...prev,
                        pluginSlug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '')
                      }))
                    }
                    className="w-full bg-surface-1 border border-brand-border/60 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-accent font-mono"
                    placeholder="acme-enterprise-core"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-brand-secondary uppercase mb-1.5 font-semibold">
                    Version
                  </label>
                  <input
                    type="text"
                    value={config.version}
                    onChange={(e) => setConfig((prev) => ({ ...prev, version: e.target.value }))}
                    className="w-full bg-surface-1 border border-brand-border/60 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-accent font-mono"
                    placeholder="1.0.0"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-brand-secondary uppercase mb-1.5 font-semibold">
                    Author Name
                  </label>
                  <input
                    type="text"
                    value={config.authorName}
                    onChange={(e) => setConfig((prev) => ({ ...prev, authorName: e.target.value }))}
                    className="w-full bg-surface-1 border border-brand-border/60 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-accent font-mono"
                    placeholder="Sheharyar Siraj"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-brand-secondary uppercase mb-1.5 font-semibold">
                    Author URI
                  </label>
                  <input
                    type="text"
                    value={config.authorUri}
                    onChange={(e) => setConfig((prev) => ({ ...prev, authorUri: e.target.value }))}
                    className="w-full bg-surface-1 border border-brand-border/60 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-accent font-mono"
                    placeholder="https://sheharyarsiraj.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-brand-secondary uppercase mb-1.5 font-semibold">
                    PHP Namespace
                  </label>
                  <input
                    type="text"
                    value={config.namespace}
                    onChange={(e) => setConfig((prev) => ({ ...prev, namespace: e.target.value }))}
                    className="w-full bg-surface-1 border border-brand-border/60 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-accent font-mono"
                    placeholder="Acme\EnterpriseCore"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-brand-secondary uppercase mb-1.5 font-semibold">
                    Constant Prefix
                  </label>
                  <input
                    type="text"
                    value={config.constantPrefix}
                    onChange={(e) =>
                      setConfig((prev) => ({
                        ...prev,
                        constantPrefix: e.target.value.toUpperCase().replace(/[^A-Z0-9_]/g, '')
                      }))
                    }
                    className="w-full bg-surface-1 border border-brand-border/60 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-accent font-mono"
                    placeholder="ACME_CORE_"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-brand-secondary uppercase mb-1.5 font-semibold">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={config.description}
                  onChange={(e) => setConfig((prev) => ({ ...prev, description: e.target.value }))}
                  className="w-full bg-surface-1 border border-brand-border/60 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-accent font-mono resize-none"
                  placeholder="Security-hardened WordPress plugin boilerplate."
                />
              </div>
            </div>

            {/* Modular Architectural Toggles */}
            <div className="p-4 sm:p-5 rounded-2xl bg-surface-2/60 border border-brand-border/60 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-accent uppercase tracking-wider">
                <Layers size={14} />
                <span>Modular Subsystem Modules</span>
              </div>

              <div className="space-y-3">
                <label className="flex items-start gap-3 p-3 rounded-xl bg-surface-1/80 border border-brand-border/40 hover:border-accent/40 cursor-pointer transition-all">
                  <input
                    type="checkbox"
                    checked={config.includeActivationHooks}
                    onChange={(e) =>
                      setConfig((prev) => ({ ...prev, includeActivationHooks: e.target.checked }))
                    }
                    className="mt-1 w-4 h-4 rounded text-accent focus:ring-accent bg-surface-2 border-brand-border"
                  />
                  <div>
                    <div className="text-xs sm:text-sm font-heading font-bold text-white flex items-center gap-2">
                      <span>Activation & Deactivation Lifecycle</span>
                      <span className="text-[10px] font-mono text-accent bg-accent/10 px-2 py-0.5 rounded">
                        class-activator.php
                      </span>
                    </div>
                    <p className="text-xs text-brand-secondary font-body mt-0.5">
                      Includes version verification, non-autoloaded option seeding, and rewrite flush transients.
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-surface-1/80 border border-brand-border/40 hover:border-accent/40 cursor-pointer transition-all">
                  <input
                    type="checkbox"
                    checked={config.includeSettingsPage}
                    onChange={(e) =>
                      setConfig((prev) => ({ ...prev, includeSettingsPage: e.target.checked }))
                    }
                    className="mt-1 w-4 h-4 rounded text-accent focus:ring-accent bg-surface-2 border-brand-border"
                  />
                  <div>
                    <div className="text-xs sm:text-sm font-heading font-bold text-white flex items-center gap-2">
                      <span>Settings API Options Page</span>
                      <span className="text-[10px] font-mono text-accent bg-accent/10 px-2 py-0.5 rounded">
                        class-admin.php
                      </span>
                    </div>
                    <p className="text-xs text-brand-secondary font-body mt-0.5">
                      Uses register_setting, settings fields, strict sanitization callbacks, and view templates.
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-surface-1/80 border border-brand-border/40 hover:border-accent/40 cursor-pointer transition-all">
                  <input
                    type="checkbox"
                    checked={config.includeAjaxHandler}
                    onChange={(e) =>
                      setConfig((prev) => ({ ...prev, includeAjaxHandler: e.target.checked }))
                    }
                    className="mt-1 w-4 h-4 rounded text-accent focus:ring-accent bg-surface-2 border-brand-border"
                  />
                  <div>
                    <div className="text-xs sm:text-sm font-heading font-bold text-white flex items-center gap-2">
                      <span>Secure AJAX Request Handlers</span>
                      <span className="text-[10px] font-mono text-accent bg-accent/10 px-2 py-0.5 rounded">
                        class-ajax.php
                      </span>
                    </div>
                    <p className="text-xs text-brand-secondary font-body mt-0.5">
                      Enforces check_ajax_referer, current_user_can permissions, and typed wp_send_json responses.
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-surface-1/80 border border-brand-border/40 hover:border-accent/40 cursor-pointer transition-all">
                  <input
                    type="checkbox"
                    checked={config.includeCustomPostType}
                    onChange={(e) =>
                      setConfig((prev) => ({ ...prev, includeCustomPostType: e.target.checked }))
                    }
                    className="mt-1 w-4 h-4 rounded text-accent focus:ring-accent bg-surface-2 border-brand-border"
                  />
                  <div>
                    <div className="text-xs sm:text-sm font-heading font-bold text-white flex items-center gap-2">
                      <span>Custom Post Type & Taxonomy</span>
                      <span className="text-[10px] font-mono text-accent bg-accent/10 px-2 py-0.5 rounded">
                        class-custom-post-type.php
                      </span>
                    </div>
                    <p className="text-xs text-brand-secondary font-body mt-0.5">
                      Registers modern CPTs and hierarchical taxonomies with Gutenberg block editor and REST API.
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-surface-1/80 border border-brand-border/40 hover:border-accent/40 cursor-pointer transition-all">
                  <input
                    type="checkbox"
                    checked={config.includeRestApi}
                    onChange={(e) =>
                      setConfig((prev) => ({ ...prev, includeRestApi: e.target.checked }))
                    }
                    className="mt-1 w-4 h-4 rounded text-accent focus:ring-accent bg-surface-2 border-brand-border"
                  />
                  <div>
                    <div className="text-xs sm:text-sm font-heading font-bold text-white flex items-center gap-2">
                      <span>REST API Custom Endpoints</span>
                      <span className="text-[10px] font-mono text-accent bg-accent/10 px-2 py-0.5 rounded">
                        class-rest-api.php
                      </span>
                    </div>
                    <p className="text-xs text-brand-secondary font-body mt-0.5">
                      Namespaced routes under /wp-json/ with schema validation and strict permission callbacks.
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-surface-1/80 border border-brand-border/40 hover:border-accent/40 cursor-pointer transition-all">
                  <input
                    type="checkbox"
                    checked={config.includeAdminAssets}
                    onChange={(e) =>
                      setConfig((prev) => ({ ...prev, includeAdminAssets: e.target.checked }))
                    }
                    className="mt-1 w-4 h-4 rounded text-accent focus:ring-accent bg-surface-2 border-brand-border"
                  />
                  <div>
                    <div className="text-xs sm:text-sm font-heading font-bold text-white flex items-center gap-2">
                      <span>Scoped Admin JavaScript & CSS</span>
                      <span className="text-[10px] font-mono text-accent bg-accent/10 px-2 py-0.5 rounded">
                        assets/
                      </span>
                    </div>
                    <p className="text-xs text-brand-secondary font-body mt-0.5">
                      Enqueued strictly on the plugin settings screen hook. Includes wp_localize_script nonces.
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-surface-1/80 border border-brand-border/40 hover:border-accent/40 cursor-pointer transition-all">
                  <input
                    type="checkbox"
                    checked={config.includeUninstallScript}
                    onChange={(e) =>
                      setConfig((prev) => ({ ...prev, includeUninstallScript: e.target.checked }))
                    }
                    className="mt-1 w-4 h-4 rounded text-accent focus:ring-accent bg-surface-2 border-brand-border"
                  />
                  <div>
                    <div className="text-xs sm:text-sm font-heading font-bold text-white flex items-center gap-2">
                      <span>Security Hardened uninstall.php</span>
                      <span className="text-[10px] font-mono text-accent bg-accent/10 px-2 py-0.5 rounded">
                        uninstall.php
                      </span>
                    </div>
                    <p className="text-xs text-brand-secondary font-body mt-0.5">
                      Protects against direct execution and purges wp_options records on deletion.
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Minimum System Requirements */}
            <div className="p-4 sm:p-5 rounded-2xl bg-surface-2/60 border border-brand-border/60">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-accent uppercase tracking-wider mb-3">
                <Lock size={14} />
                <span>Runtime Constraints & Standards</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-brand-secondary uppercase mb-1 font-semibold">
                    PHP Version
                  </label>
                  <select
                    value={config.minPhpVersion}
                    onChange={(e) => setConfig((prev) => ({ ...prev, minPhpVersion: e.target.value }))}
                    className="w-full bg-surface-1 border border-brand-border/60 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-accent font-mono"
                  >
                    <option value="8.1">PHP 8.1+</option>
                    <option value="8.2">PHP 8.2+ (Recommended)</option>
                    <option value="8.3">PHP 8.3+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-brand-secondary uppercase mb-1 font-semibold">
                    WordPress Core
                  </label>
                  <select
                    value={config.minWpVersion}
                    onChange={(e) => setConfig((prev) => ({ ...prev, minWpVersion: e.target.value }))}
                    className="w-full bg-surface-1 border border-brand-border/60 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-accent font-mono"
                  >
                    <option value="6.4">WP 6.4+</option>
                    <option value="6.5">WP 6.5+ (Recommended)</option>
                    <option value="6.6">WP 6.6+</option>
                  </select>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-brand-border/40 flex items-center justify-between text-[11px] font-mono text-brand-muted">
                <span>Type Safety Guard:</span>
                <span className="text-accent font-semibold">declare(strict_types=1);</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive File Tree & Code Viewer (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            {/* File Structure Selector Bar */}
            <div className="p-3 sm:p-4 rounded-2xl bg-surface-2/80 border border-brand-border/60">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-brand-border/40">
                <div className="flex items-center gap-2 text-xs font-mono text-white font-bold">
                  <FolderOpen size={15} className="text-accent" />
                  <span>Package Tree ({generatedFiles.length} Files Generated)</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopyTree}
                    className="px-2.5 py-1 rounded-lg bg-surface-1 hover:bg-surface-3 text-[11px] font-mono text-brand-secondary hover:text-white border border-brand-border/50 flex items-center gap-1.5 transition-all"
                  >
                    {copiedTree ? <Check size={12} className="text-accent" /> : <Copy size={12} />}
                    <span>{copiedTree ? 'TREE COPIED' : 'COPY TREE'}</span>
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
                {generatedFiles.map((file) => {
                  const isActive = activeFile.path === file.path;
                  return (
                    <button
                      key={file.path}
                      type="button"
                      onClick={() => setActiveFilePath(file.path)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-2 border ${
                        isActive
                          ? 'bg-accent text-black border-accent font-bold shadow-[0_0_10px_rgba(183,255,60,0.25)]'
                          : 'bg-surface-1 text-brand-secondary border-brand-border/40 hover:text-white hover:border-brand-border'
                      }`}
                    >
                      <FileCode size={13} className={isActive ? 'text-black' : 'text-accent'} />
                      <span>{file.path}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Code Viewer */}
            <div className="rounded-2xl border border-brand-border/70 overflow-hidden bg-[#0a0a0a] flex-1 flex flex-col">
              <div className="px-4 py-3 bg-surface-2/90 border-b border-brand-border/40 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                  <span className="ml-2 text-white font-bold">{activeFile.path}</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[11px] text-accent uppercase font-semibold">
                    {activeFile.language.toUpperCase()}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-surface-1 hover:bg-accent hover:text-black text-xs font-mono text-white transition-all border border-brand-border/60"
                  >
                    {copiedCode ? (
                      <>
                        <Check size={13} className="text-black" />
                        <span className="text-black font-bold">COPIED</span>
                      </>
                    ) : (
                      <>
                        <Copy size={13} />
                        <span>COPY FILE</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="px-4 py-2 bg-surface-1/60 border-b border-brand-border/30 text-[11px] font-mono text-brand-muted">
                {activeFile.description}
              </div>

              <div className="p-4 overflow-x-auto max-h-[580px] min-h-[460px] text-xs font-mono leading-relaxed text-brand-secondary select-all flex-1">
                <pre className="text-emerald-400">
                  <code>{activeFile.content}</code>
                </pre>
              </div>
            </div>

            {/* Diagnostics Telemetry Strip */}
            <div className="p-3.5 rounded-xl bg-surface-2/60 border border-brand-border/40 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center gap-2 text-brand-secondary">
                <CheckCircle2 size={14} className="text-accent" />
                <span>Security Standard: WordPress VIP & Strict Nonce Enforced</span>
              </div>
              <div className="flex items-center gap-3 text-brand-muted text-[11px]">
                <span>Target: wp-content/plugins/{config.pluginSlug}/</span>
                <span className="text-accent font-bold">Autoload: No</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AEO Direct Answer Block */}
      <AeoDirectAnswer
        badge="WORDPRESS PLUGIN ARCHITECTURE VERDICT"
        summary="Building WordPress plugins with an object-oriented architecture and dedicated lifecycle classes eliminates procedural function collisions, enforces cryptographic CSRF nonce verification, and prevents wp_options autoload bloat, producing high-concurrency plugins that execute in sub-millisecond OPCache thresholds."
        keyTakeaways={[
          'Separation of concerns across Activator, Admin, AJAX, and REST classes isolates runtime logic and prevents global scope pollution.',
          'Setting autoload = no for plugin options stops memory bloat during initial WordPress database bootstrap.',
          'Nonces paired with current_user_can checks stop Cross-Site Request Forgery and unauthorized privilege escalation.',
          'Scoped admin asset enqueuing prevents frontend stylesheet injection, protecting Google Core Web Vitals.'
        ]}
      />

      {/* Long-Form Deep Dive Content: SEO, GEO & AIO Optimized */}
      <section className="my-16 space-y-12">
        {/* Essay Section 1 */}
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-brand-border/60">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-xs font-bold uppercase tracking-wider mb-4">
            <Cpu size={13} />
            <span>CORE SYSTEMS ARCHITECTURE</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-5 leading-tight">
            The anatomy of enterprise WordPress plugin architecture
          </h2>

          <div className="space-y-4 text-sm sm:text-base text-brand-secondary font-body leading-relaxed">
            <p>
              In thousands of production WordPress environments, plugin architectural decisions dictate the boundary between high-concurrency stability and crippling server latency. The vast majority of off-the-shelf commercial plugins begin as procedural scripts with sprawling 3,000-line root files. In those monolithic builds, action hooks, database queries, admin screens, and AJAX dispatchers share a single global scope.
            </p>
            <p>
              When an enterprise site grows to incorporate custom business logic, third-party ERP integrations, or high-volume WooCommerce catalogs, procedural plugin code becomes fragile. Naming collisions emerge, automated regression testing becomes impossible, and debugging turns into a race through nested conditional blocks.
            </p>
            <p>
              An enterprise-grade plugin architecture solves this by adhering strictly to the Single Responsibility Principle (SRP) and object-oriented encapsulation. The root plugin file serves purely as an environment validator and autoloader entry point. Activation routines, administrative interfaces, AJAX listeners, and REST controllers reside in dedicated classes under unique PHP namespaces.
            </p>
            <p>
              Once compiled by the PHP 8.2 OPCache engine, an object-oriented class hierarchy executes directly from server memory in fractions of a millisecond. It introduces zero measurable execution penalty while guaranteeing that your plugin can be audited, extended, and version-controlled with complete predictability.
            </p>
          </div>
        </div>

        {/* Essay Section 2: Security & Nonces */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-panel rounded-3xl p-8 border border-brand-border/60 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-5">
                <Lock size={20} />
              </div>
              <h3 className="font-heading text-xl font-bold text-white mb-3">
                Defense-in-depth: Nonce verification and capability barriers
              </h3>
              <p className="text-xs sm:text-sm text-brand-secondary font-body leading-relaxed mb-4">
                The most prevalent security vulnerability in custom WordPress plugins is the conflation of cryptographic nonces with authentication. WordPress nonces are one-time tokens engineered to protect against Cross-Site Request Forgery (CSRF). They verify that an incoming request originated from an active, authorized browser session.
              </p>
              <p className="text-xs sm:text-sm text-brand-secondary font-body leading-relaxed">
                However, a valid nonce does not confirm user authorization. A malicious actor with a basic subscriber account can generate a valid public nonce and transmit it to an administrative AJAX endpoint. True security requires pairing check_ajax_referer with strict user capability checks such as current_user_can('manage_options') before any database mutation or option update occurs.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-brand-border/40 font-mono text-xs text-accent">
              Security Standard: check_ajax_referer + current_user_can Guard
            </div>
          </div>

          <div className="glass-panel rounded-3xl p-8 border border-brand-border/60 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-5">
                <Database size={20} />
              </div>
              <h3 className="font-heading text-xl font-bold text-white mb-3">
                Eradicating wp_options autoload bloat
              </h3>
              <p className="text-xs sm:text-sm text-brand-secondary font-body leading-relaxed mb-4">
                During every single page request, WordPress performs a massive SQL query against wp_options to load all records where autoload equals 'yes'. Poorly engineered plugins save massive arrays, transient logs, and cached API responses into autoloaded options, bloating the alloptions memory payload to multiple megabytes.
              </p>
              <p className="text-xs sm:text-sm text-brand-secondary font-body leading-relaxed">
                This boilerplate establishes strict database hygiene. When seeding configuration defaults during plugin activation, options are created with autoload explicitly set to 'no'. The settings payload is fetched from the database or Redis cache only when an administrator loads the plugin management view, keeping frontend page builds lean.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-brand-border/40 font-mono text-xs text-accent">
              Database Rule: add_option($key, $val, '', 'no')
            </div>
          </div>
        </div>

        {/* Essay Section 3: Avoiding Plugin Bloat & Asset Hygiene */}
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-brand-border/60">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-xs font-bold uppercase tracking-wider mb-4">
            <Zap size={13} />
            <span>PERFORMANCE & CORE WEB VITALS</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-5 leading-tight">
            Eliminating asset pollution and frontend execution overhead
          </h2>

          <div className="space-y-4 text-sm sm:text-base text-brand-secondary font-body leading-relaxed">
            <p>
              A major contributor to poor Google Core Web Vitals (specifically Interaction to Next Paint and Largest Contentful Paint) is asset bleeding. Many commercial plugins register their CSS and JavaScript files on global hooks without verifying the current admin screen or public template.
            </p>
            <p>
              As a result, admin scripts load inside customer checkout pages, and custom Gutenberg block scripts load on pages where the block does not exist. This creates render-blocking stylesheet chains and forces browsers to download redundant JavaScript bundles.
            </p>
            <p>
              The code generated by this boilerplate enforces strict asset scoping. When registering administrative menus via add_options_page, the unique page hook suffix is captured. In the admin_enqueue_scripts handler, script execution halts immediately if the current screen does not match the plugin page. Frontend templates remain completely untouched, ensuring 0KB of residual script overhead for your site visitors.
            </p>
          </div>
        </div>

        {/* Developer Installation & Deployment Protocols */}
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-brand-border/60">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-xs font-bold uppercase tracking-wider mb-4">
            <Terminal size={13} />
            <span>DEVELOPER DEPLOYMENT GUIDE</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-6 leading-tight">
            Step-by-step developer documentation and installation guidelines
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-body text-sm sm:text-base text-brand-secondary">
            <div className="p-6 rounded-2xl bg-surface-2/60 border border-brand-border/40 space-y-3">
              <div className="font-heading text-lg font-bold text-white flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-accent/10 text-accent font-mono text-xs flex items-center justify-center font-bold">
                  01
                </span>
                <span>Generate and Extract Package</span>
              </div>
              <p className="text-xs sm:text-sm text-brand-secondary leading-relaxed">
                Use the one-click ZIP exporter above to download your custom configured plugin archive. Extract the contents directly into your local or staging environment under <code className="text-accent font-mono">wp-content/plugins/{config.pluginSlug}/</code>.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-surface-2/60 border border-brand-border/40 space-y-3">
              <div className="font-heading text-lg font-bold text-white flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-accent/10 text-accent font-mono text-xs flex items-center justify-center font-bold">
                  02
                </span>
                <span>Activate via WP-CLI or Dashboard</span>
              </div>
              <p className="text-xs sm:text-sm text-brand-secondary leading-relaxed">
                Activate the plugin cleanly from your command line:
                <br />
                <code className="text-emerald-400 font-mono text-xs block mt-1.5 p-2 rounded bg-black/60 border border-brand-border/40">
                  wp plugin activate {config.pluginSlug}
                </code>
                The activation routine checks minimum PHP versions and registers default settings.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-surface-2/60 border border-brand-border/40 space-y-3">
              <div className="font-heading text-lg font-bold text-white flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-accent/10 text-accent font-mono text-xs flex items-center justify-center font-bold">
                  03
                </span>
                <span>Configure Settings API Fields</span>
              </div>
              <p className="text-xs sm:text-sm text-brand-secondary leading-relaxed">
                Log into WordPress admin and navigate to <code className="text-accent font-mono">Settings &gt; {config.pluginName}</code>. Customize API modes and operational rates. All values pass through strict sanitization callbacks before committing to database storage.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-surface-2/60 border border-brand-border/40 space-y-3">
              <div className="font-heading text-lg font-bold text-white flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-accent/10 text-accent font-mono text-xs flex items-center justify-center font-bold">
                  04
                </span>
                <span>Extend with Custom Hooks & REST Routes</span>
              </div>
              <p className="text-xs sm:text-sm text-brand-secondary leading-relaxed">
                Add domain-specific business logic inside <code className="text-accent font-mono">includes/</code>. Use the namespaced REST API controller to expose authenticated webhooks to n8n workflows, CRM pipelines, or mobile endpoints.
              </p>
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
            Frequently Asked Questions on Plugin Architecture
          </h2>
          <p className="text-sm text-brand-secondary font-body">
            Engineering specifics regarding OOP patterns, memory limits, nonce verification, and multisite compatibility.
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
            <span>CUSTOM ENTERPRISE WORDPRESS ENGINEERING</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-white mb-4">
            Need custom enterprise plugins or systems integration engineered?
          </h2>

          <p className="text-sm sm:text-base text-brand-secondary font-medium leading-relaxed mb-6 font-body">
            I architect high-concurrency custom WordPress plugins, headless REST APIs, event-driven n8n webhook pipelines, and bespoke WooCommerce extensions for digital agencies and enterprise brands worldwide.
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              type="button"
              onClick={onOpenInquiry}
              className="px-6 py-3.5 rounded-xl bg-accent text-black font-mono text-xs font-bold tracking-wider hover:bg-white transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(183,255,60,0.25)] active:scale-95"
            >
              <span>DISCUSS PLUGIN ARCHITECTURE</span>
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

export default WordpressPluginBoilerplateGeneratorPage;
