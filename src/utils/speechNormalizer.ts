/**
 * Speech Normalizer & Phonetic Cleaner Pipeline
 * Pre-processes text before SpeechSynthesisUtterance to guarantee:
 * 1. Strict natural male voice selection with aggressive feminine exclusion
 * 2. Correct phonetic pronunciation of tech names & acronyms (e.g. "Power BI" -> "Power Bee Eye")
 * 3. Digitization of phone numbers and 5+ digit sequences into individual comma-separated spoken digits
 * 4. Humanized email and URL pronunciation ("at", "dot")
 * 5. Stripping of all markdown formatting, emojis, brackets, backticks, and code syntax
 * 6. Protection against premature sentence slicing or acronym truncation
 */

export const DIGIT_WORDS: Record<string, string> = {
  '0': 'zero',
  '1': 'one',
  '2': 'two',
  '3': 'three',
  '4': 'four',
  '5': 'five',
  '6': 'six',
  '7': 'seven',
  '8': 'eight',
  '9': 'nine'
};

/**
 * Converts a sequence of digits into distinct spoken words separated by commas
 * e.g., "923132080033" -> "nine, two, three, one, three, two, zero, eight, zero, zero, three, three"
 * e.g. with hasPlus: "plus nine, two, three, one, three, two, zero, eight, zero, zero, three, three"
 */
export function digitizeNumberSequence(numericStr: string, hasPlus = false): string {
  const digits = numericStr.replace(/\D/g, '');
  if (!digits) return '';
  const spokenDigits = digits.split('').map((d) => DIGIT_WORDS[d] || d).join(', ');
  return hasPlus ? `plus ${spokenDigits}` : spokenDigits;
}

/**
 * Comprehensive exclusion filter: explicitly blocks any voice containing feminine indicators
 */
export const FEMININE_INDICATORS = [
  'zira',
  'jenny',
  'aria',
  'samantha',
  'victoria',
  'female',
  'woman',
  'girl',
  'fem',
  'karen',
  'moira',
  'fiona',
  'tessa',
  'susan',
  'cynthia',
  'hazel',
  'heera',
  'helena',
  'hortense',
  'huihui',
  'ava',
  'emma',
  'olivia',
  'sonia',
  'natasha',
  'stephanie',
  'veena',
  'linda',
  'alice',
  'catherine',
  'salli',
  'kimberly',
  'kendra',
  'joanna',
  'ivy',
  'allison',
  'kate',
  'serena',
  'nicky',
  'sandy',
  'shelley',
  'kathy',
  'flo',
  'grandma',
  'alva',
  'agnes',
  'amira',
  'charlotte',
  'laura',
  'anna',
  'sarah',
  'sara',
  'clara',
  'elena',
  'monica',
  'paulina',
  'luciana',
  'daria',
  'chloe',
  'zoe',
  'amelie'
];

/**
 * Priority 1: High-Definition Male Neural Voices in exact priority order
 */
export const PRIORITY_MALE_VOICE_NAMES = [
  'guy online (natural)',
  'christopher online (natural)',
  'eric online (natural)',
  'google us english male',
  'microsoft david',
  'daniel'
];

/**
 * Utterance parameters for Zack: calm, deeper resonance and measured cadence
 */
export const SPEECH_SYNTHESIS_CONFIG = {
  pitch: 0.95, // calm, slightly deeper resonance
  rate: 0.98,  // measured, articulate cadence
  volume: 1.0
};

/**
 * Dynamically inspects SpeechSynthesis voices with an aggressive male-first heuristic filter
 * 1. Priority 1 (High-Definition Male Neural Voices)
 * 2. Secondary Male patterns
 * 3. Fallback: First en-US or en-GB voice not matching feminine blocklist
 */
