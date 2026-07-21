import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="space-y-4">
            <Link to="/" className="font-display text-3xl text-warm-white">
              Nelson
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-chrome">
              Nigerian bespoke luxury footwear. Crafted without compromise for those who value
              excellence.
            </p>
          </div>
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.2em] text-gold">Atelier</p>
            <ul className="space-y-3 text-sm text-chrome">
              <li>
                <Link to="/collections" className="transition hover:text-warm-white">
                  Collections
                </Link>
              </li>
              <li>
                <Link to="/craftsmanship" className="transition hover:text-warm-white">
                  Craftsmanship
                </Link>
              </li>
              <li>
                <Link to="/commission" className="transition hover:text-warm-white">
                  Commission
                </Link>
              </li>
              <li>
                <Link to="/archive" className="transition hover:text-warm-white">
                  Archive
                </Link>
              </li>
              <li>
                <Link to="/faq" className="transition hover:text-warm-white">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.2em] text-gold">Experience</p>
            <ul className="space-y-3 text-sm text-chrome">
              <li>
                <Link to="/journal" className="transition hover:text-warm-white">
                  Journal
                </Link>
              </li>
              <li>
                <Link to="/film" className="transition hover:text-warm-white">
                  Film
                </Link>
              </li>
              <li>
                <Link to="/masterclass" className="transition hover:text-warm-white">
                  Masterclass
                </Link>
              </li>
              <li>
                <Link to="/private-clients" className="transition hover:text-warm-white">
                  Private Clients
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.2em] text-gold">Contact</p>
            <ul className="space-y-3 text-sm text-chrome">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gold" />
                14 Adeola Odeku, Victoria Island, Lagos
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gold" />
                atelier@nelson.shoes
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gold" />
                +234 904 955 3906
              </li>
            </ul>
            <div className="mt-6 flex gap-4">
              <a href="https://www.instagram.com/_n_elson/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-chrome transition hover:text-gold">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="18" cy="6" r="1.5" fill="currentColor" stroke="none"/></svg>
              </a>
              <a href="https://www.tiktok.com/@_n_elson" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-chrome transition hover:text-gold">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.62 4.17 1.22 1.34 2.92 2.15 4.74 2.38v3.83c-1.39-.08-2.74-.67-3.83-1.57-.7-.57-1.25-1.31-1.63-2.15-.05 2.53-.03 5.07-.05 7.6 0 1.56-.25 3.12-.87 4.54-1.2 2.76-3.84 4.7-6.87 4.98-2.6.28-5.3-.53-7.14-2.42-1.92-1.92-2.73-4.75-2.13-7.4C1.17 11.23 3.23 9.17 5.92 8.5c1.4-.38 2.9-.27 4.22.31v4.02c-.89-.57-2-.72-3-.41-1.12.33-1.98 1.3-2.17 2.45-.23 1.25.2 2.56 1.13 3.42 1.1 1 2.77 1.15 4 .37.8-.5 1.29-1.38 1.4-2.31.02-2.65.01-5.3.01-7.95 0-3-.01-5.99-.01-8.99z"/></svg>
              </a>
              <a href="#" aria-label="YouTube" className="text-chrome transition hover:text-gold">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-xs text-chrome">© 2026 Nelson Bespoke Footwear. All rights reserved.</p>
          <div className="flex gap-6 text-xs text-chrome">
            <Link to="#" className="transition hover:text-warm-white">
              Privacy
            </Link>
            <Link to="#" className="transition hover:text-warm-white">
              Terms
            </Link>
            <Link to="#" className="transition hover:text-warm-white">
              Shipping
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
