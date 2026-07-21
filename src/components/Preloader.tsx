import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
  const [percent, setPercent] = useState(0);
  const [visible, setVisible] = useState(true);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    // If not homepage, we don't wait for video
    if (window.location.pathname !== "/") {
      setVideoReady(true);
    }

    const handleVideoReady = () => setVideoReady(true);
    window.addEventListener("nelson-video-ready", handleVideoReady);

    // Backup safety timeout (10s max for slow connections)
    const backupTimer = setTimeout(() => {
      setVideoReady(true);
    }, 10000);

    return () => {
      window.removeEventListener("nelson-video-ready", handleVideoReady);
      clearTimeout(backupTimer);
    };
  }, []);

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem("nelson-loaded");
    if (hasLoaded) {
      setVisible(false);
      return;
    }

    let timer: any;
    
    const updateProgress = () => {
      setPercent((prev) => {
        if (prev >= 100) {
          return 100;
        }

        // Cap progress at 95% until video is ready to play
        if (!videoReady && prev >= 95) {
          return 95;
        }

        // Fast-forward once video is ready, otherwise crawl steadily
        const step = videoReady 
          ? Math.floor(Math.random() * 20) + 15 
          : Math.floor(Math.random() * 8) + 3;

        const next = prev + step;
        return next >= 100 ? 100 : next;
      });

      const nextDelay = videoReady ? 30 : 70;
      timer = setTimeout(updateProgress, nextDelay);
    };

    timer = setTimeout(updateProgress, 70);
    return () => clearTimeout(timer);
  }, [videoReady]);

  useEffect(() => {
    if (percent === 100 && videoReady) {
      const timer = setTimeout(() => {
        setVisible(false);
        sessionStorage.setItem("nelson-loaded", "true");
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [percent, videoReady]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-obsidian/95 backdrop-blur-2xl"
        >
          <div className="flex flex-col items-center justify-center text-center">
            {/* Logo */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="font-display text-4xl md:text-6xl font-black uppercase tracking-[0.25em] text-gold"
            >
              NELSON
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-4 text-[9px] uppercase tracking-[0.3em] text-cream/45"
            >
              Bespoke Luxury Footwear
            </motion.p>
          </div>

          {/* Progress bar and counter */}
          <div className="absolute bottom-20 flex flex-col items-center gap-3">
            <span className="font-mono text-xs tracking-widest text-gold">
              {percent}%
            </span>
            <div className="h-[1px] w-40 overflow-hidden bg-white/10">
              <motion.div
                className="h-full bg-gold"
                initial={{ width: 0 }}
                animate={{ width: `${percent}%` }}
                transition={{ duration: 0.05 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
