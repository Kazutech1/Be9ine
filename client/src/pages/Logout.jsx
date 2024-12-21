import React from 'react';
import useLogout from '../hooks/useLogout';
import { FaSignOutAlt } from 'react-icons/fa';

const Logout = () => {
  const { loading, logout } = useLogout();

  return (
    <div className="mt-auto">
      {!loading ? (
        <button 
          className="flex items-center gap-2  hover:text-green-700 transition duration-300" 
          onClick={logout}
        >
          <FaSignOutAlt className="text-xl text-green-500" /> Logout
          
        </button>
      ) : (
        <span className="loading loading-spinner text-green-500"></span>
      )}
    </div>
  );
};

export default Logout;
