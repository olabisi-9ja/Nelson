import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Search, User, X, ShoppingBag, LogOut, LayoutDashboard } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { cn } from "@/utils/cn";

interface Props {
  onSearch: () => void;
}

const links = [
  { label: "Collections", to: "/collections" },
  { label: "Craftsmanship", to: "/craftsmanship" },
  { label: "Journal", to: "/journal" },
  { label: "Film", to: "/film" },
  { label: "Masterclass", to: "/masterclass" },
  { label: "Private Clients", to: "/private-clients" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export function Nav({ onSearch }: Props) {
  const location = useLocation();
  const { user, setAuthOpen, logout } = useAuth();
  const { count, setOpen: setCartOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 transition-all duration-500",
          scrolled || mobileOpen
            ? "border-b border-black/10 bg-warm-white/95 py-4 backdrop-blur-md shadow-sm"
            : "bg-warm-white py-6"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          <Link to="/" className="group flex items-center gap-3">
            <span className="font-display text-2xl tracking-tight text-obsidian transition group-hover:text-leather md:text-3xl font-bold">
              Nelson
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {links.slice(0, 4).map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="relative text-xs font-semibold uppercase tracking-[0.15em] text-obsidian/80 transition hover:text-leather"
              >
                {l.label}
                {location.pathname === l.to && (
                  <motion.span
                    layoutId="nav-dot"
                    className="absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-leather"
                  />
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={onSearch}
              aria-label="Search"
              className="text-obsidian/80 transition hover:text-leather"
            >
              <Search className="h-5 w-5" />
            </button>
            {user ? (
              <UserMenu user={user} logout={logout} />
            ) : (
            <button
              onClick={() => setAuthOpen(true)}
              className="hidden text-[10px] font-bold uppercase tracking-widest text-warm-white bg-obsidian px-5 py-2 rounded-full hover:bg-gold hover:text-obsidian transition duration-300 md:block border border-obsidian"
            >
              Sign In
            </button>
          )}
            <button
              onClick={() => setCartOpen(true)}
              aria-label="Open cart"
              className="relative text-obsidian/80 transition hover:text-leather"
            >
              <ShoppingBag className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-leather text-[10px] text-warm-white">
                  {count}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Menu"
              className="text-obsidian/80 lg:hidden transition hover:text-leather"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-obsidian/98 backdrop-blur-xl"
          >
            <div className="flex h-full flex-col px-8 py-6">
              <div className="flex items-center justify-between">
                <span className="font-display text-2xl text-warm-white">Nelson</span>
                <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
                  <X className="h-7 w-7 text-cream" />
                </button>
              </div>
              <nav className="mt-16 flex flex-col gap-6">
                {links.map((l, i) => (
                  <motion.div
                    key={l.to}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      to={l.to}
                      className="font-display text-4xl text-warm-white transition hover:text-gold"
                    >
                      {l.label}
                    </Link>
                  </motion.div>
                ))}
                {user ? (
                  <button
                    onClick={() => {
                      logout();
                      setMobileOpen(false);
                    }}
                    className="mt-6 text-left font-display text-4xl text-chrome transition hover:text-gold"
                  >
                    Sign Out
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setAuthOpen(true);
                      setMobileOpen(false);
                    }}
                    className="mt-6 text-left font-display text-4xl text-chrome transition hover:text-gold"
                  >
                    Sign In
                  </button>
                )}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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
        <User className="h-5 w-5" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="absolute right-0 top-12 w-56 rounded-xl border border-white/10 bg-ink p-2 shadow-2xl"
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
