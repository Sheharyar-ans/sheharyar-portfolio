/**
 * High-Fidelity Speech Synthesis & Acoustic Engine for Elena Voice Assistant
 * 
 * Features:
 * - Phonetic normalization pre-TTS cleaner
 * - Mobile & Desktop Soft Natural Female voice heuristic selection:
 *   - Priority 1: High-Definition Natural Female voices (Microsoft Jenny/Aria, Google US English, iOS Samantha/Victoria, Android #female_1)
 *   - Inspects both `voice.name` and `voice.voiceURI`
 *   - Soft, articulate, natural conversational tone (pitch: 1.0, rate: 0.98)
 * - Safe audio muting & echo suppression during vocalization
 * - Web Audio API visualizer & hardware teardown
 */

export interface SpeechEngineConfig {
  pitch: number;
  rate: number;
  volume: number;
}

// Soft, articulate, natural feminine resonance
export const ELENA_VOICE_CONFIG: SpeechEngineConfig = {
  pitch: 1.0,
  rate: 0.98,
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
 * Unlocks iOS Safari and Android Chrome audio policy with silent priming
 */
export function primeMobileSpeechEngine(): void {
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    cachedVoices = window.speechSynthesis.getVoices();
    try {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
      // Speak a blank micro-utterance synchronously on touch to unlock mobile audio output
      const unlock = new SpeechSynthesisUtterance(' ');
      unlock.volume = 0.01;
      unlock.rate = 2.0;
      unlock.lang = 'en-US';
      window.speechSynthesis.speak(unlock);
    } catch {
      // safe fallback
    }
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
  isVerifiedFemale: boolean;
}

/**
 * Strict Mobile & Desktop Natural Soft Female Voice Heuristic Selector for Elena
 * 
 * Works across:
 * - Chrome Desktop & Android: "Google US English", "en-us-x-sfg#female_1-local", "en-us-x-sfg#female_2-local"
 * - Microsoft Edge: "Microsoft Jenny Online (Natural)", "Microsoft Aria Online (Natural)", "JennyNeural", "AriaNeural"
 * - iOS Safari & iPhone: "Samantha", "Victoria", "Karen", "Serena"
 * - Windows Desktop: "Microsoft Zira Desktop"
 */
export function selectNeuralFemaleVoice(voices?: SpeechSynthesisVoice[]): VoiceSelectionResult {
  const voiceList =
    voices && voices.length > 0
      ? voices
      : cachedVoices.length > 0
      ? cachedVoices
      : typeof window !== 'undefined' && window.speechSynthesis
      ? window.speechSynthesis.getVoices()
      : [];

  if (!voiceList || voiceList.length === 0) {
    return { voice: null, isVerifiedFemale: false };
  }

  // Strict list of male keywords to disqualify
  const masculineKeywords = [
    '#male',
    '-male',
    '_male',
    'david',
    'guy',
    'christopher',
    'eric',
    'mark',
    'george',
    'daniel',
    'alex',
    'fred',
    'aaron',
    'arthur',
    'oliver',
    'andrew',
    'brian',
    'ryan',
    'steffan',
    'nicky',
    'gordon',
    'rishi',
    'google uk english male'
  ];

  const isMasculine = (desc: string) => {
    const lower = desc.toLowerCase();
    // Special guard: ensure "female" doesn't trigger "male"
    const stripped = lower.replace(/female/g, '').replace(/#female/g, '');
    return masculineKeywords.some((kw) => stripped.includes(kw));
  };

  // Priority 1: High-Definition Soft & Natural Female Voices
  const priorityFemalePatterns = [
    // Edge / Azure Natural Soft Female Voices (World-class natural quality)
    'jenny online (natural)',
    'jennyneural',
    'aria online (natural)',
    'arianeural',
    'michelle online (natural)',
    'ana online (natural)',
    'emma online (natural)',
    // Google Chrome Desktop & Android high-quality natural female
    'google us english',
    'google uk english female',
    // Android Google TTS explicit female packages
    '#female_1',
    '#female_2',
    '#female',
    '_female',
    '-female',
    'female_1',
    'female_2',
    // iOS / Apple iPhone natural female voices
    'samantha',
    'victoria',
    'serena',
    'karen',
    'sora',
    'zira desktop',
    'zira'
  ];

  for (const prio of priorityFemalePatterns) {
    const match = voiceList.find((v) => {
      const fullDesc = `${v.name || ''} ${v.voiceURI || ''}`.toLowerCase();
      return fullDesc.includes(prio) && !isMasculine(fullDesc);
    });
    if (match) return { voice: match, isVerifiedFemale: true };
  }

  // Priority 2: Any English voice with explicit "female" keyword in name or URI
  const femaleTagged = voiceList.find((v) => {
    const fullDesc = `${v.name || ''} ${v.voiceURI || ''}`.toLowerCase();
    return (
      (v.lang.startsWith('en') || v.lang.startsWith('en-US') || v.lang.startsWith('en-GB')) &&
      fullDesc.includes('female') &&
      !isMasculine(fullDesc)
    );
  });
  if (femaleTagged) return { voice: femaleTagged, isVerifiedFemale: true };

  // Priority 3: Any en-US / en-GB voice that does NOT match masculine keywords
  const fallbackFemale = voiceList.find((v) => {
    const fullDesc = `${v.name || ''} ${v.voiceURI || ''}`.toLowerCase();
    return (v.lang === 'en-US' || v.lang.startsWith('en')) && !isMasculine(fullDesc);
  });
  if (fallbackFemale) return { voice: fallbackFemale, isVerifiedFemale: false };

  return { voice: voiceList[0] || null, isVerifiedFemale: false };
}

/**
 * Speaks text using window.speechSynthesis with anti-cut-off keepalive and soft feminine pitch
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

  try {
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }
    // Cancel any prior speech immediately
    if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
      window.speechSynthesis.cancel();
    }
  } catch {
    // safe resume/cancel
  }

  const normalized = normalizeTextForSpeech(rawText);
  if (!normalized) {
    callbacks.onEnd?.();
    return null;
  }

  const utterance = new SpeechSynthesisUtterance(normalized);
  utterance.lang = 'en-US'; // Strict English pronunciation across iOS & Android

  const voices = window.speechSynthesis.getVoices();
  const selection = selectNeuralFemaleVoice(voices);

  if (selection.voice) {
    utterance.voice = selection.voice;
  }

  // Feminine Natural Cadence: soft, crystal-clear 1.0 pitch, measured 0.98 rate
  utterance.pitch = ELENA_VOICE_CONFIG.pitch;
  utterance.rate = ELENA_VOICE_CONFIG.rate;
  utterance.volume = ELENA_VOICE_CONFIG.volume;

  const isIOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);
  let keepAliveTimer: any = null;

  utterance.onstart = () => {
    // Only run pause/resume keep-alive on desktop Chrome, NEVER on iOS (iOS freezes on pause)
    if (!isIOS) {
      keepAliveTimer = setInterval(() => {
        if (window.speechSynthesis.speaking) {
          window.speechSynthesis.pause();
          window.speechSynthesis.resume();
        }
      }, 10000);
    }
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

  try {
    window.speechSynthesis.speak(utterance);
    // Extra wake-up pulse for mobile browsers
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }
  } catch (err) {
    console.warn('Speech synthesis speak notice:', err);
  }

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
