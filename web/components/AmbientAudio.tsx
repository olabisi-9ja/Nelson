"use client";

import { useState, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function AmbientAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        // Since we don't have actual files, we just toggle the state. 
        // In reality, this would play a workshop ambiance track.
        audioRef.current.play().catch(() => console.log("Audio playback requires a valid source"));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex items-center gap-3 mix-blend-difference">
      <span className="text-xs uppercase tracking-widest text-primary font-medium">
        {isPlaying ? "Workshop Ambience" : "Enter Workshop"}
      </span>
      <button
        onClick={toggleAudio}
        className="h-10 w-10 rounded-full border border-primary/30 flex items-center justify-center text-primary hover:bg-primary/10 transition-colors"
        aria-label="Toggle ambient sound"
      >
        {isPlaying ? <Volume2 size={16} /> : <VolumeX size={16} />}
      </button>
      
      {/* Hidden audio element - Placeholder source */}
      <audio ref={audioRef} loop>
        <source src="/audio/workshop-ambient.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
}
