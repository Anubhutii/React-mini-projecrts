import React, { createContext, useContext, useState, useEffect } from "react";
import { loginUser, registerUser, loginGoogle, updateProfile } from "../services/auth";

interface User {
  _id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<any>;
  loginWithGoogle: (credential: string) => Promise<void>;
  updateUserName: (name: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const data = await loginUser(email, password);
    setUser({ _id: data._id, name: data.name, email: data.email });
    setToken(data.token);
    localStorage.setItem("user", JSON.stringify({ _id: data._id, name: data.name, email: data.email }));
    localStorage.setItem("token", data.token);
  };

  const signup = async (name: string, email: string, password: string) => {
    const data = await registerUser(name, email, password);
    return data;
  };

  const loginWithGoogle = async (credential: string) => {
    const data = await loginGoogle(credential);
    setUser({ _id: data._id, name: data.name, email: data.email });
    setToken(data.token);
    localStorage.setItem("user", JSON.stringify({ _id: data._id, name: data.name, email: data.email }));
    localStorage.setItem("token", data.token);
  };

  const updateUserName = async (name: string) => {
    const data = await updateProfile(name);
    setUser({ _id: data._id, name: data.name, email: data.email });
    localStorage.setItem("user", JSON.stringify({ _id: data._id, name: data.name, email: data.email }));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, signup, loginWithGoogle, updateUserName, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
