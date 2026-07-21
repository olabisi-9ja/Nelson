import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { SearchOverlay } from "./SearchOverlay";
import { AuthModal } from "./AuthModal";
import { ScrollToTop } from "./ScrollToTop";
import { AIAssistant } from "./AIAssistant";
import { CartDrawer } from "./CartDrawer";
import { PageTransition } from "./PageTransition";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { Toaster } from "react-hot-toast";

export function Layout() {
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  useSmoothScroll();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-obsidian text-warm-white">
      <Nav onSearch={() => setSearchOpen(true)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <AuthModal />
      <main>
        <AnimatePresence mode="wait">
          <PageTransition key={location.pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </main>
      <Footer />
      <ScrollToTop />
      <AIAssistant />
      <CartDrawer />
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            background: "#111",
            color: "#faf9f6",
            border: "1px solid rgba(255,255,255,0.1)",
          },
        }}
      />
    </div>
  );
}
