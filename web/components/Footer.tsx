import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-background border-t border-border/20 pt-24 pb-12 px-8 md:px-16 text-foreground">
      <div className="max-w-7xl mx-auto flex flex-col gap-24">
        
        <div className="flex flex-col md:flex-row justify-between gap-16">
          <div className="flex flex-col gap-6 md:w-1/3">
            <h2 className="text-3xl font-light uppercase tracking-widest">Nelson</h2>
            <p className="text-muted-foreground font-light text-sm max-w-xs">
              Handmade luxury footwear built for those who value excellence. Crafted without compromise in our private atelier.
            </p>
            <div className="flex gap-4 mt-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-xs uppercase tracking-widest">Instagram</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-xs uppercase tracking-widest">Twitter</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-xs uppercase tracking-widest">Journal</a>
            </div>
          </div>
          
          <div className="flex gap-16 md:gap-32">
            <div className="flex flex-col gap-6">
              <span className="text-primary text-[10px] uppercase tracking-[0.2em] font-medium">Exhibitions</span>
              <nav className="flex flex-col gap-4 text-sm font-light uppercase tracking-wider text-muted-foreground">
                <Link href="/collections/oxford" className="hover:text-foreground transition-colors">Oxford</Link>
                <Link href="/collections/chelsea" className="hover:text-foreground transition-colors">Chelsea</Link>
                <Link href="/collections/loafers" className="hover:text-foreground transition-colors">Loafers</Link>
                <Link href="/collections/boots" className="hover:text-foreground transition-colors">Boots</Link>
              </nav>
            </div>
            
            <div className="flex flex-col gap-6">
              <span className="text-primary text-[10px] uppercase tracking-[0.2em] font-medium">Atelier</span>
              <nav className="flex flex-col gap-4 text-sm font-light uppercase tracking-wider text-muted-foreground">
                <Link href="/commission" className="hover:text-foreground transition-colors flex items-center gap-1">Commission <ArrowUpRight size={12}/></Link>
                <Link href="/masterclass" className="hover:text-foreground transition-colors">Masterclass</Link>
                <Link href="/about" className="hover:text-foreground transition-colors">Craftsmanship</Link>
                <Link href="/dashboard" className="hover:text-foreground transition-colors">Client Portal</Link>
              </nav>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between border-t border-border/10 pt-8 text-xs text-muted-foreground uppercase tracking-widest">
          <p>&copy; {new Date().getFullYear()} Nelson Bespoke. All Rights Reserved.</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
