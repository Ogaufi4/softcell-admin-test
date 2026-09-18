"use client";

import { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "softcell_dealer_auth";

export type AuthRole = "dealer" | "subdealer";

export const AUTH_CREDENTIALS: Record<AuthRole, { email: string; password: string }> = {
  dealer: { email: "admin@softcell.com", password: "adminpass" },
  subdealer: { email: "subdealer@softcell.com", password: "subdealerpass" },
};

interface AuthContextValue {
  isAuthenticated: boolean;
  isInitialized: boolean;
  role: AuthRole | null;
  login: (email: string, password: string) => AuthRole | null;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function readRole(raw: string | null): AuthRole | null {
  if (raw === "subdealer") return "subdealer";
  if (raw === "dealer" || raw === "true") return "dealer";
  return null;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<AuthRole | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    let raw: string | null = null;
    try {
      raw = localStorage.getItem(STORAGE_KEY);
    } catch {
      // ignore storage failures
    }
    setRole(readRole(raw));
    setIsInitialized(true);
  }, []);

  const login = (email: string, password: string): AuthRole | null => {
    const normalized = email.trim().toLowerCase();
    const role = (Object.keys(AUTH_CREDENTIALS) as AuthRole[]).find(
      (anyRole) =>
        AUTH_CREDENTIALS[anyRole].email === normalized &&
        AUTH_CREDENTIALS[anyRole].password === password,
    );
    if (role) {
      try {
        localStorage.setItem(STORAGE_KEY, role);
      } catch {
        // ignore storage failures
      }
      setRole(role);
    }
    return role ?? null;
  };

  const logout = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore storage failures
    }
    setRole(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: role !== null,
        isInitialized,
        role,
        login,
        logout,
      }}
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