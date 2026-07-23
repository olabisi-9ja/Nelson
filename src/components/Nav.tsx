import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, User, ShoppingBag, LogOut, LayoutDashboard } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { cn } from "@/utils/cn";
import StaggeredMenu from "./StaggeredMenu";

interface Props {
  onSearch: () => void;
}

const navLinks = [
  { label: "Collections", link: "/collections" },
  { label: "Journal", link: "/journal" },
  { label: "Masterclass", link: "/masterclass" },
  { label: "Private Clients", link: "/private-clients" },
  { label: "About", link: "/about" },
  { label: "Contact", link: "/contact" },
];

const socialItems = [
  { label: "Instagram", link: "https://www.instagram.com/_n_elson/" },
  { label: "TikTok", link: "https://www.tiktok.com/@_n_elson" }
];

export function Nav({ onSearch }: Props) {
  const location = useLocation();
  const { user, setAuthOpen, logout } = useAuth();
  const { count, setOpen: setCartOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 transition-all duration-500",
          scrolled
            ? "border-b border-black/10 bg-warm-white/95 py-4 backdrop-blur-md shadow-sm"
            : "bg-warm-white py-6"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          <Link to="/" className="group flex items-center gap-3">
            <span className="font-display text-3xl md:text-4xl font-medium tracking-normal text-obsidian transition group-hover:text-leather">
              Nelson
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.slice(0, 4).map((l) => (
              <Link
                key={l.link}
                to={l.link}
                className="relative text-[11px] font-medium uppercase tracking-[0.2em] text-obsidian/70 transition hover:text-obsidian"
              >
                {l.label}
                {location.pathname === l.link && (
                  <motion.span
                    layoutId="nav-dot"
                    className="absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-leather"
                  />
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <button
              onClick={onSearch}
              aria-label="Search"
              className="text-obsidian/80 transition hover:text-leather"
            >
              <Search className="h-5 w-5" strokeWidth={1.5} />
            </button>
            {user ? (
              <UserMenu user={user} logout={logout} />
            ) : (
              <button
                onClick={() => setAuthOpen(true)}
                className="hidden text-[10px] font-medium uppercase tracking-widest text-obsidian bg-transparent px-5 py-2 rounded-full hover:bg-obsidian hover:text-warm-white transition duration-300 md:block border border-obsidian"
              >
                Sign In
              </button>
            )}
            <button
              onClick={() => setCartOpen(true)}
              aria-label="Open cart"
              className="relative text-obsidian/80 transition hover:text-leather"
            >
              <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
              {count > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-leather text-[10px] text-warm-white">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* StaggeredMenu integration */}
      <div className="fixed top-0 left-0 w-full z-50 pointer-events-none">
        <StaggeredMenu
          position="right"
          items={navLinks}
          socialItems={socialItems}
          displaySocials={true}
          displayItemNumbering={true}
          menuButtonColor="#0a0a0a"
          openMenuButtonColor="#0a0a0a"
          accentColor="#c5a059"
          colors={["#c5a059", "#1a1a1a", "#0a0a0a"]}
          closeOnClickAway={true}
        />
      </div>
    </>
  );
}

function UserMenu({
  user,
  logout,
}: {
  user: { name: string; role: string };
  logout: () => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  const dashboardLink =
    user.role === "admin" || user.role === "manager" || user.role === "artisan" ? "/admin" : "/dashboard";

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        aria-label="Account menu"
        className="flex items-center justify-center text-obsidian/80 transition hover:text-leather"
      >
        <User className="h-5 w-5" strokeWidth={1.5} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="absolute right-0 top-12 w-56 rounded-xl border border-white/10 bg-ink p-2 shadow-2xl z-50"
          >
            <div className="px-3 py-2">
              <p className="text-sm font-medium text-warm-white">{user.name}</p>
              <p className="text-[10px] uppercase tracking-widest text-chrome">{user.role}</p>
            </div>
            <div className="my-1 h-px bg-white/10" />
            <Link
              to={dashboardLink}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-cream/80 transition hover:bg-white/5 hover:text-gold"
            >
              <LayoutDashboard className="h-4 w-4" /> Dashboard
            </Link>
            <button
              onClick={() => {
                logout();
                setOpen(false);
              }}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-cream/80 transition hover:bg-white/5 hover:text-red-400"
            >
              <LogOut className="h-4 w-4" /> Sign Out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
