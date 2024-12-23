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


// import { createContext, useContext, useState, useEffect } from "react";
// import { jwtDecode } from "jwt-decode";
// import LoadingAnimation from "../components/Loading/LoadingAnimation";
// import {
//   GETALLUSERSBYID_API,
// } from "../Constants/apiRoutes";
// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userRole, setUserRole] = useState(null);
//   const [permissionsID, setPermissionsID] = useState([]);
//   const [userData, setUserData] = useState(null); // To store user details
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const checkAuthStatus = () => {
//       const token = localStorage.getItem("token");

//       if (token) {
//         try {
//           const decodedToken = jwtDecode(token);

//           setIsLoggedIn(true);
//           setUserRole(decodedToken.RoleID);
//           setPermissionsID(decodedToken.PermissionID || []);
//         } catch (error) {
//           console.error("Token decoding failed:", error);
//           logout();
//         }
//       } else {
//         logout();
//       }

//       setLoading(false);
//     };

//     checkAuthStatus();
//   }, []);

//   const login = async (token, userID) => {
//     localStorage.setItem("token", token);

//     const decodedToken = jwtDecode(token);
//     setIsLoggedIn(true);
//     setUserRole(decodedToken.RoleID);
//     setPermissionsID(decodedToken.PermissionID || []);

//     // Fetch user details and store them in state
//     await fetchUserDetails(token, userID);
//   };

//   const fetchUserDetails = async (token, userID) => {
//     try {
//       const response = await fetch(`${GETALLUSERSBYID_API}/${userID}`, {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       if (!response.ok) {
//         throw new Error(`Error fetching user details: ${response.statusText}`);
//       }

//       const userDataResponse = await response.json();
//       const userDetails = userDataResponse?.user || null;

//       // Set user details in state
//       setUserData(userDetails);
//     } catch (error) {
//       console.error("Error fetching user details:", error);
//       setUserData(null);
//     }
//   };

//   useEffect(() => {
//   if (userData) {
//     console.log("User Details:", userData);
//   }
// }, [userData]);


//   const logout = () => {
//     localStorage.removeItem("token");
//     setIsLoggedIn(false);
//     setUserRole(null);
//     setPermissionsID([]);
//     setUserData(null);
//   };

//   // Log user details whenever it changes
//   useEffect(() => {
//     if (userData) {
//       console.log("User Details:", userData);
//     }
//   }, [userData]);

//   if (loading) {
//     return <LoadingAnimation />; // Loading state while checking authentication
//   }

//   return (
//     <AuthContext.Provider
//       value={{
//         isLoggedIn,
//         userRole,
//         permissionsID,
//         userData,
//         login,
//         logout,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
