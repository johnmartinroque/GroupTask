// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

function ProtectedRoute({ children }) {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    return <Navigate to="/landing" replace />;
  }

  return children;
}

export default ProtectedRoute;
