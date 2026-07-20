import Link from "next/link";

const collections = [
  {
    title: "Oxford",
    slug: "oxford",
    description: "The pinnacle of formal elegance, meticulously crafted for legacy.",
    year: "EST. 1994",
  },
  {
    title: "Chelsea",
    slug: "chelsea",
    description: "A seamless silhouette defining modern sophistication.",
    year: "EST. 1998",
  },
  {
    title: "Loafers",
    slug: "loafers",
    description: "Effortless luxury in its most versatile form.",
    year: "EST. 2001",
  },
  {
    title: "Boots",
    slug: "boots",
    description: "Rugged durability elevated by uncompromising craftsmanship.",
    year: "EST. 2005",
  },
];

export default function CollectionsIndex() {
  return (
    <main className="w-full min-h-screen bg-background text-foreground pt-32 pb-24 px-8 md:px-16">
      <div className="max-w-7xl mx-auto flex flex-col gap-24">
        
        {/* Header */}
        <header className="flex flex-col gap-4">
          <span className="text-primary text-xs uppercase tracking-[0.3em] font-medium">The Archive</span>
          <h1 className="text-5xl md:text-7xl font-light tracking-tighter uppercase">
            Curated <br/> <span className="text-muted-foreground italic font-serif lowercase">Exhibitions.</span>
          </h1>
        </header>

        {/* Collection List */}
        <section className="flex flex-col border-t border-border/20">
          {collections.map((collection, i) => (
            <Link 
              key={collection.slug} 
              href={`/collections/${collection.slug}`}
              className="group relative flex flex-col md:flex-row md:items-center justify-between py-12 md:py-16 border-b border-border/20 hover:bg-white/[0.02] transition-colors"
            >
              <div className="flex flex-col gap-4 md:w-1/2">
                <span className="text-muted-foreground text-sm font-mono tracking-widest opacity-50">
                  0{i + 1}
                </span>
                <h2 className="text-4xl md:text-6xl font-light uppercase tracking-tight group-hover:text-primary transition-colors">
                  {collection.title}
                </h2>
              </div>
              
              <div className="mt-6 md:mt-0 md:w-1/3 flex flex-col gap-4">
                <p className="text-muted-foreground font-light text-lg">
                  {collection.description}
                </p>
                <span className="text-xs uppercase tracking-widest text-primary/70">
                  {collection.year}
                </span>
              </div>

              {/* Hover image reveal effect could go here in a more advanced GSAP setup */}
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
