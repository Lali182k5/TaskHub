import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api, apiErrorMessage } from "../lib/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const setAuth = ({ token: newToken, user: newUser }) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    setUser(newUser);
  };

  const clearAuth = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
  };

  const fetchMe = async () => {
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      setError("");
      const { data } = await api.get("/auth/me");
      setUser(data.user);
    } catch (err) {
      clearAuth();
      setError(apiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async ({ email, password }) => {
    const { data } = await api.post("/auth/login", { email, password });
    setAuth({ token: data.token, user: data.user });
    return data;
  };

  const register = async ({ name, email, password }) => {
    const { data } = await api.post("/auth/register", { name, email, password });
    setAuth({ token: data.token, user: data.user });
    return data;
  };

  const logout = () => {
    clearAuth();
  };

  const value = useMemo(
    () => ({
      token,
      user,
      loading,
      error,
      login,
      register,
      logout,
      refresh: fetchMe,
      isAuthenticated: Boolean(token),
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [token, user, loading, error]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
