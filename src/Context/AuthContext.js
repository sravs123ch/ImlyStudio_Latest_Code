import { createContext, useContext, useState, useEffect } from "react";

import { jwtDecode } from "jwt-decode";
import LoadingAnimation from "../components/Loading/LoadingAnimation";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [userRole, setUserRole] = useState(null);

  const [permissionsID, setPermissionsID] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const decodedToken = jwtDecode(token);

          setIsLoggedIn(true);

          setUserRole(decodedToken.RoleID);

          setPermissionsID(decodedToken.PermissionID || []);
        } catch (error) {
          console.error("Token decoding failed:", error);
        }
      } else {
        setIsLoggedIn(false);

        setUserRole(null);

        setPermissionsID([]);
      }

      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);

    const decodedToken = jwtDecode(token);

    setIsLoggedIn(true);

    setUserRole(decodedToken.RoleID);

    setPermissionsID(decodedToken.PermissionID || []); // Set permissions on login
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("storesData");

    setIsLoggedIn(false);

    setUserRole(null);

    setPermissionsID([]);
  };

  if (loading) {
    return <LoadingAnimation/>; // Or a spinner/loading indicator
  }


  return (
    <AuthContext.Provider
      value={{ isLoggedIn, userRole, permissionsID, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
