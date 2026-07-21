import { useState } from "react";
import { SectionReveal } from "@/components/SectionReveal";
import { Mail, MapPin, Phone, MessageCircle, Clock, Check } from "lucide-react";

export function Contact() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="pt-32">
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <SectionReveal>
          <p className="text-xs uppercase tracking-[0.25em] text-gold">Studio Access</p>
          <h1 className="mt-4 font-display text-5xl text-warm-white md:text-7xl">
            Contact
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-chrome">
            Book an appointment, request an invitation, or simply say hello. We reply to every
            message with care.
          </p>
        </SectionReveal>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 pb-24 lg:grid-cols-2">
        <SectionReveal>
          <div className="space-y-6">
            <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-charcoal/40 p-6">
              <MapPin className="h-6 w-6 text-gold" />
              <div>
                <h3 className="font-display text-lg text-warm-white">Visit the Studio</h3>
                <p className="mt-1 text-chrome">14 Adeola Odeku, Victoria Island, Lagos</p>
              </div>
            </div>
            <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-charcoal/40 p-6">
              <Mail className="h-6 w-6 text-gold" />
              <div>
                <h3 className="font-display text-lg text-warm-white">Email</h3>
                <p className="mt-1 text-chrome">studio@nelson.shoes</p>
              </div>
            </div>
            <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-charcoal/40 p-6">
              <Phone className="h-6 w-6 text-gold" />
              <div>
                <h3 className="font-display text-lg text-warm-white">Phone</h3>
                <p className="mt-1 text-chrome">+234 901 234 5678</p>
              </div>
            </div>
            <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-charcoal/40 p-6">
              <MessageCircle className="h-6 w-6 text-gold" />
              <div>
                <h3 className="font-display text-lg text-warm-white">WhatsApp</h3>
                <p className="mt-1 text-chrome">+234 901 234 5678</p>
              </div>
            </div>
            <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-charcoal/40 p-6">
              <Clock className="h-6 w-6 text-gold" />
              <div>
                <h3 className="font-display text-lg text-warm-white">Hours</h3>
                <p className="mt-1 text-chrome">Mon — Sat, 10:00 — 19:00 WAT</p>
              </div>
            </div>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <div className="rounded-2xl border border-white/10 bg-charcoal/40 p-6 md:p-8">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gold text-obsidian">
                  <Check className="h-8 w-8" />
                </div>
                <h3 className="font-display text-2xl text-warm-white">Message Sent</h3>
                <p className="mt-2 text-chrome">We will be in touch within 24 hours.</p>
              </div>
            ) : (
              <>
                <h3 className="font-display text-2xl text-warm-white">Send a Note</h3>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                  className="mt-6 space-y-4"
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <input
                      required
                      placeholder="Name"
                      className="rounded-md border border-white/10 bg-obsidian px-4 py-3 text-warm-white placeholder:text-white/30 focus:border-gold/40 focus:outline-none"
                    />
                    <input
                      required
                      type="email"
                      placeholder="Email"
                      className="rounded-md border border-white/10 bg-obsidian px-4 py-3 text-warm-white placeholder:text-white/30 focus:border-gold/40 focus:outline-none"
                    />
                  </div>
                  <select className="w-full rounded-md border border-white/10 bg-obsidian px-4 py-3 text-warm-white focus:border-gold/40 focus:outline-none">
                    <option>General Inquiry</option>
                    <option>Book Appointment</option>
                    <option>Private Client Inquiry</option>
                    <option>Press</option>
                  </select>
                  <textarea
                    required
                    rows={5}
                    placeholder="Your message"
                    className="w-full rounded-md border border-white/10 bg-obsidian px-4 py-3 text-warm-white placeholder:text-white/30 focus:border-gold/40 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="w-full rounded-full bg-gold py-4 text-sm font-semibold uppercase tracking-widest text-obsidian transition hover:bg-gold-light"
                  >
                    Send Message
                  </button>
                </form>
              </>
            )}
          </div>
        </SectionReveal>
      </section>
    </div>
  );
}
