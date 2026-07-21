import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { formatNaira } from "@/data/mock";
import { useCart } from "@/hooks/useCart";
import type { Product } from "@/types";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="group">
        <Link to={`/product/${product.slug}`} className="relative block aspect-[4/5] overflow-hidden rounded-sm bg-charcoal">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
          <button
            onClick={(e) => {
              e.preventDefault();
              add(product);
            }}
            className="absolute bottom-4 left-4 right-4 flex translate-y-4 items-center justify-center gap-2 rounded-full bg-gold py-3 text-sm font-semibold uppercase tracking-widest text-obsidian opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100"
          >
            <ShoppingBag className="h-4 w-4" /> Add to Bag
          </button>
        </Link>
        <Link to={`/product/${product.slug}`} className="mt-5 block space-y-1">
          <p className="text-xs uppercase tracking-[0.2em] text-chrome">{product.collection}</p>
          <h3 className="font-display text-xl text-warm-white transition group-hover:text-gold">
            {product.name}
          </h3>
          <p className="text-sm text-cream/70">{formatNaira(product.price)}</p>
        </Link>
      </div>
    </motion.div>
  );
}
