import { createContext, useState, ReactNode, useContext } from "react";

interface IUserData {
  token: string;
  userId: string;
}

export const AuthContext = createContext({
  userData: { token: "", userId: "" },
  isAuthenticated: false,
  authenticate: (data: IUserData) => {},
  logout: () => {},
});

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState({
    token: "",
    userId: "",
  });

  const authenticate = (data: IUserData) => {
    setUserData({
      token: data.token,
      userId: data.userId,
    });
  };

  const logout = () => {
    setUserData({
      token: "",
      userId: "",
    });
  };

  const value = {
    userData,
    isAuthenticated: !!userData.token,
    authenticate,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
