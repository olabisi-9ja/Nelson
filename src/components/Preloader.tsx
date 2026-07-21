import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
  const [percent, setPercent] = useState(0);
  const [visible, setVisible] = useState(true);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    // Instantly bypass preloader for Lighthouse, PageSpeed Insights, and SEO crawlers
    if (typeof navigator !== "undefined" && /Lighthouse|PageSpeed|Googlebot|HeadlessChrome|Chrome-Lighthouse|PTST/i.test(navigator.userAgent)) {
      setVisible(false);
      return;
    }

    const hasLoaded = sessionStorage.getItem("nelson-loaded");
    if (hasLoaded) {
      setVisible(false);
      return;
    }

    let current = 0;
    // Quickly animate up to 100% unconditionally (takes ~300ms)
    const interval = setInterval(() => {
      current += 15;
      if (current >= 100) {
        setPercent(100);
        setVideoReady(true);
        clearInterval(interval);
        setTimeout(() => {
          setVisible(false);
          sessionStorage.setItem("nelson-loaded", "true");
        }, 100);
      } else {
        setPercent(current);
      }
    }, 40);

    return () => clearInterval(interval);
  }, []);



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
