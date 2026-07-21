import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Plus } from "lucide-react";

export function Home() {
  const [slideIndex, setSlideIndex] = useState(0);
  const leftImages = ["/images/oxford-shoe.jpg", "/images/loafer.jpg"];
  const rightImages = ["/images/chelsea-boot.jpg", "/images/product-hero.jpg"];

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % 2);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-warm-white text-obsidian font-sans">
      {/* HERO SECTION */}
      <section className="w-full pt-16 pb-12 md:pt-20 md:pb-16 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 flex flex-col items-center">
          {/* Huge Logo text */}
          <h1 className="w-full text-center font-display text-[14vw] md:text-[11vw] font-black uppercase tracking-tighter text-obsidian leading-[0.8] select-none mb-6 md:mb-8">
            NELSON
          </h1>

          {/* Three Media Columns */}
          <div className="flex w-full items-center justify-start md:justify-center gap-6 overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden py-4 md:overflow-visible" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
            
            {/* 1. Left Shoe Slideshow */}
            <div className="snap-center shrink-0 w-[75vw] md:w-1/3 aspect-[3/4] md:h-[65vh] rounded-[2rem] overflow-hidden bg-charcoal/5 relative transition-all duration-700 hover:scale-[1.02] border border-obsidian/5">
              {leftImages.map((img, idx) => (
                <img
                  key={img}
                  src={img}
                  alt="Bespoke Shoe"
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
                    idx === slideIndex ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* 2. Middle Video (Taller) */}
            <div className="snap-center shrink-0 w-[75vw] md:w-[38%] aspect-[3/4] md:aspect-[9/14] md:h-[78vh] rounded-[2rem] overflow-hidden bg-charcoal/5 relative shadow-xl transition-all duration-700 hover:scale-[1.02] border border-obsidian/10">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 h-full w-full object-cover object-center scale-[1.35] md:scale-[1.5]"
              >
                <source src="/videos/hero-video.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>

            {/* 3. Right Shoe Slideshow */}
            <div className="snap-center shrink-0 w-[75vw] md:w-1/3 aspect-[3/4] md:h-[65vh] rounded-[2rem] overflow-hidden bg-charcoal/5 relative transition-all duration-700 hover:scale-[1.02] border border-obsidian/5">
              {rightImages.map((img, idx) => (
                <img
                  key={img}
                  src={img}
                  alt="Luxury Boot"
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
                    idx === slideIndex ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

          </div>

          {/* Brand statement & buttons */}
          <div className="mt-16 text-center max-w-4xl px-4">
            <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-gold">
              Lagos — Craftsmanship
            </h2>
            <p className="text-3xl font-bold leading-tight md:text-5xl lg:text-6xl tracking-tight text-obsidian text-balance">
              Crafted without compromise. Handmade luxury footwear built for excellence.
            </p>
            <div className="mt-10 flex items-center justify-center gap-8">
              <Link to="/collections" className="rounded-full bg-obsidian px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-warm-white transition duration-300 hover:bg-leather">
                Collections
              </Link>
              <Link to="/order" className="rounded-full border-2 border-obsidian px-8 py-3 text-xs font-bold uppercase tracking-widest text-obsidian transition duration-300 hover:bg-obsidian hover:text-warm-white">
                Order Now
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 1.5: FEATURED COLLECTIONS (SHOES) */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="mb-12 flex items-end justify-between border-b border-obsidian/10 pb-8">
          <h2 className="text-3xl font-black tracking-tight md:text-5xl">
            Featured Collections
          </h2>
          <Link to="/collections" className="hidden items-center gap-2 font-bold uppercase tracking-widest text-obsidian hover:underline md:flex">
            View All Shoes <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid gap-8 md:grid-cols-3">
          {[
            { title: "Oxford", desc: "The language of power", img: "/images/oxford-shoe.jpg", link: "/collections/oxford" },
            { title: "Chelsea", desc: "Effortless sophistication", img: "/images/chelsea-boot.jpg", link: "/collections/chelsea" },
            { title: "Loafers", desc: "Relaxed refinement", img: "/images/loafer.jpg", link: "/collections/loafers" }
          ].map((col, i) => (
            <Link key={i} to={col.link} className="group cursor-pointer block">
              <div className="mb-6 overflow-hidden rounded-xl bg-obsidian/5 aspect-[4/5]">
                <img src={col.img} alt={col.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              </div>
              <h3 className="text-2xl font-black leading-tight group-hover:underline">{col.title}</h3>
              <p className="mt-2 text-sm font-medium uppercase tracking-widest text-obsidian/60">{col.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* SECTION 2: THE ART OF SHOEMAKING */}
      <section className="mx-auto max-w-7xl px-6 py-12 md:py-24">
        <div className="mb-16 md:w-2/3">
          <h2 className="text-5xl font-black tracking-tight md:text-7xl lg:text-8xl leading-none">
            The art of <br /> shoemaking.
          </h2>
        </div>
        
        <div className="grid gap-12 md:grid-cols-2 lg:gap-24">
          <div className="overflow-hidden rounded-xl">
            <img 
              src="/images/craft-hands.jpg" 
              alt="Artisan crafting a shoe" 
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="mb-6 text-2xl font-bold tracking-tight md:text-3xl">
              We do not mass produce. We measure, cut, stitch, last, welt, and finish every pair by hand in our Lagos studio.
            </h3>
            <p className="mb-8 text-obsidian/70 md:text-lg">
              Every pair of Nelson shoes is an intricate process of patience and precision. Built from the finest leathers globally sourced and crafted by artisans who have dedicated their lives to the trade.
            </p>
            <Link to="/craftsmanship" className="flex items-center gap-2 font-bold uppercase tracking-widest text-obsidian hover:underline">
              Explore Our Process <ArrowRight className="h-4 w-4" />
            </Link>

            <div className="mt-16 border-t border-obsidian/20 pt-8">
              <div className="flex items-center justify-between py-4 border-b border-obsidian/10">
                <span className="font-bold">Bespoke Fitting</span>
                <Plus className="h-5 w-5" />
              </div>
              <div className="flex items-center justify-between py-4 border-b border-obsidian/10">
                <span className="font-bold">Hand Welted Construction</span>
                <Plus className="h-5 w-5" />
              </div>
              <div className="flex items-center justify-between py-4 border-b border-obsidian/10">
                <span className="font-bold">Premium Materials</span>
                <Plus className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: BEHIND THE SEAMS */}
      <section className="w-full">
        <div className="relative h-[60vh] w-full bg-obsidian">
          <img 
            src="/images/hero-workshop.jpg" 
            alt="Leather workshop" 
            className="absolute inset-0 h-full w-full object-cover opacity-60"
          />
          <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
            <h2 className="text-5xl font-black text-white md:text-7xl lg:text-8xl tracking-tight">
              Behind the <br /> seams.
            </h2>
          </div>
        </div>
        <div className="bg-obsidian px-6 py-16 text-white md:py-24">
          <div className="mx-auto max-w-7xl grid gap-12 md:grid-cols-2">
            <div>
              <p className="text-2xl font-bold md:text-3xl leading-tight">
                Our short films document the meticulous process and unwavering dedication poured into every Nelson pair.
              </p>
            </div>
            <div className="flex flex-col justify-end">
              <div className="mb-8 flex gap-12 border-b border-white/20 pb-8">
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/60">Hours of Craft</p>
                  <p className="text-4xl font-black mt-2">40+</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/60">Stitches per shoe</p>
                  <p className="text-4xl font-black mt-2">1,200</p>
                </div>
              </div>
              <Link to="/film" className="flex items-center gap-2 font-bold uppercase tracking-widest hover:underline">
                Watch the films <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: JOURNAL & STORIES */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="mb-12 flex items-end justify-between">
          <h2 className="text-3xl font-black tracking-tight md:text-5xl">
            Journal & Stories
          </h2>
          <Link to="/journal" className="hidden items-center gap-2 font-bold uppercase tracking-widest hover:underline md:flex">
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid gap-8 md:grid-cols-3">
          {[
            { title: "The Anatomy of a Hand-Welted Shoe", date: "Oct 12, 2024", img: "/images/oxford-shoe.jpg" },
            { title: "Selecting the Finest Italian Calfskin", date: "Sep 28, 2024", img: "/images/chelsea-boot.jpg" },
            { title: "A Day in the Lagos Studio", date: "Sep 15, 2024", img: "/images/loafer.jpg" }
          ].map((post, i) => (
            <Link key={i} to="/journal" className="group cursor-pointer block">
              <div className="mb-4 overflow-hidden rounded-lg bg-obsidian/5 aspect-[4/3]">
                <img src={post.img} alt={post.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              </div>
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-obsidian/50">{post.date}</p>
              <h3 className="text-xl font-bold leading-tight group-hover:underline">{post.title}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* SECTION 5: A LEGACY OF EXCELLENCE */}
      <section className="mx-auto max-w-7xl px-6 py-12 md:py-24 text-center">
        <h2 className="mb-16 text-5xl font-black tracking-tight md:text-7xl lg:text-8xl leading-none">
          A legacy of <br /> excellence.
        </h2>
        <div className="mb-16 w-full overflow-hidden rounded-xl">
          <img 
            src="/images/product-hero.jpg" 
            alt="Classic footwear" 
            className="w-full object-cover aspect-[21/9]"
          />
        </div>
        <div className="grid gap-12 text-left md:grid-cols-2 lg:gap-24">
          <div>
            <h3 className="mb-6 text-2xl font-bold md:text-3xl leading-tight">
              Our footwear is designed to last a lifetime. We are committed to creating heirloom pieces that age beautifully with every wear.
            </h3>
            <div className="flex gap-12 border-t border-obsidian/10 pt-8 mt-8">
              <div>
                <p className="text-4xl font-black">10+</p>
                <p className="text-xs uppercase tracking-widest font-bold mt-2 text-obsidian/60">Years of Wear</p>
              </div>
              <div>
                <p className="text-4xl font-black">100%</p>
                <p className="text-xs uppercase tracking-widest font-bold mt-2 text-obsidian/60">Resolable</p>
              </div>
            </div>
          </div>
          <div>
            <div className="border-t border-obsidian/20">
              <div className="flex items-center justify-between py-6 border-b border-obsidian/10 cursor-pointer">
                <span className="text-xl font-bold">Shoe Care Guide</span>
                <Plus className="h-6 w-6" />
              </div>
              <div className="flex items-center justify-between py-6 border-b border-obsidian/10 cursor-pointer">
                <span className="text-xl font-bold">Patina & Aging</span>
                <Plus className="h-6 w-6" />
              </div>
              <div className="flex items-center justify-between py-6 border-b border-obsidian/10 cursor-pointer">
                <span className="text-xl font-bold">Repair Services</span>
                <Plus className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: SOURCED WITH INTENTION */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <h2 className="mb-16 text-center text-5xl font-black tracking-tight md:text-7xl lg:text-8xl leading-none">
          Sourced with <br /> absolute <br /> intention.
        </h2>
        <div className="grid gap-12 md:grid-cols-2 lg:gap-24">
          <div className="overflow-hidden rounded-xl">
            <img 
              src="/images/about-workshop.jpg" 
              alt="Leather tannery" 
              className="h-full w-full object-cover aspect-[4/5]"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="mb-6 text-2xl font-bold md:text-3xl leading-tight">
              We partner exclusively with tanneries who share our commitment to unrivaled quality and ethical manufacturing.
            </h3>
            <p className="mb-8 text-obsidian/70 md:text-lg">
              The soul of a shoe lies in the leather. We select only full-grain calfskins and suedes from legendary European tanneries that have spent centuries perfecting their craft. We believe transparency is the first step toward excellence.
            </p>
            <Link to="/about" className="flex items-center gap-2 font-bold uppercase tracking-widest text-obsidian hover:underline">
              Our Materials <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER CALL TO ACTION */}
      <section className="bg-obsidian text-warm-white py-32 px-6 text-center">
        <h2 className="mb-12 text-6xl font-black tracking-tight md:text-8xl lg:text-9xl leading-[0.9]">
          Step Into <br /> Excellence
        </h2>
        <Link 
          to="/order" 
          className="inline-block bg-white text-obsidian px-10 py-4 font-bold uppercase tracking-widest transition hover:bg-white/90"
        >
          Order Now
        </Link>
      </section>
    </div>
  );
}
