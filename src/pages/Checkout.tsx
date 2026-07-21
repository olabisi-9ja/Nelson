import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, CreditCard, ShieldCheck } from "lucide-react";
import { SectionReveal } from "@/components/SectionReveal";
import { TrustBadges } from "@/components/TrustBadges";
import { useCart } from "@/hooks/useCart";
import { useAdminStore } from "@/hooks/useAdminStore";
import { formatNaira } from "@/data/mock";

export function Checkout() {
  const { items, total, clear } = useCart();
  const { addOrder, addCommission } = useAdminStore();
  const navigate = useNavigate();
  const [method, setMethod] = useState<"card" | "paystack" | "bank">("card");
  const [loading, setLoading] = useState(false);

  const placeOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const orderId = `ORD-${Date.now()}`;
      addOrder({
        id: orderId,
        customerId: "guest",
        customerName: "Guest Client",
        items: items.map((i) => ({ name: i.product.name, price: i.product.price })),
        total,
        status: "Paid",
        date: new Date().toISOString().split("T")[0],
      });
      addCommission({
        id: `CM-${Date.now()}`,
        customerId: "guest",
        customerName: "Guest Client",
        productName: items.map((i) => i.product.name).join(", "),
        status: "approved",
        stages: [
          { name: "Order Placed", completed: true, estimated: new Date().toISOString().split("T")[0] },
          { name: "Leather Selected", completed: false },
          { name: "Cutting", completed: false },
          { name: "Stitching", completed: false },
          { name: "Burnishing", completed: false },
          { name: "Polishing", completed: false },
          { name: "Packaging", completed: false },
          { name: "Shipping", completed: false },
        ],
        deposit: total,
        total,
        createdAt: new Date().toISOString().split("T")[0],
        estimatedCompletion: new Date(Date.now() + 42 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        notes: "",
        customization: {},
      });
      clear();
      setLoading(false);
      navigate("/dashboard");
    }, 1500);
  };

  if (items.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-6 pt-32 text-center">
        <h1 className="font-display text-3xl text-warm-white">Your bag is empty</h1>
        <Link to="/collections" className="mt-6 text-gold underline-offset-8 hover:underline">
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32">
      <section className="mx-auto max-w-6xl px-6 pb-12">
        <Link
          to="/collections"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-cream/70 transition hover:text-gold"
        >
          <ArrowLeft className="h-4 w-4" /> Continue Shopping
        </Link>
        <h1 className="mt-8 font-display text-4xl text-warm-white md:text-5xl">Checkout</h1>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-6 pb-24 lg:grid-cols-[1fr_380px]">
        <SectionReveal>
          <form onSubmit={placeOrder} className="space-y-8">
            <div className="rounded-2xl border border-white/10 bg-charcoal/40 p-6 md:p-8">
              <h2 className="font-display text-xl text-warm-white">Contact & Shipping</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <input
                  required
                  placeholder="First name"
                  className="rounded-md border border-white/10 bg-obsidian px-4 py-3 text-warm-white placeholder:text-white/30 focus:border-gold/40 focus:outline-none"
                />
                <input
                  required
                  placeholder="Last name"
                  className="rounded-md border border-white/10 bg-obsidian px-4 py-3 text-warm-white placeholder:text-white/30 focus:border-gold/40 focus:outline-none"
                />
                <input
                  required
                  type="email"
                  placeholder="Email"
                  className="sm:col-span-2 rounded-md border border-white/10 bg-obsidian px-4 py-3 text-warm-white placeholder:text-white/30 focus:border-gold/40 focus:outline-none"
                />
                <input
                  required
                  placeholder="Address"
                  className="sm:col-span-2 rounded-md border border-white/10 bg-obsidian px-4 py-3 text-warm-white placeholder:text-white/30 focus:border-gold/40 focus:outline-none"
                />
                <input
                  placeholder="City"
                  className="rounded-md border border-white/10 bg-obsidian px-4 py-3 text-warm-white placeholder:text-white/30 focus:border-gold/40 focus:outline-none"
                />
                <input
                  placeholder="Country"
                  className="rounded-md border border-white/10 bg-obsidian px-4 py-3 text-warm-white placeholder:text-white/30 focus:border-gold/40 focus:outline-none"
                />
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-charcoal/40 p-6 md:p-8">
              <h2 className="font-display text-xl text-warm-white">Payment</h2>
              <div className="mt-6 space-y-3">
                {[
                  { id: "card", label: "Credit / Debit Card (Stripe)" },
                  { id: "paystack", label: "Pay with Paystack" },
                  { id: "bank", label: "Bank Transfer" },
                ].map((m) => (
                  <label
                    key={m.id}
                    onClick={() => setMethod(m.id as typeof method)}
                    className={`flex cursor-pointer items-center justify-between rounded-lg border p-4 transition ${
                      method === m.id
                        ? "border-gold bg-gold/10"
                        : "border-white/10 hover:border-white/20"
                    }`}
                  >
                    <span className="text-warm-white">{m.label}</span>
                    <CreditCard className="h-5 w-5 text-chrome" />
                  </label>
                ))}
              </div>
              <div className="mt-6 grid gap-4">
                <input
                  placeholder="Card number"
                  className="rounded-md border border-white/10 bg-obsidian px-4 py-3 text-warm-white placeholder:text-white/30 focus:border-gold/40 focus:outline-none"
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    placeholder="MM / YY"
                    className="rounded-md border border-white/10 bg-obsidian px-4 py-3 text-warm-white placeholder:text-white/30 focus:border-gold/40 focus:outline-none"
                  />
                  <input
                    placeholder="CVC"
                    className="rounded-md border border-white/10 bg-obsidian px-4 py-3 text-warm-white placeholder:text-white/30 focus:border-gold/40 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-gold py-4 text-sm font-semibold uppercase tracking-widest text-obsidian transition hover:bg-gold-light disabled:opacity-70"
            >
              {loading ? "Processing..." : `Pay ${formatNaira(total)}`}
            </button>
          </form>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <div className="sticky top-32 rounded-2xl border border-white/10 bg-charcoal/40 p-6 md:p-8">
            <h2 className="font-display text-xl text-warm-white">Order Summary</h2>
            <p className="mt-2 text-xs text-chrome">
              Each piece is made to order. Estimated delivery: 4–6 weeks.
            </p>
            <div className="mt-6 space-y-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex items-center gap-4">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="h-16 w-16 rounded-sm object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-warm-white">{item.product.name}</p>
                    <p className="text-xs text-chrome">Qty {item.quantity}</p>
                  </div>
                  <span className="text-sm text-warm-white">
                    {formatNaira(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-6 space-y-2 border-t border-white/10 pt-6 text-sm">
              <div className="flex justify-between text-chrome">
                <span>Subtotal</span>
                <span>{formatNaira(total)}</span>
              </div>
              <div className="flex justify-between text-chrome">
                <span>Shipping</span>
                <span>Calculated later</span>
              </div>
              <div className="flex justify-between text-lg font-medium text-warm-white">
                <span>Total</span>
                <span>{formatNaira(total)}</span>
              </div>
            </div>
            <div className="mt-6 flex items-center gap-2 text-xs text-chrome">
              <ShieldCheck className="h-4 w-4 text-gold" />
              Secure payment encrypted end-to-end.
            </div>
            <TrustBadges className="mt-4" />
          </div>
        </SectionReveal>
      </section>
    </div>
  );
}
