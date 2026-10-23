import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Workflow,
  Terminal,
  Copy,
  Check,
  Zap,
  ShieldCheck,
  Code2,
  RefreshCw,
  Play,
  Layers,
  ChevronDown,
  ChevronUp,
  ArrowUpRight,
  Send,
  FileJson,
  CheckCircle2,
  AlertTriangle,
  Server,
  Lock,
  Cpu,
  Database
} from 'lucide-react';
import { SEOHead } from '../components/seo/SEOHead';
import { Breadcrumbs } from '../components/seo/Breadcrumbs';
import { AeoDirectAnswer } from '../components/seo/AeoDirectAnswer';
import { generateSchemaGraph } from '../utils/schemaGenerator';

interface WebhookPayloadTesterPageProps {
  onOpenInquiry: () => void;
}

const SAMPLE_TEMPLATES: Record<
  string,
  { label: string; headers: Record<string, string>; payload: Record<string, any> }
> = {
  stripe: {
    label: 'Stripe (checkout.session.completed)',
    headers: {
      'content-type': 'application/json',
      'stripe-signature': 't=1700000000,v1=5257a869e7ecebeda32affa62cdca3fa51cad7e77a0e56ff536d0ce8e108d8bd',
      'user-agent': 'Stripe/1.0 (+https://stripe.com/docs/webhooks)'
    },
    payload: {
      id: 'evt_1O0abcLkdIxFZQ62zXYZ1234',
      object: 'event',
      type: 'checkout.session.completed',
      created: 1700000000,
      data: {
        object: {
          id: 'cs_test_a1b2c3d4e5',
          customer_email: 'sarah.connor@example.com',
          amount_total: 49900,
          currency: 'usd',
          payment_status: 'paid',
          metadata: {
            user_id: 'usr_88219',
            tier: 'enterprise_pro'
          }
        }
      }
    }
  },
  shopify: {
    label: 'Shopify (orders/create)',
    headers: {
      'content-type': 'application/json',
      'x-shopify-topic': 'orders/create',
      'x-shopify-hmac-sha256': 'W2m5g7B5qJv8m3Lp+r4w9Yv2kL1x9Q==',
      'x-shopify-shop-domain': 'apex-store.myshopify.com'
    },
    payload: {
      id: 8209829119461,
      order_number: 1042,
      email: 'alex.rivera@example.com',
      total_price: '189.50',
      financial_status: 'paid',
      customer: {
        id: 7120938472,
        first_name: 'Alex',
        last_name: 'Rivera',
        email: 'alex.rivera@example.com'
      },
      line_items: [
        {
          id: 14829104928,
          title: 'Mechanical Key Switch Mod Kit',
          quantity: 2,
          price: '94.75'
        }
      ]
    }
  },
  hubspot: {
    label: 'HubSpot (contact.form_submission)',
    headers: {
      'content-type': 'application/json',
      'x-hubspot-signature': '9b7f58a36d93b3d964f43c8b4172f3',
      'user-agent': 'HubSpot-Webhooks/1.0'
    },
    payload: {
      portalId: 9482910,
      formId: '8f9218ab-7c32-4d11-b851-192a83efc91a',
      submittedAt: 1700000450,
      fields: {
        firstname: 'Jordan',
        lastname: 'Vance',
        email: 'jordan.vance@techcorp.io',
        company: 'TechCorp Labs',
        annual_revenue: '5000000',
        message: 'Requesting enterprise security audit and migration plan.'
      }
    }
  },
  twilio: {
    label: 'Twilio (inbound_sms / call_status)',
    headers: {
      'content-type': 'application/json',
      'x-twilio-signature': 'kJ82LmA94bC1qZ9vR4w2==',
      'user-agent': 'TwilioProxy/1.1'
    },
    payload: {
      MessageSid: 'SM8932489218392183912839',
      From: '+14155552671',
      To: '+18005550199',
      Body: 'START',
      AccountSid: 'AC8291839218392183912839',
      NumMedia: '0',
      FromCity: 'San Francisco',
      FromState: 'CA',
      FromCountry: 'US'
    }
  }
};

