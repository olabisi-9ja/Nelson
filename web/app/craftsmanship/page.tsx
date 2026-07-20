import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function CraftsmanshipPage() {
  return (
    <main className="w-full min-h-screen bg-background text-foreground pt-32 pb-24 px-8 md:px-16">
      <div className="max-w-5xl mx-auto flex flex-col gap-24">
        
        {/* Header */}
        <header className="flex flex-col gap-4 border-b border-border/20 pb-12">
          <span className="text-primary text-xs uppercase tracking-[0.3em] font-medium">The Protocol</span>
          <h1 className="text-5xl md:text-7xl font-light tracking-tighter uppercase leading-none">
            120 Steps. <br/> <span className="text-muted-foreground italic font-serif lowercase">No compromises.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground font-light max-w-2xl mt-4 leading-relaxed">
            Every pair of Nelson shoes is the result of over 50 hours of intensive artisan labor. Our process is defined by deliberate patience and absolute precision.
          </p>
        </header>

        {/* The Stages */}
        <section className="flex flex-col gap-16">
          {[
            {
              step: "01",
              title: "Clicking & Leather Selection",
              desc: "We source our full-grain crust calfskin from D'Annonay and Le Puy. The clicker examines the hides for minor flaws, selecting only the strongest, most flawless sections for the uppers. Each cut is made by hand with absolute precision.",
            },
            {
              step: "02",
              title: "Hand Lasting",
              desc: "The leather is soaked and pulled over a bespoke wooden or composite last. It is hand-pinned and kept on the last for up to 10 days, allowing the leather to permanently memorize the contours of the foot.",
            },
            {
              step: "03",
              title: "The Hand-Welting",
              desc: "We utilize a traditional hand-welted Goodyear stitch. The welt is sewn directly to the insole rib and upper using a waxed thread, creating a robust, water-resistant cavity that is subsequently filled with ground cork for personalized cushioning.",
            },
            {
              step: "04",
              title: "The Atelier Patina",
              desc: "Our colorists apply the patina layer by layer using alcohol-based dyes, natural waxes, and essential oils. Each coat is brushed and burnished by hand, resulting in a unique depth and transition of color that belongs to that pair alone.",
            },
          ].map((item, idx) => (
            <div key={idx} className="grid grid-cols-1 md:grid-cols-12 gap-8 border-b border-border/10 pb-16">
              <div className="md:col-span-2 font-mono text-lg text-primary">{item.step}</div>
              <div className="md:col-span-4 text-2xl uppercase tracking-wider font-light">{item.title}</div>
              <div className="md:col-span-6 text-muted-foreground font-light text-base md:text-lg leading-relaxed">{item.desc}</div>
            </div>
          ))}
        </section>

        {/* CTA */}
        <section className="bg-secondary/20 p-12 text-center flex flex-col items-center gap-6 rounded-sm border border-border/10">
          <h2 className="text-2xl uppercase tracking-widest font-light">Experience the Atelier</h2>
          <p className="text-muted-foreground font-light text-sm max-w-md">
            Schedule a virtual consultation with our lead artisan to discuss your custom dimensions.
          </p>
          <Link href="/commission/bespoke" className="mt-4 px-8 py-3 bg-foreground text-background text-xs uppercase tracking-widest font-medium hover:bg-primary transition-colors">
            Initiate Commission
          </Link>
        </section>

      </div>
    </main>
  );
}
