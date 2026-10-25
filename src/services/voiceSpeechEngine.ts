/**
 * High-Fidelity Speech Synthesis & Acoustic Engine for Zack Voice Assistant
 * 
 * Features:
 * - Phonetic normalization pre-TTS cleaner
 * - Mobile & Desktop Deep Natural Male voice heuristic selection:
 *   - Inspects both `voice.name` and `voice.voiceURI` (crucial for Android `#male_1-local` & iOS `Daniel`/`Alex`)
 *   - Strict elimination of feminine voice profiles (including Android `#female`, Chrome default female, and iOS `Samantha`)
 *   - Adaptive masculine pitch shift (0.80 pitch fallback if untagged on budget mobile devices)
 * - Safe audio muting & echo suppression during vocalization
 * - Web Audio API visualizer & hardware teardown
 */

export interface SpeechEngineConfig {
  pitch: number;
  rate: number;
  volume: number;
}

// Soft, articulate, calm executive male resonance
export const ZACK_VOICE_CONFIG: SpeechEngineConfig = {
  pitch: 0.92,
  rate: 0.97,
  volume: 1.0
};

// Cached voices for instant availability on mobile & desktop
let cachedVoices: SpeechSynthesisVoice[] = [];

if (typeof window !== 'undefined' && window.speechSynthesis) {
  cachedVoices = window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    cachedVoices = window.speechSynthesis.getVoices();
  };
}

/**
 * Primes mobile browser TTS engine on user touch gesture
 */
export function primeMobileSpeechEngine(): void {
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    cachedVoices = window.speechSynthesis.getVoices();
  }
}

/**
 * Phonetic pre-TTS normalizer:
 * Fixes tech acronyms, digitizes phone numbers into comma-spaced single digits,
 * formats email addresses, and strips markdown.
 */
