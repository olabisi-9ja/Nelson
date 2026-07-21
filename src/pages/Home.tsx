import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Play, Hammer, Scissors, Ruler } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionReveal } from "@/components/SectionReveal";
import { ProductCard } from "@/components/ProductCard";
import { films, journalPosts, products, testimonials } from "@/data/mock";

gsap.registerPlugin(ScrollTrigger);

export function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroTextRef.current?.children ?? [],
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1.4, stagger: 0.15, ease: "power3.out", delay: 0.3 }
      );
      gsap.to(heroImageRef.current, {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  const featuredProducts = products.slice(0, 3);

  return (
    <div>
      {/* HERO */}
      <section
        ref={heroRef}
        className="relative flex min-h-screen items-center justify-center overflow-hidden"
      >
        <img
          ref={heroImageRef}
          src="/images/hero-workshop.jpg"
          alt="Nelson workshop"
          className="absolute inset-0 h-[120%] w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/40 via-obsidian/20 to-obsidian" />
        <div
          ref={heroTextRef}
          className="relative z-10 mx-auto max-w-5xl px-6 text-center"
        >
          <motion.p className="mb-6 text-xs uppercase tracking-[0.35em] text-gold">
            Lagos Atelier — Est. 2014
          </motion.p>
          <h1 className="font-display text-5xl leading-[1.05] text-warm-white md:text-7xl lg:text-8xl">
            Crafted Without
            <br />
            <span className="gold-gradient">Compromise.</span>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-cream/80 md:text-xl">
            Handmade luxury footwear built for those who value excellence. Every pair is a
            commission. Every detail is a decision.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/commission"
              className="group flex items-center gap-2 rounded-full bg-gold px-8 py-4 text-sm font-semibold uppercase tracking-widest text-obsidian transition hover:bg-gold-light"
            >
              Begin Commission
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
            <Link
              to="/collections"
              className="rounded-full border border-white/20 px-8 py-4 text-sm uppercase tracking-widest text-warm-white transition hover:border-gold/40 hover:text-gold"
            >
              Explore Collections
            </Link>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-chrome">
          Scroll
        </div>
      </section>

      {/* FEATURED COLLECTION */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <SectionReveal className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-gold">Current Season</p>
              <h2 className="mt-3 font-display text-4xl text-warm-white md:text-5xl">
                Featured Collection
              </h2>
            </div>
            <Link
              to="/collections"
              className="flex items-center gap-2 text-sm uppercase tracking-widest text-cream/70 transition hover:text-gold"
            >
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </SectionReveal>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED FILM */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 bg-charcoal" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <SectionReveal>
              <p className="text-xs uppercase tracking-[0.25em] text-gold">Film</p>
              <h2 className="mt-3 font-display text-4xl text-warm-white md:text-5xl">
                The Last Artisan
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-cream/70">
                A cinematic portrait of the hands, rituals, and obsessions behind every Nelson
                commission. Step inside the workshop.
              </p>
              <Link
                to="/film"
                className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/20 px-8 py-4 text-sm uppercase tracking-widest text-warm-white transition hover:border-gold/40 hover:text-gold"
              >
                <Play className="h-4 w-4 fill-current" />
                Watch Film
              </Link>
            </SectionReveal>
            <SectionReveal delay={0.2}>
              <Link to="/film" className="group relative block aspect-video overflow-hidden rounded-sm">
                <img
                  src={films[0].thumbnail}
                  alt="Film thumbnail"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-obsidian/30 transition group-hover:bg-obsidian/20">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm transition group-hover:scale-110">
                    <Play className="h-6 w-6 fill-warm-white text-warm-white" />
                  </div>
                </div>
              </Link>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* CRAFTSMANSHIP */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <SectionReveal className="mb-16 text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-gold">The Process</p>
            <h2 className="mt-3 font-display text-4xl text-warm-white md:text-6xl">
              Craftsmanship in Every Thread
            </h2>
          </SectionReveal>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: Ruler,
                title: "Precise Measurement",
                text: "Over 20 foot measurements, a 3D scan, and a conversation about how you move.",
              },
              {
                icon: Scissors,
                title: "Hand Cut & Sewn",
                text: "Every upper is cut from a single skin and sewn by hand using techniques unchanged for centuries.",
              },
              {
                icon: Hammer,
                title: "Built to Last",
                text: "Welted soles, stacked heels, and hand-burnished edges that age with dignity.",
              },
            ].map((item, idx) => (
              <SectionReveal key={item.title} delay={idx * 0.1}>
                <div className="group h-full rounded-2xl border border-white/10 bg-charcoal/40 p-8 transition hover:border-gold/30 hover:bg-charcoal">
                  <item.icon className="mb-6 h-8 w-8 text-gold" />
                  <h3 className="font-display text-2xl text-warm-white">{item.title}</h3>
                  <p className="mt-3 leading-relaxed text-chrome">{item.text}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* BEHIND THE PROCESS */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <img
          src="/images/craft-hands.jpg"
          alt="Craftsmanship"
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/80 to-obsidian/40" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="max-w-2xl">
            <SectionReveal>
              <p className="text-xs uppercase tracking-[0.25em] text-gold">Behind the Process</p>
              <h2 className="mt-3 font-display text-4xl text-warm-white md:text-5xl">
                200 Stitches. One Story.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-cream/80">
                There are no shortcuts in bespoke. A Nelson shoe is cut from full-grain calf,
                hand-lasted over a wooden form for three days, and burnished until the leather
                glows. The result is not merely footwear — it is a record of patience.
              </p>
              <Link
                to="/craftsmanship"
                className="mt-8 inline-block text-sm uppercase tracking-widest text-gold underline-offset-8 transition hover:underline"
              >
                Discover the full process
              </Link>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* PRESS */}
      <section className="border-y border-white/10 bg-charcoal/30 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <SectionReveal className="text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-gold">Recognition</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-8 md:gap-16">
              {["Vogue", "GQ", "The Guardian", "African Luxury", "Forbes Life"].map((p) => (
                <span key={p} className="font-display text-lg uppercase tracking-widest text-white/30 md:text-xl">
                  {p}
                </span>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <SectionReveal className="mb-16 text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-gold">Client Voices</p>
            <h2 className="mt-3 font-display text-4xl text-warm-white md:text-5xl">
              Worn by Discerning Few
            </h2>
          </SectionReveal>
          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((t, idx) => (
              <SectionReveal key={t.id} delay={idx * 0.1}>
                <div className="flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-charcoal/30 p-8">
                  <p className="font-display text-xl italic leading-relaxed text-cream md:text-2xl">
                    "{t.text}"
                  </p>
                  <div className="mt-8">
                    <p className="text-sm font-semibold text-warm-white">{t.name}</p>
                    <p className="text-xs uppercase tracking-widest text-chrome">{t.role}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* COMMISSION CTA */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <SectionReveal>
            <p className="text-xs uppercase tracking-[0.25em] text-gold">Begin Your Commission</p>
            <h2 className="mt-3 font-display text-4xl text-warm-white md:text-6xl">
              Your Foot. Your Last. Your Legacy.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-cream/70">
              Every Nelson commission begins with a conversation. Choose your style, customize every
              detail, and watch your shoes come to life.
            </p>
            <Link
              to="/commission"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-gold px-10 py-5 text-sm font-semibold uppercase tracking-widest text-obsidian transition hover:bg-gold-light"
            >
              Start Commission
              <ArrowRight className="h-4 w-4" />
            </Link>
          </SectionReveal>
        </div>
      </section>

      {/* LATEST JOURNAL */}
      <section className="border-t border-white/10 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <SectionReveal className="mb-16 flex items-end justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-gold">Journal</p>
              <h2 className="mt-3 font-display text-4xl text-warm-white md:text-5xl">Latest Stories</h2>
            </div>
            <Link
              to="/journal"
              className="hidden items-center gap-2 text-sm uppercase tracking-widest text-cream/70 transition hover:text-gold md:flex"
            >
              Read all <ArrowRight className="h-4 w-4" />
            </Link>
          </SectionReveal>
          <div className="grid gap-8 md:grid-cols-3">
            {journalPosts.map((post, idx) => (
              <SectionReveal key={post.id} delay={idx * 0.1}>
                <Link to={`/journal/${post.slug}`} className="group block">
                  <div className="aspect-[4/3] overflow-hidden rounded-sm bg-charcoal">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="mt-5">
                    <p className="text-xs uppercase tracking-[0.2em] text-gold">{post.category}</p>
                    <h3 className="mt-2 font-display text-xl text-warm-white group-hover:text-gold md:text-2xl">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-chrome">{post.excerpt}</p>
                  </div>
                </Link>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
