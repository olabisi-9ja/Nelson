import { useState } from "react";
import { Navigate } from "react-router-dom";
import { SectionReveal } from "@/components/SectionReveal";
import { ProductionTracker } from "@/components/ProductionTracker";
import { useAuth } from "@/hooks/useAuth";
import { useAdminStore } from "@/hooks/useAdminStore";
import { formatNaira } from "@/data/mock";

export function ClientDashboard() {
  const { user } = useAuth();
  const { orders, commissions } = useAdminStore();
  const [tab, setTab] = useState<"orders" | "progress" | "saved">("orders");

  if (!user) return <Navigate to="/" replace />;

  const myOrders = orders.filter((o) => o.customerId === user.id || o.customerId === "guest");
  const myCommissions = commissions.filter(
    (c) => c.customerId === user.id || c.customerId === "guest"
  );

  return (
    <div className="pt-32">
      <section className="mx-auto max-w-6xl px-6 pb-12">
        <SectionReveal>
          <p className="text-xs uppercase tracking-[0.25em] text-gold">Client Portal</p>
          <h1 className="mt-4 font-display text-4xl text-warm-white md:text-5xl">
            Welcome, {user.name}
          </h1>
        </SectionReveal>
      </section>

      <section className="sticky top-20 z-30 border-y border-white/10 bg-obsidian/95 py-4 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl gap-2 px-6">
          {(["orders", "progress", "saved"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-full px-5 py-2 text-xs uppercase tracking-widest transition ${
                tab === t
                  ? "bg-gold text-obsidian"
                  : "border border-white/10 text-cream/70 hover:border-gold/40"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        {tab === "orders" && (
          <SectionReveal>
            <h2 className="mb-6 font-display text-2xl text-warm-white">Your Orders</h2>
            {myOrders.length === 0 ? (
              <p className="text-chrome">No orders yet.</p>
            ) : (
              <div className="space-y-4">
                {myOrders.map((o) => (
                  <div
                    key={o.id}
                    className="flex flex-col justify-between gap-4 rounded-xl border border-white/10 bg-charcoal/40 p-6 md:flex-row md:items-center"
                  >
                    <div>
                      <p className="text-xs uppercase tracking-widest text-gold">{o.id}</p>
                      <p className="mt-1 text-warm-white">{o.items.map((i) => i.name).join(", ")}</p>
                      <p className="text-sm text-chrome">{o.date}</p>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className="font-display text-xl text-warm-white">{formatNaira(o.total)}</span>
                      <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-chrome">
                        {o.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </SectionReveal>
        )}

        {tab === "progress" && (
          <SectionReveal>
            <h2 className="mb-6 font-display text-2xl text-warm-white">Production Progress</h2>
            {myCommissions.length === 0 ? (
              <p className="text-chrome">No active commissions.</p>
            ) : (
              <div className="space-y-8">
                {myCommissions.map((c) => (
                  <div key={c.id}>
                    <p className="mb-3 text-xs uppercase tracking-widest text-gold">
                      {c.id} — {c.productName}
                    </p>
                    <ProductionTracker stages={c.stages} />
                  </div>
                ))}
              </div>
            )}
          </SectionReveal>
        )}

        {tab === "saved" && (
          <SectionReveal>
            <h2 className="mb-6 font-display text-2xl text-warm-white">Saved Designs</h2>
            <p className="text-chrome">Your saved configurations will appear here.</p>
          </SectionReveal>
        )}
      </section>
    </div>
  );
}
