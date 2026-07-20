import Link from "next/link";
import { Package, Truck, Hammer, ShieldCheck, Mail, Heart, Home } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full min-h-screen bg-background flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 border-r border-border/20 bg-background/50 flex flex-col p-8">
        <Link href="/" className="text-2xl font-light uppercase tracking-widest mb-16 hover:text-primary transition-colors">
          Nelson
        </Link>
        <span className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Client Atelier</span>
        
        <nav className="flex flex-col gap-2">
          <Link href="/dashboard" className="flex items-center gap-3 text-sm tracking-wider hover:text-primary text-foreground py-2 border-b border-border/10">
            <Home size={16} /> Overview
          </Link>
          <Link href="/dashboard/commissions" className="flex items-center gap-3 text-sm tracking-wider text-muted-foreground hover:text-primary py-2 border-b border-border/10">
            <Hammer size={16} /> Active Commissions
          </Link>
          <Link href="/dashboard/orders" className="flex items-center gap-3 text-sm tracking-wider text-muted-foreground hover:text-primary py-2 border-b border-border/10">
            <Package size={16} /> Order History
          </Link>
          <Link href="/dashboard/messages" className="flex items-center gap-3 text-sm tracking-wider text-muted-foreground hover:text-primary py-2 border-b border-border/10">
            <Mail size={16} /> Artisan Messages
          </Link>
          <Link href="/dashboard/certificates" className="flex items-center gap-3 text-sm tracking-wider text-muted-foreground hover:text-primary py-2 border-b border-border/10">
            <ShieldCheck size={16} /> Authenticity
          </Link>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
