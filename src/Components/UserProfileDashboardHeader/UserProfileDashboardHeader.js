import React from "react";
import { useSignOut } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import auth from "../../firebase.config";

const UserProfileDashboardHeader = () => {
  const [signOut] = useSignOut(auth);
  return (
    <div>
      <div className="owner-profile-header bg-gray-200 flex justify-center shadow-lg">
        <ul className="flex gap-5 py-4">
          <li className="p-3 hover:text-blue-500 font-bold hover:duration-200 hover:translate-x-1 hover:shadow-xl rounded-full transition-all">
            <Link to="/user-profile">Available Parking Slots</Link>
          </li>
          <li className="p-3 hover:text-blue-500 font-bold hover:duration-200 hover:translate-x-1 hover:shadow-xl rounded-full transition-all">
            <Link to="/userprofileupdate">Update User Profile</Link>
          </li>
          <button
            className="p-3 hover:text-red-500 font-bold hover:duration-200 hover:translate-x-1 hover:shadow-xl rounded-full transition-all"
            onClick={async () => {
              const success = await signOut();
              if (success) {
                alert("User successfully signed out");
              }
            }}
          >
            Sign Out
          </button>
        </ul>
      </div>
    </div>
  );
};

export default UserProfileDashboardHeader;
