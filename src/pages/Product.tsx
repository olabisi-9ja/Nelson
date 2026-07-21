import { useState, useRef, useMemo } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  RotateCw,
  Play,
  Ruler,
  Heart,
  Share2,
  Sparkles,
  ChevronRight,
  Star,
} from "lucide-react";
import { SectionReveal } from "@/components/SectionReveal";
import { ProductCard } from "@/components/ProductCard";
import { TrustBadges } from "@/components/TrustBadges";
import { products } from "@/data/mock";
import { formatNaira } from "@/data/mock";
import { useCart } from "@/hooks/useCart";

const leathers = [
  { id: "boxcalf", name: "Box Calf", color: "#1a1a1a" },
  { id: "suede", name: "Suede", color: "#4a3b2a" },
  { id: "patent", name: "Patent", color: "#050505" },
  { id: "kudu", name: "Kudu", color: "#6b4423" },
];

const colors: Record<string, string> = {
  black: "#0a0a0a",
  espresso: "#2a1d15",
  burgundy: "#4a1a1a",
  navy: "#151d2a",
};

const soles: Record<string, string> = {
  leather: "#3d2b1f",
  rubber: "#1a1a1a",
  dainite: "#0f0f0f",
};

const lacesColors: Record<string, string> = {
  black: "#0a0a0a",
  brown: "#4a2c17",
  waxed: "#2a1d15",
};

const threadColors: Record<string, string> = {
  gold: "#c5a059",
  brown: "#4a2c17",
  black: "#0a0a0a",
};

