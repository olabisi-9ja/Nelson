import { useState, useMemo } from "react";
import { Navigate } from "react-router-dom";
import {
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
} from "recharts";
import {
  LayoutDashboard,
  Box,
  ClipboardList,
  Factory,
  Users,
  FileText,
  Film,
  GraduationCap,
  ShoppingCart,
  Settings,
  Plus,
  Trash2,
  Edit3,
  Search,
  Save,
  X,
  ChevronRight,
  DollarSign,
  Package,
  AlertCircle,
  Mail,
  MessageSquare,
  Bell,
  Smartphone,
} from "lucide-react";
import { SectionReveal } from "@/components/SectionReveal";
import { ProductionTracker } from "@/components/ProductionTracker";
import { useAuth } from "@/hooks/useAuth";
import { useAdminStore } from "@/hooks/useAdminStore";
import { formatNaira } from "@/data/mock";
import { cn } from "@/utils/cn";
import type { Product, Commission, JournalPost } from "@/types";

const COLORS = ["#c5a059", "#a8b0bc", "#6b4423", "#262626", "#1a1a1a"];

type TabId =
  | "dashboard"
  | "products"
  | "orders"
  | "commissions"
  | "production"
  | "crm"
  | "cms"
  | "analytics"
  | "films"
  | "courses"
  | "settings";

interface SidebarGroup {
  label: string;
  items: { id: TabId; label: string; icon: React.ElementType }[];
}

