import { SectionReveal } from "@/components/SectionReveal";
import { Ruler, Scissors, Hammer, Flame, Package } from "lucide-react";

const process = [
  {
    step: "01",
    title: "Consultation & Measurement",
    text: "We begin with a conversation. Then we measure both feet — left and right are rarely identical — and capture a 3D scan.",
    icon: Ruler,
  },
  {
    step: "02",
    title: "Pattern & Cutting",
    text: "The upper pattern is drawn on the leather hide, respecting grain direction. Every piece is cut by hand.",
    icon: Scissors,
  },
  {
    step: "03",
    title: "Closing & Lasting",
    text: "The upper is stitched, turned, and pulled over a wooden last. Tension is adjusted by eye and by feel.",
    icon: Hammer,
  },
  {
    step: "04",
    title: "Welting & Finishing",
    text: "A welt is sewn, the sole attached, and edges burnished with heat, wax, and patience.",
    icon: Flame,
  },
  {
    step: "05",
    title: "Delivery",
    text: "The shoes are polished, photographed, wrapped, and delivered with a certificate of authenticity.",
    icon: Package,
  },
];

export function Craftsmanship() {
  return (
    <div className="pt-32">
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <SectionReveal>
          <p className="text-xs uppercase tracking-[0.25em] text-gold">Process</p>
          <h1 className="mt-4 font-display text-5xl text-warm-white md:text-7xl">
            Craftsmanship
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-chrome">
            We do not mass produce. We measure, cut, stitch, last, welt, and finish every pair by
            hand in our Lagos studio.
          </p>
        </SectionReveal>
      </section>

      <section className="relative h-[50vh] min-h-[360px]">
        <img
          src="/images/craft-hands.jpg"
          alt="Craftsmanship"
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-obsidian/60" />
        <div className="relative mx-auto flex h-full max-w-7xl items-end px-6 pb-12">
          <SectionReveal>
            <p className="max-w-xl text-2xl font-light italic leading-relaxed text-cream md:text-3xl">
              "The hand is the tool of tools."
            </p>
          </SectionReveal>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-24">
        <div className="space-y-16">
          {process.map((p) => (
            <SectionReveal key={p.title}>
              <div className="grid gap-8 md:grid-cols-[120px_1fr]">
                <div className="flex items-start gap-4">
                  <span className="font-display text-5xl text-white/10">{p.step}</span>
                  <p.icon className="mt-2 h-8 w-8 text-gold" />
                </div>
                <div>
                  <h2 className="font-display text-3xl text-warm-white">{p.title}</h2>
                  <p className="mt-3 max-w-2xl text-lg leading-relaxed text-chrome">{p.text}</p>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </section>

      <section className="border-t border-white/10 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionReveal className="mb-12 text-center">
            <h2 className="font-display text-3xl text-warm-white md:text-4xl">Materials We Trust</h2>
          </SectionReveal>
          <div className="grid gap-6 md:grid-cols-4">
            {[
              "Full-grain Italian box calf",
              "Waxed suede from France",
              "Ethically sourced exotic leathers",
              "Solid brass and nickel hardware",
            ].map((m) => (
              <SectionReveal key={m}>
                <div className="rounded-xl border border-white/10 bg-charcoal/30 p-6 text-center">
                  <p className="font-display text-lg text-warm-white">{m}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