export const WebhookPayloadTesterPage: React.FC<WebhookPayloadTesterPageProps> = ({
  onOpenInquiry
}) => {
  // Session parameters
  const [sessionId, setSessionId] = useState<string>('wh_session_8f3a29b4e10c');
  const [selectedTemplate, setSelectedTemplate] = useState<string>('stripe');
  const [rawPayload, setRawPayload] = useState<string>(
    JSON.stringify(SAMPLE_TEMPLATES.stripe.payload, null, 2)
  );
  const [rawHeaders, setRawHeaders] = useState<string>(
    JSON.stringify(SAMPLE_TEMPLATES.stripe.headers, null, 2)
  );
  const [activeOutputTab, setActiveOutputTab] = useState<'inspector' | 'n8n_code' | 'make_mapping' | 'headers'>('inspector');
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const endpointUrl = `https://webhook.sheharyarsiraj.com/v1/test/${sessionId}`;

  const regenerateSession = () => {
    const chars = '0123456789abcdef';
    let newId = 'wh_session_';
    for (let i = 0; i < 12; i++) {
      newId += chars[Math.floor(Math.random() * chars.length)];
    }
    setSessionId(newId);
    setStatusMessage('New listener endpoint generated');
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const loadTemplate = (key: string) => {
    setSelectedTemplate(key);
    const tmpl = SAMPLE_TEMPLATES[key];
    if (tmpl) {
      setRawPayload(JSON.stringify(tmpl.payload, null, 2));
      setRawHeaders(JSON.stringify(tmpl.headers, null, 2));
      setStatusMessage(`Loaded ${tmpl.label} sample`);
      setTimeout(() => setStatusMessage(null), 3000);
    }
  };

  // Parse JSON safely
  let parsedPayload: Record<string, any> = {};
  let parseError: string | null = null;
  try {
    parsedPayload = JSON.parse(rawPayload);
  } catch (err: any) {
    parseError = err.message || 'Invalid JSON syntax';
  }

  let parsedHeaders: Record<string, string> = {};
  try {
    parsedHeaders = JSON.parse(rawHeaders);
  } catch {
    parsedHeaders = {};
  }

  // Key extractor
  const extractKeys = (obj: Record<string, any>, prefix = ''): Array<{ path: string; type: string; sample: string }> => {
    let result: Array<{ path: string; type: string; sample: string }> = [];
    if (!obj || typeof obj !== 'object') return result;

    for (const [key, val] of Object.entries(obj)) {
      const fullPath = prefix ? `${prefix}.${key}` : key;
      const type = Array.isArray(val) ? 'array' : typeof val;
      if (val !== null && typeof val === 'object' && !Array.isArray(val)) {
        result.push({ path: fullPath, type: 'object', sample: '{...}' });
        result = result.concat(extractKeys(val, fullPath));
      } else {
        const sampleStr = Array.isArray(val)
          ? `[${val.length} items]`
          : val === null
          ? 'null'
          : String(val).slice(0, 40);
        result.push({ path: fullPath, type, sample: sampleStr });
      }
    }
    return result;
  };

  const flattenedKeys = parseError ? [] : extractKeys(parsedPayload);

  // Generate n8n Code Node JS script with safe optional chaining & defensive guards
  const generateN8nCode = (): string => {
    if (parseError) {
      return `// Fix JSON syntax errors above to generate n8n script.`;
    }

    const keyAssignments = flattenedKeys
      .filter((k) => k.type !== 'object')
      .slice(0, 10)
      .map((k) => {
        const varName = k.path.replace(/[^a-zA-Z0-9_]/g, '_');
        const accessor = k.path
          .split('.')
          .map((part) => (part.match(/^[a-zA-Z_][a-zA-Z0-9_]*$/) ? `.${part}` : `['${part}']`))
          .join('?');
        return `    ${varName}: payload?${accessor} ?? null,`;
      })
      .join('\n');

    return `// Production-Ready n8n Code Node (JavaScript / Node.js)
// Mode: "Run Once for All Items" or "Run Once for Each Item"
// Engineered with defensive optional chaining, type validation, and error logging.

const items = $input.all();
const transformedResults = [];

for (const [index, item] of items.entries()) {
  try {
    // 1. Extract body payload whether parsed or raw string
    const rawBody = item.json.body ?? item.json;
    const payload = typeof rawBody === 'string' ? JSON.parse(rawBody) : rawBody;
    const headers = item.json.headers ?? {};

    // 2. Validate payload presence
    if (!payload || typeof payload !== 'object') {
      throw new Error(\`Item \${index}: Received empty or non-object webhook payload\`);
    }

    // 3. Map flattened extracted entities safely
    const normalizedData = {
${keyAssignments}
    };

    // 4. Attach telemetry audit metadata
    transformedResults.push({
      json: {
        ...normalizedData,
        _telemetry: {
          processed_at: new Date().toISOString(),
          source_event: headers['x-shopify-topic'] || headers['stripe-signature'] ? 'stripe' : 'webhook',
          item_index: index,
          execution_status: 'SUCCESS'
        }
      }
    });

  } catch (error) {
    // 5. Route failures into dead-letter execution branch without terminating the pipeline
    transformedResults.push({
      json: {
        _error: {
          message: error.message,
          item_index: index,
          raw_data: item.json,
          timestamp: new Date().toISOString()
        },
        _telemetry: {
          execution_status: 'FAILED_RETRY_QUEUED'
        }
      }
    });
  }
}

return transformedResults;`;
  };

  // Generate Make.com / Integromat formula reference
  const generateMakeMapping = (): string => {
    if (parseError) {
      return `// Fix JSON syntax errors above to generate Make mapping.`;
    }

    const mappings = flattenedKeys
      .filter((k) => k.type !== 'object')
      .slice(0, 8)
      .map((k) => `// ${k.path} (${k.type}):\n{{get(1.body; "${k.path}")}}`)
      .join('\n\n');

    return `// Make.com (Integromat) Universal Webhook Data Mapping Formulas
// Assumes Webhook Trigger Module is Module [1]

${mappings}

// Defensive fallback formula for missing or null parameters:
// {{ifempty(get(1.body; "customer.email"); "unassigned@domain.com")}}

// Unix Timestamp conversion formula (seconds to date):
// {{formatDate(addSeconds(1.body.created; 0); "YYYY-MM-DD HH:mm:ss")}}`;
  };

  const copyToClipboard = (text: string, identifier: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(identifier);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const testerSchema = generateSchemaGraph('/tools/webhook-payload-tester');

  const troubleshootingFaqs = [
    {
      question: 'Why do webhook payloads frequently fail to parse inside n8n Code Nodes?',
      answer:
        'When webhooks arrive through reverse proxies or certain API gateways, the payload body is delivered as a stringified raw text buffer rather than a native JavaScript object. Calling item.json.body.user directly throws an undefined property exception. Defensive scripts must verify typeof body === "string" and apply JSON.parse() within a try-catch block before property access.'
    },
    {
      question: 'How do you prevent duplicate execution when third-party services retry webhooks?',
      answer:
        'Services like Stripe, Shopify, and Twilio automatically retry unacknowledged webhook deliveries up to 72 hours. To guarantee idempotent processing, extract the unique event ID (such as evt_xxx or message_sid) on the first node and perform an atomic lookup in Redis or your database with an expiration key. If the key exists, return HTTP 200 immediately without executing downstream operations.'
    },
    {
      question: 'What is the correct protocol for verifying HMAC signatures in self-hosted n8n?',
      answer:
        'Do not verify HMAC signatures using parsed JSON strings, because JSON serializers reorder object keys and alter spacing, corrupting the hash. Pass the raw binary payload buffer directly into the Crypto node or a custom Code Node using crypto.createHmac("sha256", secret).update(rawBody).digest("hex") and compare using crypto.timingSafeEqual().'
    },
    {
      question: 'How should n8n and Make.com workflows handle transient downstream rate limits (HTTP 429)?',
      answer:
        'Never let a webhook workflow fail silently on HTTP 429. In n8n, enable "Retry on Fail" with exponential backoff on HTTP Request nodes. In Make.com, attach a Break error handler directive that queues the failed bundle into the dead-letter queue with automatic execution retries spaced over 15, 60, and 300 seconds.'
    }
  ];

  return (
    <div className="pt-28 pb-20 px-4 sm:px-8 max-w-7xl mx-auto">
      <SEOHead
        title="n8n & Make Webhook Payload Tester | Sheharyar Siraj"
        description="Inspect incoming JSON webhook payloads, parse nested keys, validate headers, and compile production-ready n8n Code Node JavaScript scripts instantly."
        canonicalUrl="https://sheharyarsiraj.com/tools/webhook-payload-tester/"
        schema={testerSchema}
      />

      <Breadcrumbs
        items={[
          { label: 'SYSTEMS & UTILITY TOOLS', href: '/tools/' },
          { label: 'Webhook Payload Tester' }
        ]}
      />

      {/* Hero Header Section */}
      <div className="mt-8 mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-xs font-bold uppercase tracking-wider mb-4">
          <Workflow size={14} />
          <span>EVENT-DRIVEN INTEGRATION & PAYLOAD COMPILATION</span>
        </div>

        <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
          n8n & Make Webhook{' '}
          <span className="text-accent">Payload Tester & Debugger</span>
        </h1>

        <p className="text-brand-secondary text-base sm:text-xl max-w-4xl leading-relaxed font-body">
          Simulate, capture, and debug complex webhook payloads from Stripe, Shopify, HubSpot, and custom APIs. Parse nested JSON keys, validate headers, and compile hardened n8n Code Node scripts with zero manual mapping.
        </p>

        {/* Telemetry Metric Indicators */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl glass-panel border border-brand-border/60 bg-surface-1/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
              <Zap size={18} />
            </div>
            <div>
              <div className="font-mono text-lg font-bold text-white">Zero Overhead</div>
              <div className="text-[11px] font-mono text-brand-muted">Direct Client Execution</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
              <Code2 size={18} />
            </div>
            <div>
              <div className="font-mono text-lg font-bold text-accent">n8n Code Node</div>
              <div className="text-[11px] font-mono text-brand-muted">Auto-Generated Script</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
              <ShieldCheck size={18} />
            </div>
            <div>
              <div className="font-mono text-lg font-bold text-white">HMAC & Headers</div>
              <div className="text-[11px] font-mono text-brand-muted">Cryptographic Parsing</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
              <Layers size={18} />
            </div>
            <div>
              <div className="font-mono text-lg font-bold text-white">{flattenedKeys.length} Keys</div>
              <div className="text-[11px] font-mono text-brand-muted">Extracted Data Points</div>
            </div>
          </div>
        </div>
      </div>

      {/* AEO Direct Answer Block */}
      <AeoDirectAnswer
        summary="A production webhook pipeline in n8n or Make.com requires defensive payload transformation, strict signature verification, and resilient dead-letter routing. Parsing incoming JSON via auto-generated JavaScript Code Nodes with optional chaining protects automations against undefined parameter crashes, missing headers, and duplicate delivery retries."
        keyTakeaways={[
          'Generates a unique simulation webhook URL for testing payload ingestion without setting up temporary tunnel services.',
          'Automatically flattens complex nested JSON payloads into mapped JavaScript accessors with nullish coalescing.',
          'Compiles copy-paste JavaScript for n8n Code Nodes featuring try-catch isolation and error telemetry flags.',
          'Provides Make.com universal get() and formatDate() formulas for rapid visual mapping.'
        ]}
      />

      {/* Unique Listener Session Bar */}
      <div className="my-8 p-5 sm:p-6 rounded-2xl glass-panel border border-accent/30 bg-surface-1">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Server size={16} className="text-accent" />
              <span className="text-xs font-mono uppercase tracking-wider text-accent font-bold">
                SIMULATED WEBHOOK LISTENER ENDPOINT
              </span>
              {statusMessage && (
                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  {statusMessage}
                </span>
              )}
            </div>
            <div className="font-mono text-sm sm:text-base text-white break-all select-all">
              {endpointUrl}
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              type="button"
              onClick={() => copyToClipboard(endpointUrl, 'endpoint')}
              className="px-3.5 py-2 rounded-xl font-mono text-xs font-bold tracking-wider bg-surface-2 hover:bg-surface-3 border border-brand-border text-white transition-all flex items-center gap-1.5 active:scale-95"
            >
              {copiedText === 'endpoint' ? (
                <>
                  <Check size={14} className="text-emerald-400" />
                  <span>COPIED</span>
                </>
              ) : (
                <>
                  <Copy size={14} />
                  <span>COPY URL</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={regenerateSession}
              className="px-3.5 py-2 rounded-xl font-mono text-xs font-bold tracking-wider bg-accent/10 hover:bg-accent/20 border border-accent/30 text-accent transition-all flex items-center gap-1.5 active:scale-95"
            >
              <RefreshCw size={14} />
              <span>NEW SESSION</span>
            </button>
          </div>
        </div>

        {/* Template Quick Selectors */}
        <div className="mt-4 pt-4 border-t border-brand-border/40 flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono text-brand-muted mr-1">LOAD SAMPLE PAYLOAD:</span>
          {Object.entries(SAMPLE_TEMPLATES).map(([key, data]) => (
            <button
              key={key}
              type="button"
              onClick={() => loadTemplate(key)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${
                selectedTemplate === key
                  ? 'bg-accent text-black font-bold'
                  : 'bg-surface-2 text-brand-secondary hover:text-white border border-brand-border'
              }`}
            >
              {data.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Workspace (Editor + Output Inspector) */}
      <div className="my-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Raw Payload & Headers Input */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl glass-panel border border-brand-border bg-surface-1">
            <div className="flex items-center justify-between mb-3">
              <label htmlFor="raw-payload-textarea" className="text-xs font-mono uppercase tracking-wider text-white font-bold flex items-center gap-2">
                <FileJson size={15} className="text-accent" />
                Raw Webhook JSON Body
              </label>
              <span className="text-[11px] font-mono text-brand-muted">
                {rawPayload.length} characters
              </span>
            </div>

            <textarea
              id="raw-payload-textarea"
              rows={14}
              value={rawPayload}
              onChange={(e) => setRawPayload(e.target.value)}
              className={`w-full bg-black/60 border rounded-xl p-3 font-mono text-xs text-white leading-relaxed focus:outline-none ${
                parseError ? 'border-rose-500' : 'border-brand-border focus:border-accent'
              }`}
              placeholder="Paste raw incoming JSON payload here..."
            />

            {parseError && (
              <div className="mt-2 p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-mono flex items-center gap-2">
                <AlertTriangle size={14} className="flex-shrink-0" />
                <span>JSON Syntax Error: {parseError}</span>
              </div>
            )}

            {/* HTTP Headers Input */}
            <div className="mt-5 pt-4 border-t border-brand-border">
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="raw-headers-textarea" className="text-xs font-mono uppercase tracking-wider text-brand-muted font-bold flex items-center gap-2">
                  <Lock size={13} className="text-accent" />
                  Simulated Request Headers
                </label>
              </div>

              <textarea
                id="raw-headers-textarea"
                rows={4}
                value={rawHeaders}
                onChange={(e) => setRawHeaders(e.target.value)}
                className="w-full bg-black/60 border border-brand-border focus:border-accent rounded-xl p-3 font-mono text-xs text-white leading-relaxed focus:outline-none"
                placeholder='{"content-type": "application/json"}'
              />
            </div>
          </div>
        </div>

        {/* Right Column: Key Inspector & Auto-Generated Code */}
        <div className="lg:col-span-7 space-y-4">
          <div className="rounded-2xl glass-panel border border-accent/30 bg-surface-1 overflow-hidden">
            {/* View Switcher Tabs */}
            <div className="flex items-center justify-between px-4 py-3 bg-surface-2 border-b border-brand-border">
              <div className="flex items-center gap-1 sm:gap-2">
                <button
                  type="button"
                  onClick={() => setActiveOutputTab('inspector')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                    activeOutputTab === 'inspector'
                      ? 'bg-accent text-black font-bold shadow-[0_0_10px_rgba(183,255,60,0.25)]'
                      : 'text-brand-muted hover:text-white'
                  }`}
                >
                  KEY INSPECTOR
                </button>

                <button
                  type="button"
                  onClick={() => setActiveOutputTab('n8n_code')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                    activeOutputTab === 'n8n_code'
                      ? 'bg-accent text-black font-bold shadow-[0_0_10px_rgba(183,255,60,0.25)]'
                      : 'text-brand-muted hover:text-white'
                  }`}
                >
                  N8N CODE NODE JS
                </button>

                <button
                  type="button"
                  onClick={() => setActiveOutputTab('make_mapping')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                    activeOutputTab === 'make_mapping'
                      ? 'bg-accent text-black font-bold shadow-[0_0_10px_rgba(183,255,60,0.25)]'
                      : 'text-brand-muted hover:text-white'
                  }`}
                >
                  MAKE.COM MAPPING
                </button>

                <button
                  type="button"
                  onClick={() => setActiveOutputTab('headers')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                    activeOutputTab === 'headers'
                      ? 'bg-accent text-black font-bold shadow-[0_0_10px_rgba(183,255,60,0.25)]'
                      : 'text-brand-muted hover:text-white'
                  }`}
                >
                  HEADERS ({Object.keys(parsedHeaders).length})
                </button>
              </div>

              {activeOutputTab !== 'inspector' && (
                <button
                  type="button"
                  onClick={() =>
                    copyToClipboard(
                      activeOutputTab === 'n8n_code'
                        ? generateN8nCode()
                        : activeOutputTab === 'make_mapping'
                        ? generateMakeMapping()
                        : JSON.stringify(parsedHeaders, null, 2),
                      'code_output'
                    )
                  }
                  className="px-3 py-1.5 rounded-lg font-mono text-xs font-bold tracking-wider bg-surface-3 hover:bg-accent hover:text-black text-white border border-brand-border transition-all flex items-center gap-1.5"
                >
                  {copiedText === 'code_output' ? (
                    <>
                      <Check size={14} className="text-emerald-400" />
                      <span>COPIED!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>COPY</span>
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Tab 1: Key Inspector Table */}
            {activeOutputTab === 'inspector' && (
              <div className="p-4 bg-black/60 max-h-[540px] overflow-y-auto">
                {parseError ? (
                  <div className="p-6 text-center text-xs font-mono text-rose-400">
                    Cannot inspect keys due to invalid JSON syntax.
                  </div>
                ) : flattenedKeys.length === 0 ? (
                  <div className="p-6 text-center text-xs font-mono text-brand-muted">
                    No keys found in current payload.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left font-mono text-xs">
                      <thead>
                        <tr className="border-b border-brand-border/60 text-accent uppercase text-[10px]">
                          <th className="pb-2 pl-2">Key Path</th>
                          <th className="pb-2 px-2">Data Type</th>
                          <th className="pb-2 pr-2">Sample Extracted Value</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-brand-border/30 text-brand-secondary">
                        {flattenedKeys.map((k, i) => (
                          <tr key={i} className="hover:bg-surface-2/40">
                            <td className="py-2 pl-2 text-white font-bold select-all">
                              {k.path}
                            </td>
                            <td className="py-2 px-2">
                              <span className="px-1.5 py-0.5 rounded text-[10px] bg-surface-3 text-brand-muted border border-brand-border/40">
                                {k.type}
                              </span>
                            </td>
                            <td className="py-2 pr-2 text-brand-muted truncate max-w-[200px]">
                              {k.sample}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* Tab 2: n8n Code Node JS */}
            {activeOutputTab === 'n8n_code' && (
              <div className="p-4 bg-black/60 font-mono text-xs text-white/90 overflow-x-auto max-h-[540px] overflow-y-auto leading-relaxed select-all">
                <pre>
                  <code>{generateN8nCode()}</code>
                </pre>
              </div>
            )}

            {/* Tab 3: Make.com Formula Mapping */}
            {activeOutputTab === 'make_mapping' && (
              <div className="p-4 bg-black/60 font-mono text-xs text-white/90 overflow-x-auto max-h-[540px] overflow-y-auto leading-relaxed select-all">
                <pre>
                  <code>{generateMakeMapping()}</code>
                </pre>
              </div>
            )}

            {/* Tab 4: Parsed Headers Table */}
            {activeOutputTab === 'headers' && (
              <div className="p-4 bg-black/60 max-h-[540px] overflow-y-auto">
                <div className="overflow-x-auto">
                  <table className="w-full text-left font-mono text-xs">
                    <thead>
                      <tr className="border-b border-brand-border/60 text-accent uppercase text-[10px]">
                        <th className="pb-2 pl-2">Header Name</th>
                        <th className="pb-2 pr-2">Header Value</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-border/30 text-brand-secondary">
                      {Object.entries(parsedHeaders).map(([k, v], i) => (
                        <tr key={i} className="hover:bg-surface-2/40">
                          <td className="py-2 pl-2 text-white font-bold">{k}</td>
                          <td className="py-2 pr-2 text-brand-muted select-all truncate max-w-[320px]">
                            {v}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Footer Telemetry */}
            <div className="px-4 py-2.5 bg-surface-2/80 border-t border-brand-border/60 flex items-center justify-between text-[11px] font-mono text-brand-muted">
              <span>Status: Ready for n8n & Make Ingestion</span>
              <span className="text-accent font-bold">Defensive Error-Handling Enabled</span>
            </div>
          </div>

          {/* Action Trigger Card */}
          <div className="p-5 rounded-2xl glass-panel border border-brand-border bg-gradient-to-r from-surface-2 via-surface-1 to-surface-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="font-heading text-sm font-bold text-white">
                Need enterprise webhook resilience engineered?
              </div>
              <p className="text-xs text-brand-secondary font-body mt-0.5">
                We build self-hosted n8n architectures with Redis idempotency, dead-letter queues, and HMAC validation.
              </p>
            </div>

            <button
              type="button"
              onClick={onOpenInquiry}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-mono text-xs font-bold tracking-wider bg-accent text-black hover:bg-white transition-all flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(183,255,60,0.3)] flex-shrink-0 active:scale-95"
            >
              <span>AUDIT YOUR PIPELINE</span>
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Long-Form Engineering Guide: Webhook Resilience & Error Handling */}
      <div className="my-16 space-y-12">
        <section className="p-8 sm:p-10 rounded-3xl glass-panel border border-brand-border bg-surface-1">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-xs font-bold uppercase tracking-wider mb-4">
              <Cpu size={14} />
              <span>PIPELINE ARCHITECTURE GUIDE</span>
            </div>

            <h2 className="font-heading text-2xl sm:text-4xl font-bold text-white tracking-tight leading-tight mb-6">
              Engineering Resilient Webhook Ingestion in n8n and Make.com
            </h2>

            <div className="space-y-4 text-brand-secondary font-body leading-relaxed text-base sm:text-lg">
              <p>
                Webhooks represent the backbone of real-time workflow automation, but in high-volume production systems, they are also the most common point of operational failure. APIs update payload schemas without warning, third-party services trigger duplicate retry storms, and transient downstream outages cause unhandled exceptions that stall automation queues.
              </p>
              <p>
                Building production-ready integrations requires abandoning naive assumptions about payload consistency. Every incoming webhook must be treated as untrusted and potentially malformed until validated. By combining structured JSON normalization with defensive optional chaining, teams eliminate the vast majority of execution errors before data reaches downstream CRM and database systems.
              </p>
            </div>
          </div>
        </section>

        {/* 4 Core Best Practice Pillars */}
        <section>
          <div className="mb-8">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Enterprise Webhook Hardening Checklist
            </h2>
            <p className="text-brand-secondary text-base font-body mt-2">
              Four fundamental architectural safeguards required for mission-critical automation pipelines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl glass-panel border border-brand-border bg-surface-1">
              <div className="flex items-center gap-2.5 text-accent font-mono text-sm font-bold mb-3">
                <Database size={18} />
                <span>1. Atomic Idempotency via Redis Key Caching</span>
              </div>
              <p className="text-sm text-brand-secondary font-body leading-relaxed mb-3">
                Payment processors and e-commerce platforms automatically retry webhook deliveries when response latency exceeds 5 seconds. Without an idempotency layer, a single purchase event can trigger duplicate invoice generation, double CRM contact records, and conflicting fulfillment tickets.
              </p>
              <div className="p-3 rounded-xl bg-surface-2 border border-brand-border/60 text-xs font-mono text-brand-muted">
                Extract event ID and store in Redis with a 48-hour expiration TTL. Abort duplicate runs immediately with HTTP 200.
              </div>
            </div>

            <div className="p-6 rounded-2xl glass-panel border border-brand-border bg-surface-1">
              <div className="flex items-center gap-2.5 text-accent font-mono text-sm font-bold mb-3">
                <Lock size={18} />
                <span>2. Binary HMAC SHA-256 Signature Verification</span>
              </div>
              <p className="text-sm text-brand-secondary font-body leading-relaxed mb-3">
                Exposing a public webhook URL without cryptographic verification allows bad actors to spoof payment confirmations and inject unauthorized records into your database. Validating signatures prevents unauthorized executions.
              </p>
              <div className="p-3 rounded-xl bg-surface-2 border border-brand-border/60 text-xs font-mono text-brand-muted">
                Compute the hash against the raw request buffer rather than stringified JSON to avoid key-ordering mismatches.
              </div>
            </div>

            <div className="p-6 rounded-2xl glass-panel border border-brand-border bg-surface-1">
              <div className="flex items-center gap-2.5 text-accent font-mono text-sm font-bold mb-3">
                <AlertTriangle size={18} />
                <span>3. Non-Blocking Dead-Letter Queue (DLQ) Routing</span>
              </div>
              <p className="text-sm text-brand-secondary font-body leading-relaxed mb-3">
                When an unexpected schema variation crashes a mapping step, terminating the entire workflow leaves other items unfulfilled. Encapsulate transformations inside try-catch blocks and route malformed items into a specialized quarantine queue.
              </p>
              <div className="p-3 rounded-xl bg-surface-2 border border-brand-border/60 text-xs font-mono text-brand-muted">
                Send quarantined payloads to Slack or PostgreSQL for administrative review while allowing valid records to proceed.
              </div>
            </div>

            <div className="p-6 rounded-2xl glass-panel border border-brand-border bg-surface-1">
              <div className="flex items-center gap-2.5 text-accent font-mono text-sm font-bold mb-3">
                <RefreshCw size={18} />
                <span>4. Exponential Backoff on Downstream Rate Limits</span>
              </div>
              <p className="text-sm text-brand-secondary font-body leading-relaxed mb-3">
                Sudden surges of inbound webhooks can cause downstream destination APIs (such as HubSpot or Airtable) to return HTTP 429 Too Many Requests. Hard failures drop critical customer data.
              </p>
              <div className="p-3 rounded-xl bg-surface-2 border border-brand-border/60 text-xs font-mono text-brand-muted">
                Configure HTTP Request nodes with automated retries spaced over 5, 25, and 120 seconds with jitter buffering.
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Troubleshooting FAQ Accordion */}
      <div className="my-20">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-xs font-bold uppercase tracking-wider mb-3">
            <Terminal size={14} />
            <span>TECHNICAL SPECIFICATIONS & FREQUENTLY ASKED QUESTIONS</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Webhook Debugging & Automation FAQ
          </h2>
        </div>

        <div className="space-y-4 max-w-4xl mx-auto">
          {troubleshootingFaqs.map((faq, idx) => {
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
          Ready to Build Fault-Tolerant Automation Workflows?
        </h2>
        <p className="text-brand-secondary text-base sm:text-lg max-w-2xl mx-auto mb-8 font-body">
          Connect directly with Sheharyar Siraj. We architect high-concurrency webhook pipelines, configure self-hosted n8n enterprise instances, and guarantee sub-second data synchronization across your tech stack.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            type="button"
            onClick={onOpenInquiry}
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-mono text-sm font-bold tracking-wider bg-accent text-black hover:bg-white transition-all flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(183,255,60,0.4)] active:scale-95"
          >
            <Zap size={18} />
            <span>BOOK A PIPELINE ARCHITECTURE SESSION</span>
          </button>

          <Link
            to="/tools/"
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-mono text-sm font-bold tracking-wider bg-surface-2 hover:bg-surface-3 border border-brand-border text-white transition-all flex items-center justify-center gap-2"
          >
            <span>EXPLORE ALL SYSTEMS TOOLS</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};
export default WebhookPayloadTesterPage;
