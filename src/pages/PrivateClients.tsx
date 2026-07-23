import { SectionReveal } from "@/components/SectionReveal";
import { Crown, MessageCircle, Calendar, Gem, Truck, Shield } from "lucide-react";

const benefits = [
  { icon: Crown, title: "Dedicated Concierge", text: "A personal client manager available via WhatsApp, email, or phone." },
  { icon: Gem, title: "Exclusive Collections", text: "First access to limited editions and experimental prototypes." },
  { icon: Calendar, title: "Private Appointments", text: "After-hours studio visits and home fittings by request." },
  { icon: Truck, title: "Priority Production", text: "Jump the queue with dedicated artisan allocation." },
  { icon: MessageCircle, title: "Private Messaging", text: "Direct channel to your maker with photo and video updates." },
  { icon: Shield, title: "Lifetime Care", text: "Complimentary polishing, repairs, and recrafting consultations." },
];

export function PrivateClients() {
  return (
    <div className="pt-32">
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <SectionReveal>
          <p className="text-xs uppercase tracking-[0.25em] text-gold">Invitation Only</p>
          <h1 className="mt-4 font-display text-5xl text-warm-white md:text-7xl">
            Private Clients
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-chrome">
            A discreet concierge service for collectors, executives, and patrons who expect the
            exceptional.
          </p>
        </SectionReveal>
      </section>

      <section className="relative h-[50vh] min-h-[360px]">
        <img
          src="/images/about-workshop.webp"
          alt="Private salon"
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/70 to-transparent" />
        <div className="relative mx-auto flex h-full max-w-7xl items-center px-6">
          <SectionReveal className="max-w-xl">
            <h2 className="font-display text-3xl text-warm-white md:text-4xl">
              Welcome to the Inner Circle
            </h2>
            <p className="mt-4 text-lg text-chrome">
              Membership is by invitation or application. If you believe our world aligns with
              yours, we invite you to request an introduction.
            </p>
            <button className="mt-8 rounded-full bg-gold px-8 py-4 text-sm font-semibold uppercase tracking-widest text-obsidian transition hover:bg-gold-light">
              Request Invitation
            </button>
          </SectionReveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b, idx) => (
            <SectionReveal key={b.title} delay={idx * 0.08}>
              <div className="h-full rounded-2xl border border-white/10 bg-charcoal/30 p-8 transition hover:border-gold/30">
                <b.icon className="mb-5 h-8 w-8 text-gold" />
                <h3 className="font-display text-xl text-warm-white">{b.title}</h3>
                <p className="mt-3 text-chrome">{b.text}</p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </section>
    </div>
  );
}
