import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Plus, Minus, Play, Pause, Volume2, VolumeX } from "lucide-react";

export function Home() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const interviewVideoRef = useRef<HTMLVideoElement>(null);
  
  const [activeCraft, setActiveCraft] = useState<number | null>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const togglePlay = () => {
    if (interviewVideoRef.current) {
      if (isPlaying) {
        interviewVideoRef.current.pause();
      } else {
        interviewVideoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (interviewVideoRef.current) {
      interviewVideoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const craftItems = [
    {
      title: "Bespoke Fitting",
      content: "We take detailed measurements of your feet using traditional calipers and drafts. A custom wooden last is then sculpted to match the unique volume and proportions of your feet, ensuring a perfect anatomical fit."
    },
    {
      title: "Hand Welted Construction",
      content: "The pinnacle of shoemaking. The upper, insole, and welt are stitched together entirely by hand using boar-bristle needles and waxed linen thread. This construction allows for maximum comfort and unlimited resoles."
    },
    {
      title: "Premium Materials",
      content: "Only full-grain leathers from legendary European tanneries make the cut. Every lining is breathable veg-tanned leather, and the footbed is packed with natural cork that molds to your footprint over time."
    }
  ];

  const leftImages = ["/images/oxford-shoe.jpg", "/images/loafer.jpg"];
  const rightImages = ["/images/chelsea-boot.jpg", "/images/product-hero.jpg"];

  const faqItems = [
    {
      title: "Shoe Care Guide",
      content: "To maintain your hand-welted shoes, brush them regularly with a horsehair brush to remove dirt. Condition the leather every 6-8 weeks with a premium cream conditioner, and use cedar shoe trees when not in wear to preserve their shape and absorb moisture."
    },
    {
      title: "Patina & Aging",
      content: "Our vegetable-tanned and box calf leathers are designed to develop a unique patina over time. Regular wear, exposure to air, and polish will burnish the edges and creases, resulting in a rich, deeply personal character that cannot be replicated artificially."
    },
    {
      title: "Repair Services",
      content: "Nelson footwear is built to last a lifetime. Our Goodyear welted and hand-welted construction means the entire sole can be replaced. We offer full resoling, heel replacement, and refurbishing services at our studio."
    }
  ];

  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % 2);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollOffset(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-warm-white text-obsidian font-sans">
      {/* HERO SECTION */}
      <section className="w-full pt-16 pb-12 md:pt-20 md:pb-16 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 flex flex-col items-center">
          {/* Huge Logo text with scroll effect */}
          <h1
            style={{
              transform: `translateY(${scrollOffset * 0.18}px)`,
              opacity: Math.max(0.1, 1 - scrollOffset / 450),
              letterSpacing: `${-0.05 + scrollOffset * 0.00003}em`
            }}
            className="w-[90vw] md:w-[80vw] mx-auto text-center font-display text-[17vw] md:text-[14vw] font-black uppercase text-obsidian leading-[0.8] select-none mb-10 will-change-transform"
          >
            NELSON
          </h1>

          {/* Three Media Columns */}
          <div className="flex w-full items-center justify-start gap-6 overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden py-4 md:grid md:grid-cols-[28%_1fr_28%] md:overflow-hidden md:gap-6" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
            
            {/* 1. Left Shoe Slideshow */}
            <div className="snap-center shrink-0 w-[75vw] md:w-full aspect-[3/4] md:h-[65vh] rounded-[2rem] overflow-hidden bg-charcoal/5 relative transition-all duration-700 hover:scale-[1.02] border border-obsidian/5">
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
            <div className="snap-center shrink-0 w-[75vw] md:w-full aspect-[3/4] md:aspect-[9/14] md:h-[78vh] rounded-[2rem] overflow-hidden bg-charcoal/5 relative shadow-xl transition-all duration-700 hover:scale-[1.02] border border-obsidian/10">
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                onTimeUpdate={(e) => {
                  if (e.currentTarget.currentTime > 0.15) {
                    setVideoLoaded(true);
                    window.dispatchEvent(new Event("nelson-video-ready"));
                  }
                }}
                className="absolute inset-0 h-full w-full object-cover object-center scale-[1.35] md:scale-[1.5]"
              >
                <source src="/videos/hero-video.mp4" type="video/mp4" />
              </video>
              
              {/* Custom Poster Overlay: Nelson logo with ripple effect, fades when video starts */}
              <div className={`absolute inset-0 bg-obsidian transition-opacity duration-700 flex items-center justify-center ${videoLoaded ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
                {/* Ripple rings */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="absolute h-32 w-32 rounded-full border border-gold/30 animate-ping" style={{ animationDuration: "1.8s" }} />
                  <div className="absolute h-48 w-48 rounded-full border border-gold/20 animate-ping" style={{ animationDuration: "2.4s", animationDelay: "0.3s" }} />
                  <div className="absolute h-64 w-64 rounded-full border border-gold/10 animate-ping" style={{ animationDuration: "3s", animationDelay: "0.6s" }} />
                </div>
                {/* Centered NELSON logo text */}
                <span className="relative z-10 font-display font-black uppercase tracking-[0.2em] text-gold text-3xl md:text-4xl select-none">
                  NELSON
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>

            {/* 3. Right Shoe Slideshow */}
            <div className="snap-center shrink-0 w-[75vw] md:w-full aspect-[3/4] md:h-[65vh] rounded-[2rem] overflow-hidden bg-charcoal/5 relative transition-all duration-700 hover:scale-[1.02] border border-obsidian/5">
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
      </section>      {/* SECTION 1.5: FEATURED COLLECTIONS (SHOES) */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="mb-12 flex items-end justify-between border-b border-obsidian/10 pb-8">
          <h2 className="text-3xl font-black tracking-tight md:text-5xl">
            Featured Collections
          </h2>
          <Link to="/collections" className="hidden items-center gap-2 font-bold uppercase tracking-widest text-obsidian hover:underline md:flex">
            View All Shoes <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid gap-6 grid-cols-2 lg:grid-cols-4">
          {[
            { title: "The Regent Oxford", desc: "Closed-Lacing Elegance", img: "/images/oxford-shoe.jpg", link: "/product/regent-oxford" },
            { title: "The Duke Chelsea", desc: "Effortless Sophistication", img: "/images/chelsea-boot.jpg", link: "/product/duke-chelsea" },
            { title: "The Patrician Loafer", desc: "Relaxed Refinement", img: "/images/loafer.jpg", link: "/product/patrician-loafer" },
            { title: "The Sovereign Formal", desc: "Black Tie, Elevated", img: "/images/product-hero.jpg", link: "/product/sovereign-formal" },
            { title: "The Sentinel Boot", desc: "Built for Legacy", img: "/images/about-workshop.jpg", link: "/product/sentinel-boot" },
            { title: "Edition I — Akwaaba", desc: "Rare by Design", img: "/images/hero-workshop.jpg", link: "/product/edition-i" },
            { title: "The Artisan Derby", desc: "Everyday Distinction", img: "/images/craft-hands.jpg", link: "/collections" },
            { title: "The Royal Double Monk", desc: "Uncompromising Statement", img: "/images/product-hero.jpg", link: "/collections" }
          ].map((col, i) => (
            <Link key={i} to={col.link} className="group cursor-pointer block">
              <div className="mb-4 overflow-hidden rounded-xl bg-obsidian/5 aspect-[3/4]">
                <img 
                  src={col.img} 
                  alt={col.title} 
                  loading="lazy"
                  decoding="async"
                  width="400"
                  height="533"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105" 
                />
              </div>
              <h3 className="text-lg font-bold leading-tight group-hover:underline">{col.title}</h3>
              <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-obsidian/60">{col.desc}</p>
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
              loading="lazy"
              decoding="async"
              width="600"
              height="400"
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
              {craftItems.map((item, idx) => {
                const isOpen = activeCraft === idx;
                return (
                  <div key={idx} className="border-b border-obsidian/10">
                    <button
                      onClick={() => setActiveCraft(isOpen ? null : idx)}
                      className="flex w-full items-center justify-between py-4 text-left focus:outline-none"
                    >
                      <span className="font-bold">{item.title}</span>
                      {isOpen ? <Minus className="h-5 w-5 text-gold" /> : <Plus className="h-5 w-5" />}
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        isOpen ? "max-h-32 pb-4 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <p className="text-sm text-obsidian/70 leading-relaxed">
                        {item.content}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: MEET NELSON */}
      <section className="bg-obsidian text-white py-24 md:py-32 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            
            {/* Left Content Column */}
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-gold">Meet the Artisan</span>
              <h2 className="mt-4 text-4xl font-black md:text-6xl tracking-tight leading-none text-balance">
                Meet <br className="hidden md:block" /> Nelson
              </h2>
              <p className="mt-6 text-lg text-white/80 leading-relaxed max-w-xl text-balance">
                An intimate look into the philosophy, heritage, and uncompromising standards of Nelson's founder. Every shoe is built by hand in our Lagos studio, designed to last a lifetime.
              </p>
              
              <div className="mt-12 flex gap-12 border-t border-white/10 pt-8 max-w-md">
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/50">Hours of Craft</p>
                  <p className="text-4xl font-black mt-2 text-gold">40+</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/50">Stitches per shoe</p>
                  <p className="text-4xl font-black mt-2 text-gold">1,200</p>
                </div>
              </div>
            </div>

            {/* Right Video Player Column */}
            <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl bg-black/40 group border border-white/5 flex items-center justify-center">
              <video
                ref={interviewVideoRef}
                loop
                playsInline
                muted={isMuted}
                className="w-full h-auto max-h-[75vh] object-contain rounded-2xl"
              >
                <source src="/videos/hero-video.mp4" type="video/mp4" />
              </video>
              
              {/* Overlay / Custom controls */}
              <div className={`absolute inset-0 bg-black/30 transition-opacity duration-300 flex items-center justify-center ${isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"}`}>
                <button
                  onClick={togglePlay}
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-gold text-obsidian shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
                  aria-label={isPlaying ? "Pause video" : "Play video"}
                >
                  {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 fill-current translate-x-[2px]" />}
                </button>
              </div>

              {/* Mute toggle button (always visible at bottom corner) */}
              <button
                onClick={toggleMute}
                className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur transition hover:bg-black/75 cursor-pointer"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3.5: THE DEMAND CODE BOOK */}
      <section className="bg-charcoal/20 text-obsidian py-24 md:py-32 px-6 border-b border-obsidian/10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            
            {/* Left Column: Book Cover Showcase */}
            <div className="relative flex justify-center lg:justify-start w-full max-w-[420px] mx-auto lg:mx-0 group mb-10 lg:mb-0">
              <div className="w-[75%] rounded-xl overflow-hidden shadow-2xl transition duration-700 group-hover:scale-[1.02] border border-white/5">
                <img 
                  src="/images/nelson-author.jpg" 
                  alt="Nelson Faseyiku - From Invisible to In-Demand" 
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -right-4 w-[60%] transition duration-700 group-hover:scale-[1.05] group-hover:-translate-y-3 z-10">
                <img 
                  src="/images/book-mockup.png" 
                  alt="The Demand Code Book Cover" 
                  className="w-full h-auto drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)]"
                />
              </div>
            </div>

            {/* Right Column: Book Details */}
            <div className="flex flex-col justify-center">
              <span className="text-xs font-bold uppercase tracking-widest text-gold mb-3">Digital Product</span>
              <h2 className="text-4xl font-black md:text-5xl tracking-tight leading-none text-obsidian text-balance">
                The Demand Code
              </h2>
              <p className="mt-6 text-base md:text-lg text-obsidian/75 leading-relaxed text-balance">
                The definitive blueprint on market positioning and client attraction. In this book, Nelson Faseyiku breaks down the principles that transform independent creators and businesses from invisible commodities to premium, highly in-demand brands.
              </p>
              
              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  <p className="text-sm text-obsidian/80"><strong>Positioning over Promotion:</strong> Engineer how the high-end market perceives you.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  <p className="text-sm text-obsidian/80"><strong>Attract, Don't Chase:</strong> Build specialized authority so clients seek your craft.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  <p className="text-sm text-obsidian/80"><strong>Premium Margins:</strong> Command pricing that reflects true competence and status.</p>
                </div>
              </div>
              
              <div className="mt-10">
                <a
                  href="https://selar.com/demandcode"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-obsidian text-warm-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs transition duration-300 hover:bg-gold hover:text-obsidian hover:shadow-lg"
                >
                  Buy on Selar
                </a>
              </div>
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
              {faqItems.map((item, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div key={idx} className="border-b border-obsidian/10">
                    <button
                      onClick={() => setActiveFaq(isOpen ? null : idx)}
                      className="flex w-full items-center justify-between py-6 text-left focus:outline-none"
                    >
                      <span className="text-xl font-bold">{item.title}</span>
                      {isOpen ? <Minus className="h-6 w-6 text-gold" /> : <Plus className="h-6 w-6" />}
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        isOpen ? "max-h-40 pb-6 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <p className="text-sm text-obsidian/70 leading-relaxed">
                        {item.content}
                      </p>
                    </div>
                  </div>
                );
              })}
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
