import { ArrowUpRight, DollarSign, Users, Package, Clock } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto">
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-light uppercase tracking-tight">Overview</h1>
          <p className="text-sm text-muted-foreground mt-1">Real-time luxury metrics and workshop throughput.</p>
        </div>
        <button className="px-4 py-2 bg-foreground text-background text-xs uppercase tracking-widest hover:bg-primary transition-colors">
          Download Report
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Revenue", value: "$124,500", icon: DollarSign, trend: "+12.5%" },
          { label: "Active Commissions", value: "42", icon: Wrench, trend: "+4" },
          { label: "Pending Orders", value: "18", icon: Package, trend: "-2" },
          { label: "VIP Clients", value: "156", icon: Users, trend: "+12" },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-background border border-border/20 p-6 flex flex-col gap-4 relative overflow-hidden group">
              <div className="flex justify-between items-start">
                <span className="text-xs uppercase tracking-widest text-muted-foreground">{stat.label}</span>
                <Icon size={16} className="text-muted-foreground" />
              </div>
              <div className="flex items-end gap-3">
                <span className="text-3xl font-light">{stat.value}</span>
                <span className="text-xs text-primary mb-1 flex items-center gap-1">
                  <ArrowUpRight size={12} /> {stat.trend}
                </span>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-primary scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500" />
            </div>
          );
        })}
      </div>

      {/* Production & Recent Commissions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
        
        {/* Recent Commissions Table */}
        <div className="lg:col-span-2 bg-background border border-border/20 p-6 flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <h2 className="text-sm uppercase tracking-widest font-medium">Recent Commissions</h2>
            <button className="text-xs text-muted-foreground hover:text-foreground">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase tracking-widest text-muted-foreground border-b border-border/20">
                <tr>
                  <th className="pb-3 font-medium">ID</th>
                  <th className="pb-3 font-medium">Client</th>
                  <th className="pb-3 font-medium">Product</th>
                  <th className="pb-3 font-medium">Stage</th>
                  <th className="pb-3 font-medium text-right">Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/10">
                {[
                  { id: "NL-8321", client: "Alexander P.", product: "The Classic Oxford", stage: "Stitching", val: "$1,250" },
                  { id: "NL-8320", client: "Sarah J.", product: "Modern Chelsea", stage: "Cutting", val: "$1,400" },
                  { id: "NL-8319", client: "Michael T.", product: "Legacy Loafer", stage: "Polishing", val: "$950" },
                  { id: "NL-8318", client: "David W.", product: "Bespoke Boot", stage: "Leather Selected", val: "$2,100" },
                ].map((row, i) => (
                  <tr key={i} className="group hover:bg-secondary/10 transition-colors">
                    <td className="py-4 font-mono text-xs text-muted-foreground">{row.id}</td>
                    <td className="py-4">{row.client}</td>
                    <td className="py-4 font-serif italic text-muted-foreground">{row.product}</td>
                    <td className="py-4">
                      <span className="px-2 py-1 bg-secondary text-xs uppercase tracking-wider">{row.stage}</span>
                    </td>
                    <td className="py-4 text-right font-light">{row.val}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Workshop Throughput */}
        <div className="bg-background border border-border/20 p-6 flex flex-col gap-6">
          <h2 className="text-sm uppercase tracking-widest font-medium">Workshop Status</h2>
          <div className="flex flex-col gap-6">
            {[
              { label: "Leather Selection", count: 4, color: "bg-zinc-500" },
              { label: "Cutting & Lasting", count: 12, color: "bg-zinc-400" },
              { label: "Stitching", count: 18, color: "bg-primary" },
              { label: "Finishing & Patina", count: 5, color: "bg-zinc-600" },
              { label: "Quality Control", count: 3, color: "bg-zinc-700" },
            ].map((stage, i) => (
              <div key={i} className="flex flex-col gap-2">
                <div className="flex justify-between text-xs">
                  <span className="uppercase tracking-widest text-muted-foreground">{stage.label}</span>
                  <span>{stage.count} pairs</span>
                </div>
                <div className="w-full h-1 bg-secondary">
                  <div className={`h-full ${stage.color}`} style={{ width: `${(stage.count / 42) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

// Basic Wrench Icon polyfill since I forgot to import it in this file
function Wrench({ size = 24, className = "" }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
    </svg>
  );
}
