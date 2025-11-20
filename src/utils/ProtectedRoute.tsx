import { Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import type { JSX } from "react";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated, isLoading } = useAuth0();

  // Optional: while Auth0 is checking session
  if (isLoading) return <div>Loading…</div>;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
