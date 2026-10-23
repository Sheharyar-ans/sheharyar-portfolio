/**
 * Sheharyar Siraj - RAG AI Assistant Webhook & API Handler (Vercel Serverless Function)
 * 
 * Replaces api/chat.php with a zero-dependency, low-latency Node.js serverless endpoint.
 * Features strict scope guardrails, OpenAI GPT-4o-mini inference, and autonomous verified fallback.
 */

export default async function handler(req, res) {
  // CORS & Security Headers
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Preflight OPTIONS handler
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const message = body.message;

    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const userQuery = message.trim();
    const lowerQuery = userQuery.toLowerCase();

    // 1. Guardrail Scope Check (Strict Domain Boundaries)
    const restrictedKeywords = [
      'weather', 'politics', 'sports', 'recipe', 'movie', 
      'crypto trading', 'astrology', 'essay writing', 'homework', 'dating'
    ];

    for (const forbidden of restrictedKeywords) {
      if (lowerQuery.includes(forbidden)) {
        return res.status(200).json({
          reply: "I specialize exclusively in Sheharyar Siraj's web engineering, AI automation, and voice agent services. How can I assist you with your system architecture or project needs today?",
          isOutOfScope: true,
          action: {
            type: 'whatsapp',
            label: 'Connect on WhatsApp',
            url: 'https://wa.me/923132080033'
          }
        });
      }
    }

    // 2. Strict RAG System Prompt
    const systemPrompt = `You are the interactive AI Architecture Representative for Sheharyar Siraj (sheharyarsiraj.com).
Your role is to represent his technical engineering services and provide authoritative, factual, concise answers.

CORE IDENTITY & KNOWLEDGE:
- Name: Sheharyar Siraj
- Job Title: AI Automation Architect & WordPress Systems Engineer
- Experience: 5+ years of active engineering, 1,200+ projects delivered globally.
- Credentials: Top Rated on Upwork, 5-Star on Fiverr, 100% Job Success Score (JSS).
- Certifications: Google Cloud Vertex AI Certified Specialist, Anthropic AI Fluency, Cisco CyberOps Associate.
- Location: Operating from Karachi, Pakistan (PKT / UTC+5), with strategic working overlap for the US, UK, Europe, UAE, and Saudi Arabia.
- Core Specialties:
  1. Custom WordPress Development: PHP 8.2+ OOP, sub-600ms TTFB, 95+ Core Web Vitals, zero plugin bloat, custom Gutenberg blocks, headless setups.
  2. WooCommerce Architecture: High-Performance Order Storage (HPOS), custom checkout funnels, Redis caching, high-concurrency cart optimization.
  3. AI Voice Agents: Sub-600ms conversational telephony via Vapi, Retell AI, Deepgram, ElevenLabs, and Twilio SIP with CRM tool calling.
  4. Enterprise RAG & Chatbots: Pinecone, pgvector vector search, verified internal knowledge bases, zero hallucinations.
  5. Workflow Automation: Self-hosted n8n clusters, Make.com, multi-step error recovery pipelines.
  6. White-Label Agency Partnerships: Strict bilateral NDAs, invisible GitHub/Slack collaboration for marketing and SEO agencies.
  7. Direct Contact: WhatsApp +92 313 2080033, Email sherryansari870@gmail.com (2-hour response SLA).

STRICT GUARDRAILS:
- ONLY answer questions related to Sheharyar Siraj, his services, technical stacks, architecture, or project scoping.
- If asked about unrelated topics (general coding homework, trivia, recipes, weather, politics), politely decline with:
  "I specialize exclusively in Sheharyar Siraj's web engineering, AI automation, and voice agent services. How can I assist you with your system architecture or project needs today?"
- NEVER use artificial em-dashes or en-dashes as punctuation. Use standard hyphens, colons, commas, or clean sentence stops.
- Keep responses concise, authoritative, and direct (2 to 4 sentences).`;

    // 3. API Key Dispatch (OpenAI gpt-4o-mini if configured in Vercel Environment Variables)
    const apiKey = process.env.OPENAI_API_KEY;

    if (apiKey) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          signal: controller.signal,
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: userQuery }
            ],
            temperature: 0.2,
            max_tokens: 250
          })
        });

        clearTimeout(timeoutId);

        if (response.ok) {
          const json = await response.json();
          if (json.choices?.[0]?.message?.content) {
            let replyText = json.choices[0].message.content.trim();
            // Remove any em-dashes or en-dashes
            replyText = replyText.replace(/[\u2013\u2014]/g, ' - ');

            return res.status(200).json({
              reply: replyText,
              source: 'OpenAI GPT-4o-mini RAG',
              isOutOfScope: false
            });
          }
        }
      } catch (fetchErr) {
        // Fallback to verified blueprint below if API call times out or fails
      }
    }

    // 4. Autonomous Verified Rule-Based Fallback
    return res.status(200).json({
      reply: "Sheharyar Siraj builds decoupled, fault-tolerant digital systems where custom WordPress provides the resilient foundation, conversational AI models provide reasoning, and event-driven automation pipelines execute operational workflows. Reach out directly on WhatsApp at +92 313 2080033 or email sherryansari870@gmail.com to scope your project.",
      source: "Verified Architecture Blueprint",
      isOutOfScope: false,
      action: {
        type: 'whatsapp',
        label: 'WhatsApp: +92 313 2080033',
        url: 'https://wa.me/923132080033'
      }
    });

  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
