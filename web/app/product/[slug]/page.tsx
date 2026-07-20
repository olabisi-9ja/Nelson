import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";

export default async function ProductStory({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  const productName = slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

  return (
    <main className="w-full min-h-screen bg-background text-foreground selection:bg-primary selection:text-background">
      
      {/* 1. Cinematic Hero & 360 Viewer Placeholder */}
      <section className="relative w-full h-[90vh] flex flex-col md:flex-row border-b border-border/20">
        <div className="absolute top-8 left-8 z-50">
          <Link href="/collections" className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors mix-blend-difference">
            <ArrowLeft size={16} /> The Archive
          </Link>
        </div>

        {/* Left: Product Info */}
        <div className="w-full md:w-1/3 flex flex-col justify-center px-12 z-20 h-full bg-gradient-to-r from-background via-background/90 to-transparent">
          <span className="text-primary text-xs uppercase tracking-[0.3em] font-medium mb-4">Masterpiece</span>
          <h1 className="text-5xl md:text-6xl font-light uppercase tracking-tight mb-6">
            {productName}
          </h1>
          <p className="text-muted-foreground font-light text-lg mb-12">
            Sculpted from a single cut of full-grain crust calfskin. A testament to minimalist design and maximum durability.
          </p>
          <div className="flex items-center justify-between border-t border-border/20 pt-8 mb-8">
            <span className="text-2xl font-light text-primary">$1,250</span>
            <span className="text-sm uppercase tracking-widest text-muted-foreground">Base Price</span>
          </div>
          
          <Link href={`/commission/${slug}`} className="group relative w-full h-14 bg-foreground text-background flex items-center justify-center overflow-hidden">
            <span className="relative z-10 text-sm uppercase tracking-widest font-medium transition-colors group-hover:text-primary">Begin Commission</span>
            <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.175,1)]" />
          </Link>
        </div>

        {/* Right: 360 Viewer / Model Canvas Placeholder */}
        <div className="w-full md:w-2/3 h-full relative bg-secondary/20 flex items-center justify-center cursor-ew-resize">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-50" />
          
          {/* R3F Canvas will go here */}
          <div className="relative z-10 flex flex-col items-center gap-4">
            <div className="w-64 h-64 border border-dashed border-primary/30 rounded-full flex items-center justify-center">
              <span className="text-primary/50 text-xs uppercase tracking-widest text-center">Interactive<br/>3D Viewer</span>
            </div>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <ChevronRight size={12} className="rotate-180" />
              Drag to rotate
              <ChevronRight size={12} />
            </span>
          </div>
        </div>
      </section>

      {/* 2. Leather Details & Construction */}
      <section className="w-full py-32 px-8 md:px-24 grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
        <div className="aspect-square bg-secondary/30 rounded-sm relative overflow-hidden flex items-center justify-center">
           <span className="text-muted-foreground/30 font-mono tracking-widest text-sm uppercase">Macro Leather Texture</span>
        </div>
        <div className="flex flex-col gap-8">
          <h2 className="text-4xl font-light uppercase tracking-tight">The Anatomy of <br/><span className="text-primary italic font-serif lowercase">Excellence.</span></h2>
          <div className="h-[1px] w-12 bg-primary/50" />
          <p className="text-lg text-muted-foreground font-light leading-relaxed">
            Sourced exclusively from the renowned Tanneries du Puy, our crust calfskin offers unparalleled suppleness and a surface capable of receiving the most nuanced hand-patina.
          </p>
          <ul className="flex flex-col gap-6 mt-4">
            <li className="flex flex-col gap-1 border-l border-primary/30 pl-4">
              <span className="text-sm uppercase tracking-widest font-medium">Upper</span>
              <span className="text-muted-foreground font-light">Full-grain French Calfskin</span>
            </li>
            <li className="flex flex-col gap-1 border-l border-primary/30 pl-4">
              <span className="text-sm uppercase tracking-widest font-medium">Construction</span>
              <span className="text-muted-foreground font-light">Hand-welted Goodyear</span>
            </li>
            <li className="flex flex-col gap-1 border-l border-primary/30 pl-4">
              <span className="text-sm uppercase tracking-widest font-medium">Sole</span>
              <span className="text-muted-foreground font-light">Oak-bark tanned leather, closed channel</span>
            </li>
          </ul>
        </div>
      </section>

      {/* 3. Craft Story Video Section */}
      <section className="w-full h-screen relative bg-black flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-40 mix-blend-luminosity bg-secondary" />
        <div className="relative z-10 flex flex-col items-center gap-8 text-center px-4">
          <h2 className="text-5xl md:text-7xl font-light uppercase tracking-tighter text-white">The Making Of</h2>
          <button className="h-20 w-20 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors">
            <ChevronRight size={32} className="text-white ml-1" />
          </button>
          <span className="text-xs uppercase tracking-[0.3em] text-white/50">Watch the Documentary</span>
        </div>
      </section>

      {/* 4. Specifications & Customization Preview */}
      <section className="w-full bg-secondary py-32 px-8">
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center gap-12">
          <h2 className="text-3xl font-light uppercase tracking-widest">Tailored to your signature</h2>
          <p className="text-muted-foreground max-w-2xl text-lg font-light">
            Every commission begins with a blank canvas. Select your preferred patina, sole treatment, and hand-stitched monogram before we begin molding the leather to your exact measurements.
          </p>
          <Link href={`/commission/${slug}`} className="mt-8 px-12 py-4 border border-primary text-primary hover:bg-primary hover:text-background transition-colors uppercase tracking-widest text-sm">
            Configure Yours
          </Link>
        </div>
      </section>

    </main>
  );
}
