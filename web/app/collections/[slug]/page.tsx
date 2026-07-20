import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function CollectionExhibition({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  // In a real implementation, we would fetch the collection details and products from Supabase here.
  const collectionName = slug.charAt(0).toUpperCase() + slug.slice(1);

  return (
    <main className="w-full min-h-screen bg-background text-foreground">
      
      {/* Editorial Banner */}
      <section className="relative w-full h-[70vh] flex flex-col items-center justify-center border-b border-border/20">
        <div className="absolute inset-0 bg-gradient-to-b from-background/10 to-background z-10" />
        {/* Placeholder for large cinematic banner image */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
        
        <div className="relative z-20 flex flex-col items-center text-center px-4 max-w-4xl mx-auto">
          <span className="text-primary text-xs uppercase tracking-[0.3em] font-medium mb-6">
            The Exhibition
          </span>
          <h1 className="text-6xl md:text-8xl font-light tracking-tighter uppercase mb-8">
            {collectionName}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-light max-w-2xl italic font-serif">
            A study in uncompromising precision.
          </p>
        </div>
      </section>

      {/* Navigation / Filtering Header */}
      <div className="sticky top-0 z-40 w-full border-b border-border/20 bg-background/80 backdrop-blur-md">
        <div className="max-w-screen-2xl mx-auto px-8 py-4 flex items-center justify-between">
          <Link href="/collections" className="flex items-center gap-2 text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={16} /> Back to Archive
          </Link>
          
          <div className="flex items-center gap-8 text-sm uppercase tracking-widest font-medium">
            <button className="text-foreground border-b border-primary pb-1">All Pieces</button>
            <button className="text-muted-foreground hover:text-foreground transition-colors">History</button>
            <button className="text-muted-foreground hover:text-foreground transition-colors">Craft Story</button>
          </div>
        </div>
      </div>

      {/* Exhibition Grid (Product Gallery) */}
      <section className="max-w-screen-2xl mx-auto px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-24">
          
          {/* Placeholder Product Card 1 */}
          <Link href={`/product/the-classic-${slug}`} className="group flex flex-col gap-6">
            <div className="aspect-[4/5] bg-secondary/30 relative overflow-hidden flex items-center justify-center rounded-sm">
              <span className="text-muted-foreground/30 font-mono tracking-widest text-sm uppercase">Artwork Placeholder</span>
            </div>
            <div className="flex flex-col gap-2 border-l border-primary/30 pl-4">
              <h3 className="text-2xl uppercase tracking-wide group-hover:text-primary transition-colors">The Classic {collectionName}</h3>
              <p className="text-muted-foreground font-light text-sm">Matte Black Calfskin</p>
              <p className="text-primary mt-2">$1,250</p>
            </div>
          </Link>

          {/* Placeholder Product Card 2 */}
          <Link href={`/product/the-modern-${slug}`} className="group flex flex-col gap-6">
            <div className="aspect-[4/5] bg-secondary/30 relative overflow-hidden flex items-center justify-center rounded-sm">
              <span className="text-muted-foreground/30 font-mono tracking-widest text-sm uppercase">Artwork Placeholder</span>
            </div>
            <div className="flex flex-col gap-2 border-l border-primary/30 pl-4">
              <h3 className="text-2xl uppercase tracking-wide group-hover:text-primary transition-colors">The Modern {collectionName}</h3>
              <p className="text-muted-foreground font-light text-sm">Warm Ivory Suede</p>
              <p className="text-primary mt-2">$1,300</p>
            </div>
          </Link>
          
          {/* Placeholder Product Card 3 */}
          <Link href={`/product/the-legacy-${slug}`} className="group flex flex-col gap-6">
            <div className="aspect-[4/5] bg-secondary/30 relative overflow-hidden flex items-center justify-center rounded-sm">
              <span className="text-muted-foreground/30 font-mono tracking-widest text-sm uppercase">Artwork Placeholder</span>
            </div>
            <div className="flex flex-col gap-2 border-l border-primary/30 pl-4">
              <h3 className="text-2xl uppercase tracking-wide group-hover:text-primary transition-colors">The Legacy {collectionName}</h3>
              <p className="text-muted-foreground font-light text-sm">Leather Brown Exotic</p>
              <p className="text-primary mt-2">$2,100</p>
            </div>
          </Link>

        </div>
      </section>
      
      {/* Craft Story Section */}
      <section className="w-full bg-secondary py-32 px-8">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-8">
          <span className="text-primary text-xs uppercase tracking-[0.3em] font-medium">Craft Story</span>
          <h2 className="text-4xl md:text-5xl font-light tracking-tight uppercase">
            Forged in tradition. <br/> <span className="italic font-serif lowercase text-muted-foreground">Elevated for today.</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
            Every {collectionName.toLowerCase()} is the culmination of 120 rigorous steps. From the selection of full-grain crust leathers to the meticulous hand-welted soles, this collection represents the absolute apex of shoemaking. It is not merely footwear; it is a legacy passed from our hands to yours.
          </p>
        </div>
      </section>

    </main>
  );
}
