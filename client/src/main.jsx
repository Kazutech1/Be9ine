import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext.jsx";
import { AuthContextProvider } from "./contexts/AuthContext.jsx";// Import AuthContextProvider
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <UserProvider>
        <App />
        </UserProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
