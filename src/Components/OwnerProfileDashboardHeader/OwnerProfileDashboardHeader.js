import React from "react";
import { Link } from "react-router-dom";
import auth from "../../firebase.config";
import { useSignOut } from "react-firebase-hooks/auth";

const OwnerProfileDashboardHeader = () => {
  const [signOut] = useSignOut(auth);
  return (
    <div>
      <div className="owner-profile-header bg-gray-200 flex justify-center shadow-lg py-4">
        <ul className="flex gap-5">
          <li className="p-3 hover:text-blue-500 font-bold hover:duration-200 hover:translate-x-1 hover:shadow-xl rounded-full transition-all">
            <Link to="/ownerprofileupdate">Update Profile</Link>
          </li>
          <li className="p-3 hover:text-blue-500 font-bold hover:duration-200 hover:translate-x-1 hover:shadow-xl rounded-full transition-all">
            <Link to="/createparking">Create Parking</Link>
          </li>
          <li className="p-3 hover:text-blue-500 font-bold hover:duration-200 hover:translate-x-1 hover:shadow-xl rounded-full transition-all">
            <Link to="/parkinglist">Parking List</Link>
          </li>
          <button
            className="p-3 hover:text-red-500 font-bold hover:duration-200 hover:translate-x-1 hover:shadow-xl rounded-full transition-all"
            onClick={async () => {
              const success = await signOut();
              if (success) {
                alert("Owner successfully signed out");
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

export default OwnerProfileDashboardHeader;
