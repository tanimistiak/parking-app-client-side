import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OwnerProfileDashboardHeader from "../OwnerProfileDashboardHeader/OwnerProfileDashboardHeader";
import UserProfileDashboardHeader from "../UserProfileDashboardHeader/UserProfileDashboardHeader";
import ParkingAvailablityCheckHeader from "../UserProfileDashboardHeader/ParkingAvailablityCheckHeader";

const TotalAvailableParkingSlots = () => {
  const [parking, setParking] = useState();
  const navigate = useNavigate();
  const [location, setLocation] = useState();
  useEffect(() => {
    axios
      .get(`/api/v1/parking/find-parking/${location}`)
      .then((data) => {
        console.log(data.data.length);
        setParking(data.data.length);
      })
      .catch((err) => console.log(err));
  }, [location]);
  return (
    <div>
      <div className="header-user-profile shadow-lg">
        <UserProfileDashboardHeader></UserProfileDashboardHeader>
        <ParkingAvailablityCheckHeader></ParkingAvailablityCheckHeader>
      </div>
      <div className="h-screen w-screen flex justify-center items-center">
        {parking && (
          <div className="text-3xl p-10 bg-amber-100 hover:scale-150 transition-all">
            Number of available parking slots: {parking}
          </div>
        )}
      </div>
    </div>
  );
};

export default TotalAvailableParkingSlots;
