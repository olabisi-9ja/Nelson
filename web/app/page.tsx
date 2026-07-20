import CinematicHero from "@/components/CinematicHero";
import AmbientAudio from "@/components/AmbientAudio";
import Link from "next/link";
import { ArrowUpRight, Play, Compass, HardHat, FileText, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <main className="w-full flex flex-col items-center bg-background text-foreground selection:bg-primary selection:text-background overflow-hidden">
      <AmbientAudio />
      <CinematicHero />

      {/* 2. Featured Collection Section */}
      <section className="w-full min-h-screen py-32 px-8 md:px-16 border-t border-border/10 flex flex-col gap-24 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="flex flex-col gap-4">
            <span className="text-primary text-xs uppercase tracking-[0.3em] font-medium">Curated Exhibition</span>
            <h2 className="text-4xl md:text-6xl font-light uppercase tracking-tight">Flagship Pieces</h2>
          </div>
          <Link href="/collections" className="text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground flex items-center gap-2 border-b border-muted-foreground/35 pb-1">
            Explore All Collections <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "The Classic Oxford", desc: "Matte Black Calfskin", price: "$1,250", slug: "the-classic-oxford" },
            { name: "The Modern Chelsea", desc: "Warm Ivory Suede", price: "$1,300", slug: "the-modern-chelsea" },
            { name: "The Legacy Loafer", desc: "Leather Brown Exotic", price: "$2,100", slug: "the-legacy-loafer" },
          ].map((shoe, idx) => (
            <Link key={idx} href={`/product/${shoe.slug}`} className="group flex flex-col gap-6">
              <div className="aspect-[4/5] bg-secondary/35 relative overflow-hidden flex items-center justify-center rounded-sm">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/20 group-hover:scale-105 transition-transform duration-700 ease-out" />
                <span className="text-muted-foreground/20 font-mono tracking-widest text-xs uppercase z-10">Artwork Placeholder</span>
              </div>
              <div className="flex flex-col gap-2 border-l border-primary/30 pl-4">
                <h3 className="text-xl uppercase tracking-wide group-hover:text-primary transition-colors">{shoe.name}</h3>
                <p className="text-muted-foreground font-light text-sm">{shoe.desc}</p>
                <p className="text-primary mt-1">{shoe.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Featured Film Section */}
      <section className="w-full h-[80vh] relative flex items-center justify-center bg-black overflow-hidden group">
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent z-10" />
        {/* Placeholder background representing film clip */}
        <div className="absolute inset-0 bg-secondary/20 mix-blend-luminosity scale-105 group-hover:scale-100 transition-transform duration-[2000ms]" />
        
        <div className="relative z-20 flex flex-col items-center gap-8 text-center px-4 max-w-2xl">
          <span className="text-primary text-xs uppercase tracking-[0.3em] font-medium">The Documentary</span>
          <h2 className="text-4xl md:text-6xl font-light uppercase tracking-tighter text-white">
            120 Steps to Legacy
          </h2>
          <p className="text-white/60 font-light text-sm md:text-base leading-relaxed">
            Follow the journey of full-grain leather as it undergoes meticulously curated cutting, hand-stitching, and bespoke burnishing inside our private atelier.
          </p>
          <Link href="/film" className="h-20 w-20 rounded-full border border-white/30 flex items-center justify-center bg-white/5 hover:bg-white/10 hover:scale-105 transition-all mt-4">
            <Play size={28} className="text-white fill-white ml-1" />
          </Link>
        </div>
      </section>

      {/* 4. Craftsmanship Focus */}
      <section className="w-full py-32 px-8 md:px-16 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <div className="aspect-[5/6] bg-secondary/30 relative overflow-hidden flex items-center justify-center rounded-sm">
          <span className="text-muted-foreground/30 font-mono tracking-widest text-xs uppercase">Macro Construction Closeup</span>
        </div>
        <div className="flex flex-col gap-8">
          <span className="text-primary text-xs uppercase tracking-[0.3em] font-medium">Anatomy of a Shoe</span>
          <h2 className="text-4xl md:text-5xl font-light uppercase tracking-tight leading-none">
            Hand-Welted <br/> Goodyear Construction.
          </h2>
          <p className="text-muted-foreground text-lg font-light leading-relaxed">
            Unlike mass-produced footwear, every pair of Nelson shoes is built with a hand-stitched welt. This traditional technique provides superior water resistance, structural durability, and allows the shoe to be completely resoled for generations of wear.
          </p>
          <div className="grid grid-cols-2 gap-8 mt-6">
            <div className="flex flex-col gap-2 border-l border-primary pl-4">
              <span className="text-xs uppercase tracking-widest font-mono text-muted-foreground">01 / Material</span>
              <p className="text-sm font-medium uppercase tracking-wide">Tannery du Puy Calfskin</p>
            </div>
            <div className="flex flex-col gap-2 border-l border-primary pl-4">
              <span className="text-xs uppercase tracking-widest font-mono text-muted-foreground">02 / Stitching</span>
              <p className="text-sm font-medium uppercase tracking-wide">Waxed Irish Linen Thread</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Behind the Process (Interactive/Visual) */}
      <section className="w-full py-32 bg-secondary/15 border-y border-border/10">
        <div className="max-w-7xl mx-auto px-8 md:px-16 flex flex-col gap-20">
          <div className="flex flex-col gap-4 text-center max-w-2xl mx-auto">
            <span className="text-primary text-xs uppercase tracking-[0.3em] font-medium">Bespoke Protocol</span>
            <h2 className="text-3xl md:text-5xl font-light uppercase tracking-tight">The Creation Cycle</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { num: "01", stage: "Commission", desc: "Personal consultation, selection of style, leather, and exact digital foot measurements." },
              { num: "02", stage: "Lasting & Cutting", desc: "A bespoke last is hand-carved, and full-grain leather is cut by master clickers." },
              { num: "03", stage: "Stitching", desc: "Sole and uppers are sewn using a closed-channel Goodyear hand-welting technique." },
              { num: "04", stage: "Patina & Finish", desc: "Artisans build color depth layer-by-layer using natural vegetable dyes and oils." },
            ].map((step, idx) => (
              <div key={idx} className="flex flex-col gap-6 p-8 bg-background border border-border/20 relative group hover:border-primary/50 transition-colors">
                <span className="font-mono text-sm text-primary/50 group-hover:text-primary transition-colors">{step.num}</span>
                <h3 className="text-lg uppercase tracking-wider font-light">{step.stage}</h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Testimonials Section */}
      <section className="w-full py-32 max-w-5xl mx-auto px-8 text-center flex flex-col gap-12">
        <span className="text-primary text-xs uppercase tracking-[0.3em] font-medium">Collector Verdicts</span>
        <blockquote className="text-2xl md:text-4xl font-light italic font-serif leading-relaxed text-muted-foreground">
          "The Oxford I commissioned feels like wearable architecture. It doesn't just adapt to my foot—it enhances the way I walk."
        </blockquote>
        <div className="flex flex-col gap-1">
          <span className="text-xs uppercase tracking-widest font-mono font-medium">Dr. Folabi A.</span>
          <span className="text-[10px] uppercase tracking-widest text-primary/70">Lagos / London</span>
        </div>
      </section>

      {/* 7. Commission CTA Section */}
      <section className="w-full py-40 bg-foreground text-background text-center relative overflow-hidden group">
        <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-[800ms] ease-[cubic-bezier(0.77,0,0.175,1)]" />
        <div className="relative z-10 flex flex-col items-center gap-8 max-w-4xl mx-auto px-4">
          <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-background/50 group-hover:text-background/70 transition-colors">Initiate Process</span>
          <h2 className="text-4xl md:text-7xl font-light uppercase tracking-tighter text-background group-hover:text-background transition-colors leading-none">
            Commission Your <br/> Masterpiece
          </h2>
          <p className="text-background/60 group-hover:text-background/80 transition-colors max-w-lg font-light text-sm md:text-base leading-relaxed">
            Begin your journey into true bespoke craftsmanship. Define your style, leather, and dimensions today.
          </p>
          <Link href="/commission/bespoke" className="mt-8 px-12 py-4 bg-background text-foreground uppercase tracking-widest text-xs font-semibold hover:scale-105 transition-transform">
            Begin Commission
          </Link>
        </div>
      </section>

      {/* 8. Latest Journal */}
      <section className="w-full py-32 px-8 md:px-16 max-w-7xl mx-auto flex flex-col gap-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="flex flex-col gap-4">
            <span className="text-primary text-xs uppercase tracking-[0.3em] font-medium">The Archive</span>
            <h2 className="text-3xl md:text-5xl font-light uppercase tracking-tight">The Journal</h2>
          </div>
          <Link href="/journal" className="text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground flex items-center gap-2 border-b border-muted-foreground/35 pb-1">
            Read All Articles <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { title: "The Art of Hand-Applied Patina", category: "Craftsmanship", date: "Sep 12, 2026" },
            { title: "Sourcing French Calfskin from Le Puy", category: "Materials", date: "Aug 29, 2026" },
            { title: "Why Goodyear Welted Shoes Last Forever", category: "Construction", date: "Jul 18, 2026" },
          ].map((post, idx) => (
            <Link key={idx} href="/journal/post-slug" className="group flex flex-col gap-4 border-t border-border/20 pt-8">
              <div className="flex items-center justify-between text-xs text-primary/70 uppercase tracking-widest">
                <span>{post.category}</span>
                <span className="text-muted-foreground font-mono">{post.date}</span>
              </div>
              <h3 className="text-xl font-light uppercase tracking-tight leading-snug group-hover:text-primary transition-colors">
                {post.title}
              </h3>
            </Link>
          ))}
        </div>
      </section>

    </main>
  );
}
