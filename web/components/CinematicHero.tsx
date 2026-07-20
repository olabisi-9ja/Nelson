"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CinematicHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Initial state
      gsap.set([headlineRef.current, subheadRef.current], {
        y: 50,
        opacity: 0,
      });
      gsap.set(lineRef.current, { scaleX: 0 });

      // Animate in
      tl.to(headlineRef.current, {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power4.out",
        delay: 0.5,
      })
      .to(lineRef.current, {
        scaleX: 1,
        duration: 1,
        ease: "power3.inOut",
      }, "-=1")
      .to(subheadRef.current, {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power3.out",
      }, "-=0.8");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-background"
    >
      {/* Background ambient texture (placeholder gradient since no image provided) */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/20 via-background to-background" />

      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-5xl mx-auto">
        <h1 
          ref={headlineRef}
          className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-foreground uppercase mb-8"
        >
          Crafted Without<br />
          <span className="text-primary italic font-serif lowercase">Compromise.</span>
        </h1>

        <div ref={lineRef} className="h-[1px] w-24 bg-primary/50 mb-8 origin-center" />

        <p 
          ref={subheadRef}
          className="text-lg md:text-xl text-muted-foreground font-light tracking-wide max-w-2xl"
        >
          Handmade Luxury Footwear Built for Those Who Value Excellence.
        </p>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Scroll to explore</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-primary/50 to-transparent" />
        </div>
      </div>
    </section>
  );
}
