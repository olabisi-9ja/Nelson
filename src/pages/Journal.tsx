import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { SectionReveal } from "@/components/SectionReveal";
import { journalPosts } from "@/data/mock";

const categories = ["All", ...Array.from(new Set(journalPosts.map((j) => j.category)))];

export function Journal() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(
    () =>
      journalPosts.filter(
        (j) =>
          (category === "All" || j.category === category) &&
          (j.title.toLowerCase().includes(query.toLowerCase()) ||
            j.excerpt.toLowerCase().includes(query.toLowerCase()) ||
            j.tags.some((t) => t.toLowerCase().includes(query.toLowerCase())))
      ),
    [query, category]
  );

  return (
    <div className="pt-32">
      <section className="mx-auto max-w-7xl px-6 pb-12">
        <SectionReveal>
          <p className="text-xs uppercase tracking-[0.25em] text-gold">Journal</p>
          <h1 className="mt-4 font-display text-5xl text-warm-white md:text-7xl">
            Stories from the Atelier
          </h1>
        </SectionReveal>
      </section>

      <section className="sticky top-20 z-30 border-y border-white/10 bg-obsidian/95 py-4 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
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
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-charcoal/50 px-4 py-2">
            <Search className="h-4 w-4 text-chrome" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search journal..."
              className="bg-transparent text-sm text-warm-white placeholder:text-white/30 focus:outline-none"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post, idx) => (
            <SectionReveal key={post.id} delay={idx * 0.08}>
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
                  <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-chrome">
                    <span className="text-gold">{post.category}</span>
                    <span>·</span>
                    <span>{post.date}</span>
                  </div>
                  <h3 className="mt-2 font-display text-2xl text-warm-white group-hover:text-gold">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-chrome">{post.excerpt}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {post.tags.map((t) => (
                      <span key={t} className="rounded-full border border-white/10 px-2 py-1 text-[10px] uppercase tracking-widest text-chrome">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </SectionReveal>
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="py-12 text-center text-chrome">No stories found.</p>
        )}
      </section>
    </div>
  );
}
