import Link from "next/link";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="w-full min-h-screen bg-background text-foreground pt-32 pb-24 px-8 md:px-16">
      <div className="max-w-5xl mx-auto flex flex-col gap-24">
        
        {/* Header */}
        <header className="flex flex-col gap-4 border-b border-border/20 pb-12">
          <span className="text-primary text-xs uppercase tracking-[0.3em] font-medium">Consultation</span>
          <h1 className="text-5xl md:text-7xl font-light tracking-tighter uppercase leading-none">
            Contact the Atelier.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground font-light max-w-xl mt-4">
            Connect with our artisans for custom fitting advice, material consultations, and commission timelines.
          </p>
        </header>

        {/* Contact Info and Form */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Details */}
          <div className="flex flex-col gap-12">
            
            <div className="flex flex-col gap-4">
              <h2 className="text-xl uppercase tracking-widest font-light text-primary">Direct Channels</h2>
              
              <div className="flex flex-col gap-6 mt-4">
                <div className="flex items-center gap-4">
                  <Mail size={20} className="text-muted-foreground" />
                  <span className="text-sm font-mono text-muted-foreground">atelier@nelson.luxury</span>
                </div>
                <div className="flex items-center gap-4">
                  <Phone size={20} className="text-muted-foreground" />
                  <span className="text-sm font-mono text-muted-foreground">+234 (1) 800-ATELIER</span>
                </div>
                <div className="flex items-center gap-4">
                  <MapPin size={20} className="text-muted-foreground" />
                  <span className="text-sm font-mono text-muted-foreground">12 Ikoyi Road, Lagos, Nigeria</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 border-t border-border/10 pt-8">
              <h2 className="text-xl uppercase tracking-widest font-light text-primary flex items-center gap-2">
                <Clock size={18} /> Atelier Hours
              </h2>
              <p className="text-muted-foreground text-sm font-light leading-relaxed mt-2">
                Monday &ndash; Friday: 09:00 &ndash; 18:00 WAT <br />
                Saturday (By Appointment Only): 10:00 &ndash; 16:00 WAT
              </p>
            </div>

          </div>

          {/* Form */}
          <form className="flex flex-col gap-8 bg-secondary/10 p-8 border border-border/10">
            <h3 className="text-lg uppercase tracking-wider font-light">Atelier Inquiry</h3>
            
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-widest text-muted-foreground">Full Name</label>
              <input type="text" className="bg-transparent border-b border-border/40 py-2 focus:border-primary outline-none transition-colors text-sm" placeholder="Alexander P." required />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-widest text-muted-foreground">Email Address</label>
              <input type="email" className="bg-transparent border-b border-border/40 py-2 focus:border-primary outline-none transition-colors text-sm" placeholder="alex@gmail.com" required />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-widest text-muted-foreground">Message</label>
              <textarea rows={4} className="bg-transparent border-b border-border/40 py-2 focus:border-primary outline-none transition-colors text-sm resize-none" placeholder="Detail your bespoke shoe requirements..." required />
            </div>

            <button type="submit" className="w-full py-4 bg-foreground text-background text-xs uppercase tracking-widest font-semibold hover:bg-primary transition-colors mt-4">
              Send Message
            </button>
          </form>
        </section>

      </div>
    </main>
  );
}
