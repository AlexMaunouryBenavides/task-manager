import { Navigate } from "react-router";
import { useAuth } from "./AuthProvider";
import { ReactNode } from "react";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/" replace />;

  return children;
};

export default ProtectedRoute;
