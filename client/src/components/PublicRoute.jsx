import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  // If user is logged in → redirect to dashboard
  if (user) return <Navigate to="/" replace />;

  // Otherwise → show public page
  return children;
};

export default PublicRoute;
