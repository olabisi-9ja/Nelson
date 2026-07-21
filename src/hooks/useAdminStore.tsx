import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";
import type {
  Collection,
  Commission,
  Course,
  Customer,
  Film,
  JournalPost,
  Order,
  Product,
} from "@/types";
import {
  collections as seedCollections,
  commissions as seedCommissions,
  courses as seedCourses,
  customers as seedCustomers,
  films as seedFilms,
  journalPosts as seedJournal,
  orders as seedOrders,
  products as seedProducts,
} from "@/data/mock";
import { loadAll, saveAll } from "@/services/supabaseService";

interface AdminState {
  products: Product[];
  collections: Collection[];
  commissions: Commission[];
  orders: Order[];
  customers: Customer[];
  journal: JournalPost[];
  courses: Course[];
  films: Film[];
}

interface AdminContextValue extends AdminState {
  setProducts: (items: Product[]) => void;
  addProduct: (p: Product) => void;
  updateProduct: (p: Product) => void;
  deleteProduct: (id: string) => void;
  setCollections: (items: Collection[]) => void;
  addCollection: (c: Collection) => void;
  updateCollection: (c: Collection) => void;
  deleteCollection: (id: string) => void;
  setCommissions: (items: Commission[]) => void;
  addCommission: (c: Commission) => void;
  updateCommission: (c: Commission) => void;
  deleteCommission: (id: string) => void;
  setOrders: (items: Order[]) => void;
  addOrder: (o: Order) => void;
  removeOrder: (id: string) => void;
  setCustomers: (items: Customer[]) => void;
  addCustomer: (c: Customer) => void;
  removeCustomer: (id: string) => void;
  setJournal: (items: JournalPost[]) => void;
  addJournal: (j: JournalPost) => void;
  updateJournal: (j: JournalPost) => void;
  deleteJournal: (id: string) => void;
  setCourses: (items: Course[]) => void;
  setFilms: (items: Film[]) => void;
}

const AdminContext = createContext<AdminContextValue | undefined>(undefined);

function getSeed(): AdminState {
  return {
    products: seedProducts,
    collections: seedCollections,
    commissions: seedCommissions,
    orders: seedOrders,
    customers: seedCustomers,
    journal: seedJournal,
    courses: seedCourses,
    films: seedFilms,
  };
}

export function AdminStoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AdminState>(() => getSeed());
  const seededRef = useRef(true);

  useEffect(() => {
    let active = true;
    loadAll().then((data) => {
      if (!active) return;
      setState((prev) => ({
        ...prev,
        products: data.products?.length ? data.products : prev.products,
        orders: data.orders?.length ? data.orders : prev.orders,
        commissions: data.commissions?.length ? data.commissions : prev.commissions,
        customers: data.customers?.length ? data.customers : prev.customers,
        journal: data.journal?.length ? data.journal : prev.journal,
      }));
      seededRef.current = false;
    });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (seededRef.current) return;
    saveAll({
      products: state.products,
      orders: state.orders,
      commissions: state.commissions,
      customers: state.customers,
      journal: state.journal,
    });
  }, [state.products, state.orders, state.commissions, state.customers, state.journal]);

  const update = useCallback((partial: Partial<AdminState>) => {
    setState((prev) => ({ ...prev, ...partial }));
  }, []);

  const value = useMemo<AdminContextValue>(
    () => ({
      ...state,
      setProducts: (products) => update({ products }),
      addProduct: (p) => update({ products: [p, ...state.products] }),
      updateProduct: (p) =>
        update({
          products: state.products.map((x) => (x.id === p.id ? p : x)),
        }),
      deleteProduct: (id) =>
        update({ products: state.products.filter((x) => x.id !== id) }),
      setCollections: (collections) => update({ collections }),
      addCollection: (c) => update({ collections: [c, ...state.collections] }),
      updateCollection: (c) =>
        update({
          collections: state.collections.map((x) => (x.id === c.id ? c : x)),
        }),
      deleteCollection: (id) =>
        update({ collections: state.collections.filter((x) => x.id !== id) }),
      setCommissions: (commissions) => update({ commissions }),
      addCommission: (c) => update({ commissions: [c, ...state.commissions] }),
      updateCommission: (c) =>
        update({
          commissions: state.commissions.map((x) => (x.id === c.id ? c : x)),
        }),
      deleteCommission: (id) =>
        update({ commissions: state.commissions.filter((x) => x.id !== id) }),
      setOrders: (orders) => update({ orders }),
      addOrder: (o) => update({ orders: [o, ...state.orders] }),
      removeOrder: (id) => update({ orders: state.orders.filter((x) => x.id !== id) }),
      setCustomers: (customers) => update({ customers }),
      addCustomer: (c) => update({ customers: [c, ...state.customers] }),
      removeCustomer: (id) => update({ customers: state.customers.filter((x) => x.id !== id) }),
      setJournal: (journal) => update({ journal }),
      addJournal: (j) => update({ journal: [j, ...state.journal] }),
      updateJournal: (j) =>
        update({ journal: state.journal.map((x) => (x.id === j.id ? j : x)) }),
      deleteJournal: (id) =>
        update({ journal: state.journal.filter((x) => x.id !== id) }),
      setCourses: (courses) => update({ courses }),
      setFilms: (films) => update({ films }),
    }),
    [state, update]
  );

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

export const useAdminStore = () => {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdminStore must be used within AdminStoreProvider");
  return ctx;
};
