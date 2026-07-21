import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import { formatNaira } from "@/data/mock";

export function CartDrawer() {
  const { items, isOpen, setOpen, remove, updateQty, total, count } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[60] bg-obsidian/70 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 z-[60] flex h-full w-full max-w-md flex-col border-l border-white/10 bg-ink"
          >
            <div className="flex items-center justify-between border-b border-white/10 p-6">
              <div className="flex items-center gap-3">
                <ShoppingBag className="h-5 w-5 text-gold" />
                <h2 className="font-display text-xl text-warm-white">Your Bag</h2>
                <span className="rounded-full bg-gold/10 px-2 py-0.5 text-xs text-gold">{count}</span>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close cart">
                <X className="h-5 w-5 text-chrome hover:text-warm-white" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <ShoppingBag className="mb-4 h-12 w-12 text-white/10" />
                  <p className="text-chrome">Your bag is empty.</p>
                  <button
                    onClick={() => setOpen(false)}
                    className="mt-4 text-sm uppercase tracking-widest text-gold"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-4">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="h-24 w-20 rounded-sm object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-display text-lg text-warm-white">{item.product.name}</p>
                        <p className="text-xs text-chrome">{item.product.collection}</p>
                        {item.config && Object.keys(item.config).length > 0 && (
                          <p className="mt-1 text-[10px] text-chrome line-clamp-1">
                            {Object.entries(item.config)
                              .slice(0, 3)
                              .map(([k, v]) => `${k}: ${v}`)
                              .join(" · ")}
                          </p>
                        )}
                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center gap-2 rounded-full border border-white/10">
                            <button
                              onClick={() => updateQty(item.product.id, item.quantity - 1)}
                              className="p-2 text-chrome hover:text-gold"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-4 text-center text-sm">{item.quantity}</span>
                            <button
                              onClick={() => updateQty(item.product.id, item.quantity + 1)}
                              className="p-2 text-chrome hover:text-gold"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <span className="text-sm text-warm-white">
                            {formatNaira(item.product.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => remove(item.product.id)}
                        className="self-start text-chrome hover:text-red-400"
                        aria-label="Remove"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-white/10 p-6">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-chrome">Subtotal</span>
                  <span className="font-display text-xl text-warm-white">{formatNaira(total)}</span>
                </div>
                <p className="mb-4 text-xs text-chrome">Shipping & taxes calculated at checkout.</p>
                <Link
                  to="/checkout"
                  onClick={() => setOpen(false)}
                  className="block w-full rounded-full bg-gold py-4 text-center text-sm font-semibold uppercase tracking-widest text-obsidian transition hover:bg-gold-light"
                >
                  Checkout
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
