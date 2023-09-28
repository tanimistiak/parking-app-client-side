import React from "react";
import { Link } from "react-router-dom";

const OwnerProfileDashboardHeader = () => {
  return (
    <div>
      <div className="owner-profile-header bg-blue-500 flex justify-center shadow-lg">
        <ul className="flex gap-5">
          <li className="p-2 hover:bg-blue-800 transition-all">
            <Link to="/ownerprofileupdate">Update Profile</Link>
          </li>
          <li className="p-2 hover:bg-blue-800 transition-all">
            <Link to="/createparking">Create Parking</Link>
          </li>
          <li className="p-2 hover:bg-blue-800 transition-all">
            <Link to="/parkinglist">Parking List</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default OwnerProfileDashboardHeader;