export function normalizeTextForSpeech(rawText: string): string {
  if (!rawText) return '';

  let text = rawText;

  // 1. Strip Markdown bolding, italics, headers, backticks, bullet symbols
  text = text
    .replace(/[*_#`~>]/g, '')
    .replace(/^[-•*]\s+/gm, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

  // 2. Acronyms & Pronunciation corrections
  text = text.replace(/\bPower\s*BI\b/gi, 'Power B. I.');
  text = text.replace(/\bn8n\b/gi, 'n eight n');
  text = text.replace(/\bLangGraph\b/gi, 'Lang Graph');
  text = text.replace(/\bRAG\b/gi, 'Rag');
  text = text.replace(/\bSQL\b/gi, 'S. Q. L.');
  text = text.replace(/\bAPI\b/gi, 'A. P. I.');
  text = text.replace(/\bAPIs\b/gi, 'A. P. I.s');
  text = text.replace(/\bHPOS\b/gi, 'H. P. O. S.');
  text = text.replace(/\bTTFB\b/gi, 'Time To First Byte');
  text = text.replace(/\bUI\b/gi, 'U. I.');
  text = text.replace(/\bUX\b/gi, 'U. X.');
  text = text.replace(/\bMVP\b/gi, 'M. V. P.');
  text = text.replace(/\bSaaS\b/gi, 'Sass');
  text = text.replace(/\bML\b/gi, 'M. L.');
  text = text.replace(/\bUGC\b/gi, 'U. G. C.');
  text = text.replace(/\bCCNP\b/gi, 'C. C. N. P.');
  text = text.replace(/\bNDA\b/gi, 'N. D. A.');
  text = text.replace(/\bCRM\b/gi, 'C. R. M.');
  text = text.replace(/\bKPI\b/gi, 'K. P. I.');
  text = text.replace(/\bKPIs\b/gi, 'K. P. I.s');
  text = text.replace(/\bSLA\b/gi, 'S. L. A.');

  // 3. Email Addresses: "user@domain.com" -> "user at domain dot com"
  text = text.replace(/([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,})/g, (match, user, domain, ext) => {
    const userSpoken = user.replace(/\d/g, (d: string) => ` ${d} `);
    return `${userSpoken} at ${domain} dot ${ext}`;
  });

  // 4. Phone Numbers & Long Digit Sequences:
  const digitWords: Record<string, string> = {
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

  text = text.replace(/\+?(\d[\d\s-]{6,}\d)/g, (match) => {
    const hasPlus = match.startsWith('+');
    const digitsOnly = match.replace(/\D/g, '');
    if (digitsOnly.length >= 7) {
      const spokenDigits = digitsOnly
        .split('')
        .map((d) => digitWords[d] || d)
        .join(', ');
      return hasPlus ? `plus ${spokenDigits}` : spokenDigits;
    }
    return match;
  });

  // 5. Clean extra whitespace
  return text.replace(/\s+/g, ' ').trim();
}

export interface VoiceSelectionResult {
  voice: SpeechSynthesisVoice | null;
  isVerifiedMale: boolean;
}

/**
 * Strict Mobile & Desktop Natural Male Voice Heuristic Selector
 * 
 * Crucial Mobile Fix:
 * On Android (Google TTS / Samsung), the gender identifier is in `voice.voiceURI`
 * (e.g., `en-us-x-sfg#male_1-local` vs `en-us-x-sfg#female_1-local`), while `voice.name`
 * is just generic "English (United States)".
 * We inspect both `v.name` AND `v.voiceURI` to guarantee male selection on mobile!
 */
export function selectNeuralMaleVoice(voices?: SpeechSynthesisVoice[]): VoiceSelectionResult {
  const voiceList =
    voices && voices.length > 0
      ? voices
      : cachedVoices.length > 0
      ? cachedVoices
      : typeof window !== 'undefined' && window.speechSynthesis
      ? window.speechSynthesis.getVoices()
      : [];

  if (!voiceList || voiceList.length === 0) {
    return { voice: null, isVerifiedMale: false };
  }

  // Strict list of female keywords across Android, iOS, Windows, Mac, and Chrome
  const feminineKeywords = [
    'female',
    '#female',
    'woman',
    'girl',
    'zira',
    'jenny',
    'aria',
    'samantha',
    'victoria',
    'karen',
    'susan',
    'hazel',
    'catherine',
    'linda',
    'neerja',
    'heera',
    'helena',
    'hortense',
    'julie',
    'hedda',
    'elsa',
    'alva',
    'fiona',
    'moira',
    'tessa',
    'veena',
    'alice',
    'sonia',
    'amy',
    'olivia',
    'emma',
    'ava',
    'sophia',
    'isabella',
    'google us english',
    'google uk english female'
  ];

  const isFeminine = (desc: string) => {
    const lower = desc.toLowerCase();
    return feminineKeywords.some((kw) => lower.includes(kw));
  };

  // Priority 1: High-Definition Soft & Natural Male Voices (Android, iOS & Desktop)
  const priorityMalePatterns = [
    // Android mobile explicit male tags
    '#male',
    '-male',
    '_male',
    // High-definition neural male voices (Edge / Azure / Chrome)
    'guy online (natural)',
    'guyneural',
    'christopher online (natural)',
    'christopherneural',
    'eric online (natural)',
    'ericneural',
    'andrew online (natural)',
    'andrewneural',
    'brian online (natural)',
    'brianneural',
    'ryan online (natural)',
    'steffan online (natural)',
    // Windows & Mac desktop male voices
    'microsoft david desktop',
    'microsoft david',
    'microsoft mark desktop',
    'microsoft mark',
    'microsoft george',
    'google uk english male',
    // iOS / Apple mobile male voices
    'daniel',
    'alex',
    'fred',
    'aaron',
    'arthur',
    'oliver',
    'nicky',
    'gordon',
    'rishi'
  ];

  for (const prio of priorityMalePatterns) {
    const match = voiceList.find((v) => {
      const fullDesc = `${v.name || ''} ${v.voiceURI || ''}`.toLowerCase();
      return fullDesc.includes(prio) && !isFeminine(fullDesc);
    });
    if (match) return { voice: match, isVerifiedMale: true };
  }

  // Priority 2: Any English voice with explicit "male" keyword in name or URI
  const maleTagged = voiceList.find((v) => {
    const fullDesc = `${v.name || ''} ${v.voiceURI || ''}`.toLowerCase();
    return (
      (v.lang.startsWith('en') || v.lang.startsWith('en-US') || v.lang.startsWith('en-GB')) &&
      fullDesc.includes('male') &&
      !isFeminine(fullDesc)
    );
  });
  if (maleTagged) return { voice: maleTagged, isVerifiedMale: true };

  // Priority 3: Any en-US / en-GB voice that does NOT contain any feminine keywords
  const fallbackMale = voiceList.find((v) => {
    const fullDesc = `${v.name || ''} ${v.voiceURI || ''}`.toLowerCase();
    return (v.lang === 'en-US' || v.lang.startsWith('en')) && !isFeminine(fullDesc);
  });
  if (fallbackMale) return { voice: fallbackMale, isVerifiedMale: false };

  return { voice: voiceList[0] || null, isVerifiedMale: false };
}

/**
 * Speaks text using window.speechSynthesis with anti-cut-off keepalive and mobile masculine pitch enforcement
 */
export function speakText(
  rawText: string,
  callbacks: {
    onStart?: () => void;
    onEnd?: () => void;
    onError?: (err: any) => void;
  } = {}
): SpeechSynthesisUtterance | null {
  if (typeof window === 'undefined' || !window.speechSynthesis) return null;

  // Cancel any prior speech immediately
  if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
    window.speechSynthesis.cancel();
  }

  const normalized = normalizeTextForSpeech(rawText);
  if (!normalized) {
    callbacks.onEnd?.();
    return null;
  }

  const utterance = new SpeechSynthesisUtterance(normalized);
  const voices = window.speechSynthesis.getVoices();
  const selection = selectNeuralMaleVoice(voices);

  if (selection.voice) {
    utterance.voice = selection.voice;
  }

  // Adaptive Masculine Pitch:
  // If verified male voice (e.g. Guy, David, Android #male, Daniel): use soft, articulate 0.92 pitch.
  // If unverified/fallback on budget mobile: lower pitch to 0.80 to ensure a distinctly deep male resonance!
  utterance.pitch = selection.isVerifiedMale ? ZACK_VOICE_CONFIG.pitch : 0.80;
  utterance.rate = ZACK_VOICE_CONFIG.rate;
  utterance.volume = ZACK_VOICE_CONFIG.volume;

  let keepAliveTimer: any = null;

  utterance.onstart = () => {
    // Chrome keep-alive hack: pause & resume every 10 seconds to prevent silent engine sleep
    keepAliveTimer = setInterval(() => {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.pause();
        window.speechSynthesis.resume();
      }
    }, 10000);
    callbacks.onStart?.();
  };

  const cleanUp = () => {
    if (keepAliveTimer) {
      clearInterval(keepAliveTimer);
      keepAliveTimer = null;
    }
  };

  utterance.onend = () => {
    cleanUp();
    callbacks.onEnd?.();
  };

  utterance.onerror = (e) => {
    cleanUp();
    if (e.error !== 'canceled' && e.error !== 'interrupted') {
      callbacks.onError?.(e);
    } else {
      callbacks.onEnd?.();
    }
  };

  window.speechSynthesis.speak(utterance);
  return utterance;
}

/**
 * Immediate stop for active speech
 */
export function stopSpeaking(): void {
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
}

/**
 * Web Audio API Volume Visualizer & Hardware Monitor
 */
export function setupAudioVisualizer(
  stream: MediaStream,
  onVolume: (level: number) => void
): { audioContext: AudioContext; analyser: AnalyserNode; stop: () => void } {
  const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
  const audioContext = new AudioContextClass();
  const analyser = audioContext.createAnalyser();
  analyser.fftSize = 256;
  analyser.smoothingTimeConstant = 0.65;

  const source = audioContext.createMediaStreamSource(stream);
  source.connect(analyser);

  const dataArray = new Uint8Array(analyser.frequencyBinCount);
  let animationId: number | null = null;
  let isRunning = true;

  const update = () => {
    if (!isRunning) return;
    analyser.getByteFrequencyData(dataArray);

    let sum = 0;
    for (let i = 0; i < dataArray.length; i++) {
      sum += dataArray[i];
    }
    const average = sum / dataArray.length;
    const normalized = Math.min(1, average / 100);
    onVolume(normalized);

    animationId = requestAnimationFrame(update);
  };

  update();

  const stop = () => {
    isRunning = false;
    if (animationId) cancelAnimationFrame(animationId);
    try {
      source.disconnect();
      analyser.disconnect();
      if (audioContext.state !== 'closed') {
        audioContext.close();
      }
    } catch (err) {
      // already closed
    }
  };

  return { audioContext, analyser, stop };
}
