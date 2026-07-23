import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Search, User, ShoppingBag, LogOut, LayoutDashboard } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import StaggeredMenu from "./StaggeredMenu";

interface Props {
  onSearch: () => void;
}

const navLinks = [
  { label: "Collections", link: "/collections", ariaLabel: "Browse collections" },
  { label: "Journal", link: "/journal", ariaLabel: "Read our journal" },
  { label: "Masterclass", link: "/masterclass", ariaLabel: "Explore masterclasses" },
  { label: "Private Clients", link: "/private-clients", ariaLabel: "Private client services" },
  { label: "About", link: "/about", ariaLabel: "About Nelson" },
  { label: "Contact", link: "/contact", ariaLabel: "Contact us" },
];

const socialItems = [
  { label: "Instagram", link: "https://www.instagram.com/_n_elson/" },
  { label: "TikTok", link: "https://www.tiktok.com/@_n_elson" }
];

export function Nav({ onSearch }: Props) {
  const { user, setAuthOpen, logout } = useAuth();
  const { count, setOpen: setCartOpen } = useCart();

  const headerActions = (
    <div className="flex items-center gap-4">
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
          className="hidden text-[10px] font-medium uppercase tracking-widest text-obsidian bg-transparent px-4 py-1.5 rounded-full hover:bg-obsidian hover:text-warm-white transition duration-300 md:block border border-obsidian"
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
          <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-leather text-[10px] text-warm-white font-medium">
            {count}
          </span>
        )}
      </button>
    </div>
  );

  return (
    <StaggeredMenu
      position="right"
      isFixed={true}
      items={navLinks}
      socialItems={socialItems}
      displaySocials={true}
      displayItemNumbering={true}
      menuButtonColor="#0a0a0a"
      openMenuButtonColor="#0a0a0a"
      accentColor="#c5a059"
      colors={["#c5a059", "#1a1a1a"]}
      closeOnClickAway={true}
      headerActions={headerActions}
    />
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
            className="absolute right-0 top-12 w-56 rounded-xl border border-white/10 bg-obsidian p-2 shadow-2xl z-50 text-warm-white"
          >
            <div className="px-3 py-2">
              <p className="text-sm font-medium text-warm-white">{user.name}</p>
              <p className="text-[10px] uppercase tracking-widest text-gold">{user.role}</p>
            </div>
            <div className="my-1 h-px bg-white/10" />
            <Link
              to={dashboardLink}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-warm-white/80 transition hover:bg-white/5 hover:text-gold"
            >
              <LayoutDashboard className="h-4 w-4" /> Dashboard
            </Link>
            <button
              onClick={() => {
                logout();
                setOpen(false);
              }}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-warm-white/80 transition hover:bg-white/5 hover:text-red-400"
            >
              <LogOut className="h-4 w-4" /> Sign Out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
