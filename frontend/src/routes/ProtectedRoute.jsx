import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Spinner } from "../components/Spinner";

export const ProtectedRoute = () => {
  const { loading, isAuthenticated } = useAuth();

  if (loading) return <Spinner label="Loading session" />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return <Outlet />;
};
