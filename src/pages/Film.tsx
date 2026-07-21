import { useState, useMemo } from "react";
import { Play } from "lucide-react";
import { SectionReveal } from "@/components/SectionReveal";
import { films } from "@/data/mock";

const categories = ["All", ...Array.from(new Set(films.map((f) => f.category)))];

export function Film() {
  const [category, setCategory] = useState("All");
  const [featured, setFeatured] = useState(films[0]);

  const filtered = useMemo(
    () => (category === "All" ? films : films.filter((f) => f.category === category)),
    [category]
  );

  return (
    <div className="pt-32">
      <section className="mx-auto max-w-7xl px-6 pb-12">
        <SectionReveal>
          <p className="text-xs uppercase tracking-[0.25em] text-gold">Cinema</p>
          <h1 className="mt-4 font-display text-5xl text-warm-white md:text-7xl">Film</h1>
        </SectionReveal>
      </section>

      {/* Featured */}
      <section className="relative h-[70vh] min-h-[500px]">
        <img
          src={featured.thumbnail}
          alt={featured.title}
          className="absolute inset-0 h-full w-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/50 to-obsidian/30" />
        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-12">
          <SectionReveal>
            <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-widest text-gold">
              {featured.category}
            </span>
            <h2 className="mt-4 font-display text-4xl text-warm-white md:text-6xl">
              {featured.title}
            </h2>
            <p className="mt-4 max-w-xl text-lg text-chrome">{featured.description}</p>
            <button className="mt-8 inline-flex items-center gap-3 rounded-full bg-gold px-8 py-4 text-sm font-semibold uppercase tracking-widest text-obsidian transition hover:bg-gold-light">
              <Play className="h-4 w-4 fill-current" /> Watch Now
            </button>
          </SectionReveal>
        </div>
      </section>

      {/* Filter */}
      <section className="sticky top-20 z-30 border-y border-white/10 bg-obsidian/95 py-4 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-2 px-6">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`rounded-full px-4 py-2 text-xs uppercase tracking-widest transition ${
                category === c
                  ? "bg-gold text-obsidian"
                  : "border border-white/10 text-cream/70 hover:border-gold/40"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((f, idx) => (
            <SectionReveal key={f.id} delay={idx * 0.08}>
              <button
                onClick={() => setFeatured(f)}
                className="group relative block w-full overflow-hidden rounded-sm"
              >
                <div className="aspect-[3/4]">
                  <img
                    src={f.thumbnail}
                    alt={f.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-obsidian/20 opacity-0 transition group-hover:opacity-100">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                      <Play className="h-5 w-5 fill-warm-white text-warm-white" />
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-left">
                  <p className="text-xs uppercase tracking-widest text-gold">{f.category}</p>
                  <h3 className="mt-1 font-display text-lg text-warm-white">{f.title}</h3>
                  <p className="text-xs text-chrome">{f.duration}</p>
                </div>
              </button>
            </SectionReveal>
          ))}
        </div>
      </section>
    </div>
  );
}
