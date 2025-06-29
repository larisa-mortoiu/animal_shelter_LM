import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./Auth";

interface AdminRouteProps {
  children: ReactNode;
}

export const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user || user.role !== "ADMIN") {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
