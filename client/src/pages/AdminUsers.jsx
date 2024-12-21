import React, { useState } from "react";
import { Link } from "react-router-dom";
import useUsers from "../hooks/useUsers";
import Loading from "../components/others/Loading";
const UserList = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Use the custom hook to fetch users and delete user
  const { users, loading, error, deleteUser } = useUsers();

  // Filter users based on the search term
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id) => {
    // Confirm deletion
    if (window.confirm("Are you sure you want to delete this user?")) {
      await deleteUser(id); // Call deleteUser from the hook
    }
  };

  if (loading) {
    return <Loading />; // Show the Loading component while data is being fetched
  }

  if (error) {
    return <div>{error}</div>; // Error state
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6 text-green-400">User List</h2>

      {/* Flex container for user count and search bar */}
      <div className="flex justify-between mb-6">
        {/* Display the number of users */}
        <div className="px-4 py-2 text-lg text-white bg-green-500 rounded-md ">
          Users: {filteredUsers.length}
        </div>

        {/* Search Bar */}
        <div>
          <input
            type="text"
            className="w-60 px-4 py-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-x-auto bg-gray-900 rounded-lg shadow-lg">
        <table className="min-w-full text-white">
          <thead>
            <tr className="bg-gray-800">
              <th className="px-4 py-2 text-left font-semibold text-gray-400">Name</th>
              <th className="px-4 py-2 text-left font-semibold text-gray-400">Email</th>
              <th className="px-4 py-2 text-left font-semibold text-gray-400">Balance</th>
              <th className="px-4 py-2 text-left font-semibold text-gray-400">Referral Code</th>
              <th className="px-4 py-2 text-left font-semibold text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Map through filtered users */}
            {filteredUsers.map((user, index) => (
              <tr
                key={index}
                className="even:bg-gray-800 odd:bg-gray-700 hover:bg-gray-600 transition"
              >
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">${user.globalDepositBalance}</td>
                <td className="px-4 py-2">{user.referralCode}</td>
                <td className="px-4 py-2">
                  <div className="flex space-x-2">
                    <Link
                      to={{
                        pathname: `/user/${user._id}`, // Use dynamic route to pass the user ID
                      }}
                    >
                      <button className="bg-green-500 hover:bg-green-400 text-black font-semibold py-1 px-3 rounded">
                        View
                      </button>
                    </Link>
                    
                    <button
                      className="bg-red-500 hover:bg-red-400 text-white font-semibold py-1 px-3 rounded"
                      onClick={() => handleDelete(user._id)} // Trigger delete on click
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
