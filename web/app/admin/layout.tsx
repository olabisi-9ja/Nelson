import Link from "next/link";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Wrench, 
  Users, 
  FileText, 
  Settings, 
  Bell, 
  BarChart, 
  Image as ImageIcon 
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full min-h-screen bg-background flex flex-col md:flex-row text-foreground">
      {/* Sidebar */}
      <aside className="w-full md:w-64 border-r border-border/20 bg-secondary/5 flex flex-col">
        <div className="p-6 border-b border-border/20">
          <Link href="/" className="text-xl font-light uppercase tracking-widest hover:text-primary transition-colors">
            Nelson Admin
          </Link>
          <div className="mt-2 text-[10px] uppercase tracking-widest text-primary flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> System Online
          </div>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-1">
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-2 px-2">Core</div>
          <Link href="/admin" className="flex items-center gap-3 text-sm px-2 py-2 rounded-md bg-primary/10 text-primary">
            <LayoutDashboard size={16} /> Dashboard
          </Link>
          <Link href="/admin/commissions" className="flex items-center gap-3 text-sm px-2 py-2 rounded-md hover:bg-secondary/20 text-muted-foreground hover:text-foreground">
            <Wrench size={16} /> Commissions
          </Link>
          <Link href="/admin/orders" className="flex items-center gap-3 text-sm px-2 py-2 rounded-md hover:bg-secondary/20 text-muted-foreground hover:text-foreground">
            <ShoppingBag size={16} /> Orders
          </Link>
          
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-widest mt-6 mb-2 px-2">Management</div>
          <Link href="/admin/products" className="flex items-center gap-3 text-sm px-2 py-2 rounded-md hover:bg-secondary/20 text-muted-foreground hover:text-foreground">
            <ShoppingBag size={16} /> Products
          </Link>
          <Link href="/admin/crm" className="flex items-center gap-3 text-sm px-2 py-2 rounded-md hover:bg-secondary/20 text-muted-foreground hover:text-foreground">
            <Users size={16} /> CRM & Clients
          </Link>
          <Link href="/admin/cms" className="flex items-center gap-3 text-sm px-2 py-2 rounded-md hover:bg-secondary/20 text-muted-foreground hover:text-foreground">
            <FileText size={16} /> CMS / Content
          </Link>
          <Link href="/admin/media" className="flex items-center gap-3 text-sm px-2 py-2 rounded-md hover:bg-secondary/20 text-muted-foreground hover:text-foreground">
            <ImageIcon size={16} /> Media Library
          </Link>
          
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-widest mt-6 mb-2 px-2">System</div>
          <Link href="/admin/analytics" className="flex items-center gap-3 text-sm px-2 py-2 rounded-md hover:bg-secondary/20 text-muted-foreground hover:text-foreground">
            <BarChart size={16} /> Analytics
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 text-sm px-2 py-2 rounded-md hover:bg-secondary/20 text-muted-foreground hover:text-foreground">
            <Settings size={16} /> Settings
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-16 border-b border-border/20 flex items-center justify-between px-8 bg-background">
          <div className="flex items-center gap-4">
            <span className="text-sm font-mono text-muted-foreground">/admin/dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-muted-foreground hover:text-foreground relative">
              <Bell size={18} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full" />
            </button>
            <div className="w-8 h-8 rounded-full bg-secondary border border-border flex items-center justify-center text-xs font-mono">
              AD
            </div>
          </div>
        </header>
        
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-8 bg-secondary/5">
          {children}
        </main>
      </div>
    </div>
  );
}
