import React, { useContext, useEffect, useState } from "react";
import { LoginRegisterContext } from "../Context/LoginRegisterContext";
import axios from "axios";
import OwnerProfileDashboardHeader from "../OwnerProfileDashboardHeader/OwnerProfileDashboardHeader";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.config";

const ParkingList = () => {
  const [user] = useAuthState(auth);
  const { email } = user;
  const [parkingList, setParkingList] = useState([]);
  useEffect(() => {
    axios
      .get(`/api/v1/parking/${email}`)
      .then((res) => setParkingList(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="bg-gray-200">
      <OwnerProfileDashboardHeader></OwnerProfileDashboardHeader>
      <div className="table-custom flex justify-center py-5">
        <table className="table border border-collapse w-full">
          <thead>
            <tr className="grid grid-cols-8">
              <th className="border">Parking Name</th>
              <th className="border">Parking Location</th>
              <th className="border">City</th>
              <th className="border">Country</th>
              <th className="border">Postcode</th>
              <th className="border">IP</th>
              <th className="border">Availability</th>
              <th className="border">Status</th>
            </tr>
          </thead>
          <tbody>
            {parkingList.map((parking) => (
              <tr key={parking._id} className="grid grid-cols-8 text-center">
                <td className="border">{parking?.parkingSlotName}</td>
                <td className="border">{parking?.parkingLocation}</td>
                <td className="border">{parking?.city}</td>
                <td className="border">{parking?.country}</td>
                <td className="border">{parking?.postCode}</td>
                <td className="border">{parking?.ip}</td>
                <td className="border">
                  {parking?.duration.map((parking) => (
                    <span>{parking},</span>
                  ))}
                </td>
                <td className="border">{parking?.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ParkingList;
