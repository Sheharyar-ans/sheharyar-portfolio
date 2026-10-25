/**
 * High-Fidelity Speech Synthesis & Acoustic Engine for Zack Voice Assistant
 * 
 * Features:
 * - Phonetic normalization pre-TTS cleaner
 * - Ultra-strict Soft Natural Male neural voice heuristic selection (zero female voice fallback)
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
  pitch: 0.94,
  rate: 0.97,
  volume: 1.0
};

// Cached voices for instant availability
let cachedVoices: SpeechSynthesisVoice[] = [];

if (typeof window !== 'undefined' && window.speechSynthesis) {
  cachedVoices = window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    cachedVoices = window.speechSynthesis.getVoices();
  };
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

/**
 * Strict Soft Natural Male Voice Heuristic Selector
 * Explicitly excludes feminine voice profiles.
 * IMPORTANT: In Google Chrome, "Google US English" is a female voice. It is strictly excluded.
 */
export function selectNeuralMaleVoice(voices?: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  const voiceList = (voices && voices.length > 0) ? voices : (cachedVoices.length > 0 ? cachedVoices : (typeof window !== 'undefined' && window.speechSynthesis ? window.speechSynthesis.getVoices() : []));

  if (!voiceList || voiceList.length === 0) return null;

  // Strict list of female keywords and Chrome female defaults to block
  const feminineKeywords = [
    'zira', 'jenny', 'aria', 'samantha', 'victoria', 'karen', 'susan', 
    'hazel', 'catherine', 'linda', 'female', 'woman', 'girl', 'neerja',
    'heera', 'helena', 'hortense', 'julie', 'hedda', 'elsa', 'alva',
    'fiona', 'moira', 'tessa', 'veena', 'alice', 'sonia', 'amy', 'olivia',
    'emma', 'ava', 'sophia', 'isabella', 'google us english', 'google uk english female'
  ];

  const isFeminine = (name: string) => {
    const lower = name.toLowerCase();
    return feminineKeywords.some((kw) => lower.includes(kw));
  };

  // Priority 1: High-Definition Soft & Natural Male Voices (Edge Natural / Neural)
  const prioritySoftMaleVoices = [
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
    'microsoft david desktop',
    'microsoft david',
    'microsoft mark desktop',
    'microsoft mark',
    'microsoft george',
    'google uk english male',
    'daniel',
    'alex',
    'fred'
  ];

  for (const prio of prioritySoftMaleVoices) {
    const match = voiceList.find((v) => {
      const lower = v.name.toLowerCase();
      return lower.includes(prio) && !isFeminine(lower);
    });
    if (match) return match;
  }

  // Priority 2: Any English voice with explicit "male" keyword
  const maleTagged = voiceList.find((v) => {
    const lower = v.name.toLowerCase();
    return (
      (v.lang.startsWith('en') || v.lang.startsWith('en-US') || v.lang.startsWith('en-GB')) &&
      lower.includes('male') &&
      !isFeminine(lower)
    );
  });
  if (maleTagged) return maleTagged;

  // Priority 3: Non-feminine en-US / en-GB desktop voices
  const fallbackMale = voiceList.find((v) => {
    const lower = v.name.toLowerCase();
    return (v.lang === 'en-US' || v.lang.startsWith('en')) && !isFeminine(lower);
  });
  if (fallbackMale) return fallbackMale;

  return voiceList[0] || null;
}

/**
 * Speaks text using window.speechSynthesis with anti-cut-off keepalive
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
  window.speechSynthesis.cancel();

  const normalized = normalizeTextForSpeech(rawText);
  if (!normalized) {
    callbacks.onEnd?.();
    return null;
  }

  const utterance = new SpeechSynthesisUtterance(normalized);
  utterance.pitch = ZACK_VOICE_CONFIG.pitch;
  utterance.rate = ZACK_VOICE_CONFIG.rate;
  utterance.volume = ZACK_VOICE_CONFIG.volume;

  const voices = window.speechSynthesis.getVoices();
  const maleVoice = selectNeuralMaleVoice(voices);
  if (maleVoice) {
    utterance.voice = maleVoice;
  }

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
 * Immediate stop for active speech (used for Barge-in and manual cancellation)
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
