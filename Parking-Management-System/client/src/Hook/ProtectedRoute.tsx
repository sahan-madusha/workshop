import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthChecker } from "../Context";

interface ProtectedRouteProps {
  children: React.ReactNode;
  feature?: string;
  policy?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuth } = useAuthChecker();

  if (!isAuth) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
