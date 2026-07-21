import { Navigate } from "react-router-dom";
import { hasRole, useAuth } from "@/hooks/useAuth";
import type { Role } from "@/types";

interface Props {
  roles: Role[];
  children: React.ReactNode;
}

export function ProtectedRoute({ roles, children }: Props) {
  const { user, setAuthOpen } = useAuth();
  if (!user) {
    setAuthOpen(true);
    return <Navigate to="/" replace />;
  }
  if (!hasRole(user, roles)) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}