export function selectCalmAmericanMaleVoice(customVoices?: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !window.speechSynthesis) return null;
  const voices = customVoices && customVoices.length > 0 ? customVoices : window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;

  const isFeminine = (v: SpeechSynthesisVoice): boolean => {
    const combined = `${v.name} ${v.voiceURI || ''}`.toLowerCase();
    // Special case for Chrome's standard "Google US English" which is female
    if (combined.includes('google us english') && !combined.includes('male')) {
      return true;
    }
    return FEMININE_INDICATORS.some((kw) => combined.includes(kw));
  };

  const eligibleVoices = voices.filter((v) => !isFeminine(v));
  if (eligibleVoices.length === 0) {
    return voices[0];
  }

  // Priority 1: High-Definition Male Neural Voices in strict priority order
  for (const prio of PRIORITY_MALE_VOICE_NAMES) {
    const match = eligibleVoices.find((v) => {
      const combined = `${v.name} ${v.voiceURI || ''}`.toLowerCase();
      return combined.includes(prio);
    });
    if (match) {
      console.log(`[TTS Engine] Selected Priority 1 Male Neural Voice: "${match.name}" (${match.lang})`);
      return match;
    }
  }

  // Priority 2: Secondary High-Quality English Male Voices
  const secondaryMalePatterns = [
    'guy',
    'christopher',
    'eric',
    'david',
    'daniel',
    'microsoft mark',
    'mark',
    'alex',
    'aaron',
    'eddy',
    'reed',
    'brian',
    'roger',
    'george',
    'oliver',
    'ryan',
    'male'
  ];

  for (const sec of secondaryMalePatterns) {
    const match = eligibleVoices.find((v) => {
      const isEnglish = v.lang.toLowerCase().startsWith('en');
      const combined = `${v.name} ${v.voiceURI || ''}`.toLowerCase();
      return isEnglish && combined.includes(sec);
    });
    if (match) {
      console.log(`[TTS Engine] Selected Secondary Male Voice: "${match.name}" (${match.lang})`);
      return match;
    }
  }

  // Fallback 1: First en-US voice whose name does not match feminine blocklist
  const usVoice = eligibleVoices.find((v) => {
    const lang = v.lang.replace('_', '-').toLowerCase();
    return lang === 'en-us' || lang.startsWith('en-us');
  });
  if (usVoice) {
    console.log(`[TTS Engine] Fallback to en-US Voice: "${usVoice.name}" (${usVoice.lang})`);
    return usVoice;
  }

  // Fallback 2: First en-GB voice whose name does not match feminine blocklist
  const gbVoice = eligibleVoices.find((v) => {
    const lang = v.lang.replace('_', '-').toLowerCase();
    return lang === 'en-gb' || lang.startsWith('en-gb');
  });
  if (gbVoice) {
    console.log(`[TTS Engine] Fallback to en-GB Voice: "${gbVoice.name}" (${gbVoice.lang})`);
    return gbVoice;
  }

  // Fallback 3: Any English voice not in feminine blocklist
  const anyEnglish = eligibleVoices.find((v) => v.lang.toLowerCase().startsWith('en'));
  if (anyEnglish) return anyEnglish;

  return eligibleVoices[0];
}

/**
 * Phonetic dictionary for tech acronyms, frameworks, and architecture terms
 */
const PHONETIC_REPLACEMENTS: Array<{ pattern: RegExp; replacement: string }> = [
  // Required tech names and acronyms
  { pattern: /\bPower\s*BI\b/gi, replacement: 'Power Bee Eye' },
  { pattern: /\bPowerBI\b/gi, replacement: 'Power Bee Eye' },
  { pattern: /\bn8n\b/gi, replacement: 'n eight n' },
  { pattern: /\bAPIs\b/g, replacement: 'A. P. I.s' },
  { pattern: /\bAPI\b/g, replacement: 'A. P. I.' },
  { pattern: /\bSQL\b/gi, replacement: 'Sequel' },
  { pattern: /\bHPOS\b/gi, replacement: 'H. P. O. S.' },
  { pattern: /\bTTFB\b/gi, replacement: 'Time To First Byte' },

  // Additional portfolio specific tech terms
  { pattern: /\bWordPress\b/gi, replacement: 'Word Press' },
  { pattern: /\bWooCommerce\b/gi, replacement: 'Woo Commerce' },
  { pattern: /\bVapi\b/gi, replacement: 'Vah-pee' },
  { pattern: /\bMake\.com\b/gi, replacement: 'Make dot com' },
  { pattern: /\bsheharyarsiraj\.com\b/gi, replacement: 'sheharyarsiraj dot com' },
  { pattern: /\bLLMs\b/g, replacement: 'L. L. M.s' },
  { pattern: /\bLLM\b/g, replacement: 'L. L. M.' },
  { pattern: /\bSLAs\b/gi, replacement: 'S. L. A.s' },
  { pattern: /\bSLA\b/gi, replacement: 'S. L. A.' },
  { pattern: /\bSEOs\b/gi, replacement: 'S. E. O.s' },
  { pattern: /\bSEO\b/gi, replacement: 'S. E. O.' },
  { pattern: /\bJSON\b/gi, replacement: 'Jay-sahn' },
  { pattern: /\bUI\/UX\b/gi, replacement: 'U. I. and U. X.' },
  { pattern: /\bUI\b/g, replacement: 'U. I.' },
  { pattern: /\bUX\b/g, replacement: 'U. X.' },
  { pattern: /\bCPT\b/g, replacement: 'C. P. T.' },
  { pattern: /\bROIs\b/gi, replacement: 'R. O. I.s' },
  { pattern: /\bROI\b/gi, replacement: 'R. O. I.' },
  { pattern: /\bCWV\b/gi, replacement: 'Core Web Vitals' },
  { pattern: /\bGraphQL\b/gi, replacement: 'Graph Q. L.' },
  { pattern: /\bSaaS\b/g, replacement: 'Sass' }
];

