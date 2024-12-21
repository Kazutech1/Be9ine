import React, { createContext, useContext, useState } from "react";

// Create the context
const UserContext = createContext();

// Custom hook to access the context
export const useUserContext = () => useContext(UserContext);

// Context provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Global user state
  const [currentPlan, setCurrentPlan] = useState(null); // Global plan state
  const [loading, setLoading] = useState(false); // Global loading state
  const [error, setError] = useState(""); // Global error state

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        currentPlan,
        setCurrentPlan,
        loading,
        setLoading,
        error,
        setError,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
