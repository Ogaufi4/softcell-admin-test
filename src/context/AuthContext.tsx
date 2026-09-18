"use client";

import { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "softcell_dealer_auth";

export const AUTH_CREDENTIALS = {
  email: "admin@softcell.com",
  password: "adminpass",
};

interface AuthContextValue {
  isAuthenticated: boolean;
  isInitialized: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      setIsAuthenticated(stored === "true");
    } catch {
      setIsAuthenticated(false);
    }
    setIsInitialized(true);
  }, []);

  const login = (email: string, password: string) => {
    const valid =
      email.trim().toLowerCase() === AUTH_CREDENTIALS.email &&
      password === AUTH_CREDENTIALS.password;
    if (valid) {
      try {
        localStorage.setItem(STORAGE_KEY, "true");
      } catch {
        // ignore storage failures
      }
      setIsAuthenticated(true);
    }
    return valid;
  };

  const logout = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore storage failures
    }
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isInitialized, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}