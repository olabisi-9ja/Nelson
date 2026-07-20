import Link from "next/link";
import { CheckCircle2, Circle } from "lucide-react";

export default function DashboardOverview() {
  return (
    <div className="w-full h-full p-8 md:p-16 flex flex-col gap-12">
      <header className="flex flex-col gap-2">
        <h1 className="text-4xl font-light uppercase tracking-tight">Welcome, <span className="font-serif italic lowercase text-muted-foreground">Alexander</span></h1>
        <p className="text-muted-foreground">Manage your commissions, track production, and access authenticity records.</p>
      </header>

      {/* Live Production Tracker */}
      <section className="flex flex-col gap-6">
        <div className="flex items-center justify-between border-b border-border/20 pb-4">
          <h2 className="text-xl uppercase tracking-widest font-medium">Live Production</h2>
          <span className="text-xs uppercase tracking-widest text-primary border border-primary px-3 py-1">In Progress</span>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Order Details */}
          <div className="flex flex-col gap-8 bg-secondary/10 p-8 border border-border/10">
            <div className="flex flex-col gap-1">
              <span className="text-muted-foreground text-xs uppercase tracking-widest">Commission #NL-8321</span>
              <h3 className="text-2xl font-light uppercase">The Classic Oxford</h3>
              <p className="text-primary font-serif italic">Matte Black Calfskin</p>
            </div>
            
            <div className="aspect-[4/3] bg-secondary/30 relative flex items-center justify-center">
              <span className="text-muted-foreground/30 text-xs tracking-widest uppercase">Latest Production Photo</span>
            </div>
            
            <Link href="/dashboard/commissions/NL-8321" className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground underline underline-offset-4">
              View Full Gallery & Notes
            </Link>
          </div>

          {/* Timeline */}
          <div className="flex flex-col gap-6 py-4">
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Estimated Completion: <span className="text-foreground font-medium">Oct 12, 2026</span></span>
            
            <div className="flex flex-col gap-6 relative">
              <div className="absolute left-[11px] top-4 bottom-4 w-[1px] bg-border/20" />
              
              {/* Completed Step */}
              <div className="flex items-start gap-4 relative z-10">
                <CheckCircle2 size={24} className="text-primary bg-background" />
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium uppercase tracking-widest text-foreground">Leather Selected</span>
                  <span className="text-xs text-muted-foreground">Completed Sep 15</span>
                </div>
              </div>
              
              {/* Completed Step */}
              <div className="flex items-start gap-4 relative z-10">
                <CheckCircle2 size={24} className="text-primary bg-background" />
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium uppercase tracking-widest text-foreground">Cutting</span>
                  <span className="text-xs text-muted-foreground">Completed Sep 18</span>
                </div>
              </div>
              
              {/* Current Step */}
              <div className="flex items-start gap-4 relative z-10">
                <Circle size={24} className="text-primary fill-primary/20 bg-background" />
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium uppercase tracking-widest text-primary">Stitching</span>
                  <span className="text-xs text-muted-foreground">In Progress</span>
                  <p className="text-sm text-muted-foreground mt-2 border-l border-primary/30 pl-4 py-1 italic font-serif">
                    "The intricate hand-stitching on the heel is proceeding beautifully." - Artisan Note
                  </p>
                </div>
              </div>
              
              {/* Future Steps */}
              <div className="flex items-start gap-4 relative z-10 opacity-40">
                <Circle size={24} className="text-muted-foreground bg-background" />
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium uppercase tracking-widest">Burnishing</span>
                </div>
              </div>
              <div className="flex items-start gap-4 relative z-10 opacity-40">
                <Circle size={24} className="text-muted-foreground bg-background" />
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium uppercase tracking-widest">Polishing</span>
                </div>
              </div>
              <div className="flex items-start gap-4 relative z-10 opacity-40">
                <Circle size={24} className="text-muted-foreground bg-background" />
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium uppercase tracking-widest">Packaging</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
