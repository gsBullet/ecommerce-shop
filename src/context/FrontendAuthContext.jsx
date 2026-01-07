import React, { createContext, useEffect, useState } from "react";
import Axios from "../service/Axios";
import SweetAlert from "../components/common/SweetAlert";

export const FrontendAuthContext = createContext();
const FrontendAuthContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const token = localStorage.getItem("usertoken");

  useEffect(() => {
    const fetchAuthUser = async () => {
      try {
        if (token) {
          const response = await Axios.get("/auth/check-auth", {
            headers: {
              Authorization: `EcomToken ${token}`,
            },
          });
          console.log("response", response);

          if (response?.data) {
            setUser(response?.data?.data);
            setIsAuthenticated({
              isAuth: true,
              token,
            });
          }
        } else {
          setUser(null);
          setIsAuthenticated(false);
          localStorage.removeItem("usertoken");
        }
      } catch (error) {
        console.log(error);
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem("usertoken");
        SweetAlert({
          icon: "error",
          title: error?.response?.data?.message,
        });
      }
    };
    fetchAuthUser();
  }, [isAuthenticated?.isAuth]);

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("usertoken");
  };

  return (
    <FrontendAuthContext.Provider
      value={{ user, setUser, isAuthenticated, setIsAuthenticated, logout }}
    >
      {children}
    </FrontendAuthContext.Provider>
  );
};

export default FrontendAuthContextProvider;
