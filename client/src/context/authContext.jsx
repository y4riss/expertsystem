import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState("loading");

  const login = async (data) => {
    const res = await axios.post("/api/auth/login", data);
    setCurrentUser(res.data);
  };

  const logout = async () => {
    await axios.post("/api/auth/logout");
    setCurrentUser(null);
    window.location = "/login";
  };

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await axios.get("/api");
        if (res.status === 200) {
          setCurrentUser(res.data);
        } else {
          setCurrentUser(null);
        }
      } catch (error) {
        setCurrentUser(null);
      }
    };
    verifyToken();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
