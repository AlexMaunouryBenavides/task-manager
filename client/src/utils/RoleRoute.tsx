import { Navigate } from "react-router";
import { useAuth } from "./AuthProvider";
import type { JSX } from "react";

interface Props {
  children: JSX.Element;
  roles: string[];
}

const RoleRoute = ({ children, roles }: Props) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/login" replace />;
  console.log(user.role);

  if (!roles.includes(user.role.toUpperCase())) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default RoleRoute;
