import React from "react";
import { useSignOut } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import auth from "../../firebase.config";

const ParkingAvailablityCheckHeader = () => {
  return (
    <div>
      {/* sub header */}
      <div className="owner-profile-header bg-gray-200 flex justify-center shadow-lg">
        <ul className="flex gap-5 py-4">
          <li className="p-3 hover:text-blue-500 font-bold hover:duration-200 hover:translate-x-1 hover:shadow-xl rounded-full transition-all">
            <Link to="/user-profile">Real time Occupancy Status</Link>
          </li>
          <li className="p-3 hover:text-blue-500 font-bold hover:duration-200 hover:translate-x-1 hover:shadow-xl rounded-full transition-all">
            <Link to="/total-available-parking">Total available parking</Link>
          </li>
          <li className="p-3 hover:text-blue-500 font-bold hover:duration-200 hover:translate-x-1 hover:shadow-xl rounded-full transition-all">
            <Link to="/location-based-search">Location Based Search</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ParkingAvailablityCheckHeader;
