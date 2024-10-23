import React from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  // Explicitly check the value of `isAuthenticated`
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  // If not authenticated, navigate to the login page
  if (!isAuthenticated || isAuthenticated === "false") {
    return <Navigate to="/login" />;
  }

  // Return the children if authenticated
  return <>{children}</>;
};

export default PrivateRoute;
