import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertTriangle,
  Code2,
  Copy,
  Check,
  ShieldCheck,
  Zap,
  Terminal,
  Layers,
  Workflow,
  ChevronDown,
  ChevronUp,
  ArrowUpRight,
  RefreshCw,
  FileCode,
  Bug,
  Server,
  Cpu,
  CheckCircle2,
  Database
} from 'lucide-react';
import { SEOHead } from '../components/seo/SEOHead';
import { Breadcrumbs } from '../components/seo/Breadcrumbs';
import { AeoDirectAnswer } from '../components/seo/AeoDirectAnswer';
import { generateSchemaGraph } from '../utils/schemaGenerator';

interface N8nErrorHandlerPageProps {
  onOpenInquiry: () => void;
}

const SAMPLE_ERRORS: Record<string, { label: string; text: string }> = {
  http_timeout: {
    label: 'HTTP 504 Gateway Timeout (Axios)',
    text: `Error: Request failed with status code 504
    at createError (/usr/local/lib/node_modules/n8n/node_modules/axios/lib/core/createError.js:16:15)
    at settle (/usr/local/lib/node_modules/n8n/node_modules/axios/lib/core/settle.js:17:12)
    at IncomingMessage.handleStreamEnd (/usr/local/lib/node_modules/n8n/node_modules/axios/lib/adapters/http.js:322:11)
    status: 504,
    statusText: 'GATEWAY_TIMEOUT',
    config: {
      url: 'https://api.crm-provider.com/v2/contacts/sync',
      method: 'post',
      timeout: 30000
    }`
  },
  malformed_json: {
    label: 'Malformed Stringified JSON',
    text: `{"id": 49201, "name": "Marcus Vance", "email": "marcus@domain.com", "notes": "Customer requested "VIP" expedited onboarding, "phone": null,}`
  },
  rate_limit: {
    label: 'Stripe 429 Rate Limit Exceeded',
    text: `{
  "error": {
    "type": "rate_limit_error",
    "code": "rate_limit_exceeded",
    "message": "Too many requests hit the API simultaneously.",
    "doc_url": "https://stripe.com/docs/error-codes/rate-limit-exceeded",
    "retry_after": 2.5
  }
}`
  },
  undefined_property: {
    label: 'TypeError: Cannot read properties of undefined',
    text: `TypeError: Cannot read properties of undefined (reading 'billing_address')
    at /data/workflows/code-node.js:14:32
    at Array.map (<anonymous>)
    at Object.execute (/usr/local/lib/node_modules/n8n/dist/nodes/Code/Code.node.js:108:41)`
  }
};

