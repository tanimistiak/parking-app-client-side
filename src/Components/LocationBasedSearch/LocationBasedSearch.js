import React, { useEffect, useState } from "react";
import parkingFetch from "../utils/Hooks/useParking";
import { Link, useNavigate } from "react-router-dom";
import "./all-parking.css";
import axios from "axios";
import UserProfileDashboardHeader from "../UserProfileDashboardHeader/UserProfileDashboardHeader";
import ParkingAvailablityCheckHeader from "../UserProfileDashboardHeader/ParkingAvailablityCheckHeader";
const LocationBasedSearch = () => {
  const [parking, setParking] = useState();
  const navigate = useNavigate();
  const [location, setLocation] = useState();
  useEffect(() => {
    axios
      .get(`/api/v1/parking/find-parking/${location}`)
      .then((data) => {
        console.log(data.data);
        setParking(data.data);
      })
      .catch((err) => console.log(err));
  }, [location]);
  return (
    <div>
      <UserProfileDashboardHeader></UserProfileDashboardHeader>
      <ParkingAvailablityCheckHeader></ParkingAvailablityCheckHeader>
      <div className="mb-4">
        <label
          htmlFor="parkingSlotLocation"
          className="block text-gray-700 font-bold mb-2"
        >
          Search By Location
        </label>
        <input
          type="text"
          id="parkingSlotLocation"
          name="parkingSlotLocation"
          onChange={(e) => setLocation(e.target.value)}
          // defaultValue={address?.formatted_address.split(",")[2]}

          // {...register("country", { required: true })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4   py-5">
        {parking?.map((parking) => {
          return (
            <div key={parking._id} class="card">
              <div class="border-effect"></div>

              <div className="p-10">
                <img
                  src={parking?.image}
                  alt="Slot Image"
                  class="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h5 className="text-lg font-medium text-gray-900">
                    Slot Name: {parking?.parkingSlotName}
                  </h5>
                  <p className="text-gray-700">
                    Slot Location: {parking?.parkingLocation}
                  </p>
                  <span className="text-gray-700">City: {parking?.city}</span>

                  <p>
                    Booking System:
                    {parking?.duration.map((duration) => {
                      return (
                        <span class="inline-flex items-center px-3 py-1 text-sm font-medium text-white bg-green-500 rounded-full mx-3">
                          {duration}
                        </span>
                      );
                    })}
                  </p>
                  <span class="inline-flex items-center px-3 py-1 ml-4 text-sm font-medium text-white bg-blue-500 rounded-full">
                    Status:{parking?.status}
                  </span>
                  <Link to={`/view-parking/${parking?._id}`}>
                    <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 block hover:">
                      View
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LocationBasedSearch;
