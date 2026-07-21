import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionReveal } from "@/components/SectionReveal";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "How long does a custom order take?",
    a: "Standard custom orders take 4 to 6 weeks from measurement to delivery. Priority and rush timelines are available for private clients.",
  },
  {
    q: "Do you offer returns or exchanges?",
    a: "Because every pair is made to order, we do not accept returns. We offer complimentary adjustments and repairs within the first year for fit issues.",
  },
  {
    q: "How do I know my size?",
    a: "You can visit our Lagos studio for a 3D foot scan, use our AI size assistant, or follow our remote measurement guide.",
  },
  {
    q: "What materials do you use?",
    a: "We use full-grain Italian and French calf, waxed suede, exotic leathers sourced ethically, and solid brass or nickel hardware.",
  },
  {
    q: "Can I customize everything?",
    a: "Yes. Leather, color, last shape, sole, laces, edge finish, thread, hardware, initials, and packaging can all be personalized.",
  },
  {
    q: "Do you ship internationally?",
    a: "Yes. We ship worldwide via insured courier. Delivery times and duties vary by destination.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="pt-32">
      <section className="mx-auto max-w-4xl px-6 pb-16">
        <SectionReveal>
          <p className="text-xs uppercase tracking-[0.25em] text-gold">Client Care</p>
          <h1 className="mt-4 font-display text-5xl text-warm-white md:text-6xl">
            Frequently Asked Questions
          </h1>
        </SectionReveal>
      </section>
      <section className="mx-auto max-w-3xl px-6 pb-24">
        <div className="space-y-3">
          {faqs.map((f, idx) => (
            <SectionReveal key={idx} delay={idx * 0.05}>
              <button
                onClick={() => setOpen(open === idx ? null : idx)}
                className="w-full rounded-xl border border-white/10 bg-charcoal/40 p-5 text-left transition hover:border-white/20"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-lg text-warm-white">{f.q}</span>
                  {open === idx ? (
                    <Minus className="h-4 w-4 text-gold" />
                  ) : (
                    <Plus className="h-4 w-4 text-chrome" />
                  )}
                </div>
                <AnimatePresence>
                  {open === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="pt-4 text-chrome">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </SectionReveal>
          ))}
        </div>
      </section>
    </div>
  );
}
