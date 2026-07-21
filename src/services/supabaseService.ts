import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import type { Product, Order, Commission, Customer, JournalPost } from "@/types";

const STORAGE_KEY = "nelson_admin_v1";

function getLocal(): {
  products: Product[];
  orders: Order[];
  commissions: Commission[];
  customers: Customer[];
  journal: JournalPost[];
} {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return { products: [], orders: [], commissions: [], customers: [], journal: [] };
  }
}

function setLocal(data: ReturnType<typeof getLocal>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...getLocal(), ...data }));
}

export async function loadAll() {
  if (!isSupabaseConfigured) return getLocal();
  const [{ data: products }, { data: orders }, { data: commissions }, { data: customers }, { data: journal }] =
    await Promise.all([
      supabase.from("products").select("*"),
      supabase.from("orders").select("*"),
      supabase.from("commissions").select("*"),
      supabase.from("customers").select("*"),
      supabase.from("journal_posts").select("*"),
    ]);
  return {
    products: (products as Product[]) || [],
    orders: (orders as Order[]) || [],
    commissions: (commissions as Commission[]) || [],
    customers: (customers as Customer[]) || [],
    journal: (journal as JournalPost[]) || [],
  };
}

export async function saveAll(data: ReturnType<typeof getLocal>) {
  if (!isSupabaseConfigured) {
    setLocal(data);
    return;
  }
  await Promise.all([
    supabase.from("products").upsert(data.products as never),
    supabase.from("orders").upsert(data.orders as never),
    supabase.from("commissions").upsert(data.commissions as never),
    supabase.from("customers").upsert(data.customers as never),
    supabase.from("journal_posts").upsert(data.journal as never),
  ]);
}