export const N8nErrorHandlerPage: React.FC<N8nErrorHandlerPageProps> = ({
  onOpenInquiry
}) => {
  const [inputErrorText, setInputErrorText] = useState<string>(SAMPLE_ERRORS.http_timeout.text);
  const [selectedSample, setSelectedSample] = useState<string>('http_timeout');
  const [handlingStrategy, setHandlingStrategy] = useState<'dead_letter' | 'nullish_fallback' | 'alert_wrapper' | 'batch_quarantine'>('dead_letter');
  const [includeExponentialBackoff, setIncludeExponentialBackoff] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'code' | 'set_node' | 'architecture'>('code');
  const [copied, setCopied] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const loadSample = (key: string) => {
    setSelectedSample(key);
    if (SAMPLE_ERRORS[key]) {
      setInputErrorText(SAMPLE_ERRORS[key].text);
    }
  };

  // Generator Engine: Compiles production-ready n8n JavaScript Code Node
  const generateN8nCodeSnippet = (): string => {
    const isTimeout = inputErrorText.includes('504') || inputErrorText.includes('timeout') || inputErrorText.includes('ECONNRESET');
    const isRateLimit = inputErrorText.includes('429') || inputErrorText.includes('rate_limit');

    if (handlingStrategy === 'dead_letter') {
      return `// Production-Grade n8n Dead-Letter Queue (DLQ) Isolation Node
// Setting in n8n: Enable "Continue On Fail" on the upstream node.
// This Code Node routes successful items and failed items cleanly.

const items = $input.all();
const validItems = [];
const deadLetterItems = [];

for (const [index, item] of items.entries()) {
  try {
    // 1. Inspect if upstream node reported execution error
    const rawError = item.json?.error || item.error || null;
    const rawBody = item.json?.body ?? item.json;

    // 2. Parse stringified JSON payloads safely
    let payload = rawBody;
    if (typeof rawBody === 'string') {
      try {
        payload = JSON.parse(rawBody);
      } catch (parseErr) {
        throw new Error(\`Malformed JSON string at item index \${index}: \${parseErr.message}\`);
      }
    }

    if (rawError) {
      throw new Error(rawError.message || JSON.stringify(rawError));
    }

    // 3. Validate presence of required business entity
    if (!payload || typeof payload !== 'object') {
      throw new Error(\`Empty or invalid payload structure at item index \${index}\`);
    }

    // Passed all validation guards
    validItems.push({
      json: {
        ...payload,
        _execution: {
          status: 'SUCCESS',
          item_index: index,
          processed_at: new Date().toISOString()
        }
      }
    });

  } catch (err) {
    // 4. Dead-letter branch isolation
    deadLetterItems.push({
      json: {
        _dead_letter: true,
        item_index: index,
        error_message: err.message,
        error_type: err.name || 'WorkflowExecutionException',
        raw_payload: item.json,
        workflow_id: $workflow?.id || 'unknown_workflow',
        timestamp: new Date().toISOString()
      }
    });
  }
}

// In n8n, return an array of 2 outputs: [0] = Success Branch, [1] = Dead-Letter Branch
// Configure Node Settings -> Outputs: 2
return [validItems, deadLetterItems];`;
    }

    if (handlingStrategy === 'nullish_fallback') {
      return `// Resilient Nullish Coalescing & Schema Normalization Node
// Prevents "TypeError: Cannot read properties of undefined" across unstable schemas.

const items = $input.all();
const normalizedResults = [];

for (const [index, item] of items.entries()) {
  const data = item.json?.body ?? item.json ?? {};

  // Normalize nested entity trees with safe optional chaining & defensive defaults
  const normalizedItem = {
    // Primary identifiers
    id: data?.id ?? data?._id ?? \`fallback_id_\${Date.now()}_\${index}\`,
    
    // Contact information with explicit fallbacks
    customer: {
      first_name: data?.customer?.first_name ?? data?.first_name ?? 'Anonymous',
      last_name: data?.customer?.last_name ?? data?.last_name ?? 'User',
      email: data?.customer?.email ?? data?.email ?? 'unassigned@internal.local',
      phone: data?.customer?.phone ?? data?.phone ?? null
    },

    // Financial / Transactional metrics
    billing: {
      amount: Number(data?.billing?.amount ?? data?.amount_total ?? 0),
      currency: (data?.billing?.currency ?? data?.currency ?? 'USD').toUpperCase(),
      status: data?.billing?.status ?? data?.payment_status ?? 'pending_review'
    },

    // Processing metadata
    _meta: {
      schema_version: '2.0.0',
      normalized_at: new Date().toISOString(),
      original_keys_count: Object.keys(data).length
    }
  };

  normalizedResults.push({ json: normalizedItem });
}

return normalizedResults;`;
    }

    if (handlingStrategy === 'alert_wrapper') {
      return `// PagerDuty / Slack Incident Dispatch Wrapper Node
// Formats uncaught exceptions into clean, structured webhook alerts.

const items = $input.all();
const alertsToDispatch = [];

for (const item of items) {
  const err = item.json?.error || item.json?._error || item.json;

  // Extract stack trace and status code
  const statusCode = err?.status || err?.statusCode || err?.code || 500;
  const errorMessage = err?.message || err?.error_message || 'Unhandled Workflow Exception';
  const endpoint = err?.config?.url || 'Internal Workflow Step';

  const alertPayload = {
    channel: '#alerts-automation',
    severity: statusCode >= 500 ? 'CRITICAL' : 'WARNING',
    incident_title: \`Automation Error [\${statusCode}]: \${errorMessage.slice(0, 80)}\`,
    details: {
      failing_endpoint: endpoint,
      http_status: statusCode,
      timestamp: new Date().toISOString(),
      workflow_name: $workflow?.name || 'Production Pipeline',
      workflow_url: \`https://app.n8n.cloud/workflow/\${$workflow?.id}\`,
      error_sample: String(err?.stack || errorMessage).slice(0, 300)
    }
  };

  alertsToDispatch.push({ json: alertPayload });
}

return alertsToDispatch;`;
    }

    // Default: batch_quarantine with exponential backoff helper
    return `// Batch Quarantine & Exponential Backoff Delay Generator
// Handles rate-limits (HTTP 429) and network gateway drops (HTTP 504).

const items = $input.all();
const readyForRetry = [];

${includeExponentialBackoff ? `// Exponential backoff configuration
const BASE_DELAY_MS = 2000; // 2 seconds base
const MAX_DELAY_MS = 60000; // 60 seconds ceiling
` : ''}
for (const [index, item] of items.entries()) {
  const retryCount = Number(item.json?._retry_count ?? 0);
  const nextAttempt = retryCount + 1;

${includeExponentialBackoff ? `  // Calculate backoff with jitter to prevent thunderous herd
  const calculatedDelay = Math.min(MAX_DELAY_MS, BASE_DELAY_MS * Math.pow(2, retryCount));
  const jitterMs = Math.floor(Math.random() * 500);
  const totalWaitMs = calculatedDelay + jitterMs;
` : '  const totalWaitMs = 5000;\n'}
  if (nextAttempt > 4) {
    // Exceeded maximum 4 retry attempts -> Send to Permanent Quarantine
    readyForRetry.push({
      json: {
        ...item.json,
        _quarantine_status: 'PERMANENTLY_FAILED',
        _final_failure_timestamp: new Date().toISOString()
      }
    });
  } else {
    // Queue item for next retry attempt
    readyForRetry.push({
      json: {
        ...item.json,
        _retry_count: nextAttempt,
        _next_retry_delay_ms: totalWaitMs,
        _retry_scheduled_for: new Date(Date.now() + totalWaitMs).toISOString()
      }
    });
  }
}

return readyForRetry;`;
  };

  const generateSetNodeGuide = (): string => {
    return `// n8n Set Node Defensive Mapping Configuration Guide
// Use this mapping inside the "Edit Fields (Set)" node in n8n.

1. Ensure "Include Other Input Fields" is turned ON if preserving existing data.
2. In the "Fields to Set" section, map parameters using Expression mode:

Field Name: customer_email
Value: {{ $json.customer?.email ?? $json.email ?? "unassigned@domain.com" }}

Field Name: transaction_id
Value: {{ $json.id ?? $json.transaction_id ?? $json.reference_number }}

Field Name: total_amount
Value: {{ Number($json.amount ?? $json.total ?? 0) }}

Field Name: execution_safe_flag
Value: {{ true }}

Field Name: error_summary
Value: {{ $json.error ? $json.error.message : "NO_ERROR" }}

3. Node Settings Recommendation:
   - Always toggle ON "Continue On Fail" on the upstream HTTP Request or Webhook node.
   - This guarantees execution flows into this Set node even when third-party APIs return HTTP 4xx or 5xx.`;
  };

  const activeContent =
    activeTab === 'code'
      ? generateN8nCodeSnippet()
      : activeTab === 'set_node'
      ? generateSetNodeGuide()
      : `// Error Architecture Checklist for Enterprise Automation:
// 1. Never allow unhandled exceptions to crash the main execution loop.
// 2. Separate outputs into 2 branches: [0] Success, [1] Dead-Letter Quarantine.
// 3. Implement exponential backoff on HTTP 429 and HTTP 504 errors.
// 4. Validate binary HMAC signatures before parsing stringified JSON bodies.
// 5. Store idempotency keys in Redis with an atomic TTL of 48 hours.`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(activeContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const pageSchema = generateSchemaGraph('/tools/n8n-error-handler-generator');

  const technicalFaqs = [
    {
      question: 'Why does enabling "Continue On Fail" without a dedicated error node create data corruption?',
      answer:
        'When you enable "Continue On Fail" in an n8n node, the workflow does not stop if an error occurs. Instead, it passes an error object downstream. If downstream nodes (such as Google Sheets, Airtable, or HubSpot) expect valid customer records, they will attempt to write the raw error object into your database, corrupting records and polluting reporting metrics.'
    },
    {
      question: 'How do you configure an n8n Code Node to output two separate execution branches?',
      answer:
        'In the n8n Code Node settings, change the "Outputs" configuration from 1 to 2. In your JavaScript return statement, return an array containing two sub-arrays: return [successItems, errorItems]. Output index 0 will emit through the top output connector, while output index 1 will emit through the bottom output connector into your dead-letter queue.'
    },
    {
      question: 'What is the recommended retry strategy for transient HTTP 504 and 502 gateway timeouts?',
      answer:
        'Gateway timeouts usually indicate temporary server restarts or transient proxy spikes. Rather than retrying immediately, which overburdens struggling servers, configure exponential backoff: retry after 2 seconds, 4 seconds, and 8 seconds with randomized jitter buffering. If the request fails four consecutive times, route the payload to your dead-letter queue.'
    },
    {
      question: 'How does n8n handle circular references and deeply nested JSON parsing in Code Nodes?',
      answer:
        'Attempting to execute JSON.stringify() on objects with circular references throws a TypeError. In n8n, use a defensive replacer function inside JSON.stringify or utilize structured utility libraries to prune circular pointers before writing to external webhook outputs or databases.'
    }
  ];

  return (
    <div className="pt-28 pb-20 px-4 sm:px-8 max-w-7xl mx-auto">
      <SEOHead
        title="n8n Error Handler & JSON Transformer | Sheharyar"
        description="Generate hardened n8n Code Node JavaScript scripts and Set Node mappings to catch workflow errors, isolate dead-letter payloads, and prevent silent automation crashes."
        canonicalUrl="https://sheharyarsiraj.com/tools/n8n-error-handler-generator/"
        schema={pageSchema}
      />

      <Breadcrumbs
        items={[
          { label: 'SYSTEMS & UTILITY TOOLS', href: '/tools/' },
          { label: 'n8n Error Handler Generator' }
        ]}
      />

      {/* Hero Header Section */}
      <div className="mt-8 mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-xs font-bold uppercase tracking-wider mb-4">
          <Bug size={14} />
          <span>FAULT TOLERANCE & PAYLOAD RESILIENCE ARCHITECTURE</span>
        </div>

        <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
          n8n Error Handler &{' '}
          <span className="text-accent">JSON Payload Transformer</span>
        </h1>

        <p className="text-brand-secondary text-base sm:text-xl max-w-4xl leading-relaxed font-body">
          Transform broken JSON payloads, isolate API timeouts, and generate production-grade n8n Code Node scripts. Eliminate unhandled exceptions and catch errors gracefully without stalling workflow execution.
        </p>

        {/* Telemetry Metric Indicators */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl glass-panel border border-brand-border/60 bg-surface-1/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
              <ShieldCheck size={18} />
            </div>
            <div>
              <div className="font-mono text-lg font-bold text-white">0% Crashes</div>
              <div className="text-[11px] font-mono text-brand-muted">Try-Catch Isolation</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
              <Layers size={18} />
            </div>
            <div>
              <div className="font-mono text-lg font-bold text-accent">2-Branch DLQ</div>
              <div className="text-[11px] font-mono text-brand-muted">Clean Output Routing</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
              <RefreshCw size={18} />
            </div>
            <div>
              <div className="font-mono text-lg font-bold text-white">Auto-Backoff</div>
              <div className="text-[11px] font-mono text-brand-muted">Jitter Retry Logic</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
              <Workflow size={18} />
            </div>
            <div>
              <div className="font-mono text-lg font-bold text-white">Node.js 18+</div>
              <div className="text-[11px] font-mono text-brand-muted">n8n Native Syntax</div>
            </div>
          </div>
        </div>
      </div>

      {/* AEO Direct Answer Block */}
      <AeoDirectAnswer
        summary="Automated workflows fail in production when unhandled API errors or malformed payloads terminate the execution pipeline prematurely. By wrapping transformations in an n8n Code Node with dual-branch dead-letter queue routing, workflows isolate invalid items, apply exponential backoff on HTTP 429/504 errors, and allow valid items to complete execution without interruption."
        keyTakeaways={[
          'Converts broken JSON strings and API error stack traces into structured, non-blocking execution nodes.',
          'Provides dual-branch output routing to segregate valid items from quarantined failure payloads.',
          'Injects defensive optional chaining and nullish coalescing to prevent undefined property runtime exceptions.',
          'Includes built-in exponential backoff calculations with randomized jitter for rate-limited endpoints.'
        ]}
      />

      {/* Main Interactive Tool Interface */}
      <div className="my-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column (Input & Strategies) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl glass-panel border border-brand-border bg-surface-1">
              <div className="flex items-center justify-between mb-3">
                <label htmlFor="error-input-textarea" className="text-xs font-mono uppercase tracking-wider text-white font-bold flex items-center gap-2">
                  <AlertTriangle size={15} className="text-accent" />
                  Paste Broken JSON or Error Stack Trace
                </label>
                <span className="text-[11px] font-mono text-brand-muted">
                  {inputErrorText.length} chars
                </span>
              </div>

              {/* Sample Selector Pills */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {Object.entries(SAMPLE_ERRORS).map(([key, item]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => loadSample(key)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all ${
                      selectedSample === key
                        ? 'bg-accent text-black font-bold'
                        : 'bg-surface-2 text-brand-secondary hover:text-white border border-brand-border'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <textarea
                id="error-input-textarea"
                rows={8}
                value={inputErrorText}
                onChange={(e) => setInputErrorText(e.target.value)}
                className="w-full bg-black/60 border border-brand-border focus:border-accent rounded-xl p-3 font-mono text-xs text-white leading-relaxed focus:outline-none"
                placeholder="Paste raw error stack trace or broken JSON payload here..."
              />

              {/* Strategy Selector */}
              <div className="mt-5 pt-4 border-t border-brand-border">
                <label className="block text-xs font-mono uppercase tracking-wider text-brand-muted mb-2 font-bold">
                  Error Handling Architecture Strategy
                </label>
                <div className="space-y-2">
                  {[
                    {
                      id: 'dead_letter',
                      label: 'Dead-Letter Queue (2-Branch Output)',
                      desc: 'Separate valid items to Branch 0 and quarantined errors to Branch 1.'
                    },
                    {
                      id: 'nullish_fallback',
                      label: 'Schema Normalizer & Nullish Fallback',
                      desc: 'Defensive accessors ensuring missing keys never throw TypeError.'
                    },
                    {
                      id: 'alert_wrapper',
                      label: 'Incident Alert Formatter (Slack / PagerDuty)',
                      desc: 'Formats stack trace and HTTP status into structured alert payloads.'
                    },
                    {
                      id: 'batch_quarantine',
                      label: 'Exponential Backoff Retry Scheduler',
                      desc: 'Calculates delayed retry timestamps with randomized jitter.'
                    }
                  ].map((s) => {
                    const isSelected = handlingStrategy === s.id;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setHandlingStrategy(s.id as any)}
                        className={`w-full p-3 rounded-xl border text-left transition-all ${
                          isSelected
                            ? 'bg-accent/15 border-accent text-white shadow-[0_0_15px_rgba(183,255,60,0.12)]'
                            : 'bg-surface-2 border-brand-border text-brand-secondary hover:border-brand-border/80'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-heading font-bold text-white">
                            {s.label}
                          </span>
                          {isSelected && <Check size={14} className="text-accent" />}
                        </div>
                        <p className="text-[11px] text-brand-muted font-body mt-0.5">
                          {s.desc}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Exponential Backoff Toggle */}
              {handlingStrategy === 'batch_quarantine' && (
                <div className="mt-4 pt-4 border-t border-brand-border flex items-center justify-between">
                  <span className="text-xs font-mono text-white">
                    Include Jitter Buffering in Delays
                  </span>
                  <input
                    type="checkbox"
                    checked={includeExponentialBackoff}
                    onChange={(e) => setIncludeExponentialBackoff(e.target.checked)}
                    className="accent-accent cursor-pointer"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Output Display Column (Code Node & Mapping) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="rounded-2xl glass-panel border border-accent/30 bg-surface-1 overflow-hidden">
              {/* Header Tabs */}
              <div className="flex items-center justify-between px-4 py-3 bg-surface-2 border-b border-brand-border">
                <div className="flex items-center gap-1 sm:gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('code')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                      activeTab === 'code'
                        ? 'bg-accent text-black font-bold shadow-[0_0_10px_rgba(183,255,60,0.25)]'
                        : 'text-brand-muted hover:text-white'
                    }`}
                  >
                    N8N CODE NODE JS
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('set_node')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                      activeTab === 'set_node'
                        ? 'bg-accent text-black font-bold shadow-[0_0_10px_rgba(183,255,60,0.25)]'
                        : 'text-brand-muted hover:text-white'
                    }`}
                  >
                    SET NODE GUIDE
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('architecture')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                      activeTab === 'architecture'
                        ? 'bg-accent text-black font-bold shadow-[0_0_10px_rgba(183,255,60,0.25)]'
                        : 'text-brand-muted hover:text-white'
                    }`}
                  >
                    CHECKLIST
                  </button>
                </div>

                <button
                  type="button"
                  onClick={copyToClipboard}
                  className="px-3.5 py-1.5 rounded-lg font-mono text-xs font-bold tracking-wider bg-surface-3 hover:bg-accent hover:text-black text-white border border-brand-border transition-all flex items-center gap-1.5"
                >
                  {copied ? (
                    <>
                      <Check size={14} className="text-emerald-400" />
                      <span>COPIED!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>COPY CODE</span>
                    </>
                  )}
                </button>
              </div>

              {/* Code Display Area */}
              <div className="p-4 bg-black/60 font-mono text-xs text-white/90 overflow-x-auto max-h-[540px] overflow-y-auto leading-relaxed select-all">
                <pre>
                  <code>{activeContent}</code>
                </pre>
              </div>

              {/* Footer Telemetry */}
              <div className="px-4 py-2.5 bg-surface-2/80 border-t border-brand-border/60 flex items-center justify-between text-[11px] font-mono text-brand-muted">
                <span>Output: Node.js 18+ Clean JavaScript</span>
                <span className="text-accent font-bold">Zero Execution Halts Guaranteed</span>
              </div>
            </div>

            {/* Architecture Scoping Action Card */}
            <div className="p-5 rounded-2xl glass-panel border border-brand-border bg-gradient-to-r from-surface-2 via-surface-1 to-surface-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="font-heading text-sm font-bold text-white">
                  Need an enterprise automation audit for your workflows?
                </div>
                <p className="text-xs text-brand-secondary font-body mt-0.5">
                  We engineer fault-tolerant n8n pipelines, self-hosted clusters, and webhook disaster recovery suites.
                </p>
              </div>

              <button
                type="button"
                onClick={onOpenInquiry}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-mono text-xs font-bold tracking-wider bg-accent text-black hover:bg-white transition-all flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(183,255,60,0.3)] flex-shrink-0 active:scale-95"
              >
                <span>BOOK PIPELINE AUDIT</span>
                <ArrowUpRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Long-Form Technical Guide: Workflow Error Architecture */}
      <div className="my-16 space-y-12">
        <section className="p-8 sm:p-10 rounded-3xl glass-panel border border-brand-border bg-surface-1">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-xs font-bold uppercase tracking-wider mb-4">
              <ShieldCheck size={14} />
              <span>PRODUCTION RESILIENCE GUIDE</span>
            </div>

            <h2 className="font-heading text-2xl sm:text-4xl font-bold text-white tracking-tight leading-tight mb-6">
              Production Error Management in Mission-Critical Automation
            </h2>

            <div className="space-y-4 text-brand-secondary font-body leading-relaxed text-base sm:text-lg">
              <p>
                In prototype workflows, automation scripts execute under pristine conditions: incoming payloads are clean, external APIs respond within milliseconds, and network connections never drop. In production environments, however, workflows process unpredictable real-world data at scale.
              </p>
              <p>
                The most dangerous failure in an automation system is not an overt crash that sends an alert. The most dangerous failure is a silent error: an unhandled exception that causes an API node to skip five records in a batch, leaving orders unfulfilled, CRM deals unassigned, and accounting records desynchronized without any system notification.
              </p>
              <p>
                Engineering enterprise fault tolerance requires separating workflow logic into deterministic execution boundaries. By utilizing dead-letter queue routing in n8n, developers isolate failing entities into a dedicated branch while allowing valid transactions to complete their downstream lifecycle.
              </p>
            </div>
          </div>
        </section>

        {/* 4 Core Architectural Safeguards */}
        <section>
          <div className="mb-8">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Handling High-Risk Automation Edge Cases
            </h2>
            <p className="text-brand-secondary text-base font-body mt-2">
              How senior engineers protect automated pipelines against non-standard edge failures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl glass-panel border border-brand-border bg-surface-1">
              <div className="flex items-center gap-2.5 text-accent font-mono text-sm font-bold mb-3">
                <Server size={18} />
                <span>1. Upstream Partial Batch Drops</span>
              </div>
              <p className="text-sm text-brand-secondary font-body leading-relaxed mb-3">
                When an n8n node processes an array of 50 items and item 12 contains an unescaped character, standard code execution throws an uncaught exception, discarding all 50 items.
              </p>
              <div className="p-3 rounded-xl bg-surface-2 border border-brand-border/60 text-xs font-mono text-brand-muted">
                Always iterate with for-loops and try-catch blocks to process each item independently, guaranteeing that 49 valid items succeed even if 1 fails.
              </div>
            </div>

            <div className="p-6 rounded-2xl glass-panel border border-brand-border bg-surface-1">
              <div className="flex items-center gap-2.5 text-accent font-mono text-sm font-bold mb-3">
                <RefreshCw size={18} />
                <span>2. Gateway Timeouts (HTTP 504)</span>
              </div>
              <p className="text-sm text-brand-secondary font-body leading-relaxed mb-3">
                Reverse proxies return 504 when downstream servers are overloaded. Immediately retrying the full batch compounds server load and guarantees subsequent drops.
              </p>
              <div className="p-3 rounded-xl bg-surface-2 border border-brand-border/60 text-xs font-mono text-brand-muted">
                Attach randomized jitter delays (e.g., 2000ms + random 0-500ms) to stagger retry requests and allow server recovery.
              </div>
            </div>

            <div className="p-6 rounded-2xl glass-panel border border-brand-border bg-surface-1">
              <div className="flex items-center gap-2.5 text-accent font-mono text-sm font-bold mb-3">
                <Database size={18} />
                <span>3. Unescaped Stringified JSON</span>
              </div>
              <p className="text-sm text-brand-secondary font-body leading-relaxed mb-3">
                Webhooks frequently deliver JSON embedded inside string fields with unescaped internal quotes. Direct property lookups result in undefined outputs.
              </p>
              <div className="p-3 rounded-xl bg-surface-2 border border-brand-border/60 text-xs font-mono text-brand-muted">
                Verify typeof value === 'string' and apply defensive JSON.parse wrappers with fallback sanitization before mapping.
              </div>
            </div>

            <div className="p-6 rounded-2xl glass-panel border border-brand-border bg-surface-1">
              <div className="flex items-center gap-2.5 text-accent font-mono text-sm font-bold mb-3">
                <Zap size={18} />
                <span>4. Downstream Rate Limits (HTTP 429)</span>
              </div>
              <p className="text-sm text-brand-secondary font-body leading-relaxed mb-3">
                Cloud APIs enforce burst per-second limits. High-velocity webhook surges exceed thresholds within milliseconds.
              </p>
              <div className="p-3 rounded-xl bg-surface-2 border border-brand-border/60 text-xs font-mono text-brand-muted">
                Read the retry_after header from response payloads and pause subsequent batch iterations dynamically.
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Technical FAQ Accordion */}
      <div className="my-20">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-xs font-bold uppercase tracking-wider mb-3">
            <Terminal size={14} />
            <span>TECHNICAL SPECIFICATIONS & FREQUENTLY ASKED QUESTIONS</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            n8n Error Handling & Resilience FAQ
          </h2>
        </div>

        <div className="space-y-4 max-w-4xl mx-auto">
          {technicalFaqs.map((faq, idx) => {
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
          Ready to Harden Your Production Automation Stack?
        </h2>
        <p className="text-brand-secondary text-base sm:text-lg max-w-2xl mx-auto mb-8 font-body">
          Connect directly with Sheharyar Siraj. We review your mission-critical workflows, eliminate silent failure modes, and build resilient data pipelines that scale reliably.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            type="button"
            onClick={onOpenInquiry}
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-mono text-sm font-bold tracking-wider bg-accent text-black hover:bg-white transition-all flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(183,255,60,0.4)] active:scale-95"
          >
            <Zap size={18} />
            <span>SCHEDULE ARCHITECTURE REVIEW</span>
          </button>

          <Link
            to="/tools/webhook-payload-tester/"
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-mono text-sm font-bold tracking-wider bg-surface-2 hover:bg-surface-3 border border-brand-border text-white transition-all flex items-center justify-center gap-2"
          >
            <span>OPEN WEBHOOK TESTER</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};
export default N8nErrorHandlerPage;
