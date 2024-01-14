import axios from "axios";
import { useEffect, useState } from "react";
import UserLogin from "../UserLoginRegister/UserLogin";
import UserProfileDashboardHeader from "../UserProfileDashboardHeader/UserProfileDashboardHeader";
import auth from "../../firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";
import AllParking from "../AllParking/AllParking";
import ParkingAvailablityCheckHeader from "../UserProfileDashboardHeader/ParkingAvailablityCheckHeader";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const [user, loading, error] = useAuthState(auth);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    axios.get(`/api/v1/user/all-users/${user?.email}`).then((data) => {
      setAllUsers(data.data);
    });
  }, []);
  const [zone, setZone] = useState([]);
  useEffect(() => {
    axios
      .get("/api/v1/parking")
      .then((data) => {
        setZone(data.data);
        console.log(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {!allUsers.length ? (
        <UserLogin></UserLogin>
      ) : (
        <div>
          <UserProfileDashboardHeader></UserProfileDashboardHeader>
          <ParkingAvailablityCheckHeader></ParkingAvailablityCheckHeader>
          {/* Additional content based on allUsers data... */}
          <div className=" flex justify-center">
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4   py-5">
              {zone?.map((parking) => {
                return (
                  parking?.zoneName && (
                    <div key={parking._id} class="card">
                      <div class="border-effect"></div>

                      <div className="p-10">
                        <div className="p-4">
                          <span className="text-gray-700">
                            Zone Name: {parking?.zoneName}
                          </span>

                          <Link to={`/zone-wise-parking/${parking?.zoneName}`}>
                            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 block hover:">
                              View
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  )
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfile;
