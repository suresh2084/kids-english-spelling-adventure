export const playSound = (type: "correct" | "wrong" | "levelup" | "coin", muted: boolean) => {
  if (muted) return;
  const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
  
  if (type === "correct") {
    // Ascending pleasant chord
    playTone(ctx, 440, 0, 0.1);
    playTone(ctx, 554, 0.1, 0.1);
    playTone(ctx, 659, 0.2, 0.2);
  } else if (type === "wrong") {
    // Descending low tone
    playTone(ctx, 300, 0, 0.2, "sawtooth");
    playTone(ctx, 250, 0.2, 0.3, "sawtooth");
  } else if (type === "levelup") {
    // Fanfare
    playTone(ctx, 523, 0, 0.1);
    playTone(ctx, 523, 0.15, 0.1);
    playTone(ctx, 523, 0.3, 0.1);
    playTone(ctx, 659, 0.45, 0.4);
  } else if (type === "coin") {
    playTone(ctx, 880, 0, 0.1, "sine");
    playTone(ctx, 1108, 0.1, 0.2, "sine");
  }
};

const playTone = (
  ctx: AudioContext, 
  freq: number, 
  delay: number, 
  duration: number, 
  type: OscillatorType = "sine"
) => {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  
  osc.connect(gain);
  gain.connect(ctx.destination);
  
  const now = ctx.currentTime;
  gain.gain.setValueAtTime(0, now + delay);
  gain.gain.linearRampToValueAtTime(0.3, now + delay + 0.05);
  gain.gain.linearRampToValueAtTime(0, now + delay + duration);
  
  osc.start(now + delay);
  osc.stop(now + delay + duration);
};

const getBestVoice = (voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null => {
  // 1. Exact Indian English locale
  const enIN = voices.find(v => v.lang === "en-IN");
  if (enIN) return enIN;
  // 2. Voice name hints at Indian accent
  const named = voices.find(v => /ravi|heera|priya|india/i.test(v.name));
  if (named) return named;
  // 3. Any English voice
  return voices.find(v => v.lang.startsWith("en")) ?? null;
};

const doSpeak = (word: string) => {
  const synth = window.speechSynthesis;
  // Stop any current speech without the cancel-before-speak bug:
  // We stop only if actively speaking, then use a tiny delay to let
  // the engine flush before queuing the new utterance.
  if (synth.speaking) {
    synth.cancel();
    setTimeout(() => {
      const msg = buildUtterance(word);
      synth.speak(msg);
    }, 100);
  } else {
    const msg = buildUtterance(word);
    synth.speak(msg);
  }
};

const buildUtterance = (word: string): SpeechSynthesisUtterance => {
  const voices = window.speechSynthesis.getVoices();
  const voice = getBestVoice(voices);
  const msg = new SpeechSynthesisUtterance(word);
  if (voice) msg.voice = voice;
  msg.lang = voice?.lang ?? "en-IN";
  msg.rate = 0.75;
  msg.pitch = 1.0;
  msg.volume = 1.0;
  return msg;
};

export const speakWord = (word: string, muted: boolean) => {
  if (muted) return;
  if (!("speechSynthesis" in window)) return;

  const synth = window.speechSynthesis;
  const voices = synth.getVoices();

  if (voices.length > 0) {
    // Voices already loaded — speak immediately
    doSpeak(word);
  } else {
    // Voices not yet loaded — wait, then speak
    // Also set a fallback timeout in case onvoiceschanged never fires
    let spoken = false;
    const speak = () => {
      if (spoken) return;
      spoken = true;
      synth.onvoiceschanged = null;
      doSpeak(word);
    };
    synth.onvoiceschanged = speak;
    // Fallback: some browsers never fire onvoiceschanged in iframes
    setTimeout(speak, 500);
  }
};
