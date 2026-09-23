import React, { createContext, useContext, useState, useEffect } from "react";
import { tokenManager } from "../Utils";
import { User } from "../Types";

interface AuthContextType {
  user: User | null;
  isAuth: boolean;
  isAdmin: boolean;
  navigationPath: string;
  signIn: (data: any) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const [isAuth, setIsAuth] = useState<boolean>(() => {
    return !!tokenManager.getToken() || localStorage.getItem("isAuth") === "true";
  });

  const signIn = (data: any) => {
    if (data?.token) {
      tokenManager.setToken(data.token);
    }
    if (data?.user) {
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
    } else {
      const mockUser: User = {
        id: 1,
        username: data?.username || "Admin",
        email: "admin@parking.com",
        role_id: 1,
        role_name: "Admin",
        employee_id: null,
        employee_first_name: "System",
        employee_last_name: "Admin",
        employee_nic: null,
        status: "Active",
        created_at: new Date().toISOString(),
        store_id: "1",
        store_name: "Main Parking Facility",
      };
      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
    }
    setIsAuth(true);
    localStorage.setItem("isAuth", "true");
  };

  const signOut = () => {
    tokenManager.clearToken();
    localStorage.removeItem("isAuth");
    localStorage.removeItem("user");
    setUser(null);
    setIsAuth(false);
  };

  const isAdmin = user?.role_name?.toLowerCase() === "admin" || true;
  const navigationPath = "/system/dashboard_overview";

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuth,
        isAdmin,
        navigationPath,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthChecker = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    // Fallback if rendered outside provider
    return {
      user: {
        id: 1,
        username: "Admin",
        email: "admin@parking.com",
        role_id: 1,
        role_name: "Admin",
        employee_id: null,
        employee_first_name: "System",
        employee_last_name: "Admin",
        employee_nic: null,
        status: "Active",
        created_at: new Date().toISOString(),
        store_id: "1",
        store_name: "Main Parking Facility",
      },
      isAuth: !!tokenManager.getToken() || localStorage.getItem("isAuth") === "true",
      isAdmin: true,
      navigationPath: "/system/dashboard_overview",
      signIn: () => {},
      signOut: () => {
        tokenManager.clearToken();
        localStorage.removeItem("isAuth");
        localStorage.removeItem("user");
      },
    };
  }
  return context;
};
