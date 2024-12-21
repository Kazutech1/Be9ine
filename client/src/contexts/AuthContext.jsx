// AuthContext.js
import { createContext, useContext, useState } from "react";

// Create Context
export const AuthContext = createContext();

// Hook to use the AuthContext
export const useAuthContext = () => {
  return useContext(AuthContext);
};

// AuthContext Provider
export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(() => {
    const savedUser = localStorage.getItem("chat-user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
