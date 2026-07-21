import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import toast from "react-hot-toast";
import type { Product } from "@/types";

export interface CartItem {
  product: Product;
  quantity: number;
  config?: Record<string, string>;
}

interface CartContextValue {
  items: CartItem[];
  add: (product: Product, config?: Record<string, string>) => void;
  remove: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clear: () => void;
  total: number;
  count: number;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(localStorage.getItem("nelson_cart") || "[]");
    } catch {
      return [];
    }
  });
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("nelson_cart", JSON.stringify(items));
  }, [items]);

  const add = (product: Product, config?: Record<string, string>) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { product, quantity: 1, config }];
    });
    toast.success(`Added ${product.name} to your bag`);
    setOpen(true);
  };

  const remove = (id: string) => setItems((prev) => prev.filter((i) => i.product.id !== id));
  const updateQty = (id: string, qty: number) =>
    setItems((prev) =>
      prev.map((i) => (i.product.id === id ? { ...i, quantity: Math.max(1, qty) } : i))
    );
  const clear = () => setItems([]);

  const total = useMemo(
    () => items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
    [items]
  );
  const count = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items]);

  const value = useMemo(
    () => ({ items, add, remove, updateQty, clear, total, count, isOpen, setOpen }),
    [items, total, count, isOpen]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
