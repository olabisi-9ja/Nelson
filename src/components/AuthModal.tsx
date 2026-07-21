import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export function AuthModal() {
  const { isAuthOpen, setAuthOpen, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isAuthOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isAuthOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const user = login(email, password);
    if (!user) setError("Invalid credentials. Try admin@nelson.com / any 4+ char password.");
  };

  return (
    <AnimatePresence>
      {isAuthOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-obsidian/90 p-6 backdrop-blur-xl"
          onClick={() => setAuthOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-2xl border border-white/10 bg-charcoal p-8"
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-display text-2xl text-warm-white">Atelier Access</h2>
              <button onClick={() => setAuthOpen(false)} aria-label="Close">
                <X className="h-5 w-5 text-chrome hover:text-warm-white" />
              </button>
            </div>
            <p className="mb-6 text-sm text-chrome">
              Demo accounts: <span className="text-gold">admin@nelson.com</span>,{" "}
              <span className="text-gold">client@nelson.com</span>,{" "}
              <span className="text-gold">vip@nelson.com</span>. Any password longer than 3
              characters.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-xs uppercase tracking-widest text-chrome">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-obsidian px-4 py-3 text-warm-white placeholder:text-white/30 focus:border-gold/40 focus:outline-none"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-xs uppercase tracking-widest text-chrome">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={show ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-obsidian px-4 py-3 pr-11 text-warm-white placeholder:text-white/30 focus:border-gold/40 focus:outline-none"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-chrome"
                  >
                    {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              {error && <p className="text-sm text-red-400">{error}</p>}
              <button
                type="submit"
                className="w-full rounded-lg bg-gold py-3 text-sm font-semibold uppercase tracking-widest text-obsidian transition hover:bg-gold-light"
              >
                Enter
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
