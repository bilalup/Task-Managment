import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  // If user is not authenticated → redirect to login
  if (!user) return <Navigate to="/login" replace />;

  // If user is authenticated → render the children
  return children;
};

export default PrivateRoute;
