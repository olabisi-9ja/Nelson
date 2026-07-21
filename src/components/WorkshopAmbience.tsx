import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export function WorkshopAmbience() {
  const [playing, setPlaying] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const sourcesRef = useRef<AudioNode[]>([]);
  const intervalRef = useRef<number | null>(null);

  const stop = () => {
    sourcesRef.current.forEach((n) => {
      try {
        (n as AudioScheduledSourceNode).stop?.();
        (n as GainNode).disconnect?.();
      } catch {}
    });
    sourcesRef.current = [];
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    ctxRef.current?.close();
    ctxRef.current = null;
    setPlaying(false);
  };

  useEffect(() => {
    return () => stop();
  }, []);

  const createBrownNoise = (ctx: AudioContext) => {
    const bufferSize = 2 * ctx.sampleRate;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let lastOut = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      data[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = data[i];
      data[i] *= 3.5;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 400;
    const gain = ctx.createGain();
    gain.gain.value = 0.03;
    noise.connect(filter).connect(gain).connect(ctx.destination);
    noise.start();
    sourcesRef.current.push(noise, gain);
  };

  const thud = (ctx: AudioContext) => {
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(80, ctx.currentTime);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.3);
  };

  const needle = (ctx: AudioContext) => {
    const bufferSize = ctx.sampleRate * 0.02;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * 0.5;
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = "highpass";
    filter.frequency.value = 2000;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.02, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.02);
    noise.connect(filter).connect(gain).connect(ctx.destination);
    noise.start();
  };

  const start = () => {
    const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    ctxRef.current = ctx;
    createBrownNoise(ctx);
    intervalRef.current = window.setInterval(() => {
      if (Math.random() > 0.65) thud(ctx);
      if (Math.random() > 0.5) setTimeout(() => needle(ctx), Math.random() * 800);
    }, 3500);
    setPlaying(true);
  };

  const toggle = () => {
    if (playing) stop();
    else start();
  };

  return (
    <button
      onClick={toggle}
      aria-label={playing ? "Mute workshop ambience" : "Play workshop ambience"}
      className="group fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-charcoal/80 text-gold backdrop-blur-md transition hover:border-gold/40 hover:bg-charcoal"
    >
      {playing ? (
        <Volume2 className="h-5 w-5 transition group-hover:scale-110" />
      ) : (
        <VolumeX className="h-5 w-5 text-chrome transition group-hover:text-gold" />
      )}
    </button>
  );
}
