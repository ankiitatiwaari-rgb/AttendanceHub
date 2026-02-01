import { createContext, useContext, useState, useEffect } from "react";
import { employees } from "../data/employees";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
    setLoading(false);
  }, []);

  const login = (username, password) => {
    const found = employees.find(e => e.username === username && e.password === password);
    if (!found) return false;

    const { password: _, ...safeUser } = found;
    localStorage.setItem("user", JSON.stringify(safeUser));
    setUser(safeUser); // This triggers the App to show Dashboard
    return true;
  };

  const logout = () => {
    localStorage.removeItem("user"); // Clear storage
    setUser(null); // This triggers the App to show Login page instantly
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);