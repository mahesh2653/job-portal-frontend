import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store-zustand/useAuthStore";
import CustomLoader from "../components/customloader";

const pathnames = ["/register", "/login"];

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const { pathname } = window.location;

  const { initializeAuth, isAuthenticated, loading, token } = useAuthStore();

  useEffect(() => {
    initializeAuth().then(() => {
      if (isAuthenticated) {
        navigate(!pathnames.includes(pathname) ? pathname : "/dashboard");
      } else {
        navigate(pathnames.includes(pathname) ? pathname : "/");
      }
    });
  }, [token]);

  if (loading) return <CustomLoader />;

  return <>{children}</>;
};

export default AuthLayout;
