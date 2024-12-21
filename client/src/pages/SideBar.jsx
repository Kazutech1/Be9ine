import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaChartLine, FaWallet, FaUsers, FaMoneyCheckAlt, FaPlusSquare } from "react-icons/fa";
import Logout from "./Logout";
import useDashboard from "../hooks/useDashboard";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const location = useLocation(); // Get current path
  const { user } = useDashboard();

  // Menu items for regular users and admins
  const menuItems = [
    { name: "Dashboard", path: "/dash", icon: <FaChartLine className="text-green-500" /> },
    { name: "Plans", path: "/plans", icon: <FaPlusSquare className="text-green-500" /> },
    { name: "Deposit", path: "/deposit", icon: <FaWallet className="text-green-500" /> },
    { name: "Withdrawal", path: "/withdrawal", icon: <FaWallet className="text-green-500" /> },
    { name: "History", path: "/history", icon: <FaMoneyCheckAlt className="text-green-500" /> },
  ];

  const adminMenuItems = [
    { name: "Users", path: "/adminUserList", icon: <FaUsers className="text-green-500" /> },
    { name: "Add Plans", path: "/addPlans", icon: <FaPlusSquare className="text-green-500" /> },
    { name: "Withdrawal", path: "/getWithdrawals", icon: <FaWallet className="text-green-500" /> },
  ];

  // Determine which menu to show
  const currentMenu = user?.isAdmin ? adminMenuItems : menuItems;

  // Function to close the sidebar when a link is clicked (mobile)
  const handleLinkClick = () => {
    if (window.innerWidth <= 768) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div
    className={`bg-gray-800 text-white w-64 h-full p-6 fixed lg:relative z-40 transition-transform transform ${
      isSidebarOpen ? "translate-x-0" : "-translate-x-full"
    } lg:translate-x-0 border-r border-green-500`} 
  >
    {/* Sidebar content goes here */}
  
      <h2 className="text-2xl font-bold text-center mb-8">
        {user?.isAdmin ? "Admin Dashboard" : "Be 9ine"}
      </h2>
      <ul className="space-y-4">
        {currentMenu.map((item) => (
          <li key={item.name}>
            <Link
              to={item.path}
              onClick={handleLinkClick}
              className={`flex items-center space-x-4 p-3 rounded-lg transition-colors duration-300 ${
                location.pathname === item.path
                  ? "bg-gray-700" // Active link style
                  : "hover:bg-gray-700" // Hover effect for inactive links
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          </li>
        ))}
        {/* Logout Section */}
        <li className="flex items-center space-x-4 p-3 rounded-lg cursor-pointer hover:bg-gray-700">
          <Logout />
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
