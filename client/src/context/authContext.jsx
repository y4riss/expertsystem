import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState("loading");

  const login = async (data) => {
    const res = await axios.post("/api/auth/login", data);
    setCurrentUser(res.data);
    localStorage.setItem("user", JSON.stringify(res.data));
  };

  const logout = async () => {
    await axios.post("/api/auth/logout");
    setCurrentUser(null);
    localStorage.removeItem("user");
    window.location = "/login";
  };

  useEffect(() => {
    let user = null;
    try {
      user = JSON.parse(localStorage.getItem("user"));
    } catch (error) {
      console.log(error);
    }

    const verifyToken = async () => {
      try {
        const res = await axios.get("/api");
        if (res.status === 200) {
          setCurrentUser(res.data);
          localStorage.setItem("user", JSON.stringify(res.data));
        } else {
          setCurrentUser(null);
          localStorage.removeItem("user");
        }
      } catch (error) {
        setCurrentUser(null);
        localStorage.removeItem("user");
      }
    };
    if (user) verifyToken();
    else setCurrentUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
