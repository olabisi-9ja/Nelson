import Link from "next/link";
import { ArrowLeft, Play } from "lucide-react";

export default function FilmPage() {
  return (
    <main className="w-full min-h-screen bg-background text-foreground pt-32 pb-24 px-8 md:px-16 flex flex-col items-center">
      <div className="max-w-5xl w-full flex flex-col gap-12">
        
        {/* Back Link */}
        <Link href="/" className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft size={16} /> Home
        </Link>
        
        {/* Header */}
        <div className="flex flex-col gap-4 border-b border-border/20 pb-8">
          <span className="text-primary text-xs uppercase tracking-[0.3em] font-medium">Cinema</span>
          <h1 className="text-4xl md:text-6xl font-light uppercase tracking-tight leading-none">
            120 Steps to Legacy
          </h1>
          <p className="text-muted-foreground font-light text-base md:text-lg max-w-xl">
            A visual documentation of heritage, craftsmanship, and materials from our private workshop.
          </p>
        </div>

        {/* Video Player Box */}
        <div className="w-full aspect-video bg-black relative flex items-center justify-center border border-border/20 rounded-sm overflow-hidden group">
          <div className="absolute inset-0 bg-secondary/10 opacity-60 mix-blend-luminosity scale-105 group-hover:scale-100 transition-transform duration-[2000ms]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent z-10 pointer-events-none" />
          
          <button className="relative z-20 h-24 w-24 rounded-full border border-white/30 flex items-center justify-center bg-white/5 hover:bg-white/10 hover:scale-105 transition-all">
            <Play size={32} className="text-white fill-white ml-1" />
          </button>
          
          <span className="absolute bottom-6 right-6 text-xs font-mono text-white/50 tracking-widest uppercase">
            Duration: 18:24
          </span>
        </div>

        {/* Behind the Scenes Notes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8">
          <div className="flex flex-col gap-4">
            <h3 className="text-lg uppercase tracking-wider font-light border-l border-primary pl-4">The Narrative Focus</h3>
            <p className="text-muted-foreground font-light leading-relaxed text-sm">
              Filmed entirely inside our Lagos workshop, this short documentary exposes the slow, rhythmic labor of master clicking, hand-lasting, hand-welting, and hand-applied patinas. No automated machines are used at any stage.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-lg uppercase tracking-wider font-light border-l border-primary pl-4">Sound Design</h3>
            <p className="text-muted-foreground font-light leading-relaxed text-sm">
              We recorded the authentic ambient noise of the workshop: the slice of clicker knives through thick leather, the rhythm of lasting hammer strikes, and the soft rustle of burnishing cloths.
            </p>
          </div>
        </div>

      </div>
    </main>
  );
}
