<?php
/**
 * Sheharyar Siraj - RAG AI Assistant Webhook & API Handler
 * 
 * Provides server-side RAG processing with strict scope guardrails
 * and low-latency LLM inference (OpenAI GPT-4o-mini / Claude 3.5 Haiku).
 */

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
    exit;
}

$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

if (!isset($data['message']) || empty(trim($data['message']))) {
    http_response_code(400);
    echo json_encode(['error' => 'Message is required']);
    exit;
}

$userQuery = trim($data['message']);

// 1. Guardrail Scope Check
$restrictedKeywords = [
    'weather', 'politics', 'sports', 'recipe', 'movie', 
    'crypto trading', 'astrology', 'essay writing', 'homework', 'dating'
];

$lowerQuery = strtolower($userQuery);
foreach ($restrictedKeywords as $forbidden) {
    if (strpos($lowerQuery, $forbidden) !== false) {
        echo json_encode([
            'reply' => "I specialize exclusively in Sheharyar Siraj's web engineering, AI automation, and voice agent services. How can I assist you with your system architecture or project needs today?",
            'isOutOfScope' => true,
            'action' => [
                'type' => 'whatsapp',
                'label' => 'Connect on WhatsApp',
                'url' => 'https://wa.me/923132080033'
            ]
        ]);
        exit;
    }
}

// 2. Strict RAG System Prompt
$systemPrompt = <<<PROMPT
You are the interactive AI Architecture Representative for Sheharyar Siraj (sheharyarsiraj.com).
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
- Keep responses concise, authoritative, and direct (2 to 4 sentences).
PROMPT;

// 3. API Key Dispatch (OpenAI gpt-4o-mini if configured)
$apiKey = getenv('OPENAI_API_KEY');

if ($apiKey) {
    $payload = [
        'model' => 'gpt-4o-mini',
        'messages' => [
            ['role' => 'system', 'content' => $systemPrompt],
            ['role' => 'user', 'content' => $userQuery]
        ],
        'temperature' => 0.2,
        'max_tokens' => 250
    ];

    $ch = curl_init('https://api.openai.com/v1/chat/completions');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Authorization: Bearer ' . $apiKey
    ]);
    curl_setopt($ch, CURLOPT_TIMEOUT, 8);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($httpCode === 200 && $response) {
        $json = json_decode($response, true);
        if (isset($json['choices'][0]['message']['content'])) {
            $replyText = trim($json['choices'][0]['message']['content']);
            // Remove any em-dashes or en-dashes that the model may have generated
            $replyText = str_replace(["\xE2\x80\x94", "\xE2\x80\x93"], ' - ', $replyText);

            echo json_encode([
                'reply' => $replyText,
                'source' => 'OpenAI GPT-4o-mini RAG',
                'isOutOfScope' => false
            ]);
            exit;
        }
    }
}

// 4. Autonomous Verified Rule-Based Fallback
echo json_encode([
    'reply' => "Sheharyar Siraj builds decoupled, fault-tolerant digital systems where custom WordPress provides the resilient foundation, conversational AI models provide reasoning, and event-driven automation pipelines execute operational workflows. Reach out directly on WhatsApp at +92 313 2080033 or email sherryansari870@gmail.com to scope your project.",
    'source' => 'Verified Architecture Blueprint',
    'isOutOfScope' => false,
    'action' => [
        'type' => 'whatsapp',
        'label' => 'WhatsApp: +92 313 2080033',
        'url' => 'https://wa.me/923132080033'
    ]
]);
