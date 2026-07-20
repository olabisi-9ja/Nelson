import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="w-full min-h-screen bg-background text-foreground pt-32 pb-24 px-8 md:px-16">
      <div className="max-w-5xl mx-auto flex flex-col gap-24">
        
        {/* Header */}
        <header className="flex flex-col gap-4 border-b border-border/20 pb-12">
          <span className="text-primary text-xs uppercase tracking-[0.3em] font-medium">History</span>
          <h1 className="text-5xl md:text-7xl font-light tracking-tighter uppercase leading-none">
            The Nelson Story.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground font-light max-w-2xl mt-4 leading-relaxed">
            Forged in Lagos, refined for the world. Nelson is a study in preservation, blending generational Nigerian leatherwork with classical European hand-welted architecture.
          </p>
        </header>

        {/* Brand Core Pillars */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col gap-6">
            <h2 className="text-3xl font-light uppercase tracking-tight">Our Heritage</h2>
            <p className="text-muted-foreground font-light leading-relaxed">
              We started as a micro-workshop under the canopy of Yaba, Lagos. Inspired by local masters who carved lasts out of native mahogany and hand-polished uppers with raw oils, we set out to build a flagship that could rival the absolute highest standards of European shoemaking.
            </p>
            <p className="text-muted-foreground font-light leading-relaxed">
              Today, we blend those exact roots with full-grain calfskins from the premium tanneries of France and Italy, bringing a rich, multi-dimensional story to every collection.
            </p>
          </div>
          
          <div className="aspect-square bg-secondary/30 relative flex items-center justify-center rounded-sm">
            <span className="text-muted-foreground/30 font-mono tracking-widest text-xs uppercase">Heritage Workspace</span>
          </div>
        </section>

        {/* Quote Block */}
        <section className="text-center max-w-3xl mx-auto py-12 flex flex-col gap-6 border-y border-border/10">
          <p className="text-2xl font-light italic font-serif text-muted-foreground">
            "A shoe is not meant to simply carry you. It is meant to mark your steps upon history."
          </p>
          <span className="text-xs uppercase tracking-widest font-mono font-semibold text-primary">Nelson A. / Founder & Master Lastmaker</span>
        </section>

      </div>
    </main>
  );
}
