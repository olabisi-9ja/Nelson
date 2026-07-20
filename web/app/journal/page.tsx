import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const ARTICLES = [
  {
    title: "The Art of Hand-Applied Patina",
    excerpt: "Exploring the chemical and visual transformation of natural crust leather under the hand of an artisan.",
    category: "Craftsmanship",
    date: "Sep 12, 2026",
    readTime: "6 min read",
    slug: "art-of-patina",
  },
  {
    title: "Sourcing French Calfskin from Le Puy",
    excerpt: "Why the microclimate and traditional tanning processes of the Auvergne-Rhône-Alpes produce the world's most robust hides.",
    category: "Materials",
    date: "Aug 29, 2026",
    readTime: "8 min read",
    slug: "sourcing-french-calfskin",
  },
  {
    title: "Why Goodyear Welted Shoes Last Forever",
    excerpt: "A engineering breakdown of the Goodyear welt, comparing it to Blake stitching and cement construction.",
    category: "Construction",
    date: "Jul 18, 2026",
    readTime: "5 min read",
    slug: "why-goodyear-lasts-forever",
  },
  {
    title: "The Return of the Hand-Carved Last",
    excerpt: "How digital 3D scans are being mapped back to traditional wood lasts to preserve historical bespoke techniques.",
    category: "Technology",
    date: "Jun 04, 2026",
    readTime: "7 min read",
    slug: "hand-carved-lasts",
  },
];

export default function JournalPage() {
  return (
    <main className="w-full min-h-screen bg-background text-foreground pt-32 pb-24 px-8 md:px-16">
      <div className="max-w-6xl mx-auto flex flex-col gap-24">
        
        {/* Header */}
        <header className="flex flex-col gap-4 border-b border-border/20 pb-12">
          <span className="text-primary text-xs uppercase tracking-[0.3em] font-medium">The Archive</span>
          <h1 className="text-5xl md:text-7xl font-light tracking-tighter uppercase leading-none">
            The Journal
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground font-light max-w-xl mt-4">
            Essays on design, material provenance, and the architecture of shoemaking.
          </p>
        </header>

        {/* Article Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {ARTICLES.map((article) => (
            <Link 
              key={article.slug} 
              href={`/journal/${article.slug}`} 
              className="group flex flex-col gap-6 border-b border-border/10 pb-12 hover:border-primary/40 transition-colors"
            >
              <div className="aspect-[16/10] bg-secondary/30 relative flex items-center justify-center rounded-sm">
                <span className="text-muted-foreground/20 font-mono tracking-widest text-xs uppercase">Journal Illustration</span>
              </div>
              
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center text-xs text-primary/70 uppercase tracking-widest">
                  <span>{article.category}</span>
                  <span className="text-muted-foreground font-mono">{article.date} &bull; {article.readTime}</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-light uppercase tracking-tight group-hover:text-primary transition-colors mt-2">
                  {article.title}
                </h2>
                <p className="text-muted-foreground font-light leading-relaxed mt-2">
                  {article.excerpt}
                </p>
                
                <span className="text-xs uppercase tracking-widest font-semibold flex items-center gap-1 mt-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  Read Article <ArrowUpRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </section>

      </div>
    </main>
  );
}
