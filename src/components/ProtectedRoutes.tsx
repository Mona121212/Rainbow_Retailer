import { useAuth } from "../context/AuthContext";
import { Navigate } from "@tanstack/react-router";
const ProtectedRoutes = ({
  children,
    permission,
  allowGuest = false,
}: {
  children: React.ReactNode;
  permission?: string[];
    allowGuest?: boolean;
}) => {
  const { user, hasPermission } = useAuth();

  if (allowGuest && !user) {
    return <>{children}</>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (permission && !permission.every((p) => hasPermission(p))) {
    return <Navigate to="/unauthorized" />;
  }

  return <>{children}</>;
};

export default ProtectedRoutes;
