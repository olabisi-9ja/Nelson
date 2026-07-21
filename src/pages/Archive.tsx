import { SectionReveal } from "@/components/SectionReveal";
import { products } from "@/data/mock";

export function Archive() {
  return (
    <div className="pt-32">
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <SectionReveal>
          <p className="text-xs uppercase tracking-[0.25em] text-gold">Archive</p>
          <h1 className="mt-4 font-display text-5xl text-warm-white md:text-7xl">
            Past Commissions
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-chrome">
            A curated record of bespoke work. Each pair was made for a single client and will never be
            repeated.
          </p>
        </SectionReveal>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {products.map((p, idx) => (
            <SectionReveal key={p.id} delay={idx * 0.08}>
              <div className="group overflow-hidden rounded-sm bg-charcoal">
                <div className="aspect-[4/5]">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-full w-full object-cover opacity-80 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
                  />
                </div>
                <div className="p-6">
                  <p className="text-xs uppercase tracking-[0.2em] text-gold">{p.collection}</p>
                  <h3 className="mt-2 font-display text-xl text-warm-white">{p.name}</h3>
                  <p className="mt-2 text-sm text-chrome line-clamp-2">{p.description}</p>
                  <div className="mt-4 flex items-center justify-between text-xs text-chrome">
                    <span>Commission only</span>
                    <span>Lagos, 2026</span>
                  </div>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </section>
    </div>
  );
}
