import { useParams, Navigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { SectionReveal } from "@/components/SectionReveal";
import { ProductCard } from "@/components/ProductCard";
import { collections, products } from "@/data/mock";

export function CollectionDetail() {
  const { slug } = useParams<{ slug: string }>();
  const collection = collections.find((c) => c.slug === slug);
  if (!collection) return <Navigate to="/collections" replace />;

  const collectionProducts = products.filter((p) => collection.products.includes(p.id));

  return (
    <div className="pt-32">
      <section className="relative h-[60vh] min-h-[420px]">
        <img
          src={collection.banner}
          alt={collection.name}
          className="absolute inset-0 h-full w-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/50 to-transparent" />
        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-12">
          <Link
            to="/collections"
            className="mb-4 inline-flex w-fit items-center gap-2 text-xs uppercase tracking-widest text-cream/70 transition hover:text-gold"
          >
            <ArrowLeft className="h-4 w-4" /> Collections
          </Link>
          <p className="text-xs uppercase tracking-[0.25em] text-gold">{collection.subtitle}</p>
          <h1 className="mt-3 font-display text-5xl text-warm-white md:text-7xl">
            {collection.name}
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-16 lg:grid-cols-2">
          <SectionReveal>
            <h2 className="font-display text-3xl text-warm-white md:text-4xl">History</h2>
            <p className="mt-5 text-lg leading-relaxed text-chrome">{collection.history}</p>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <h2 className="font-display text-3xl text-warm-white md:text-4xl">Craft Story</h2>
            <p className="mt-5 text-lg leading-relaxed text-chrome">{collection.craftStory}</p>
          </SectionReveal>
        </div>
      </section>

      <section className="border-t border-white/10 bg-charcoal/30 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <SectionReveal className="mb-12">
            <h2 className="font-display text-3xl text-warm-white md:text-4xl">Exhibition Pieces</h2>
          </SectionReveal>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {collectionProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          {collectionProducts.length === 0 && (
            <p className="text-chrome">Pieces coming soon.</p>
          )}
        </div>
      </section>
    </div>
  );
}
