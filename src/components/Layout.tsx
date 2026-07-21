import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { SearchOverlay } from "./SearchOverlay";
import { AuthModal } from "./AuthModal";
import { WorkshopAmbience } from "./WorkshopAmbience";
import { AIAssistant } from "./AIAssistant";
import { CartDrawer } from "./CartDrawer";
import { PageTransition } from "./PageTransition";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { Toaster } from "react-hot-toast";

export function Layout() {
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  useSmoothScroll();

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
      <WorkshopAmbience />
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