export function Product() {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.slug === id);
  if (!product) return <Navigate to="/collections" replace />;

  const [activeTab, setActiveTab] = useState<"360" | "video" | "details">("360");
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const startRot = useRef(0);

  const [config, setConfig] = useState({
    leather: "boxcalf",
    color: "black",
    toe: "chisel",
    laces: "black",
    sole: "leather",
    edge: "dark",
    thread: "gold",
    hardware: "gold",
    initials: "",
    packaging: "wooden",
  });

  const [sizeOpen, setSizeOpen] = useState(false);
  const [leatherOpen, setLeatherOpen] = useState(false);

  const { add } = useCart();

  const upperColor = colors[config.color];
  const soleColor = soles[config.sole];
  const laceColor = lacesColors[config.laces];
  const threadColor = threadColors[config.thread];
  const edgeColor = config.edge === "dark" ? "#1a0f0a" : config.edge === "antique" ? "#4a2c17" : "#8a6a4b";

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    startX.current = clientX;
    startRot.current = rotation;
  };
  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const delta = clientX - startX.current;
    setRotation(startRot.current + delta * 0.3);
  };
  const handleDragEnd = () => setIsDragging(false);

  const related = useMemo(
    () => products.filter((p) => p.collection === product.collection && p.id !== product.id).slice(0, 2),
    [product]
  );

  const averageRating = useMemo(() => {
    if (!product.reviews.length) return 0;
    return product.reviews.reduce((a, r) => a + r.rating, 0) / product.reviews.length;
  }, [product]);

  return (
    <div className="pt-32">
      <section className="mx-auto max-w-7xl px-6 pb-12">
        <Link
          to={`/collections/${product.collection.toLowerCase().replace(/ /g, "-")}`}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-cream/70 transition hover:text-gold"
        >
          <ArrowLeft className="h-4 w-4" /> {product.collection}
        </Link>
      </section>

      <section className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Viewer */}
          <SectionReveal>
            <div className="sticky top-32">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex gap-2">
                  {(["360", "video", "details"] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setActiveTab(t)}
                      className={`rounded-full px-4 py-2 text-xs uppercase tracking-widest transition ${
                        activeTab === t
                          ? "bg-gold text-obsidian"
                          : "border border-white/10 text-cream/70 hover:border-gold/40"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-cream/70 transition hover:text-gold">
                    <Heart className="h-4 w-4" />
                  </button>
                  <button className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-cream/70 transition hover:text-gold">
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div
                className="relative flex aspect-square items-center justify-center overflow-hidden rounded-sm bg-charcoal"
                onMouseDown={handleDragStart}
                onMouseMove={handleDragMove}
                onMouseUp={handleDragEnd}
                onMouseLeave={handleDragEnd}
                onTouchStart={handleDragStart}
                onTouchMove={handleDragMove}
                onTouchEnd={handleDragEnd}
                style={{ cursor: isDragging ? "grabbing" : "grab" }}
              >
                {activeTab === "360" && (
                  <div
                    className="relative h-4/5 w-4/5 transition-transform duration-100"
                    style={{
                      transform: `perspective(1000px) rotateY(${rotation}deg)`,
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-contain drop-shadow-2xl"
                    />
                    <div className="pointer-events-none absolute inset-0 flex items-end justify-center pb-6">
                      <span className="rounded-full bg-obsidian/60 px-3 py-1 text-[10px] uppercase tracking-widest text-cream/80 backdrop-blur">
                        Drag to rotate
                      </span>
                    </div>
                  </div>
                )}
                {activeTab === "video" && (
                  <div className="flex flex-col items-center gap-4">
                    <Play className="h-16 w-16 text-gold" />
                    <p className="text-sm uppercase tracking-widest text-cream/70">Cinematic film</p>
                  </div>
                )}
                {activeTab === "details" && (
                  <div className="max-w-sm p-8">
                    <h3 className="font-display text-2xl text-warm-white">Specifications</h3>
                    <dl className="mt-6 space-y-3 text-sm">
                      {Object.entries(product.specifications).map(([k, v]) => (
                        <div key={k} className="flex justify-between border-b border-white/10 pb-2">
                          <dt className="text-chrome">{k}</dt>
                          <dd className="text-warm-white">{v}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs text-chrome">
                <RotateCw className="h-4 w-4" />
                <span>360° viewer · Drag horizontally</span>
              </div>
            </div>
          </SectionReveal>

          {/* Product Info & Customizer */}
          <SectionReveal delay={0.1}>
            <div className="space-y-8">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-gold">{product.collection}</p>
                <h1 className="mt-2 font-display text-4xl text-warm-white md:text-5xl">
                  {product.name}
                </h1>
                <div className="mt-3 flex flex-wrap items-center gap-4">
                  <span className="text-2xl text-cream">{formatNaira(product.price)}</span>
                  <span className="rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-[10px] uppercase tracking-widest text-gold">
                    Made to Order
                  </span>
                  {averageRating > 0 && (
                    <div className="flex items-center gap-1 text-xs text-gold">
                      <Star className="h-4 w-4 fill-current" />
                      {averageRating.toFixed(1)} ({product.reviews.length})
                    </div>
                  )}
                </div>
                <p className="mt-5 leading-relaxed text-chrome">{product.description}</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-charcoal/40 p-6 md:p-8">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-display text-xl text-warm-white">Bespoke Configurator</h3>
                  <span className="text-[10px] uppercase tracking-widest text-gold">Live Preview</span>
                </div>
                <div className="mb-6 flex justify-center">
                  <svg viewBox="0 0 320 160" className="w-full max-w-xs overflow-visible">
                    <defs>
                      <linearGradient id="patent" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#333" />
                        <stop offset="50%" stopColor="#000" />
                        <stop offset="100%" stopColor="#111" />
                      </linearGradient>
                    </defs>
                    {/* Sole */}
                    <path
                      d="M40 115 Q50 130 80 130 L240 130 Q280 130 295 115 L290 105 Q260 112 80 112 Q55 112 40 105 Z"
                      fill={soleColor}
                    />
                    {/* Heel */}
                    <path d="M40 105 L40 125 Q55 132 80 130 L80 112 Q55 112 40 105" fill={edgeColor} />
                    {/* Upper body */}
                    <path
                      d={
                        config.toe === "chisel"
                          ? "M75 112 Q60 60 110 45 L170 42 Q230 40 290 75 L295 105 Q260 112 75 112"
                          : config.toe === "round"
                          ? "M75 112 Q60 65 110 48 L170 45 Q220 45 285 82 L290 105 Q260 112 75 112"
                          : "M75 112 Q60 62 110 46 L170 43 Q225 42 288 78 L293 105 Q260 112 75 112"
                      }
                      fill={config.leather === "patent" ? "url(#patent)" : upperColor}
                      stroke={edgeColor}
                      strokeWidth="2"
                    />
                    {/* Toe cap */}
                    <path
                      d={
                        config.toe === "chisel"
                          ? "M210 112 Q215 75 280 80 L290 105 Q250 112 210 112"
                          : config.toe === "round"
                          ? "M205 112 Q208 80 275 88 L285 105 Q250 112 205 112"
                          : "M208 112 Q212 77 282 82 L290 105 Q250 112 208 112"
                      }
                      fill={upperColor}
                      fillOpacity="0.85"
                      stroke={edgeColor}
                      strokeWidth="1.5"
                    />
                    {/* Laces */}
                    {[0, 1, 2, 3].map((i) => (
                      <line
                        key={i}
                        x1={130 + i * 18}
                        y1={46 + i * 7}
                        x2={145 + i * 18}
                        y2={55 + i * 7}
                        stroke={laceColor}
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                    ))}
                    {/* Stitching */}
                    <path
                      d="M85 105 Q80 60 115 50"
                      fill="none"
                      stroke={threadColor}
                      strokeWidth="1"
                      strokeDasharray="3 2"
                    />
                    {/* Initials */}
                    {config.initials && (
                      <text
                        x="250"
                        y="100"
                        fill={config.hardware === "gold" ? "#c5a059" : "#a8b0bc"}
                        fontSize="8"
                        fontFamily="serif"
                        letterSpacing="1"
                      >
                        {config.initials.toUpperCase()}
                      </text>
                    )}
                  </svg>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-[10px] uppercase tracking-widest text-chrome">Color</label>
                    <div className="flex flex-wrap gap-2">
                      {Object.keys(colors).map((c) => (
                        <button
                          key={c}
                          onClick={() => setConfig({ ...config, color: c })}
                          className={`h-8 w-8 rounded-full border-2 ${
                            config.color === c ? "border-gold" : "border-transparent"
                          }`}
                          style={{ backgroundColor: colors[c] }}
                          title={c}
                        />
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 block text-[10px] uppercase tracking-widest text-chrome">Leather</label>
                    <select
                      value={config.leather}
                      onChange={(e) => setConfig({ ...config, leather: e.target.value })}
                      className="w-full rounded-md border border-white/10 bg-obsidian px-3 py-2 text-sm text-warm-white focus:border-gold/40 focus:outline-none"
                    >
                      {leathers.map((l) => (
                        <option key={l.id} value={l.id}>
                          {l.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-[10px] uppercase tracking-widest text-chrome">Toe Shape</label>
                    <select
                      value={config.toe}
                      onChange={(e) => setConfig({ ...config, toe: e.target.value })}
                      className="w-full rounded-md border border-white/10 bg-obsidian px-3 py-2 text-sm text-warm-white focus:border-gold/40 focus:outline-none"
                    >
                      <option value="chisel">Chisel</option>
                      <option value="softsquare">Soft Square</option>
                      <option value="round">Round</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-[10px] uppercase tracking-widest text-chrome">Sole</label>
                    <select
                      value={config.sole}
                      onChange={(e) => setConfig({ ...config, sole: e.target.value })}
                      className="w-full rounded-md border border-white/10 bg-obsidian px-3 py-2 text-sm text-warm-white focus:border-gold/40 focus:outline-none"
                    >
                      <option value="leather">Leather</option>
                      <option value="rubber">Rubber</option>
                      <option value="dainite">Dainite</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-[10px] uppercase tracking-widest text-chrome">Laces</label>
                    <select
                      value={config.laces}
                      onChange={(e) => setConfig({ ...config, laces: e.target.value })}
                      className="w-full rounded-md border border-white/10 bg-obsidian px-3 py-2 text-sm text-warm-white focus:border-gold/40 focus:outline-none"
                    >
                      {Object.keys(lacesColors).map((l) => (
                        <option key={l} value={l}>
                          {l[0].toUpperCase() + l.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-[10px] uppercase tracking-widest text-chrome">Edge Finish</label>
                    <select
                      value={config.edge}
                      onChange={(e) => setConfig({ ...config, edge: e.target.value })}
                      className="w-full rounded-md border border-white/10 bg-obsidian px-3 py-2 text-sm text-warm-white focus:border-gold/40 focus:outline-none"
                    >
                      <option value="dark">Dark</option>
                      <option value="antique">Antique</option>
                      <option value="natural">Natural</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-[10px] uppercase tracking-widest text-chrome">Thread</label>
                    <select
                      value={config.thread}
                      onChange={(e) => setConfig({ ...config, thread: e.target.value })}
                      className="w-full rounded-md border border-white/10 bg-obsidian px-3 py-2 text-sm text-warm-white focus:border-gold/40 focus:outline-none"
                    >
                      {Object.keys(threadColors).map((t) => (
                        <option key={t} value={t}>
                          {t[0].toUpperCase() + t.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-[10px] uppercase tracking-widest text-chrome">Hardware</label>
                    <select
                      value={config.hardware}
                      onChange={(e) => setConfig({ ...config, hardware: e.target.value })}
                      className="w-full rounded-md border border-white/10 bg-obsidian px-3 py-2 text-sm text-warm-white focus:border-gold/40 focus:outline-none"
                    >
                      <option value="gold">Gold</option>
                      <option value="silver">Silver</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-[10px] uppercase tracking-widest text-chrome">Initials</label>
                    <input
                      maxLength={3}
                      value={config.initials}
                      onChange={(e) => setConfig({ ...config, initials: e.target.value })}
                      className="w-full rounded-md border border-white/10 bg-obsidian px-3 py-2 text-sm text-warm-white placeholder:text-white/30 focus:border-gold/40 focus:outline-none"
                      placeholder="ABC"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-[10px] uppercase tracking-widest text-chrome">Packaging</label>
                    <select
                      value={config.packaging}
                      onChange={(e) => setConfig({ ...config, packaging: e.target.value })}
                      className="w-full rounded-md border border-white/10 bg-obsidian px-3 py-2 text-sm text-warm-white focus:border-gold/40 focus:outline-none"
                    >
                      <option value="standard">Standard Box</option>
                      <option value="wooden">Wooden Presentation Box</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={() => add(product, config)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full bg-gold py-4 text-sm font-semibold uppercase tracking-widest text-obsidian transition hover:bg-gold-light"
                >
                  Add to Bag — {formatNaira(product.price)}
                </button>
                <Link
                  to="/order"
                  state={{ product, config }}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full border border-white/10 py-4 text-sm uppercase tracking-widest text-warm-white transition hover:border-gold/40 hover:text-gold"
                >
                  Order Now
                </Link>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setSizeOpen(true)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full border border-white/10 py-3 text-xs uppercase tracking-widest text-warm-white transition hover:border-gold/40 hover:text-gold"
                >
                  <Ruler className="h-4 w-4" /> AI Size
                </button>
                <button
                  onClick={() => setLeatherOpen(true)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full border border-white/10 py-3 text-xs uppercase tracking-widest text-warm-white transition hover:border-gold/40 hover:text-gold"
                >
                  <Sparkles className="h-4 w-4" /> AI Leather
                </button>
              </div>
              <TrustBadges className="mt-6" />
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Craft Story */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-12 lg:grid-cols-2">
          <SectionReveal>
            <img
              src="/images/craft-hands.jpg"
              alt="Craft"
              className="rounded-sm object-cover"
            />
          </SectionReveal>
          <SectionReveal delay={0.1} className="flex flex-col justify-center">
            <p className="text-xs uppercase tracking-[0.25em] text-gold">Craft Story</p>
            <h2 className="mt-3 font-display text-3xl text-warm-white md:text-4xl">
              Built by Hand, Not by Machine
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-chrome">{product.craftStory}</p>
            <ul className="mt-8 space-y-4">
              {product.construction.map((c, i) => (
                <li key={i} className="flex items-start gap-3 text-cream/80">
                  <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-gold" />
                  {c}
                </li>
              ))}
            </ul>
          </SectionReveal>
        </div>
      </section>

      {/* Materials & Reviews */}
      <section className="border-t border-white/10 bg-charcoal/30 py-24">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2">
          <SectionReveal>
            <h3 className="font-display text-3xl text-warm-white">Materials</h3>
            <ul className="mt-6 space-y-3">
              {product.materials.map((m, i) => (
                <li key={i} className="border-b border-white/10 pb-3 text-chrome">
                  {m}
                </li>
              ))}
            </ul>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <h3 className="font-display text-3xl text-warm-white">Reviews</h3>
            <div className="mt-6 space-y-6">
              {product.reviews.length ? (
                product.reviews.map((r) => (
                  <div key={r.id} className="rounded-xl border border-white/10 bg-obsidian p-5">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-warm-white">{r.author}</span>
                      <div className="flex text-gold">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${i < r.rating ? "fill-current" : ""}`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-chrome">{r.text}</p>
                    <p className="mt-2 text-xs text-chrome/60">{r.date}</p>
                  </div>
                ))
              ) : (
                <p className="text-chrome">No reviews yet.</p>
              )}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Recommendations */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <SectionReveal className="mb-12">
          <h2 className="font-display text-3xl text-warm-white">You May Also Consider</h2>
        </SectionReveal>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
          {related.length === 0 &&
            products
              .filter((p) => p.id !== product.id)
              .slice(0, 2)
              .map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* AI Modals */}
      {sizeOpen && (
        <AIRecommendationModal
          title="AI Size Recommendation"
          onClose={() => setSizeOpen(false)}
        >
          <p className="text-chrome">
            Enter your usual size and width for a bespoke recommendation.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <input
              placeholder="Usual size (EU/UK)"
              className="rounded-md border border-white/10 bg-obsidian px-3 py-2 text-sm text-warm-white focus:border-gold/40 focus:outline-none"
            />
            <select className="rounded-md border border-white/10 bg-obsidian px-3 py-2 text-sm text-warm-white focus:border-gold/40 focus:outline-none">
              <option>Standard width</option>
              <option>Wide</option>
              <option>Narrow</option>
            </select>
          </div>
          <button
            onClick={() => setSizeOpen(false)}
            className="mt-4 w-full rounded-md bg-gold py-2 text-sm font-semibold text-obsidian transition hover:bg-gold-light"
          >
            Get Recommendation
          </button>
        </AIRecommendationModal>
      )}
      {leatherOpen && (
        <AIRecommendationModal
          title="AI Leather Recommendation"
          onClose={() => setLeatherOpen(false)}
        >
          <p className="text-chrome">
            Select how you will wear your shoes and we will recommend the ideal leather.
          </p>
          <div className="mt-4 space-y-2">
            {["Daily office wear", "Formal events", "Weekend leisure", "Travel & outdoor"].map((o) => (
              <label key={o} className="flex items-center gap-3 rounded-md border border-white/10 bg-obsidian px-3 py-2 text-sm text-cream">
                <input type="radio" name="occasion" className="accent-gold" />
                {o}
              </label>
            ))}
          </div>
          <button
            onClick={() => setLeatherOpen(false)}
            className="mt-4 w-full rounded-md bg-gold py-2 text-sm font-semibold text-obsidian transition hover:bg-gold-light"
          >
            Recommend Leather
          </button>
        </AIRecommendationModal>
      )}
    </div>
  );
}

function AIRecommendationModal({
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
      className="fixed inset-0 z-[60] flex items-center justify-center bg-obsidian/90 p-6 backdrop-blur-xl"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-2xl border border-white/10 bg-charcoal p-6"
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-xl text-warm-white">{title}</h3>
          <button onClick={onClose} className="text-chrome hover:text-warm-white">
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
