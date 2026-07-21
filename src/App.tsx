import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { AdminStoreProvider } from "@/hooks/useAdminStore";
import { CartProvider } from "@/hooks/useCart";
import { Layout } from "@/components/Layout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Home } from "@/pages/Home";

// Lazy-loaded page routes for code splitting & optimal performance
const Collections = lazy(() => import("@/pages/Collections").then((m) => ({ default: m.Collections })));
const CollectionDetail = lazy(() => import("@/pages/CollectionDetail").then((m) => ({ default: m.CollectionDetail })));
const Product = lazy(() => import("@/pages/Product").then((m) => ({ default: m.Product })));
const Order = lazy(() => import("@/pages/Order").then((m) => ({ default: m.Order })));
const Craftsmanship = lazy(() => import("@/pages/Craftsmanship").then((m) => ({ default: m.Craftsmanship })));
const Archive = lazy(() => import("@/pages/Archive").then((m) => ({ default: m.Archive })));
const Journal = lazy(() => import("@/pages/Journal").then((m) => ({ default: m.Journal })));
const JournalPost = lazy(() => import("@/pages/JournalPost").then((m) => ({ default: m.JournalPost })));
const Film = lazy(() => import("@/pages/Film").then((m) => ({ default: m.Film })));
const Masterclass = lazy(() => import("@/pages/Masterclass").then((m) => ({ default: m.Masterclass })));
const PrivateClients = lazy(() => import("@/pages/PrivateClients").then((m) => ({ default: m.PrivateClients })));
const About = lazy(() => import("@/pages/About").then((m) => ({ default: m.About })));
const Contact = lazy(() => import("@/pages/Contact").then((m) => ({ default: m.Contact })));
const FAQ = lazy(() => import("@/pages/FAQ").then((m) => ({ default: m.FAQ })));
const Checkout = lazy(() => import("@/pages/Checkout").then((m) => ({ default: m.Checkout })));
const ClientDashboard = lazy(() => import("@/pages/ClientDashboard").then((m) => ({ default: m.ClientDashboard })));
const AdminDashboard = lazy(() => import("@/pages/AdminDashboard").then((m) => ({ default: m.AdminDashboard })));
const NotFound = lazy(() => import("@/pages/NotFound").then((m) => ({ default: m.NotFound })));

function PageLoader() {
  return (
    <div className="flex min-h-[60vh] w-full items-center justify-center bg-obsidian text-warm-white">
      <div className="flex flex-col items-center gap-3">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-gold border-t-transparent" />
        <span className="text-xs uppercase tracking-widest text-white/40">Loading...</span>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AdminStoreProvider>
        <CartProvider>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="collections" element={<Collections />} />
                <Route path="collections/:slug" element={<CollectionDetail />} />
                <Route path="product/:id" element={<Product />} />
                <Route path="order" element={<Order />} />
                <Route path="craftsmanship" element={<Craftsmanship />} />
                <Route path="archive" element={<Archive />} />
                <Route path="journal" element={<Journal />} />
                <Route path="journal/:slug" element={<JournalPost />} />
                <Route path="film" element={<Film />} />
                <Route path="masterclass" element={<Masterclass />} />
                <Route path="private-clients" element={<PrivateClients />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
                <Route path="faq" element={<FAQ />} />
                <Route path="checkout" element={<Checkout />} />
                <Route
                  path="dashboard"
                  element={
                    <ProtectedRoute roles={["customer", "vip", "admin", "manager", "artisan"]}>
                      <ClientDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="admin"
                  element={
                    <ProtectedRoute roles={["admin", "manager", "artisan"]}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Suspense>
        </CartProvider>
      </AdminStoreProvider>
    </AuthProvider>
  );
}

