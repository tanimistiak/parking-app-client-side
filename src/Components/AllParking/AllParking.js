import React from "react";
import parkingFetch from "../utils/Hooks/useParking";
import { Link, useNavigate } from "react-router-dom";
import "./all-parking.css";
const AllParking = () => {
  const { parking } = parkingFetch();
  const navigate = useNavigate();

  return (
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
  );
};

export default AllParking;
