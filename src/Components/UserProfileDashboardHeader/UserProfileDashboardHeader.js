import React from "react";
import { Link } from "react-router-dom";

const UserProfileDashboardHeader = () => {
  return (
    <div>
      <div className="owner-profile-header bg-blue-500 flex justify-center shadow-lg">
        <ul className="flex gap-5">
          <li className="p-2 hover:bg-blue-800 transition-all">
            <Link to="/userprofileupdate">Update User Profile</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserProfileDashboardHeader;
