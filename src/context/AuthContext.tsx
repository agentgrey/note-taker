"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

// 🔹 User Details Type
interface UserDetailsType {
  id: string;
  userId: string;
  bio?: string;
  website?: string;
  subjects: string[];
  age?: string;
  phone?: string;
  address?: string;
  createdAt: string;
  updatedAt: string;
}

// 🔹 User Type
export interface UserType {
  id: string;
  name: string;
  email: string;
  token: string;
  userDetails: UserDetailsType;
}

// 🔹 Auth Context Type
interface AuthContextType {
  user: UserType | null;
  login: (userData: UserType) => void;
  logout: () => void;
  authConfig: { headers: { Authorization?: string } };
  loading: boolean;
  subjects: string[]
}

// 🔹 Create Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [subjects, setSubjects] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser) as UserType);

      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (user) {
      try {
        setSubjects(user?.userDetails?.subjects);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
    setLoading(false);
  }, [user]);

  const login = (userData: UserType) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    router.push("/");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    router.push("/signIn");
  };

  const authConfig = {
    headers: {
      Authorization: user?.token ? `Bearer ${user.token}` : undefined,
    },
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, authConfig, loading, subjects }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};