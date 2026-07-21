import { ShieldCheck, Truck, RefreshCcw, Ruler } from "lucide-react";

const badges = [
  { icon: ShieldCheck, label: "Certificate of Authenticity" },
  { icon: Ruler, label: "Free Fitting Adjustments" },
  { icon: Truck, label: "Insured Global Shipping" },
  { icon: RefreshCcw, label: "1-Year Care & Repairs" },
];

export function TrustBadges({ className = "" }: { className?: string }) {
  return (
    <div className={`grid grid-cols-2 gap-4 md:grid-cols-4 ${className}`}>
      {badges.map((b) => (
        <div key={b.label} className="flex items-center gap-3 rounded-xl border border-white/10 bg-charcoal/30 p-4">
          <b.icon className="h-5 w-5 shrink-0 text-gold" />
          <span className="text-xs uppercase leading-tight tracking-widest text-chrome">{b.label}</span>
        </div>
      ))}
    </div>
  );
}