/**
 * Normalizes an email address for natural speech
 * e.g., "sherryansari870@gmail.com" -> "sherryansari 8 7 0 at gmail dot com"
 */
function normalizeEmailForSpeech(email: string): string {
  const parts = email.split('@');
  if (parts.length !== 2) return email;
  const [localPart, domainPart] = parts;

  // Separate digits with spaces so browser TTS speaks them as single digits
  const spokenLocal = localPart
    .replace(/([a-zA-Z])(\d)/g, '$1 $2')
    .replace(/(\d)([a-zA-Z])/g, '$1 $2')
    .replace(/\d/g, (d) => ` ${d} `)
    .replace(/\./g, ' dot ')
    .replace(/[_+-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const spokenDomain = domainPart.replace(/\./g, ' dot ').replace(/\s+/g, ' ').trim();
  return `${spokenLocal} at ${spokenDomain}`;
}

/**
 * Primary Text-to-Speech Normalization Pipeline
 * Converts raw LLM output, markdown, code, and numerical sequences into clean spoken text
 */
export function normalizeTextForSpeech(rawText: string): string {
  if (!rawText || typeof rawText !== 'string') return '';

  let text = rawText;

  // 1. Strip Markdown links [text](url) -> text
  text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

  // 2. Normalize and speak email addresses before URL stripping
  text = text.replace(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g, (match) => {
    return normalizeEmailForSpeech(match);
  });

  // 3. Normalize specific URLs before raw cleanup (preserving punctuation outside domain)
  text = text.replace(/https?:\/\/(?:www\.)?([a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+)(?:\/[^\s.,!?]*)?/gi, (_match, domain) => {
    return domain.replace(/\./g, ' dot ');
  });

  // 4. Strip leftover raw URLs
  text = text.replace(/https?:\/\/\S+/gi, '');

  // 5. Strip Markdown code blocks & inline code
  text = text.replace(/```[\s\S]*?```/g, '');
  text = text.replace(/`([^`]+)`/g, '$1');

  // 6. Strip Markdown bold/italic & headings
  text = text.replace(/\*{1,3}([^*]+)\*{1,3}/g, '$1');
  text = text.replace(/_{1,3}([^_]+)_{1,3}/g, '$1');
  text = text.replace(/^#{1,6}\s+/gm, '');

  // 7. Strip list bullets, blockquotes, hashes, tildes, brackets
  text = text.replace(/^[*\-•▪◦]\s+/gm, '');
  text = text.replace(/^[>]\s+/gm, '');
  text = text.replace(/[#*~_>\[\]`•▪◦]/g, '');

  // 8. Strip Unicode emojis & decorative symbols
  text = text.replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}]/gu, '');

  // 9. Detect & Digitize International Phone Numbers
  // e.g. "+92 313 2080033" or "+923132080033" or "+1 (555) 019-2834"
  text = text.replace(/(?:\+\d[\d\s().\-]{5,}\d)/g, (match) => {
    const rawDigits = match.replace(/\D/g, '');
    if (rawDigits.length >= 7) {
      return ` ${digitizeNumberSequence(rawDigits, true)} `;
    }
    return match;
  });

  // 10. Detect & Digitize formatted local phone numbers with parentheses/dashes
  text = text.replace(/(?:\(\d{2,4}\)\s*)?\d{3,4}[\-.\s]\d{3,4}(?:[\-.\s]\d{2,5})?/g, (match) => {
    const rawDigits = match.replace(/\D/g, '');
    if (rawDigits.length >= 7) {
      return ` ${digitizeNumberSequence(rawDigits, false)} `;
    }
    return match;
  });

  // 11. Detect & Digitize raw 5+ consecutive digit strings (e.g. 123456789)
  text = text.replace(/\b\d{5,}\b/g, (match) => {
    return ` ${digitizeNumberSequence(match, false)} `;
  });

  // 12. Apply Phonetic Tech Replacements (Power BI -> Power Bee Eye, n8n -> n eight n, etc.)
  for (const { pattern, replacement } of PHONETIC_REPLACEMENTS) {
    text = text.replace(pattern, replacement);
  }

  // 13. Normalize currency amounts ($1,000 -> 1000 dollars, $5,000 -> 5000 dollars)
  text = text.replace(/\$([0-9,]+)/g, (_match, amount) => {
    const cleanAmount = amount.replace(/,/g, '');
    return `${cleanAmount} dollars`;
  });

  // 14. Clean whitespace, extra commas, and spacing around punctuation
  text = text
    .replace(/\s+([.,!?;:])/g, '$1')
    .replace(/,\s*,+/g, ',')
    .replace(/\s+/g, ' ')
    .trim();

  return text;
}

/**
 * Ensures text is normalized before vocalization without truncating acronyms
 */
export function formatSpokenResponse(rawText: string): string {
  return normalizeTextForSpeech(rawText);
}

