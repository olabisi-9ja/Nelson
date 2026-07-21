import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { AdminStoreProvider } from "@/hooks/useAdminStore";
import { CartProvider } from "@/hooks/useCart";
import { Layout } from "@/components/Layout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Home } from "@/pages/Home";
import { Collections } from "@/pages/Collections";
import { CollectionDetail } from "@/pages/CollectionDetail";
import { Product } from "@/pages/Product";
import { Order } from "@/pages/Order";
import { Craftsmanship } from "@/pages/Craftsmanship";
import { Archive } from "@/pages/Archive";
import { Journal } from "@/pages/Journal";
import { JournalPost } from "@/pages/JournalPost";
import { Film } from "@/pages/Film";
import { Masterclass } from "@/pages/Masterclass";
import { PrivateClients } from "@/pages/PrivateClients";
import { About } from "@/pages/About";
import { Contact } from "@/pages/Contact";
import { FAQ } from "@/pages/FAQ";
import { Checkout } from "@/pages/Checkout";
import { ClientDashboard } from "@/pages/ClientDashboard";
import { AdminDashboard } from "@/pages/AdminDashboard";
import { NotFound } from "@/pages/NotFound";

export default function App() {
  return (
    <AuthProvider>
      <AdminStoreProvider>
        <CartProvider>
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
        </CartProvider>
      </AdminStoreProvider>
    </AuthProvider>
  );
}
