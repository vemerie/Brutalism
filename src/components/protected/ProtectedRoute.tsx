// src/components/protected/ProtectedRoute.tsx
import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticating, user } = useAuth();
  const isAuthenticated = !!user;

  // Show loading state during authentication check
  if (isAuthenticating) {
    return <div>Loading...</div>;
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  // Render children or Outlet for nested routes
  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
