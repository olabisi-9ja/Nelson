import { useParams, Navigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { SectionReveal } from "@/components/SectionReveal";
import { journalPosts } from "@/data/mock";

export function JournalPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = journalPosts.find((j) => j.slug === slug);
  if (!post) return <Navigate to="/journal" replace />;

  const related = journalPosts.filter((j) => j.category === post.category && j.id !== post.id);

  return (
    <div className="pt-32">
      <section className="mx-auto max-w-4xl px-6 pb-12">
        <Link
          to="/journal"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-cream/70 transition hover:text-gold"
        >
          <ArrowLeft className="h-4 w-4" /> Journal
        </Link>
      </section>

      <section className="relative h-[60vh] min-h-[400px]">
        <img
          src={post.image}
          alt={post.title}
          className="absolute inset-0 h-full w-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/50 to-transparent" />
        <div className="relative mx-auto flex h-full max-w-4xl flex-col justify-end px-6 pb-12">
          <p className="text-xs uppercase tracking-[0.25em] text-gold">{post.category}</p>
          <h1 className="mt-4 font-display text-4xl text-warm-white md:text-6xl">{post.title}</h1>
          <p className="mt-4 text-sm text-chrome">{post.date}</p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-6 py-16">
        <SectionReveal>
          <p className="text-xl leading-relaxed text-cream md:text-2xl">{post.excerpt}</p>
          <div className="mt-10 space-y-6 text-lg leading-relaxed text-chrome">
            <p>{post.content}</p>
            <p>
              At Nelson, every decision is deliberate. The leather is selected for grain, the thread
              for tensile strength, the sole for the rhythm of the client's stride. This is not fast
              fashion. It is slow luxury.
            </p>
            <p>
              Our artisans train for years before they are permitted to work on a client commission.
              Mistakes are corrected, standards are enforced, and the final product must pass the eye
              of the founder before it leaves the atelier.
            </p>
          </div>
          <div className="mt-12 flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-widest text-chrome"
              >
                {t}
              </span>
            ))}
          </div>
        </SectionReveal>
      </article>

      {related.length > 0 && (
        <section className="border-t border-white/10 py-24">
          <div className="mx-auto max-w-7xl px-6">
            <SectionReveal className="mb-12">
              <h2 className="font-display text-3xl text-warm-white">Related Stories</h2>
            </SectionReveal>
            <div className="grid gap-8 md:grid-cols-2">
              {related.map((r) => (
                <Link key={r.id} to={`/journal/${r.slug}`} className="group block">
                  <div className="aspect-[16/9] overflow-hidden rounded-sm bg-charcoal">
                    <img
                      src={r.image}
                      alt={r.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="mt-4 font-display text-xl text-warm-white group-hover:text-gold">
                    {r.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
