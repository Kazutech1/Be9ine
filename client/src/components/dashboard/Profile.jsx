import { Link } from "react-router-dom";

const Profile = ({ user }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
      <h3 className="text-xl font-semibold text-green-500 mb-6 text-center">User Profile</h3>
      <div className="space-y-4">
        <div className="flex justify-between">
          <p className="text-white font-medium">Username:</p>
          <p className="text-white">{user.name}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-white font-medium">Email:</p>
          <p className="text-white">{user.email}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-white font-medium">Wallet Address:</p>
          <div className="max-w-full overflow-x-auto">
            <p className="text-white whitespace-nowrap">{user.tronWalletAddress}</p>
          </div>
        </div>
        <div className="flex justify-between">
          <p className="text-white font-medium">Role:</p>
          <p className="text-white">
            {user.isAdmin ? (
              <span>
                Admin - <Link to="/adminUserList" className="text-green-500 underline">Dashboard</Link>
              </span>
            ) : (
              "User"
            )}
          </p>
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <img
          src={user.profilePicture || "https://avatar.iran.liara.run/public/"}
          alt="Profile"
          className="rounded-full w-32 h-32 border-4 border-green-500"
        />
      </div>
    </div>
  );
};

export default Profile;
