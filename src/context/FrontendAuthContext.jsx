import React, { createContext, useEffect, useState } from "react";
import Axios from "../service/Axios";

export const FrontendAuthContext = createContext();
const FrontendAuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const token = localStorage.getItem("usertoken");

  const fetchAuthUser = async () => {
    if (token) {
      const response = await Axios.get("/auth/check-auth", {
        headers: {
          Authorization: `EcomToken ${token}`,
        },
      });
      console.log(response);
      

      if (response.data) {
        setUser(response.data);
        setIsAuthenticated({
          isAuth: true,
          token,
        });
      }
    }
  };

  useEffect(() => {
    fetchAuthUser();
  }, [token]);

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const authValue = {
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    logout,
  };
  return (
    <FrontendAuthContext.Provider
      value={authValue}
    >
      {children}
    </FrontendAuthContext.Provider>
  );
};

export default FrontendAuthContextProvider;
