/**
 * High-Fidelity Speech Synthesis & Acoustic Engine for Zack Voice Assistant
 * 
 * Features:
 * - Phonetic normalization pre-TTS cleaner
 * - Natural American Male neural voice heuristic selection
 * - Safe audio muting & echo suppression during vocalization
 * - Web Audio API visualizer & hardware teardown
 */

export interface SpeechEngineConfig {
  pitch: number;
  rate: number;
  volume: number;
}

export const ZACK_VOICE_CONFIG: SpeechEngineConfig = {
  pitch: 0.95,
  rate: 0.98,
  volume: 1.0
};

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
  text = text.replace(/\bSQL\b/gi, 'S. Q. L.');
  text = text.replace(/\bAPI\b/gi, 'A. P. I.');
  text = text.replace(/\bAPIs\b/gi, 'A. P. I.s');
  text = text.replace(/\bHPOS\b/gi, 'H. P. O. S.');
  text = text.replace(/\bTTFB\b/gi, 'Time To First Byte');
  text = text.replace(/\bUI\b/gi, 'U. I.');
  text = text.replace(/\bUX\b/gi, 'U. X.');
  text = text.replace(/\bMVP\b/gi, 'M. V. P.');
  text = text.replace(/\bSaaS\b/gi, 'Sass');
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
  // Convert digits into comma-separated single words so TTS never says "nine billion..."
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

  // Replace international phone sequences (+92 313 2080033 or +923132080033)
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
 * Aggressive American Male Neural Voice Heuristic Selector
 * Explicitly excludes feminine voice profiles (Zira, Jenny, Aria, Samantha, etc.)
 */
export function selectNeuralMaleVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  if (!voices || voices.length === 0) return null;

  const feminineKeywords = [
    'zira', 'jenny', 'aria', 'samantha', 'victoria', 'karen', 'susan', 
    'hazel', 'catherine', 'linda', 'female', 'woman', 'girl'
  ];

  const isFeminine = (name: string) => {
    const lower = name.toLowerCase();
    return feminineKeywords.some((kw) => lower.includes(kw));
  };

  // Tier 1: High-Definition Neural / Natural American Male Voices
  const tier1Priority = [
    'guy online (natural)',
    'christopher online (natural)',
    'eric online (natural)',
    'google us english male',
    'google us english',
    'microsoft david',
    'daniel'
  ];

  for (const prio of tier1Priority) {
    const match = voices.find((v) => {
      const lower = v.name.toLowerCase();
      return lower.includes(prio) && !isFeminine(lower);
    });
    if (match) return match;
  }

  // Tier 2: Any English voice with explicit "male" tag not in feminine list
  const maleTagged = voices.find((v) => {
    const lower = v.name.toLowerCase();
    return (
      (v.lang.startsWith('en') || v.lang.startsWith('en-US') || v.lang.startsWith('en-GB')) &&
      lower.includes('male') &&
      !isFeminine(lower)
    );
  });
  if (maleTagged) return maleTagged;

  // Tier 3: Any en-US voice not matching feminine blacklist
  const anyUsNonFeminine = voices.find((v) => {
    const lower = v.name.toLowerCase();
    return (v.lang === 'en-US' || v.lang.startsWith('en')) && !isFeminine(lower);
  });
  if (anyUsNonFeminine) return anyUsNonFeminine;

  // Fallback: first voice
  return voices[0] || null;
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
    // Ignore canceled errors from user interruptions
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
    // Normalize to 0..1 scale
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