const sidebarGroups: SidebarGroup[] = [
  {
    label: "Overview",
    items: [
      { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
      { id: "analytics", label: "Analytics", icon: BarChart },
    ],
  },
  {
    label: "Commerce",
    items: [
      { id: "products", label: "Products", icon: Box },
      { id: "orders", label: "Orders", icon: ShoppingCart },
      { id: "commissions", label: "Commissions", icon: ClipboardList },
    ],
  },
  {
    label: "Operations",
    items: [
      { id: "production", label: "Production", icon: Factory },
      { id: "crm", label: "CRM", icon: Users },
    ],
  },
  {
    label: "Content",
    items: [
      { id: "cms", label: "Journal", icon: FileText },
      { id: "films", label: "Films", icon: Film },
      { id: "courses", label: "Courses", icon: GraduationCap },
    ],
  },
  {
    label: "System",
    items: [{ id: "settings", label: "Automation", icon: Settings }],
  },
];

export function AdminDashboard() {
  const { user } = useAuth();
  const [tab, setTab] = useState<TabId>("dashboard");

  if (!user || (user.role !== "admin" && user.role !== "manager" && user.role !== "artisan")) {
    return <Navigate to="/" replace />;
  }

  const allowedGroups =
    user.role === "artisan"
      ? sidebarGroups
          .map((g) => ({
            ...g,
            items: g.items.filter((i) => ["dashboard", "production", "commissions"].includes(i.id)),
          }))
          .filter((g) => g.items.length > 0)
      : user.role === "manager"
      ? sidebarGroups
          .map((g) => ({
            ...g,
            items: g.items.filter((i) => i.id !== "settings"),
          }))
          .filter((g) => g.items.length > 0)
      : sidebarGroups;

  return (
    <div className="min-h-screen pt-28">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 lg:flex-row">
        <aside className="lg:w-64 lg:shrink-0">
          <div className="sticky top-28 rounded-2xl border border-white/10 bg-charcoal/40 p-4">
            <p className="mb-4 px-3 text-xs uppercase tracking-widest text-gold">Admin Console</p>
            <nav className="space-y-5">
              {allowedGroups.map((group) => (
                <div key={group.label}>
                  <p className="mb-2 px-3 text-[10px] uppercase tracking-widest text-white/30">
                    {group.label}
                  </p>
                  <div className="space-y-1">
                    {group.items.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setTab(t.id)}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition",
                          tab === t.id
                            ? "bg-gold/10 text-gold"
                            : "text-chrome hover:bg-white/5 hover:text-warm-white"
                        )}
                      >
                        <t.icon className="h-4 w-4" /> {t.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </nav>
          </div>
        </aside>

        <main className="flex-1 pb-24">
          {tab === "dashboard" && <DashboardTab setTab={setTab} />}
          {tab === "products" && <ProductsTab />}
          {tab === "orders" && <OrdersTab />}
          {tab === "commissions" && <CommissionsTab setTab={setTab} />}
          {tab === "production" && <ProductionTab />}
          {tab === "crm" && <CRMTab />}
          {tab === "cms" && <CMSTab />}
          {tab === "analytics" && <AnalyticsTab />}
          {tab === "films" && <FilmsTab />}
          {tab === "courses" && <CoursesTab />}
          {tab === "settings" && <SettingsTab />}
        </main>
      </div>
    </div>
  );
}

function DashboardTab({ setTab }: { setTab: (t: TabId) => void }) {
  const { orders, commissions, products, customers } = useAdminStore();
  const revenue = orders.reduce((s, o) => s + o.total, 0);
  const pending = commissions.filter((c) => c.status === "pending").length;
  const inProduction = commissions.filter((c) => c.status === "in-production").length;

  const cards = [
    { label: "Total Revenue", value: formatNaira(revenue), icon: DollarSign, color: "text-gold" },
    { label: "Orders", value: orders.length, icon: ShoppingCart, color: "text-warm-white" },
    { label: "Products", value: products.length, icon: Package, color: "text-warm-white" },
    { label: "Clients", value: customers.length, icon: Users, color: "text-warm-white" },
    { label: "Pending Approval", value: pending, icon: AlertCircle, color: "text-orange-400" },
    { label: "In Production", value: inProduction, icon: Factory, color: "text-gold" },
  ];

  return (
    <SectionReveal>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-display text-3xl text-warm-white">Dashboard</h2>
        <span className="text-xs uppercase tracking-widest text-chrome">
          {new Date().toLocaleDateString("en-NG", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <div
            key={c.label}
            className="rounded-2xl border border-white/10 bg-charcoal/40 p-5 transition hover:border-white/20"
          >
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-widest text-chrome">{c.label}</p>
              <c.icon className={cn("h-5 w-5", c.color)} />
            </div>
            <p className="mt-3 font-display text-3xl text-warm-white">{c.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-charcoal/40 p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-xl text-warm-white">Recent Orders</h3>
            <button
              onClick={() => setTab("orders")}
              className="flex items-center gap-1 text-xs uppercase tracking-widest text-gold"
            >
              View all <ChevronRight className="h-3 w-3" />
            </button>
          </div>
          <div className="space-y-3">
            {orders.slice(0, 5).map((o) => (
              <div
                key={o.id}
                className="flex items-center justify-between rounded-lg border border-white/5 bg-obsidian/50 p-3"
              >
                <div>
                  <p className="text-sm text-warm-white">{o.id}</p>
                  <p className="text-xs text-chrome">{o.customerName}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-warm-white">{formatNaira(o.total)}</p>
                  <p className="text-[10px] uppercase tracking-widest text-chrome">{o.status}</p>
                </div>
              </div>
            ))}
            {orders.length === 0 && <p className="text-sm text-chrome">No orders yet.</p>}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-charcoal/40 p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-xl text-warm-white">Active Commissions</h3>
            <button
              onClick={() => setTab("commissions")}
              className="flex items-center gap-1 text-xs uppercase tracking-widest text-gold"
            >
              View all <ChevronRight className="h-3 w-3" />
            </button>
          </div>
          <div className="space-y-3">
            {commissions.slice(0, 5).map((c) => (
              <div
                key={c.id}
                className="flex items-center justify-between rounded-lg border border-white/5 bg-obsidian/50 p-3"
              >
                <div>
                  <p className="text-sm text-warm-white">{c.productName}</p>
                  <p className="text-xs text-chrome">{c.customerName}</p>
                </div>
                <span
                  className={cn(
                    "rounded-full px-2 py-1 text-[10px] uppercase tracking-widest",
                    c.status === "pending"
                      ? "bg-orange-400/10 text-orange-400"
                      : c.status === "in-production"
                      ? "bg-gold/10 text-gold"
                      : "bg-green-500/10 text-green-400"
                  )}
                >
                  {c.status.replace("-", " ")}
                </span>
              </div>
            ))}
            {commissions.length === 0 && <p className="text-sm text-chrome">No commissions yet.</p>}
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}

function ProductsTab() {
  const { products, addProduct, updateProduct, deleteProduct } = useAdminStore();
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<Product | null>(null);

  const filtered = useMemo(
    () =>
      products.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.collection.toLowerCase().includes(search.toLowerCase())
      ),
    [products, search]
  );

  const emptyProduct = (): Product => ({
    id: `p${Date.now()}`,
    slug: `new-${Date.now()}`,
    name: "",
    collection: "",
    price: 0,
    image: "/images/oxford-shoe.jpg",
    images: [],
    description: "",
    craftStory: "",
    materials: [],
    construction: [],
    specifications: {},
    reviews: [],
  });

  const save = (p: Product) => {
    if (products.find((x) => x.id === p.id)) updateProduct(p);
    else addProduct(p);
    setEditing(null);
  };

  return (
    <SectionReveal>
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h2 className="font-display text-3xl text-warm-white">Products</h2>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-chrome" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="rounded-full border border-white/10 bg-charcoal/50 py-2 pl-9 pr-4 text-sm text-warm-white placeholder:text-white/30 focus:border-gold/40 focus:outline-none"
            />
          </div>
          <button
            onClick={() => setEditing(emptyProduct())}
            className="flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-xs font-semibold uppercase tracking-widest text-obsidian"
          >
            <Plus className="h-4 w-4" /> Add
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-white/10 bg-charcoal/50 text-xs uppercase tracking-widest text-chrome">
            <tr>
              <th className="p-4">Product</th>
              <th className="p-4">Collection</th>
              <th className="p-4">Price</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-b border-white/5 transition hover:bg-white/5">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img src={p.image} alt={p.name} className="h-10 w-10 rounded-sm object-cover" />
                    <span className="font-medium text-warm-white">{p.name}</span>
                  </div>
                </td>
                <td className="p-4 text-chrome">{p.collection}</td>
                <td className="p-4 text-chrome">{formatNaira(p.price)}</td>
                <td className="p-4">
                  <span className="rounded-full bg-gold/10 px-2 py-1 text-[10px] uppercase tracking-widest text-gold">
                    Commission
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => setEditing(p)} className="rounded-md p-2 text-chrome hover:bg-white/5 hover:text-gold">
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => deleteProduct(p.id)}
                      className="rounded-md p-2 text-chrome hover:bg-white/5 hover:text-red-400"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <p className="p-6 text-center text-sm text-chrome">No products found.</p>}
      </div>

      {editing && <ProductModal product={editing} onClose={() => setEditing(null)} onSave={save} />}
    </SectionReveal>
  );
}

function ProductModal({
  product,
  onClose,
  onSave,
}: {
  product: Product;
  onClose: () => void;
  onSave: (p: Product) => void;
}) {
  const [form, setForm] = useState<Product>(product);
  return (
    <Modal title="Edit Product" onClose={onClose}>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
        <Input label="Collection" value={form.collection} onChange={(v) => setForm({ ...form, collection: v })} />
        <Input
          label="Price"
          type="number"
          value={String(form.price)}
          onChange={(v) => setForm({ ...form, price: Number(v) })}
        />
        <Input label="Image URL" value={form.image} onChange={(v) => setForm({ ...form, image: v })} />
        <Input
          label="Slug"
          className="sm:col-span-2"
          value={form.slug}
          onChange={(v) => setForm({ ...form, slug: v })}
        />
        <TextArea
          label="Description"
          className="sm:col-span-2"
          value={form.description}
          onChange={(v) => setForm({ ...form, description: v })}
          rows={3}
        />
        <TextArea
          label="Craft Story"
          className="sm:col-span-2"
          value={form.craftStory}
          onChange={(v) => setForm({ ...form, craftStory: v })}
          rows={3}
        />
        <Input
          label="Materials (comma separated)"
          className="sm:col-span-2"
          value={form.materials.join(", ")}
          onChange={(v) => setForm({ ...form, materials: v.split(",").map((s) => s.trim()) })}
        />
        <Input
          label="Construction (comma separated)"
          className="sm:col-span-2"
          value={form.construction.join(", ")}
          onChange={(v) => setForm({ ...form, construction: v.split(",").map((s) => s.trim()) })}
        />
      </div>
      <div className="mt-6 flex justify-end gap-3">
        <button
          onClick={onClose}
          className="rounded-full border border-white/10 px-5 py-2 text-xs uppercase tracking-widest text-warm-white transition hover:border-gold/40"
        >
          Cancel
        </button>
        <button
          onClick={() => onSave(form)}
          className="flex items-center gap-2 rounded-full bg-gold px-5 py-2 text-xs font-semibold uppercase tracking-widest text-obsidian"
        >
          <Save className="h-4 w-4" /> Save Product
        </button>
      </div>
    </Modal>
  );
}

function OrdersTab() {
  const { orders, removeOrder } = useAdminStore();
  const [search, setSearch] = useState("");

  const filtered = useMemo(
    () =>
      orders.filter(
        (o) =>
          o.id.toLowerCase().includes(search.toLowerCase()) ||
          o.customerName.toLowerCase().includes(search.toLowerCase())
      ),
    [orders, search]
  );

  return (
    <SectionReveal>
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h2 className="font-display text-3xl text-warm-white">Orders</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-chrome" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search orders..."
            className="rounded-full border border-white/10 bg-charcoal/50 py-2 pl-9 pr-4 text-sm text-warm-white placeholder:text-white/30 focus:border-gold/40 focus:outline-none"
          />
        </div>
      </div>
      <DataTable
        columns={["Order ID", "Customer", "Items", "Total", "Status", "Date"]}
        rows={filtered.map((o) => [
          o.id,
          o.customerName,
          o.items.map((i) => i.name).join(", "),
          formatNaira(o.total),
          <StatusBadge key={o.id} status={o.status} />,
          o.date,
        ])}
        actions={filtered.map((o) => (
          <button
            key={o.id}
            onClick={() => removeOrder(o.id)}
            className="rounded-md p-2 text-chrome hover:text-red-400"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        ))}
      />
    </SectionReveal>
  );
}

function CommissionsTab({ setTab }: { setTab: (t: TabId) => void }) {
  const { commissions, updateCommission, deleteCommission } = useAdminStore();
  const [filter, setFilter] = useState("all");

  const filtered = useMemo(
    () => (filter === "all" ? commissions : commissions.filter((c) => c.status === filter)),
    [commissions, filter]
  );

  return (
    <SectionReveal>
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h2 className="font-display text-3xl text-warm-white">Commissions</h2>
        <div className="flex items-center gap-3">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-full border border-white/10 bg-charcoal/50 px-4 py-2 text-sm text-warm-white focus:border-gold/40 focus:outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="in-production">In Production</option>
            <option value="ready">Ready</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>
      </div>
      <div className="space-y-4">
        {filtered.map((c) => (
          <div
            key={c.id}
            className="rounded-2xl border border-white/10 bg-charcoal/40 p-5 transition hover:border-white/20"
          >
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div>
                <p className="text-xs uppercase tracking-widest text-gold">{c.id}</p>
                <p className="text-lg text-warm-white">
                  {c.productName} — {c.customerName}
                </p>
                <p className="text-sm text-chrome">
                  Deposit {formatNaira(c.deposit)} of {formatNaira(c.total)} · Est. {c.estimatedCompletion}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <select
                  value={c.status}
                  onChange={(e) => updateCommission({ ...c, status: e.target.value as Commission["status"] })}
                  className="rounded-md border border-white/10 bg-obsidian px-3 py-2 text-sm text-warm-white"
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="in-production">In Production</option>
                  <option value="ready">Ready</option>
                  <option value="delivered">Delivered</option>
                </select>
                <button
                  onClick={() => setTab("production")}
                  className="rounded-md p-2 text-chrome hover:text-gold"
                  title="Manage production"
                >
                  <Factory className="h-4 w-4" />
                </button>
                <button onClick={() => deleteCommission(c.id)} className="rounded-md p-2 text-chrome hover:text-red-400">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <p className="text-chrome">No commissions match this filter.</p>}
      </div>
    </SectionReveal>
  );
}

function ProductionTab() {
  const { commissions } = useAdminStore();
  const [selected, setSelected] = useState(commissions[0]?.id);
  const commission = commissions.find((c) => c.id === selected) || commissions[0];

  return (
    <SectionReveal>
      <h2 className="font-display text-3xl text-warm-white">Production</h2>
      <div className="mt-6 flex flex-wrap gap-2">
        {commissions.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelected(c.id)}
            className={cn(
              "rounded-full px-4 py-2 text-xs uppercase tracking-widest transition",
              selected === c.id ? "bg-gold text-obsidian" : "border border-white/10 text-chrome hover:border-gold/40"
            )}
          >
            {c.id}
          </button>
        ))}
      </div>
      {commission ? (
        <div className="mt-6">
          <div className="mb-4">
            <p className="text-xs uppercase tracking-widest text-gold">{commission.id}</p>
            <p className="text-lg text-warm-white">{commission.productName}</p>
            <p className="text-sm text-chrome">{commission.customerName}</p>
          </div>
          <ProductionTracker stages={commission.stages} />
        </div>
      ) : (
        <p className="mt-6 text-chrome">No commissions to track.</p>
      )}
    </SectionReveal>
  );
}

function CRMTab() {
  const { customers } = useAdminStore();
  const [search, setSearch] = useState("");
  const filtered = useMemo(
    () =>
      customers.filter(
        (c) =>
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.email.toLowerCase().includes(search.toLowerCase())
      ),
    [customers, search]
  );

  return (
    <SectionReveal>
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h2 className="font-display text-3xl text-warm-white">CRM</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-chrome" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search clients..."
            className="rounded-full border border-white/10 bg-charcoal/50 py-2 pl-9 pr-4 text-sm text-warm-white placeholder:text-white/30 focus:border-gold/40 focus:outline-none"
          />
        </div>
      </div>
      <DataTable
        columns={["Name", "Email", "Segment", "Lifetime Value", "Last Order"]}
        rows={filtered.map((c) => [
          c.name,
          c.email,
          <SegmentBadge key={c.id} segment={c.segment} />,
          formatNaira(c.lifetimeValue),
          c.lastOrder,
        ])}
      />
    </SectionReveal>
  );
}

function CMSTab() {
  const { journal, updateJournal, deleteJournal, addJournal } = useAdminStore();
  const [editing, setEditing] = useState<JournalPost | null>(null);

  const empty = (): JournalPost => ({
    id: `j${Date.now()}`,
    slug: "",
    title: "",
    excerpt: "",
    category: "Craftsmanship",
    image: "/images/craft-hands.jpg",
    date: new Date().toISOString().split("T")[0],
    tags: [],
    content: "",
  });

  const save = (j: JournalPost) => {
    if (journal.find((x) => x.id === j.id)) updateJournal(j);
    else addJournal(j);
    setEditing(null);
  };

  return (
    <SectionReveal>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-display text-3xl text-warm-white">Journal</h2>
        <button
          onClick={() => setEditing(empty())}
          className="flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-xs font-semibold uppercase tracking-widest text-obsidian"
        >
          <Plus className="h-4 w-4" /> Add Post
        </button>
      </div>
      <div className="space-y-3">
        {journal.map((j) => (
          <div
            key={j.id}
            className="flex items-center justify-between rounded-xl border border-white/10 bg-charcoal/40 p-4 transition hover:border-white/20"
          >
            <div className="flex items-center gap-4">
              <img src={j.image} alt={j.title} className="h-12 w-12 rounded-sm object-cover" />
              <div>
                <p className="text-warm-white">{j.title}</p>
                <p className="text-xs text-chrome">
                  {j.category} · {j.date}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setEditing(j)} className="rounded-md p-2 text-chrome hover:text-gold">
                <Edit3 className="h-4 w-4" />
              </button>
              <button onClick={() => deleteJournal(j.id)} className="rounded-md p-2 text-chrome hover:text-red-400">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
      {editing && (
        <Modal title="Edit Post" onClose={() => setEditing(null)}>
          <div className="space-y-4">
            <Input label="Title" value={editing.title} onChange={(v) => setEditing({ ...editing, title: v })} />
            <Input label="Category" value={editing.category} onChange={(v) => setEditing({ ...editing, category: v })} />
            <Input label="Slug" value={editing.slug} onChange={(v) => setEditing({ ...editing, slug: v })} />
            <TextArea label="Content" value={editing.content} onChange={(v) => setEditing({ ...editing, content: v })} rows={6} />
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={() => setEditing(null)}
              className="rounded-full border border-white/10 px-5 py-2 text-xs uppercase tracking-widest text-warm-white transition hover:border-gold/40"
            >
              Cancel
            </button>
            <button
              onClick={() => save(editing)}
              className="rounded-full bg-gold px-5 py-2 text-xs font-semibold uppercase tracking-widest text-obsidian"
            >
              Save Post
            </button>
          </div>
        </Modal>
      )}
    </SectionReveal>
  );
}

function AnalyticsTab() {
  const { orders, products } = useAdminStore();
  const revenueData = [
    { name: "Jan", value: 0 },
    { name: "Feb", value: orders.reduce((s, o) => s + o.total, 0) },
  ];
  const categoryData = useMemo(() => {
    const map: Record<string, number> = {};
    products.forEach((p) => (map[p.collection] = (map[p.collection] || 0) + 1));
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [products]);

  return (
    <SectionReveal>
      <h2 className="font-display text-3xl text-warm-white">Analytics</h2>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <ChartCard title="Revenue Trend">
          <LineChart data={revenueData}>
            <CartesianGrid stroke="#ffffff10" />
            <XAxis dataKey="name" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip contentStyle={{ backgroundColor: "#111", borderColor: "#333" }} />
            <Line type="monotone" dataKey="value" stroke="#c5a059" strokeWidth={2} />
          </LineChart>
        </ChartCard>
        <ChartCard title="Products by Collection">
          <PieChart>
            <Pie data={categoryData} dataKey="value" nameKey="name" outerRadius={90}>
              {categoryData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ backgroundColor: "#111", borderColor: "#333" }} />
          </PieChart>
        </ChartCard>
      </div>
    </SectionReveal>
  );
}

function FilmsTab() {
  const { films } = useAdminStore();
  return (
    <SectionReveal>
      <h2 className="font-display text-3xl text-warm-white">Films</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {films.map((f) => (
          <div key={f.id} className="rounded-2xl border border-white/10 bg-charcoal/40 p-4">
            <img src={f.thumbnail} alt={f.title} className="mb-3 aspect-video rounded-sm object-cover" />
            <p className="text-warm-white">{f.title}</p>
            <p className="text-xs text-chrome">
              {f.category} · {f.duration}
            </p>
          </div>
        ))}
      </div>
    </SectionReveal>
  );
}

function CoursesTab() {
  const { courses } = useAdminStore();
  return (
    <SectionReveal>
      <h2 className="font-display text-3xl text-warm-white">Masterclass Courses</h2>
      <div className="mt-6 space-y-3">
        {courses.map((c) => (
          <div
            key={c.id}
            className="flex items-center justify-between rounded-xl border border-white/10 bg-charcoal/40 p-4"
          >
            <div className="flex items-center gap-4">
              <img src={c.thumbnail} alt={c.title} className="h-14 w-14 rounded-sm object-cover" />
              <div>
                <p className="text-warm-white">{c.title}</p>
                <p className="text-xs text-chrome">
                  {c.instructor} · {c.lessons} lessons · {c.duration}
                </p>
              </div>
            </div>
            <span className="text-sm text-gold">{formatNaira(c.price)}</span>
          </div>
        ))}
      </div>
    </SectionReveal>
  );
}

function SettingsTab() {
  const channels = [
    { id: "email", label: "Email Automations", icon: Mail },
    { id: "sms", label: "SMS Notifications", icon: Smartphone },
    { id: "whatsapp", label: "WhatsApp Updates", icon: MessageSquare },
    { id: "push", label: "Push Notifications", icon: Bell },
  ];
  const triggers = [
    "Abandoned commission recovery",
    "Payment reminders",
    "Production stage updates",
    "Shipping confirmation",
    "Review requests",
    "Welcome sequence",
  ];

  return (
    <SectionReveal>
      <h2 className="font-display text-3xl text-warm-white">Automation & Settings</h2>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-charcoal/40 p-6">
          <h3 className="mb-4 text-sm uppercase tracking-widest text-gold">Channels</h3>
          <div className="space-y-3">
            {channels.map((c) => (
              <label
                key={c.id}
                className="flex items-center justify-between rounded-lg border border-white/5 bg-obsidian/50 p-4"
              >
                <div className="flex items-center gap-3">
                  <c.icon className="h-5 w-5 text-chrome" />
                  <span className="text-warm-white">{c.label}</span>
                </div>
                <input type="checkbox" defaultChecked className="accent-gold" />
              </label>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-charcoal/40 p-6">
          <h3 className="mb-4 text-sm uppercase tracking-widest text-gold">Active Triggers</h3>
          <div className="space-y-3">
            {triggers.map((t) => (
              <label
                key={t}
                className="flex items-center justify-between rounded-lg border border-white/5 bg-obsidian/50 p-4"
              >
                <span className="text-warm-white">{t}</span>
                <input type="checkbox" defaultChecked className="accent-gold" />
              </label>
            ))}
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}

// ---------------- Shared UI Components ----------------

function DataTable({
  columns,
  rows,
  actions,
}: {
  columns: React.ReactNode[];
  rows: React.ReactNode[][];
  actions?: React.ReactNode[];
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-white/10 bg-charcoal/50 text-xs uppercase tracking-widest text-chrome">
          <tr>
            {columns.map((c, i) => (
              <th key={i} className="p-4">
                {c}
              </th>
            ))}
            {actions && <th className="p-4 text-right">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-white/5 transition hover:bg-white/5">
              {row.map((cell, j) => (
                <td key={j} className="p-4 text-chrome">
                  {cell}
                </td>
              ))}
              {actions && <td className="p-4 text-right">{actions[i]}</td>}
            </tr>
          ))}
        </tbody>
      </table>
      {rows.length === 0 && <p className="p-6 text-center text-sm text-chrome">No records found.</p>}
    </div>
  );
}

function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-obsidian/90 p-6 backdrop-blur-xl"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-charcoal p-6"
      >
        <div className="mb-6 flex items-center justify-between">
          <h3 className="font-display text-xl text-warm-white">{title}</h3>
          <button onClick={onClose} className="text-chrome hover:text-warm-white">
            <X className="h-5 w-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
  className = "",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="mb-2 block text-[10px] uppercase tracking-widest text-chrome">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-white/10 bg-obsidian px-3 py-2 text-warm-white placeholder:text-white/30 focus:border-gold/40 focus:outline-none"
      />
    </div>
  );
}

function TextArea({
  label,
  value,
  onChange,
  rows = 3,
  className = "",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="mb-2 block text-[10px] uppercase tracking-widest text-chrome">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="w-full rounded-md border border-white/10 bg-obsidian px-3 py-2 text-warm-white placeholder:text-white/30 focus:border-gold/40 focus:outline-none"
      />
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const color =
    status === "Paid" || status === "Shipped" || status === "Delivered"
      ? "bg-green-500/10 text-green-400"
      : status === "In Production"
      ? "bg-gold/10 text-gold"
      : "bg-orange-400/10 text-orange-400";
  return (
    <span className={cn("rounded-full px-2 py-1 text-[10px] uppercase tracking-widest", color)}>
      {status}
    </span>
  );
}

function SegmentBadge({ segment }: { segment: string }) {
  const color =
    segment === "vip"
      ? "bg-gold/10 text-gold"
      : segment === "lead"
      ? "bg-blue-500/10 text-blue-400"
      : "bg-white/5 text-chrome";
  return (
    <span className={cn("rounded-full px-2 py-1 text-[10px] uppercase tracking-widest", color)}>
      {segment}
    </span>
  );
}

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-charcoal/40 p-6">
      <p className="mb-4 text-xs uppercase tracking-widest text-chrome">{title}</p>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          {children as React.ReactElement}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
