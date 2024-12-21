import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./contexts/AuthContext";
import { useLocation } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./pages/SideBar";
import InvestmentPlans from "./pages/Plans";
import Withdrawal from "./pages/Withdrawal";
import Deposit from "./pages/Deposit";
import History from "./pages/History";
import { FaBars } from "react-icons/fa";
import UserList from "./pages/AdminUsers";
import AddPlan from "./pages/AddPlans";
import WithdrawalRequests from "./pages/GetWithdrawals";
import UserDet from "./components/dashboard/UserDet";

function App() {
  const { authUser } = useAuthContext(); // Get authentication status
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  // Check if the sidebar should be shown (only for authenticated users)
  const routesWithoutSidebar = ["/", "/login", "/signup"];
  const shouldShowSidebar = !routesWithoutSidebar.includes(location.pathname);

  // Close sidebar when overlay is clicked
  const closeSidebar = () => {
    if (isSidebarOpen) setIsSidebarOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-800 text-white">
      {/* Sidebar is visible only for authenticated users */}
      {shouldShowSidebar && (
        <>
          {/* Sidebar for large screens */}
          <div className="lg:block hidden">
            <Sidebar
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
            />
          </div>

          {/* Sidebar toggle for small screens */}
          <div className="lg:hidden fixed top-4 right-4 z-50">
            <button
              className="text-green-500 p-3 rounded-full bg-gray-700"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <FaBars className="text-2xl" />
            </button>
          </div>

          {/* Mobile Sidebar */}
          {isSidebarOpen && (
            <>
              <div
                className="fixed inset-0 z-40 bg-gray-900 bg-opacity-75"
                onClick={closeSidebar} // Close sidebar when overlay is clicked
              />
              <Sidebar
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
              />
            </>
          )}
        </>
      )}

      {/* Main Content */}
      <div
        className={`flex-1 overflow-auto transition-all ${
          shouldShowSidebar
            ? isSidebarOpen
              ? "ml-64"
              : "ml-0"
            : "ml-0"
        } lg:ml-0`} // Always show sidebar on large screens
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/signup"
            element={authUser ? <Navigate to="/login" /> : <SignUp />}
          />
          <Route
            path="/login"
            element={authUser ? <Navigate to="/dash" /> : <Login />}
          />
          <Route
            path="/dash"
            element={authUser ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/plans"
            element={authUser ? <InvestmentPlans /> : <Navigate to="/login" />}
          />
          <Route
            path="/deposit"
            element={authUser ? <Deposit /> : <Navigate to="/login" />}
          />
          <Route
            path="/withdrawal"
            element={authUser ? <Withdrawal /> : <Navigate to="/login" />}
          />
          <Route
            path="/history"
            element={authUser ? <History /> : <Navigate to="/login" />}
          />
          <Route
            path="/adminUserList"
            element={authUser ? <UserList /> : <Navigate to="/login" />}
          />
          <Route path="/user/:userId" element={<UserDet />} /> {/* Dynamic route */}
          <Route
            path="/addPlans"
            element={authUser ? <AddPlan /> : <Navigate to="/login" />}
          />
          <Route
            path="/getWithdrawals"
            element={authUser ? <WithdrawalRequests /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
