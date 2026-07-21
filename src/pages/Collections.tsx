import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Search } from "lucide-react";
import { SectionReveal } from "@/components/SectionReveal";
import { collections } from "@/data/mock";

export function Collections() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(
    () =>
      collections.filter(
        (c) =>
          c.name.toLowerCase().includes(query.toLowerCase()) ||
          c.description.toLowerCase().includes(query.toLowerCase())
      ),
    [query]
  );

  return (
    <div className="pt-32">
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <SectionReveal>
          <p className="text-xs uppercase tracking-[0.25em] text-gold">Museum Exhibitions</p>
          <h1 className="mt-4 font-display text-5xl text-warm-white md:text-7xl">
            Collections
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-chrome">
            Explore our galleries as you would a private exhibition. Each collection is a study in
            proportion, material, and meaning.
          </p>
        </SectionReveal>
      </section>

      <section className="border-y border-white/10 bg-charcoal/30 py-6">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-6">
          <Search className="h-5 w-5 text-chrome" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter collections..."
            className="flex-1 bg-transparent py-2 text-warm-white placeholder:text-white/30 focus:outline-none"
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-8 md:grid-cols-2">
          {filtered.map((c, idx) => (
            <SectionReveal key={c.id} delay={idx * 0.08}>
              <Link to={`/collections/${c.slug}`} className="group block">
                <div className="overflow-hidden rounded-xl bg-obsidian/20 aspect-[4/5] md:aspect-[16/10]">
                  <img
                    src={c.banner}
                    alt={c.name}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="mt-6 md:mt-8">
                  <p className="text-xs uppercase tracking-[0.2em] text-gold">{c.subtitle}</p>
                  <h2 className="mt-2 font-display text-3xl text-warm-white md:text-4xl">
                    {c.name}
                  </h2>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-cream/80 line-clamp-2">
                    {c.description}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-gold transition group-hover:gap-3">
                    Enter Exhibition <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </SectionReveal>
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="py-12 text-center text-chrome">No collections match your search.</p>
        )}
      </section>
    </div>
  );
}
