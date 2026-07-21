import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { Link } from "react-router-dom";
import { collections, courses, journalPosts, products } from "@/data/mock";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function SearchOverlay({ open, onClose }: Props) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    const items: { title: string; type: string; to: string }[] = [];
    products
      .filter((p) => p.name.toLowerCase().includes(q) || p.collection.toLowerCase().includes(q))
      .forEach((p) => items.push({ title: p.name, type: "Product", to: `/product/${p.slug}` }));
    collections
      .filter((c) => c.name.toLowerCase().includes(q))
      .forEach((c) => items.push({ title: c.name, type: "Collection", to: `/collections/${c.slug}` }));
    journalPosts
      .filter((j) => j.title.toLowerCase().includes(q) || j.category.toLowerCase().includes(q))
      .forEach((j) => items.push({ title: j.title, type: "Journal", to: `/journal/${j.slug}` }));
    courses
      .filter((c) => c.title.toLowerCase().includes(q))
      .forEach((c) => items.push({ title: c.title, type: "Masterclass", to: `/masterclass` }));
    return items.slice(0, 12);
  }, [query]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex flex-col items-center bg-obsidian/95 backdrop-blur-xl"
          onClick={onClose}
        >
          <div
            className="w-full max-w-3xl px-6 pt-24"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-4 border-b border-white/10 pb-4">
              <Search className="h-6 w-6 text-gold" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, collections, journal, courses..."
                className="flex-1 bg-transparent font-display text-2xl text-warm-white placeholder:text-white/30 focus:outline-none md:text-4xl"
              />
              <button onClick={onClose} aria-label="Close search">
                <X className="h-6 w-6 text-chrome transition hover:text-warm-white" />
              </button>
            </div>
            <div className="mt-8 space-y-1">
              {results.map((r, i) => (
                <Link
                  key={`${r.to}-${i}`}
                  to={r.to}
                  onClick={onClose}
                  className="group flex items-center justify-between rounded-md px-4 py-4 transition hover:bg-white/5"
                >
                  <span className="font-display text-lg text-warm-white group-hover:text-gold md:text-xl">
                    {r.title}
                  </span>
                  <span className="text-xs uppercase tracking-widest text-chrome">{r.type}</span>
                </Link>
              ))}
              {query && results.length === 0 && (
                <p className="px-4 pt-4 text-sm text-chrome">No results found.</p>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
