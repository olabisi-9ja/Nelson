import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Check, Upload, Calendar, CreditCard, ArrowRight, ArrowLeft, Scan } from "lucide-react";
import { SectionReveal } from "@/components/SectionReveal";
import { Stepper } from "@/components/Stepper";
import { collections, products, formatNaira } from "@/data/mock";
import { cn } from "@/utils/cn";

const steps = [
  "Collection",
  "Style",
  "Measurements",
  "Foot Scan",
  "Customization",
  "References",
  "Timeline",
  "Deposit",
  "Confirm",
];

export function Commission() {
  const location = useLocation();
  const navigate = useNavigate();
  const passedProduct = (location.state as { product?: typeof products[0]; config?: Record<string, string> } | null)?.product;
  const passedConfig = (location.state as { config?: Record<string, string> } | null)?.config;

  const [step, setStep] = useState(0);
  const [collection, setCollection] = useState(passedProduct?.collection || "");
  const [style, setStyle] = useState(passedProduct?.name || "");
  const [measurements, setMeasurements] = useState({ leftLength: "", rightLength: "", width: "" });
  const [customization, setCustomization] = useState<Record<string, string>>(passedConfig || {});
  const [timeline, setTimeline] = useState("standard");
  const [deposit, setDeposit] = useState("50");
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  const selectedProduct = products.find((p) => p.name === style);
  const total = selectedProduct?.price || 125000;
  const depositAmount = Math.round(total * (parseInt(deposit, 10) / 100));

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const submit = () => {
    setConfirmed(true);
    setTimeout(() => navigate("/dashboard"), 2500);
  };

  return (
    <div className="pt-32">
      <section className="mx-auto max-w-5xl px-6 pb-12">
        <SectionReveal>
          <p className="text-xs uppercase tracking-[0.25em] text-gold">Commission Experience</p>
          <h1 className="mt-4 font-display text-4xl text-warm-white md:text-6xl">
            Begin Your Commission
          </h1>
        </SectionReveal>
      </section>

      <section className="sticky top-20 z-30 border-y border-white/10 bg-obsidian/95 py-6 backdrop-blur-md">
        <div className="mx-auto max-w-5xl px-6">
          <Stepper steps={steps} current={step} />
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <SectionReveal>
          <div className="rounded-2xl border border-white/10 bg-charcoal/40 p-6 md:p-10">
            {step === 0 && (
              <div className="space-y-6">
                <h2 className="font-display text-2xl text-warm-white">Choose a Collection</h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {collections.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setCollection(c.name)}
                      className={cn(
                        "relative overflow-hidden rounded-lg border p-4 text-left transition",
                        collection === c.name
                          ? "border-gold bg-gold/10"
                          : "border-white/10 hover:border-white/20"
                      )}
                    >
                      <img
                        src={c.image}
                        alt={c.name}
                        className="mb-3 aspect-[4/3] w-full rounded-sm object-cover opacity-80"
                      />
                      <p className="font-display text-lg text-warm-white">{c.name}</p>
                      <p className="text-xs text-chrome">{c.subtitle}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-6">
                <h2 className="font-display text-2xl text-warm-white">Choose a Style</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {products
                    .filter((p) => !collection || p.collection === collection)
                    .map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setStyle(p.name)}
                        className={cn(
                          "flex items-center gap-4 rounded-lg border p-4 text-left transition",
                          style === p.name
                            ? "border-gold bg-gold/10"
                            : "border-white/10 hover:border-white/20"
                        )}
                      >
                        <img src={p.image} alt={p.name} className="h-20 w-20 rounded-sm object-cover" />
                        <div>
                          <p className="font-display text-lg text-warm-white">{p.name}</p>
                          <p className="text-sm text-chrome">{formatNaira(p.price)}</p>
                        </div>
                      </button>
                    ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h2 className="font-display text-2xl text-warm-white">Measurements</h2>
                <p className="text-chrome">
                  Enter your foot measurements in centimeters. A foot scan is recommended for the
                  perfect fit.
                </p>
                <div className="grid gap-4 sm:grid-cols-3">
                  {[
                    { label: "Left Length", key: "leftLength" },
                    { label: "Right Length", key: "rightLength" },
                    { label: "Width", key: "width" },
                  ].map((f) => (
                    <div key={f.key}>
                      <label className="mb-2 block text-[10px] uppercase tracking-widest text-chrome">
                        {f.label} (cm)
                      </label>
                      <input
                        type="number"
                        value={measurements[f.key as keyof typeof measurements]}
                        onChange={(e) =>
                          setMeasurements({ ...measurements, [f.key]: e.target.value })
                        }
                        className="w-full rounded-md border border-white/10 bg-obsidian px-3 py-2 text-warm-white focus:border-gold/40 focus:outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 text-center">
                <Scan className="mx-auto h-16 w-16 text-gold" />
                <h2 className="font-display text-2xl text-warm-white">Foot Scan</h2>
                <p className="mx-auto max-w-lg text-chrome">
                  Book an in-person appointment at our Lagos atelier for a 3D foot scan, or upload a
                  scan from a certified provider.
                </p>
                <button className="inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-3 text-sm uppercase tracking-widest text-warm-white transition hover:border-gold/40">
                  <Upload className="h-4 w-4" /> Upload Scan
                </button>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <h2 className="font-display text-2xl text-warm-white">Customization</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    { label: "Leather", key: "leather" },
                    { label: "Color", key: "color" },
                    { label: "Toe Shape", key: "toe" },
                    { label: "Laces", key: "laces" },
                    { label: "Sole", key: "sole" },
                    { label: "Edge Finish", key: "edge" },
                    { label: "Thread Color", key: "thread" },
                    { label: "Hardware", key: "hardware" },
                    { label: "Initials", key: "initials" },
                    { label: "Packaging", key: "packaging" },
                  ].map((opt) => (
                    <div key={opt.key}>
                      <label className="mb-2 block text-[10px] uppercase tracking-widest text-chrome">
                        {opt.label}
                      </label>
                      <input
                        value={customization[opt.key] || ""}
                        onChange={(e) =>
                          setCustomization({ ...customization, [opt.key]: e.target.value })
                        }
                        className="w-full rounded-md border border-white/10 bg-obsidian px-3 py-2 text-warm-white focus:border-gold/40 focus:outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="space-y-6 text-center">
                <Upload className="mx-auto h-16 w-16 text-gold" />
                <h2 className="font-display text-2xl text-warm-white">Upload References</h2>
                <p className="mx-auto max-w-lg text-chrome">
                  Share inspiration images, sketches, or notes that help us understand your vision.
                </p>
                <div className="mx-auto flex h-40 max-w-lg items-center justify-center rounded-xl border-2 border-dashed border-white/10 bg-obsidian">
                  <span className="text-sm text-chrome">Drag files here or click to browse</span>
                </div>
              </div>
            )}

            {step === 6 && (
              <div className="space-y-6">
                <h2 className="font-display text-2xl text-warm-white">Select Timeline</h2>
                <div className="grid gap-4 sm:grid-cols-3">
                  {[
                    { id: "standard", label: "Standard", time: "6 weeks", fee: 0 },
                    { id: "priority", label: "Priority", time: "4 weeks", fee: 25000 },
                    { id: "rush", label: "Rush", time: "2 weeks", fee: 60000 },
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTimeline(t.id)}
                      className={cn(
                        "rounded-lg border p-6 text-left transition",
                        timeline === t.id
                          ? "border-gold bg-gold/10"
                          : "border-white/10 hover:border-white/20"
                      )}
                    >
                      <Calendar className="mb-3 h-6 w-6 text-gold" />
                      <p className="font-display text-lg text-warm-white">{t.label}</p>
                      <p className="text-sm text-chrome">{t.time}</p>
                      {t.fee > 0 && <p className="mt-2 text-xs text-gold">+{formatNaira(t.fee)}</p>}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 7 && (
              <div className="space-y-6">
                <h2 className="font-display text-2xl text-warm-white">Deposit</h2>
                <p className="text-chrome">
                  Total commission value: <span className="text-warm-white">{formatNaira(total)}</span>
                </p>
                <div className="space-y-3">
                  {[
                    { id: "50", label: "50% Deposit" },
                    { id: "100", label: "Full Payment" },
                  ].map((d) => (
                    <label
                      key={d.id}
                      className={cn(
                        "flex cursor-pointer items-center justify-between rounded-lg border p-4 transition",
                        deposit === d.id
                          ? "border-gold bg-gold/10"
                          : "border-white/10 hover:border-white/20"
                      )}
                    >
                      <span className="flex items-center gap-3 text-warm-white">
                        <input
                          type="radio"
                          name="deposit"
                          value={d.id}
                          checked={deposit === d.id}
                          onChange={(e) => setDeposit(e.target.value)}
                          className="accent-gold"
                        />
                        {d.label}
                      </span>
                      <CreditCard className="h-5 w-5 text-chrome" />
                    </label>
                  ))}
                </div>
                <p className="text-lg text-gold">Amount due now: {formatNaira(depositAmount)}</p>
              </div>
            )}

            {step === 8 && (
              <div className="space-y-6 text-center">
                {confirmed ? (
                  <>
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gold text-obsidian">
                      <Check className="h-10 w-10" />
                    </div>
                    <h2 className="font-display text-3xl text-warm-white">Commission Confirmed</h2>
                    <p className="text-chrome">Redirecting to your dashboard...</p>
                  </>
                ) : (
                  <>
                    <h2 className="font-display text-2xl text-warm-white">Review & Confirm</h2>
                    <div className="mx-auto max-w-md rounded-xl border border-white/10 bg-obsidian p-6 text-left text-sm">
                      <div className="flex justify-between py-2">
                        <span className="text-chrome">Style</span>
                        <span className="text-warm-white">{style || "Not selected"}</span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="text-chrome">Collection</span>
                        <span className="text-warm-white">{collection || "Not selected"}</span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="text-chrome">Timeline</span>
                        <span className="text-warm-white capitalize">{timeline}</span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="text-chrome">Total</span>
                        <span className="text-warm-white">{formatNaira(total)}</span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="text-chrome">Deposit</span>
                        <span className="text-gold">{formatNaira(depositAmount)}</span>
                      </div>
                    </div>
                    <button
                      onClick={submit}
                      className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold px-10 py-4 text-sm font-semibold uppercase tracking-widest text-obsidian transition hover:bg-gold-light"
                    >
                      Confirm & Pay Deposit <ArrowRight className="h-4 w-4" />
                    </button>
                  </>
                )}
              </div>
            )}

            <div className="mt-10 flex justify-between">
              <button
                onClick={prev}
                disabled={step === 0}
                className="flex items-center gap-2 rounded-full border border-white/10 px-6 py-3 text-sm uppercase tracking-widest text-warm-white transition hover:border-gold/40 disabled:opacity-30"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
              {step < steps.length - 1 && (
                <button
                  onClick={next}
                  className="flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-widest text-obsidian transition hover:bg-gold-light"
                >
                  Next <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </SectionReveal>
      </section>
    </div>
  );
}
