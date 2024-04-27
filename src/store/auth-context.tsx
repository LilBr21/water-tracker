import { createContext, useState, ReactNode, useContext } from "react";

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  authenticate: (token: string) => {},
  logout: () => {},
});

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState("");

  const authenticate = (token: string) => {
    setToken(token);
  };

  const logout = () => {
    setToken("");
  };

  const value = {
    token,
    isAuthenticated: !!token,
    authenticate,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
