import { SectionReveal } from "@/components/SectionReveal";

const timeline = [
  { year: "2014", text: "Nelson opens his first workshop in Lagos with a single last and a borrowed sewing machine." },
  { year: "2017", text: "The first private client collection is released — twelve pairs, each numbered." },
  { year: "2020", text: "Masterclass program launches, training a new generation of African shoemakers." },
  { year: "2024", text: "Expansion into a flagship atelier on Victoria Island with a team of master artisans." },
  { year: "2026", text: "Global digital flagship launches, connecting the workshop to the world." },
];

export function About() {
  return (
    <div className="pt-32">
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <SectionReveal>
          <p className="text-xs uppercase tracking-[0.25em] text-gold">Our House</p>
          <h1 className="mt-4 font-display text-5xl text-warm-white md:text-7xl">
            About Nelson
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-chrome">
            A Nigerian atelier devoted to the lost art of bespoke shoemaking. We believe footwear
            should be personal, permanent, and beautiful.
          </p>
        </SectionReveal>
      </section>

      <section className="relative h-[60vh] min-h-[420px]">
        <img
          src="/images/about-workshop.webp"
          alt="Workshop"
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/70 to-transparent" />
        <div className="relative mx-auto flex h-full max-w-7xl items-center px-6">
          <SectionReveal className="max-w-xl">
            <p className="text-2xl font-light italic leading-relaxed text-cream md:text-3xl">
              "Shoes are the foundation of a man's presence. Make them count."
            </p>
            <p className="mt-6 text-sm uppercase tracking-widest text-gold">— Nelson, Founder</p>
          </SectionReveal>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-24">
        <div className="grid gap-12 lg:grid-cols-2">
          <SectionReveal>
            <h2 className="font-display text-3xl text-warm-white md:text-4xl">Mission</h2>
            <p className="mt-5 text-lg leading-relaxed text-chrome">
              To preserve and advance the craft of bespoke footwear in Africa, creating pieces that
              rival the great houses of Europe while remaining deeply rooted in Nigerian artistry.
            </p>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <h2 className="font-display text-3xl text-warm-white md:text-4xl">Values</h2>
            <ul className="mt-5 space-y-3 text-chrome">
              <li>Patience over speed.</li>
              <li>Material honesty.</li>
              <li>Client intimacy.</li>
              <li>Generational craft.</li>
            </ul>
          </SectionReveal>
        </div>
      </section>

      <section className="border-t border-white/10 bg-charcoal/30 py-24">
        <div className="mx-auto max-w-4xl px-6">
          <SectionReveal className="mb-12 text-center">
            <h2 className="font-display text-3xl text-warm-white md:text-4xl">Timeline</h2>
          </SectionReveal>
          <div className="space-y-8">
            {timeline.map((t, idx) => (
              <SectionReveal key={t.year} delay={idx * 0.08}>
                <div className="flex gap-6 md:gap-12">
                  <span className="w-20 shrink-0 font-display text-2xl text-gold md:text-3xl">
                    {t.year}
                  </span>
                  <p className="text-lg leading-relaxed text-chrome">{t.text}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
