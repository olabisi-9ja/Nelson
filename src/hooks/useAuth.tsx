import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { Role, User } from "@/types";

interface AuthContextValue {
  user: User | null;
  login: (email: string, password: string) => User | null;
  logout: () => void;
  isAuthOpen: boolean;
  setAuthOpen: (open: boolean) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const MOCK_USERS: User[] = [
  { id: "u1", email: "admin@nelson.com", name: "Admin User", role: "admin" },
  { id: "u2", email: "client@nelson.com", name: "Demo Client", role: "customer" },
  { id: "u3", email: "vip@nelson.com", name: "Private Client", role: "vip" },
  { id: "u4", email: "manager@nelson.com", name: "Manager", role: "manager" },
  { id: "u5", email: "artisan@nelson.com", name: "Master Artisan", role: "artisan" },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthOpen, setAuthOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("nelson_user");
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch {}
    }
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem("nelson_user", JSON.stringify(user));
    else localStorage.removeItem("nelson_user");
  }, [user]);

  const login = (email: string, password: string) => {
    const found = MOCK_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (found && password.length > 3) {
      setUser(found);
      setAuthOpen(false);
      return found;
    }
    return null;
  };

  const logout = () => setUser(null);

  const value = useMemo(
    () => ({ user, login, logout, isAuthOpen, setAuthOpen }),
    [user, isAuthOpen]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const hasRole = (user: User | null, roles: Role[]) =>
  !!user && roles.includes(user.role);
